# cold-email-kit (Agent Skill)

An [Agent Skill](https://agentskills.io) that gives your coding/AI agent a policy-safe cold-email deliverability and launch process: it checks a sending domain's SPF, DKIM, DMARC and MX records with a working shell script (`scripts/dns-check.sh`, needs only `dig` or `nslookup`, no credentials), then walks the six-chapter launch SOP — the 2024–2025 Google/Yahoo/Microsoft bulk-sender rules, secondary sending domain selection, copy-paste DNS authentication records, mailbox creation, volume ceilings and weekly monitoring with Google Postmaster Tools, and a 10-point pre-send checklist — plus a 21-day manual-first warmup schedule, deliverability basics with official source links, three outreach sequences with reply-handling rules, a 15-minute personalization research SOP, and a CSV outreach tracker.

## What this skill does

- **Deliverability check in 30 seconds:** `bash scripts/dns-check.sh yourdomain.com google` prints PASS/FAIL/WARN for SPF (catches the multiple-records error), DKIM (give it your selector: `google`, `selector1`, `k1`…), DMARC (flags the missing-`rua` blind spot) and MX — each FAIL cites the SETUP chapter with the copy-paste record. Run it after every DNS change and before every campaign.
- **Fix records right:** Chapter 3 of `references/SETUP.md` has the exact SPF/DKIM/DMARC records for Google Workspace and Microsoft 365 — the one-SPF-record rule, 2048-bit DKIM keys, DMARC starting at `p=none` with `rua=` reporting.
- **Warm up without getting burned:** `references/warmup-checklist.md` is the 21-day, manual-first, policy-safe schedule — deliberately **no** warmup pools, no automated fake engagement (both violate Google's program policies and concentrate risk).
- **Know why, not just what:** `references/deliverability-basics.md` explains the four inbox signals with links to the official Google, Yahoo, Microsoft and RFC 7489 sources.
- **Send small and measured:** volume ceilings (start ≤15/inbox/day), cadence, hard-bounce handling, and the weekly 15-minute Postmaster + seed-header + DMARC-report monitoring loop.
- **Write the outreach:** three full sequences (4-email problem-first, 3-email referral-intro, 3-email trigger-event) with reply-handling rules, powered by the 15-minute personalization research SOP, tracked in `references/tracker/tracker.csv`.

This skill maximizes what you control and gives you the measurement loop. No tool and no kit can promise perfect inbox placement — filters are adaptive and per-recipient.

## Install

Install with the [skills CLI](https://skills.sh) (works with Claude Code, Codex, Cursor, Gemini CLI and other skill-compatible agents):

```bash
npx skills add zicula/skills/cold-email-kit
```

…or copy the folder into your agent's skills directory:

```bash
git clone https://github.com/zicula/skills.git
cp -R skills/cold-email-kit ~/.agents/skills/

# or for Claude Code's project/user skills dir
cp -R skills/cold-email-kit ~/.claude/skills/
```

That's it — the skill is self-contained. `SKILL.md` is the entry point; `scripts/dns-check.sh` is the runnable deliverability check (macOS/Linux, `dig` or `nslookup`); `references/` holds the launch SOP (English + full Japanese translation), warmup checklist, deliverability explainer, sequences, personalization SOP and tracker from the kit.

## Honest note: what's in the skill vs. the full kit

This skill is the **process layer extracted from the paid Cold Email Kit** — every process file is here in full, in Markdown: the 6-chapter launch SOP, the deliverability basics explainer, the 21-day warmup checklist, the three sequences, the personalization SOP, the CSV tracker, and the DNS check script is included in full and actually runs. The **full kit** (sold at [cold-email-kit.zicula.trade](https://cold-email-kit.zicula.trade), $49) is the same content in buyer-ready form: the zip packaged for buyers with the README/MANIFEST walkthrough order, the single-buyer commercial license in its buyer form, and free v1.x updates via the purchase download page, and support. If you want the process as agent-consumable files, this skill has you covered; if you want the complete buyer package and want to support the project, grab the kit.

## Files

```
cold-email-kit/
├── SKILL.md                                  # skill entry point (spec: agentskills.io)
├── README.md                                 # this file
├── LICENSE.txt                               # MIT — free to use, modify and share
├── scripts/
│   └── dns-check.sh                          # SPF/DKIM/DMARC/MX check for a domain (dig/nslookup, no creds)
└── references/
    ├── SETUP.md                              # the 6-chapter launch SOP (rules → domain → auth records → inboxes/warmup → volume/monitoring → pre-send checklist)
    ├── SETUP.ja.md                           # full Japanese translation of the SOP
    ├── deliverability-basics.md              # SPF/DKIM/DMARC/spam-rate explained, official sources linked
    ├── warmup-checklist.md                   # 21-day manual-first warmup (policy-safe, no warmup pools)
    ├── sequences/
    │   ├── sequence-1-problem-first.md       # 4-email workhorse sequence
    │   ├── sequence-2-referral-intro.md      # 3-email sequence on real mutual context
    │   ├── sequence-3-trigger-event.md       # 3-email sequence on funding/hire/launch triggers
    │   └── personalization-SOP.md            # the 15-minute research routine behind every first line
    └── tracker/
        └── tracker.csv                       # one row per prospect (EXAMPLE rows to replace)
```

## License

MIT — this free skill edition may be used, modified and shared freely (see `LICENSE.txt`). The paid kit sold at [cold-email-kit.zicula.trade](https://cold-email-kit.zicula.trade) is a separate product under its own single-buyer commercial license.
