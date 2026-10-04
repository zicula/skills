# Change Request Form

Use this the moment new work appears mid-project. The form is one page and
takes about ten minutes to fill in. Its job is to keep the timeline honest —
it is a formality, not a fight, and the kickoff script says exactly that.

Rules:
- Costs and date impacts are stated **before** any new work starts.
- Three outcomes only: approved / declined / parked.
- Log every request, even the declined ones — the log is how patterns become
  visible (and how you learn which clients need a tighter scope conversation
  next time).

---

## The form (copy per request)

```
CHANGE REQUEST  CR-___
Project: ______________  Client: ______________
Date raised: __________  Raised by: ______________

1. WHAT IS REQUESTED (in the client's words)
   [1-2 sentences]

2. WHAT IT ACTUALLY INVOLVES (in your words)
   [tasks, dependencies, who touches it]

3. IMPACT — choose one from each row
   Timeline:  [ ] holds, because ...   [ ] +___ days, because ...
   Budget:    [ ] no change            [ ] +$___ (fixed price for this request)
   Scope:     [ ] pure addition        [ ] replaces: ____________ (removed in writing)

4. OPTIONS GIVEN TO THE CLIENT
   A) [approve at +$___ / +___ days]
   B) [swap: add this, remove ____________ (similar size)]
   C) [park it for the wrap-up / a follow-up project]

5. CLIENT DECISION
   [ ] Approved option ___ — name + date: ______________
   [ ] Declined — reason noted: ______________
   [ ] Parked — revisit at: ______________

6. IF APPROVED — update these before work starts
   [ ] milestones.csv  (new dates)
   [ ] scope-alignment-worksheet (IN/OUT tables)
   [ ] Friday update announces the change
```

---

## Worked examples (Fieldnote × Copperline)

### CR-001 — approved with money

```
CHANGE REQUEST  CR-001
Project: Copperline brand + site   Client: Copperline Coffee Roasters
Date raised: 2026-10-20            Raised by: Dana (call)

1. WHAT IS REQUESTED
   "A simple events page for tastings and cupping classes."

2. WHAT IT ACTUALLY INVOLVES
   New content type reusing the shop template; events list + detail layout;
   CMS collection; Dana's team to be taught to post events at handoff.

3. IMPACT
   Timeline: holds — page reuses an existing template, absorbed into week 4.
   Budget:    +$600 (fixed, covers layout + CMS + training time)
   Scope:     pure addition

4. OPTIONS GIVEN
   A) Approve at +$600, launch date holds
   B) Park until after launch

5. CLIENT DECISION
   [x] Approved option A — Dana, 2026-10-21 (email in project thread)

6. UPDATED
   [x] milestones.csv unchanged   [x] worksheet IN table + row 4
   [x] Friday update Oct 24 announces CR-001
```

### CR-002 — declined, with the reason in writing

```
CHANGE REQUEST  CR-002
Date raised: 2026-10-20            Raised by: Riley (call)

1. WHAT IS REQUESTED
   "Wholesale form prefills from the price list automatically."

2. WHAT IT ACTUALLY INVOLVES
   The price-list automation that was scoped OUT at kickoff (single-person
   spreadsheet today); real work: data model + sync + edit interface.

3. IMPACT
   Timeline: +5 business days
   Budget:    +$1,400
   Scope:     pulls the OUT item back in

4. OPTIONS GIVEN
   A) Approve at +$1,400 / +1 week
   B) Keep hand-updated form (current behavior)
   C) Park for a phase-two project

5. CLIENT DECISION
   [x] Declined option A — Riley, 2026-10-21 — "hand-updated is fine for
   now." Logged to worksheet "Excluded by decision" 2026-10-21.
```

Two requests in one call, two different outcomes, both settled in writing
inside 24 hours, timeline intact.

---

## Patterns worth watching (log analysis)

- **Three or more CRs from the same client inside two weeks** → the intake
  questionnaire missed something. Ask which of the original questions was
  answered vaguely; fix the questionnaire, not just the CRs.
- **CRs that all arrive from a different person than the approver** → add
  that person to approvals in the kickoff recap; they are a decision-maker
  operating without a channel.
- **Every CR is "small"** → the phrase to watch. Small requests are still
  requests; the log keeps their sum visible. Five "smalls" is a week.

## What success looks like

- The client has used the phrase "can you change-request that?" unprompted.
- Every CR that was approved has a matching update in milestones.csv and the
  worksheet the same day.
- The CR log shows requests, not conflicts — the average approval conversation
  takes under ten minutes.
