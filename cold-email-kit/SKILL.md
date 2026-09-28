---
name: cold-email-kit
description: Runs a policy-safe cold-email deliverability and launch process for a sending domain. Checks SPF, DKIM, DMARC and MX with a no-credentials shell script (dig/nslookup), then walks the six-chapter launch SOP - 2024-2025 Google/Yahoo/Microsoft bulk-sender rules, secondary sending domain selection, copy-paste DNS authentication records, mailbox creation, volume ceilings and weekly monitoring with Google Postmaster Tools, and a 10-point pre-send checklist. Includes a 21-day manual-first warmup checklist (no warmup pools, no fake engagement), deliverability basics with official source links, three outreach sequences with reply-handling rules (4-email problem-first, 3-email referral-intro, 3-email trigger-event), a 15-minute personalization research SOP, and a CSV outreach tracker. Use this skill when the user sets up cold email, asks why emails land in spam, needs SPF/DKIM/DMARC checked or fixed, plans an outreach campaign or follow-up sequence, warms up new mailboxes, or wants a pre-send deliverability check.
---

# Cold Email Kit — deliverability check and policy-safe launch

Get a sending domain from "unauthenticated and untrusted" to "authenticated,
warmed, monitored, ready for small cold outreach" — in the order that avoids
the mistakes that are expensive to undo. Extracted from the full Cold Email
Kit (same SOP, checklists, sequences, tracker and DNS check script).

## When to use

The user mentions: cold email / outbound, "why do my emails go to spam",
SPF, DKIM, DMARC, MX or DNS records for a sending domain, domain warmup,
new mailboxes for outreach, sequence or follow-up planning, Google
Postmaster Tools, spam rate, bulk-sender rules (Google/Yahoo 2024,
Microsoft May 2025), a pre-send check before a campaign, or a prospect
tracker for outreach.

## How to use this skill

Work in this order — it matches how deliverability actually compounds:

1. **Check the domain now.** Run the DNS auth check:

   ```bash
   bash scripts/dns-check.sh <their-sending-domain> <dkim-selector>
   ```

   e.g. `bash scripts/dns-check.sh sends.yourbrand.com google` (Google
   Workspace default selector; `selector1` for Microsoft 365, `k1` for
   many ESPs). Requires `dig` or `nslookup`. It prints PASS/FAIL/WARN for
   SPF (including the multiple-records error), DKIM, DMARC (including the
   missing-`rua` blind spot) and MX, and exits 0 after printing. Read FAIL
   lines as the fix list — each cites the SETUP chapter with the
   copy-paste record.

2. **Fix authentication with `references/SETUP.md` Chapter 3.** Copy-paste
   SPF / DKIM / DMARC records for Google Workspace and Microsoft 365, the
   one-SPF-record rule, 2048-bit DKIM keys, DMARC starting at `p=none`
   with `rua=`. Re-run `scripts/dns-check.sh` after every DNS change and
   again at 24h (propagation).

3. **Explain or diagnose with `references/deliverability-basics.md`.** The
   four signals (SPF, DKIM, DMARC, spam rate < 0.3%) with official source
   links (Google sender guidelines, Yahoo best practices, Microsoft
   high-volume requirements, RFC 7489). Use it when the user asks *why*,
   or when interpreting DMARC aggregate reports.

4. **Domain and mailboxes: `references/SETUP.md` Chapters 1-2, 4.** Why a
   secondary sending domain (never the primary), 2-4 week aging, 2-3
   mailboxes, real profiles. Chapter 1 summarizes what changed in
   2024-2025 (SPF+DKIM required, DMARC `p=none` minimum at 5,000+/day,
   one-click unsubscribe, 0.3% spam ceiling, Microsoft `550 5.7.515`).

5. **Warmup: `references/warmup-checklist.md`.** The 21-day manual-first
   schedule — no cold sends before day 15, no warmup pools or automated
   engagement (they violate Google's program policies). Day-by-day
   checkboxes; weekly `dns-check.sh` re-runs are built in.

6. **Volume and monitoring: `references/SETUP.md` Chapter 5.** Start
   ≤15/inbox/day, spread across business hours, hard bounce = remove
   everywhere same day, weekly 15-minute Postmaster + seed-header +
   DMARC-report review. Stop and halve on placement drops — never push
   through.

7. **Pre-send gate: `references/SETUP.md` Chapter 6.** The 10-point
   checklist to run before every campaign (DNS green, sourced-this-month
   list, true first lines, no link shorteners, ≤1 link, plain text,
   unsubscribe line, volume spread, bounce plan, replies answered first).
   When the user says "check before I send", walk this list.

8. **Write the outreach: `references/sequences/`.** Three sequences with
   full email copy, timing and reply-handling rules:
   `sequence-1-problem-first.md` (4 emails, the workhorse),
   `sequence-2-referral-intro.md` (3 emails, mutual context),
   `sequence-3-trigger-event.md` (3 emails, funding/hire/launch triggers).
   First lines come from `references/sequences/personalization-SOP.md` —
   the 15-minute per-prospect research routine; tokens in [brackets] must
   be replaced with something true or the prospect is wrong.

9. **Track prospects: `references/tracker/tracker.csv`.** One row per
   prospect (source, personalized hook, status, step, next step). Statuses
   used by the sequences: sent / replied / meeting / nurture / opted-out.
   Replace the EXAMPLE rows. "Remove me" = remove same day, never email
   again.

## Ground rules (state these if the user pushes against them)

- No warmup pools, no automated fake engagement — against Google's program
  policies and concentrated risk.
- No scraped or purchased lists — the #1 source of bounces and spam traps.
- No promise of perfect inbox placement — maximize what you control, measure
  the rest. `deliverability-basics.md` has the honest table of controlled vs
  earned signals.

## Guardrails

- Never invent DKIM selectors — ask the user for theirs, or list common
  defaults (`google`, `selector1`, `k1`) as candidates to try.
- The DNS script only reads public DNS; it never sends mail and needs no
  credentials. Changes to DNS records happen at the user's DNS provider —
  give exact copy-paste records, don't guess existing values.
- Japanese full translation of the SOP is at `references/SETUP.ja.md` —
  point JP users there instead of re-translating.
