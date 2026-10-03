# proposal-esign-kit (Agent Skill)

An [Agent Skill](https://agentskills.io) that gives your coding/AI agent the complete self-hosted proposal-acceptance loop: three production-ready HTML proposal templates, a zero-dependency generator that turns one into a hash-signed accept page on your own domain (SHA-256 document digest + HMAC-SHA256 link token under your own secret), an in-browser audit trail your client produces with one click (typed name + consent + device context, hash-chained), an 8-check verifier command, plus the operational layer that actually gets proposals signed and funded — a 4-touch follow-up SOP, a deposits guide, customization docs and a pricing memo.

## What this skill does

Once installed, the agent can run the whole loop with you and hand you usable assets — a generated accept page, a verified evidence record, a follow-up email — not a summary:

- **Propose:** three editable HTML templates (90-day coaching package · monthly consulting retainer · fixed-scope project) that read well on phones and print cleanly to PDF
- **Sign:** `new-proposal.mjs` hashes the rendered document and signs the accept link with your `PEK_SECRET`; the generated page is a single static file you host anywhere — your brand, your domain, no portal, no per-document meter
- **Prove:** the client types a name and ticks consent; their browser builds a SHA-256 hash-chained audit-trail JSON (consent event → acceptance event, bound to the document digest) and hands it back as a file. `verify-audit.mjs` re-checks the whole chain any time — including years later
- **Close:** the 4-touch follow-up SOP (send → value add → deadline → break-up, with objection scripts and graceful exits), the Stripe Payment Link deposits path so acceptance and deposit land in the same thread, and a pricing memo on escaping per-seat e-sign platforms

## Install

Install with the [skills CLI](https://skills.sh) (works with Claude Code, Codex, Cursor, Gemini CLI and other skill-compatible agents):

```bash
npx skills add zicula/skills/proposal-esign-kit
```

…or copy the folder into your agent's skills directory:

```bash
git clone https://github.com/zicula/skills.git
cp -R skills/proposal-esign-kit ~/.agents/skills/

# or for Claude Code's project/user skills dir
cp -R skills/proposal-esign-kit ~/.claude/skills/
```

That's it — the skill is self-contained. `SKILL.md` is the entry point; `references/` holds the kit runtime: START-HERE, the 3 templates, the accept-page runtime, both tools, the follow-up SOP, deposits guide, customization docs, pricing memo and the license.

## Honest note: what's in the skill vs. the full kit

This skill is the **process layer extracted from the paid Proposal Esign Kit — its $49 Basic tier**, which the sales page describes as "the complete proposal kit": the 3 templates, the hash-signed accept pages, the audit trail + verifier, and the follow-up SOP + deposits guide are here in full, uncut. One doc comment in `coaching-package.html` was reworded (a literal `{{placeholders}}` in a comment tripped the generator's unknown-placeholder guard); no document content changed — see the note at the end of `references/START-HERE.md`.

The **paid tiers** (sold at [proposal-esign-kit.zicula.trade](https://proposal-esign-kit.zicula.trade) — 30-day full refund, instant download) are bundle offers that add *other kits*, not more proposal machinery:

- **Basic — $49:** exactly the kit this skill extracts (3 templates · accept pages · audit trail · follow-up SOP · deposits guide), packaged as a buyer zip with a step-by-step setup runbook, MANIFEST and the single-owner commercial license
- **Pro — $99:** everything in Basic, bundled with the Client Onboarding Kit ($42) and Meeting Notes Kit ($49) in one zip, one license
- **Premium — $199:** everything in Pro, plus the Case Study Kit ($42), Testimonial Wall Kit ($28) and Agency SOP Library ($79)

If you want the operating process as agent-consumable files, this skill has you covered; if you want the buyer-packaged zip, extra kits or support the project, grab the kit.

## Files

```
proposal-esign-kit/
├── SKILL.md                       # skill entry point (spec: agentskills.io)
├── README.md                      # this file
└── references/
    ├── START-HERE.md              # the loop at a glance, 10-minute path, file map
    ├── LICENSE.txt                # MIT — free to use, modify and share
    ├── CUSTOMIZE.md               # branding, fields, currency, wording, do-not-touch list
    ├── DEPOSITS.md                # acceptance + deposit in the same sitting (Stripe)
    ├── FOLLOW-UP-SOP.md           # the 4-touch sequence, objection scripts
    ├── pitch-and-pricing.md       # positioning vs per-seat e-sign, what to charge
    ├── templates/                 # coaching-package · consulting-retainer · project-proposal
    ├── sign/accept-template.html  # the accept-page runtime (CSS variables = your brand)
    └── tools/                     # new-proposal.mjs (generate) · verify-audit.mjs (verify)
```

## License

MIT — this free skill edition may be used, modified and shared freely (see `references/LICENSE.txt`). The paid kit sold at [proposal-esign-kit.zicula.trade](https://proposal-esign-kit.zicula.trade) is a separate product under its own single-owner commercial license.
