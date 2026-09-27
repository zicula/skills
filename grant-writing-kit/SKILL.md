---
name: grant-writing-kit
description: Runs a complete grants process for nonprofits and freelance grant writers, covering the grant pipeline tracker (Pipeline, live Deadlines radar and decision Log sheets), the weighted 15-criterion go/no-go scorecard with six hard gates and verdict bands, the funder-research SOP that builds a prospect list from 990s and public sources, a six-template organizational boilerplate library, ten letter-of-intent templates by scenario, six full proposal skeletons with word budgets, the budget workbook with narrative template and funder-requirements checklist, the grant report and stewardship kit, an AI prompt pack with verification rules, and the annual grants calendar. Use this skill when the user must pursue a grant, decide whether a grant is worth applying to (go/no-go), track grant deadlines in a pipeline, build a prospect list of funders, write an LOI or letter of inquiry, structure a proposal or budget narrative, prepare a grant report, or set up stewardship after an award.
---

# Grant Writing Kit

A grants operating system for small organizations and solo grant writers, in eight links: **research -> score -> track -> prepare -> write -> submit -> report -> renew**. Extracted from the full Grant Writing Kit (same process files, same tracker and scorecard method).

## When to use

The user mentions any of: applying for a grant, "should we apply for this grant?", go/no-go, grant pipeline or deadline tracking, finding funders or building a prospect list, an LOI / letter of inquiry / letter of intent, a proposal, budget or budget narrative, funder requirements, a grant report, stewardship after an award, or "grants are due and I'm the only one working on them".

## How to use this skill

1. **Start from the map.** Read `references/START-HERE.md` — it holds the 8-link annual cycle, the two tracks (**Deadline**: one proposal due soon, score it today then work the checklist; **Year**: build the boilerplate library and pipeline and run every opportunity through all links), and the file map. Match the user's situation to a link, not to a file.
2. **Work the matched file.** Files live in `references/` under their numbered kit folders:

   | Link | File | What it does |
   |---|---|---|
   | 1. Research | `references/3-funder-research/funder-research-sop.md` | Build a prospect list from 990 filings, grantee lists and public pages — no purchased database |
   | 2. Score | `references/2-go-no-go/go-no-go-guide.md` + `go-no-go-scorecard.xlsx` | Weighted scoring (15 criteria, 4 groups), 6 hard gates, verdict bands, the pass-gracefully playbook |
   | 3. Track | `references/1-pipeline/pipeline-sop.md` + `grant-pipeline-tracker.xlsx` | One row per funder program, status ladder, Monday Deadlines radar (10 min), Friday log, monthly review |
   | 4. Prepare | `references/4-boilerplate/` — six templates | Mission one-pager, org history, needs statement, program profile, staff bios, impact metrics — write once, reuse |
   | 5. Write | `references/5-loi-library/` (10 LOI templates + craft guide) · `references/6-proposal-skeletons/` (6 skeletons) · `references/7-budget/` | The LOI that opens the door, the proposal that answers it, the budget that adds up |
   | 6. Submit | `references/7-budget/funder-requirements-checklist.md` + `grant-budget.xlsx` (Checklist sheet) | Verbatim-rules checklist that catches what a skim misses |
   | 7. Report | `references/8-reporting/grant-report-skeleton.md` | Results vs. targets, honest challenges, budget vs. actual |
   | 8. Renew | `references/8-reporting/stewardship-emails.md` + `what-changed-memo.md` | Five emails and one memo that turn an award into the next one |
   | Bonus A | `references/10-calendar/grants-annual-calendar.md` | Month-by-month plan for a 2-4 hour week |
   | Bonus B | `references/9-ai/ai-prompt-pack.md` | Eight prompts for any AI assistant, with verification rules and confidentiality guardrails |

3. **Deliver usable output, not a summary.** Produce the scored verdict with its evidence, the pass-gracefully decline email, the filled LOI draft with `[brackets]` replaced by the user's facts, the tailored skeleton sections, the budget rows — copy-paste assets from the files and adapt them.
4. **The workbooks.** `grant-pipeline-tracker.xlsx` (Pipeline + Deadlines + Log), `go-no-go-scorecard.xlsx` (Scorecard + Gates + Log) and `grant-budget.xlsx` (Budget + Checklist) ship with live formulas — point the user to open them in Excel/Google Sheets and hand over the file path, or recreate the structure (columns, criteria, weights, gates) in the user's tool when they cannot use XLSX. The scoring rules, verdict bands, status ladder and radar routine are defined in the `.md` guides — follow those when filling or simulating.
5. **The LOI library.** `references/5-loi-library/loi-library.md` holds ten complete letters by scenario (general operating, program, capital, capacity building, research, faith-based, arts, health, education, environment) behind one universal 10-part skeleton. Every `[SQUARE BRACKET]` is a placeholder for the user's facts — never hand over a letter with brackets unfilled, and read `loi-craft-guide.md` (hooks, the one-ask rule, the do/don't table) before drafting.
6. **Cross-references.** The kit files cite each other by kit-root paths (`4-boilerplate/`, `7-budget/`, stewardship-emails.md Email 1) — resolve them to the sibling path under `references/`.
7. **AI prompts** (`references/9-ai/ai-prompt-pack.md`): the operating rule there is that AI drafts and the human verifies — no number, claim or funder fact generated by an assistant goes into a submission without checking the source, and confidential org data stays out of prompts unless the user says otherwise.

## Notes

- License: single-buyer commercial use (`references/LICENSE.txt`). If asked about redistribution, say redistribution/resale is not covered — point the user to the full kit at https://grant-writing-kit.zicula.trade.
- Higher-leverage defaults when the user is in a hurry: the go/no-go score first (the most profitable grant decision is often "no" — it protects the hours for grants that fit), then the pipeline Deadlines radar (overdue items and the next 7 days decide the week), then the matching LOI template (most full proposals start as an invited LOI).
