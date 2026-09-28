# Personalization SOP — the 15-minute routine behind every first line

Cold email works when the reader believes you wrote to *them*. That
believability is manufactured by research, not by mail-merge tokens.
`{{first_name}}` is not personalization; `"{{Company}} — saw you're
hiring"` filled with a stale job post is how you get "who is this?"

This SOP takes **12–15 minutes per prospect** for the first touch. Yes,
that limits you to ~4 new prospects per hour. That is the point: the
volume ceiling in SETUP.md Chapter 5 is not the constraint — research time
is. Small and right beats big and wrong.

## The rule

**Write from sources you actually opened this week.** Public pages,
profiles, posts, and data your business owns (past customers, event
attendees, community threads you were part of). Never scraped databases,
never purchased lists — apart from the legal/compliance mess (GDPR and
friends), bulk third-party lists are the #1 source of bounces and spam
traps, and bounces are reputation.

## The 6-step routine (12–15 minutes)

### 1. Qualify in 2 minutes — or stop
Open their site. Answer in one sentence: *what do they do, and does my
offer plausibly matter to them?* If you can't answer, delete the prospect
from your list. The best personalization decision is not writing.

### 2. Find the trigger (3 min)
What changed or is changing? Job posts, launch/changelog, funding note,
event talk, a post by the founder. No trigger? That's fine — you'll use
their *content* or *situation* as the hook instead (step 3).

### 3. Find the human detail (3 min)
Their LinkedIn profile or company bio: a talk they gave, an article, a
podcast, a career change, something specific they built. You need one
*true, specific* observation — the kind a template cannot produce.

### 4. Connect trigger/detail → their problem (3 min)
One sentence, in your head or notes: "If [trigger/detail] is true, then
[problem my work solves] is probably their next bottleneck because
[reason]." If this sentence doesn't come easily, the fit is weak — mark
`Nurture` in the tracker and move on.

### 5. Draft the first line last (3 min)
Write emails 1:1, top line first:

> "Saw your [talk at X / job post for Y / move to Z] — [one clause showing
> you understood it]."

Then the problem bridge from step 4, then the ask (from your sequence
file). **Never** re-use a first line across two prospects; follow-up
emails are template-able, first lines are not.

### 6. Log the source (1 min)
In `tracker/tracker.csv`, fill `source` and `personalized_hook` with where
the observation came from. Two payoffs: no duplicate hooks when a
colleague of prospect A shows up as prospect B, and you can audit your own
quality when reply rates dip.

## Quality bar — the "said out loud" test

Read your first line aloud. If it could be sent to any company in the
industry, it's not done. If it would sound absurd sent to anyone else, it
passes:

- ❌ "I loved your website" (any company) →
- ✅ "Your migration post mentions the CRM sync broke twice — that's
  usually the webhook layer, not the CRM" (one specific company)

## Anti-patterns that cost replies (and reputation)

- **Wrong-context personalization** — congrats on a funding round they
  didn't raise. Always re-check the trigger date before sending.
- **Flattery with no content** — "love what you're building" signals
  template instantly. Follow praise with proof you engaged (a detail, a
  follow-up thought).
- **Stale signals** — a job post closed 8 months ago. Log the date you
  found the trigger (tracker column `source`) and refresh lists monthly.
- **Fake familiarity** — "great chatting with you" to a stranger. Kills
  trust on read one.
- **Over-automating steps 1–5.** Tools can *store* your research and
  remind you of triggers; they should not *write* the first line. If you
  use an AI assistant for drafts, it writes from your own research notes
  for one named prospect — and you fact-check every claim before sending.
  Nobody is fooled by generated genericness, and mailbox providers treat
  identical-pattern mail as bulk.
