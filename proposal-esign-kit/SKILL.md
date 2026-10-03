---
name: proposal-esign-kit
description: Creates business proposals clients accept in one click on the seller's own domain, with a tamper-evident acceptance record and no per-document fees. Ships three production-ready HTML proposal templates (coaching, retainer, fixed-scope project), a zero-dependency Node 18+ generator that hashes the document with SHA-256 and signs the accept link with HMAC-SHA256 under a secret only the seller holds, and a static accept page where the client types a name and ticks consent to produce a hash-chained audit-trail JSON (typed name, timestamps, device context, document digest) one command re-verifies years later. Also covers getting proposals signed and funded - a 4-touch follow-up SOP, a deposits guide for Stripe payment links, branding and currency customization, and a pricing memo on escaping per-seat e-sign platforms. Use when drafting or following up on proposals, quotes or engagement letters, self-hosting an e-signature flow, verifying a signed acceptance record, or positioning against DocuSign or PandaDoc.
---

# Proposal Esign Kit

Send proposals clients can accept in one click — on the seller's own site, under their
own brand — with a hash-chained audit trail as the record. No subscriptions, no
per-document fees, no third-party portal between seller and client. Extracted from the
full Proposal Esign Kit (same templates, same tools, same SOPs).

## When to use

The user mentions any of: drafting or sending a proposal, quote or engagement letter;
letting a client accept/sign online without DocuSign, PandaDoc or Proposify; hosting an
accept page on their own domain; verifying a signed acceptance record; attaching a
deposit payment to the acceptance flow; following up on an unanswered proposal; pricing
or positioning against per-seat e-sign SaaS.

## How to use this skill

1. **Start from the map.** Read `references/START-HERE.md` — the process at a glance,
   the 10-minute first-proposal path, and the file map.
2. **Generate a proposal page.** Pick a template from `references/templates/`
   (coaching package · consulting retainer · fixed-scope project), then run
   `references/tools/new-proposal.mjs` with a long random `PEK_SECRET`
   (16+ chars, kept in a password manager — whoever holds it can mint valid links).
   The tool writes a self-contained accept page (`index.html`), the tokenized link
   (`link.txt`), and the signed `payload.json`.
3. **Deploy and send.** The generated folder is static — host it anywhere (Cloudflare
   Pages, Netlify, a subfolder). Send the URL **with its `?t=` token** from
   `link.txt`. The client needs only a browser; nothing is transmitted anywhere —
   their browser builds the audit-trail JSON locally (download + email back).
4. **Verify the evidence.** When the audit-trail JSON comes back, run
   `references/tools/verify-audit.mjs --proposal <dir> --audit <json>` — it re-checks
   the HMAC link token, the document digest binding, the SHA-256 event chain, consent
   and typed-name requirements, and ISO timestamps. `RESULT: VERIFIED` → file it.
5. **Close while momentum is hot.** Follow `references/FOLLOW-UP-SOP.md` for the
   4-touch sequence (send → value add → deadline → break-up, with objection scripts)
   and `references/DEPOSITS.md` to put a Stripe payment link in the same thread so
   acceptance and the deposit land in one sitting.
6. **Customize once, reuse forever.** `references/CUSTOMIZE.md` covers branding the
   templates and the accept-page chrome, currency/validity flags, deposit terms, and
   what must NOT be changed (the signing math, the `pek-data` block, the chain format).

## What the audit trail is — and is not

It is a tamper-evident record of intent — what was offered (document digest), who
accepted (typed name + device context), when, with explicit consent. It is **not** a
legal certification or qualified e-signature; rules differ by country and document
type. Keep the honest-disclaimer fineprint when customizing templates.

## Files

- `references/START-HERE.md` — process map, 10-minute path, file map (written for this skill)
- `references/templates/` — 3 proposal templates (editable HTML, print to PDF)
- `references/sign/accept-template.html` — the accept-page runtime (brand via CSS variables)
- `references/tools/new-proposal.mjs` — generate a hash-signed proposal page (Node 18+, zero deps)
- `references/tools/verify-audit.mjs` — verify an audit trail against a proposal (8 checks)
- `references/FOLLOW-UP-SOP.md` — the 4-touch sequence that gets proposals signed
- `references/DEPOSITS.md` — acceptance + deposit in the same sitting (Stripe Payment Links)
- `references/CUSTOMIZE.md` — branding, fields, currency, wording, do-not-touch list
- `references/pitch-and-pricing.md` — positioning and pricing the work that flows through it
- `references/LICENSE.txt` — MIT for this free skill edition

See `README.md` for install instructions and the honest difference vs. the full kit.
