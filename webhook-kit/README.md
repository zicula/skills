# webhook-kit (Agent Skill)

An [Agent Skill](https://agentskills.io) that gives your coding/AI agent the complete self-hosted webhook debugging loop: a dependency-free Cloudflare Worker (free plan works) with a private inspector dashboard built in, two D1 tables, HMAC signature verification for Stripe/GitHub/Shopify with plain-language verdicts, one-click replay to any URL, optional Discord/Telegram alerts, and a nightly retention sweep — deployed on the user's own Cloudflare account in about 20–30 minutes.

## What this skill does

Once installed, the agent can deploy and operate the whole inbox with you and hand you working infrastructure, not a summary:

- **Capture:** any HTTP method, any body, at `/w/<inbox>` — inboxes self-create on first hit, the worker answers 2xx so providers stop retrying, full headers and body are stored, source IPs truncated at ingest
- **Verify:** HMAC presets for Stripe (5-minute timestamp tolerance), GitHub and Shopify; the dashboard shows a verdict that names the fix — which secret to set, tolerance exceeded, or a genuine mismatch — and one call re-checks stored events against current secrets
- **Replay:** resend the stored method, headers and body to any URL in one click (hop-by-hop and Cloudflare headers stripped, each attempt logged with status and duration), or copy any delivery as a ready-to-run cURL command
- **Alert and stay clean:** optional Discord/Telegram pings on every capture, a nightly sweep deletes events past retention (7 days default), per-inbox caps trim the oldest — four limits, all tunable in one config file
- **API:** a full management API (inboxes, events, replay, verify) under an `ADMIN_TOKEN` that fails closed until you set it

## Install

Install with the [skills CLI](https://skills.sh) (works with Claude Code, Codex, Cursor, Gemini CLI and other skill-compatible agents):

```bash
npx skills add zicula/skills/webhook-kit
```

…or copy the folder into your agent's skills directory:

```bash
git clone https://github.com/zicula/skills.git
cp -R skills/webhook-kit ~/.agents/skills/

# or for Claude Code's project/user skills dir
cp -R skills/webhook-kit ~/.claude/skills/
```

That's it — the skill is self-contained. `SKILL.md` is the entry point; `references/` holds the kit runtime: START-HERE, the deploy runbook, the worker itself, the D1 schema, the customization/API reference and the license. The worker has been smoke-tested end-to-end on the shipped bytes (capture, all three signature presets, fail-closed auth, replay over a real socket, retention sweep).

## Honest note: what's in the skill vs. the full kit

This skill is the **process layer extracted from the paid Webhook Kit — sold at $42 one-time** on [webhook-kit.zicula.trade](https://webhook-kit.zicula.trade) (30-day full refund, instant download; the sales page describes one kit, no tiers). The worker, schema, deploy runbook and customization reference are here in full, unmodified. What the paid zip adds is the buyer-ready form: the packaged download, the MANIFEST, buyer README and the single-business commercial license (this free edition is MIT instead).

If you want the operating process as agent-consumable files, this skill has you covered; if you want the buyer-packaged zip or to support the project with a commercial license, grab the kit.

## Files

```
webhook-kit/
├── SKILL.md                       # skill entry point (spec: agentskills.io)
├── README.md                      # this file
└── references/
    ├── START-HERE.md              # the loop, 20-minute path, file map
    ├── SETUP.md                   # copy-paste deploy runbook + troubleshooting
    ├── CUSTOMIZE.md               # limits, secrets reference, management API
    ├── worker/worker.mjs          # the whole product (capture + dashboard + API)
    ├── worker/wrangler.jsonc      # deploy config — 2 marked values to edit
    ├── schema.sql                 # D1 tables + indexes (idempotent)
    └── LICENSE.txt                # MIT — free to use, modify and share
```

## License

MIT — this free skill edition may be used, modified and shared freely (see `references/LICENSE.txt`). The paid kit sold at [webhook-kit.zicula.trade](https://webhook-kit.zicula.trade) is a separate product under its own single-business commercial license.
