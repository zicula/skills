# rfp-response-kit (Agent Skill)

An [Agent Skill](https://agentskills.io) that gives your coding/AI agent a complete bid-room operating system for answering RFPs, RFQs and RFIs: the 8-step process small bid desks run — **intake → go/no-go → shred → win themes → draft → review → submit → debrief** — with the weighted scorecard, the shredding method, three response outlines, a 102-answer starter library and a three-round red-team checklist.

## What this skill does

Once installed, the agent can run any bid step with you and hand you a usable asset — a filled intake form, a scored go/no-go with decline email, matrix rows for every RFP requirement, a tailored outline, red-team findings — not a summary:

- **Intake & go/no-go:** 15-minute opportunity intake form, weighted bid/no-bid scorecard (12 criteria, hard stay-out gates, verdict bands: Bid / Conditional / No-bid / STAY OUT), decline email that keeps the relationship, decision log
- **Shred:** the requirements-shredding SOP — every requirement numbered verbatim, classified (Mandatory / Desirable / Form / Information), owned, tracked Shredded → Final, with the amendment loop for mid-bid changes
- **Draft:** full response outlines for IT/managed-services, marketing-agency and consulting bids (with word budgets) + the executive summary skeleton
- **Recycle:** a 102-answer starter answer library (CSV, 12 topics) with the library hygiene SOP
- **Sharpen:** the win-themes playbook — mine the RFP's own language, bind themes to evidence, place them where scoring happens
- **Review:** the three-round red-team checklist (compliance / craft / persuasion) run by non-authors + the submission-day logistics gate
- **Debrief:** request the debrief, extract lessons, update the library and re-weight the scorecard
- **Bonus:** a white-label client bid-readiness report (for agencies) and an AI prompt pack with verification rules

## Install

Install with the [skills CLI](https://skills.sh) (works with Claude Code, Codex, Cursor, Gemini CLI and other skill-compatible agents):

```bash
npx skills add zicula/skills/rfp-response-kit
```

…or copy the folder into your agent's skills directory:

```bash
git clone https://github.com/zicula/skills.git
cp -R skills/rfp-response-kit ~/.agents/skills/

# or for Claude Code's project/user skills dir
cp -R skills/rfp-response-kit ~/.claude/skills/
```

That's it — the skill is self-contained. `SKILL.md` is the entry point; `references/` holds the process files from the kit: START-HERE, intake & scorecard, shred, drafts, answer library, win themes, red team, debrief, white-label report, AI prompt pack, and the license.

## Honest note: what's in the skill vs. the full kit

This skill is the **process layer extracted from the paid RFP Response Kit** — all the SOPs, guides, outlines, the full 102-row answer library CSV and the red-team checklist are here in full, in Markdown/CSV. The two working spreadsheets (`bid-no-bid-scorecard.xlsx`, `shredding-matrix.xlsx`) are included as files with their live formulas; you open them in Excel/Google Sheets yourself (your agent can't click a spreadsheet for you, but the SKILL.md tells it how to recreate or fill the structure). The **full kit** (sold at [rfp-response-kit.zicula.trade](https://rfp-response-kit.zicula.trade)) is the same process in buyer-ready form: step-by-step setup guide, worked examples, and the single-buyer commercial license in its buyer form. If you want the operating system as agent-consumable files, this skill has you covered; if you want the complete buyer package and support the project, grab the kit.

## Files

```
rfp-response-kit/
├── SKILL.md                          # skill entry point (spec: agentskills.io)
├── README.md                         # this file
└── references/
    ├── START-HERE.md                 # the 8-step process, Rush/System tracks, file map
    ├── LICENSE.txt                   # MIT — free to use, modify and share
    ├── 1-intake-and-score/           # intake form, bid/no-bid guide + scorecard.xlsx
    ├── 2-shred/                      # shredding SOP + compliance matrix.xlsx
    ├── 3-draft/                      # 3 outlines + executive summary skeleton
    ├── 4-library/                    # answer-library.csv (102 answers) + library SOP
    ├── 5-win-themes/                 # win-themes playbook
    ├── 6-review/                     # red-team checklist (3 rounds + submission gate)
    ├── 7-debrief/                    # debrief & library update SOP
    ├── 8-whitelabel/                 # client bid-readiness report template
    └── 9-ai/                         # AI prompt pack (6 prompts, verification rules)
```

## License

MIT — this free skill edition may be used, modified and shared freely (see `references/LICENSE.txt`). The paid kit sold at [rfp-response-kit.zicula.trade](https://rfp-response-kit.zicula.trade) is a separate product under its own single-buyer commercial license.
