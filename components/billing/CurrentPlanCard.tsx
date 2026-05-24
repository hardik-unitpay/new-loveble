import { Check, Info } from "lucide-react";
import { LovableLogo } from "./LovableLogo";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import type { BillingData } from "./useBillingData";

interface Props {
  data?: BillingData;
  isLoading: boolean;
  onManage: () => void;
  onTopUp: () => void;
}

export function CurrentPlanCard({ data, isLoading, onManage, onTopUp }: Props) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 rounded-xl border border-[var(--muted-active)] bg-muted p-4 shadow-xs">
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
    <div className="flex flex-col gap-4 rounded-xl border border-[var(--muted-active)] bg-muted p-4 shadow-xs">
      <div className="flex items-start gap-3">
        <LovableLogo className="shrink-0 size-11 p-1" />
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
          style={{ color: "var(--fg-primary)", borderColor: "var(--muted-active)", background: "transparent" }}
          onMouseOver={(e) => (e.currentTarget.style.background = "var(--hover-bg)")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Manage
        </button>
        <button
          onClick={onTopUp}
          className="inline-flex items-center justify-center h-7 px-[9px] py-1 rounded-lg text-sm font-normal border transition-colors"
          style={{ color: "var(--fg-primary)", borderColor: "var(--muted-active)", background: "transparent" }}
          onMouseOver={(e) => (e.currentTarget.style.background = "var(--hover-bg)")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Top up credits
        </button>
      </div>
    </div>
  );
}
