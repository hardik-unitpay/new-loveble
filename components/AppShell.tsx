import Link from "next/link";
import { useRouter } from "next/router";
import { LayoutDashboard, CreditCard, Coins, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  desc: string;
  /** also mark active when the path starts with this prefix */
  match?: string;
};

const NAV: NavItem[] = [
  { label: "Overview", href: "/", icon: <LayoutDashboard className="h-4 w-4" />, desc: "Start here" },
  {
    label: "Billing",
    href: "/settings/billing",
    icon: <CreditCard className="h-4 w-4" />,
    desc: "Plans & credits (the clone)",
    match: "/settings",
  },
  {
    label: "Simulate Credits",
    href: "/simulate-credits",
    icon: <Coins className="h-4 w-4" />,
    desc: "Spend credits (server SDK)",
  },
  {
    label: "Wallets",
    href: "/wallets",
    icon: <Wallet className="h-4 w-4" />,
    desc: "Live balances (frontend SDK)",
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-border bg-card">
        <div className="px-5 py-5">
          <p className="text-sm font-semibold tracking-tight">Lovable Billing</p>
          <p className="text-xs text-muted-foreground">UnitPay demo</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {NAV.map((item) => {
            const active = item.match ? pathname.startsWith(item.match) : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-start gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <span className="mt-0.5">{item.icon}</span>
                <span className="flex flex-col leading-tight">
                  <span>{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.desc}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        <p className="px-5 py-4 text-xs text-muted-foreground">Powered by UnitPay</p>
      </aside>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
