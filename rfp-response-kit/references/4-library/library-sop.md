# The Answer Library — How to Build and Maintain It (Step 5)

`answer-library.csv` ships with 102 starter answers — the questions RFPs ask again and
again, written as fill-in-the-blank templates with `[SQUARE BRACKETS]` for everything
that is yours to fill. They are raw material, ready-made prose: no answer goes into a
submission with brackets unfilled or without your facts behind it.

## Why a library is the whole game

The second RFP you answer should cost half the hours of the first. That only happens if
yesterday's work is recoverable. Enterprise bid desks pay five figures a year mostly for
exactly this: a searchable, current set of approved answers. A CSV plus discipline gets a
small team the same effect.

## Open it in your spreadsheet app

- **Excel / LibreOffice / Numbers:** double-click the file.
- **Google Sheets:** new sheet → File → Import → Upload → drag `answer-library.csv` in →
  Import. Keep it as one tab; it is filterable by `topic`.

Columns: `id` · `topic` · `prompt` (the question as RFPs usually ask it) · `answer`
(the fill-in-the-blank template) · `evidence_needed` (what must exist before the answer
is usable) · `owner_role` (who in your team owns keeping it true).

## The workflow, per bid

1. **Search before you write.** For each section, filter the library by topic and copy
   the closest answers into your draft. Rewrite around the buyer's words (Step 6 does
   this properly — the library gives you the body, the RFP gives you the accent).
2. **Fill every bracket with a fact.** If you cannot fill a bracket, you have found a
   content gap — that is the library doing its job before the evaluator finds it.
3. **Improve the answer as you use it.** If you rewrote L-034 for this bid and it reads
   better, write the improved version back into the library row and set `last_reviewed`
   to today. The library should get better with every bid, or it is just an archive.
4. **Add the answers you had to write from scratch.** New question the library lacks?
   Add a row (next `L-1xx` number, matching topic). Harvest these from every RFP you
   answer — question lists repeat across buyers more than you expect.

## Hygiene rules (small, non-negotiable)

- **`last_reviewed` is the honesty column.** Blank or older than ~6 months = treat the
  answer as unverified. Review 10–15 rows per week and the whole library stays warm.
- **Numbers expire fastest.** Staff counts, client counts, retention figures, cert
  counts — put them in brackets even when you know them, so the person updating in a
  year checks rather than trusts.
- **One owner per row.** The `owner_role` column is not decoration: Finance answers rot
  differently than Ops answers. Owner means "this person's facts", not "this person's
  typing".
- **Keep answers modular.** One row = one answer to one question. If an answer has grown
  to three paragraphs covering three questions, split it into three rows.
- **Sensitive facts stay out.** The library holds templates, not secrets — no client
  names you cannot reference publicly, no credentials, no pricing tables. Those live in
  the deal folder, referenced by bracket.

## After the debrief (Step 8 feeds this)

Every debrief (win or loss) ends with a library pass: which answers drew evaluator
praise, which drew doubt, which questions appeared that the library lacked. An hour of
that per bid is what turns this file from "102 templates" into your actual bid room.
