#!/usr/bin/env node
// decay.mjs — Content Decay Kit
// Detects decaying pages per client property from Google Search Console data,
// then renders an internal dashboard + white-label weekly digest per client.
//
// Zero npm dependencies. Node 18+. Official Search Console API only.
// Your Google credentials stay in YOUR config dir; nothing is sent anywhere
// except the official Google endpoints documented in SETUP.md.
//
// Usage:
//   node decay/decay.mjs --demo                              # see output with demo data, no credentials
//   node decay/decay.mjs --config config/properties.json     # real run against Search Console
//   node decay/decay.mjs --config ... --fail-on-decay        # CI: exit 1 when decay is flagged
//
// Exit codes: 0 ok · 1 flagged pages with --fail-on-decay · 2 setup/usage error

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { performance } from "node:perf_hooks";

export const VERSION = "1.0.0";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const QUERY_BASE = "https://searchconsole.googleapis.com/webmasters/v3/sites/";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const GSC_LATENCY_DAYS = 3; // Search Console data lags ~2-3 days
const UA = "content-decay-kit/" + VERSION;

// ---------------------------------------------------------------- utilities

export function daysAgoISO(days) {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

export function slugify(name) {
  return String(name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "client";
}

export function pct(n) {
  return (Math.round(n * 10) / 10).toFixed(1);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

// ---------------------------------------------------------------- decay math
// Windows differ in length (recent 28d vs baseline ~92d), so all rates are
// normalized to per-day numbers before comparison. decay_pct follows the
// standard definition: 1 - recent_rate / baseline_rate, flagged when it
// crosses the configured threshold AND the baseline is above the noise floor
// (min impressions) so low-volume pages cannot trigger alerts.

export function computePageDecay(page, recent, baseline, thresholds) {
  const rSpan = thresholds.recent_days;
  const bSpan = thresholds.baseline_last_day - thresholds.baseline_first_day + 1;
  const rClicks = (recent.clicks || 0) / rSpan;
  const bClicks = (baseline.clicks || 0) / bSpan;
  const rImps = (recent.impressions || 0) / rSpan;
  const bImps = (baseline.impressions || 0) / bSpan;
  const rPos = recent.position || 0;
  const bPos = baseline.position || 0;

  const out = {
    page,
    recent_clicks: recent.clicks || 0,
    baseline_clicks: baseline.clicks || 0,
    recent_impressions: recent.impressions || 0,
    baseline_impressions: baseline.impressions || 0,
    recent_position: rPos,
    baseline_position: bPos,
  };

  // New page: no meaningful baseline yet — report, never flag.
  if ((baseline.clicks || 0) + (baseline.impressions || 0) === 0) {
    return { ...out, status: "new", decay_pct: 0, priority: null, why: null };
  }

  const decay = bClicks > 0 ? (1 - rClicks / bClicks) * 100 : 0;
  out.decay_pct = Math.round(decay * 10) / 10;

  const aboveNoise = (baseline.impressions || 0) >= thresholds.min_impressions;
  const flagged = aboveNoise && decay >= thresholds.decay_pct;
  const watch = aboveNoise && !flagged && decay >= thresholds.decay_pct / 2;

  // Classify WHY the page is decaying (order matters):
  // 1. ranking lost (position worsened)  2. snippet lost (CTR down, demand stable)
  // 3. demand lost (fewer searches/impressions)  4. mixed / small shifts.
  const impRatio = bImps > 0 ? rImps / bImps : 1;
  const rCtr = rImps > 0 ? rClicks / rImps : 0; // per-day clicks / per-day impressions
  const bCtr = bImps > 0 ? bClicks / bImps : 0;
  const ctrRatio = bCtr > 0 ? rCtr / bCtr : 1;
  let why = "mixed";
  if (rPos > bPos + 2) why = "position-drop";
  else if (ctrRatio < 0.8 && impRatio >= 0.8) why = "ctr-drop";
  else if (impRatio < 0.8) why = "demand-drop";

  const lostPerDay = bClicks - rClicks;
  const priority = flagged ? (decay >= 40 || lostPerDay >= 5 ? "P1" : "P2") : watch ? "P3" : null;

  return {
    ...out,
    status: flagged ? "decaying" : watch ? "watch" : "healthy",
    decay_pct: out.decay_pct,
    priority,
    why: flagged || watch ? why : null,
  };
}

export const REFRESH_ANGLES = {
  "position-drop":
    "Re-earn the ranking: update facts and dates, add the sections competitors gained, tighten the intro, then request re-indexing in Search Console.",
  "ctr-drop":
    "Rewrite the title tag and meta description against the queries it still ranks for — the page is seen but not chosen.",
  "demand-drop":
    "The topic cooled. Extend the page to the adjacent questions people search now, or fold it into a fresher pillar piece.",
  mixed:
    "Full refresh pass: refresh data and examples, restructure H2s to current intent, update the title, and repair internal links.",
};

// ---------------------------------------------------------------- GSC client

export function buildJwt(sa) {
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const header = b64({ alg: "RS256", typ: "JWT" });
  const claims = b64({
    iss: sa.client_email,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  });
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(header + "." + claims);
  const sig = signer.sign(sa.private_key).toString("base64url");
  return header + "." + claims + "." + sig;
}

async function accessToken(cfg) {
  if (process.env.GSC_ACCESS_TOKEN) return process.env.GSC_ACCESS_TOKEN; // quick tests (expires ~1h)
  const saFile = cfg.service_account_file;
  if (!saFile || !fs.existsSync(saFile)) {
    throw new Error(
      `service account file not found: ${saFile || "(unset)"} — follow SETUP.md step 2, ` +
        `or export GSC_ACCESS_TOKEN for a quick manual test.`
    );
  }
  const sa = readJson(saFile);
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": UA },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: buildJwt(sa),
    }),
  });
  const d = await res.json().catch(() => ({}));
  if (!res.ok || !d.access_token) {
    throw new Error(`Google token exchange failed (${res.status}): ${d.error_description || d.error || "unknown"}`);
  }
  return d.access_token;
}

async function queryWindow(token, property, start, end) {
  const url = QUERY_BASE + encodeURIComponent(property) + "/searchAnalytics/query";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      "User-Agent": UA,
    },
    body: JSON.stringify({
      startDate: start,
      endDate: end,
      dimensions: ["page"],
      rowLimit: 25000,
    }),
  });
  const d = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Search Console API ${res.status}: ${(d.error && d.error.message) || "failed"}`);
  return d.rows || [];
}

function rowsToMap(rows) {
  const m = new Map();
  for (const r of rows) m.set(r.keys[0], { clicks: r.clicks, impressions: r.impressions, position: r.position });
  return m;
}

// ---------------------------------------------------------------- reporting

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

const WHY_LABEL = {
  "position-drop": "Ranking slipped",
  "ctr-drop": "Seen, not clicked",
  "demand-drop": "Search demand cooled",
  mixed: "Mixed softening",
};

const PRIORITY_LABEL = { P1: "P1 — refresh this week", P2: "P2 — schedule a refresh", P3: "P3 — watchlist" };

function trendRows(pages) {
  return pages
    .map((p) => {
      const badge =
        p.priority === "P1"
          ? `<span class="b" style="background:#B42318">${p.priority}</span>`
          : p.priority === "P2"
            ? `<span class="b" style="background:#8C6119">${p.priority}</span>`
            : `<span class="b" style="background:#55627A">${p.priority || "NEW"}</span>`;
      const decay =
        p.status === "new"
          ? `<span class="dim">new page — no baseline yet</span>`
          : `<b class="${p.decay_pct >= 0 ? "down" : "up"}">${p.decay_pct >= 0 ? "−" : "+"}${pct(Math.abs(p.decay_pct))}%</b> clicks/day vs baseline`;
      const why = p.why
        ? `<div class="why"><b>${esc(WHY_LABEL[p.why])}.</b> ${esc(REFRESH_ANGLES[p.why])}</div>`
        : "";
      return `<tr>
  <td class="u">${esc(p.page)}</td>
  <td class="n">${badge}</td>
  <td class="n">${decay}</td>
  <td class="n">${esc(String(p.baseline_position ? "avg pos " + p.baseline_position.toFixed(1) : "—"))} → ${esc(String(p.recent_position ? p.recent_position.toFixed(1) : "—"))}</td>
</tr>
<tr><td colspan="4" class="detail">${why}</td></tr>`;
    })
    .join("\n");
}

export function renderDigest(client, result, brand, weekLabel, accent) {
  const flagged = result.pages.filter((p) => p.status === "decaying");
  const watch = result.pages.filter((p) => p.status === "watch");
  const fresh = result.pages.filter((p) => p.status === "new");
  const healthy = result.pages.length - flagged.length - watch.length - fresh.length;
  const shown = flagged.slice(0, result.digest_max_pages || 10);
  const watchShown = watch.slice(0, 5);
  const freshShown = fresh.slice(0, 5);

  const head =
    flagged.length > 0
      ? `${flagged.length} page${flagged.length === 1 ? "" : "s"} lost meaningful traffic this quarter-to-date window. Refresh priorities are listed first.`
      : `No page crossed the decay thresholds this week — nothing needs urgent attention.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>${esc(brand.digest_title)} — ${esc(client.name)} — ${esc(weekLabel)}</title>
<style>
  :root { --accent:${accent}; --ink:#1F2A3A; --muted:#55627A; --line:#DCE3EE; --paper:#F7F8FA; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font:16px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color:var(--ink); background:#FFFFFF; }
  .wrap { max-width:860px; margin:0 auto; padding:32px 24px; }
  .head { display:flex; justify-content:space-between; align-items:center; gap:12px; border-bottom:3px solid var(--accent); padding-bottom:14px; flex-wrap:wrap; }
  .logo { border:1.5px dashed var(--muted); color:var(--muted); font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; padding:6px 10px; border-radius:8px; }
  .brand { font-weight:800; color:var(--ink); font-size:16px; }
  .week { color:var(--muted); font-size:13px; }
  h1 { font-size:22px; margin:22px 0 6px; }
  .sum { color:var(--muted); font-size:15px; margin-bottom:18px; }
  table { width:100%; border-collapse:collapse; margin:12px 0 26px; }
  th { text-align:left; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); border-bottom:1px solid var(--line); padding:8px 10px; }
  td { border-bottom:1px dashed var(--line); padding:10px; vertical-align:top; font-size:14px; }
  td.u { word-break:break-all; font-weight:600; }
  td.n { white-space:nowrap; color:var(--muted); }
  td.detail { border-bottom:1px solid var(--line); padding-top:0; }
  .b { display:inline-block; color:#fff; font-weight:700; font-size:12px; padding:3px 8px; border-radius:6px; }
  .down { color:#B42318; } .up { color:#0E7C66; } .dim { color:var(--muted); }
  .why { color:var(--muted); font-size:13.5px; max-width:640px; }
  h2 { font-size:15px; letter-spacing:.06em; text-transform:uppercase; color:var(--muted); margin:26px 0 4px; }
  ol.next { margin:10px 0 0 20px; color:var(--ink); font-size:14.5px; }
  ol.next li { margin:6px 0; }
  .foot { border-top:1px solid var(--line); margin-top:30px; padding-top:14px; color:var(--muted); font-size:12.5px; }
  @media print { .wrap { padding:0; } }
</style>
</head>
<body>
<div class="wrap">
  <div class="head">
    <span class="logo">${esc(brand.logo_text)}</span>
    <span class="brand">${esc(brand.agency)}</span>
    <span class="week">${esc(weekLabel)}</span>
  </div>
  <h1>${esc(brand.digest_title)} — ${esc(client.name)}</h1>
  <p class="sum">${esc(head)} ${esc(brand.intro_line)}</p>
  ${
    shown.length
      ? `<table>
  <thead><tr><th>Page</th><th>Priority</th><th>Trend</th><th>Avg position</th></tr></thead>
  <tbody>
${trendRows(shown)}
  </tbody>
</table>`
      : ""
  }
  ${
    watchShown.length
      ? `<h2>Watchlist (below alert thresholds)</h2>
<table><tbody>
${trendRows(watchShown)}
</tbody></table>`
      : ""
  }
  ${
    freshShown.length
      ? `<h2>New pages (building their baseline)</h2>
<table><tbody>
${trendRows(freshShown)}
</tbody></table>`
      : ""
  }
  <h2>What happens next</h2>
  <ol class="next">
    <li>We refresh the P1 pages first — the updates above are the checklist.</li>
    <li>Refreshed pages get re-indexed; we re-check the trend in next week's digest.</li>
    <li>${healthy > 0 ? `${healthy} page${healthy === 1 ? "" : "s"} stayed healthy — no action needed.` : "Every flagged page has a refresh owner this week."}</li>
  </ol>
  <div class="foot">Prepared by <b>${esc(brand.agency)}</b> · ${esc(weekLabel)} · Data: Google Search Console (property owner's own data)</div>
</div>
</body>
</html>`;
}

export function renderDashboard(clients, brand, weekLabel, accent) {
  const secs = clients
    .map((c) => {
      const rows = c.pages
        .filter((p) => p.status !== "healthy")
        .map((p) => {
          const cls = p.status === "decaying" ? (p.priority === "P1" ? "bad" : "warn") : p.status === "new" ? "dim" : "warn";
          return `<tr><td class="u">${esc(p.page)}</td><td><span class="b ${cls}">${esc(p.priority || (p.status === "new" ? "NEW" : "P3"))}</span></td><td class="n">${
            p.status === "new" ? "new" : "−" + pct(Math.abs(p.decay_pct)) + "%"
          }</td><td class="n">${esc(WHY_LABEL[p.why] || "—")}</td></tr>`;
        })
        .join("\n");
      const err = c.error
        ? `<p class="err">API error: ${esc(c.error)}</p>`
        : `<p class="fine">${c.flagged_count} flagged · ${c.watch_count} watch · ${c.new_count} new · ${c.healthy_count} healthy</p>`;
      return `<div class="client"><h2>${esc(c.name)} <span class="prop">${esc(c.property)}</span></h2>${err}${
        rows ? `<table><tbody>${rows}</tbody></table>` : c.error ? "" : `<p class="fine">nothing flagged</p>`
      }</div>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>Content decay dashboard — ${esc(brand.agency)}</title>
<style>
  :root { --accent:${accent}; --ink:#1F2A3A; --muted:#55627A; --line:#DCE3EE; --deep:#16243D; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font:16px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color:var(--ink); background:#F7F8FA; }
  header { background:var(--deep); color:#fff; padding:18px 24px; }
  header .in { max-width:960px; margin:0 auto; display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap; align-items:center; }
  header h1 { font-size:18px; font-weight:800; }
  header .w { color:#C4CFE2; font-size:13px; }
  .wrap { max-width:960px; margin:0 auto; padding:28px 24px 48px; }
  .client { background:#fff; border:1px solid var(--line); border-radius:12px; padding:20px 22px; margin-bottom:18px; }
  .client h2 { font-size:16.5px; margin-bottom:6px; }
  .prop { color:var(--muted); font-weight:400; font-size:13px; }
  .fine { color:var(--muted); font-size:13.5px; margin-bottom:8px; }
  .err { color:#B42318; font-size:13.5px; margin-bottom:8px; }
  td { border-top:1px dashed var(--line); padding:8px 8px; font-size:13.5px; vertical-align:top; }
  td.u { word-break:break-all; }
  td.n { white-space:nowrap; color:var(--muted); }
  .b { display:inline-block; color:#fff; font-weight:700; font-size:11.5px; padding:2px 8px; border-radius:6px; }
  .b.bad { background:#B42318; } .b.warn { background:#8C6119; } .b.dim { background:#55627A; }
</style>
</head>
<body>
<header><div class="in"><h1>Content decay dashboard</h1><span class="w">${esc(brand.agency)} · ${esc(weekLabel)}</span></div></header>
<div class="wrap">
${secs}
</div>
</body>
</html>`;
}

// ---------------------------------------------------------------- demo data
// Deterministic fixtures shaped exactly like Search Console responses so the
// whole pipeline (fetch → merge → decay → digest) runs without credentials.

export function demoConfig() {
  return {
    brand: {
      agency: "YOUR AGENCY NAME",
      logo_text: "YOUR LOGO",
      accent: "#1D4ED8",
      digest_title: "Weekly Content Health Digest",
      intro_line: "What slipped, why it slipped, and the refresh we suggest first.",
    },
    thresholds: { decay_pct: 20, min_impressions: 200, recent_days: 28, baseline_first_day: 29, baseline_last_day: 120 },
    digest_max_pages: 10,
    clients: [
      { name: "Acme Home Services (demo)", property: "sc-domain:acme-demo.example" },
      { name: "Bright Dental Group (demo)", property: "sc-domain:brightdental-demo.example" },
      { name: "Coastal Travel Blog (demo)", property: "sc-domain:coastal-demo.example" },
    ],
  };
}

export function demoRows(property, windowKind) {
  // windowKind: "recent" (28d) or "baseline" (92d) — clicks/impressions are window totals.
  const F = {
    "sc-domain:acme-demo.example": {
      baseline: {
        "/guides/boiler-maintenance/": { clicks: 2760, impressions: 22000, position: 4.2 },
        "/guides/radiator-bleeding/": { clicks: 920, impressions: 16000, position: 6.0 },
        "/services/heating-install/": { clicks: 1288, impressions: 26000, position: 8.0 },
      },
      recent: {
        "/guides/boiler-maintenance/": { clicks: 336, impressions: 5000, position: 9.8 },
        "/guides/radiator-bleeding/": { clicks: 170, impressions: 4872, position: 6.1 },
        "/services/heating-install/": { clicks: 392, impressions: 7800, position: 8.1 },
      },
    },
    "sc-domain:brightdental-demo.example": {
      baseline: {
        "/blog/teeth-whitening-faq/": { clicks: 60, impressions: 150, position: 5.0 },
        "/blog/invisalign-vs-braces/": { clicks: 1840, impressions: 12000, position: 3.0 },
        "/services/checkup/": { clicks: 500, impressions: 9000, position: 7.0 },
      },
      recent: {
        "/blog/teeth-whitening-faq/": { clicks: 8, impressions: 40, position: 5.5 },
        "/blog/invisalign-vs-braces/": { clicks: 250, impressions: 4600, position: 3.4 },
        "/services/checkup/": { clicks: 200, impressions: 3800, position: 7.1 },
      },
    },
    "sc-domain:coastal-demo.example": {
      baseline: {
        "/guides/best-time-to-visit/": { clicks: 1840, impressions: 40000, position: 7.5 },
        "/guides/ferry-schedules/": { clicks: 644, impressions: 9000, position: 12.0 },
      },
      recent: {
        "/guides/best-time-to-visit/": { clicks: 340, impressions: 8000, position: 7.4 },
        "/guides/packing-list/": { clicks: 120, impressions: 3000, position: 11.2 },
        "/guides/ferry-schedules/": { clicks: 165, impressions: 2600, position: 12.2 },
      },
    },
  };
  return (F[property] && F[property][windowKind]) || {};
}

// ---------------------------------------------------------------- pipeline

function mergeWindows(recentMap, baselineMap, thresholds) {
  const pages = new Set([...recentMap.keys(), ...baselineMap.keys()]);
  const out = [];
  for (const page of pages) {
    const recent = recentMap.get(page) || { clicks: 0, impressions: 0, position: 0 };
    const baseline = baselineMap.get(page) || { clicks: 0, impressions: 0, position: 0 };
    out.push(computePageDecay(page, recent, baseline, thresholds));
  }
  const rank = { P1: 0, P2: 1, P3: 2 };
  out.sort((a, b) => {
    const pa = a.priority ? rank[a.priority] : 9;
    const pb = b.priority ? rank[b.priority] : 9;
    if (pa !== pb) return pa - pb;
    return b.decay_pct - a.decay_pct;
  });
  return out;
}

function weekLabelFor(endISO) {
  const end = new Date(endISO + "T00:00:00Z");
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 6);
  const fmt = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  return `${fmt(start)} – ${fmt(end)}, ${end.getUTCFullYear()}`;
}

async function fetchClient(token, client, thresholds) {
  const endISO = daysAgoISO(GSC_LATENCY_DAYS);
  const recentStart = daysAgoISO(GSC_LATENCY_DAYS + thresholds.recent_days - 1);
  const baseEnd = daysAgoISO(GSC_LATENCY_DAYS + thresholds.baseline_first_day - 1);
  const baseStart = daysAgoISO(GSC_LATENCY_DAYS + thresholds.baseline_last_day - 1);
  const [recentRows, baselineRows] = await Promise.all([
    queryWindow(token, client.property, recentStart, endISO),
    queryWindow(token, client.property, baseStart, baseEnd),
  ]);
  const pages = mergeWindows(rowsToMap(recentRows), rowsToMap(baselineRows), thresholds);
  return { pages, window: { end: endISO, recentStart, baseStart, baseEnd } };
}

function demoClient(client, thresholds) {
  const recentMap = rowsToMap(Object.entries(demoRows(client.property, "recent")).map(([k, v]) => ({ keys: [k], ...v })));
  const baselineMap = rowsToMap(Object.entries(demoRows(client.property, "baseline")).map(([k, v]) => ({ keys: [k], ...v })));
  return { pages: mergeWindows(recentMap, baselineMap, thresholds), window: { end: daysAgoISO(GSC_LATENCY_DAYS) } };
}

function summarize(client, thresholds) {
  client.flagged_count = client.pages.filter((p) => p.status === "decaying").length;
  client.watch_count = client.pages.filter((p) => p.status === "watch").length;
  client.new_count = client.pages.filter((p) => p.status === "new").length;
  client.healthy_count = client.pages.length - client.flagged_count - client.watch_count - client.new_count;
  return client;
}

function writeOutputs(root, clients, cfg, weekLabel, mode) {
  const outDir = path.join(root, "out");
  const digestDir = path.join(outDir, "digest");
  fs.mkdirSync(digestDir, { recursive: true });
  const brand = cfg.brand;
  const accent = brand.accent || "#1D4ED8";

  fs.writeFileSync(path.join(outDir, "dashboard.html"), renderDashboard(clients, brand, weekLabel, accent));
  const written = [];
  for (const c of clients) {
    if (c.error) continue;
    const file = path.join(digestDir, slugify(c.name) + "-weekly-digest.html");
    fs.writeFileSync(file, renderDigest(c, { pages: c.pages, digest_max_pages: cfg.digest_max_pages }, brand, weekLabel, accent));
    written.push(file);
  }
  // history
  const histFile = path.join(outDir, "history.json");
  let hist = { version: 1, runs: [] };
  try {
    const prev = JSON.parse(fs.readFileSync(histFile, "utf8"));
    if (prev && prev.version === 1 && Array.isArray(prev.runs)) hist = prev;
  } catch {}
  hist.runs.push({
    ts: new Date().toISOString(),
    mode,
    week: weekLabel,
    clients: clients.map((c) => ({
      name: c.name,
      property: c.property,
      flagged_count: c.flagged_count || 0,
      watch_count: c.watch_count || 0,
      new_count: c.new_count || 0,
      healthy_count: c.healthy_count || 0,
      error: c.error || null,
    })),
  });
  if (hist.runs.length > 260) hist.runs = hist.runs.slice(-260);
  fs.writeFileSync(histFile, JSON.stringify(hist, null, 1));
  return { outDir, digestDir, written };
}

async function notify(webhook, clients, weekLabel) {
  const flagged = clients.filter((c) => !c.error && c.flagged_count > 0);
  if (!flagged.length) return false;
  const lines = flagged.map((c) => `• ${c.name}: ${c.flagged_count} page(s) decaying (${c.pages.filter((p) => p.priority === "P1").length} P1)`);
  const body = {
    text: `Content decay ${weekLabel} — ${flagged.reduce((n, c) => n + c.flagged_count, 0)} page(s) flagged across ${flagged.length} client(s):\n${lines.join("\n")}`,
  };
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": UA },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------- main

function usage() {
  return `Content Decay Kit ${VERSION}
Detect decaying pages per client from Google Search Console, render an internal
dashboard + white-label weekly digest for each client.

Usage:
  node decay/decay.mjs --config config/properties.json
  node decay/decay.mjs --demo
Options:
  --config FILE     client list, thresholds, brand (see SETUP.md)
  --demo            run the whole pipeline on built-in demo data — no credentials
  --fail-on-decay   exit 1 when any page is flagged (useful in CI)
  --quiet           suppress progress lines
  --version         print version
  --help            this text
Outputs (./out/):
  dashboard.html            internal overview across all client properties
  digest/<client>-weekly-digest.html   white-label digest — send to the client
  history.json              run history (append-only)
Environment:
  GSC_ACCESS_TOKEN          manual OAuth access token (quick tests; expires ~1h)
  CRON_NOTIFY_WEBHOOK       POSTs a Slack-style summary when pages are flagged`;
}

async function main(argv) {
  const args = argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    console.log(usage());
    return 0;
  }
  if (args.includes("--version")) {
    console.log(VERSION);
    return 0;
  }
  const demo = args.includes("--demo");
  const quiet = args.includes("--quiet");
  const failOnDecay = args.includes("--fail-on-decay");
  let cfgPath = "config/properties.json";
  const ci = args.indexOf("--config");
  if (ci !== -1) {
    if (!args[ci + 1]) {
      console.error("--config requires a file path");
      return 2;
    }
    cfgPath = args[ci + 1];
  }
  if (!demo && !fs.existsSync(cfgPath)) {
    console.error(`config not found: ${cfgPath} — copy the shipped config/properties.json, edit your clients, or run with --demo first.`);
    return 2;
  }
  let cfg;
  try {
    cfg = demo ? demoConfig() : readJson(cfgPath);
  } catch (e) {
    console.error(`config is not valid JSON (${cfgPath}): ${e.message}`);
    return 2;
  }
  if (!Array.isArray(cfg.clients) || cfg.clients.length === 0) {
    console.error(`config has no clients[] — add at least one client property.`);
    return 2;
  }
  if (!cfg.brand || !cfg.brand.agency) {
    console.error(`config has no brand.agency — the digest carries YOUR agency name.`);
    return 2;
  }
  const t = { decay_pct: 20, min_impressions: 200, recent_days: 28, baseline_first_day: 29, baseline_last_day: 120, ...(cfg.thresholds || {}) };

  const root = demo ? process.cwd() : path.dirname(path.resolve(cfgPath));
  let token = null;
  if (!demo) {
    const t0 = performance.now();
    token = await accessToken(cfg); // throws with a clear message on setup problems
    if (!quiet) console.error(`authenticated in ${Math.round(performance.now() - t0)}ms`);
  }

  const clients = [];
  let failures = 0;
  for (const client of cfg.clients) {
    if (!client || !client.name || !client.property) {
      console.error(`skipping malformed client entry (needs name + property)`);
      failures++;
      continue;
    }
    try {
      const r = demo ? demoClient(client, t) : await fetchClient(token, client.property, t).then((x) => ({ pages: x.pages }));
      clients.push(summarize({ ...client, pages: r.pages }));
      if (!quiet) console.error(`${demo ? "[demo] " : ""}${client.name}: ${clients[clients.length - 1].flagged_count} flagged, ${clients[clients.length - 1].watch_count} watch`);
    } catch (e) {
      failures++;
      clients.push(summarize({ ...client, pages: [], error: e.message }));
      console.error(`${client.name}: ERROR ${e.message}`);
    }
  }
  const usable = clients.filter((c) => c.pages);
  if (!usable.length && failures > 0) {
    console.error(`all clients failed — nothing to report`);
    return 2;
  }

  const weekLabel = weekLabelFor(daysAgoISO(GSC_LATENCY_DAYS));
  const { written } = writeOutputs(root, clients, cfg, weekLabel, demo ? "demo" : "live");
  if (!quiet) {
    console.error(`dashboard: ${path.join(root, "out", "dashboard.html")}`);
    for (const w of written) console.error(`digest:    ${w}`);
  }

  if (process.env.CRON_NOTIFY_WEBHOOK) {
    const ok = await notify(process.env.CRON_NOTIFY_WEBHOOK, clients, weekLabel);
    if (!quiet) console.error(ok ? "webhook notified" : "webhook failed (non-fatal)");
  }

  const totalFlagged = clients.reduce((n, c) => n + (c.flagged_count || 0), 0);
  if (!quiet) console.error(`done: ${totalFlagged} flagged page(s) across ${usable.length} client(s)`);
  if (failOnDecay && totalFlagged > 0) return 1;
  return 0;
}

const isMain = process.argv[1] && import.meta.url === new URL("file://" + process.argv[1].replace(/\\/g, "/")).href;
if (isMain) {
  main(process.argv).then(
    (code) => process.exit(code),
    (e) => {
      console.error(e.message);
      process.exit(2);
    }
  );
}
