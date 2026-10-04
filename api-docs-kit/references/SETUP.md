# SETUP — from unzip to a live docs portal (~30 minutes)

You need: a (free) Cloudflare account, Node.js 18+, and `npx wrangler` available (first `npx` call installs it).

Every command below runs inside the unzipped folder.

## 0. Placeholders you will fill

| Placeholder | Where | What |
|---|---|---|
| `YOUR_CLOUDFLARE_ACCOUNT_ID` | `worker/wrangler.jsonc` | Dashboard → Workers & Pages → right sidebar |
| D1 `database_id` | `worker/wrangler.jsonc` | Output of step 2 |
| `YOUR-WORKER.workers.dev` | this guide | Output of step 4 |
| `YOUR_PAYMENT_LINK_URL` | `portal/index.html` | Step 6 |

## 1. Log in to Cloudflare

```bash
npx wrangler login
npx wrangler whoami
```

## 2. Create the D1 database and apply the schema

```bash
npx wrangler d1 create docs-portal-db
# → copy the "database_id" from the output into worker/wrangler.jsonc
npx wrangler d1 execute docs-portal-db --remote --file=./worker/schema.sql
```

Sanity check (should print an empty `keys` table header):

```bash
npx wrangler d1 execute docs-portal-db --remote --command "SELECT id, plan, status FROM keys"
```

## 3. Set the admin token (owner secret)

Generate a long random string and store it as a Worker secret:

```bash
openssl rand -hex 24          # copy the output
npx wrangler secret put ADMIN_TOKEN
# paste the string when asked — never commit it anywhere
```

No admin route answers without this token, and with no token set they answer 401 (fail-closed).

## 4. Deploy the worker

Fill `account_id` and `database_id` in `worker/wrangler.jsonc`, then:

```bash
cd worker
npx wrangler deploy
cd ..
```

Note the printed URL, e.g. `https://docs-portal-api.YOUR-SUBDOMAIN.workers.dev`.

```bash
curl https://YOUR-WORKER.workers.dev/healthz     # → ok 1.0.0
```

## 5. Host the portal

The portal is a static folder — any static host works. The free, same-account path is Cloudflare Pages:

```bash
npx wrangler pages project create my-api-docs --production-branch=main
npx wrangler pages deploy portal --project-name my-api-docs --branch main --commit-dirty=true
```

You get `https://my-api-docs.pages.dev`. A custom domain is one click in the Pages dashboard (Custom domains).

## 6. Wire your payment link

The kit never touches your checkout: create a **payment link** in your own Stripe or Lemon Squeezy dashboard for each plan, then replace `YOUR_PAYMENT_LINK_URL` in `portal/index.html` (search: it appears once per plan button). Redeploy the portal (step 5's deploy command).

After a customer pays, open `portal/admin.html`, create (or top up) their key, and send it to them. That is the whole billing loop — two clicks, no server-side payment keys, no webhook code to maintain.

## 7. Protect your actual API

Wherever your API handlers run, call the worker before doing work:

```js
const r = await fetch("https://YOUR-WORKER.workers.dev/v1/validate", {
  method: "POST",
  headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
  body: JSON.stringify({ meter: true }),
});
if (r.status === 429) return new Response("quota exceeded\n", { status: 429 });
if (r.status === 403) return new Response("key revoked\n", { status: 403 });
if (!r.ok) return new Response("invalid key\n", { status: 401 });
const { plan } = await r.json(); // optionally branch per plan
```

One `fetch`, one decision. Errors are machine-readable: `invalid_key` (401), `key_revoked` (403), `quota_exceeded` (429).

## Troubleshooting

| Symptom | Fix |
|---|---|
| `/healthz` 404 | Worker not deployed or wrong URL — rerun step 4 and read the printed URL |
| admin routes always 401 | ADMIN_TOKEN secret missing or shorter than 16 chars — rerun step 3, then `npx wrangler deploy` once more if you changed config |
| `wrap` / D1 errors on create key | Schema not applied — rerun step 2 |
| Portal loads but buttons go nowhere | `YOUR_PAYMENT_LINK_URL` not replaced — step 6 |
| Changed ADMIN_TOKEN, old dashboard fails | Paste the new token into `admin.html` — it reads whatever is in its input |

## Updating later

Re-download the kit while your license is active, diff `worker/` and `portal/` against your local edits (you will mostly have edited `portal/index.html`), redeploy both. v1.x updates are free.
