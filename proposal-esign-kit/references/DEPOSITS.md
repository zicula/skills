# DEPOSITS — acceptance and the deposit, in the same sitting

The research pattern is blunt: proposals get "yes, let's start next month" all the time; they get signed *and funded* far less often, because the signature and the payment are two separate moments and momentum dies between them. Close the gap: the accept page records the commitment, and your payment link is one paste away in the same email thread.

## The one-time setup (≈10 minutes, Stripe)

This kit is deliberately payment-agnostic — any payment provider works. The Stripe Payment Link path below is the one most solo sellers finish before their coffee cools:

1. **Stripe dashboard → Payment links → + New.**
2. Add a product (e.g. "Coaching deposit — Acme" or a generic "Coaching deposit") with your deposit amount. Currency: your own.
3. **After payment → Redirect** to your thank-you page or simply a confirmation URL. Enable **"Allow customers to adjust quantity" off** and **promotion codes on** if you ever run them.
4. Create → copy the `https://buy.stripe.com/…` link. That URL is your deposit button forever; one link per standard deposit amount is usually enough (e.g. one for 30% deposits, one for 40%).

That's it. No code, no webhooks needed for this flow — Stripe emails you the receipt, the money lands in your account, and you reconcile manually until volume justifies automation.

## Wiring it into your flow

- **Template:** the payment-schedule sections in the three templates already say "a payment link accompanies acceptance". If you prefer the client to pay straight from the document, add one line under the pricing table: `Pay the deposit here: <a href="https://buy.stripe.com/…">secure deposit payment</a>` — the link becomes part of the signed content (it's inside the hashed document), which is arguably the cleanest: the receipt then proves they accepted a document that contained the exact payment instructions.
- **Follow-up email (recommended default):** after verification passes (SETUP.md step 4), send the thank-you with the deposit link — see FOLLOW-UP-SOP.md "After the yes". The work starts when the deposit lands, and both of you have the acceptance record; this order protects you both.
- **Amounts per deal:** keep 2–3 standing links (deposit 30%, deposit 40%, pay-in-full) and paste the right one per deal. Regenerating a proposal to bake in a link is fine too — see the template note above.

## Terms hygiene (the part people skip)

- The templates say the deposit *confirms the slot* and state what happens on cancellation. Make sure whatever you write there matches your refund practice in reality — the audit trail will quote it back.
- If your client's procurement prefers invoices, Stripe Payment Links have an "invoice mode" twin: same dashboard, "Invoices → Create", same redirect options. Same hygiene applies.
- Taxes: for real advice on your situation, ask your accountant — the honest one-liner in your template's terms ("taxes as applicable by law") is the norm.

## When NOT to use this

- The client's own PO process must route the payment — send the PO, keep the acceptance trail, let their machinery pay on its own clock.
- Deposits above a size where a wire transfer is simply cheaper than card fees — payment links are for momentum, not for ideology. Accept the wire.
