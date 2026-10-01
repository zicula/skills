# content-decay-kit (Agent Skill)

An [Agent Skill](https://agentskills.io) that gives your coding/AI agent a working content-decay monitoring system for client websites: it reads each client's Google Search Console property through the official Search Console API (read-only), compares the last 28 days against a 29–120 day baseline normalized to per-day rates, flags pages whose clicks/day fell 20%+ above a 200-impression noise floor, explains **why** each page fell (ranking slip / seen-but-not-clicked / demand cooled) with a matching refresh suggestion, and renders an internal dashboard plus one white-label weekly digest per client — your agency's name on top, priorities P1–P3, print-ready.

## What this skill does

Unlike a checklist skill, this one ships the actual working product — `scripts/decay.mjs`, the same Node 18+ zero-dependency script the paid kit sells, included in full:

- **Demo in 1 minute:** `node scripts/decay.mjs --demo` runs the whole pipeline on built-in demo data (3 demo clients, real decay math, real digests) with no credentials and nothing leaving the machine
- **Real runs:** service-account JWT auth against the official Search Console API, per-day-normalized decay math (so different window lengths can't fake a trend), tunable thresholds (`decay_pct`, `min_impressions`, recent/baseline windows)
- **Diagnosis, not just alerts:** each flagged page is classified — ranking slipped / impressions down / demand cooled — with a matching refresh suggestion
- **Client-facing output:** an internal `out/dashboard.html` plus one white-label `out/digest/<client>-weekly-digest.html` per client (brand block in the config: agency name, logo slot, accent color, digest title) — no vendor branding anywhere
- **Ops-ready:** `--fail-on-decay` for CI exit codes, `--quiet` for cron, weekly cadence by design (Search Console data lags ~2–3 days), plus copy-one-line crontab recipes and a free GitHub Actions workflow
- **Sell it:** the 14-day playbook that turns the weekly digest into a $29–99/mo care-plan add-on, with price framing and first-send emails

This is a monitoring and reporting tool: it tells you which page to refresh first; it does not score or rewrite content.

## Install

Install with the [skills CLI](https://skills.sh) (works with Claude Code, Codex, Cursor, Gemini CLI and other skill-compatible agents):

```bash
npx skills add zicula/skills/content-decay-kit
```

…or copy the folder into your agent's skills directory:

```bash
git clone https://github.com/zicula/skills.git
cp -R skills/content-decay-kit ~/.agents/skills/

# or for Claude Code's project/user skills dir
cp -R skills/content-decay-kit ~/.claude/skills/
```

That's it — the skill is self-contained. `SKILL.md` is the entry point; `scripts/decay.mjs` is the runnable script (`node scripts/decay.mjs --demo` works immediately, no npm install); `references/` holds the setup guide, customization guide, scheduling recipes and the sales playbook from the kit.

## Honest note: what's in the skill vs. the full kit

This skill is the **process + code layer extracted from the paid Content Decay Kit** — the decay script is included in full and actually runs (demo mode needs no credentials; real runs use your own free Google credentials), and the setup guide, customization guide, cron/GitHub Actions recipes and the 14-day sales playbook are here in full, in Markdown. The **full kit** (sold at [content-decay-kit.zicula.trade](https://content-decay-kit.zicula.trade)) is the same content in buyer-ready form: the zip packaged for buyers, the README/MANIFEST walkthrough order, the single-agency commercial license in its buyer form, and support. If you want the monitoring system as agent-consumable files, this skill has you covered; if you want the complete buyer package and support the project, grab the kit.

## Files

```
content-decay-kit/
├── SKILL.md                              # skill entry point (spec: agentskills.io)
├── README.md                             # this file
├── LICENSE.txt                           # MIT — free to use, modify and share
├── scripts/
│   └── decay.mjs                         # the product: GSC fetch → decay detection → dashboard + white-label digests (Node 18+, zero deps, --demo works offline)
└── references/
    ├── properties.example.json           # config template: brand, clients, thresholds (2 placeholder clients to replace)
    ├── SETUP.md                          # Google service account + Search Console access, one-time ~20 min
    ├── CUSTOMIZE.md                      # brand the digest, tune thresholds, reword refresh angles
    ├── crontab-example.txt               # weekly scheduling recipes (cron hosts + optional Slack-style webhook)
    ├── decay-github-actions.yml          # same scan as a free GitHub Actions workflow (private repo, one secret)
    └── PLAYBOOK-14D.md                   # 14 days to selling the weekly digest as a $29–99/mo add-on
```

## License

MIT — this free skill edition may be used, modified and shared freely (see `LICENSE.txt`). The paid kit sold at [content-decay-kit.zicula.trade](https://content-decay-kit.zicula.trade) is a separate product under its own single-agency commercial license.
