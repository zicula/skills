# AI Prompt Pack (8 prompts + the fact-check gate)

Use these prompts with any capable AI assistant. They speed up the writing
work inside the onboarding loop. The client-facing output still goes through
you — see the fact-check gate at the bottom before your first use.

---

## Prompt 1 — Summarize intake answers into a brief

```
Here are a new client's intake questionnaire answers:
[PASTE ANSWERS]

Summarize them into a brief with exactly these sections:
1) Objective (one sentence, in the client's own words)
2) Facts (bullets: customers, products, constraints)
3) Assets mentioned (list with owner)
4) Access systems mentioned (list)
5) Reds/ambers (anything vague, contradictory, or third-party dependent —
   quote the answer that makes it so)
Do not invent facts. If information is missing, list it under GAPS.
```

## Prompt 2 — Draft the kickoff agenda from the intake log

```
Using this intake summary [PASTE PROMPT-1 OUTPUT], draft a 60-minute
kickoff agenda in 6 segments following this structure: restating goals /
red-and-amber items / scope boundary read-aloud / working rhythm / next
steps. Each segment: minute range, purpose, the 2-3 questions I should
ask. Mark which reds must be resolved on the call.
```

## Prompt 3 — Draft the recap email from call notes

```
These are my raw kickoff call notes: [PASTE NOTES]

Draft the 24-hour recap email following this exact structure:
what we're doing / decisions with owner+date on one line / in-scope list /
out-of-scope list / how we work (response times) / client next steps /
my next steps / win condition in the client's words.
Rules: no new commitments that were not in my notes; if a note is ambiguous,
flag it with [CHECK] instead of guessing.
```

## Prompt 4 — Stress-test the scope worksheet

```
Here is my scope alignment worksheet: [PASTE]

Act as a skeptical reviewer. List:
1) Every deliverable that is open to interpretation (quote it, suggest a
   tighter wording)
2) Assumptions that are actually hidden scope
3) Anything a client could reasonably believe is included but is not
   written anywhere
Output as a numbered fix-list. Do not rewrite the worksheet, just expose
the holes.
```

## Prompt 5 — Draft a change-request reply

```
The client asked: [PASTE REQUEST]
Current scope says: [PASTE RELEVANT IN/OUT ROWS]
Timeline: [DATES]   Rate basis: [FIXED PRICE / HOURLY]

Draft a same-day reply that: welcomes the idea, states what it actually
involves, gives two or three options (approve at a stated cost/date /
swap for similar-size work / park it), and asks for the decision in
writing. Tone: warm, concrete, ten lines maximum. No work starts before
approval - reflect that.
```

## Prompt 6 — Turn raw week-notes into the 5-line update

```
My raw week notes: [PASTE BULLETS]

Compress into exactly five lines: DONE / NEXT / BLOCKED / DECISIONS NEEDED /
KEY DATES. Rules: every line concrete (names, numbers, dates); if something
slipped, state the slip with its cost and the choice the client gets; five
lines is the hard ceiling.
```

## Prompt 7 — Draft the handoff run book

```
Project: [DESC]. The client will self-serve these 5 routine tasks: [LIST]

Draft a one-page run book: per task, 3 lines max (steps / where / when to
ping me instead). Add a "known limitations" section with 3-5 bullets of
what this build does NOT handle. Plain language, no jargon, numbered
steps.
```

## Prompt 8 — Rehearse the difficult conversation

```
Role-play my client in a scope conversation. Their style: [e.g. friendly
but pushy, asks "can't this be free?"]. Situation: [PASTE REQUEST/
SITUATION]. Play their next 3 messages, one at a time, and after each of
my replies grade me on: kindness, clarity, whether I offered a trade,
whether I kept it in writing. Do not soften the client to flatter me.
```

---

## THE FACT-CHECK GATE (read before first use)

These prompts draft; **you** decide. Before any output reaches a client:

1. **Every fact, name, number, and date** in AI output gets checked against
   your real documents (intake log, milestones, thread). AI writing confidently
   is not evidence. If it invented a date, the email is wrong, not unlucky.
2. **No new commitments.** AI must add to what your notes say. Anything that
   was not said in the project goes through you and the change process, or it
   does not go out.
3. **Tone survives contact with your voice.** Read it aloud once. If a
   sentence is not something you would say, rewrite it in your words.
4. **Sensitive answers stay yours.** Do not paste client data into tools or
   tiers you would not trust with the whole thread; strip what the prompt
   does not need (Prompt 1 needs the answers; Prompt 5 needs two rows, not
   the whole worksheet).
5. **The record is the thread.** After sending, the final text lives in the
   project thread — not just in your chat window with the AI.

## What success looks like

- Drafts take minutes; checking takes ten; sending is still your decision.
- A [CHECK] flag appears in your drafts whenever your own notes were thin —
  and you fix the notes, then the draft.
- Nobody outside your thread can tell which paragraphs started as prompts.
