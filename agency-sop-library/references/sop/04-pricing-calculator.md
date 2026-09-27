# SOP-04 · Pricing Calculator Logic

| | |
|---|---|
| **Stage** | Sales |
| **Owner** | Founder |
| **Trigger** | Building any proposal (SOP-03) or retainer quote |
| **Time** | 20 minutes per quote — after the one-time setup |
| **Output** | Three option prices with a defensible floor and a margin guard |

## When to use

Before you write a single price. Pricing from vibes ("feels like about $8k") is how small agencies subsidize their clients. This SOP is the math behind every quote: a personal floor rate, a risk multiplier for estimate optimism, and a three-option structure (SOP-03 §4).

## Step 1 — Your floor rate (set once, revisit every 6 months)

```
Target income        = [ANNUAL INCOME YOU WANT, e.g. $80,000]
+ business overhead  = [TOOLS/INSURANCE/ACCOUNTANT, e.g. $12,000]
+ tax buffer         = [0.25–0.35 × income, e.g. $24,000]
= revenue needed     →  $116,000

Billable hours/year  = [WORKING WEEKS 46 × HOURS/WEEK × UTILIZATION]
  · realistic utilization for a 1–10 person agency: 50–60%
  · example: 46 × 30 × 0.55 ≈ 760 → round planning number: [800]

FLOOR RATE = revenue needed ÷ billable hours  →  $116,000 ÷ 800 = $145/hr
```

Never quote an hourly rate below your floor. The floor is not your price — it's the line under which you are paying to work.

## Step 2 — Estimate hours, then apply the risk multiplier

Estimate hours per deliverable (be honest, line by line). Then:

```
PROJECT PRICE = estimated hours × floor rate × 1.3
```

**Why 1.3:** small-agency estimates are systematically optimistic by ~30% — client feedback loops, access delays (SOP-08), and one inevitable surprise per project. The multiplier prices the *real* project, not the imaginary smooth one. If your last 5 projects overran budget, raise it to 1.4; if you hit estimates 4 of 5 times, 1.25.

## Step 3 — Build the three options (copy-paste table)

| Option | Scope | Price rule | Example |
|---|---|---|---|
| **A — Core** | The one deliverable that produces the outcome, nothing else | base price × 1.0 | Landing page + copy polish → $6,000 |
| **B — Target (recommended)** | Core + the 2–3 things that make it actually perform | base price × 1.35–1.5 | + full site, analytics setup, 60-day iteration → $9,500 |
| **C — Full** | Target + extras with clear standalone value | base price × 1.8–2.0 | + content system, quarterly optimization → $13,500 |

- Anchoring works in your favor: C makes B look reasonable; A gives a floor answer to price-sensitive buyers instead of a lost deal.
- Write one line under each option naming **who it's for** ("A is right if you mainly need X").

## Step 4 — Sanity checks (all three must pass)

1. **Value ceiling:** price ≤ 25–30% of the client's expected 12-month value of the outcome. Their discovery-call number ("this is worth $120k/yr to us") → cap ≈ $36k. Below the ceiling, price on value; never above it — that's how you get fired.
2. **Floor check:** price ÷ realistic hours ≥ floor rate. If Option A breaks the floor, cut scope, not the rate.
3. **Sticker check:** would you say "$[PRICE]" out loud, level-voiced, on a call? If you'd mumble it, the market is telling you something — either your floor math or your positioning (niche, proof, SOP-03 §6) needs work. Usually the second.

## Retainers

```
RETAINER = (hours/month × floor rate) × 0.9   ← 10% predictable-revenue discount
… but never below: hours/month × floor rate × 0.95 unless 6+ month commitment.
Track usage monthly (SOP-19): >90% used 2 months running → propose a bigger tier;
<50% used 2 months running → they'll churn; right-size or re-scope first.
```

## Rules & red flags

- **Never discount, cut scope.** "We can do 10% less" > "we can do it 10% cheaper." A discount above 10% without a scope cut trains clients to squeeze you every cycle.
- Rush jobs: +25–50% surcharge, stated plainly ("rush is +30% because it displaces other work").
- "Can you match a cheaper quote?" → "I'd rather lose the project at an honest price than win it and both of us regret it." Then hold. One client in five respects it and stays; the ones who leave were your SOP-01 deductions anyway.
- Publish ranges, never rate cards. "Projects typically land $[X]–$[Y]" filters leads before they cost you a discovery call.

## What good looks like

- Effective hourly rate per project (price ÷ actual hours) tracked on every closed project — your agency's true KPI. Target: ≥ floor rate; investigate any project below 0.9 × floor.
- Zero prices invented mid-call. "Let me build the options and come back Thursday" is a professional answer.

## Adapt it with AI

> "My floor rate is $[RATE]/hr. Estimate hours and three options (1.0 / 1.4 / 1.9 multipliers) for this scope: [PASTE SCOPE]. Then list 5 risks that would make me overrun these estimates, so I can decide if 1.3 is the right risk multiplier for this project type."
