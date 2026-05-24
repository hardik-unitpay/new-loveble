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
      <div className="flex flex-col gap-4 rounded-xl border border-[var(--border-primary)] bg-muted p-4 shadow-xs">
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
    <div className="flex flex-col gap-4 rounded-xl border border-[var(--border-primary)] bg-muted p-4 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[var(--fg-primary)]">Credits remaining</span>
        <span className="text-2xl font-bold tabular-nums text-[var(--fg-primary)]">
          {credits.total}
        </span>
      </div>

      {/* Segmented progress bar with dot cap */}
      <div className="relative h-[8px] w-full flex items-center">
        {/* Track */}
        <div className="absolute inset-0 rounded-full" style={{ background: "oklch(0 0 0 / 0.08)" }} />
        {/* Monthly segment (dark navy) */}
        <div
          className="absolute h-[6px]"
          style={{
            width: `${monthlyPct}%`,
            background: "oklch(28% 0.16 264)",
            borderRadius: "999px 0 0 999px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        {/* Extra segment (bright blue) */}
        <div
          className="absolute h-[6px]"
          style={{
            left: `calc(${monthlyPct}% + 2px)`,
            right: "4px",
            background: "oklch(52.43% .2396 264.41)",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        {/* Dot at the end */}
        <div
          className="absolute w-[8px] h-[8px] rounded-full"
          style={{ right: 0, background: "oklch(52.43% .2396 264.41)" }}
        />
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
        <span className="text-xs text-[var(--fg-tertiary)] truncate">{subtitle}</span>
      </div>
      <span className="text-sm tabular-nums text-[var(--fg-secondary)] shrink-0">{amount}</span>
    </div>
  );
}
