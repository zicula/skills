# CUSTOMIZE — Webhook Inbox

Everything below is optional. The kit works as shipped after SETUP.md; this
file is for tuning it to your workflow.

## 1. Limits and retention (wrangler.jsonc `vars`)

| Var | Default | Meaning |
|---|---|---|
| `RETENTION_DAYS` | `7` | Nightly cron deletes events older than this. Set `90` for a month of Stripe history (watch D1 free-tier row limits — see the note below). |
| `MAX_INBOXES` | `20` | Distinct capture inboxes. Raise freely — an inbox is one row. |
| `MAX_EVENTS_PER_INBOX` | `500` | When an inbox exceeds this, the oldest events are deleted on the next capture. |
| `BODY_LIMIT` | `65536` | Characters stored per body; larger bodies are truncated and flagged with `*` in the list. |

After editing vars: `npx wrangler deploy` (vars ship with the deploy; secrets
do not need redeploying).

Free-tier note (at the time of writing, Cloudflare's published limits):
Workers free ≈ 100,000 requests/day and D1 free ≈ 5M rows read / 100k rows
written per day. Defaults are far inside those; a 90-day retention with
heavy providers can get closer — the caps (`MAX_EVENTS_PER_INBOX`) are what
actually bound storage.

## 2. Cron schedule

`"crons": ["17 3 * * *"]` runs the retention sweep daily at 03:17 UTC. Edit
to taste; cron syntax is standard five-field. Removing `triggers` entirely
stops the sweep — events then live until the per-inbox cap trims them.

## 3. Secrets reference

| Secret | Effect when set |
|---|---|
| `ADMIN_TOKEN` (required) | Unlocks dashboard + management API. Without it everything is closed (fail closed). |
| `STRIPE_WEBHOOK_SECRET` | Verifies `stripe-signature` (HMAC over `<t>.<body>`, 5-minute tolerance like Stripe itself). |
| `GITHUB_WEBHOOK_SECRET` | Verifies `x-hub-signature-256` (`sha256=<hex>` over the raw body). |
| `SHOPIFY_WEBHOOK_SECRET` | Verifies `x-shopify-hmac-sha256` (base64 HMAC over the raw body). |
| `DISCORD_WEBHOOK_URL` | Posts a summary of every captured event to that Discord channel. |
| `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` | Sends the same summary to a Telegram chat. |

Rotate any secret: `npx wrangler secret put NAME` again. Events keep their
original verdict; use the dashboard's "Verify with current secrets" button
to re-check a stored event against today's secrets (useful right after you
add a secret).

## 4. Custom domain (optional)

Dashboard → your Worker → Settings → Domains & Routes → Add → Custom
domain (the domain must be on the same Cloudflare account). Your capture
URLs become `https://hook.yourdomain.com/w/<inbox>` — nice for provider
allow-lists and for reading the URL out loud. The workers.dev URL keeps
working.

## 5. Management API (all under your admin token)

Auth: header `Authorization: Bearer <ADMIN_TOKEN>` (or `x-admin-token`).

| Endpoint | What it does |
|---|---|
| `GET /api/inboxes` | List inboxes with event counts and last-event time. |
| `POST /api/inboxes` | Create. Body `{"id":"stripe-test","note":"...","destination":"https://..."}` — id must match `[a-z0-9][a-z0-9-]{0,39}`. |
| `PATCH /api/inboxes/<id>` | Update `note` and/or `destination` (the default replay target). |
| `DELETE /api/inboxes/<id>` | Delete inbox and all its events. |
| `GET /api/events?inbox=<id>&limit=50` | Event list (metadata only, limit ≤ 200). |
| `GET /api/events/<id>` | Full event incl. headers, body, replay log. |
| `DELETE /api/events/<id>` | Delete one event. |
| `POST /api/events/<id>/replay` | Body `{"url":"https://..."}` — omit for the inbox default. Returns status + duration; the last 10 attempts are stored on the event. |
| `POST /api/events/<id>/verify` | Re-check the stored request against currently configured secrets. |
| `GET /healthz` | Public, no auth: `ok webhook-inbox <version>` — for your own monitoring. |

Scripting example — dump yesterday's Stripe bodies:

```bash
W="https://webhook-inbox.<sub>.workers.dev"; T="your-token"
curl -s "$W/api/events?inbox=stripe&limit=100" -H "Authorization: Bearer $T" \
  | python3 -c 'import json,sys;[print(e["id"],e["path"]) for e in json.load(sys.stdin)["events"]]'
```

## 6. What replay sends

The stored method, headers and body, with these headers removed:
`host`, `content-length`, `connection`, `keep-alive`, `transfer-encoding`,
`upgrade`, and Cloudflare/client headers (`cf-*`, `x-forwarded-*`,
`x-real-ip`) so your application sees a clean request. Signature headers are
**kept** — if your destination verifies them with the same secret, the
replay passes; note Stripe-style timestamp tolerance may reject an old
replay by design (that is your destination's correct behavior).

## 7. Privacy posture (why it is built this way)

- Source IPs are truncated at ingest (IPv4 → /24, IPv6 → /48) — enough to
  spot "all events from one host", never a person.
- No cookies, no analytics, no third-party scripts in the dashboard (it is
  one inline HTML document; check the source — that is the point).
- Retention defaults to 7 days because webhook bodies age fast; the sweep
  also deletes events whose inbox no longer exists.
- Do not route traffic containing regulated personal data (health, etc.)
  through the inbox — you are the data controller of whatever you capture.

## 8. License

Single-business license — see LICENSE.txt. One kit covers your employer's
or your own business including client work you perform; you may not resell
or redistribute the kit itself.
