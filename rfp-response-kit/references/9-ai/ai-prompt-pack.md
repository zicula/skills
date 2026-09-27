# The AI Prompt Pack — drafting and reviewing with the assistant you already have

These prompts work with any capable AI assistant (the one in your browser, your IDE,
or your office suite). The kit is deliberately tool-agnostic: paste, run, and — this is
the operating rule — **verify every output against the compliance matrix before it
touches the submission.** The AI drafts; the matrix decides. An AI can write a fluent
paragraph that answers a question nobody asked, with confidence in proportion to its
wrongness. Your name goes on the submission, not the model's.

**Setup once:** paste the relevant library rows (from `answer-library.csv`) and the
shredded requirements for your bid into the project/memory of your assistant if it
supports that, or keep a scratch file with them and paste per session.

---

## Prompt 1 — Second-opinion shredding (quality control on your matrix)

**Paste:** one RFP section (or the whole document if short) + your matrix rows for it.

```
You are a bid compliance analyst. Here is an RFP excerpt and my requirement matrix rows
for it. List: (1) any requirement in the text I missed or split incorrectly — quote it
verbatim; (2) any of my rows that paraphrase so far they could be mis-checked later;
(3) any compound requirement I should split into separate rows. Output as a table:
verbatim requirement | my row (if any) | issue | suggested fix.
```

**Check the output:** it is a find-missed-requirements pass, not the matrix itself.
Accept a row only after you have read the quoted text in the source document yourself.

## Prompt 2 — Draft a section from the library

**Paste:** 2–5 requirement rows + the matching library answers + the win theme(s) that
section serves + any case-study facts you intend to use.

```
You are drafting one section of an RFP response for [BUYER TYPE]. Requirements to
answer, verbatim: [PASTE ROWS]. Approved source answers to adapt, verbatim:
[PASTE LIBRARY ROWS]. Win themes this section must carry: [THEMES]. Facts you may use,
and nothing else: [CASE-STUDY FACTS]. Write [N] words maximum. Mirror the RFP's own
terminology. Every claim must trace to the source answers or facts provided — if a
sentence needs a fact you were not given, write [FACT NEEDED: description] instead of
inventing one.
```

**Check the output:** hunt for invented specifics (numbers, client names, dates). Run
the wallpaper pass (`5-win-themes` playbook §8) — models drift toward adjectives. Then
verify the section answers the verbatim requirement, part by part, against the matrix.

## Prompt 3 — Tailor a case study to this buyer

**Paste:** your standard case study + the RFP's context section.

```
Rewrite this case study for the buyer described below. Keep every number and fact
exactly as given. Change emphasis and framing only: lead with the aspects that match
the buyer's stated concerns, and close by connecting it to their requirement [REF #].
Maximum [N] words.

CASE STUDY: [PASTE]
BUYER CONTEXT: [PASTE]
```

**Check the output:** diff the numbers against the original. A changed statistic is a
fabrication, and annex-vs-body mismatches are how evaluators learn to discount you.

## Prompt 4 — The evaluator simulation (Round 3 prep)

**Paste:** the RFP's evaluation criteria and weights + your executive summary (or full
draft if small).

```
You are the lead evaluator for this procurement, scoring [N] submissions today. Here
are the evaluation criteria and weights, then one submission. Score it: for each
criterion give a score out of its weight, the one-line justification an evaluator
would actually write, and the exact passage you relied on. Then list: the three
weakest answers in the document, and what a 9/10 answer would have said instead.
```

**Check the output:** the "exact passage" quotes are gold — wherever the model cannot
find a passage to rely on, your document is missing its best evidence in the place
evaluators will look first. Feed every weakness back into the draft, then re-run.

## Prompt 5 — The wallpaper and clarity pass

**Paste:** any drafted section.

```
Edit this RFP section: (1) flag every empty adjective (extensive, proven, innovative,
world-class, robust, seamless) — replace each with either the specific claim it was
pretending to be, marked [EVIDENCE NEEDED], or delete it; (2) shorten by 20% without
losing a single fact; (3) make every paragraph's first sentence carry its point. Do
not add new claims. Output: edited text, then a table of what you changed.
```

**Check the output:** the table is the deliverable — read it, because it shows where
your draft was arguing with adjectives instead of evidence.

## Prompt 6 — Q&A window question drafting

**Paste:** your matrix rows marked uncertain + the RFP's silence points.

```
We are preparing buyer questions for the Q&A window of this RFP. From the requirement
rows below, draft the questions worth asking: ambiguity that changes the answer's
shape, contradictions between sections, and requirements where the cost swings on
interpretation. For each: the question in neutral, non-advocating language, plus one
line on why the answer matters to our bid. Maximum 8 questions.

ROWS: [PASTE]
```

**Check the output:** buyers read questions for intelligence about bidders — strip
anything that reveals strategy; keep what a careful vendor would ask.

---

## The three standing rules

1. **The matrix is the source of truth.** If the AI's draft and the matrix disagree,
   the AI is wrong, however fluent it reads.
2. **No invented facts, ever.** Any number, name or date in AI output must exist in a
   source you pasted or a file you can cite. This kit's prompts force
   `[FACT NEEDED]` markers instead of confabulation — keep that instruction in every
   drafting prompt.
3. **Confidentiality is your call.** RFPs and your library may contain material your
   clients or employer treat as confidential. Check what you are allowed to paste into
   an external tool before you paste it; use local or contracted-private assistants
   where policy requires.
