#!/usr/bin/env node
// new-proposal.mjs — generate a hash-signed proposal page from a template
// (Proposal Esign Kit — zero dependencies, Node 18+)
//
// Usage:
//   PEK_SECRET="your-long-random-secret" node tools/new-proposal.mjs \
//     --template templates/coaching-package.html \
//     --out proposals/2026-0042 \
//     --id 2026-0042 \
//     --title "90-Day Leadership Coaching Package" \
//     --client "Northwind Dental Group" \
//     --sender "Rivera Coaching" \
//     --sender-email you@riveracoaching.com \
//     --amount "4,500" --currency USD
//
// What it does:
//   1. reads the template and replaces {{placeholders}} with your values,
//   2. hashes the rendered document content (SHA-256),
//   3. signs the payload with HMAC-SHA256 using YOUR secret (the secret
//      never appears in the generated page),
//   4. writes proposals/<id>/index.html — a self-contained accept page.
//
// Then: deploy the folder to static hosting and send the client the URL
// with its token:  https://your-site/proposals/<id>/?t=<token>
// (The token is printed by this tool and saved in proposals/<id>/link.txt.)
//
// Keep the secret safe: whoever holds it can mint valid links.
// If a proposal changes, re-generate it — do not hand-edit the HTML.

import { createHmac, createHash, randomUUID } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const args = process.argv.slice(2);
const scriptDir = dirname(new URL(import.meta.url).pathname);
const kitRoot = join(scriptDir, "..");

function argOf(name, fallback) {
  const i = args.indexOf("--" + name);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
}

const TEMPLATE = argOf("template", join(kitRoot, "templates", "coaching-package.html"));
const OUT = argOf("out", "proposals/" + new Date().toISOString().slice(0, 10) + "-" + randomUUID().slice(0, 4));
const ID = argOf("id", OUT.split("/").pop());
const TITLE = argOf("title", "Project Proposal");
const CLIENT = argOf("client", "Client Name");
const SENDER = argOf("sender", "Your Name / Company");
const SENDER_EMAIL = argOf("sender-email", "");
const AMOUNT = argOf("amount", "");
const CURRENCY = argOf("currency", "USD");
const VALID_DAYS = argOf("valid-days", "14");
const DATE = argOf("date", new Date().toISOString().slice(0, 10));

const SECRET = process.env.PEK_SECRET || argOf("secret", "");
if (!SECRET || SECRET.length < 16) {
  console.error("ERROR: set a signing secret of at least 16 chars via PEK_SECRET env (never --secret in shared shells).");
  process.exit(2);
}

// ---- read + fill the template ----
let template;
try {
  template = readFileSync(TEMPLATE, "utf8");
} catch (e) {
  console.error(`ERROR: cannot read template: ${relative(process.cwd(), TEMPLATE)}`);
  process.exit(2);
}

const vars = {
  proposal_id: ID,
  proposal_title: TITLE,
  client_name: CLIENT,
  sender_name: SENDER,
  sender_email: SENDER_EMAIL,
  amount: AMOUNT,
  currency: CURRENCY,
  valid_days: VALID_DAYS,
  date: DATE,
};

const missing = [];
let content = template.replace(/\{\{\s*([a-z_]+)\s*\}\}/g, (m, key) => {
  if (key in vars) return vars[key] || "";
  missing.push(key);
  return "";
});
if (missing.length) {
  const uniq = [...new Set(missing)];
  console.error("ERROR: template uses placeholders this tool does not fill: " + uniq.join(", "));
  process.exit(2);
}

// the signed content is the <body> of the template (what the accept page renders)
const bodyStart = content.indexOf("<body>");
const bodyEnd = content.lastIndexOf("</body>");
if (bodyStart === -1 || bodyEnd === -1) {
  console.error("ERROR: template has no <body> section.");
  process.exit(2);
}
content = content.slice(bodyStart + 6, bodyEnd).trim();

// ---- hash + sign ----
const sha256 = (s) => createHash("sha256").update(s, "utf8").digest("hex");
const content_sha256 = sha256(content);

const payload = {
  id: ID,
  title: TITLE,
  client_name: CLIENT,
  sender_name: SENDER,
  sender_email: SENDER_EMAIL,
  currency: CURRENCY,
  amount: AMOUNT,
  created: DATE,
  content,
  content_sha256,
};

const canonical = (obj) => {
  if (obj === null || typeof obj !== "object") return JSON.stringify(obj);
  if (Array.isArray(obj)) return "[" + obj.map(canonical).join(",") + "]";
  const keys = Object.keys(obj).sort();
  return "{" + keys.map((k) => JSON.stringify(k) + ":" + canonical(obj[k])).join(",") + "}";
};

const token = createHmac("sha256", SECRET).update(canonical(payload)).digest("hex");

// ---- write the self-contained page ----
const acceptTemplate = readFileSync(join(kitRoot, "sign", "accept-template.html"), "utf8");
const data = JSON.stringify({ payload, token });
if (data.includes("</script")) {
  console.error("ERROR: payload contains '</script' — sanitize the input fields.");
  process.exit(2);
}
const page = acceptTemplate.replace("{{PEK_DATA}}", data);

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "index.html"), page);
writeFileSync(join(OUT, "link.txt"),
  `${ID}\t${content_sha256}\t?t=${token}\n` +
  `Deploy the folder, then send: https://YOUR-SITE/${OUT.replace(/\\/g, "/")}/?t=${token}\n`);
writeFileSync(join(OUT, "payload.json"), JSON.stringify({ ...payload, token }, null, 2));

console.log("proposal page : " + join(OUT, "index.html"));
console.log("content_sha256: " + content_sha256);
console.log("link token    : ?t=" + token);
console.log("");
console.log("Next steps:");
console.log("  1. deploy the '" + OUT + "' folder to your static host (Cloudflare Pages works)");
console.log("  2. send the client the URL WITH the ?t= token (see link.txt)");
console.log("  3. when they accept, save the audit-trail JSON they send back next to this folder");
console.log("  4. verify it any time: node tools/verify-audit.mjs --proposal " + OUT + " --audit <audit-trail.json>");
console.log("  keep PEK_SECRET private — it mints valid links");
