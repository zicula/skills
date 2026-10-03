# SETUP — Webhook Inbox on your own Cloudflare account

Time: about 20–30 minutes if you have used a terminal before. Five copy-paste
commands, one browser step. No npm packages to install, no build step, no
Docker — `wrangler` runs from the Cloudflare-provided npm package on demand.

You end up with: a capture URL you can paste into Stripe/GitHub/Shopify/your
own code, a private dashboard to inspect and replay every event, and a
database only you can see.

---

## 0. What you need

- A free Cloudflare account (workers.dev subdomain — if you can open
  https://dash.cloudflare.com you have one).
- Node.js 18 or newer on your machine: `node --version`.
- A terminal.

## 1. Log in to Cloudflare (one-time)

```bash
npx wrangler login
```

A browser window opens; approve it. Check it worked:

```bash
npx wrangler whoami
```

## 2. Create the database

```bash
npx wrangler d1 create webhook-inbox
```

The output prints a `database_id`. Open `worker/wrangler.jsonc` and paste it
over `PASTE_YOUR_D1_DATABASE_ID_HERE` (marked value [2]).

Then create the tables:

```bash
npx wrangler d1 execute webhook-inbox --remote --file=schema.sql
```

Answer `y` when it asks to confirm. It prints "Executed 5 queries" (2 tables,
3 indexes... the exact count can differ by client version — what matters is
no error).

## 3. Name the worker (optional)

In `worker/wrangler.jsonc`, edit `"name"` (marked value [1]). It becomes your
free hostname: `https://<name>.<your-subdomain>.workers.dev`. The shipped
default is `webhook-inbox`.

## 4. Set your admin token

This is the password for your dashboard and API. Choose a long random string:

```bash
npx wrangler secret put ADMIN_TOKEN
```

Paste your value when prompted (for example the output of
`openssl rand -hex 24` on macOS/Linux). The dashboard and API stay **closed**
until this secret exists — fail closed by design.

## 5. Optional: provider secrets + alerts

Skip this step for now if you just want to capture first. Each secret is
independent; add any of them later the same way (`npx wrangler secret put NAME`).

```bash
# Signature verification (one per provider you use):
npx wrangler secret put STRIPE_WEBHOOK_SECRET    # whsec_... from the Stripe endpoint page
npx wrangler secret put GITHUB_WEBHOOK_SECRET    # the secret entered in the GitHub webhook form
npx wrangler secret put SHOPIFY_WEBHOOK_SECRET   # the app's API secret key

# Alerts on every captured event (either one, or both):
npx wrangler secret put DISCORD_WEBHOOK_URL      # channel integrations -> webhook
npx wrangler secret put TELEGRAM_BOT_TOKEN       # from @BotFather
npx wrangler secret put TELEGRAM_CHAT_ID         # your chat id
```

Without the provider secret the dashboard still shows the signature header
was present and explains exactly what to configure — nothing breaks.

## 6. Deploy

```bash
cd worker
npx wrangler deploy
```

The final line prints your URL, e.g. `https://webhook-inbox.your-subdomain.workers.dev`.

## 7. Verify it works (2 minutes)

Health check — open in a browser or:

```bash
curl https://<name>.<your-subdomain>.workers.dev/healthz
# -> ok webhook-inbox 1.0.0
```

Send the first event:

```bash
curl -X POST https://<name>.<your-subdomain>.workers.dev/w/test \
  -H "Content-Type: application/json" \
  -d '{"ping":1}'
# -> {"received":true,"event":"...","inbox":"test",...}
```

The inbox `test` was created automatically. Open the dashboard
(`https://<name>.<your-subdomain>.workers.dev/`), paste your ADMIN_TOKEN once
(it is remembered in your browser's local storage), pick the `test` inbox and
you will see the event: headers, body, size, truncated source IP.

## 8. Point a real provider at it

- **Stripe:** Developers -> Webhooks -> Add endpoint ->
  `https://<name>.<your-subdomain>.workers.dev/w/stripe` — copy the
  `whsec_...` into `STRIPE_WEBHOOK_SECRET` (step 5). "Send test webhook"
  from the same page and watch it land.
- **GitHub:** repo Settings -> Webhooks -> Payload URL `.../w/github`,
  Content type `application/json`, enter a secret, put the same string in
  `GITHUB_WEBHOOK_SECRET`.
- **Shopify:** app/notifications -> use `.../w/shopify` and the app secret.
- **Your own code / cron jobs / any third party:** any URL under `/w/<inbox>`
  is a valid capture endpoint for any HTTP method.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Dashboard says "ADMIN_TOKEN is not configured" | Step 4 was skipped or deploy happened before the secret was set — run `npx wrangler secret put ADMIN_TOKEN`, then `npx wrangler deploy` again. |
| `Error: D1_TYPELESS_ERROR` / "no such table" on first event | Step 2's `d1 execute --remote --file=schema.sql` did not run (or ran without `--remote`). Re-run it. |
| `wrangler deploy` fails with "database_id" | The id was pasted with quotes/whitespace or into the wrong line — it must replace the whole placeholder string. |
| 429 "inbox limit reached" | `MAX_INBOXES` (default 20) — delete an inbox in the dashboard or raise the var in `wrangler.jsonc` and redeploy (see CUSTOMIZE.md). |
| Signature shows FAIL on Stripe but payments work | The endpoint secret differs per endpoint — the `whsec_` must be from THIS endpoint, and the body must not be re-serialized before it reaches the worker. The badge text names the exact mismatch. |
| Telegram alert missing | Bot token and chat id must both be set; message @userinfobot to get your chat id. |
| Events disappear | Retention sweep deleted them after `RETENTION_DAYS` (default 7). Raise the var or archive bodies you need (CUSTOMIZE.md). |

## Updating later

Replace `worker.mjs` with a newer copy of the file and run `npx wrangler
deploy` again. The schema is additive; future updates of this kit will not
require deleting your data.
