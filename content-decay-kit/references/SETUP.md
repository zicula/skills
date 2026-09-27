# SETUP — from unzip to the first real scan (~20 minutes)

The kit runs on **your own Google credentials**. There is no account with us,
no API key of ours, no shared service: you create a free Google Cloud project,
and the script talks to Google's official Search Console API directly from
your machine. Everything below is one-time setup.

## 1. Requirements

- Node 18+ (`node --version`). Nothing to `npm install` — the script uses Node
  built-ins only.
- A Google account that can open a Google Cloud project (free).

## 2. Create the service account (your credential, ~10 minutes)

1. Go to https://console.cloud.google.com/ → create a project (any name,
   e.g. `content-decay-kit`).
2. APIs & Services → Library → search **"Search Console API"** → **Enable**.
3. APIs & Services → Credentials → **Create credentials → Service account**.
   Name it (e.g. `decay-reader`), skip the optional role steps, Done.
4. Open the service account → **Keys → Add key → Create new key → JSON**.
   Save the downloaded file as `config/service-account.json` **inside this
   kit** (that is the path `config/properties.json` points at; keep the file
   out of any public repo).

> Alternative for a quick manual test only: `GSC_ACCESS_TOKEN` — an OAuth
> access token with the `webmasters.readonly` scope (e.g. from OAuth
> Playground). It expires in about an hour, so the service account is the
> right credential for the weekly cron.

## 3. Give the service account read access to each property (~2 min/client)

For **every client property** you want monitored:

1. Open https://search.google.com/search-console and select the property.
2. Settings → **Users and permissions → Add user**.
3. Paste the service-account email (it looks like
   `decay-reader@your-project.iam.gserviceaccount.com`) — **Viewer** role is
   enough. No invitation email is sent for service accounts.

The property string in Search Console (Settings → Property settings) is
exactly what goes into your config: either `sc-domain:example.com` (domain
property) or `https://www.example.com/` (URL-prefix property).

## 4. Configure your agency + clients

Edit `config/properties.json`:

- `brand.agency`, `brand.logo_text`, `brand.digest_title` — what the client
  digest carries. This is white-label: your name only.
- `clients[]` — one entry per client: a `name` (shown in the digest),
  the `property` string exactly as in Search Console.
- `thresholds` — defaults follow the common industry definition: flag when
  clicks/day fall **20%+** and the page's baseline had **200+ impressions**
  (low-volume pages fluctuate too much to alert on). Raise `decay_pct` if
  you only want the big hits.
- `service_account_file` — where your key lives (default
  `config/service-account.json`).

## 5. First run

```bash
node decay/decay.mjs --config config/properties.json
```

- A successful run prints per-client counts and writes `out/dashboard.html`,
  `out/digest/<client>-weekly-digest.html`, `out/history.json`.
- If the token exchange or an API call fails, the error is printed verbatim
  (e.g. `403: User does not have sufficient permission` = step 3 was missed
  for that property, or the property string does not match exactly).
- Search Console data lags 2–3 days — the script already accounts for this
  by reading windows that end 3 days back. Freshly verified properties may
  need a few days of data before numbers appear.

## 6. Schedule it weekly

Copy one recipe from `cron/crontab-example.txt` (any cron host) or use
`cron/decay.yml` on a private GitHub repo (free, no server). Weekly is the
designed cadence — the digest compares a 28-day window to a ~92-day baseline,
so daily runs add noise, not signal.

Optional: set `CRON_NOTIFY_WEBHOOK` to a Slack-style incoming webhook and the
run posts a short summary whenever pages are flagged.

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `service account file not found` | Path in `service_account_file` is wrong, or you skipped step 2. |
| `Google token exchange failed (400/401)` | Key JSON truncated or project lacks the enabled Search Console API (step 2.2). |
| `Search Console API 403` on one client | That service account is not a Viewer on that property, or the property string doesn't match Search Console exactly (step 3). |
| Everything is "healthy" but you know a page fell | Baseline below the 200-impression noise floor, or the drop is <20%. Both are tunable in `thresholds`. |
| Quota errors | You added dozens of properties; batch them (the script queries each property twice per run). The default quota (1,200 queries/min per property) is far above what a weekly scan uses. |
