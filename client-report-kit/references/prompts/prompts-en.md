# AI Narrative Prompts — English (Master, 12 prompts)

> Paste the RULES block from `00-how-to-use.md` before any prompt. Replace `[PASTE: …]`
> with your real data. Output is a first draft — always edit before it reaches a client.

---

## Prompt 1 — Executive Summary

**Paste:** KPI table (sessions, users, new users, engagement rate, avg. engagement time,
conversions, conversion rate — this month vs last month) + 1–2 lines on work delivered.

```
Write the executive summary paragraph for our monthly report.
Client: [CLIENT NAME], a [ONE-LINE BUSINESS]. Month: [MONTH YYYY].

[PASTE: KPI table]

Work delivered this month: [PASTE: 1–3 items]

Write 3–4 sentences in this order:
1. The headline: the one metric that defines the month, with its exact % change.
2. The main driver behind it, tied to a specific page/query/campaign.
3. The honest counterpoint (what underperformed or stayed flat).
4. What this sets up for next month (one clause, no promises).
Then add 3 bullets: the three numbers the client should remember.
```

## Prompt 2 — Month-over-Month Movement

**Paste:** channel table (sessions by channel, this vs last month) + top landing pages.

```
Explain the month-over-month traffic movement for a client report.

[PASTE: channel table + top 5 landing pages]

Write 4–6 sentences:
- Which channel explains most of the total change (compute the share from my data).
- Which pages are responsible, by name.
- Distinguish expected/seasonal movement from new movement — label which is which.
- If anything fell, say where those sessions went instead.
Do not invent causes. If the data doesn't show why something moved, say
"we're investigating" — do not guess.
```

## Prompt 3 — Explaining a Traffic Drop

**Paste:** sessions by week or by day for this + last month, channel breakdown, any known
events (algorithm updates you noticed, site changes, tracking changes).

```
Our client's traffic dropped. Draft the explanation section for the monthly report.
Client: [CLIENT NAME]. The drop: [e.g. organic sessions -18.4% vs last month].

[PASTE: weekly/daily sessions, both months]
[PASTE: channel breakdown]
[PASTE: known changes this month — deploys, tracking edits, etc.]

Write 4–6 sentences:
1. State the drop plainly with the exact number — no burying it.
2. Isolate WHEN it happened (date/week) and whether it was sudden or gradual.
3. Separate the three possible buckets using only my data: tracking change,
   site change, demand/seasonality — say which the evidence supports.
4. End with the concrete diagnostic step already underway.
Tone: calm and in control. The client should feel the drop is understood, not feared.
```

## Prompt 4 — Explaining a Traffic Spike

**Paste:** weekly/daily sessions both months, top pages this month, referring channels.

```
Traffic spiked this month. Draft the explanation section without taking credit
prematurely. Client: [CLIENT NAME].

[PASTE: weekly/daily sessions, top pages, channels]

Write 4–6 sentences:
1. Quantify the spike (exact % + when).
2. Attribute it precisely: which page(s), which channel, which query if visible.
3. Separate one-off causes (viral mention, press link, seasonal event) from
   repeatable ones (new rankings, campaign) — this decides whether we can expect it again.
4. One sentence on what we'll do to test whether it holds.
Do not claim credit for causes that aren't evidenced in my data.
```

## Prompt 5 — Search Performance Narrative

**Paste:** GSC headline numbers (clicks, impressions, CTR, position — both months),
top 5 queries, top 5 pages.

```
Write the interpretation section for our Search Console page. Do not restate the
table — interpret it. Client: [CLIENT NAME].

[PASTE: GSC headline numbers, both months]
[PASTE: top 5 queries: clicks, impressions, CTR, position]
[PASTE: top 5 pages: clicks, impressions]

Write 4–6 sentences answering:
1. Did clicks move because impressions grew (more demand covered) or because CTR
   improved (our titles/snippets winning)? Give the arithmetic in plain words.
2. Which single query or page explains most of the change?
3. What did average position do, and what does that mean in practice
   (remind: lower is better)?
4. One forward-looking clause tied to the page-2 climber data if provided.
```

## Prompt 6 — Keyword Opportunity Brief

**Paste:** 5–10 queries with positions 11–20 (page 2), their impressions, current position,
and the page that ranks.

```
Draft a short "quick wins" brief from these page-2 rankings. Client: [CLIENT NAME].

[PASTE: query | position | impressions | ranking page]

For each query (max 5), write 2 sentences:
- Why it's winnable: current position + impressions (potential traffic).
- The specific improvement we'd make: e.g. add an FAQ section answering the query,
  improve the title to raise CTR, add internal links from [related page], or
  expand the section that matches search intent.
Then one closing line: these are hypotheses; positions typically move over weeks,
not days. Order the list by impressions (highest potential first).
```

## Prompt 7 — Conversion Story

**Paste:** key events table (this vs last month), conversions by channel, top converting
pages, conversion rate both months.

```
Write the conversion story section. Client: [CLIENT NAME], a [BUSINESS TYPE].

[PASTE: key events table]
[PASTE: conversions by channel]
[PASTE: conversion rate, both months]

Write 5–7 sentences:
1. Headline: total conversions with exact % change, and whether conversion rate
   moved with it (more traffic vs better traffic — say which).
2. Which conversion type drove it, on which page(s).
3. The strongest and weakest channel by conversion rate — name both plainly.
4. One sentence on what this means for next month's plan (bridge to the plan section).
If conversions fell: state it in the first sentence, give the most likely evidence-based
reason, and name the counter-move already planned. No spin.
```

## Prompt 8 — Next-Month Recommendations

**Paste:** this month's KPI table, page-2 climbers, conversion notes, and 1 line on
resources available (hours/budget).

```
Propose next month's action plan (3–5 items, no more) for [CLIENT NAME].
Constraints: [e.g. ~20 hours; no dev resources; content budget only].

[PASTE: KPI table]
[PASTE: page-2 climbers + underperforming pages]
[PASTE: conversion notes]

For each item output exactly:
- ACTION: one concrete deliverable (not "improve SEO").
- BECAUSE: the specific data point it addresses from my paste.
- EXPECT: honest effect range + the assumption it depends on
  (e.g. "+5–10% leads IF current CTR holds").
- FIRST STEP: what happens on day 1.
Order by expected impact. Cut anything that doesn't cite a data point from my paste.
```

## Prompt 9 — Plain-Language Rewrite

**Paste:** any draft paragraph that reads too technical.

```
Rewrite this report paragraph for a business owner with no marketing background.
Keep every number exactly as written. Keep the same facts and order. Replace jargon
with plain words (a 5-word explanation is allowed once per term). Shorten sentences
to under 22 words on average. Do not add new claims.

[PASTE: draft paragraph]
```

## Prompt 10 — Wins & Watch-List

**Paste:** KPI table + 3–5 notable page/query movements (up or down).

```
From this month's data, write (a) three wins and (b) three watch-list items for the
executive summary.

[PASTE: KPI table]
[PASTE: notable movements]

Wins: each = one quantified result + one clause on why it happened. Only things my
data actually shows. Watch-list: each = the risk with its number + the action already
underway (never a worry without a plan). Max 20 words per item.
```

## Prompt 11 — Client Q&A Prepper

**Paste:** the filled report (or its summary tables) + last month's open questions from
this client if any.

```
Prepare me for the monthly check-in call with [CLIENT NAME]. Based on this report:

[PASTE: summary tables / filled narrative]

Output:
1. The 3 questions they are most likely to ask, in their probable order —
   written the way a non-marketer would phrase them.
2. A 2-sentence answer for each, grounded only in my pasted data.
3. The one weakness in this month's numbers they might poke at, and the
   honest framing for it (own it + show the plan).
4. One question I should ask THEM (to uncover business context the data can't show).
```

## Prompt 12 — Delivery Email

**Paste:** the three wins from the exec summary + the report link/attachment name + next
month's top focus.

```
Write a short delivery email for the monthly report. Client contact: [NAME], who is a
[BUSINESS ROLE]. From: [YOUR NAME].

Elements, in this order:
1. Subject line: the month's single most important number (no "Your monthly report").
2. Greeting + one line: the headline result.
3. Two bullets: the two wins they'll care about most (from my paste).
4. One line: the report is attached — "three-minute read".
5. One line: what we're focused on next month.
6. Sign-off offering a 15-minute call if they want to discuss.
Total under 120 words. No emojis. No exclamation marks.
```

---

**Output language:** this file produces English. For Spanish, Portuguese (Brazil), German,
French, or Thai client reports, use the equivalent numbered prompt from `prompts-es.md`,
`prompts-pt-br.md`, `prompts-de.md`, `prompts-fr.md`, or `prompts-th.md`.
