/**
 * worker.mjs — Docs Portal Kit: API key issue / validate / usage metering worker.
 *
 * Zero npm dependencies. Runs on Cloudflare Workers (free tier is enough for a
 * launched API) with one D1 database bound as env.DB and one secret:
 *
 *   wrangler secret put ADMIN_TOKEN     # long random string, owner only
 *
 * Routes
 * ------
 *   GET  /healthz                      → "ok <version>" (liveness for monitors)
 *   GET  /                             → small HTML welcome page
 *
 *   POST /admin/keys                   → issue a key           (admin)
 *   GET  /admin/keys                   → list keys + usage     (admin)
 *   POST /admin/keys/:id/revoke        → revoke a key          (admin)
 *   POST /admin/keys/:id/topup         → add prepaid credits   (admin)
 *
 *   POST /v1/validate                  → validate + meter a key (your customers)
 *   GET  /v1/usage                     → usage summary for a key
 *
 * The prepaid-credit model (quota counts down, no surprise invoices) is on
 * purpose: see SETUP.md "The billing loop".
 *
 * Keys are stored as SHA-256 hashes — a leaked database never leaks live keys.
 * With no ADMIN_TOKEN configured every admin route answers 401 (fail-closed).
 */

const VERSION = "1.0.0";
const MAX_KEYS_DEFAULT = 500;

const PLANS = {
  free:  { label: "Free",  credits: 1000 },
  pro:   { label: "Pro",   credits: 50000 },
  scale: { label: "Scale", credits: 250000 },
};

/* ---------------------------------------------------------------- helpers */

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data) + "\n", {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extra,
    },
  });
}

function cors(extra = {}) {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": "authorization, content-type",
    ...extra,
  };
}

function hex(buf) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sha256(text) {
  return hex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)));
}

function randomHex(chars) {
  const bytes = new Uint8Array(Math.ceil(chars / 2));
  crypto.getRandomValues(bytes);
  return hex(bytes.buffer).slice(0, chars);
}

function newRequestId() {
  return "req_" + randomHex(12);
}

function nowIso() {
  return new Date().toISOString();
}

function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

function bearer(request) {
  const h = request.headers.get("authorization") || "";
  const m = /^Bearer\s+(.+)$/i.exec(h.trim());
  return m ? m[1].trim() : "";
}

async function readJson(request) {
  try {
    const body = await request.json();
    return body && typeof body === "object" ? body : {};
  } catch {
    return {};
  }
}

/* ------------------------------------------------------------- db queries */

const db = {
  keyByHash: (DB, hash) =>
    DB.prepare("SELECT * FROM keys WHERE key_hash = ?").bind(hash).first(),
  keyById: (DB, id) =>
    DB.prepare("SELECT * FROM keys WHERE id = ?").bind(id).first(),
  insertKey: (DB, row) =>
    DB.prepare(
      "INSERT INTO keys (id, key_hash, label, plan, quota, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).bind(row.id, row.key_hash, row.label, row.plan, row.quota, row.status, row.created_at).run(),
  revoke: (DB, id) =>
    DB.prepare("UPDATE keys SET status = 'revoked' WHERE id = ? AND status = 'active'").bind(id).run(),
  topUp: (DB, add, id) =>
    DB.prepare("UPDATE keys SET quota = quota + ? WHERE id = ?").bind(add, id).run(),
  meter: (DB, keyId, day) =>
    DB.prepare(
      "INSERT INTO usage (key_id, day, count) VALUES (?, ?, 1) ON CONFLICT(key_id, day) DO UPDATE SET count = count + 1"
    ).bind(keyId, day).run(),
  used: (DB, keyId) =>
    DB.prepare("SELECT COALESCE(SUM(count), 0) AS used FROM usage WHERE key_id = ?").bind(keyId).first(),
  daily: (DB, keyId) =>
    DB.prepare("SELECT day, count FROM usage WHERE key_id = ? ORDER BY day DESC LIMIT 14").bind(keyId).all(),
  listKeys: (DB) =>
    DB.prepare("SELECT * FROM keys ORDER BY created_at DESC LIMIT 500").all(),
  countKeys: (DB) =>
    DB.prepare("SELECT COUNT(*) AS n FROM keys").first(),
};

/* ----------------------------------------------------------------- routes */

function welcomePage(origin) {
  const body = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Docs Portal Kit API</title></head>
<body style="font-family:system-ui,sans-serif;max-width:640px;margin:48px auto;padding:0 20px;line-height:1.6">
<h1>This API is up.</h1>
<p>Served by <a href="https://example.com" rel="nofollow">your API</a> on Docs Portal Kit v${VERSION}.</p>
<p>Public endpoints: <code>POST /v1/validate</code> and <code>GET /v1/usage</code> (Bearer key). Health: <code>GET /healthz</code>.</p>
<p><a href="${origin}/">Back to the docs portal</a></p>
</body></html>`;
  return new Response(body, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
}

function unauthorizedAdmin() {
  return json({ error: "unauthorized" }, 401, cors());
}

async function handle(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const method = request.method.toUpperCase();

  if (method === "OPTIONS") return new Response(null, { status: 204, headers: cors() });

  /* ---------------- public ---------------- */
  if (path === "/healthz" && method === "GET") {
    return new Response(`ok ${VERSION}\n`, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } });
  }
  if (path === "/" && method === "GET") return welcomePage(url.origin);

  if (path === "/v1/validate" && method === "POST") {
    const rid = newRequestId();
    const H = cors({ "x-request-id": rid });
    const token = bearer(request);
    if (!token) return json({ error: "invalid_key" }, 401, H);
    const row = await db.keyByHash(env.DB, await sha256(token));
    if (!row) return json({ error: "invalid_key" }, 401, H);
    if (row.status !== "active") return json({ error: "key_revoked", key_id: row.id }, 403, H);
    const body = await readJson(request);
    const meter = body.meter !== false;
    let used = (await db.used(env.DB, row.id)).used;
    if (used >= row.quota) return json({ error: "quota_exceeded", quota: row.quota, used }, 429, H);
    if (meter) {
      await db.meter(env.DB, row.id, todayUtc());
      used += 1;
    }
    return json({ valid: true, plan: row.plan, quota: row.quota, used, remaining: Math.max(0, row.quota - used) }, 200, H);
  }

  if (path === "/v1/usage" && method === "GET") {
    const H = cors({ "x-request-id": newRequestId() });
    const token = bearer(request);
    if (!token) return json({ error: "invalid_key" }, 401, H);
    const row = await db.keyByHash(env.DB, await sha256(token));
    if (!row) return json({ error: "invalid_key" }, 401, H);
    if (row.status !== "active") return json({ error: "key_revoked", key_id: row.id }, 403, H);
    const used = (await db.used(env.DB, row.id)).used;
    const days = (await db.daily(env.DB, row.id)).results || [];
    return json({ plan: row.plan, quota: row.quota, used, remaining: Math.max(0, row.quota - used), days }, 200, H);
  }

  /* ---------------- admin ---------------- */
  if (path === "/admin" || path.startsWith("/admin/")) {
    const expected = env.ADMIN_TOKEN;
    if (!expected || expected.length < 16) return unauthorizedAdmin(); // fail-closed
    if (bearer(request) !== expected) return unauthorizedAdmin();

    if (path === "/admin/keys" && method === "POST") {
      const body = await readJson(request);
      const plan = typeof body.plan === "string" && PLANS[body.plan] ? body.plan : "free";
      const label = typeof body.label === "string" ? body.label.trim().slice(0, 64) : "";
      let quota = Number(body.quota);
      if (!Number.isInteger(quota) || quota < 1) quota = PLANS[plan].credits;
      if (quota > 10_000_000) return json({ error: "quota_too_large" }, 400);
      const cap = Number.isInteger(Number(env.MAX_KEYS)) && Number(env.MAX_KEYS) > 0 ? Number(env.MAX_KEYS) : MAX_KEYS_DEFAULT;
      const n = (await db.countKeys(env.DB)).n;
      if (n >= cap) return json({ error: "key_cap_reached", cap }, 403);
      const plain = "dpk_live_" + randomHex(32); // shown exactly once, stored as a hash only
      const row = {
        id: "k_" + randomHex(24),
        key_hash: await sha256(plain),
        label: label || "unnamed key",
        plan,
        quota,
        status: "active",
        created_at: nowIso(),
      };
      await db.insertKey(env.DB, row);
      return json({ id: row.id, label: row.label, plan: row.plan, quota: row.quota, status: row.status, created_at: row.created_at, key: plain }, 201);
    }

    if (path === "/admin/keys" && method === "GET") {
      const rows = (await db.listKeys(env.DB)).results || [];
      const out = [];
      for (const r of rows) {
        const used = (await db.used(env.DB, r.id)).used;
        out.push({ id: r.id, label: r.label, plan: r.plan, quota: r.quota, status: r.status, created_at: r.created_at, used });
      }
      return json({ keys: out }, 200);
    }

    let m = /^\/admin\/keys\/([^/]+)\/revoke$/.exec(path);
    if (m && method === "POST") {
      const res = await db.revoke(env.DB, m[1]);
      if (!res.meta || res.meta.changes === 0) {
        const row = await db.keyById(env.DB, m[1]);
        if (!row) return json({ error: "not_found" }, 404);
        return json({ id: row.id, status: row.status }); // already revoked — idempotent
      }
      return json({ id: m[1], status: "revoked" }, 200);
    }

    m = /^\/admin\/keys\/([^/]+)\/topup$/.exec(path);
    if (m && method === "POST") {
      const body = await readJson(request);
      const add = Number(body.add);
      if (!Number.isInteger(add) || add < 1 || add > 10_000_000) return json({ error: "bad_add" }, 400);
      const row = await db.keyById(env.DB, m[1]);
      if (!row) return json({ error: "not_found" }, 404);
      const newQuota = row.quota + add; // compute before the update — don't trust the row snapshot afterwards
      await db.topUp(env.DB, add, m[1]);
      return json({ id: row.id, quota: newQuota }, 200);
    }

    return json({ error: "not_found" }, 404); // unknown admin route
  }

  return json({ error: "not_found" }, 404);   // unknown public route
}

export default {
  async fetch(request, env) {
    try {
      return await handle(request, env);
    } catch {
      return json({ error: "internal_error" }, 500, cors());
    }
  },
};
