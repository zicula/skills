-- schema.sql — D1 tables for Webhook Inbox (additive + idempotent: safe to re-run).
-- Apply once after creating the database:
--   npx wrangler d1 execute webhook-inbox --remote --file=schema.sql

CREATE TABLE IF NOT EXISTS inboxes (
  id          TEXT PRIMARY KEY,        -- a-z, 0-9 and '-', max 40 chars
  note        TEXT NOT NULL DEFAULT '',
  destination TEXT NOT NULL DEFAULT '',-- default replay target
  created_at  INTEGER NOT NULL         -- epoch ms
);

CREATE TABLE IF NOT EXISTS events (
  id           TEXT PRIMARY KEY,       -- uuid
  inbox_id     TEXT NOT NULL,
  ts           INTEGER NOT NULL,       -- epoch ms
  method       TEXT NOT NULL,
  path         TEXT NOT NULL,
  ip           TEXT NOT NULL DEFAULT '',  -- truncated: IPv4 /24, IPv6 /48
  size         INTEGER NOT NULL DEFAULT 0,
  truncated    INTEGER NOT NULL DEFAULT 0,
  headers      TEXT NOT NULL DEFAULT '{}',
  body         TEXT NOT NULL DEFAULT '',
  sig_provider TEXT NOT NULL DEFAULT '',  -- stripe | github | shopify | ''
  sig_ok       INTEGER NOT NULL DEFAULT -1, -- 1 valid, 0 invalid, -1 unknown/not verified
  sig_detail   TEXT NOT NULL DEFAULT '',
  replays      TEXT NOT NULL DEFAULT '[]'
);

CREATE INDEX IF NOT EXISTS idx_events_inbox_ts ON events (inbox_id, ts DESC);
CREATE INDEX IF NOT EXISTS idx_events_ts ON events (ts);
