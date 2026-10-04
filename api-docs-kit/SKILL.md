---
name: api-docs-kit
description: Self-hosts the storefront for an API business on the user's own Cloudflare account (free tier) in about 30 minutes - a static docs portal (quickstart, API reference, changelog, own payment-link pricing) plus one dependency-free Worker that issues API keys stored only as SHA-256 hashes, validates and meters calls against prepaid credits, revokes keys and tops up quotas, behind a fail-closed admin token with an owner-only dashboard. Plans are free/pro/scale (1k/50k/250k credits), quotas count down so no surprise invoices, errors are machine-readable (401 invalid_key, 403 key_revoked, 429 quota_exceeded). Includes the D1 schema, a copy-paste deploy runbook, a customization guide for branding and payment links, and a 14-day playbook to the first paid customer with gates and a stop condition. No traffic proxy. Use when launching an API that needs keys, usage metering, docs and a changelog, or when asked for API key infrastructure, a developer portal, or self-hosted API monetization.
---

# API Docs Kit

Self-host the storefront for the API you sell on your own Cloudflare free
tier — a docs portal template plus one dependency-free Worker for API key
issue / validate / prepaid usage metering. Your API keeps serving from
wherever it runs today; no traffic proxy. Extracted from the full Docs
Portal Kit (same worker, same schema, same runbooks).

## When to use

The user mentions any of: launching an API and needs keys, usage metering,
docs and a changelog; selling API access with a payment link instead of a
billing backend; validating and metering API keys from another service with
one fetch; wanting prepaid credits so customers never get surprise invoices;
a docs portal with quickstart, API reference, error codes and changelog; a
14-day plan to find the first paying API customer; self-hosting instead of
ReadMe/Mintlify-style hosted portals.

## How to use this skill

1. **Start from the map.** Read `references/START-HERE.md` — the loop, the
   30-minute first path, honest limits and the file map. All paths are
   relative to `references/`.
2. **Deploy** (`references/SETUP.md`, ~30 min, copy-paste commands).
   `npx wrangler login` → `d1 create docs-portal-db` → apply
   `worker/schema.sql` (idempotent) → `openssl rand -hex 24` +
   `npx wrangler secret put ADMIN_TOKEN` (admin routes fail closed without
   it) → `cd worker && npx wrangler deploy` → host `portal/` on Cloudflare
   Pages. No npm dependencies, no build step, no Docker.
3. **Protect your API with one fetch.** Wherever the API handlers run, call
   `POST /v1/validate` with the customer's Bearer key before doing work.
   `429` → quota exceeded, `403` → revoked, `401` → invalid. Optionally
   branch on the returned `plan`.
4. **Brand the portal and wire payments** (`references/CUSTOMIZE.md`).
   `portal/index.html` is one static file with inline CSS — replace
   `YOUR API NAME`, your worker URL and `YOUR_PAYMENT_LINK_URL` (once per
   plan button, your own Stripe or Lemon Squeezy link). The error-code
   table is the contract — keep it in sync.
5. **Run the billing loop in two clicks.** After a customer pays, open
   `portal/admin.html`, create (or top up) their key, send it — the plain
   key is shown exactly once, then only its SHA-256 hash is stored. No
   server-side payment keys, no webhook code to maintain.
6. **Sell with a plan** (`references/PLAYBOOK-14D.md`). Day-by-day from
   deploy to the first paid customer — gates after each phase (working
   portal → ≥20 visitors and 3 used keys → convert → decide with numbers)
   and a standing stop condition if demand is absent.

## Honest limits

Self-hosted on the user's Cloudflare account — their data, their ops. Not a
hosted service; no team/SSO features. No automatic payment-webhook → key
delivery (you issue or top up the key after the payment provider notifies
you — two clicks in `admin.html`). No gateway/proxy in front of the API, no
SDK generation, no email sending. Prepaid-credit model on purpose — quota
counts down from the plan's credits, `revoke` and `topup` are the only
levers. Zero npm dependencies; the worker makes no third-party calls.

## Files

- `references/START-HERE.md` — the loop, 30-minute path, file map (written for this skill)
- `references/SETUP.md` — copy-paste deploy runbook + troubleshooting (unmodified from the kit)
- `references/CUSTOMIZE.md` — branding, payment links, reference content, changelog (unmodified)
- `references/PLAYBOOK-14D.md` — 14-day sales plan with gates (unmodified)
- `references/worker/worker.mjs` — the whole product — key issue, validate + meter, revoke, top-up
- `references/worker/schema.sql` — D1 schema (idempotent)
- `references/worker/wrangler.jsonc` — deploy config, 2 marked values to edit
- `references/portal/index.html` — the customer-facing docs portal
- `references/portal/admin.html` — owner-only dashboard
- `references/LICENSE.txt` — MIT for this free skill edition

See `README.md` for install instructions and the honest difference vs. the full kit.
