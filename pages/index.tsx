import Link from "next/link";
import { CreditCard, Coins, Wallet, ArrowRight } from "lucide-react";

const CARDS = [
  {
    href: "/settings/billing",
    icon: <CreditCard className="h-5 w-5" />,
    title: "Billing",
    body: "The Lovable-style plans & credits page — the billing clone UI.",
  },
  {
    href: "/simulate-credits",
    icon: <Coins className="h-5 w-5" />,
    title: "Simulate Credits",
    body: "Track a usage event and watch credits get deducted. Uses the @unitpay/node server SDK.",
  },
  {
    href: "/wallets",
    icon: <Wallet className="h-5 w-5" />,
    title: "Wallets",
    body: "Live customer credit balances rendered with the @unitpay/react frontend SDK.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-8 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Lovable Billing — UnitPay demo</h1>
      <p className="mt-2 text-muted-foreground">
        A billing clone wired to UnitPay. Pick a page from the sidebar, or start below.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group flex flex-col gap-2 rounded-xl border border-border p-5 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-2 text-foreground">
              {c.icon}
              <span className="font-medium">{c.title}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-sm text-muted-foreground">{c.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
