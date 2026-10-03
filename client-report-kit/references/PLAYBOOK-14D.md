# PLAYBOOK-14D — From Download to Paid Reporting Service in 14 Days

A day-by-day plan to go from this kit to a working, sellable monthly reporting service.
Budget 60–120 minutes per day. If you already run an agency with active clients, compress
week 1 to two days — you have data access already.

**Context that makes this worth two weeks:** reporting is a permanent cost center of agency
life, and the tooling market starts around $44/month (DashThis entry) with per-client
pricing on top (AgencyAnalytics, $20/client/month). A 30–90 minute workflow plus your own
templates breaks that dependency — and becomes a product you can price (see
`pricing-setup.md`).

---

## Week 1 — Build the machine (Days 1–7)

### Day 1 — Access + one real client chosen
- List 3 candidate clients/accounts where you can get GA4 + Search Console access this week.
- Send access requests today (the slowest step — start it before anything else).
- Pick your formats: which 2 of the 5 templates will you test first? (Recommend: 02 exec
  summary + 04 search performance — fastest feedback loop.)
- **Done when:** 3 access requests sent.

### Day 2 — Dry run on any property you own
- Open your own site's GA4/GSC (or the first client that granted access).
- Pull last month with the SOP (`SOP-report-workflow.md`, minutes 0–10). Don't write
  anything — just learn where every number lives in your account.
- Time yourself. Write your two slowest steps down.
- **Done when:** you can produce the headline tables in under 15 minutes.

### Day 3 — First full report (ugly is fine)
- Fill templates 02 + 04 end to end for your test property.
- Run Prompts 1 and 5 from `prompts/prompts-en.md` (pick the language file your client needs).
- Export both to PDF. Read them as if you were the client.
- **Done when:** a real 2-section PDF exists on disk.

### Day 4 — Fix what annoyed you
- Everything you fumbled on Day 3 (a missing number, a confusing table, a placeholder you
  missed) — fix the template copy once so it never bites again.
- Add your branding: agency name, contact block, footer in the HTML templates.
- Set up your AI tool: save the RULES block as a pinned/first message (system prompt or
  saved snippet).
- **Done when:** the RULES block is saved and both templates carry your branding.

### Day 5 — Narrative quality pass
- Run Prompts 2, 3 and 4 against last month's data on your test property — including a
  deliberately bad month (pick any month that dropped).
- Compare Prompt 3's output against how you'd have written the drop. Edit until it sounds
  like you. That edited style is now your house voice — keep 2–3 example sentences.
- **Done when:** one "bad month" narrative you'd actually send.

### Day 6 — The remaining templates
- Fill templates 03 + 05 for the test property (Prompts 7 and 8).
- Time the full SOP once, top to bottom. Realistic target: 45–60 minutes on the first
  complete run, 30 minutes after the second client.
- **Done when:** all 5 sections exist for one property, timed.

### Day 7 — Rest / catch-up buffer
- Anything from Days 1–6 that slipped finishes today. If you're on schedule: skim
  `pricing-setup.md` and decide Model A, B, or C as your primary.
- **Done when:** decision made, no other work.

## Week 2 — Turn it into revenue (Days 8–14)

### Day 8 — Price it
- Set your numbers using `pricing-setup.md`: your Essential tier price, your Pro tier if
  you offer one, your delivery day.
- Write the one-paragraph offer as it will appear in a proposal (language is in the guide).
- **Done when:** price + delivery day + offer paragraph written down.

### Day 9 — The first pitch (existing warmest client)
- Pitch the add-on (Model B) or the included upgrade (Model A) to your friendliest current
  client. In person or on a call — not by email alone.
- Show them a real PDF from Week 1 (your test data, their market if possible).
- Ask for a decision by the end of the week.
- **Done when:** the pitch happened, whatever the answer.

### Day 10 — Pipeline of three
- List every client or prospect to whom a monthly report is relevant. Score them: has data
  access? has budget? feels the reporting pain?
- Pitch the second one today. Book it for the same delivery-day rhythm.
- **Done when:** 3 conversations live or booked.

### Day 11 — QA + delivery system
- Build your pre-send checklist folder: QA checklist from the SOP printed/pinned, PDF merge
  step documented, delivery log started (client, month, sent date, feedback).
- Decide your AI safety rule and write it into your own SOP copy: *every AI sentence is
  checked against a table before it ships* (see `prompts/00-how-to-use.md`).
- **Done when:** one document contains your personal reporting SOP.

### Day 12 — Deliver the first real one
- Run the 30-minute SOP for the first paying/committed client. Use Prompt 11 before the
  handoff call, Prompt 12 for the email.
- Log their reaction verbatim — the exact words clients use become your sales copy.
- **Done when:** a real client received a real report.

### Day 13 — Test the multilingual edge (optional but high-value)
- If any client or prospect serves a non-English market: produce one section in their
  language using the matching prompt file (`prompts-es.md`, `prompts-pt-br.md`,
  `prompts-de.md`, `prompts-fr.md`, `prompts-th.md`).
- Have a native speaker glance at it if you can. Note what you'd fix.
- **Done when:** you know whether the multilingual angle is real for your market.

### Day 14 — Review + system decision
- Score the fortnight honestly:
  - Reports produced: ___ · Clients committed/paying: ___ · Hours actually spent per report: ___
- Decide the next 30 days:
  - **≥2 paying/committed** → keep the rhythm, add clients monthly, revisit prices at 5 clients.
  - **1 committed, interest but no yes** → the offer or the demo is off; re-run Day 9 with
    their words from Day 12.
  - **0 traction** → do three things: ask 2 prospects what blocked them, show a sample
    report to 2 agency peers, and cut your Essential price for the first 3 clients in
    exchange for a testimonial.
- **Done when:** next-30-days plan written in 5 lines.

## Rules that protect the fortnight

1. **Real data only.** Every day uses actual GA4/GSC pulls — never sample numbers. The
   muscle you're building is the workflow, not the theory.
2. **One primary pricing model.** Switching models mid-week kills momentum. Decide Day 7, revisit Day 30.
3. **The client sees your edit, not the AI's draft.** No exceptions, ever.
4. **Delivery day is sacred.** Once you promise the 4th, deliver on the 4th — that promise
   is the product.
