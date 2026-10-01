---
name: content-decay-kit
description: Detect decaying pages across client websites from Google Search Console data, diagnose why traffic fell (ranking slip, impression dip, or demand shift), and render an internal dashboard plus white-label weekly client digests. Includes a zero-dependency Node 18+ script with demo mode, Google service account setup, threshold tuning, cron and GitHub Actions scheduling recipes, and a 14-day playbook for selling weekly content-health monitoring as a retainer add-on.
---

# Content Decay Kit

Know which client page is losing Google traffic before the client emails you
about it. The kit reads each client's Search Console property through the
official Search Console API (read-only), compares the last 28 days against a
29-120 day baseline normalized to per-day rates, and flags pages when
clicks/day fell 20%+ (tunable) above a 200-impression noise floor. It tells
you **why** a page fell - ranking slipped / seen-but-not-clicked / demand
cooled - with a matching refresh suggestion, then renders an internal
dashboard plus one white-label weekly digest per client (your agency name on
top, priorities P1-P3, print-ready, no vendor branding).

This is a monitoring and reporting tool: it tells you which page to refresh
first; it does not score or rewrite content.

## Layout

- `scripts/decay.mjs` - the product: GSC fetch -> decay detection -> dashboard
  + white-label digests. Node 18+, zero npm dependencies.
- `references/properties.example.json` - config template: brand, clients,
  thresholds, service-account path. Ships with 2 placeholder clients.
- `references/SETUP.md` - Google service account + Search Console access,
  one-time (~20 min).
- `references/CUSTOMIZE.md` - brand the digest, tune thresholds, reword
  refresh angles.
- `references/crontab-example.txt` - weekly scheduling recipes (cron hosts,
  optional Slack-style webhook).
- `references/decay-github-actions.yml` - the same scan as a free GitHub
  Actions workflow (private repo + one secret).
- `references/PLAYBOOK-14D.md` - 14 days to selling the weekly digest as a
  $29-99/mo care-plan add-on.
- `LICENSE.txt` - MIT — free to use, modify and share this skill edition.

## Step 1 - demo run (no credentials, ~1 minute)

```bash
node scripts/decay.mjs --demo
open out/dashboard.html
open out/digest/acme-home-services-demo-weekly-digest.html
```

`--demo` runs the whole pipeline on built-in demo data (3 demo clients, real
decay math, real digests). Nothing leaves the machine. Use this first to show
the user exactly what they get.

## Step 2 - real run (the user's Google credentials)

Follow `references/SETUP.md`: the user creates a free Google Cloud project,
enables the Search Console API, creates a service account, saves the JSON key,
and adds the service-account email as a Viewer on each client property in
Search Console. The kit has no account with us and sends nothing to any
endpoint except the official Google ones.

Path resolution: with `--config FILE`, all relative paths (service-account
file, `out/` output) resolve against the **directory of FILE**, not the
current working directory. Recommended layout:

```
run/
  properties.json          <- copy of references/properties.example.json, edited
  config/service-account.json   <- the user's Google key (never commit)
  out/                     <- generated: dashboard.html, digest/, history.json
```

```bash
node scripts/decay.mjs --config run/properties.json
```

Quick manual test only: export `GSC_ACCESS_TOKEN` (OAuth token with the
`webmasters.readonly` scope) instead of a service account - it expires in
about an hour, so use the service account for the weekly cron.

## Flags and exit codes

- `--demo` - built-in demo data, no credentials.
- `--config FILE` - real run against Search Console (required for real data).
- `--fail-on-decay` - exit 1 when any page is flagged (CI / cron monitoring).
- `--quiet` - cron-friendly output.
- Exit codes: `0` ok, `1` flagged pages (only with `--fail-on-decay`), `2`
  setup/usage error.

## Tuning

Edit `thresholds` in the config (see `references/CUSTOMIZE.md` for the full
table): `decay_pct` (alarm sensitivity, default 20), `min_impressions` (noise
floor, default 200), `recent_days` (28), `baseline_first_day`/`baseline_last_day`
(29/120). Both windows are normalized to per-day rates, so changing window
lengths never fakes a trend. Client-visible wording and branding also live in
the config's `brand` block - never edit generated HTML.

## Scheduling

The scan is weekly by design (Search Console data lags ~2-3 days and the
baseline spans ~92 days). Copy one line from `references/crontab-example.txt`
for any cron host, or use `references/decay-github-actions.yml` on GitHub's
free tier (private repo, service-account JSON in the `GSC_SERVICE_ACCOUNT_JSON`
secret, digest uploaded as an artifact).

## Selling it

`references/PLAYBOOK-14D.md` turns the weekly digest into a paid care-plan
add-on: price framing ($29-99/mo per client, one client covers the kit in a
month), a 14-day part-time rollout, and email templates for the first sends.
