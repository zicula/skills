-- schema.sql — Docs Portal Kit D1 schema
-- Apply with:  npx wrangler d1 execute docs-portal-db --remote --file=./schema.sql

CREATE TABLE IF NOT EXISTS keys (
  id         TEXT PRIMARY KEY,            -- k_<hex>  (public row id, safe to expose to the owner)
  key_hash   TEXT NOT NULL UNIQUE,        -- SHA-256 of the plain key — the plain key is never stored
  label      TEXT NOT NULL DEFAULT '',    -- owner's note ("customer@acme.io", "mobile app", …)
  plan       TEXT NOT NULL DEFAULT 'free',-- free | pro | scale (cosmetic + default quota)
  quota      INTEGER NOT NULL DEFAULT 1000, -- prepaid credits; validate() refuses at used >= quota
  status     TEXT NOT NULL DEFAULT 'active', -- active | revoked
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS usage (
  key_id TEXT NOT NULL,                  -- -> keys.id
  day    TEXT NOT NULL,                  -- UTC date, YYYY-MM-DD
  count  INTEGER NOT NULL DEFAULT 0,     -- metered calls that day
  PRIMARY KEY (key_id, day)
);

CREATE INDEX IF NOT EXISTS idx_usage_key_day ON usage (key_id, day);
