# Simulate Credits — porting guide

How the **simulate-credits** feature works, and how to drop it into another billing-clone
project. It tracks a usage event against UnitPay and shows the customer's credit balance
going down.

## The idea in one line

Browser form → **your** Next.js API route → `@unitpay/node` SDK → UnitPay. The route reads the
wallet balance, tracks a usage event (which deducts credits), reads the balance again, and
returns the before/after delta. **The secret key never leaves the server.**

```
[quantity input + button]  →  POST /api/simulate-credits  →  unitpay.track()  →  balance drops
      (browser, no key)              (server, has key)            (UnitPay)
```

---

## Step 1 — install & env

```bash
npm install @unitpay/node
```

`.env.local` (gitignored — never commit):

```bash
UNITPAY_SECRET_KEY=upay_sk_...              # your sandbox/live secret key
UNITPAY_BASE_URL=http://localhost:4000/v1   # OMIT in prod → SDK defaults to api.useunitpay.com
```

---

## Step 2 — server route (`pages/api/simulate-credits.ts`)

```ts
import type { NextApiRequest, NextApiResponse } from "next";
import { UnitPay, ApiError } from "@unitpay/node";

async function readWallets(unitpay: UnitPay, customerId: string) {
  const wallets = [];
  for await (const w of unitpay.customers.listCreditAccounts(customerId)) {
    // field shape: { id, balance, creditCurrencyId, currency: { slug, name } }
    wallets.push({
      id: w.id,
      currencyId: w.currency?.slug ?? w.creditCurrencyId,
      balance: Number(w.balance),
    });
  }
  return wallets;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const apiKey = process.env.UNITPAY_SECRET_KEY;
  const { customerId, eventName, quantity = 1 } = req.body ?? {};
  if (!apiKey) return res.status(500).json({ ok: false, error: "UNITPAY_SECRET_KEY not set" });
  if (!customerId) return res.status(400).json({ ok: false, error: "customerId required" });

  try {
    const unitpay = new UnitPay({ apiKey, baseUrl: process.env.UNITPAY_BASE_URL || undefined });

    const before = await readWallets(unitpay, customerId);

    // ⚠️ pass an ARRAY so the SDK sends { events: [...] }, and include idempotencyKey
    const result = await unitpay.track([
      {
        customerId,
        eventName,
        quantity: Number(quantity),
        idempotencyKey: `sim-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      },
    ]);

    const after = await readWallets(unitpay, customerId);

    const delta = before.map((b) => {
      const a = after.find((w) => w.id === b.id);
      const afterBal = a?.balance ?? b.balance;
      return { currencyId: b.currencyId, before: b.balance, after: afterBal, spent: b.balance - afterBal };
    });

    return res.status(200).json({ ok: true, accepted: result.accepted, rejected: result.rejected, delta });
  } catch (err) {
    const msg = err instanceof ApiError ? `${err.constructor.name}: ${err.message}` : (err as Error).message;
    return res.status(502).json({ ok: false, error: msg });
  }
}
```

---

## Step 3 — UI (`pages/simulate-credits.tsx`)

Plain React — just `fetch` to your own route (no UnitPay SDK in the browser):

```tsx
import { useState } from "react";

export default function SimulateCredits() {
  const [customerId, setCustomerId] = useState("cus_...");
  const [eventName, setEventName] = useState("lovable_build_credits_usage");
  const [quantity, setQuantity] = useState(2);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function simulate() {
    setLoading(true);
    const res = await fetch("/api/simulate-credits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ customerId, eventName, quantity }),
    });
    setResult(await res.json());
    setLoading(false);
  }

  return (
    <div>
      <input value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
      <input value={eventName} onChange={(e) => setEventName(e.target.value)} />
      <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      <button onClick={simulate} disabled={loading}>Simulate credits</button>

      {result?.ok &&
        result.delta.map((d: any) => (
          <div key={d.currencyId}>
            {d.currencyId}: {d.before} → {d.after} (spent {d.spent})
          </div>
        ))}
    </div>
  );
}
```

---

## The 5 gotchas (the real value)

These cost the most time; knowing them makes the port instant.

1. **`baseUrl` decides which server you hit.** Default is production (`api.useunitpay.com`). For a
   local UnitPay sandbox, set `UNITPAY_BASE_URL=http://localhost:4000/v1`. A `401 invalid_api_key`
   almost always means the key doesn't match the environment/server you're pointed at.

2. **`track()` must get an array.** `unitpay.track({...})` sends the object unwrapped;
   `unitpay.track([{...}])` sends `{ events: [...] }`, which is what the API validates against.
   Single-object form → `400 validation failed`.

3. **`idempotencyKey` is required per event** (at least on the local server). Add one per call so
   retries don't double-count.

4. **`eventName` must be a real billable metric**, not a feature slug. Find valid ones at
   `GET /v1/billable-metrics?productId=...`. Wrong name → `rejected_no_metric`
   (accepted: 0, rejected: 1). Each wallet has its own event (e.g. `lovable_build_credits_usage`
   → build-credits wallet).

5. **Wallet object shape:** `listCreditAccounts()` returns
   `{ id, balance, creditCurrencyId, currency: { slug, name, denomination } }` — there is
   **no `available` field**; use `balance`, and match before/after by `id` (a customer can have
   multiple wallets sharing a currency slug).

---

## What you need to port it

- A **secret key** (`upay_sk_…`) for the target project's UnitPay org/environment.
- A **customerId** that exists there — list with `GET /v1/customers`.
- A valid **eventName** for that catalog — list with `GET /v1/billable-metrics?productId=…`.

The two files above are project-agnostic; only the env vars and the three ids change.

---

## Handy discovery calls

```bash
KEY=upay_sk_...
BASE=http://localhost:4000/v1   # or https://api.useunitpay.com/v1

# customers
curl -s "$BASE/customers" -H "x-api-key: $KEY"

# products (need productId for the next call)
curl -s "$BASE/products" -H "x-api-key: $KEY"

# billable metrics → the valid eventName values
curl -s "$BASE/billable-metrics?productId=prod_..." -H "x-api-key: $KEY"

# a customer's wallets + balances
curl -s "$BASE/customers/cus_.../credit-accounts" -H "x-api-key: $KEY"
```

---

## Related: customer-facing balances (frontend SDK)

To *show* balances in the browser (instead of the server-driven test above), use
`@unitpay/react`: mint a short-lived portal token server-side with
`unitpay.portalSessions.create({ customerId })`, pass it to `<UnitPayProvider portalToken={…}>`,
and read wallets with the `useCreditAccounts()` hook. See `pages/wallets.tsx` and
`pages/api/portal-session.ts` in this repo.
