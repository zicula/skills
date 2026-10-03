/*
 * webhook-kit worker — self-hosted webhook inbox + inspector + replay
 * for Cloudflare Workers (free plan works) + one D1 database.
 *
 * Zero npm dependencies. Deploy with:  npx wrangler deploy   (see SETUP.md)
 *
 * Routes
 *   GET  /healthz                 -> "ok <name> <version>"
 *   GET  /                        -> dashboard (inspect, replay, manage inboxes)
 *   ANY  /w/<inbox>[/<anything>]  -> capture endpoint: store the request, answer 2xx
 *   /api/inboxes                  GET list · POST create          (admin token)
 *   /api/inboxes/<id>             DELETE                          (admin token)
 *   /api/events?inbox=<id>        GET list (no bodies)            (admin token)
 *   /api/events/<id>              GET detail · DELETE             (admin token)
 *   /api/events/<id>/replay       POST {url} -> replay to url     (admin token)
 *   /api/events/<id>/verify       POST -> re-check signature now  (admin token)
 *
 * Secrets (all optional except ADMIN_TOKEN; see SETUP.md / CUSTOMIZE.md)
 *   ADMIN_TOKEN              required for dashboard + API (fail closed without it)
 *   STRIPE_WEBHOOK_SECRET    whsec_...  -> verifies "stripe-signature"
 *   GITHUB_WEBHOOK_SECRET    -> verifies "x-hub-signature-256"
 *   SHOPIFY_WEBHOOK_SECRET   -> verifies "x-shopify-hmac-sha256"
 *   DISCORD_WEBHOOK_URL      -> alert on every captured event
 *   TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID -> alert on every captured event
 *
 * Vars (wrangler.jsonc): RETENTION_DAYS, MAX_INBOXES, MAX_EVENTS_PER_INBOX, BODY_LIMIT
 */

const VERSION = "1.0.0";
const PRODUCT = "webhook-inbox";

/* --------------------------------------------------------------------------
 * Small helpers
 * ------------------------------------------------------------------------ */

function json(data, status, extraHeaders) {
  const h = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };
  if (extraHeaders) Object.assign(h, extraHeaders);
  return new Response(JSON.stringify(data), { status: status || 200, headers: h });
}

function err(status, message) {
  return json({ ok: false, error: message }, status);
}

function num(v, dflt) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : dflt;
}

function limits(env) {
  return {
    retentionDays: num(env && env.RETENTION_DAYS, 7),
    maxInboxes: num(env && env.MAX_INBOXES, 20),
    maxEvents: num(env && env.MAX_EVENTS_PER_INBOX, 500),
    bodyLimit: num(env && env.BODY_LIMIT, 65536), // max stored characters per body
  };
}

const INBOX_RE = /^[a-z0-9][a-z0-9-]{0,39}$/;

/** Truncate an IP for privacy: IPv4 keeps /24, IPv6 keeps /48. */
function ipTruncate(ip) {
  if (!ip) return "";
  if (ip.includes(":")) {
    const g = ip.split(":").filter(Boolean);
    return g.length ? g.slice(0, 3).join(":") + "::/48" : "";
  }
  const p = ip.split(".");
  if (p.length !== 4) return "";
  return p.slice(0, 3).join(".") + ".0/24";
}

/** Constant-time-ish comparison for hex/base64 strings of equal length. */
function constTimeEq(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function toHex(buf) {
  const v = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < v.length; i++) s += v[i].toString(16).padStart(2, "0");
  return s;
}

function toB64(buf) {
  const v = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < v.length; i++) s += String.fromCharCode(v[i]);
  return btoa(s);
}

async function hmacRaw(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  return crypto.subtle.sign("HMAC", key, enc.encode(message));
}

const hmacHex = (secret, message) => hmacRaw(secret, message).then(toHex);
const hmacB64 = (secret, message) => hmacRaw(secret, message).then(toB64);

/* --------------------------------------------------------------------------
 * Signature presets (Stripe / GitHub / Shopify)
 * ------------------------------------------------------------------------ */

const PROVIDERS = [
  { name: "stripe", header: "stripe-signature", secretVar: "STRIPE_WEBHOOK_SECRET" },
  { name: "github", header: "x-hub-signature-256", secretVar: "GITHUB_WEBHOOK_SECRET" },
  { name: "shopify", header: "x-shopify-hmac-sha256", secretVar: "SHOPIFY_WEBHOOK_SECRET" },
];

async function verifySignature(headers, body, env) {
  for (const p of PROVIDERS) {
    const raw = headers.get(p.header);
    if (!raw) continue;
    const secret = env && env[p.secretVar];
    if (!secret) {
      return { provider: p.name, ok: -1, detail: p.header + " present but " + p.secretVar + " is not configured — set the secret (npx wrangler secret put " + p.secretVar + ") and use Re-verify." };
    }
    if (p.name === "stripe") return verifyStripe(raw, body, secret);
    if (p.name === "github") return verifyGitHub(raw, body, secret);
    if (p.name === "shopify") return verifyShopify(raw, body, secret);
  }
  return { provider: "", ok: -1, detail: "no known signature header on this request" };
}

async function verifyStripe(headerVal, body, secret) {
  // Stripe: header "t=<unix>,v1=<hex>" — HMAC-SHA256 over "<t>.<body>"
  const parts = {};
  for (const chunk of String(headerVal).split(",")) {
    const i = chunk.indexOf("=");
    if (i > 0) parts[chunk.slice(0, i).trim()] = chunk.slice(i + 1).trim();
  }
  const t = parts["t"];
  const sigs = String(headerVal).split(",").filter(s => s.trim().startsWith("v1=")).map(s => s.trim().slice(3));
  if (!t || sigs.length === 0) {
    return { provider: "stripe", ok: 0, detail: "malformed stripe-signature header (expected t=...,v1=...)" };
  }
  const expected = await hmacHex(secret, t + "." + body);
  let matched = false;
  for (const s of sigs) if (constTimeEq(s, expected)) matched = true;
  if (!matched) {
    return { provider: "stripe", ok: 0, detail: "HMAC mismatch — check that STRIPE_WEBHOOK_SECRET is the signing secret of THIS endpoint (whsec_...) and that the raw body was not re-serialized" };
  }
  const skew = Math.abs(Math.floor(Date.now() / 1000) - parseInt(t, 10));
  if (!Number.isFinite(skew) || skew > 300) {
    return { provider: "stripe", ok: 0, detail: "signature valid, but timestamp is outside Stripe's 5-minute tolerance (skew " + skew + "s) — Stripe itself would reject this delivery as a replay" };
  }
  return { provider: "stripe", ok: 1, detail: "HMAC valid (timestamp within 5-minute tolerance, skew " + skew + "s)" };
}

async function verifyGitHub(headerVal, body, secret) {
  // GitHub: header "sha256=<hex>" — HMAC-SHA256 over the raw body
  const m = /^sha256=([0-9a-fA-F]+)$/.exec(String(headerVal).trim());
  if (!m) {
    return { provider: "github", ok: 0, detail: "malformed x-hub-signature-256 header (expected sha256=<hex>)" };
  }
  const expected = await hmacHex(secret, body);
  if (!constTimeEq(m[1].toLowerCase(), expected)) {
    return { provider: "github", ok: 0, detail: "HMAC mismatch — check GITHUB_WEBHOOK_SECRET matches the secret entered in the GitHub webhook settings" };
  }
  return { provider: "github", ok: 1, detail: "HMAC valid (sha256 over raw body)" };
}

async function verifyShopify(headerVal, body, secret) {
  // Shopify: base64 HMAC-SHA256 over the raw body
  const expected = await hmacB64(secret, body);
  if (!constTimeEq(String(headerVal).trim(), expected)) {
    return { provider: "shopify", ok: 0, detail: "HMAC mismatch — check SHOPIFY_WEBHOOK_SECRET matches the app's API secret key" };
  }
  return { provider: "shopify", ok: 1, detail: "HMAC valid (base64 over raw body)" };
}

/* --------------------------------------------------------------------------
 * D1 access (all statements in one place — easy to audit and to mock)
 * ------------------------------------------------------------------------ */

const Q = {
  inboxGet: "SELECT id, note, destination, created_at FROM inboxes WHERE id = ?1",
  inboxInsert: "INSERT INTO inboxes (id, note, destination, created_at) VALUES (?1, ?2, ?3, ?4)",
  inboxCount: "SELECT COUNT(*) AS n FROM inboxes",
  inboxList: "SELECT id, note, destination, created_at FROM inboxes ORDER BY created_at DESC",
  inboxUpdate: "UPDATE inboxes SET note = ?1, destination = ?2 WHERE id = ?3",
  inboxDelete: "DELETE FROM inboxes WHERE id = ?1",
  eventInsert: "INSERT INTO events (id, inbox_id, ts, method, path, ip, size, truncated, headers, body, sig_provider, sig_ok, sig_detail, replays) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14)",
  eventCounts: "SELECT inbox_id, COUNT(*) AS n, MAX(ts) AS last_ts FROM events GROUP BY inbox_id",
  eventList: "SELECT id, ts, method, path, ip, size, truncated, sig_provider, sig_ok, sig_detail, replays FROM events WHERE inbox_id = ?1 ORDER BY ts DESC LIMIT ?2",
  eventGet: "SELECT * FROM events WHERE id = ?1",
  eventDelete: "DELETE FROM events WHERE id = ?1",
  eventSetReplays: "UPDATE events SET replays = ?1 WHERE id = ?2",
  eventCap: "DELETE FROM events WHERE inbox_id = ?1 AND id NOT IN (SELECT id FROM events WHERE inbox_id = ?1 ORDER BY ts DESC LIMIT ?2)",
  sweep: "DELETE FROM events WHERE ts < ?1 OR inbox_id NOT IN (SELECT id FROM inboxes)",
};

class Store {
  constructor(env) { this.db = env.DB; }

  async getInbox(id) {
    const r = await this.db.prepare(Q.inboxGet).bind(id).first();
    return r || null;
  }
  async createInbox(id, note, destination, ts) {
    await this.db.prepare(Q.inboxInsert).bind(id, note || "", destination || "", ts).run();
  }
  async countInboxes() {
    const r = await this.db.prepare(Q.inboxCount).first();
    return r ? r.n : 0;
  }
  async listInboxes() {
    const counts = {};
    try {
      const rs = await this.db.prepare(Q.eventCounts).all();
      for (const row of rs.results || []) counts[row.inbox_id] = { n: row.n, last_ts: row.last_ts };
    } catch (e) { /* empty events table on a fresh install */ }
    const rs = await this.db.prepare(Q.inboxList).all();
    return (rs.results || []).map(r => ({
      id: r.id, note: r.note, destination: r.destination, created_at: r.created_at,
      events: counts[r.id] ? counts[r.id].n : 0,
      last_ts: counts[r.id] ? counts[r.id].last_ts : 0,
    }));
  }
  async updateInbox(id, note, destination) {
    await this.db.prepare(Q.inboxUpdate).bind(note, destination, id).run();
  }
  async deleteInbox(id) {
    await this.db.prepare("DELETE FROM events WHERE inbox_id = ?1").bind(id).run();
    await this.db.prepare(Q.inboxDelete).bind(id).run();
  }
  async insertEvent(ev) {
    await this.db.prepare(Q.eventInsert).bind(
      ev.id, ev.inbox_id, ev.ts, ev.method, ev.path, ev.ip, ev.size, ev.truncated,
      ev.headers, ev.body, ev.sig_provider, ev.sig_ok, ev.sig_detail, ev.replays
    ).run();
  }
  async listEvents(inboxId, limit) {
    const rs = await this.db.prepare(Q.eventList).bind(inboxId, limit).all();
    return rs.results || [];
  }
  async getEvent(id) {
    const r = await this.db.prepare(Q.eventGet).bind(id).first();
    return r || null;
  }
  async deleteEvent(id) { await this.db.prepare(Q.eventDelete).bind(id).run(); }
  async saveReplays(id, replaysJson) {
    await this.db.prepare(Q.eventSetReplays).bind(replaysJson, id).run();
  }
  async capInbox(inboxId, max) {
    await this.db.prepare(Q.eventCap).bind(inboxId, max).run();
  }
  async sweep(retentionDays) {
    const cutoff = Date.now() - retentionDays * 86400000;
    await this.db.prepare(Q.sweep).bind(cutoff).run();
  }
}

/* --------------------------------------------------------------------------
 * Alerts (optional — fire and forget through ctx.waitUntil)
 * ------------------------------------------------------------------------ */

async function sendAlerts(env, ctx, ev) {
  const lines = [];
  const sig = ev.sig_provider
    ? (ev.sig_ok === 1 ? "signature OK (" + ev.sig_provider + ")"
      : ev.sig_ok === 0 ? "signature FAIL (" + ev.sig_provider + ")"
      : "signature unknown (" + ev.sig_provider + ")")
    : "no signature";
  lines.push("Webhook captured → inbox " + ev.inbox_id);
  lines.push(ev.method + " " + ev.path + " · " + (ev.ip || "ip n/a"));
  lines.push("size " + ev.size + "B" + (ev.truncated ? " (truncated)" : "") + " · " + sig);
  const text = lines.join("\n");
  const tasks = [];
  if (env && env.DISCORD_WEBHOOK_URL) {
    tasks.push(fetch(env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),
    }).then(r => r.text()).catch(() => {}));
  }
  if (env && env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    const url = "https://api.telegram.org/bot" + env.TELEGRAM_BOT_TOKEN + "/sendMessage";
    tasks.push(fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: text }),
    }).then(r => r.text()).catch(() => {}));
  }
  for (const t of tasks) if (ctx && ctx.waitUntil) ctx.waitUntil(t);
}

/* --------------------------------------------------------------------------
 * Request handling
 * ------------------------------------------------------------------------ */

function clientIp(request) {
  const fwd = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "";
  return ipTruncate(fwd.split(",")[0].trim());
}

async function handleCapture(request, env, ctx, inboxRaw) {
  const inboxId = String(inboxRaw || "").toLowerCase();
  if (!INBOX_RE.test(inboxId)) {
    return err(404, "invalid inbox id (use a-z, 0-9 and '-', max 40 chars): /w/<inbox>");
  }
  const L = limits(env);
  const store = new Store(env);
  let inbox = await store.getInbox(inboxId);
  if (!inbox) {
    const n = await store.countInboxes();
    if (n >= L.maxInboxes) {
      return err(429, "inbox limit reached (" + L.maxInboxes + ") — delete an inbox in the dashboard or raise MAX_INBOXES");
    }
    await store.createInbox(inboxId, "", "", Date.now());
    inbox = await store.getInbox(inboxId);
  }

  const body = await request.text();
  const headers = {};
  request.headers.forEach((v, k) => { headers[k] = v; });
  const sizeBytes = new TextEncoder().encode(body).length;
  const truncated = body.length > L.bodyLimit;
  const storedBody = truncated ? body.slice(0, L.bodyLimit) : body;
  const sig = await verifySignature(request.headers, storedBody, env);

  const ev = {
    id: crypto.randomUUID(),
    inbox_id: inboxId,
    ts: Date.now(),
    method: (request.method || "GET").toUpperCase(),
    path: new URL(request.url).pathname + (new URL(request.url).search || ""),
    ip: clientIp(request),
    size: sizeBytes,
    truncated: truncated ? 1 : 0,
    headers: JSON.stringify(headers),
    body: storedBody,
    sig_provider: sig.provider,
    sig_ok: sig.ok,
    sig_detail: sig.detail,
    replays: "[]",
  };
  await store.insertEvent(ev);
  await store.capInbox(inboxId, L.maxEvents);
  if (env && (env.DISCORD_WEBHOOK_URL || (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID))) {
    ctx.waitUntil(sendAlerts(env, ctx, ev));
  }
  return json({ received: true, event: ev.id, inbox: inboxId, truncated: !!truncated }, 200);
}

function authorized(request, env) {
  const token = env && env.ADMIN_TOKEN;
  if (!token) {
    return { ok: false, resp: err(401, "ADMIN_TOKEN is not configured. Run: npx wrangler secret put ADMIN_TOKEN — the dashboard and API stay closed until then.") };
  }
  const h = request.headers.get("authorization") || "";
  const provided = h.startsWith("Bearer ") ? h.slice(7).trim() : (request.headers.get("x-admin-token") || "").trim();
  if (!provided || !constTimeEq(provided, token)) {
    return { ok: false, resp: err(401, "unauthorized — open the dashboard and set your admin token") };
  }
  return { ok: true };
}

async function doReplay(store, ev, destUrl) {
  let u;
  try { u = new URL(destUrl); } catch (e) { return { ts: Date.now(), url: String(destUrl || ""), status: 0, duration: 0, error: "invalid URL" }; }
  if (u.protocol !== "http:" && u.protocol !== "https:") return { ts: Date.now(), url: destUrl, status: 0, duration: 0, error: "URL must be http(s)" };
  let headers = {};
  try { headers = JSON.parse(ev.headers || "{}"); } catch (e) { headers = {}; }
  const skip = new Set(["host", "content-length", "connection", "keep-alive", "transfer-encoding", "upgrade", "cf-connecting-ip", "cf-ipcountry", "cf-ray", "cf-visitor", "x-forwarded-for", "x-forwarded-proto", "x-real-ip"]);
  const out = {};
  for (const k of Object.keys(headers)) if (!skip.has(k)) out[k] = headers[k];
  const started = Date.now();
  const rec = { ts: started, url: u.toString(), status: 0, duration: 0, error: "" };
  try {
    const init = { method: ev.method || "POST", headers: out, redirect: "manual" };
    if (ev.method !== "GET" && ev.method !== "HEAD" && ev.body != null && ev.body !== "") init.body = ev.body;
    const resp = await fetch(u.toString(), init);
    rec.status = resp.status;
    rec.duration = Date.now() - started;
  } catch (e) {
    rec.duration = Date.now() - started;
    rec.error = String(e && e.message ? e.message : e);
  }
  return rec;
}

function parseInboxInput(id) {
  const v = String(id || "").toLowerCase().trim();
  if (!INBOX_RE.test(v)) return null;
  return v;
}

async function handleApi(request, env, ctx, path) {
  const auth = authorized(request, env);
  if (!auth.ok) return auth.resp;
  const store = new Store(env);
  const seg = path.split("/").filter(Boolean); // ["api", ...]
  const m = request.method;

  if (seg[1] === "inboxes") {
    if (m === "GET" && seg.length === 2) {
      return json({ ok: true, inboxes: await store.listInboxes() });
    }
    if (m === "POST" && seg.length === 2) {
      const bodyIn = await request.json().catch(() => ({}));
      const id = parseInboxInput(bodyIn.id || (crypto.randomUUID().split("-")[0]));
      if (!id) return err(400, "inbox id must be a-z, 0-9 and '-' (max 40 chars, starts with a letter or digit)");
      const L = limits(env);
      if (await store.getInbox(id)) return err(409, "inbox '" + id + "' already exists");
      const n = await store.countInboxes();
      if (n >= L.maxInboxes) return err(403, "inbox limit reached (" + L.maxInboxes + ") — delete one first or raise MAX_INBOXES");
      let destination = String(bodyIn.destination || "").trim();
      if (destination) {
        try { const u = new URL(destination); if (u.protocol !== "https:" && u.protocol !== "http:") throw 0; }
        catch (e) { return err(400, "destination must be a valid http(s) URL"); }
      }
      await store.createInbox(id, String(bodyIn.note || "").slice(0, 200), destination, Date.now());
      return json({ ok: true, inbox: await store.getInbox(id) }, 201);
    }
    if ((m === "PATCH" || m === "PUT") && seg.length === 3) {
      const id = seg[2].toLowerCase();
      const ib = await store.getInbox(id);
      if (!ib) return err(404, "inbox not found");
      const bodyIn = await request.json().catch(() => ({}));
      let destination = bodyIn.destination !== undefined ? String(bodyIn.destination).trim() : ib.destination;
      if (destination) {
        try { const u = new URL(destination); if (u.protocol !== "https:" && u.protocol !== "http:") throw 0; }
        catch (e) { return err(400, "destination must be a valid http(s) URL"); }
      }
      const note = bodyIn.note !== undefined ? String(bodyIn.note).slice(0, 200) : ib.note;
      await store.updateInbox(id, note, destination);
      return json({ ok: true, inbox: await store.getInbox(id) });
    }
    if (m === "DELETE" && seg.length === 3) {
      const id = seg[2].toLowerCase();
      if (!(await store.getInbox(id))) return err(404, "inbox not found");
      await store.deleteInbox(id);
      return json({ ok: true, deleted: id });
    }
  }

  if (seg[1] === "events") {
    if (m === "GET" && seg.length === 2) {
      const url = new URL(request.url);
      const inbox = (url.searchParams.get("inbox") || "").toLowerCase();
      if (!INBOX_RE.test(inbox)) return err(400, "pass ?inbox=<id> (a-z, 0-9, '-')");
      const limit = Math.min(num(url.searchParams.get("limit"), 50), 200);
      const events = await store.listEvents(inbox, limit);
      for (const e of events) {
        if (typeof e.replays === "string" && e.replays) {
          try { e.replays = JSON.parse(e.replays); } catch (x) { e.replays = []; }
        } else e.replays = [];
      }
      return json({ ok: true, events });
    }
    if (seg.length >= 3) {
      const id = seg[2];
      const ev = await store.getEvent(id);
      if (!ev) return err(404, "event not found");
      if (m === "GET" && seg.length === 3) {
        let replays = [];
        try { replays = JSON.parse(ev.replays || "[]"); } catch (x) { replays = []; }
        return json({ ok: true, event: Object.assign({}, ev, { replays }) });
      }
      if (m === "DELETE" && seg.length === 3) {
        await store.deleteEvent(id);
        return json({ ok: true, deleted: id });
      }
      if (m === "POST" && seg[3] === "replay") {
        const bodyIn = await request.json().catch(() => ({}));
        const dest = String(bodyIn.url || "").trim() || (await store.getInbox(ev.inbox_id) || {}).destination || "";
        if (!dest) return err(400, "no URL given and the inbox has no default destination");
        const rec = await doReplay(store, ev, dest);
        if (rec.error && rec.status === 0 && !rec.duration) return err(400, rec.error);
        let replays = [];
        try { replays = JSON.parse(ev.replays || "[]"); } catch (x) { replays = []; }
        replays.unshift(rec);
        replays = replays.slice(0, 10);
        await store.saveReplays(id, JSON.stringify(replays));
        return json({ ok: true, replay: rec, replays });
      }
      if (m === "POST" && seg[3] === "verify") {
        let headers = {};
        try { headers = JSON.parse(ev.headers || "{}"); } catch (x) { headers = {}; }
        const fake = { get: (k) => headers[String(k).toLowerCase()] == null ? null : headers[String(k).toLowerCase()] };
        const sig = await verifySignature(fake, ev.body || "", env);
        return json({ ok: true, signature: sig });
      }
    }
  }

  return err(404, "unknown API route: " + m + " /" + seg.join("/"));
}

async function handle(request, env, ctx) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/healthz") return new Response("ok " + PRODUCT + " " + VERSION, { headers: { "Content-Type": "text/plain; charset=utf-8" } });

  if (path === "/" || path === "/dashboard") {
    return new Response(DASHBOARD_HTML, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
  }

  if (path === "/w" || path === "/w/") {
    return Response.redirect(url.origin + "/", 302);
  }

  if (path.startsWith("/w/")) {
    return handleCapture(request, env, ctx, path.slice(3).split("/")[0]);
  }

  if (path === "/api" || path.startsWith("/api/")) {
    return handleApi(request, env, ctx, path);
  }

  return err(404, "not found — capture endpoints live under /w/<inbox>, the dashboard lives at /");
}

export default {
  async fetch(request, env, ctx) {
    try {
      return await handle(request, env, ctx);
    } catch (e) {
      return err(500, "worker error: " + String(e && e.message ? e.message : e));
    }
  },
  async scheduled(controller, env, ctx) {
    const L = limits(env);
    ctx.waitUntil(new Store(env).sweep(L.retentionDays));
  },
};

/* --------------------------------------------------------------------------
 * Dashboard — single inline HTML page, no external assets, no build step.
 * ------------------------------------------------------------------------ */

const DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>Webhook Inbox — dashboard</title>
<style>
  :root {
    --paper:#F7F8FA; --alt:#EEF2F7; --deep:#16243D; --accent:#1D4ED8; --accent-dark:#1E40AF;
    --amber:#F2B33D; --ink:#1F2A3A; --muted:#55627A; --line:#DCE3EE; --bad:#B42318; --good:#0E7C66;
  }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:var(--paper); color:var(--ink); font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif; }
  a { color:var(--accent); }
  button, input, select { font:inherit; }
  button { cursor:pointer; }
  a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible { outline:3px solid var(--amber); outline-offset:2px; }
  header.bar { background:var(--deep); color:#E8EDF6; padding:12px 20px; display:flex; gap:12px 20px; align-items:center; flex-wrap:wrap; }
  .logo { font-weight:800; font-size:17px; color:#fff; }
  .logo em { color:var(--amber); font-style:normal; }
  .spacer { flex:1; }
  .tokenbox { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
  .tokenbox input { min-height:38px; padding:6px 10px; border-radius:8px; border:1px solid rgba(255,255,255,.35); background:rgba(255,255,255,.08); color:#fff; width:230px; }
  .tokenbox input::placeholder { color:#9DB0CC; }
  .dot { width:10px; height:10px; border-radius:50%; background:var(--bad); display:inline-block; }
  .dot.ok { background:#37C58A; }
  .btn { display:inline-flex; align-items:center; justify-content:center; min-height:38px; padding:7px 14px; border-radius:9px; border:1px solid var(--line); background:#fff; color:var(--ink); font-weight:600; font-size:14px; transition:background-color .18s ease; }
  .btn:hover { background:var(--alt); }
  .btn.primary { background:var(--accent); border-color:var(--accent); color:#fff; }
  .btn.primary:hover { background:var(--accent-dark); }
  .btn.danger { color:var(--bad); }
  .btn.sm { min-height:30px; padding:4px 10px; font-size:13px; }
  main { max-width:1180px; margin:0 auto; padding:22px 20px 60px; }
  .row { display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-bottom:14px; }
  .row select { min-height:38px; padding:6px 10px; border-radius:8px; border:1.5px solid #C9D5E6; background:#fff; min-width:200px; }
  .urlhint { color:var(--muted); font-size:13px; }
  .urlhint code { background:var(--alt); border:1px solid var(--line); border-radius:6px; padding:2px 7px; font-size:12.5px; color:var(--deep); }
  .card { background:#fff; border:1px solid var(--line); border-radius:12px; overflow:hidden; }
  table { width:100%; border-collapse:collapse; font-size:14px; }
  th { text-align:left; font-size:12px; text-transform:uppercase; letter-spacing:.08em; color:var(--muted); padding:10px 14px; border-bottom:1px solid var(--line); background:var(--alt); }
  td { padding:9px 14px; border-bottom:1px solid var(--line); vertical-align:top; }
  tr.ev { cursor:pointer; }
  tr.ev:hover { background:#F2F6FC; }
  tr.ev.sel { background:#EAF1FB; }
  td.mono, .mono { font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:12.5px; }
  .badge { display:inline-block; font-size:11.5px; font-weight:800; letter-spacing:.04em; border-radius:999px; padding:3px 10px; }
  .b-ok { background:#E5F5EE; color:var(--good); }
  .b-bad { background:#FBEFED; color:var(--bad); }
  .b-unk { background:var(--alt); color:var(--muted); }
  .empty { padding:36px 20px; text-align:center; color:var(--muted); }
  .two { display:grid; gap:18px; grid-template-columns:1fr; margin-top:18px; }
  @media (min-width:900px) { .two { grid-template-columns:5fr 7fr; } }
  .panel { background:#fff; border:1px solid var(--line); border-radius:12px; padding:18px; }
  .panel h2 { font-size:15px; color:var(--deep); margin-bottom:10px; }
  .kv { font-size:13.5px; margin-bottom:10px; }
  .kv b { color:var(--deep); }
  pre.body { background:#0F1A2E; color:#D9E4F5; border-radius:10px; padding:14px; overflow:auto; max-height:420px; font-size:12.5px; line-height:1.5; white-space:pre-wrap; word-break:break-word; }
  .sigline { border-left:4px solid var(--line); padding:8px 12px; background:var(--alt); border-radius:8px; font-size:13.5px; margin:10px 0; }
  .sigline.ok { border-color:var(--good); }
  .sigline.bad { border-color:var(--bad); }
  table.hd { font-size:12.5px; }
  table.hd td, table.hd th { padding:5px 10px; }
  .replaybox { display:flex; gap:8px; flex-wrap:wrap; margin:10px 0; }
  .replaybox input { flex:1; min-width:220px; min-height:38px; padding:6px 10px; border-radius:8px; border:1.5px solid #C9D5E6; }
  .rl { font-size:13px; padding:6px 0; border-bottom:1px dashed var(--line); }
  .muted { color:var(--muted); font-size:12.5px; }
  .hidden { display:none; }
  .msg { font-size:13.5px; margin-top:10px; padding:10px 12px; border-radius:8px; }
  .msg.err { background:#FBEFED; color:#8C3A34; }
  .msg.ok { background:#EAF4EE; color:#0E7C66; }
  dialog { border:1px solid var(--line); border-radius:14px; padding:22px; max-width:420px; width:92%; }
  dialog::backdrop { background:rgba(15,26,46,.5); }
  dialog h3 { color:var(--deep); margin-bottom:12px; }
  dialog label { display:block; font-size:13px; font-weight:700; margin:10px 0 4px; color:var(--deep); }
  dialog input { width:100%; min-height:40px; padding:8px 10px; border-radius:8px; border:1.5px solid #C9D5E6; }
  .dlg-actions { display:flex; gap:10px; justify-content:flex-end; margin-top:16px; }
  footer { max-width:1180px; margin:26px auto 0; padding:0 20px; color:var(--muted); font-size:12.5px; text-align:center; }
</style>
</head>
<body>
<header class="bar">
  <span class="logo">Webhook <em>Inbox</em></span>
  <span class="dot" id="authdot" title="admin token status"></span>
  <span class="spacer"></span>
  <span class="tokenbox">
    <input id="token" type="password" placeholder="admin token" autocomplete="off">
    <button class="btn sm" id="tokensave" type="button">Save token</button>
  </span>
</header>
<main>
  <div class="row">
    <label class="muted" for="inboxsel">Inbox</label>
    <select id="inboxsel" aria-label="Inbox"><option value="">loading…</option></select>
    <button class="btn" id="newinbox" type="button">New inbox</button>
    <button class="btn danger" id="delinbox" type="button">Delete inbox</button>
    <span class="spacer"></span>
    <span class="urlhint">point your provider at <code id="capurl">…</code> (any method, any body)</span>
  </div>
  <div id="banner" class="msg hidden"></div>

  <div class="card">
    <table aria-label="Captured events">
      <thead><tr><th>time</th><th>method</th><th>path</th><th>source ip</th><th>size</th><th>signature</th><th>replays</th></tr></thead>
      <tbody id="evrows"><tr><td colspan="7" class="empty">Pick or create an inbox.</td></tr></tbody>
    </table>
  </div>

  <div class="two">
    <div class="panel">
      <h2>Request detail</h2>
      <div id="detail"><p class="muted">Click a row above to inspect headers, body and signature.</p></div>
    </div>
    <div class="panel">
      <h2>Replay</h2>
      <div class="replaybox">
        <input id="replayurl" type="url" placeholder="https://your-app.example/api/handler">
        <button class="btn primary" id="replaybtn" type="button">Replay event</button>
        <button class="btn" id="saveDest" type="button" title="Store this URL as the inbox default">Save as default</button>
      </div>
      <p class="muted">Replays resend the stored method, headers and body. Hop-by-hop and CF headers are skipped. Tip: point the first replay at a staging URL, not production.</p>
      <div id="replays"></div>
      <h2 style="margin-top:18px">Re-verify signature</h2>
      <p class="muted">Re-checks the stored request against the worker secrets you have set right now — useful when you added a secret after the event arrived.</p>
      <div style="margin-top:8px"><button class="btn" id="verifybtn" type="button">Verify with current secrets</button></div>
      <div id="veres" class="sigline hidden"></div>
    </div>
  </div>
</main>
<footer>Webhook Kit · self-hosted on your own Cloudflare account · events auto-delete after your retention setting</footer>

<dialog id="dlg">
  <h3>New inbox</h3>
  <label for="dlgid">Inbox id (a-z, 0-9, '-', max 40)</label>
  <input id="dlgid" placeholder="stripe-test" autocomplete="off">
  <label for="dlgnote">Note (optional)</label>
  <input id="dlgnote" placeholder="checkout debugging session" autocomplete="off">
  <label for="dlgdest">Default replay destination (optional)</label>
  <input id="dlgdest" placeholder="https://your-app.example/api/handler" autocomplete="off">
  <div class="dlg-actions">
    <button class="btn" id="dlgcancel" type="button">Cancel</button>
    <button class="btn primary" id="dlgcreate" type="button">Create inbox</button>
  </div>
</dialog>

<script>
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var state = { token: "", inbox: "", events: [], sel: null };

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmtTime(ts) {
    var d = new Date(Number(ts));
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes()) + ":" + p(d.getSeconds());
  }
  function banner(text, kind) {
    var b = $("banner");
    if (!text) { b.className = "msg hidden"; b.textContent = ""; return; }
    b.className = "msg " + (kind || "err");
    b.textContent = text;
  }
  function api(method, path, body) {
    return fetch(path, {
      method: method,
      headers: { "Authorization": "Bearer " + state.token, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (d) {
        if (!r.ok) { var e = new Error(d.error || ("HTTP " + r.status)); e.status = r.status; throw e; }
        return d;
      });
    });
  }
  function setAuthDot(ok) { $("authdot").className = "dot" + (ok ? " ok" : ""); $("authdot").title = ok ? "admin token accepted" : "admin token missing or rejected"; }

  function loadInboxes(keep) {
    return api("GET", "/api/inboxes").then(function (d) {
      var sel = $("inboxsel");
      sel.innerHTML = "";
      if (!d.inboxes.length) {
        var o = document.createElement("option"); o.value = ""; o.textContent = "no inboxes yet — create one"; sel.appendChild(o);
      }
      d.inboxes.forEach(function (ib) {
        var o = document.createElement("option");
        o.value = ib.id;
        o.textContent = ib.id + " (" + ib.events + " events)";
        sel.appendChild(o);
      });
      if (keep && d.inboxes.some(function (ib) { return ib.id === keep; })) sel.value = keep;
      state.inbox = sel.value;
      updateCapUrl();
      loadEvents();
    });
  }
  function updateCapUrl() {
    $("capurl").textContent = state.inbox ? (location.origin + "/w/" + state.inbox) : (location.origin + "/w/<inbox>");
  }

  function loadEvents() {
    if (!state.inbox) { $("evrows").innerHTML = '<tr><td colspan="7" class="empty">No inbox selected.</td></tr>'; state.events = []; renderDetail(); return; }
    api("GET", "/api/events?inbox=" + encodeURIComponent(state.inbox) + "&limit=50").then(function (d) {
      state.events = d.events || [];
      renderEvents();
    }).catch(function (e) { banner(e.message); });
  }
  function sigBadge(e) {
    if (e.sig_provider === "") return '<span class="badge b-unk">none</span>';
    var label = e.sig_provider.toUpperCase() + (e.sig_ok === 1 ? " OK" : e.sig_ok === 0 ? " FAIL" : " ?");
    var cls = e.sig_ok === 1 ? "b-ok" : e.sig_ok === 0 ? "b-bad" : "b-unk";
    return '<span class="badge ' + cls + '">' + label + "</span>";
  }
  function renderEvents() {
    var t = $("evrows");
    if (!state.events.length) { t.innerHTML = '<tr><td colspan="7" class="empty">No events yet. Send one: curl -X POST ' + esc($("capurl").textContent) + " -d '&#123;&quot;ping&quot;:1&#125;'</td></tr>"; return; }
    var rows = state.events.map(function (e) {
      return '<tr class="ev" data-id="' + esc(e.id) + '"><td class="mono">' + fmtTime(e.ts) + '</td><td class="mono">' + esc(e.method) + '</td><td class="mono">' + esc(e.path) + "</td><td>" + esc(e.ip) + '</td><td class="mono">' + e.size + "B" + (e.truncated ? "*" : "") + '</td><td>' + sigBadge(e) + '</td><td class="mono">' + (e.replays ? e.replays.length : 0) + "</td></tr>";
    }).join("");
    t.innerHTML = rows;
    Array.prototype.forEach.call(t.querySelectorAll("tr.ev"), function (tr) {
      tr.addEventListener("click", function () { selectEvent(tr.getAttribute("data-id")); });
    });
  }
  function currentEvent() {
    return state.events.filter(function (e) { return e.id === state.sel; })[0] || null;
  }
  function selectEvent(id) {
    state.sel = id;
    Array.prototype.forEach.call($("evrows").querySelectorAll("tr.ev"), function (tr) {
      tr.className = tr.getAttribute("data-id") === id ? "ev sel" : "ev";
    });
    api("GET", "/api/events/" + encodeURIComponent(id)).then(function (d) {
      renderDetail(d.event);
      var lastReplay = (d.event.replays || [])[0];
      if (lastReplay) $("replayurl").value = lastReplay.url;
      renderReplays(d.event.replays || []);
    }).catch(function (e) { banner(e.message); });
  }
  function renderDetail(ev) {
    var box = $("detail");
    if (!ev) { box.innerHTML = '<p class="muted">Click a row above to inspect headers, body and signature.</p>'; return; }
    var sigLine = "";
    if (ev.sig_provider) {
      var cls = ev.sig_ok === 1 ? "ok" : ev.sig_ok === 0 ? "bad" : "";
      sigLine = '<div class="sigline ' + cls + '"><b>' + esc(ev.sig_provider) + (ev.sig_ok === 1 ? ": signature OK" : ev.sig_ok === 0 ? ": signature FAIL" : ": not verified") + "</b><br>" + esc(ev.sig_detail) + "</div>";
    }
    var pretty = ev.body || "(empty body)";
    try { pretty = JSON.stringify(JSON.parse(ev.body), null, 2); } catch (e) { /* not JSON — show raw */ }
    var headerRows = Object.keys(ev.headers || {}).map(function (k) {
      return "<tr><td class='mono'><b>" + esc(k) + "</b></td><td class='mono'>" + esc(ev.headers[k]) + "</td></tr>";
    }).join("");
    var curl = buildCurl(ev);
    box.innerHTML =
      '<div class="kv"><b>' + esc(ev.method) + " " + esc(ev.path) + "</b> · " + fmtTime(ev.ts) + " · " + ev.size + "B" + (ev.truncated ? " (truncated)" : "") + " · from " + esc(ev.ip) + "</div>" +
      sigLine +
      "<h2 style='margin-top:14px'>Headers</h2><div class='card' style='margin-top:6px'><table class='hd'><tbody>" + (headerRows || "<tr><td class='muted'>none</td></tr>") + "</tbody></table></div>" +
      "<h2 style='margin-top:14px'>Body</h2><pre class='body'>" + esc(pretty) + "</pre>" +
      "<div style='margin-top:12px'><button class='btn sm' id='copycurl' type='button'>Copy as cURL</button></div>";
    var cb = $("copycurl");
    if (cb) cb.addEventListener("click", function () {
      copyText(curl, cb);
    });
  }
  function shellQ(s) {
    // POSIX single-quote escaping without literal backslash chars in this file:
    // '  ->  '\''   built from char codes 39,92,39,39
    var q = String.fromCharCode(39);
    var repl = String.fromCharCode(39, 92, 39, 39);
    return q + String(s == null ? "" : s).split(q).join(repl) + q;
  }
  function buildCurl(ev) {
    var hdrs = Object.keys(ev.headers || {}).filter(function (k) {
      return ["host", "content-length", "connection", "keep-alive", "transfer-encoding", "cf-connecting-ip", "cf-ray", "cf-visitor", "cf-ipcountry", "x-forwarded-for", "x-forwarded-proto", "x-real-ip"].indexOf(k) === -1;
    }).map(function (k) { return "-H " + shellQ(k + ": " + ev.headers[k]); }).join(" ");
    var bodyPart = ev.body ? ("--data " + shellQ(ev.body)) : "";
    return ["curl -X " + ev.method, hdrs, bodyPart, shellQ(location.origin + ev.path)].filter(Boolean).join(" ");
  }
  function copyText(text, btn) {
    var done = function () { var t = btn.textContent; btn.textContent = "Copied"; setTimeout(function () { btn.textContent = t; }, 1200); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
    else done();
  }
  function renderReplays(list) {
    var box = $("replays");
    if (!list.length) { box.innerHTML = '<p class="muted" style="margin-top:8px">No replays yet.</p>'; return; }
    box.innerHTML = list.map(function (r) {
      var status = r.error ? ("error: " + esc(r.error)) : ("HTTP " + r.status);
      return '<div class="rl">' + fmtTime(r.ts) + " → " + esc(r.url) + " · <b>" + status + "</b> · " + r.duration + "ms</div>";
    }).join("");
  }

  function boot() {
    state.token = store("wk_token") || "";
    $("token").value = state.token;
    var saved = store("wk_inbox");
    if (saved) { $("inboxsel").dataset.pre = saved; }
    probeAndLoad();
  }
  function probeAndLoad() {
    if (!state.token) {
      setAuthDot(false);
      banner("Set your admin token (the ADMIN_TOKEN secret you created during setup) to open the inbox.");
      $("inboxsel").innerHTML = '<option value="">set the admin token first</option>';
      return;
    }
    api("GET", "/api/inboxes").then(function () {
      setAuthDot(true); banner("");
      var pre = $("inboxsel").dataset.pre;
      return loadInboxes(pre || undefined);
    }).catch(function (e) {
      setAuthDot(false);
      banner(e.message);
    });
  }

  $("tokensave").addEventListener("click", function () {
    state.token = $("token").value.trim();
    store("wk_token", state.token);
    probeAndLoad();
  });
  $("token").addEventListener("keydown", function (ev) { if (ev.key === "Enter") { ev.preventDefault(); $("tokensave").click(); } });
  $("inboxsel").addEventListener("change", function () {
    state.inbox = $("inboxsel").value;
    store("wk_inbox", state.inbox);
    updateCapUrl();
    state.sel = null;
    renderDetail();
    $("replays").innerHTML = "";
    loadEvents();
  });
  $("newinbox").addEventListener("click", function () { $("dlg").showModal(); });
  $("dlgcancel").addEventListener("click", function () { $("dlg").close(); });
  $("dlgcreate").addEventListener("click", function () {
    api("POST", "/api/inboxes", { id: $("dlgid").value, note: $("dlgnote").value, destination: $("dlgdest").value })
      .then(function (d) { $("dlg").close(); banner("Inbox '" + d.inbox.id + "' created — capture URL: " + location.origin + "/w/" + d.inbox.id, "ok"); return loadInboxes(d.inbox.id); })
      .catch(function (e) { $("dlgid").focus(); banner(e.message); });
  });
  $("delinbox").addEventListener("click", function () {
    if (!state.inbox) { banner("Pick an inbox to delete."); return; }
    if (!window.confirm("Delete inbox '" + state.inbox + "' and all its events?")) return;
    api("DELETE", "/api/inboxes/" + encodeURIComponent(state.inbox)).then(function () {
      banner("Inbox deleted.", "ok");
      state.sel = null; renderDetail();
      return loadInboxes();
    }).catch(function (e) { banner(e.message); });
  });
  $("replaybtn").addEventListener("click", function () {
    if (!state.sel) { banner("Select an event first."); return; }
    var url = $("replayurl").value.trim();
    if (!url) { banner("Enter a replay destination URL."); return; }
    $("replaybtn").disabled = true;
    api("POST", "/api/events/" + encodeURIComponent(state.sel) + "/replay", { url: url }).then(function (d) {
      $("replaybtn").disabled = false;
      banner("Replay sent — HTTP " + d.replay.status + " in " + d.replay.duration + "ms" + (d.replay.error ? " (" + d.replay.error + ")" : ""), d.replay.error || d.replay.status >= 400 ? "err" : "ok");
      renderReplays(d.replays || []);
      loadInboxes(state.inbox);
    }).catch(function (e) { $("replaybtn").disabled = false; banner(e.message); });
  });
  $("saveDest").addEventListener("click", function () {
    if (!state.inbox) { banner("Pick an inbox first."); return; }
    var url = $("replayurl").value.trim();
    if (!url) { banner("Enter the destination URL to save."); return; }
    api("PATCH", "/api/inboxes/" + encodeURIComponent(state.inbox), { destination: url })
      .then(function () { banner("Default destination saved for '" + state.inbox + "'.", "ok"); return loadInboxes(state.inbox); })
      .catch(function (e) { banner(e.message); });
  });
  $("verifybtn").addEventListener("click", function () {
    if (!state.sel) { banner("Select an event first."); return; }
    api("POST", "/api/events/" + encodeURIComponent(state.sel) + "/verify").then(function (d) {
      var s = d.signature;
      var box = $("veres");
      box.className = "sigline " + (s.ok === 1 ? "ok" : s.ok === 0 ? "bad" : "");
      box.innerHTML = "<b>" + esc(s.provider || "no provider") + (s.ok === 1 ? ": signature OK" : s.ok === 0 ? ": signature FAIL" : ": not verified") + "</b><br>" + esc(s.detail);
    }).catch(function (e) { banner(e.message); });
  });

  boot();
})();
</script>
</body>
</html>`;
