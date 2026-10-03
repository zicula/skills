---
name: webhook-kit
description: Self-hosts a private webhook inspector, verifier and replay tool on the user's own Cloudflare account (free plan) in 20-30 minutes - one dependency-free Worker with the dashboard built in plus two D1 tables. Any provider (Stripe, GitHub, Shopify, cron jobs) points at a capture URL under /w/<inbox>; every delivery is stored with full headers and body, IP truncated at ingest, and answered 2xx so providers stop retrying. HMAC presets for Stripe (5-minute tolerance), GitHub and Shopify give plain-language verdicts - which secret to set, tolerance exceeded, or a mismatch - and re-verify stored events against current secrets. Replay resends the stored method, headers and body to any URL in one click, hop-by-hop headers stripped, attempts logged. Optional Discord/Telegram alerts, nightly retention sweep, per-inbox caps, an admin-token API that fails closed, four limits tunable in one config file. Use when debugging webhook deliveries, verifying HMAC signatures, or replaying events without waiting for the provider.
---

# Webhook Kit

Self-host a private webhook inbox on your own Cloudflare account — one
dependency-free Worker with the inspector, signature verification and replay
built in, two D1 tables. Point Stripe, GitHub, Shopify or your own services
at a capture URL and every delivery lands in a database only you can see.
Extracted from the full Webhook Kit (same worker, same schema, same
runbooks).

## When to use

The user mentions any of: debugging webhook deliveries from Stripe, GitHub,
Shopify or a custom provider; wanting a capture URL to inspect payloads,
headers and signatures; verifying HMAC webhook signatures with a
plain-language verdict; replaying a stored delivery after fixing a handler;
watching webhook events in Discord or Telegram; self-hosting instead of a
hosted webhook inspection service.

## How to use this skill

1. **Start from the map.** Read `references/START-HERE.md` — the loop, the
   20-minute first path, honest limits and the file map. All paths are
   relative to `references/`.
2. **Deploy** (`references/SETUP.md`, ~20–30 min, five copy-paste
   commands). `npx wrangler login` → `d1 create webhook-inbox` → apply
   `schema.sql` (idempotent) → set the `ADMIN_TOKEN` secret (dashboard and
   API stay closed without it — fail closed) → `cd worker && npx wrangler
   deploy`. No npm dependencies, no build step, no Docker.
3. **Point a provider at it.** Capture endpoint is any method at
   `/w/<inbox>` — inboxes self-create on first hit and the worker answers
   2xx so providers stop retrying. For Stripe/GitHub/Shopify use the
   matching preset (`/w/stripe`, `/w/github`, `/w/shopify`) and set the
   provider secret (`STRIPE_WEBHOOK_SECRET`, `GITHUB_WEBHOOK_SECRET`,
   `SHOPIFY_WEBHOOK_SECRET`).
4. **Inspect and verify.** Open the deployed URL, paste the admin token.
   Every event shows headers, pretty-printed body, truncated source IP and
   a signature verdict that says *why* (which secret to set, Stripe
   5-minute tolerance exceeded, or a genuine mismatch). "Verify with
   current secrets" re-checks stored events after you add a secret;
   "Copy as cURL" for the terminal.
5. **Replay and alert.** Replay resends the stored method, headers and
   body to any URL (hop-by-hop and Cloudflare headers stripped, each
   attempt logged with status and duration) — point the first replay at
   staging, not production. Optionally set `DISCORD_WEBHOOK_URL` or
   `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` for a ping on every capture.
6. **Customize once, reuse forever.** `references/CUSTOMIZE.md` covers the
   four limits in `worker/wrangler.jsonc` (retention days, max inboxes,
   events per inbox, body size), the cron schedule, the full management
   API under the admin token, custom domains, and the privacy posture
   (IPs truncated at ingest, no third-party scripts, don't route regulated
   personal data through it).

## Honest limits

Self-hosted on the user's Cloudflare account — their data, their ops. Not a
hosted service; no team/SSO features. Replay is manual and on-demand (no
retry schedules or queues). Alerts fire on capture; they do not watch
application health. Free-tier sized defaults — 20 inboxes, 500 events per
inbox, 7-day retention, 64 KB per body — every limit one variable in
`wrangler.jsonc`. Zero npm dependencies; the only network calls the worker
makes are replays you trigger and alerts you configure.

## Files

- `references/START-HERE.md` — the loop, 20-minute path, file map (written for this skill)
- `references/SETUP.md` — copy-paste deploy runbook, troubleshooting table (unmodified from the kit)
- `references/CUSTOMIZE.md` — limits, cron, secrets reference, management API, privacy posture (unmodified)
- `references/worker/worker.mjs` — the whole product — capture, dashboard, verification, replay, alerts
- `references/worker/wrangler.jsonc` — deploy config, 2 marked values to edit
- `references/schema.sql` — D1 tables + indexes (additive, idempotent)
- `references/LICENSE.txt` — MIT for this free skill edition

See `README.md` for install instructions and the honest difference vs. the full kit.
