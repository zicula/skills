# agency-sop-library (Agent Skill)

An [Agent Skill](https://agentskills.io) that gives your coding/AI agent a complete operating system for running a 1–10 person digital agency: **24 done-for-you SOPs** covering the full client lifecycle — Sales → Onboarding → Delivery → Retention → Offboarding — plus a 14-day install playbook.

## What this skill does

Once installed, the agent can pull the right SOP for almost any agency situation and hand you a usable asset (a filled scorecard, an email, an agenda, a table) — not a summary:

- **Sales:** lead qualification scorecard, discovery call script, proposal structure, pricing calculator logic, follow-up cadence
- **Onboarding:** welcome packet, kickoff agenda, access & asset checklist, comms rules, project plan & milestones
- **Delivery:** weekly status updates, revision & change policy, pre-delivery QA checklists, scope change estimates, escalation path
- **Retention:** monthly report skeleton, QBR agenda, upsell triggers & pitches, retainer health review, client feedback pulse
- **Offboarding:** handover checklist, testimonial request, alumni referral program, win-back sequence

Every SOP follows the same anatomy: *when to use → the process → copy-paste assets → rules & red flags → what good looks like → an AI prompt to adapt it to your agency*.

## Install

Copy this folder into your agent's skills directory:

```bash
# Claude Code / general agents (~/.agents/skills)
git clone https://github.com/zicula/skills.git
cp -R skills/agency-sop-library ~/.agents/skills/

# or for Claude Code's project/user skills dir
cp -R skills/agency-sop-library ~/.claude/skills/
```

That's it — the skill is self-contained. `SKILL.md` is the entry point; `references/` holds the 24 SOPs, the 14-day playbook, the lifecycle index, the manifest, a Notion-import CSV, and the license.

## Honest note: what's in the skill vs. the full kit

This skill is the **SOP/playbook layer extracted from the paid Agency SOP Library kit** — all 24 SOPs and the 14-day playbook are here in full, in Markdown. The **full kit** (sold at [agency-sop-library.zicula.trade](https://agency-sop-library.zicula.trade)) is broader: it ships the same library in more consumer-friendly form (Notion-ready import, Spanish & Brazilian-Portuguese quickstarts, buyer setup guides) and includes the single-agency commercial license in its buyer form. If you just want the operating system as agent-consumable files, this skill has you covered; if you want the complete buyer package and support the project, grab the kit.

## Files

```
agency-sop-library/
├── SKILL.md            # skill entry point (spec: agentskills.io)
├── README.md           # this file
└── references/
    ├── INDEX.md        # lifecycle map + install routes
    ├── PLAYBOOK-14D.md # 14-day install plan
    ├── MANIFEST.md     # file-by-file table
    ├── notion-import.csv
    ├── LICENSE.txt
    └── sop/            # 24 SOPs, 01–24
```

## License

Single-agency commercial license (see `references/LICENSE.txt`). Not for redistribution or resale.
