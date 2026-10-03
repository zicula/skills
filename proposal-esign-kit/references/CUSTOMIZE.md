# CUSTOMIZE — make every proposal unmistakably yours

## 1. Brand the document template (the part clients read)

Templates are plain HTML in `templates/`. The `<style>` block at the top controls typography and colors; the `<body>` is the document content. Three rules:

1. **Keep the `{{placeholders}}`** you want the generator to fill: `{{proposal_id}}`, `{{proposal_title}}`, `{{client_name}}`, `{{sender_name}}`, `{{sender_email}}`, `{{amount}}`, `{{currency}}`, `{{valid_days}}`, `{{date}}`. Any other `{{...}}` in the file aborts generation with the offending name — a typo can't silently ship.
2. **Everything is signed, including styles.** The `<body>` (content) is what the digest covers; the generator copies the rest (head/styles) from the template at generation time. Change the template as much as you like *before* generating — after generating, treat the output as read-only.
3. **A logo:** add an `<img>` pointing at an absolute URL (`https://your-site.com/logo.png`) or embed it as a data URI. Because the file is self-contained, an absolute URL to your own site is usually the tidy option.

House style that reads well on phones (where acceptances actually happen): headings ≤ 30px, body 16px, one pricing table, terms as a list, and the fineprint block kept — it is your honest-disclaimer layer.

## 2. Brand the accept page chrome

`sign/accept-template.html` is the runtime. The CSS variables at the top map 1:1 to the document palette:

```css
:root { --deep:#16243D; --accent:#0E7C66; --amber:#F2B33D; ... }
```

Change `--deep`/`--accent` to your brand colors before your first generation and every proposal page inherits them. The strings a client sees ("Accept this proposal", consent text, footer note) live in plain English at the top of the script block — translate them into your client's language there if you always sell in one language. Keep the consent sentence explicit ("read the proposal", "agree to it", "consent to use an electronic record", "sign by typing my name") — that sentence is what your audit trail quotes back as the consent text.

## 3. Currency, amounts, validity

All passed as flags at generation — nothing to edit per deal:

```bash
--amount "89,000" --currency THB --valid-days 7
```

`--currency` is display-only (you choose payment rails; see DEPOSITS.md for the Stripe path). `--valid-days` feeds the validity term in the templates — keep it consistent with what you actually honor.

## 4. Your deposit terms

The three templates ship with 30–50% / 40-30-30 schedules — the common, defensible defaults. Edit the section in the template if your terms differ. Whatever you print, make the follow-up email match it word for word; mismatched terms are how deals stall in "legal review".

## 5. The honesty block

Each template ends with a fineprint paragraph explaining what the electronic acceptance records (consent + typed name + document hash) and offering wet-ink as the equal alternative. Keep an equivalent in your own wording — it is both good faith and good positioning: the clients who ask "is this *legal* legal?" are the ones who read.

## 6. Language of the proposal

Templates ship in English. For other client languages, duplicate a template file and translate the copy — the generator doesn't care what language the document is in; placeholders and structure stay identical. The signing chrome (button labels, consent text) is translated in `sign/accept-template.html` (section 2 above).

## 7. What NOT to change

- `tools/new-proposal.mjs` / `tools/verify-audit.mjs` — the signing and verification math. If it works, leave it alone.
- The `pek-data` block in generated pages — regenerate instead of editing.
- The hash-chain format in the accept page script (`format: "proposal-esign-kit/audit-trail"`, event shape) — verify-audit.mjs checks this exact shape; cosmetic edits break verification of otherwise-valid trails.

If you want a different chain format or extra event types, add them as *additional* events after `accepted` and extend your local copy of verify-audit.mjs in step — the shipped pair must stay in lockstep.
