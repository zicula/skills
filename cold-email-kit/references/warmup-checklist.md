# Warmup checklist — 21 days, manual-first, policy-safe

**The principle:** a brand-new mailbox that starts sending cold email on
day one looks exactly like a spam operation, because that's what spam
operations do. You are building a **history of ordinary human use** first.

**What is deliberately NOT in this checklist:** warmup pools, automated
"engagement" tools, fake peer-to-peer reply networks. They violate Google's
program policies (automated unwanted mail) and concentrate risk: when a
warmup network is detected, every domain in it wears the damage. Your
warmup is a handful of real humans exchanging real messages.

Rules for all 21 days:

- [ ] Sending and replying happen at natural times (working hours, spread
      out — never 20 actions in 5 minutes)
- [ ] Every mailbox has: real name, photo, signature, calendar link if you
      use one
- [ ] No cold outreach before **day 15** (and then only tiny volume)
- [ ] Nothing automated: no auto-forwarders chained between mailboxes, no
      macros, no "warmup" browser extensions
- [ ] Keep a one-line daily log (date / sent / received / notes) so the
      routine actually happens

## Days 1–7 — exist like a person (no sending volumes at all)

- [ ] Day 1: create the mailboxes on the secondary domain (2–3). Complete
      profiles 100%: name, photo, signature with real contact line.
- [ ] Day 1: add each mailbox to your phone as a real account (native Mail
      or Gmail app). Human mailboxes are used from phones.
- [ ] Day 1–2: exchange first 1:1 emails between your mailboxes and with
      2–3 colleagues/friends who agree to help (tell them plainly: "reply
      to a couple of emails over the next weeks, that's all").
- [ ] Day 2–3: subscribe to 3–5 industry newsletters you actually read.
      Open them when they arrive.
- [ ] Day 3–4: use the mailbox for real life: register for one webinar,
      email one SaaS support with a real question, order something with
      this address once.
- [ ] Day 5–7: keep 2–4 genuine threads alive per mailbox per day. Replies
      matter more than sends — ask your helpers real questions worth
      answering.
- [ ] End of week: run `tools/dns-check.sh` — still all green? Log it.

## Days 8–14 — deepen the pattern (still no cold sends)

- [ ] Continue daily 1:1 threads; now include short replies to newsletters'
      "just reply" prompts (some real newsletters genuinely read answers).
- [ ] One longer, thoughtful email per mailbox this week to a peer in your
      industry (not a pitch — an actual human note). Replies are gold.
- [ ] Join 1–2 communities you'll later source prospects from; use this
      mailbox for the confirmation emails.
- [ ] Set up **Google Postmaster Tools** with the sending domain (if not
      done in SETUP.md Ch. 5) so reputation data accrues before you need it.
- [ ] Send yourself test mails to Gmail/Outlook inboxes you own; check
      "show original": SPF/DKIM/DMARC = PASS on all three. If not, fix
      Chapter 3 before anything else.
- [ ] End of week: log volumes — a natural mailbox shows 3–8 real
      interactions/day, inbound included.

## Days 15–21 — introduce tiny real sending

- [ ] Day 15: send the **first** cold email from ONE mailbox. One. Use a
      fully personalized first touch from your chosen sequence — ideally to
      the warmest prospect on your list.
- [ ] Day 16–17: if day 15 produced no bounce and (ideally) a reply, send
      1–2/day. Any bounce → stop, verify the address sourcing, fix the
      tracker.
- [ ] Day 18–21: ramp the first mailbox to ~5/day max. Second mailbox starts
      its day-15 at most after its own 14 days of the pattern above (stagger
      mailboxes by a week if you can).
- [ ] Keep the human activity going — warmup never fully "ends"; it just
      becomes normal use alongside small sends.
- [ ] Watch where replies land: primary inbox = good; Promotions = normal
      for first-touch; Spam = stop and diagnose (usually content: link
      shorteners, attachments, or a dead domain record).
- [ ] End of day 21: review your log. Mailboxes are ready for the working
      volume from SETUP.md Chapter 5 (start at 10–15/day/inbox, increase
      only when replies and placement stay healthy).

## After warmup — the permanent habits

- Never let a mailbox go silent for weeks then blast (the worst pattern).
- Keep inbound hygiene: unsubscribe from noise you never read; a mailbox
  that only sends looks one-sided.
- Re-run `tools/dns-check.sh` weekly and before every campaign.
- If anything looks off (sudden placement drop, Postmaster spam-rate
  climb): halve volume immediately, re-read SETUP.md Chapter 5.3, resume
  only when signals recover.
