# Pipeline SOP — how the tracker runs week to week

The tracker (`grant-pipeline-tracker.xlsx`) is the CRM of grant seeking. Its three
sheets: **Pipeline** (every prospect and application), **Deadlines** (the live radar),
**Log** (every real event). This SOP defines how each is used, so the tracker stays
trustworthy enough to plan your week from.

```
   RESEARCH (3-funder-research)                THE WEEK (you, 2-4 h)
   longlist → qualify ──────────────►  ┌──────────────────────────────┐
   10-20 real prospects                │ Mon 10 min: Deadlines radar  │
              │                        │ Wed 60-120 min: writing block│
              ▼                        │ Fri 10 min: Log + statuses   │
   SCORE (2-go-no-go) → Decision ────► │      (update every row)      │
   GO / CONDITIONAL / NO-GO            └──────────────────────────────┘
              │                                     │
              ▼                                     ▼
   WRITE (5-loi, 6-skeletons, 7-budget) → SUBMIT → REPORT → RENEW
```

## One row per program, one owner per row

- **One row per funder program**, not per contact and not per application year. A
  funder with three programs gets three rows. Renewals are a new row (Round =
  `Renewal`) that inherits the relationship, not the deadline.
- **Every row has an owner** — a person's name in the Owner column. In a one-person
  shop the owner is you; write it anyway. The column exists so that the day you have
  help, the handover is a filter, not an archaeology project.
- **Two deadlines per application.** Their deadline goes in **Deadline**; your
  internal deadline — the day your draft must be done, at least five days earlier for
  an LOI and ten for a proposal — goes in **Next-action date** (or your calendar).
  The radar watches theirs; your discipline watches yours.

## The status ladder

`Researching → Scoring → Writing LOI → Writing proposal → Submitted → Awarded /
Not funded → Reporting → Renewal due` (plus `Passed` for the grants you declined).

Rules that keep the ladder honest:

1. **Nothing sits in `Scoring` for more than two weeks.** A score older than that is
   a stale score — funders' cycles move. Re-score it or pass.
2. **`Writing proposal` requires a logged GO.** If the scorecard says CONDITIONAL,
   the row stays in `Scoring` with the conditions in the Notes column and dates in
   the Log. Writing before deciding is how weekends disappear.
3. **`Submitted` triggers two same-week events**, both logged: the thank-you/confirmation
   email (stewardship-emails.md, Email 1) and the report-calendar block if awarded
   later. An application that lands silently is a relationship running cold.
4. **`Not funded` is a status, not an ending.** The row converts to research: the
   feedback call goes in Next action, and the funder stays in the pipeline. Most
   first awards in this system's experience are second or third asks.

## The Monday radar (10 minutes)

Open the **Deadlines** sheet first, every Monday:

| Number | What it means | What you do |
|---|---|---|
| Deadlines in the next 7 days | The writing week is committed | Writing blocks go on the calendar today |
| Deadlines in 8-30 days | What you can still influence | Score anything unscored; start LOIs |
| Open items past their deadline | The red row — the example ships with one on purpose | Call the program officer that day: extension or graceful pass, then Log |
| Ask in play | Total dollars waiting on decisions | Sanity: is this pipeline plausible for your capacity? |
| Awarded this calendar year | What the system has produced | This is the number your board asks about |

Friday (10 minutes): every row's status is true, every Next action has a date, the
Log has the week's real events. A tracker that is only sort of true is worse than
no tracker — it teaches you to ignore it.

## The monthly review (45 minutes, first Friday)

1. Filter `Status = Researching`: is the top of the funnel alive? Fewer than ten
   live prospects means next month's problem is now — run the research SOP again.
2. Filter `Decision = CONDITIONAL`: every one has conditions with dates. Resolve or
   re-score.
3. Compare **Ask in play** to last month. A pipeline that only shrinks is a pipeline
   that stopped being fed at the research link.
4. Re-read the Log top to bottom. The story it tells — who said yes, who went quiet,
   what got passed — is your grant strategy for next quarter, written by you.

## Reading the columns

- **Fit (0-100)** — the scorecard TOTAL, copied in at scoring time. It is a decision
  input, not a grade: a 61 you commit is worth more than a 76 you cannot staff.
- **Round** — `LOI`, `Full proposal`, `Invite-only`, `Renewal`, `Report`. Invite-only
  rows still get scored; an invitation is interest, not a commitment.
- **Days left (auto)** — computed from today. Negative numbers are the radar doing
  its job; do not delete the formula to hide one.
- **Awarded ($) + Award date** — filled only on award. The radar's "Awarded this
  calendar year" reads the date, so the date matters as much as the number.

## What the tracker does not do

It does not manage the money after award (that is your accounting system's job —
`8-reporting/what-changed-memo.md` bridges the two), it does not store funder
documents (keep guidelines PDFs in one folder per funder, named `funder-program-date`),
and it does not replace the calendar — the radar tells you what is due; your calendar
is where the writing hours actually get reserved.
