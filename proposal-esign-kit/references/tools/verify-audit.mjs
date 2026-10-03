#!/usr/bin/env node
// verify-audit.mjs — verify an audit-trail JSON against a generated proposal page
// (Proposal Esign Kit — zero dependencies, Node 18+)
//
// Usage:
//   PEK_SECRET="your-long-random-secret" node tools/verify-audit.mjs \
//     --proposal proposals/2026-0042 --audit ~/Downloads/audit-trail-2026-0042.json
//
// Checks (each is printed PASS/FAIL, exit code 0 only if ALL pass):
//   1. the proposal page's payload token is a valid HMAC-SHA256 of the payload
//      under YOUR secret (proves the page came from your generator),
//   2. the audit trail binds to the same content_sha256 as the page,
//   3. every event hash matches SHA-256(prev_hash + canonical(event)) — the
//      chain is intact and no event was altered, dropped or reordered,
//   4. required events exist: consent_given (seq 1) then accepted (seq 2),
//      the accepted event carries a typed name of at least two words,
//   5. timestamps are present and ISO-formatted.
//
// This verifies evidence integrity (what was signed, when, by which typed
// name, under which consent). It is a records check, not a legal
// certification — see README.md for what the audit trail is and is not.

import { createHmac, createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
function argOf(name) {
  const i = args.indexOf("--" + name);
  return i !== -1 && args[i + 1] ? args[i + 1] : null;
}

const PROP = argOf("proposal");
const AUDIT = argOf("audit");
const SECRET = process.env.PEK_SECRET || argOf("secret") || "";

if (!PROP || !AUDIT) {
  console.error("Usage: PEK_SECRET=… node tools/verify-audit.mjs --proposal <dir|payload.json> --audit <audit-trail.json>");
  process.exit(2);
}
if (!SECRET || SECRET.length < 16) {
  console.error("ERROR: set the same signing secret via PEK_SECRET (>= 16 chars).");
  process.exit(2);
}

function loadPayload(p) {
  // accepts a proposal directory (payload.json inside) or the payload.json path
  const candidates = p.endsWith("payload.json") ? [p] : [join(p, "payload.json"), p];
  for (const c of candidates) {
    try {
      const j = JSON.parse(readFileSync(c, "utf8"));
      if (j.token && j.content_sha256) return j;
    } catch (e) { /* try next */ }
  }
  console.error(`ERROR: no payload.json with a token found under: ${p}`);
  process.exit(2);
}

const canonical = (obj) => {
  if (obj === null || typeof obj !== "object") return JSON.stringify(obj);
  if (Array.isArray(obj)) return "[" + obj.map(canonical).join(",") + "]";
  const keys = Object.keys(obj).sort();
  return "{" + keys.map((k) => JSON.stringify(k) + ":" + canonical(obj[k])).join(",") + "}";
};
const sha256 = (s) => createHash("sha256").update(s, "utf8").digest("hex");

const loaded = loadPayload(PROP);
const token = loaded.token;
// the HMAC was computed over the payload WITHOUT the token — strip it back out
const { token: _drop, ...payload } = loaded;
let trail;
try {
  trail = JSON.parse(readFileSync(AUDIT, "utf8"));
} catch (e) {
  console.error(`ERROR: cannot read/parse audit file: ${AUDIT}`);
  process.exit(2);
}

let failed = 0;
const check = (name, ok, detail) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
  if (!ok) failed++;
};

// 1. token is a valid HMAC under the caller's secret
const expectToken = createHmac("sha256", SECRET).update(canonical(payload)).digest("hex");
check("page token is valid HMAC-SHA256 of the payload under your secret",
  token === expectToken,
  token === expectToken ? "" : "the secret does not match the one that generated this page (or the page was edited)");

// 2. the audit trail binds to the same document
check("audit trail binds to the same content_sha256 as the proposal page",
  trail.proposal && trail.proposal.content_sha256 === payload.content_sha256,
  trail.proposal && trail.proposal.content_sha256 === payload.content_sha256
    ? trail.proposal.content_sha256.slice(0, 16) + "…"
    : `page=${payload.content_sha256.slice(0, 16)}… vs trail=${trail.proposal && trail.proposal.content_sha256 ? trail.proposal.content_sha256.slice(0, 16) + "…" : "missing"}`);

check("audit trail format/version recognized",
  trail.format === "proposal-esign-kit/audit-trail" && trail.version === 1,
  `format=${trail.format} version=${trail.version}`);

// 3. hash chain intact
let prev = payload.content_sha256;
let chainOk = Array.isArray(trail.events) && trail.events.length >= 2;
let chainDetail = "no events";
if (chainOk) {
  for (const ev of trail.events) {
    const { hash, ...rest } = ev;
    const expect = sha256(canonical({ ...rest, prev }));
    if (ev.prev !== prev || ev.hash !== expect) {
      chainOk = false;
      chainDetail = `event seq ${ev.seq}: stored hash does not match recomputed chain`;
      break;
    }
    prev = ev.hash;
  }
  if (chainOk) {
    chainDetail = `${trail.events.length} events, final ${prev.slice(0, 16)}…`;
    if (trail.final_hash !== prev) {
      chainOk = false;
      chainDetail = `final_hash mismatch: trail says ${String(trail.final_hash).slice(0, 16)}…, recomputed ${prev.slice(0, 16)}…`;
    }
  }
}
check("SHA-256 hash chain intact (no altered/dropped/reordered events)", chainOk, chainDetail);

// 4. required events in order with a real typed name
const e1 = trail.events && trail.events[0];
const e2 = trail.events && trail.events[1];
check("event 1 is consent_given with consent text",
  !!e1 && e1.type === "consent_given" && !!(e1.data && e1.data.consent_text),
  e1 ? `type=${e1.type}` : "missing");
const name = e2 && e2.data && String(e2.data.typed_name || "").trim().replace(/\s+/g, " ");
check("event 2 is accepted with a typed full name (>= 2 words)",
  !!e2 && e2.type === "accepted" && !!name && name.split(" ").length >= 2 && name.length >= 3,
  name ? `typed_name="${name}"` : "missing");
check("device context captured on acceptance (user agent)",
  !!e2 && !!e2.data && typeof e2.data.user_agent === "string" && e2.data.user_agent.length > 0,
  e2 && e2.data ? String(e2.data.user_agent).slice(0, 60) : "missing");

// 5. timestamps
const iso = (s) => typeof s === "string" && !Number.isNaN(Date.parse(s));
check("timestamps present and ISO-formatted",
  iso(e1 && e1.ts) && iso(e2 && e2.ts),
  e1 && e2 ? `${e1.ts} / ${e2.ts}` : "missing");

console.log("");
if (failed === 0) {
  console.log(`RESULT: VERIFIED — proposal "${payload.title}" (${payload.id})`);
  console.log(`        accepted by "${name}" · trail binds document digest ${payload.content_sha256.slice(0, 16)}…`);
  process.exit(0);
} else {
  console.log(`RESULT: ${failed} CHECK(S) FAILED — do not treat this trail as valid evidence`);
  process.exit(1);
}
