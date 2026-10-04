# CUSTOMIZE — make the portal yours in 45 minutes

Everything customer-facing lives in `portal/index.html`. It is one static file with inline CSS and no build step: open it in an editor, change the words, reload the browser tab.

## 1. Brand (10 min)

Search-and-replace, in this order:

| Find | Replace with |
|---|---|
| `YOUR API NAME` | your API's product name (appears in nav, hero, title) |
| `One-line tagline for your API.` | your hero sentence |
| `yourdomain.com` | the domain customers use for your API |
| `https://YOUR-WORKER.workers.dev` | your deployed worker URL (SETUP step 4) |

Colors: edit the CSS variables at the top of the `<style>` block (`--deep`, `--accent`, `--paper`, …). Contrast of body text is 4.5:1 or better throughout — keep new colors at or above that.

## 2. Your payment link (5 min)

`YOUR_PAYMENT_LINK_URL` appears once per pricing button (Free/Pro/Scale). Point each at your own Stripe or Lemon Squeezy payment link — the kit performs no billing of its own. Keep the Free button on a mailto or a "contact" link if you don't want a self-serve free tier.

## 3. API reference content (20 min)

The shipped reference documents **this kit's own two public endpoints** (`POST /v1/validate`, `GET /v1/usage`) — accurate as-is, useful if your customers integrate through keys you issue. When your API has its own endpoints, add one `<article class="endpoint">` block per endpoint, copying the existing structure:

- method + path in the header row
- one row per parameter (`name`, `in`, `required`, `description`)
- one example request (`pre code`) and the happy-path response
- error rows pointing at the shared error-code table

Keep the error table in sync: it is the contract (`401 invalid_key`, `403 key_revoked`, `429 quota_exceeded`). If your API adds its own codes, append rows — don't redefine the shipped ones.

## 4. Changelog (5 min)

The changelog is a plain `<ol class="log">` — newest entry first. One entry per release:

```html
<li>
  <div class="entry-head"><code>v1.1.0</code> <time>2026-11-01</time> <span class="tag new">New</span></div>
  <p>Added the /v2 widgets endpoint. Rate limits unchanged.</p>
</li>
```

Tags shipped: `new`, `fix`, `breaking`. Write what changed, not marketing.

## 5. Pricing copy (5 min)

The three plans are honest defaults, not law:

- **Free** — 1,000 credits, key via sign-up (you create it in `admin.html`)
- **Pro** — 50,000 credits, one payment
- **Scale** — 250,000 credits, one payment

If you sell monthly instead of prepaid, change the wording and create matching payment links; the worker doesn't care — a credit is a credit until `revoke` or `topup`.

## 6. The admin dashboard (owner-only)

`portal/admin.html` is for you. Do **not** link it from the portal and do **not** deploy it publicly if you can avoid it (it is safe — the token is entered at runtime and stored only in that browser's localStorage — but smaller surface is better). If you deploy it, a path guessable only to you (`/m-42.html`) is enough.

## 7. What not to change

- `worker/worker.mjs` — the API contract the docs describe. If you must change it, change the docs in the same commit.
- The error-code JSON shapes — customer integrations will copy them from your docs.
- `key_hash` storage — never "optimize" it into storing plain keys.

## Ship checklist

```bash
npx wrangler pages deploy portal --project-name my-api-docs --branch main --commit-dirty=true
```

Then check: title says your API, one pricing button per plan opens your payment link, the curl quickstart copies cleanly, changelog has at least the v1.0.0 entry.
