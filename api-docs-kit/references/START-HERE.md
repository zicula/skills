# START-HERE — Docs Portal, the process at a glance

Self-host the storefront for the API you sell on **your own Cloudflare
account** (the free tier is enough): a static docs portal (quickstart, API
reference, error codes, changelog, pricing with your own payment link) plus
one dependency-free Worker that issues API keys, validates and meters calls
against prepaid credits, revokes keys and tops up quotas. No traffic proxy —
your API keeps serving from wherever it runs today; this adds the storefront
around it. Total setup is about 30 minutes.

> Run everything from this `references/` folder — every path below
> (`worker/schema.sql`, `worker/wrangler.jsonc`, `portal/index.html`) is
> relative to it, exactly as the runbooks reference them.

## The loop

**Deploy → protect your API with one fetch → brand the portal → wire your
payment link → after each sale, issue or top up a key in two clicks.**

1. **Deploy** (`SETUP.md`, ~30 min). `npx wrangler login`, create the D1
   database, apply `worker/schema.sql`, set the `ADMIN_TOKEN` secret,
   `cd worker && npx wrangler deploy`, host `portal/` on any static host
   (Cloudflare Pages is the free same-account path). Admin routes stay
   **closed** until `ADMIN_TOKEN` exists — fail closed by design.
2. **Protect your API.** Wherever your API handlers run, call
   `POST /v1/validate` with the customer's Bearer key before doing work —
   one fetch, one decision. Errors are machine-readable and stable:
   `401 invalid_key`, `403 key_revoked`, `429 quota_exceeded`.
3. **Brand the portal** (`CUSTOMIZE.md`, 45 min). `portal/index.html` is one
   static file with inline CSS and no build step — search-and-replace
   `YOUR API NAME`, your tagline, your domain, your worker URL, then edit
   the reference content and changelog for your endpoints.
4. **Wire payments.** The kit never touches your checkout: create payment
   links in your own Stripe or Lemon Squeezy dashboard and replace
   `YOUR_PAYMENT_LINK_URL` (once per plan button). After a customer pays,
   open `portal/admin.html`, create (or top up) their key, send it. That is
   the whole billing loop — two clicks, no server-side payment keys, no
   webhook code to maintain.
5. **Sell** (`PLAYBOOK-14D.md`). A 14-day day-by-day plan from deploy to the
   first paid customer, with gates after each phase and an honest stop
   condition if demand isn't there.

## The 30-minute first path

Full copy-paste commands are in `SETUP.md`. The shape of it:

```
npx wrangler login                                              # 1. one-time auth
npx wrangler d1 create docs-portal-db                           # 2a. get the database_id
npx wrangler d1 execute docs-portal-db --remote --file=./worker/schema.sql  # 2b. tables
openssl rand -hex 24 && npx wrangler secret put ADMIN_TOKEN     # 3. owner secret
cd worker && npx wrangler deploy                                # 4. ship the API
npx wrangler pages deploy portal --project-name my-api-docs     # 5. host the portal
curl https://YOUR-WORKER.workers.dev/healthz                    # 6. → ok 1.0.0
```

Then prove the loop in two minutes: create a key in `admin.html`, curl
`/v1/validate` with it (→ `200 valid`), curl with a garbage key (→
`401 invalid_key`).

## Honest limits (decide fast)

- Self-hosted on your Cloudflare account — your data, your ops. Not a
  hosted service; no team/SSO features.
- No automatic "payment webhook → key delivery". You issue or top up the
  key after your payment provider notifies you — the flow is two clicks in
  `admin.html`.
- No gateway/proxy in front of your API, no SDK generation, no email
  sending.
- Prepaid-credit model on purpose: quota counts down from the plan's
  credits (Free 1,000 / Pro 50,000 / Scale 250,000 by default) — no
  surprise invoices; `revoke` and `topup` are the only levers.
- Keys are stored as SHA-256 hashes only — a leaked database never leaks
  live keys. The plain key is shown exactly once at creation.
- Zero npm dependencies, no build step, no analytics, no phoning home.

## File map

| File | What it is |
|---|---|
| `SETUP.md` | copy-paste deploy runbook (~30 min) + troubleshooting table |
| `CUSTOMIZE.md` | branding, payment links, reference content, changelog format, what not to change |
| `PLAYBOOK-14D.md` | 14-day plan to the first paid customer, with gates and a stop condition |
| `worker/worker.mjs` | the product — key issue (hash-stored), validate + meter, revoke, top-up, fail-closed admin |
| `worker/schema.sql` | D1 schema — `keys` + `usage` tables, one index (idempotent) |
| `worker/wrangler.jsonc` | deploy config — 2 marked values to edit |
| `portal/index.html` | the customer-facing docs portal (one static file) |
| `portal/admin.html` | owner-only dashboard — token lives in your browser only |
| `LICENSE.txt` | MIT for this free skill edition |

The runbooks (`SETUP.md`, `CUSTOMIZE.md`, `PLAYBOOK-14D.md`), the worker,
the schema and both portal pages are carried over byte-identical from the
kit; only the buyer-side packaging (README, MANIFEST, commercial license)
was replaced for this free edition.

---

Free Agent Skill edition extracted from the paid Docs Portal Kit
([docs-portal-kit.zicula.trade](https://docs-portal-kit.zicula.trade)) —
same worker, same schema, same runbooks. The paid zip adds the buyer
packaging and the single-business commercial license.
