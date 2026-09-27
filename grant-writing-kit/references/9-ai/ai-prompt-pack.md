# AI Prompt Pack — eight prompts for any assistant you already use

These prompts work with whatever AI assistant you have — the one in your browser,
the one in your office suite, the one your consultant uses. They are written to be
pasted as-is with your materials attached, and each ends with its **verification
rule**: the check that keeps the AI useful. One principle runs through all eight:

> **The AI drafts; you verify.** An AI assistant does not know your organization.
> It will write fluent sentences around whatever facts you give it — and fluent
> sentences around wrong facts are more dangerous than clumsy ones. Every prompt
> below forces unknown facts into a visible `[FACT NEEDED]` marker you can hunt
> to zero before anything ships.

**Confidentiality guardrail (read once, apply everywhere):** prompt with documents
you may share with that tool. Do not paste donor lists, participant records, or
anything your policies restrict — the prompts below use aggregates and boilerplate,
not personal data. Your funder agreements and your own client contracts set the
rules; follow them literally.

---

## Prompt 1 — Draft a needs statement from your boilerplate

```
You are drafting the "Statement of Need" section of a grant application.
Facts (the only ones you may use): [paste needs-statement research notes —
statistics with sources/years, waitlist numbers].
The funder's stated priority: [paste their sentence].
Write 450-600 words in three moves: (1) the problem sized locally with every
statistic carrying its source and year exactly as given; (2) the unserved gap;
(3) a bridge to our approach: [one sentence of your approach].
Rules: no new statistics; if a sentence seems to need a number I did not give,
write [FACT NEEDED: what it would be]. No adjectives standing in for evidence.
```
**Verify:** every (Source, Year) in the draft matches your notes character for
character; hunt [FACT NEEDED] to zero; delete any statistic you cannot re-source.

## Prompt 2 — Tailor a draft to the funder's guidelines

```
Here are a funder's application guidelines: [paste].
Here is my draft section: [paste].
List: (1) every guideline requirement this draft does not satisfy, quoting the
guideline; (2) the funder's priority vocabulary the draft could adopt, with a
one-clause rewrite suggestion per term; (3) anything in the draft a strict
reviewer would question. Do not rewrite wholesale — list first.
```
**Verify:** each quoted guideline exists in the real document (AIs paraphrase
requirements confidently); adopt the list item by item yourself, or re-prompt for
a rewrite of named paragraphs only.

## Prompt 3 — Summarize guidelines into go/no-go inputs

```
Summarize these funder guidelines into a scored-ready brief: [paste guidelines].
Output exactly: (1) eligibility rules as a checklist; (2) geography and org-size
window; (3) typical award range and cycle dates as stated; (4) process (LOI first?
invite-only? portal?); (5) five phrases of their priority language, quoted; (6)
anything ambiguous that deserves a program-officer question. Quote, don't
paraphrase, for rules and dates.
```
**Verify:** spot-check the dates, the eligibility checklist and the quotes against
the source — this summary feeds the scorecard, so a wrong date here becomes a
wrong decision there.

## Prompt 4 — The follow-up or program-officer email

```
Draft a short email (under 150 words) to a foundation program officer.
Purpose: [pick/status check/clarify a guideline question/ask for the decision
timeline]. Facts: [grant name, dates, the one question]. Tone: warm,
specific, no hedging, no apologizing for asking. Their name and title: [x].
```
**Verify:** it contains one question, not three; it names real dates; it says
nothing you would not say on the phone.

## Prompt 5 — Build the grant calendar from your deadline list

```
Here are my grant deadlines and cycles: [paste the tracker's list — funder,
deadline, round, internal deadline].
Build a 12-month working calendar for someone with 2-4 hours/week: for each
application, work backwards — internal draft deadline 10 days before theirs
(5 for an LOI), writing-block weeks, gathering week for attachments (letters
and signatures are long-lead). Flag collisions where two applications demand
the same weeks. Output: a month-by-month table plus a "collision warnings"
list.
```
**Verify:** the date arithmetic (spot-check three); the collisions against real
calendar commitments — the AI knows your deadlines, not your life.

## Prompt 6 — Expand an LOI into a proposal (or compress back)

```
Here is my funded-pipeline LOI: [paste]. Here is my boilerplate: [paste the
relevant files]. Expand the LOI into a full-proposal skeleton: executive
summary, statement of need, program design, evaluation plan, organizational
capacity, sustainability — using the LOI's promises as the spine and the
boilerplate as the only source of facts. Where a section needs a fact neither
document contains: [FACT NEEDED: description]. Keep every number identical to
the LOI's unless I flagged a change.
```
**Verify:** the numbers match the LOI exactly (the invited proposal must feel
like the same organization that wrote the letter); [FACT NEEDED] hunted to zero;
each pasted boilerplate fact still traceable to its file.

## Prompt 7 — Draft the grant report from your results data

```
Draft a grant report from these inputs: [paste the metrics table — targets
and actuals — budget vs. actual lines, one consented participant story, the
honest what-went-wrong paragraph].
Structure: grant at a glance (table), what the money did, results in
participants' terms (story after numbers, illustrating them), what did not
go to plan, what comes next, thank you. Denominators stay in the sentences.
Funder's own questions to answer: [paste if any].
```
**Verify:** every actual against your metrics files; the story introduces no
number that is not in the tables; the miss is still in there — an AI asked to
"improve" a report will sand the honest part off it if you let it.

## Prompt 8 — Draft the budget narrative

```
Here is my grant budget: [paste the workbook's rows — category, item, amount,
basis]. Write the budget narrative: one short paragraph per category, every
line's basis named, arithmetic shown (hours × rate, units × price). Indirect
paragraph must state the funder's rule, which is: [paste the verbatim rule or
"unclear — frame a program-officer question"]. Plain language, no accounting
jargon.
```
**Verify:** paragraph totals against the workbook, line by line; the indirect
paragraph quotes their rule verbatim; nothing in the narrative lacks a basis row
in the workbook.

---

## The verification habit (one minute, every time)

1. **Hunt the markers:** search the draft for `FACT NEEDED` — resolve every one
   before it leaves your desk.
2. **Chase the digits:** every number in the AI draft must exist in your source
   documents. This is the whole game.
3. **Read the names:** funder, program, officer, org — AIs normalize names to
   plausible-sounding ones; yours are checkable.
4. **Cut the armor:** delete fluent hedging ("it is widely recognized that…") —
   it is filler with a diploma.
5. **Say it back:** read the draft aloud; every sentence you would not say is a
   sentence to rewrite or cut.
