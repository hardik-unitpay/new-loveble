import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import type { BillingData } from "./useBillingData";

interface Props {
  data?: BillingData;
  isLoading: boolean;
}

export function CreditsRemainingCard({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 rounded-xl border border-[var(--muted-active)] bg-muted p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-7 w-12" />
        </div>
        <Skeleton className="h-1.5 w-full rounded-full" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-36" />
              </div>
              <Skeleton className="h-5 w-10" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { credits } = data;
  const monthlyPct = (credits.monthly.amount / credits.total) * 100;
  const extraPct = (credits.extra.amount / credits.total) * 100;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[var(--muted-active)] bg-muted p-4 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[var(--fg-primary)]">Credits remaining</span>
        <span className="text-2xl font-bold tabular-nums text-[var(--fg-primary)]">
          {credits.total}
        </span>
      </div>

      {/* Segmented progress bar — 3 segments, 11px height, matches original */}
      <div className="relative w-full overflow-hidden rounded-lg" style={{ height: "11px", background: "var(--track-bg)" }}>
        {/* Monthly segment */}
        <div
          className="absolute h-full transition-all"
          style={{
            left: "0%",
            width: `${monthlyPct}%`,
            background: "oklch(61.32% 0.2106 264.41)",
            borderRadius: "8px 0 0 8px",
          }}
        />
        {/* Extra segment */}
        <div
          className="absolute h-full transition-all"
          style={{
            left: `calc(${monthlyPct}% + 2px)`,
            width: `${extraPct}%`,
            background: "oklch(70.62% 0.1391 264.41)",
          }}
        />
        {/* Daily / remaining tiny segment */}
        {credits.daily.amount > 0 && (
          <div
            className="absolute h-full transition-all"
            style={{
              right: "0%",
              width: `${(credits.daily.amount / credits.total) * 100}%`,
              background: "oklch(78% 0.09 264.41)",
              borderRadius: "0 8px 8px 0",
            }}
          />
        )}
      </div>

      {/* Credit rows */}
      <div className="flex flex-col gap-3">
        <CreditRow
          label="Daily credits"
          subtitle={`Resets to ${credits.daily.amount} credits in ${credits.daily.resetsIn}`}
          amount={credits.daily.amount}
        />
        <CreditRow
          label="Monthly credits"
          subtitle={`Resets to ${credits.monthly.amount} in ${credits.monthly.resetsIn}`}
          amount={credits.monthly.amount}
        />
        <CreditRow
          label="Extra credits"
          subtitle={`${credits.extra.rolloverAmount} rollover credits expire in ${credits.extra.expiresIn}`}
          amount={credits.extra.amount}
          tooltip="Rollover credits from previous months that will expire if unused"
        />
      </div>
    </div>
  );
}

interface CreditRowProps {
  label: string;
  subtitle: string;
  amount: number;
  tooltip?: string;
}

function CreditRow({ label, subtitle, amount, tooltip }: CreditRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-0.5 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-[var(--fg-primary)]">{label}</span>
          {tooltip && (
            <Tooltip>
              <TooltipTrigger className="text-[var(--fg-quaternary)] hover:text-[var(--fg-tertiary)] transition-colors">
                <Info className="w-3.5 h-3.5" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[240px] text-xs">{tooltip}</TooltipContent>
            </Tooltip>
          )}
        </div>
        <span className="text-xs text-muted-foreground-subtle truncate">{subtitle}</span>
      </div>
      <span className="text-sm tabular-nums text-muted-foreground shrink-0">{amount}</span>
    </div>
  );
}
