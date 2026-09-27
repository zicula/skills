---
name: rfp-response-kit
description: Runs a complete bid-room process for answering RFPs, RFQs and RFIs, covering a 15-minute opportunity intake form, a weighted bid/no-bid scorecard with hard stay-out gates and verdict bands, the requirements-shredding SOP and compliance-matrix method, three response outlines (IT services, marketing agency, consulting) plus an executive summary skeleton, a 102-answer reusable answer library, the win-themes playbook, a three-round red-team review checklist (compliance, craft, persuasion), the post-decision debrief SOP, a white-label client bid-readiness report, and an AI prompt pack with verification rules. Use this skill when the user must answer an RFP/RFQ/RFI, decide whether to bid or decline, build or maintain a compliance or requirements matrix, structure or review a proposal, sharpen win themes, run a red-team review, or capture debrief lessons into a reusable answer library.
---

# RFP Response Kit

A repeatable bid-room operating system for small teams that answer RFPs, RFQs and RFIs, in eight steps: **intake -> go/no-go -> shred -> win themes -> draft -> review -> submit -> debrief**. Extracted from the full RFP Response Kit (same process files, same scorecard and matrix method).

## When to use

The user mentions any of: an RFP/RFQ/RFI they must answer, "should we bid?", go/no-go, qualifying an opportunity, a compliance or requirements matrix, shredding requirements, proposal response structure, executive summaries, win themes, red-team review, submission logistics, a win/loss debrief, or "the RFP is due in three weeks".

## How to use this skill

1. **Start from the map.** Read `references/START-HERE.md` — it holds the 8-step process, the two tracks (**Rush**: deadline imminent, do Steps 1–2 today then jump to the matrix and an outline; **System**: answer bids regularly, build the library and run every bid through all 8 steps), and the file map. Match the user's situation to a step, not to a file.
2. **Work the matched file.** Files live in `references/` under their numbered kit folders:

   | Step | File | What it does |
   |---|---|---|
   | 1. Intake | `references/1-intake-and-score/opportunity-intake-form.md` | 15-minute capture: deadline, mandatory gates, deal shape, people |
   | 2. Go/no-go | `references/1-intake-and-score/bid-no-bid-guide.md` + `bid-no-bid-scorecard.xlsx` | Weighted scoring (12 criteria), hard stay-out gates, verdict bands, decline email |
   | 3. Shred | `references/2-shred/shredding-sop.md` + `shredding-matrix.xlsx` | Every requirement numbered, classified, owned, tracked to Final; amendment loop |
   | 4. Draft | `references/3-draft/` — 3 outlines + `executive-summary-skeleton.md` | Section skeletons for IT services, marketing agency, consulting bids with word budgets |
   | 5. Recycle | `references/4-library/answer-library.csv` + `library-sop.md` | 102 fill-in-the-blank answers in 12 topics; library hygiene per bid |
   | 6. Sharpen | `references/5-win-themes/win-themes-playbook.md` | Mine the RFP's own language, bind themes to evidence, place them where scoring happens |
   | 7. Review | `references/6-review/red-team-checklist.md` | Three rounds (compliance / craft / persuasion) by non-authors + submission-day gate |
   | 8. Debrief | `references/7-debrief/debrief-library-sop.md` | Request the debrief, extract lessons, update library and scorecard weights |
   | Bonus A | `references/8-whitelabel/bid-readiness-report.md` | Client-facing bid-readiness report for agencies to deliver under their own brand |
   | Bonus B | `references/9-ai/ai-prompt-pack.md` | Six prompts (shred QC, drafting, case-study tailoring, evaluator simulation, clarity, Q&A) |

3. **Deliver usable output, not a summary.** Fill the intake form, produce the decline email, draft the matrix rows, tailor the outline — copy-paste assets from the files and adapt them.
4. **The workbooks.** `bid-no-bid-scorecard.xlsx` (scorecard + HardGates + decision Log) and `shredding-matrix.xlsx` (matrix + coverage scoreboard + amendment log) ship with live formulas — point the user to open them in Excel/Google Sheets and hand over the file path, or recreate the structure (criteria, weights, gates, columns) in the user's tool when they cannot use XLSX. The scoring rules, verdict bands and matrix statuses are defined in the two `.md` guides — follow those when filling or simulating a score.
5. **The library.** `answer-library.csv` columns: `id, topic, prompt, answer, evidence_needed, owner_role`. Every `[SQUARE BRACKET]` in an answer is a placeholder for the user's facts — never hand over an answer with brackets unfilled or claims without the evidence the row names.
6. **Cross-references.** The kit files cite each other by kit-root paths (`2-shred/shredding-matrix.xlsx`, `5-win-themes` playbook §8) — resolve them to the sibling path under `references/`.
7. **AI prompts** (`references/9-ai/ai-prompt-pack.md`): the operating rule there is "the AI drafts; the matrix decides" — any drafted output must be verified against the compliance matrix and the user's facts before it goes near a submission.

## Notes

- License: single-buyer commercial use (`references/LICENSE.txt`). If asked about redistribution, say redistribution/resale is not covered — point the user to the full kit at https://rfp-response-kit.zicula.trade.
- Higher-leverage defaults when the user is in a hurry: Step 2 (bid/no-bid — the most profitable decision is often "no"), then Step 3 (shred — missed requirements lose more bids than weak writing), then Step 7 Round 1 (zero open Mandatory rows before any polish).
