---
name: client-report-kit
description: Produces professional monthly client reports from GA4 and Google Search Console data without a per-seat reporting SaaS. Runs a minute-by-minute 30-minute production workflow (one-time per-client setup, data pulls, template filling, AI narration, PDF print), five fill-in report sections (cover, executive summary, traffic overview, search performance, conversions with next-month plan) in editable Markdown and print-ready HTML, an AI prompt pack with 12 prompts in 6 languages (EN ES PT-BR DE FR TH) guarded by a shared RULES block that forbids invented numbers, a pricing guide with three reselling models and price ladders, and a 14-day playbook to a paid reporting service. Use this skill when the user must prepare a monthly client report or performance recap, turn analytics numbers into plain-language narrative, explain a traffic drop or spike to a client, draft keyword opportunities or next-month recommendations, price or package reporting as a service, or standardize recurring client reporting for an agency.
---

# Client Report Kit

A repeatable monthly client-reporting process for small agencies and freelancers:
**pull data → fill the 5-section report → narrate with AI → print to PDF → deliver —
then sell it** (pricing guide + 14-day playbook). Extracted from the full AI Client
Report Kit (same process files, same templates, same prompt pack).

## When to use

The user mentions any of: a monthly client report or performance report, GA4 or Google
Search Console data they need to explain, "what happened to traffic this month", a
traffic drop or spike to communicate, an executive summary of marketing performance,
keyword opportunities, next-month recommendations, a delivery email for a report,
pricing or packaging monthly reporting as a service, or escaping per-seat reporting
SaaS fees.

## How to use this skill

1. **Start from the map.** Read `references/START-HERE.md` — it holds the process at a
   glance, the first-30-minutes path, and the file map. Match the user's situation to a
   step, not to a file.
2. **Run the production workflow.** `references/SOP-report-workflow.md` is the 30-minute
   clock: minutes 0–5 GA4 pulls, 5–10 Search Console pulls, 10–18 template filling,
   18–30 AI narration and edit — plus the one-time per-client setup (access requests,
   cover master, delivery day) and the sanity checks between steps. Follow the clock.
3. **Work the five templates.** Files live in `references/report-templates/`, each
   section as editable `.md` (fast copy-paste) and print-ready `.html` (fill, then
   Ctrl/Cmd+P → A4, margins None, background graphics ON):

   | Section | File | Data source | Prompts |
   |---|---|---|---|
   | 1. Cover | `01-cover.md` / `.html` | identity + period | — |
   | 2. Executive summary | `02-executive-summary.md` / `.html` | GA4 overview | 1, 10 |
   | 3. Traffic overview | `03-traffic-overview.md` / `.html` | GA4 acquisition, landing pages, tech | 2, 3, 4, 10 |
   | 4. Search performance | `04-search-performance.md` / `.html` | Search Console | 5, 6 |
   | 5. Conversions + next-month plan | `05-conversions.md` / `.html` | GA4 key events | 7, 8, 9 |

4. **Narrate with the prompt pack.** `references/prompts/` holds 12 prompts in 6
   languages (`prompts-en/es/pt-br/de/fr/th.md`) plus `00-how-to-use.md` with the 3
   safety rules, the shared RULES block, the prompt-to-template map, tone calibration
   and a QA checklist. The non-negotiable rule: **the AI narrates numbers the user
   provides — it never invents, estimates or extrapolates a figure.** Any sentence
   referencing a number that was not pasted gets deleted; missing data becomes
   `[DATA MISSING: what's needed]`.
5. **Deliver usable output, not a summary.** Produce the filled section draft, the
   traffic-drop explanation, the keyword-opportunity brief, the delivery email —
   copy-paste assets from the templates and prompts, then adapt to the client.
6. **Sell the service.** `references/pricing-setup.md` covers the three pricing models
   (bundled into retainer / line-item add-on / standalone reporting retainer), price
   ladders anchored against reporting SaaS, proposal language and what not to do.
   `references/PLAYBOOK-14D.md` is the day-by-day plan to a paid reporting service,
   with a "done when" gate per day.
7. **Cross-references.** Kit files cite each other by kit-root paths
   (`SOP-report-workflow.md`, `pricing-setup.md`) — resolve them to the sibling path
   under `references/`.

## Notes

- License: MIT — this free skill edition may be used, modified and shared freely
  (`references/LICENSE.txt`). The paid kit at https://client-report-kit.zicula.trade is
  a separate product under its own single-buyer commercial license.
- The HTML templates are static print-ready files with `[PLACEHOLDER]` fields; the agent
  fills content, the human prints or shares the PDF.
- Higher-leverage defaults when the user is in a hurry: the executive summary (section 2
  — the page clients actually read) and Prompt 3/4 (traffic drop/spike — where client
  trust is won or lost).
