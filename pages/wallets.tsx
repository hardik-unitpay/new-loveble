import { useEffect, useState } from "react";
import { UnitPayProvider, useCreditAccounts } from "@unitpay/react";

// Demo customer; in a real app this comes from your auth/session.
const CUSTOMER_ID = "cus_01kwgt3qt8f689ez1ekre217xw";
// Browser talks to the UnitPay API directly with a portal token (secret key never leaves the server).
const API_BASE_URL = process.env.NEXT_PUBLIC_UNITPAY_API_BASE_URL ?? "http://localhost:4000/v1";

function WalletList() {
  const { accounts, isLoading, error } = useCreditAccounts();

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading wallets…</p>;
  if (error) return <p className="text-sm text-destructive">Failed to load wallets: {String(error.message)}</p>;
  if (accounts.length === 0) return <p className="text-sm text-muted-foreground">No credit wallets yet.</p>;

  return (
    <div className="flex flex-col gap-2">
      {accounts.map((acct) => {
        const denom = acct.currency?.denomination ?? "unit";
        const label =
          denom === "unit"
            ? `${acct.balance.toLocaleString()} credits`
            : `${(acct.balance / 10 ** (acct.currency?.minorUnitScale ?? 2)).toFixed(
                acct.currency?.minorUnitScale ?? 2,
              )} ${denom.toUpperCase()}`;
        return (
          <div
            key={acct.id}
            className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
          >
            <span className="text-sm font-medium">{acct.currency?.name ?? acct.creditCurrencyId}</span>
            <span className="font-mono text-sm">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function WalletsPage() {
  const [token, setToken] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // Mint a portal-session token from our server route, then hand it to the provider.
  useEffect(() => {
    fetch("/api/portal-session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ customerId: CUSTOMER_ID }),
    })
      .then((r) => r.json())
      .then((d) => (d.token ? setToken(d.token) : setErr(d.error ?? "no token returned")))
      .catch((e) => setErr(e instanceof Error ? e.message : "request failed"));
  }, []);

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Wallets</h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Live customer balances via <code>@unitpay/react</code> — <code>useCreditAccounts()</code>.
      </p>

      {err ? (
        <p className="text-sm text-destructive">Portal session error: {err}</p>
      ) : !token ? (
        <p className="text-sm text-muted-foreground">Minting portal session…</p>
      ) : (
        <UnitPayProvider config={{ apiBaseUrl: API_BASE_URL, customerId: CUSTOMER_ID, portalToken: token }}>
          <WalletList />
        </UnitPayProvider>
      )}
    </div>
  );
}
