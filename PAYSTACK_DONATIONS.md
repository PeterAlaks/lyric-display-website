# Paystack Donations Setup

The donate page is implemented at `/donate`, but existing app donate links are not pointed at it yet.

## Required Netlify Environment Variables

Set these in Netlify under **Site configuration > Environment variables**:

```bash
PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PAYSTACK_CURRENCY=USD
PAYSTACK_CALLBACK_URL=https://lyricdisplay.app/donate
PAYSTACK_PLAN_SUPPORTER=PLN_xxxxxxxxxx
PAYSTACK_PLAN_BUILDER=PLN_xxxxxxxxxx
PAYSTACK_PLAN_PATRON=PLN_xxxxxxxxxx
```

`PAYSTACK_SECRET_KEY` must stay server-side. Do not expose it as a `VITE_` variable.

## Fixed Subscription Plans

Create these plans in Paystack, then copy each generated plan code into Netlify:

| Plan | Amount | Interval | Environment variable |
| --- | ---: | --- | --- |
| Supporter | USD 5 | Monthly | `PAYSTACK_PLAN_SUPPORTER` |
| Builder | USD 15 | Monthly | `PAYSTACK_PLAN_BUILDER` |
| Patron | USD 30 | Monthly | `PAYSTACK_PLAN_PATRON` |

## Custom Recurring Donations

Custom recurring donations are handled by the Netlify Function at:

```text
/.netlify/functions/paystack-donation
```

When a donor chooses a custom amount and frequency, the function creates a Paystack plan with the selected USD amount and interval, then initializes checkout with that plan. This is why the secret key is required server-side.

## One-Time Donations

One-time donations use the same Netlify Function and initialize a regular Paystack transaction without a plan.

## Success and Error Handling

Paystack redirects the donor back to `PAYSTACK_CALLBACK_URL` with a payment reference. The donate page reads that reference and calls:

```text
/.netlify/functions/paystack-verify
```

The verify function calls Paystack's Verify Transaction API with `PAYSTACK_SECRET_KEY`. The page only shows a success message when Paystack returns `status: "success"`. Failed, abandoned, pending, or unknown statuses show a clear error/status message with the transaction reference.

## What Donor Form Data Does

The donate form sends email, name, note, donation type, amount, and frequency to the Netlify Function only when the donor clicks **Continue to Paystack**. The function forwards the relevant data to Paystack as transaction metadata and returns Paystack's checkout URL. The app does not store the donor information in this repository.
