# CUSTOMIZE — make the kit sound and look like your agency

Everything client-visible is generated from `config/properties.json`. You never
edit the generated HTML.

## Brand (the client-facing digest)

```json
"brand": {
  "agency": "Acme SEO Studio",              // footer "Prepared by", dashboard header
  "logo_text": "ACME SEO",                  // the logo slot at the top of the digest
  "accent": "#7C3AED",                      // header rule + priority accents
  "digest_title": "Weekly Content Health Digest",
  "intro_line": "What slipped, why it slipped, and the refresh we suggest first."
}
```

- `logo_text` is a styled text slot. Want a real logo? Drop an `<img>` into
  `brand.logo_text` — the digest escapes nothing you put there intentionally,
  so `<img src="https://your-cdn/logo.png" alt="Acme SEO" height="28">` works.
- `digest_title` ideas: "Content Health Report", "Your Site This Week",
  "Search Performance Digest".

## Thresholds (how sensitive the alarm is)

| Key | Default | Meaning |
|---|---|---|
| `decay_pct` | 20 | Flag when clicks/day fell this many percent vs baseline |
| `min_impressions` | 200 | Noise floor: pages whose baseline had fewer impressions never alert |
| `recent_days` | 28 | The "now" window |
| `baseline_first_day` / `baseline_last_day` | 29 / 120 | The baseline window, days back from today |

Rules of thumb:

- Clients who react to every wiggle → `decay_pct: 30`, `min_impressions: 500`.
- You want a longer view (seasonal sites) → `baseline_last_day: 180`.
- The kit normalizes both windows to per-day rates first, so changing window
  lengths never fakes a trend.

## Per-client digest

- The digest groups pages by client automatically; `clients[].name` is the
  heading. Use the name the **client** knows, not your internal codename.
- `digest_max_pages` (default 10) caps the flagged-pages table per digest.
- Sections in every digest: flagged pages (P1→P3), watchlist, new pages,
  and a "what happens next" checklist. A quiet week renders a green
  "nothing needs urgent attention" digest — send it anyway; it proves the
  watching is real.

## Priorities and refresh angles

- **P1** — flagged page with decay ≥40% or ≥5 clicks/day lost: refresh this week.
- **P2** — flagged page: schedule a refresh.
- **P3** — below the flag line but ≥half of it: watchlist.

The suggested action per page follows the *why*:

| Why | Suggested angle |
|---|---|
| Ranking slipped | Update facts/dates, add the sections competitors gained, re-index |
| Seen, not clicked | Rewrite title + meta against the queries it still ranks for |
| Search demand cooled | Extend to adjacent intents or fold into a pillar piece |
| Mixed softening | Full refresh pass |

The angle texts live in `REFRESH_ANGLES` at the top of `decay/decay.mjs` —
translate or reword them there to match your agency's voice.

## Outputs and retention

- Everything lands in `out/`. `dashboard.html` is for your team — do not send.
- `out/history.json` keeps the last 260 runs; prune or archive as you like.
- Print the digest to PDF from any browser (print styles included) for the
  client email attachment.
