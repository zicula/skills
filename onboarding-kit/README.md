# onboarding-kit (Agent Skill)

An [Agent Skill](https://agentskills.io) that gives your coding/AI agent the complete first-30-days client operating system for freelancers and agencies: the 42-question intake questionnaire with a traffic-light red-flag rule, the 60-minute kickoff call agenda plus word-for-word script and 24-hour recap email, the scope-alignment worksheet with a change-request form (two worked examples), backwards milestone planning, the access-and-assets checklist that requests platform invites instead of raw passwords, the welcome packet and weekly communication rhythm, four read-aloud scope-creep scripts, the handoff checklist with offboarding survey and archive checklist, and 8 AI drafting prompts behind a mandatory fact-check gate. One loop, run the same way for every new client — about 45 minutes of onboarding work per client, 5–10 minutes a week after.

## What this skill does

Once installed, the agent can run the whole loop with you and produce the actual working documents, not a summary:

- **Capture before you commit:** send the 42-question intake questionnaire (6 categories, worked-example answers included) after the "yes" and before kickoff; answers are traffic-lighted as they arrive and logged in the response CSV, so a red answer becomes a kickoff agenda item before anything is signed
- **Run a kickoff that lands:** 60-minute agenda in 6 segments with a parking list, read-aloud lines for the 8 awkward moments, and a recap email template that goes out within 24 hours with owners and dates on every decision
- **Make scope enforceable:** the in/out/assumptions/excluded worksheet ("if it is not written, it is not included"), a one-page change-request form with one approved and one declined worked example, and backwards-planned milestones with input dates
- **Connect without collecting passwords:** the access-and-assets checklist requests platform-based invites, tracks everything in a CSV, and schedules a rotation/purge sweep at handoff
- **Set the weekly rhythm:** a one-page welcome packet, a cadence playbook with response times and an escalation ladder, a 5-line Friday status update, and four read-aloud scripts for the moments a client asks for "one more small thing"
- **Close cleanly:** deliverable + walkthrough handoff checklist, a 6-question offboarding survey with the testimonial ask, and an archive checklist with data hygiene
- **Draft with AI, safely:** 8 prompts that summarize intake, draft agendas, recaps and more — they forbid invented facts, flag ambiguous notes `[CHECK]`, and the fact-check gate keeps the final check with you

Every file carries the same worked example (a fictional two-person studio onboarding a fictional coffee roaster) so a filled-in version always sits next to the blank.

## Install

Install with the [skills CLI](https://skills.sh) (works with Claude Code, Codex, Cursor, Gemini CLI and other skill-compatible agents):

```bash
npx skills add zicula/skills/onboarding-kit
```

…or copy the folder into your agent's skills directory:

```bash
git clone https://github.com/zicula/skills.git
cp -R skills/onboarding-kit ~/.agents/skills/

# or for Claude Code's project/user skills dir
cp -R skills/onboarding-kit ~/.claude/skills/
```

That's it — the skill is self-contained. `SKILL.md` is the entry point; `references/` holds the kit runtime: the START-HERE loop map, all seven process folders (intake, kickoff, scope, access, communication, handoff, AI pack), the scope-and-disclaimers page and the license. No scripts to run — it is a process layer of plain files and CSVs.

## Honest note: what's in the skill vs. the full kit

This skill is the **process layer extracted from the paid Client Onboarding Kit — sold at $42 one-time** at [client-onboarding-kit.zicula.trade](https://client-onboarding-kit.zicula.trade) (30-day full refund, instant download, ≈฿1,490; one kit, no tiers). All seven process folders and the disclaimers page are here in full, byte-identical to the buyer zip. What the paid zip adds is the buyer-ready form: the packaged download, a 10-step novice SETUP guide with pictures, the MANIFEST, buyer README and the single-business commercial license (this free edition is MIT instead). Two lines inside `START-HERE.md` were reworded so they point at this skill entry instead of the removed buyer SETUP/README pages.

If you want the operating process as agent-consumable files, this skill has you covered; if you want the buyer-packaged zip or to support the project with a commercial license, grab the kit.

## Files

```
onboarding-kit/
├── SKILL.md                                    # skill entry point (spec: agentskills.io)
├── README.md                                   # this file
└── references/
    ├── START-HERE.md                           # the 8-step loop, time budgets, worked example (2 lines adapted)
    ├── 1-intake/                               # 42-question questionnaire + response log CSV
    ├── 2-kickoff/                              # agenda, call script, 24-hour recap template
    ├── 3-scope/                                # scope worksheet, change-request form, milestone plan + CSV
    ├── 4-access-assets/                        # access & assets checklist + tracking log CSV
    ├── 5-communication/                        # welcome packet, cadence playbook, status update, scope-creep scripts
    ├── 6-handoff/                              # handoff checklist, offboarding survey, archive checklist
    ├── 7-ai/ai-prompt-pack.md                  # 8 prompts + the fact-check gate
    ├── 10-scope-and-disclaimers.md             # the 3 nots + how to adapt the kit (unmodified)
    └── LICENSE.txt                             # MIT — free to use, modify and share
```

## License

MIT — this free skill edition may be used, modified and shared freely (see `references/LICENSE.txt`). The paid kit sold at [client-onboarding-kit.zicula.trade](https://client-onboarding-kit.zicula.trade) is a separate product under its own single-business commercial license.
