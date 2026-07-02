/**
 * Simulate credit consumption and verify credits are actually deducted — via the UnitPay Node SDK.
 *
 * Flow: read wallet balance  →  unitpay.track()  →  read balance again  →  assert the delta.
 *
 * Usage:
 *   UNITPAY_SECRET_KEY=upay_sk_... \
 *   UNITPAY_BASE_URL=http://localhost:4000/v1 \
 *   UNITPAY_CUSTOMER_ID=cus_123 \
 *   node scripts/simulate-credits.mjs
 *
 * Optional env:
 *   UNITPAY_FEATURE   billable event name to track   (default: lovable_build_credits_usage)
 *   UNITPAY_QUANTITY  how much usage to spend         (default: 2)
 */
import { UnitPay, ApiError } from "@unitpay/node";

const apiKey = process.env.UNITPAY_SECRET_KEY ?? process.env.UNITPAY_API_KEY;
const customerId = process.env.UNITPAY_CUSTOMER_ID;
const featureName = process.env.UNITPAY_FEATURE ?? "lovable_build_credits_usage";
const quantity = Number(process.env.UNITPAY_QUANTITY ?? 2);

if (!apiKey) {
  console.error("✗ Set UNITPAY_SECRET_KEY=upay_sk_...");
  process.exit(1);
}
if (!customerId) {
  console.error("✗ Set UNITPAY_CUSTOMER_ID=cus_... (the customer whose credits we spend)");
  process.exit(1);
}

const unitpay = new UnitPay({ apiKey, baseUrl: process.env.UNITPAY_BASE_URL || undefined });

async function readWallets() {
  const wallets = [];
  for await (const w of unitpay.customers.listCreditAccounts(customerId)) {
    wallets.push({ id: w.id, currencyId: w.currency?.slug ?? w.creditCurrencyId, balance: Number(w.balance) });
  }
  return wallets;
}

async function main() {
  console.log(`▶ Simulating ${quantity} × "${featureName}" for ${customerId}\n`);

  const before = await readWallets();
  const result = await unitpay.track([
    {
      customerId,
      eventName: featureName,
      quantity,
      idempotencyKey: `sim-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    },
  ]);
  const after = await readWallets();

  console.log(`track() → accepted ${result.accepted}, rejected ${result.rejected}\n`);

  let anyChange = false;
  for (const b of before) {
    const a = after.find((w) => w.id === b.id);
    const spent = b.balance - (a ? a.balance : b.balance);
    if (spent !== 0) anyChange = true;
    console.log(`  ${b.currencyId}: ${b.balance} → ${a ? a.balance : b.balance}  (spent ${spent})`);
  }

  if (result.rejected > 0) {
    console.log("\n⚠️  Event rejected — credits did NOT move.");
    process.exit(1);
  }
  console.log(anyChange ? "\n✅ Credits ARE being deducted." : "\n⚠️  Accepted but balance unchanged.");
}

main().catch((err) => {
  if (err instanceof ApiError) {
    console.error(`✗ ${err.constructor.name}: ${err.message} (status ${err.status ?? "?"})`);
  } else {
    console.error("✗ Unexpected error:", err?.message ?? err);
  }
  process.exit(1);
});
