import { useState } from "react";
import { Check, Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PLAN_CREDITS_OPTIONS } from "./useBillingData";
import { cn } from "@/lib/utils";

interface Feature {
  label: string;
  tooltip?: string;
}

interface PlanCardProps {
  name: string;
  description: string;
  price: string | null;
  priceNote?: string;
  isCurrentPlan?: boolean;
  features: Feature[];
  featuresLabel: string;
  defaultCredits?: string;
  buttonLabel: string;
  buttonVariant?: "primary" | "outline" | "ghost";
  onAction: () => void;
}

export function PlanCard({
  name,
  description,
  price,
  priceNote,
  isCurrentPlan,
  features,
  featuresLabel,
  defaultCredits,
  buttonLabel,
  buttonVariant = "outline",
  onAction,
}: PlanCardProps) {
  const [annual, setAnnual] = useState(false);
  const [credits, setCredits] = useState(defaultCredits ?? "200");

  const annualPrice = price ? Math.round(parseInt(price) * 0.83) : null;
  const displayPrice = annual && annualPrice ? String(annualPrice) : price;

  return (
    <div className={cn(
      "flex flex-col gap-4 rounded-xl border border-[var(--muted-active)] p-4 pb-6",
      buttonVariant === "primary" ? "bg-muted" : "bg-transparent"
    )}>
      {/* Plan header */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-semibold text-[var(--fg-primary)]">{name}</h3>
        <p className="text-sm text-[var(--fg-tertiary)] leading-snug">{description}</p>
      </div>

      {/* Pricing */}
      <div className="flex flex-col gap-1">
        {displayPrice ? (
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-bold text-[var(--fg-primary)] tabular-nums">
              ${displayPrice}
            </span>
            <span className="text-sm text-[var(--fg-tertiary)]">per month</span>
          </div>
        ) : (
          <div className="text-4xl font-bold text-[var(--fg-primary)]">Platform fee</div>
        )}
        {priceNote && (
          <p className="text-xs text-[var(--fg-tertiary)]">{priceNote}</p>
        )}
      </div>

      {/* Annual toggle (only for paid plans) */}
      {price && (
        <div className="flex items-center gap-2">
          <Switch
            checked={annual}
            onCheckedChange={setAnnual}
            className="data-[checked]:bg-[var(--accent-primary)] data-[unchecked]:bg-[oklch(56.74%_0.009_106.68/0.2)]"
          />
          <span className="text-sm text-[var(--fg-secondary)]">Annual</span>
          {annual && (
            <span className="rounded-full bg-green-900/30 px-2 py-0.5 text-xs font-medium text-green-400">
              Save 17%
            </span>
          )}
        </div>
      )}

      {/* CTA Button */}
      <PlanButton variant={buttonVariant} label={buttonLabel} isCurrent={isCurrentPlan} onClick={onAction} />

      {/* Credits selector (only for plans with credits option) */}
      {defaultCredits && (
        <Select value={credits} onValueChange={(v) => v && setCredits(v)}>
          <SelectTrigger className="w-full h-8 text-sm !bg-transparent border border-[var(--fg-quaternary)]">
            <SelectValue>{PLAN_CREDITS_OPTIONS.find((o) => o.value === credits)?.label}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {PLAN_CREDITS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Features */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-[var(--fg-tertiary)]">{featuresLabel}</p>
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-[var(--fg-secondary)]">
            <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[var(--fg-tertiary)]" strokeWidth={2.5} />
            <span className="leading-snug">{feature.label}</span>
            {feature.tooltip && (
              <Tooltip>
                <TooltipTrigger className="text-[var(--fg-quaternary)] hover:text-[var(--fg-tertiary)] transition-colors mt-0.5 shrink-0">
                  <Info className="w-3 h-3" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[220px] text-xs">
                  {feature.tooltip}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface PlanButtonProps {
  variant: "primary" | "outline" | "ghost";
  label: string;
  isCurrent?: boolean;
  onClick: () => void;
}

function PlanButton({ variant, label, isCurrent, onClick }: PlanButtonProps) {
  if (variant === "primary") {
    return (
      <button
        onClick={onClick}
        className="w-full h-9 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 active:opacity-80"
        style={{ background: "oklch(58.99% .2523 294.88)" }}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full h-9 rounded-lg text-sm font-medium transition-colors border",
        "border-[var(--muted-active)] bg-transparent text-[var(--fg-primary)]",
        "hover:bg-[var(--hover-bg)]"
      )}
    >
      {label}
    </button>
  );
}
