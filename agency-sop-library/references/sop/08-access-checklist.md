# SOP-08 · Access & Asset Collection Checklist

| | |
|---|---|
| **Stage** | Onboarding |
| **Owner** | Project lead (chasing), client contact (delivering) |
| **Trigger** | Welcome packet sent (SOP-06); items due 3 days before kickoff |
| **Time** | 15 minutes to send + the discipline to chase |
| **Output** | Every account, file, and credential you need — verified working, before production starts |

## When to use

On every project. Late access is the #1 hidden project-delay cause for small agencies, and it's 100% a chasing game. This SOP makes the chase mechanical instead of personal.

## The checklist (send as a table, tick per project type)

| Item | Why we need it | How to send it |
|---|---|---|
| Domain registrar login | DNS/launch control | Password-manager share (1Password/Bitwarden link) — never email |
| Hosting / server access | Deploy, staging | Password-manager share |
| CMS admin account | Build & content | Invite to your work email with editor/admin role |
| Analytics (GA4 or similar) | Measure the metric you promised (SOP-07) | Admin invite + confirm goal/events exist |
| Ad accounts (if applicable) | Campaigns + history | Admin invite — do **not** accept "just use ours on your laptop" |
| Brand assets: logo vector, fonts + font licenses | So outputs are legal and sharp | Shared drive folder |
| Brand guidelines / past campaign results | Consistency + what worked before | Shared drive folder |
| Content: copy, photos, product data | Everything blocks on content | Shared drive, named files (`homepage-hero.jpg` not `IMG_4021.jpg`) |
| Social accounts (if in scope) | Publishing | Admin invite via platform's official flow |
| Third-party tools in the stack | Integrations | Admin invite or API key via password manager |
| Named contact for each + a deadline date | So chasing has a face | Filled in the table itself |

**Two columns the client fills:** *Owner (name)* and *Date*. An ask without a name and a date is a wish.

## Copy-paste request email

> Subject: Access checklist — [N] items, due [DATE], so we start warm
>
> Hi [NAME] — attached is the access list for the project. Each row has an owner column; please put a name (yours is fine for most) and a date.
>
> Two ground rules that keep everything safe:
> 1. **Credentials** go through a password-manager share only — [LINK TO YOUR SHARE REQUEST]. Never email or chat. If you don't use a password manager, we'll send you a temp share link — 2-minute setup.
> 2. **Invites** go to [WORK EMAIL]. If a platform says "request sent", I'll confirm receipt within a day — silence from me means check spam.
>
> We test every login the day we get it and confirm in the weekly update. Missing items don't block the whole project, but they block the parts that need them — so the earlier, the cheaper.

## The chasing loop (the actual SOP)

- **Verify within 24h** of receiving each item: log in, screenshot, confirm in the weekly update. "Received" ≠ "works".
- **Nudge 1** (on due date): one-line reply in the thread + the missing rows re-pasted. No judgment, just the list.
- **Nudge 2** (+3 business days): email the named owner, cc your client contact, with the *consequence stated*: "Without [ITEM], [PHASE] starts [DATE+X] later."
- **+3 more days:** escalate per SOP-15 — impact summary, timeline shifted in writing, never silently absorbed. **A delay you don't put on the record is a delay you own.**

## Rules & red flags

- The **80% rule**: production starts when 80% of *critical-path* items are in. Don't hold the whole project for one laggard — resequence around it, in writing.
- Never work inside a client's personal account as "them" (their Facebook profile, their Google login). If an official invite flow doesn't exist, that platform gets a documented workaround — or a written risk acceptance from the client.
- Store everything in your password manager from day one. The client-fired-us-then-demanded-access scenario (SOP-21) is rare but career-scarring; be the agency whose access hygiene is boring.
- Offboarding a platform (client keeps it): transfer *ownership*, not just sharing (SOP-21).

## What good looks like

- Median days from contract to full access: under 7.
- Every login verified within 24h with a confirmation to the client — clients start believing your operations are as marketed.
- Escalations are rare and never a surprise, because the consequence was attached to nudge 2 in writing.

## Adapt it with AI

> "Generate my access checklist table for a [SERVICE] project on [STACK — e.g., WordPress + GA4 + Meta Ads]: rows = item, why we need it, how to send it, owner, date. Add any platform-specific items I'd forget for this stack, and flag which items are usually critical-path."
