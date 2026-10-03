# START-HERE — the whole loop in one page

Generate a hash-signed proposal page → deploy it anywhere static → the client accepts
in one click → a hash-chained audit trail comes back → one command verifies it → the
deposit link closes the deal in the same thread.

## The 10-minute path (first proposal)

```bash
# 0. one-time — mint a signing secret (16+ chars) and keep it in a password manager
openssl rand -hex 24

# 1. generate (from this skill's folder; PEK_SECRET = the secret above)
PEK_SECRET="…" node references/tools/new-proposal.mjs \
  --template references/templates/coaching-package.html \
  --out proposals/acme-2026-042 --id acme-2026-042 \
  --title "90-Day Coaching Package" --client "Acme Corp" \
  --sender "Rivera Coaching" --sender-email you@riveracoaching.com \
  --amount "4,500" --currency USD

# 2. deploy the proposals/acme-2026-042 folder to any static host
#    (Cloudflare Pages, Netlify, a subfolder of your site — all fine)

# 3. send the client the URL WITH its ?t= token (printed above, saved in link.txt)

# 4. when the client accepts, they download the audit-trail JSON the page built and
#    email it back — verify it any time, including years later:
PEK_SECRET="…" node references/tools/verify-audit.mjs \
  --proposal proposals/acme-2026-042 \
  --audit ~/Downloads/audit-trail-acme-2026-042.json
```

`RESULT: VERIFIED` — file it. That is the whole loop.

## What each piece is

- **Templates** (`references/templates/`) — three production-ready HTML proposals:
  a 90-day coaching package, a monthly consulting retainer, a fixed-scope project.
  Plain HTML, print cleanly to PDF, `{{placeholder}}` tokens filled by the generator.
- **The generator** (`references/tools/new-proposal.mjs`) — renders the template,
  hashes the document body (SHA-256), signs the payload with HMAC-SHA256 under your
  `PEK_SECRET` (the secret never appears in the page), writes the accept page, the
  tokenized link and `payload.json`. Zero dependencies, Node 18+.
- **The accept page** (`references/sign/accept-template.html` + generated `index.html`)
  — a single static file. The client types their name, ticks consent, and their own
  browser builds an **audit-trail JSON**: a SHA-256 hash chain over a consent event and
  an acceptance event, bound to the document digest, with the typed name, timestamps,
  user agent, language and timezone. Nothing is transmitted anywhere — no server, no
  cookies, no analytics, no IP logs. Privacy by design.
- **The verifier** (`references/tools/verify-audit.mjs`) — 8 deterministic checks:
  link token is a valid HMAC under *your* secret, the trail binds the same document
  digest, the event chain is intact, consent + typed full name exist, device context
  captured, timestamps ISO. Exit 0 only if all pass.
- **The operational layer** — `FOLLOW-UP-SOP.md` (the 4 touches that get proposals
  signed, ~8 minutes of writing per deal), `DEPOSITS.md` (Stripe Payment Link path so
  acceptance and deposit land together), `CUSTOMIZE.md` (branding, currency, validity,
  what not to touch), `pitch-and-pricing.md` (positioning against per-seat e-sign).

## What the audit trail is — and is not

**It is:** a clear, tamper-evident record of *intent* — what was offered (document
digest), who accepted (typed name + device context), and when, with consent recorded
explicitly. That is what serious clients and most dispute processes ask you to produce.

**It is not:** a legal certification, a qualified electronic signature, or legal
advice. E-signature rules differ by country (ESIGN/UETA in the US, eIDAS in the EU)
and by document type — wills, court filings and certain notarial acts are commonly
excluded everywhere. For high-stakes contracts have counsel review your process; for
everything else, the audit trail plus the printed PDF is the practical record.

## Rules that keep you safe

- **Whoever holds `PEK_SECRET` can mint valid proposal links.** Never commit it, never
  put it in pages (the generator never does).
- **After generating, the output is read-only.** Terms changed? Re-generate — same
  terms, same link, same token keeps records clean.
- **Keep the fineprint.** Each template ends with an honesty block explaining what the
  electronic acceptance records and offering wet-ink as the equal alternative. Keep it.
- Do not edit the signing math, the `pek-data` block, or the chain event shape — the
  generator/verifier pair must stay in lockstep (`CUSTOMIZE.md` §7).

## Requirements

- Node 18+ on the seller's machine (generation + verification only).
- Any static host for generated pages. Free tiers are fine; nothing phones home.

## File map

```
references/
├── START-HERE.md            # this page
├── LICENSE.txt              # MIT — free skill edition
├── CUSTOMIZE.md             # branding, fields, currency, wording, do-not-touch list
├── DEPOSITS.md              # acceptance + deposit in the same sitting (Stripe)
├── FOLLOW-UP-SOP.md         # the 4-touch sequence, objection scripts, after-the-yes
├── pitch-and-pricing.md     # market positioning + what to charge
├── templates/               # coaching-package · consulting-retainer · project-proposal
├── sign/accept-template.html# the accept-page runtime (CSS variables = your brand)
└── tools/                   # new-proposal.mjs (generate) · verify-audit.mjs (verify)
```

> Note for this skill edition: in `templates/coaching-package.html` one doc comment
> previously contained a literal `{{placeholders}}` token that tripped the generator's
> unknown-placeholder guard; the comment was reworded so the template generates
> cleanly. No document content changed. If you hit the same error message from an
> older copy, reword that comment line the same way.
