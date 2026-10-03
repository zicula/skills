# client-report-kit (Agent Skill)

An [Agent Skill](https://agentskills.io) that gives your coding/AI agent a complete monthly client-reporting process for GA4 + Google Search Console data: the 30-minute production workflow (minute by minute), the 5-section report in editable Markdown and print-ready HTML (cover · executive summary · traffic overview · search performance · conversions + next-month plan), a 12-prompt AI narrative pack in 6 languages (EN · ES · PT-BR · DE · FR · TH) guarded by a no-invented-numbers RULES block, a pricing guide for reselling reporting, and a 14-day playbook to a paid reporting service.

## What this skill does

Once installed, the agent can run the whole reporting cycle with you and hand you usable assets — a filled report section, a plain-language traffic-drop explanation, a keyword-opportunity brief, a delivery email — not a summary:

- **Produce:** the 30-minute SOP — one-time per-client setup (GA4/GSC access, cover master, delivery day), minutes 0–5 GA4 pulls, 5–10 Search Console pulls, 10–18 template filling, 18–30 narration and edit, with sanity checks between steps
- **Report:** 5 sections × 2 formats — `.md` for fast editing and `.html` print-ready (A4, margins None, background graphics ON → PDF), every `[PLACEHOLDER]` marked
- **Narrate:** 12 AI prompts (executive summary, month-over-month movement, traffic-drop/spike explanations, search narrative, keyword opportunity brief, conversion story, next-month recommendations, plain-language rewrite, wins & watch-list, client Q&A prepper, delivery email) in 6 languages, each run after the shared RULES block — the AI narrates numbers you provide and never invents one
- **Sell:** three pricing models (bundled into retainer / line-item add-on / standalone reporting retainer) with price ladders anchored against reporting SaaS, plus the day-by-day 14-day playbook with "done when" gates

## Install

Install with the [skills CLI](https://skills.sh) (works with Claude Code, Codex, Cursor, Gemini CLI and other skill-compatible agents):

```bash
npx skills add zicula/skills/client-report-kit
```

…or copy the folder into your agent's skills directory:

```bash
git clone https://github.com/zicula/skills.git
cp -R skills/client-report-kit ~/.agents/skills/

# or for Claude Code's project/user skills dir
cp -R skills/client-report-kit ~/.claude/skills/
```

That's it — the skill is self-contained. `SKILL.md` is the entry point; `references/` holds the process files from the kit: START-HERE, the 30-minute workflow SOP, all 5 report templates (Markdown + print-ready HTML), the 12×6 prompt pack, the pricing guide, the 14-day playbook, and the license.

## Honest note: what's in the skill vs. the full kit

This skill is the **process layer extracted from the paid AI Client Report Kit** — the full production SOP, all 5 report templates in both formats, the complete 12×6 prompt pack, the pricing guide and the 14-day playbook are here in full, uncut. The **full kit** (sold at [client-report-kit.zicula.trade](https://client-report-kit.zicula.trade), from $49 one-time — three tiers, 14-day money-back) is the same process in buyer-ready form: step-by-step setup runbook in the zip, buyer quickstart guides (EN/ES/PT-BR), and the single-buyer commercial license in its buyer form. If you want the operating process as agent-consumable files, this skill has you covered; if you want the complete buyer package and support the project, grab the kit.

## Files

```
client-report-kit/
├── SKILL.md                          # skill entry point (spec: agentskills.io)
├── README.md                         # this file
└── references/
    ├── START-HERE.md                 # the process at a glance, first 30 minutes, file map
    ├── LICENSE.txt                   # MIT — free to use, modify and share
    ├── SOP-report-workflow.md        # the 30-minute monthly workflow, minute by minute
    ├── PLAYBOOK-14D.md               # day-by-day: build the machine (week 1), sell it (week 2)
    ├── pricing-setup.md              # 3 reselling models, price ladders, proposal language
    ├── prompts/                      # 00-how-to-use (rules block) + 12 prompts × 6 languages
    └── report-templates/             # 5 sections × (.md editable + .html print-ready)
```

## License

MIT — this free skill edition may be used, modified and shared freely (see `references/LICENSE.txt`). The paid kit sold at [client-report-kit.zicula.trade](https://client-report-kit.zicula.trade) is a separate product under its own single-buyer commercial license.
