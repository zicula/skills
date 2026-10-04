# PLAYBOOK-14D — from deploy to the first paid API customer

You bought a kit, not a business. This plan gets the storefront in front of real API buyers within 14 days, with a clear stop condition. Hours assume evenings.

## Days 1–2 — Deploy + first key (3–4 h)

- [ ] SETUP.md steps 1–5 done. `/healthz` answers `ok`, portal live on pages.dev or your domain.
- [ ] Create your own first key in `admin.html`, label it `dogfood`.
- [ ] Wire one real endpoint of your API to `POST /v1/validate` (SETUP step 7).
- [ ] CUSTOMIZE.md steps 1–2: brand + payment link. Pricing live, even if nobody has visited.

**Gate:** portal URL + one protected endpoint, working end to end. If the API itself doesn't exist yet, stop and build that first — this kit sells the storefront around a working API.

## Days 3–4 — Proof (3–4 h)

- [ ] Changelog entry for your API's launch (v1.0.0) — even one honest line beats an empty page.
- [ ] Record a 60-second screen video: curl with a key → 200, no key → 401, drained quota → 429, then the portal. This video is your entire marketing asset.
- [ ] Write one launch post: what the API does, who it's for, the free tier, the link.

## Days 5–7 — First 20 humans (4–5 h)

- [ ] Post the launch where your buyers already are: relevant subreddits (r/webdev, r/SideProject, niche subs for your API's domain), Indie Hackers, one Discord you're actually a member of.
- [ ] Answer every comment; hand out free-tier keys personally (one `admin.html` click each).
- [ ] DM 10 people who asked adjacent questions elsewhere; offer a free Pro-size key for feedback.

**Gate:** ≥ 20 real visitors on the portal, ≥ 3 issued keys used at least once (check usage in `admin.html`).

## Days 8–11 — Convert (4–5 h)

- [ ] Email/message every active free-key holder: "you've used N credits — Pro is 50,000 for one payment, here's your link."
- [ ] Fix the top friction people actually hit (docs wording first — it's a 2-minute edit).
- [ ] Add one changelog entry per fix so visitors see a live product.

## Days 12–14 — Decide with numbers (2 h)

Count from `admin.html` + your payment dashboard:

| Signal | Verdict |
|---|---|
| ≥ 3 paying customers | Keep going: iterate weekly, raise prices on the next tier |
| 1–2 paying, ≥ 10 active keys | One more month of iteration, then re-decide |
| 0 paying, < 10 active keys | Stop here: the bottleneck is demand for the API, not the storefront |

**Standing stop condition:** if 30 days in nobody has used a key, the storefront isn't the problem to solve — don't pour more time into it.

## What this kit deliberately does not do

No ads, no cold email blasts, no "launch on 10 platforms" spray. One API, one portal, twenty honest conversations.
