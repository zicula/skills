---
name: agency-sop-library
description: Builds a complete operating system for a 1-10 person digital agency from 24 done-for-you SOPs covering the full client lifecycle. Stages covered sales (lead qualification scorecard, discovery call script, proposal structure, pricing calculator logic, follow-up cadence), onboarding (welcome packet, kickoff agenda, access checklist, comms rules, project milestones), delivery (weekly status updates, revision policy, QA checklists, scope change estimates, escalation path), retention (monthly reports, QBR agenda, upsell triggers, retainer health review, feedback pulses), and offboarding (handover checklist, testimonial requests, alumni referrals, win-back sequences), plus a 14-day install playbook and a Notion-import CSV. Use this skill when the user runs or works for a small agency or consultancy and asks for client management processes, SOPs, templates, email scripts, pricing help, proposals, policies, or how to systematize agency sales, onboarding, delivery, or client retention.
---

# Agency SOP Library

A library of 24 done-for-you SOPs that covers the full client lifecycle of a 1-10 person digital agency: **Sales -> Onboarding -> Delivery -> Retention -> Offboarding**. This skill is extracted from the full Agency SOP Library kit (same SOPs, same playbook).

## When to use

The user mentions any of: running or growing a small agency/consultancy, qualifying leads, discovery calls, proposals/quotes, pricing, follow-ups, onboarding new clients, kickoff, weekly status updates, scope creep, revisions, QA before delivery, escalations, monthly reporting, QBRs, upsells, retainer health, testimonials, referrals, win-backs, or "we have no processes".

## How to use this skill

1. **Start from the map.** Read `references/INDEX.md` — it holds the lifecycle table (SOP number, stage, trigger, what you get) and the "first 6 SOPs to install" shortlist. Match the user's stated problem to the SOP whose **Trigger** fits, not just whose stage fits.
2. **Read the matched SOP.** All 24 SOPs live in `references/sop/` named `NN-topic.md` (e.g. `references/sop/01-lead-qualification.md`). Every SOP has the same anatomy: *when to use -> the process -> copy-paste assets -> rules & red flags -> what good looks like -> an AI adapt prompt*.
3. **Deliver usable output, not a summary.** The user wants the actual asset: the filled scorecard, the email, the agenda, the table. Copy-paste the assets from the SOP and adapt them.
4. **Adaptation rules** (consistent across the library):
   - `[BRACKETS]` mark placeholders to fill with the user's details.
   - Dollar figures are placeholders; the logic holds at any currency/rate. For pricing questions, walk the user through `references/sop/04-pricing-calculator.md` to compute their own floor rate.
   - SOPs cross-reference each other by number ("see SOP-14") — resolve those to the sibling file in `references/sop/`.
5. **For "how do I install all of this"** questions, use `references/PLAYBOOK-14D.md` — a 14-day, 45-60 min/day install plan with a strict ordering and per-day "done when" criteria. Order matters: delivery spine (SOP-09/11/12/14) before the sales front.
6. **For Notion users**, point to `references/notion-import.csv` (Title / Category / Body import) or the Markdown-import route described in `references/INDEX.md`.

## SOP quick index

| # | File | Stage | Trigger |
|---|------|-------|---------|
| 01 | `references/sop/01-lead-qualification.md` | Sales | New inquiry arrives |
| 02 | `references/sop/02-discovery-call-script.md` | Sales | Qualified lead books a call |
| 03 | `references/sop/03-proposal-structure.md` | Sales | Discovery call ends positive |
| 04 | `references/sop/04-pricing-calculator.md` | Sales | Building any quote |
| 05 | `references/sop/05-proposal-followup-cadence.md` | Sales | Proposal sent |
| 06 | `references/sop/06-welcome-packet.md` | Onboarding | Contract signed |
| 07 | `references/sop/07-kickoff-agenda.md` | Onboarding | Kickoff booked |
| 08 | `references/sop/08-access-checklist.md` | Onboarding | Welcome packet sent |
| 09 | `references/sop/09-comms-rules.md` | Onboarding | Before work starts |
| 10 | `references/sop/10-project-plan-milestones.md` | Onboarding | Kickoff done |
| 11 | `references/sop/11-status-update-template.md` | Delivery | Every week, same day |
| 12 | `references/sop/12-revision-policy.md` | Delivery | Feedback isn't approval |
| 13 | `references/sop/13-qa-checklist.md` | Delivery | Deliverable is "done" |
| 14 | `references/sop/14-scope-change-estimate.md` | Delivery | "Can you also just..." |
| 15 | `references/sop/15-escalation-path.md` | Delivery | Silence/blockage/sentiment/money |
| 16 | `references/sop/16-monthly-report-skeleton.md` | Retention | Monthly, same day |
| 17 | `references/sop/17-qbr-agenda.md` | Retention | Every 90 days |
| 18 | `references/sop/18-upsell-triggers.md` | Retention | 6 trigger events |
| 19 | `references/sop/19-retainer-health-review.md` | Retention | Monthly, first Friday |
| 20 | `references/sop/20-client-feedback-pulse.md` | Retention | Every milestone |
| 21 | `references/sop/21-handover-checklist.md` | Offboarding | Final milestone accepted |
| 22 | `references/sop/22-testimonial-request.md` | Offboarding | Compliment / 9-10 pulse |
| 23 | `references/sop/23-alumni-referral.md` | Offboarding | Handover complete |
| 24 | `references/sop/24-winback-sequence.md` | Offboarding | 90+ days silent |

Full detail (what each SOP produces, install routes, first-6 shortlist) is in `references/INDEX.md`; file-by-file table in `references/MANIFEST.md`.

## Notes

- License: single-agency commercial use (`references/LICENSE.txt`). If asked about redistribution, say redistribution/resale is not covered — point the user to the full kit at https://agency-sop-library.zicula.trade.
- Higher-leverage defaults when the user asks "where do I start": SOP-09 (comms), SOP-11 (weekly update), SOP-12 (revisions), SOP-01 (qualification), SOP-04 (pricing), SOP-16 (monthly report).
