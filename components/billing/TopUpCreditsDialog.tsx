import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { UPGRADE_CREDITS_OPTIONS, TOP_UP_OPTIONS } from "./useBillingData";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Tab = "upgrade" | "topup";

export function TopUpCreditsDialog({ open, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("upgrade");
  const [upgradeCredits, setUpgradeCredits] = useState("100");
  const [topupCredits, setTopupCredits] = useState("100");

  const isUpgrade = tab === "upgrade";

  const handleAction = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm p-0 gap-0 overflow-hidden rounded-2xl bg-background border-[var(--border-primary)]">
        {/* Logo header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="size-12 rounded-xl bg-gradient-to-br from-orange-400 via-rose-500 to-violet-600 flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
              <path
                d="M10 17.5C10 17.5 2 12 2 7C2 4.8 3.8 3 6 3C7.6 3 9 3.9 10 5.2C11 3.9 12.4 3 14 3C16.2 3 18 4.8 18 7C18 12 10 17.5 10 17.5Z"
                fill="white"
              />
            </svg>
          </div>
          <button
            onClick={onClose}
            className="mt-1 text-[var(--fg-quaternary)] hover:text-[var(--fg-secondary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="px-6 pb-4 text-center">
          <DialogTitle className="text-2xl font-bold text-[var(--fg-primary)]">
            Add more credits
          </DialogTitle>
          <p className="mt-1.5 text-sm text-[var(--fg-tertiary)]">
            Upgrade your plan for better value, or top up credits one time.
          </p>
        </div>

        {/* Options */}
        <div className="px-4 pb-4 flex flex-col gap-2.5">
          {/* Upgrade your plan radio */}
          <RadioCard
            selected={isUpgrade}
            onClick={() => setTab("upgrade")}
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-semibold text-[var(--fg-primary)]">Upgrade your plan</h4>
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center justify-between text-xs text-[var(--fg-tertiary)]">
                <span>Current plan</span>
                <span>100 credits/mo · $25/mo</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--fg-tertiary)]">
                <span>Upgrade to</span>
                <span>200 credits/mo · $50/mo</span>
              </div>
            </div>

            <p className="mt-2 text-xs text-[var(--fg-tertiary)]">
              Next billing cycle Jun 20th 2026
            </p>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold text-[var(--fg-primary)]">$25</span>
                <span className="text-sm text-[var(--fg-tertiary)]">due today</span>
              </div>
              <span className="rounded-full bg-green-700/20 px-2.5 py-0.5 text-xs font-medium text-green-600">
                Subscribe &amp; save 17%
              </span>
            </div>

            <div className="mt-3">
              <Select value={upgradeCredits} onValueChange={(v) => v && setUpgradeCredits(v)}>
                <SelectTrigger className="h-9 text-sm bg-[oklch(0_0_0/0.04)] border-[var(--border-primary)]">
                  <SelectValue>{UPGRADE_CREDITS_OPTIONS.find((o) => o.value === upgradeCredits)?.label}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {UPGRADE_CREDITS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </RadioCard>

          {/* Top up radio */}
          <RadioCard
            selected={!isUpgrade}
            onClick={() => setTab("topup")}
          >
            <h4 className="text-sm font-semibold text-[var(--fg-primary)]">Top up credits</h4>
            <p className="mt-1 text-xs text-[var(--fg-tertiary)]">
              Purchase credits on demand. Valid for 12 months.
            </p>

            <div className="mt-3">
              <Select value={topupCredits} onValueChange={(v) => v && setTopupCredits(v)}>
                <SelectTrigger className="h-9 text-sm bg-[oklch(0_0_0/0.04)] border-[var(--border-primary)]">
                  <SelectValue>{TOP_UP_OPTIONS.find((o) => o.value === topupCredits)?.label}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {TOP_UP_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </RadioCard>
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-2 px-4 pb-5">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl text-sm font-medium text-[var(--fg-primary)] border border-[var(--border-primary)] bg-[oklch(0_0_0/0.06)] hover:bg-[oklch(0_0_0/0.09)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAction}
            className="flex-1 h-10 rounded-xl text-sm font-medium text-[var(--fg-primary)] border border-[var(--border-primary)] bg-background hover:bg-[oklch(0_0_0/0.04)] transition-colors"
          >
            {isUpgrade ? "Upgrade plan" : "Buy credits"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface RadioCardProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function RadioCard({ selected, onClick, children }: RadioCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative cursor-pointer rounded-xl border p-4 transition-colors",
        selected
          ? "border-[var(--fg-primary)] bg-[oklch(0_0_0/0.03)]"
          : "border-[var(--border-primary)] hover:border-[oklch(60%_0_107)]"
      )}
    >
      {/* Radio indicator */}
      <div
        className={cn(
          "absolute right-4 top-4 w-5 h-5 rounded-full border-2 flex items-center justify-center",
          selected
            ? "border-[var(--fg-primary)] bg-[var(--fg-primary)]"
            : "border-[var(--border-primary)]"
        )}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
      {children}
    </div>
  );
}
