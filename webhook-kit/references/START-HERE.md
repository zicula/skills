# START-HERE — Webhook Inbox, the process at a glance

Self-host a private webhook inspector on **your own Cloudflare account** (the
free plan is enough): one dependency-free Worker with the dashboard built in,
two D1 tables. Inboxes create themselves on first hit, every delivery is
stored with full headers and body, and the provider gets a 2xx so it stops
retrying. Total setup is about 20–30 minutes, five copy-paste commands.

> Run everything from this `references/` folder — every path below
> (`schema.sql`, `worker/wrangler.jsonc`) is relative to it.

## The loop

**Deploy → point a provider at it → inspect and verify → replay or alert →
let hygiene handle the rest.**

1. **Deploy** (`SETUP.md`, ~20–30 min). `npx wrangler login`, create the D1
   database, apply `schema.sql` (idempotent — safe to re-run), set the
   `ADMIN_TOKEN` secret, `cd worker && npx wrangler deploy`. The dashboard
   and API stay **closed** until `ADMIN_TOKEN` exists — fail closed by
   design.
2. **Point a provider at it.** Any HTTP method, any body, at
   `/w/<inbox>`. Stripe, GitHub and Shopify each get a preset
   (`/w/stripe`, `/w/github`, `/w/shopify`) — set the matching provider
   secret and the dashboard shows a signature verdict with the reason, not
   just a boolean.
3. **Inspect.** Open the deployed URL, paste the admin token once. Every
   event: method, path, truncated source IP, size, pretty-printed body,
   every header, signature verdict. "Copy as cURL" for the terminal.
4. **Replay.** One click resends the stored method, headers and body to any
   URL — hop-by-hop and Cloudflare headers stripped, each attempt logged
   with status and duration. Fix the bug, replay, watch it land — no need
   to wait for the provider to send again.
5. **Alerts (optional).** Set `DISCORD_WEBHOOK_URL` or
   `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` and every capture pings your
   chat, fire-and-forget, capture speed unaffected.
6. **Hygiene is automatic.** Nightly sweep deletes events older than
   `RETENTION_DAYS` (default 7); per-inbox caps trim the oldest events.
   Everything tunable in `worker/wrangler.jsonc` (see `CUSTOMIZE.md`).

## The 20-minute first path

Full copy-paste commands are in `SETUP.md`. The shape of it:

```
npx wrangler login                                  # 1. one-time auth
npx wrangler d1 create webhook-inbox                # 2a. get the database_id
npx wrangler d1 execute webhook-inbox --remote --file=schema.sql   # 2b. tables
npx wrangler secret put ADMIN_TOKEN                 # 4. pick a long random string
cd worker && npx wrangler deploy                    # 6. ship it
curl https://<name>.<sub>.workers.dev/healthz       # 7. -> ok webhook-inbox 1.0.0
```

Then prove the loop in two minutes: `curl -X POST
https://<name>.<sub>.workers.dev/w/test -H "Content-Type: application/json"
-d '{"ping":1}'`, open the dashboard, pick the `test` inbox, see the event.

## Honest limits (decide fast)

- Self-hosted on your Cloudflare account — your data, your ops. Not a hosted
  service; no team/SSO features.
- Replay is manual and on-demand. It does not run retry schedules or queues.
- Alerts fire on capture; they do not watch your application's health.
- Free-tier sized defaults: 20 inboxes, 500 events per inbox, 7-day
  retention, 64 KB stored per body — every limit is one variable in
  `wrangler.jsonc`.
- Zero npm dependencies, no build step, no analytics, no phoning home. The
  only network calls the worker makes are replays you trigger and alerts you
  configure.

## File map

| File | What it is |
|---|---|
| `SETUP.md` | copy-paste deploy runbook — start here for setup |
| `CUSTOMIZE.md` | limits, cron, secrets reference, full management API, privacy posture |
| `worker/worker.mjs` | the whole product — capture, dashboard, API, verification, replay, alerts |
| `worker/wrangler.jsonc` | deploy config — 2 marked values to edit |
| `schema.sql` | D1 tables + indexes (additive, idempotent) |
| `LICENSE.txt` | MIT for this free skill edition |

The deploy runbook (`SETUP.md`) and customization reference (`CUSTOMIZE.md`)
are carried over unmodified from the kit; only the buyer-side packaging
(README, MANIFEST, commercial license) was replaced for this free edition.

---

Free Agent Skill edition extracted from the paid Webhook Kit
([webhook-kit.zicula.trade](https://webhook-kit.zicula.trade)) — same worker,
same schema, same runbooks. The paid zip adds the buyer packaging and the
single-business commercial license.
