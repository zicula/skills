# api-docs-kit (Agent Skill)

An [Agent Skill](https://agentskills.io) that gives your coding/AI agent the complete self-hosted storefront for an API business: a static docs portal (quickstart, API reference, error-code table, changelog, pricing wired to your own payment link) plus one dependency-free Cloudflare Worker that issues API keys stored only as SHA-256 hashes, validates and meters calls against prepaid credits, revokes keys and tops up quotas — behind a fail-closed admin token with an owner-only dashboard, all deployed on the user's own Cloudflare free tier in about 30 minutes. No traffic proxy: the API keeps serving wherever it runs.

## What this skill does

Once installed, the agent can deploy and operate the whole storefront with you and hand you working infrastructure, not a summary:

- **Keys that are safe by construction:** issue free/pro/scale keys (1,000 / 50,000 / 250,000 prepaid credits by default), stored as SHA-256 hashes only — the plain key is shown exactly once at creation, and a leaked database never leaks live keys
- **Validate and meter with one fetch:** any service calls `POST /v1/validate` with the customer's Bearer key before doing work — `200` with plan and remaining credits, `401 invalid_key`, `403 key_revoked`, `429 quota_exceeded`; `{"meter":false}` checks without counting; `GET /v1/usage` returns quota, used and the last 14 days per-day
- **Prepaid, not subscription:** the quota counts down, so customers never get surprise invoices — `revoke` (idempotent) and `topup` are the only levers, plus a key cap (`MAX_KEYS`) and a 10M-credit ceiling per key
- **A docs portal that converts:** `portal/index.html` is one static file with inline CSS — quickstart curl, API reference for the key endpoints, the shared error-code table, a changelog, and pricing buttons that point at your own Stripe or Lemon Squeezy payment link (the kit never touches your checkout)
- **A billing loop in two clicks:** after a payment, open `portal/admin.html`, create (or top up) the customer's key, send it — no server-side payment keys, no webhook code to maintain; the dashboard's token lives only in your browser
- **Deploy and sales runbooks:** a ~30-minute copy-paste deploy runbook (D1 → secret → worker → Pages) with a troubleshooting table, a 45-minute customization guide, and a 14-day playbook from deploy to the first paid customer — with gates and a standing stop condition

The worker was smoke-tested end-to-end on the shipped bytes (healthz, key issue/validate/meter, prepaid quota drain to 429, revoke → 403, top-up, per-key cap, fail-closed admin, hash-only storage) — 25/25 checks pass.

## Install

Install with the [skills CLI](https://skills.sh) (works with Claude Code, Codex, Cursor, Gemini CLI and other skill-compatible agents):

```bash
npx skills add zicula/skills/api-docs-kit
```

…or copy the folder into your agent's skills directory:

```bash
git clone https://github.com/zicula/skills.git
cp -R skills/api-docs-kit ~/.agents/skills/

# or for Claude Code's project/user skills dir
cp -R skills/api-docs-kit ~/.claude/skills/
```

That's it — the skill is self-contained. `SKILL.md` is the entry point; `references/` holds the kit runtime: START-HERE, the deploy runbook, the customization guide, the 14-day playbook, the worker itself, the D1 schema, both portal pages and the license.

## Honest note: what's in the skill vs. the full kit

This skill is the **process layer extracted from the paid Docs Portal Kit — sold at $42 one-time** at [docs-portal-kit.zicula.trade](https://docs-portal-kit.zicula.trade) (30-day full refund, instant download; one kit, no tiers). The worker, schema, portal pages and all three runbooks are here in full, byte-identical. What the paid zip adds is the buyer-ready form: the packaged download, the MANIFEST, buyer README and the single-business commercial license (this free edition is MIT instead).

If you want the operating process as agent-consumable files, this skill has you covered; if you want the buyer-packaged zip or to support the project with a commercial license, grab the kit.

## Files

```
api-docs-kit/
├── SKILL.md                       # skill entry point (spec: agentskills.io)
├── README.md                      # this file
└── references/
    ├── START-HERE.md              # the loop, 30-minute path, file map
    ├── SETUP.md                   # copy-paste deploy runbook + troubleshooting
    ├── CUSTOMIZE.md               # branding, payment links, reference content
    ├── PLAYBOOK-14D.md            # 14-day plan to the first paid customer
    ├── worker/worker.mjs          # the whole product (keys + metering API)
    ├── worker/schema.sql          # D1 tables + index (idempotent)
    ├── worker/wrangler.jsonc      # deploy config — 2 marked values to edit
    ├── portal/index.html          # customer-facing docs portal
    ├── portal/admin.html          # owner-only dashboard
    └── LICENSE.txt                # MIT — free to use, modify and share
```

## License

MIT — this free skill edition may be used, modified and shared freely (see `references/LICENSE.txt`). The paid kit sold at [docs-portal-kit.zicula.trade](https://docs-portal-kit.zicula.trade) is a separate product under its own single-business commercial license.
