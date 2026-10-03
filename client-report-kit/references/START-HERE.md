# START HERE — AI Client Report Kit (process layer)

One repeatable process for a monthly client report built from GA4 + Google Search
Console data — no reporting SaaS seat required:

```
 pull GA4 ──► pull Search Console ──► fill 5 templates ──► AI narration ──► edit ──► print PDF ──► deliver
 (5 min)      (5 min)                 (8 min)             (≈1 min)          (you)      (2 min)      (pricing-setup.md)
```

**The kit in one line:** 5 fill-in report sections (cover · executive summary · traffic
overview · search performance · conversions + next-month plan) in editable Markdown and
print-ready HTML, 12 AI narrative prompts in 6 languages guarded by a no-invented-numbers
RULES block, a 30-minute monthly production SOP, a pricing guide for reselling reporting,
and a 14-day playbook to a paid reporting service.

## First 30 minutes

1. Read `SOP-report-workflow.md` — the 30-minute workflow, minute by minute (5 min).
2. Open `report-templates/02-executive-summary.html` in a browser. The layout with
   `[PLACEHOLDER]` fields is the deliverable the client receives.
3. Pull data for any property you own: GA4 → Reports → Acquisition → Traffic acquisition
   (last month, with comparison), and Search Console → Performance → Search results.
   Paste into the template tables.
4. Open `prompts/prompts-en.md` (or the client's language), copy the RULES block from
   `prompts/00-how-to-use.md` into the AI tool, run Prompt 1, paste the draft into the
   executive summary — then edit.
5. Print to PDF (Ctrl/Cmd+P → A4, margins None, background graphics ON).

Then follow `PLAYBOOK-14D.md` to turn the workflow into a paid service.

## File map — which file does what

| File | What it is |
|---|---|
| `SOP-report-workflow.md` | The 30-minute monthly production workflow, minute by minute, plus one-time per-client setup (GA4/GSC access, cover master, delivery day) |
| `PLAYBOOK-14D.md` | Day-by-day: Week 1 build the machine, Week 2 sell it — each day has a "done when" gate |
| `pricing-setup.md` | Three reselling models (bundled / line-item / standalone retainer), price ladders, proposal language, what not to do |
| `prompts/00-how-to-use.md` | The 3 safety rules, the shared RULES block, prompt-to-template map, tone calibration, QA checklist |
| `prompts/prompts-en.md` (+ es, pt-br, de, fr, th) | 12 master prompts written natively per language |
| `report-templates/01-cover.md` / `.html` … `05-conversions.md` / `.html` | The 5 report sections — each ships as editable Markdown and print-ready HTML |

## The 12 prompts and where they land

1 executive summary · 2 month-over-month movement · 3 traffic-drop explanation ·
4 traffic-spike explanation · 5 search performance narrative · 6 keyword opportunity
brief · 7 conversion story · 8 next-month recommendations · 9 plain-language rewrite ·
10 wins & watch-list · 11 client Q&A prepper · 12 delivery email.

Template ↔ prompt map: 02 ← Prompts 1, 10 · 03 ← Prompts 2, 3, 4, 10 · 04 ← Prompts 5, 6 ·
05 ← Prompts 7, 8, 9.

## The rule that makes AI narration safe

The AI narrates numbers you provide — it never invents them. The RULES block in
`prompts/00-how-to-use.md` enforces this; the final check stays with you.

Placeholders: every `[BRACKET LIKE THIS]` (rose-colored in the HTML) is yours to replace.
Print settings: A4, margins None, background graphics ON.
