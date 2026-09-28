# Deliverability basics — the four signals that decide where your mail lands

A short, honest explainer of what mailbox providers actually check, so the
records in `SETUP.md` Chapter 3 are not just incantations. Every claim here
links to an official source at the bottom.

## 1. SPF — "who is allowed to send for this domain?"

SPF is a TXT record at your domain listing the servers allowed to send its
mail. When your email arrives, the receiving server checks the *envelope
from* domain's SPF record against the IP that connected.

- **Pass** = the sending IP is listed. **Fail/Softfail** = it isn't.
- One domain = exactly **one** SPF record. Two records on the same name is
  an error some receivers treat as "no SPF at all".
- Every sending service you use must appear as an `include:` in that single
  record. Forgot one? That service's mail fails.
- Keep under the 10-DNS-lookup limit (each `include:` counts). If you stack
  many services, flatten or prune.

## 2. DKIM — "this mail wasn't altered in transit"

DKIM signs the message with a private key; the public key sits in DNS at
`<selector>._domainkey.yourdomain.com`. Receivers verify the signature.

- The **selector** is just a label (`google`, `selector1`, `k1`…). Your mail
  admin console tells you which selector and record to publish.
- 2048-bit keys are the modern default; Google requires at least 1024-bit
  for bulk senders.
- Signing must cover headers that matter (`from`, `subject`) — providers'
  defaults already do; don't hand-tune unless you know why.
- A DKIM pass survives forwarding far better than SPF — that's why both
  are required.

## 3. DMARC — "what should happen when SPF/DKIM disagree with the From:?"

DMARC ties it together: it checks that SPF or DKIM **passes and aligns**
with the visible `From:` domain, then applies your policy and emails you
aggregate reports.

- `p=none` = monitor only (the required minimum for bulk senders).
  `p=quarantine` / `p=reject` = enforce, after you've proven your own mail
  passes.
- **Aggregate reports (`rua`)** are XML files, one per receiving provider
  per day-ish. Each row says: source IP, volume, SPF/DKIM pass/fail,
  aligned yes/no. Reading them weekly catches hijacked sending and
  forgotten services (the marketing tool someone set up in 2023).
- Start at `p=none` with `rua=` on day one, like SETUP.md says. Enforce
  later, gradually (`pct=10` first).

## 4. Spam rate — the 0.3% line

Google and Yahoo both say it explicitly: keep user spam complaints below
**0.3%** of messages (0.1% is better). At 1:1 cold volume this is mostly a
list-quality metric — one careless batch of irrelevant emails can blow
through it. Postmaster Tools shows your rate; the full rules apply to bulk
senders, but the behavior that keeps the rate low (relevant, wanted,
small) works at any scale.

## The signals you control vs. the ones you earn

| You control directly | You earn over weeks |
|---|---|
| SPF/DKIM/DMARC setup + passing | Domain reputation |
| Volume per inbox per day | History of replies (not deletes) |
| List quality (how you sourced it) | Low bounces + low complaint rate |
| Content: plain, honest, one CTA | Consistent human sending patterns |

No tool and no kit can promise placement — filters are adaptive and
per-recipient. What this kit does is maximize the left column and give you
the measurement loop for the right one.

## Official sources (read these — they are short)

- Google sender guidelines (incl. 0.3% spam rate, 5,000/day tier):
  <https://support.google.com/mail/answer/81126>
- Yahoo sender best practices (incl. 2-day unsubscribe honor):
  <https://senders.yahooinc.com/best-practices/>
- Microsoft Outlook high-volume sender requirements (May 5 2025, `550
  5.7.515`):
  <https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-email-ecosystem-outlook%E2%80%99s-new-requirements-for-high%E2%80%90volume-senders/4399730>
- Google Email Log Search / Postmaster Tools: <https://www.postmaster.google.com>
- DMARC specification (RFC 7489) for the report format:
  <https://datatracker.ietf.org/doc/html/rfc7489>
