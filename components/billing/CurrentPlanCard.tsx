import { Check, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import type { BillingData } from "./useBillingData";

interface Props {
  data?: BillingData;
  isLoading: boolean;
  onManage: () => void;
  onTopUp: () => void;
}

function LovableLogo() {
  return (
    <svg
      role="img"
      aria-label="Lovable"
      viewBox="0 0 23 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-11 shrink-0 p-1"
    >
      <defs>
        <linearGradient id="logo-gradient-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#7C5AF5" />
        </linearGradient>
        <linearGradient id="logo-gradient-2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF8E53" />
          <stop offset="100%" stopColor="#7C5AF5" />
        </linearGradient>
      </defs>
      {/* Heart shape approximation */}
      <path
        d="M11.5 20.5C11.5 20.5 2 14.5 2 8C2 5.2 4.2 3 7 3C8.9 3 10.6 4 11.5 5.5C12.4 4 14.1 3 16 3C18.8 3 21 5.2 21 8C21 14.5 11.5 20.5 11.5 20.5Z"
        fill="url(#logo-gradient-1)"
      />
    </svg>
  );
}

export function CurrentPlanCard({ data, isLoading, onManage, onTopUp }: Props) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 rounded-xl border border-[var(--border-primary)] bg-muted p-4 shadow-xs">
        <div className="flex items-start gap-4">
          <Skeleton className="size-11 rounded-lg" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-32 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[var(--border-primary)] bg-muted p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="size-11 rounded-xl bg-gradient-to-br from-orange-400 via-rose-500 to-violet-600 p-1 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M10 17.5C10 17.5 2 12 2 7C2 4.8 3.8 3 6 3C7.6 3 9 3.9 10 5.2C11 3.9 12.4 3 14 3C16.2 3 18 4.8 18 7C18 12 10 17.5 10 17.5Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-[var(--fg-primary)]">
            You&apos;re on {data.plan.name} plan
          </span>
          <span className="text-xs text-[var(--fg-tertiary)]">
            Renews {data.plan.renewsAt}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        {data.plan.features.map((feature, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-[var(--fg-secondary)]">
            <Check className="w-3.5 h-3.5 shrink-0 text-[var(--fg-tertiary)]" strokeWidth={2.5} />
            <span>{feature.label}</span>
            {feature.tooltip && (
              <Tooltip>
                <TooltipTrigger
                  className="ml-0.5 text-[var(--fg-quaternary)] hover:text-[var(--fg-tertiary)] transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[240px] text-xs">
                  {feature.tooltip}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onManage}
          className="inline-flex items-center justify-center h-7 px-[9px] py-1 rounded-lg text-sm font-normal border transition-colors"
          style={{ color: "var(--fg-primary)", borderColor: "var(--border-primary)", background: "transparent" }}
          onMouseOver={(e) => (e.currentTarget.style.background = "oklch(0 0 0 / 0.04)")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Manage
        </button>
        <button
          onClick={onTopUp}
          className="inline-flex items-center justify-center h-7 px-[9px] py-1 rounded-lg text-sm font-normal border transition-colors"
          style={{ color: "var(--fg-primary)", borderColor: "var(--border-primary)", background: "transparent" }}
          onMouseOver={(e) => (e.currentTarget.style.background = "oklch(0 0 0 / 0.04)")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Top up credits
        </button>
      </div>
    </div>
  );
}
