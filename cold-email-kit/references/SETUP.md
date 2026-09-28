# SETUP — the 6-chapter launch SOP

This is the core of the kit. It walks you from "I want to send cold email"
to "my first small campaign went out and I can measure what happens",
in the order that avoids the mistakes that are expensive to undo.

**Ground rules this SOP follows (and why):**

1. **No warmup pools / no automated fake engagement.** Google's program
   policies prohibit sending unwanted automated messages and artificial
   engagement; warmup networks are exactly that. The warmup here is manual
   and human.
2. **No scraped lead lists.** You build your list from public sources you
   actually read (company sites, job posts, LinkedIn profiles you visit,
   communities you're in) or from data your business already owns. Quality
   beats list size — one good reply is worth more than 1,000 "delivered".
3. **No promises of perfect deliverability.** Mailbox providers tune their
   filters constantly. This SOP maximizes the factors you control and gives
   you the measurement loop to catch problems early.

Official requirements referenced throughout (read them yourself — they are
short):

- Google: *Email sender guidelines* — <https://support.google.com/mail/answer/81126>
- Yahoo: *Sender best practices* — <https://senders.yahooinc.com/best-practices/>
- Microsoft: *Outlook's new requirements for high-volume senders* —
  <https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-email-ecosystem-outlook%E2%80%99s-new-requirements-for-high%E2%80%90volume-senders/4399730>

---

## Chapter 1 — What changed in 2024–2025 (and what it means for you)

Since **1 February 2024**, Google and Yahoo enforce, for anyone mailing
Gmail/Yahoo addresses — with extra obligations once you reach 5,000 messages
per day to one provider:

1. **SPF and DKIM** authentication must be set up and passing.
2. **DMARC** at minimum `p=none` (5,000+/day senders).
3. **One-click unsubscribe** (RFC 8058) for commercial/bulk mail, honored
   within 2 days (Yahoo).
4. **Spam complaints kept below 0.3%** in Postmaster Tools.

Since **5 May 2025**, Microsoft enforces SPF/DKIM/DMARC for Outlook
high-volume senders too, and states that non-compliant mail starts in Junk
and can be rejected with `550 5.7.515`.

**What this means for a cold emailer specifically:**

- Even at tiny volumes, authenticated mail (SPF+DKIM+DMARC) is now table
  stakes — unauthenticated mail from a fresh domain is a spam signal by
  default.
- The 0.3% spam-rate ceiling is why "blast and pray" is dead: 1 spam
  complaint per ~330 recipients puts you over the line. Small, targeted,
  relevant sends are the only sustainable shape.
- Operators in the cold-email community also report Google suspending
  Workspace accounts used for aggressive cold outreach (fresh domains,
  many inboxes, high day-one volume). This is community-reported, not an
  official Google statement — but it matches the direction of the official
  rules. The safe play is the same either way: warm domain, small volume,
  real human behavior.

**Your takeaway:** set up authentication before anything else (Chapter 3),
create inboxes on a domain that isn't your main one (Chapter 2), and keep
volume deliberately small (Chapter 5).

## Chapter 2 — Pick and register a secondary sending domain

**Never send cold email from your company's primary domain.** If it gets
flagged, your transactional mail and everyone's daily work suffer.

Checklist:

- [ ] Choose a domain related to but distinct from your brand
      (`get-yourbrand.com`, `yourbrand.co`, `try-yourbrand.com`). It should
      look believable in an inbox preview line.
- [ ] Register at any mainstream registrar (Cloudflare Registrar, Namecheap,
      Porkbun — roughly $10/year).
- [ ] Age it before sending: park it with a real one-page site for 2–4 weeks
      minimum. A domain that sends cold mail in week one is a classic spam
      pattern. Use the waiting time for Chapters 3–4 and sequence writing.
- [ ] Turn ON the registrar/DNS security defaults you'd use for a real site:
      DNSSEC if offered, sensible privacy. Nothing exotic.
- [ ] Create the website as a real page: who you are, one CTA, privacy
      contact. Receivers do check.

## Chapter 3 — SPF, DKIM and DMARC (copy-paste records)

Do these **at your DNS provider** (wherever the domain's nameservers point —
Cloudflare DNS is free and fast to propagate). You will add three record
types. Run `tools/dns-check.sh yourdomain.com yourselector` after each step.

### 3.1 SPF (TXT record at the apex, `@` / root)

```
Type: TXT   Name: @   Value: v=spf1 include:_spf.google.com ~all
```

- Using Google Workspace to send? The value above is correct.
- Sending through an ESP/newsletter tool as well? **You must merge
  mechanisms into ONE SPF record** — two SPF records on the same name is
  itself an error. Example adding Microsoft 365:
  `v=spf1 include:_spf.google.com include:spf.protection.outlook.com ~all`
- End with `~all` (softfail) while testing; move to `-all` once you're sure
  every legitimate path is included.

### 3.2 DKIM (CNAME or TXT records from your mail provider)

- **Google Workspace:** Admin console → Apps → Google Workspace → Gmail →
  *Authenticate email*. Generate a key for `yourdomain.com`, then publish
  the CNAME/TXT it shows you (host like `google._domainkey`).
- **Microsoft 365:** Defender portal → *Email authentication settings* →
  DKIM → enable for the domain, publish the two CNAME records it shows
  (`selector1._domainkey`, `selector2._domainkey`).
- Use **2048-bit** keys where the provider offers a choice (Google requires
  ≥1024-bit for bulk senders; longer is fine).
- After publishing, come back to the admin console and click **Start
  authentication / Enable** — records alone do nothing until toggled on.

### 3.3 DMARC (TXT record at `_dmarc`)

Start in monitoring-only mode:

```
Type: TXT   Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; fo=1;
```

- `p=none` = don't reject anything yet, just send you reports. This is the
  level the bulk-sender rules require, and the right starting point.
- Read the aggregate (`rua`) reports weekly — they tell you if any service
  is sending as your domain and failing alignment (see
  `deliverability-basics.md` for how to read one).
- Only later — after you see 100% of your own mail passing — consider
  tightening to `p=quarantine` with `pct=10` first, then higher.
- Make sure `dmarc@yourdomain.com` (or whatever mailbox you point `rua` at)
  actually exists, or route it to a free DMARC report parser.

### 3.4 Verify

```bash
bash tools/dns-check.sh yourdomain.com google
```

Expect `PASS` on SPF, DKIM, DMARC and MX. Propagation is usually minutes on
Cloudflare, up to a few hours elsewhere. If something shows WARN/FAIL after
24 hours, re-check the record values — typos in the `Name` field are the
most common cause (`_dmarc.` vs `dmarc.`, missing `_domainkey`).

## Chapter 4 — Create mailboxes and warm up (manual, policy-safe)

### 4.1 How many inboxes?

- Start with **2–3 mailboxes** on the secondary domain. Two is enough for
  30–50 personalized emails per week total — which is the right volume for
  a first month anyway.
- Scale mailboxes only when the work is genuinely limited by sending
  slots, not as a growth strategy. Every extra inbox is setup + warmup +
  monitoring overhead.
- Real names, real photos in the Workspace profile, real signatures. The
  mailbox must pass the "would a human reply to this person?" test.

### 4.2 The manual warmup principle

You are training filters on "this mailbox behaves like a person":

- Real 1:1 exchanges with people who know you (colleagues, clients, friends).
  Ask them to reply — replies are the strongest positive signal.
- Subscribe to a few industry newsletters, open them, occasionally click.
- Use the mailbox for its "day job": sign up for a webinar, email a vendor.
- **Never** join a warmup pool, never install "warmup automation" tools.
  They generate fake engagement between strangers' inboxes — automated
  mail that Google's policies prohibit — and they put your domain's
  reputation in the hands of every other user of that network.

The full day-by-day schedule is in `warmup-checklist.md` (21 days).

## Chapter 5 — Safe volume, cadence and monitoring

### 5.1 Volume

- Community consensus and operator reports put the practical safe ceiling
  around **15–25 emails per inbox per day** for cold outreach on a warmed,
  authenticated domain — and far less for the first weeks. Treat 15/day as
  your starting max, not your target.
- Cold email is not bulk email: you are not trying to reach 5,000+/day to
  any provider. Staying below bulk thresholds keeps you out of the
  strictest rule set entirely.
- Personalization takes time — that is the feature. A ceiling of ~40–60
  quality emails/day across 3 inboxes is a full-time outreach motion.

### 5.2 Cadence

- Spread sends across business hours; don't fire 25 emails at 09:00.
- Space follow-ups 3–4 business days apart (sequences in `sequences/`
  are built for this).
- Stop immediately on a hard bounce: remove the address from everything.
  Bounces are a quality signal receivers grade you on.

### 5.3 Monitoring (weekly, 15 minutes)

- **Google Postmaster Tools** (<https://www.postmaster.google.com>): add
  your domain now, even before sending — data accumulates from day one.
  Watch domain reputation and spam rate; keep spam rate under 0.3%.
- **Your own mailbox:** send to Gmail/Outlook accounts you control. Check
  the "show original" headers — look for `SPF: PASS`, `DKIM: PASS`,
  `DMARC: PASS`.
- **Seed + real replies:** replies landing in the primary inbox (not
  Promotions/Spam) is the practical signal that matters for cold outreach.
- **DMARC reports** (from Chapter 3 `rua`): confirm only *you* send as your
  domain, and all aligned.
- If spam rate climbs or replies start landing in Spam: **stop the
  campaign**, diagnose (usually: list quality or volume), fix, resume at
  half volume. Never "push through".

## Chapter 6 — Pre-send checklist (run before EVERY campaign)

Copy this into your tracker or pin it above your desk:

- [ ] DNS still passing? (`tools/dns-check.sh` — 30 seconds, every time)
- [ ] Every address on the list: individually sourced this month, and I can
      say *why this person* in one sentence
- [ ] First line of every email references something true about *them*
      (not a template token that could be wrong — those kill trust)
- [ ] No link shorteners in cold-step emails; at most 1 link, real URL
- [ ] Plain text or minimal HTML; no tracking pixels on first touch if you
      can help it
- [ ] From-name = the real person sending; reply-to goes to a monitored box
- [ ] Unsubscribe line present ("reply 'no thanks' and I won't follow up"
      counts for 1:1 mail and respects the reader)
- [ ] Volume: today's send ≤15/inbox, spread over hours
- [ ] Bounce plan ready: any hard bounce → remove everywhere + log in
      tracker
- [ ] Yesterday's replies answered first (replies outrank new sends)

---

**You are ready when:** DNS-check is all green for 7+ days, mailboxes are
21+ days warm (checklist complete), Postmaster shows no spam-rate data
warnings, and your list has 20+ personally-researched prospects. Then send
your first sequence — small, personal, measured.
