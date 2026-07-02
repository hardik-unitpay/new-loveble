// Server-side credit simulation. The secret key stays here — never sent to the browser.
// POST { customerId, eventName?, quantity? }
//   → reads wallet balance, tracks usage, reads balance again, returns the delta.
import type { NextApiRequest, NextApiResponse } from "next";
import { UnitPay, ApiError } from "@unitpay/node";

type Wallet = { id: string; currencyId: string; balance: number };
type DeltaRow = { currencyId: string; before: number; after: number; spent: number };

type Data =
  | {
      ok: true;
      accepted: number;
      rejected: number;
      rejections?: unknown;
      before: Wallet[];
      after: Wallet[];
      delta: DeltaRow[];
    }
  | { ok: false; error: string };

async function readWallets(unitpay: UnitPay, customerId: string): Promise<Wallet[]> {
  const wallets: Wallet[] = [];
  for await (const w of unitpay.customers.listCreditAccounts(customerId)) {
    const acct = w as { currency?: { slug?: string }; creditCurrencyId: string; id: string; balance: number };
    const currencyId = acct.currency?.slug ?? acct.creditCurrencyId ?? acct.id;
    wallets.push({ id: acct.id, currencyId, balance: Number(acct.balance) });
  }
  return wallets;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const apiKey = process.env.UNITPAY_SECRET_KEY ?? process.env.UNITPAY_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ ok: false, error: "UNITPAY_SECRET_KEY is not set on the server." });
  }

  const { customerId, eventName = "lovable_build_credits_usage", quantity = 2 } = req.body ?? {};
  if (!customerId) {
    return res.status(400).json({ ok: false, error: "customerId is required" });
  }
  const qty = Number(quantity);
  if (!Number.isFinite(qty) || qty <= 0) {
    return res.status(400).json({ ok: false, error: "quantity must be a positive number" });
  }

  try {
    // baseUrl defaults to production; set UNITPAY_BASE_URL for local dev
    // (e.g. http://localhost:4000/v1). Undefined → SDK's prod default.
    const unitpay = new UnitPay({ apiKey, baseUrl: process.env.UNITPAY_BASE_URL || undefined });

    const before = await readWallets(unitpay, customerId);
    // Pass an array so the SDK wraps it as { events: [...] }, which the API expects.
    const result = await unitpay.track([
      {
        customerId,
        eventName,
        quantity: qty,
        idempotencyKey: `sim-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      },
    ]);
    const after = await readWallets(unitpay, customerId);

    const delta: DeltaRow[] = before.map((b) => {
      const a = after.find((w) => w.id === b.id);
      const beforeVal = b.balance;
      const afterVal = a ? a.balance : beforeVal;
      return { currencyId: b.currencyId, before: beforeVal, after: afterVal, spent: beforeVal - afterVal };
    });

    return res.status(200).json({
      ok: true,
      accepted: result.accepted,
      rejected: result.rejected,
      rejections: (result as { rejections?: unknown }).rejections,
      before,
      after,
      delta,
    });
  } catch (err) {
    const message =
      err instanceof ApiError
        ? `${err.constructor.name}: ${err.message} (status ${err.status ?? "?"})`
        : err instanceof Error
          ? err.message
          : "Unexpected error";
    return res.status(502).json({ ok: false, error: message });
  }
}
