# grant-writing-kit (Agent Skill)

An [Agent Skill](https://agentskills.io) that gives your coding/AI agent a complete grants operating system for small nonprofits, freelance grant writers and consultants: the 8-link annual cycle — **research → score → track → prepare → write → submit → report → renew** — with the pipeline tracker and its live deadline radar, the weighted go/no-go scorecard with hard gates, the funder-research method, the boilerplate library, ten LOI templates, six proposal skeletons, the budget workbook, and the reporting/stewardship kit.

## What this skill does

Once installed, the agent can run any grants step with you and hand you a usable asset — a scored go/no-go verdict with evidence, a pass-gracefully decline email, a filled LOI draft, tailored proposal sections, budget rows — not a summary:

- **Research:** the funder-research SOP — build a real prospect list from 990 filings, grantee lists and public pages, no purchased database needed
- **Score (go/no-go):** the weighted scorecard — 15 criteria in 4 groups (Fit 30 / Access 34 / History 16 / Capacity 20), 6 hard gates that override the total, verdict bands (GO / CONDITIONAL / NO-GO / WAIT), scoring rules ("no evidence, at most 2"), re-weighting, and the pass-gracefully playbook
- **Track (pipeline):** the pipeline SOP — one row per funder program, two deadlines per application, the status ladder (Researching → Scoring → Writing → Submitted → Awarded/Not funded → Reporting → Renewal), the Monday 10-minute Deadlines radar, the Friday log, the monthly review
- **Prepare (boilerplate):** six fill-in templates — mission one-pager, org history, needs statement, program profile, staff bios, impact metrics — the sections every application reuses
- **Write:** ten complete letter-of-intent templates by scenario (general operating, program, capital, capacity building, research, faith-based, arts, health, education, environment) + the LOI craft guide; six full proposal skeletons with word budgets and a writing prompt per section
- **Budget:** the budget narrative template + the funder-requirements checklist (verbatim rules every skim misses)
- **Report & renew:** the grant report skeleton (results vs. targets, honest challenges, budget vs. actual), the five stewardship emails, and the "what changed" memo
- **Bonus:** the month-by-month annual calendar for a 2-4 hour week, and an AI prompt pack (8 prompts) with verification rules and confidentiality guardrails

## Install

Install with the [skills CLI](https://skills.sh) (works with Claude Code, Codex, Cursor, Gemini CLI and other skill-compatible agents):

```bash
npx skills add zicula/skills/grant-writing-kit
```

…or copy the folder into your agent's skills directory:

```bash
git clone https://github.com/zicula/skills.git
cp -R skills/grant-writing-kit ~/.agents/skills/

# or for Claude Code's project/user skills dir
cp -R skills/grant-writing-kit ~/.claude/skills/
```

That's it — the skill is self-contained. `SKILL.md` is the entry point; `references/` holds the process files from the kit: START-HERE, pipeline, go/no-go, funder research, boilerplate, LOI library, proposal skeletons, budget, reporting, calendar, AI prompt pack, and the license.

## Honest note: what's in the skill vs. the full kit

This skill is the **process layer extracted from the paid Grant Writing Kit** — all the SOPs, guides, templates, skeletons, the full LOI library and the checklists are here in full, in Markdown. The three working spreadsheets (`grant-pipeline-tracker.xlsx`, `go-no-go-scorecard.xlsx`, `grant-budget.xlsx`) are included as files with their live formulas — you open them in Excel/Google Sheets yourself (your agent can't click a spreadsheet for you, but the SKILL.md tells it how to recreate or fill the structure). The **full kit** (sold at [grant-writing-kit.zicula.trade](https://grant-writing-kit.zicula.trade)) is the same process in buyer-ready form: step-by-step setup guide, worked examples inside every workbook, and the single-buyer commercial license in its buyer form. If you want the operating system as agent-consumable files, this skill has you covered; if you want the complete buyer package and support the project, grab the kit.

## Files

```
grant-writing-kit/
├── SKILL.md                          # skill entry point (spec: agentskills.io)
├── README.md                         # this file
└── references/
    ├── START-HERE.md                 # the 8-link cycle, Deadline/Year tracks, file map, first hour
    ├── LICENSE.txt                   # MIT — free to use, modify and share
    ├── 1-pipeline/                   # pipeline SOP + tracker.xlsx (Pipeline / Deadlines / Log)
    ├── 2-go-no-go/                   # scoring guide + scorecard.xlsx (15 criteria, 6 hard gates)
    ├── 3-funder-research/            # prospect-list SOP from 990s and public sources
    ├── 4-boilerplate/                # 6 org templates (mission, history, needs, program, bios, metrics)
    ├── 5-loi-library/                # 10 LOI templates + the craft guide
    ├── 6-proposal-skeletons/         # 6 proposal skeletons with word budgets
    ├── 7-budget/                     # budget narrative + requirements checklist + budget.xlsx
    ├── 8-reporting/                  # report skeleton, stewardship emails, what-changed memo
    ├── 9-ai/                         # AI prompt pack (8 prompts, verification rules)
    └── 10-calendar/                  # the annual grants calendar
```

## License

MIT — this free skill edition may be used, modified and shared freely (see `references/LICENSE.txt`). The paid kit sold at [grant-writing-kit.zicula.trade](https://grant-writing-kit.zicula.trade) is a separate product under its own single-buyer commercial license.
