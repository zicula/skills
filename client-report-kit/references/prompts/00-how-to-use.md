# AI Narrative Prompt Pack — How to Use

Turn a table of GA4 / Search Console numbers into client-ready narrative in about a minute —
without the AI inventing anything. This pack contains **12 prompts × 6 languages**
(EN · ES · PT-BR · DE · FR · TH), one file per language.

## The 3 rules that make AI narration safe for client reports

1. **The AI narrates, you own the numbers.** Paste real values into every prompt. If the AI
   references a number you didn't paste, delete that sentence. This is the single rule that
   prevents embarrassing client emails.
2. **Edit before sending.** The prompt output is a first draft (80–90% there). Fix names,
   tighten claims, match the client's vocabulary. The report is your signature.
3. **The RULES block goes first.** Every prompt below is designed to run after the shared
   RULES block. Copy it once, keep it pinned at the top of your AI chat.

## The RULES block (paste before any prompt)

```
You are writing for a client-facing marketing report. Non-negotiable rules:
1. Use ONLY the numbers I provide. Never invent, estimate, or extrapolate a figure.
   If data you need is missing, write [DATA MISSING: what's needed] instead of guessing.
2. Plain language a business owner understands. No jargon without a 5-word explanation.
3. Calm, specific, professional. No hype ("amazing", "incredible"), no hedging mush.
4. Active voice. Name the page, query, channel, or campaign — never "traffic just went up".
5. Separate observation from hypothesis. Hypotheses start with "we believe" or "likely".
6. Deltas: signed percentages (+12.4% / -3.1%), 1 decimal. Position: lower is better — say so.
7. Respect the exact output length I ask for.
```

## Which prompt, when

| # | Prompt | Template slot | Typical time |
|---|---|---|---|
| 1 | Executive summary | 02 · "month in one paragraph" | 2 min |
| 2 | Month-over-month movement | 03 · "what moved and why" | 2 min |
| 3 | Explaining a traffic drop | 03 (or 02) narrative, bad month | 2 min |
| 4 | Explaining a traffic spike | 03 (or 02) narrative, good month | 2 min |
| 5 | Search performance narrative | 04 · "what the data means" | 2 min |
| 6 | Keyword opportunity brief | 04 · page-2 climbers | 2 min |
| 7 | Conversion story | 05 · "the conversion story" | 2 min |
| 8 | Next-month recommendations | 05 · plan table | 3 min |
| 9 | Plain-language rewrite | any draft that reads too technical | 1 min |
| 10 | Wins & watch-list | 02 · two columns | 2 min |
| 11 | Client Q&A prepper | your notes, not the report | 3 min |
| 12 | Delivery email | your outbox | 2 min |

## Workflow that fits the 30-minute SOP

1. Pull data (`SOP-report-workflow.md` steps 1–2) → fill template tables (step 3).
2. Open your AI tool, paste the RULES block once.
3. Paste Prompt 1 + your KPI table → paste output into template 02 → edit.
4. Run Prompts 5 and 7 the same way for templates 04 and 05.
5. Run Prompt 8 for the plan, Prompt 12 for the email. Edit everything. Send.

## Tone calibration (per client)

Add one line to the RULES block per client:

- **Conservative (finance, legal):** "Tone: measured and factual; lead with risk management."
- **Growth-stage startup:** "Tone: energetic but specific; every win carries a number."
- **Local business owner:** "Tone: simple words, short sentences, zero marketing jargon."
- **Non-native English speaker:** "Tone: simple sentence structures; avoid idioms."

For non-English reports, use the prompt file in that language (`prompts-es.md`,
`prompts-pt-br.md`, `prompts-de.md`, `prompts-fr.md`, `prompts-th.md`) — same 12 prompts,
written natively in the target language so the output reads like a local professional wrote it.

## Quality check before any AI text reaches a client

- [ ] Every number in the draft appears in my pasted data (or my tables)
- [ ] No promises ("will double") — only hypotheses with ranges
- [ ] No jargon the specific client wouldn't know
- [ ] Reads in under 60 seconds aloud
