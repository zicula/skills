# Zicula Agent Skills

Free, self-contained [Agent Skills](https://agentskills.io) extracted from Zicula's operating-system kits for agencies, nonprofits and freelancers. Every skill is the real process layer — SOPs, templates, working scripts — installable into Claude Code, Codex, Cursor, Gemini CLI or any skill-compatible agent.

## Install all five

```bash
npx skills add zicula/skills
```

## The skills

| Skill | What it runs | Install |
|---|---|---|
| [agency-sop-library](agency-sop-library/) | The full client lifecycle of a 1–10 person agency: sales → onboarding → delivery → retention → offboarding, with all 24 SOPs free | `npx skills add zicula/skills/agency-sop-library` |
| [rfp-response-kit](rfp-response-kit/) | The complete bid-room process for RFPs/RFQs/RFIs: go/no-go scorecard, requirements shredding, outlines, 102-answer library, red team | `npx skills add zicula/skills/rfp-response-kit` |
| [grant-writing-kit](grant-writing-kit/) | The full annual grants cycle for nonprofits: pipeline tracker, 15-criterion go/no-go, funder research, LOI ×10, proposal skeletons, budget | `npx skills add zicula/skills/grant-writing-kit` |
| [content-decay-kit](content-decay-kit/) | Detect decaying pages from Google Search Console data, diagnose the drop, render white-label weekly client digests (working zero-dep Node script) | `npx skills add zicula/skills/content-decay-kit` |
| [cold-email-kit](cold-email-kit/) | Policy-safe cold-email deliverability: working SPF/DKIM/DMARC/MX checker, 2024–2025 bulk-sender rules, 21-day manual-first warmup, 3 sequences | `npx skills add zicula/skills/cold-email-kit` |

Each folder is a standard skill (`SKILL.md` + `references/` + `scripts/` where relevant) and validates against the [Agent Skills spec](https://agentskills.io). Browse them on [skills.sh](https://www.skills.sh/zicula/skills).

## Free skill vs. full kit — the honest difference

The skills are complete processes, not teasers: you can run them as-is and get the same decisions and assets an operator would. What the paid kits add is the buyer-ready form:

- everything packaged as a downloadable zip with step-by-step setup runbooks (EN, TH, JA, KO where marked)
- working spreadsheets with live formulas where the skill ships structure
- email support and lifetime v1.x updates
- a commercial, white-label client-facing license

| Full kit | Price |
|---|---|
| [Agency SOP Library](https://agency-sop-library.zicula.trade) | $79 |
| [RFP Response Kit](https://rfp-response-kit.zicula.trade) | $99 |
| [Grant Writing Kit](https://grant-writing-kit.zicula.trade) | $79 |
| [Content Decay Kit](https://content-decay-kit.zicula.trade) | $56 |
| [Cold Email Kit](https://cold-email-kit.zicula.trade) | $49 |

14-day money-back on every kit. If the free skill already covers you, use it with our blessing — that's what it's for.

## License

Every skill here is MIT-licensed (see the `LICENSE.txt` in each folder): free to use, modify and share. The paid kits sold on zicula.trade are separate products distributed under their own single-buyer commercial licenses.
