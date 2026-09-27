# SOP-13 · Pre-Delivery QA Checklist

| | |
|---|---|
| **Stage** | Delivery |
| **Owner** | Maker's teammate if you have one; otherwise the maker after a 24h cool-off |
| **Trigger** | Any deliverable is "done" and one step from the client's eyes |
| **Time** | 30–60 minutes per deliverable |
| **Output** | Deliverables that never generate a "small thing I noticed" email |

## When to use

Before every delivery: staging link, design files, report, campaign launch. QA's job is not perfection — it's making sure the client's *first impression* contains zero nits, because the first nit sets the trust level for everything after.

**The one-person rule:** QA by the maker is weak (you see what you meant). If you're solo: finish today, QA tomorrow morning against the checklist below, ideally after viewing the work as the client would (their laptop, their phone, their email client).

## Copy-paste: the QA checklist by deliverable type

**Website / app**
- [ ] Every link returns 200s (crawl, don't click — 20 minutes saves a launch-day blush)
- [ ] Mobile: hero, nav, forms, and footer checked on a real phone, not just a resized browser
- [ ] Forms: submit a real test entry — did the email arrive? did the CRM record it? did the confirmation show?
- [ ] Meta titles/descriptions + OG images on every page (client's first share is the day after launch, always)
- [ ] 404 page exists and is branded; redirects from old URLs mapped
- [ ] Analytics firing: pageviews + the conversion event you promised in SOP-07's metric
- [ ] Cross-browser spot check: Chrome, Safari (iOS text-size quirks!), one Firefox

**Design assets**
- [ ] Correct logo versions, margins/bleed per spec, export formats the client will actually use
- [ ] Contrast passes AA for body text (check, don't assume)
- [ ] Fonts embedded/licensed for the client's use cases
- [ ] Files named like a professional: `client-logo-primary-rgb.svg`, not `final_v3_REAL.svg`

**Content**
- [ ] Proofread one pass *backwards* (catches typos your brain autocorrects forward)
- [ ] Every fact, name, and number checked against source (a wrong price on a launched page is the classic)
- [ ] Links open where they claim; external links open in new tabs
- [ ] Brand-voice pass against their guidelines (SOP-08 assets)

**Campaign / launch**
- [ ] UTM scheme consistent and matches the report skeleton's columns (SOP-16) — future-you says thanks
- [ ] Test transaction/test lead through the *entire* funnel, including the email the client receives
- [ ] Budget caps + schedule verified in-platform
- [ ] Approval log complete: every launch asset has a written client approval in the thread

## The delivery wrapper

Ship with a one-line QA note: *"QA'd per checklist — forms tested end-to-end, links crawled, analytics verified at [DATE]."*
One sentence, huge signal: it tells the client what "done" means at your shop and pre-answers "did anyone actually test this?"

## Rules & red flags

- The maker never announces their own work as QA'd without walking the list. The list is short; walk it.
- Found a bug after sending? Fix + report before they find it: "One correction to this morning's link check: [X] — fixed and re-verified." Self-reported nits cost minutes; client-found nits cost the account's tone.
- Launch-day QA is *re*-QA on production, not a copy of staging sign-off. Different server, different env vars, new ways to be wrong.
- Keep the checklist in the repo/pack per project type — after three projects, add the nits you actually shipped. Your checklist becomes your agency's fingerprint.

## What good looks like

- "Small thing I noticed" emails: under one per project.
- Launch-day bug count: zero (staging QA + production re-QA).
- The QA line in your delivery email starts getting quoted back by clients in *their* internal updates — meaning trust arrived.

## Adapt it with AI

> "Build my QA checklist for [DELIVERABLE TYPE] in [STACK]. Include everything above that applies, add the 5 failure modes specific to this stack that I'd forget, and mark which 5 items are the ones clients actually notice first. Output as a copy-paste checkbox list."
