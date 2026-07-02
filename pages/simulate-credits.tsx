import { useState } from "react";
import { Button } from "@/components/ui/button";

type DeltaRow = { currencyId: string; before: number; after: number; spent: number };
type Result =
  | {
      ok: true;
      accepted: number;
      rejected: number;
      delta: DeltaRow[];
    }
  | { ok: false; error: string };

export default function SimulateCredits() {
  const [customerId, setCustomerId] = useState("cus_01kwgt3qt8f689ez1ekre217xw");
  const [eventName, setEventName] = useState("lovable_build_credits_usage");
  const [quantity, setQuantity] = useState(2);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function simulate() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/simulate-credits", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ customerId, eventName, quantity }),
      });
      setResult(await res.json());
    } catch (err) {
      setResult({ ok: false, error: err instanceof Error ? err.message : "Request failed" });
    } finally {
      setLoading(false);
    }
  }

  const anySpent = result?.ok && result.delta.some((d) => d.spent !== 0);

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col gap-6 px-6 py-16">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Simulate credits</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track a usage event and watch the customer&apos;s credit balance change.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-border p-5">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Customer ID
          <input
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="cus_123"
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm font-normal outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Event / feature
          <input
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="lovable_build_credits_usage"
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm font-normal outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Quantity
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm font-normal outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </label>

        <Button size="lg" onClick={simulate} disabled={loading || !customerId}>
          {loading ? "Simulating…" : "Simulate credits"}
        </Button>
      </div>

      {result && (
        <div className="rounded-xl border border-border p-5 text-sm">
          {result.ok ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="font-medium">Result:</span>
                <span>
                  accepted {result.accepted}, rejected {result.rejected}
                </span>
              </div>

              {result.delta.length === 0 ? (
                <p className="text-muted-foreground">No credit wallets found for this customer.</p>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {result.delta.map((d) => (
                    <div key={d.currencyId} className="flex justify-between font-mono text-xs">
                      <span>{d.currencyId}</span>
                      <span>
                        {d.before} → {d.after}{" "}
                        <span className={d.spent > 0 ? "text-emerald-600" : "text-muted-foreground"}>
                          (spent {d.spent})
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <p className={anySpent ? "font-medium text-emerald-600" : "text-amber-600"}>
                {result.rejected > 0
                  ? "⚠️ Event rejected — no credits moved."
                  : anySpent
                    ? "✅ Credits are being deducted."
                    : "⚠️ Accepted, but balance unchanged — check the feature maps to a credit cost."}
              </p>
            </div>
          ) : (
            <p className="text-destructive">✗ {result.error}</p>
          )}
        </div>
      )}
    </div>
  );
}
