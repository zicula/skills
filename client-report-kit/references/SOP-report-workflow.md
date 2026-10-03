# SOP — The 30-Minute Monthly Client Report

Standard operating procedure for producing one GA4 + Search Console monthly client report
with this kit. Run it per client, same day every month. After two months it becomes muscle
memory; until then, follow the clock.

**Before you start (one-time setup per client, ~20 minutes)**
- [ ] Request GA4 access: the client adds your Google account to their GA4 property (Marketer role is enough).
- [ ] Request Search Console access: full or restricted permission on their property.
- [ ] Fill template 01 (cover) once per client — name, your branding, contact. Save as the client's master copy.
- [ ] Note the exact property names/IDs in your internal tracker (never in the client PDF).
- [ ] Choose the delivery day (recommend the 3rd–5th, so the prior month is fully closed in GA4).

---

## The clock

### Minutes 0–5 · Pull GA4 data
Open GA4 → set date range: **1st–last day of last month** → open last month in a comparison
window (the "Compare" toggle, previous period).

| Where | Grab |
|---|---|
| Reports → Acquisition → Traffic acquisition | Sessions by channel (both periods) |
| Reports → Engagement → Landing pages | Top 10 landing pages: sessions, engagement rate, key events |
| Reports → Engagement → Conversions | Key events by count (both periods) |
| Reports → Advertising → Traffic acquisition | Conversions by channel |
| Reports → Tech → Overview | Device split; add a country dimension if geography matters |
| Reports → Snapshot / Home | Users, new users, engagement rate, avg. engagement time |

Paste into templates 02, 03, 05. **Sanity check:** channel sessions sum to total; conversion
counts match between the Conversions and Advertising views (small attribution differences are
normal — note them once, don't chase them monthly).

### Minutes 5–10 · Pull Search Console data
Open GSC → Performance → Search results → filter: Web → date range: last month → compare
to previous period. Export or copy:
- Headline numbers: clicks, impressions, avg. CTR, avg. position (both periods) → template 04 tiles
- Queries table sorted by clicks → top 10
- Pages table sorted by clicks → top 10
- Then filter queries by **position 11–20, sort by impressions** → pick up to 5 page-2 climbers

**Sanity check:** a 1–2 day data lag is normal; if GSC and GA4 disagree more than ~10% on
organic clicks vs organic sessions, check the date ranges first, then property definitions.

### Minutes 10–18 · Fill the templates
Duplicate the client master → fill templates 02, 03, 04, 05 tables from your pasted data.
Rules that keep you fast and safe:
- Deltas signed, 1 decimal. Position noted as "lower = better" wherever it worsened.
- Any cliff or spike you can't explain from memory gets a marker now (you'll diagnose in the next step).
- Don't write narrative yet — numbers first, story second.

### Minutes 18–26 · AI narrative pass
Open your AI tool → paste the **RULES block** (`prompts/00-how-to-use.md`) once.

1. Prompt 1 + KPI table → exec summary paragraph → paste into template 02 → edit.
2. Prompt 2 (or 3/4 for a drop/spike) + channel table → template 03 "what moved and why" → edit.
3. Prompt 5 + GSC numbers → template 04 interpretation → edit.
4. Prompt 7 + conversion data → template 05 story → edit.
5. Prompt 8 + constraints → next-month plan table → edit.
6. Prompt 12 → delivery email (leave in Drafts).

**Editing pass (the 4 fixes that matter):** correct any number the AI paraphrased wrong;
delete any claim not backed by your tables; swap your client's vocabulary in ("leads" not
"key events"); read once aloud — anything you stumble on, shorten.

### Minutes 26–30 · QA + send
Run the QA checklist below → export each HTML template to PDF (browser → Print → Save as
PDF, A4, margins None, background graphics on) → merge pages 1–5 → send the email from
Prompt 12 with the PDF attached → log delivery date in your tracker.

**Pre-send QA checklist**
- [ ] Client name spelled exactly as they spell it; period identical on all 5 pages
- [ ] Every number traces to GA4 or GSC for the stated period — spot-check 3 random figures
- [ ] All `[PLACEHOLDER]`s gone (search the document for "[" before exporting)
- [ ] Percent-of-total column sums to 100%; totals row matches
- [ ] Every red/negative number has an explanation or an action next to it
- [ ] No promises — expected effects are ranges with conditions
- [ ] AI text passes the quality check in `prompts/00-how-to-use.md`
- [ ] Confidentiality footer intact

---

## Monthly rhythm (multi-client)

| Day | Action |
|---|---|
| 1st | GA4/GSC close-of-month check: all client properties have data |
| 3rd–5th | Run the 30-minute SOP per client (batch: 3 clients ≈ half a day at first, ~90 min once practiced) |
| 6th | Delivery log review: anything unsent? Chase blockers, not deadlines |
| Monthly | Re-read last month's "next month's plan" before writing this month's — the plan-to-result loop is what clients pay for |

## When the numbers are bad (the SOP still holds)

1. State the drop with the exact number in the first sentence — never bury it.
2. Use Prompt 3 to structure the explanation; only evidence from your own pulls.
3. Pair every problem with the action already underway (Prompt 8 output).
4. Deliver on the normal day. Late + bad is the combination that loses retainers.
