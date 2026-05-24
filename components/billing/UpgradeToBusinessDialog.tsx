import { Check, X } from "lucide-react";
import { LovableLogo } from "./LovableLogo";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BILLING_ITEMS = [
  "Your plan will update to $50 / month for 100 credits",
  "Downgrade anytime",
  "Credits rollover",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UpgradeToBusinessDialog({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm p-0 gap-0 overflow-hidden rounded-2xl bg-background border-[var(--border-primary)]">
        {/* Header */}
        <div className="flex items-start gap-3 p-5 pb-4">
          <LovableLogo className="shrink-0 size-10" />
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-[var(--fg-primary)] leading-tight">Upgrade to Business</h2>
            <p className="text-sm text-[var(--fg-tertiary)] mt-0.5">Here&apos;s what happens if you upgrade:</p>
          </div>
          <button
            onClick={onClose}
            className="mt-0.5 text-[var(--fg-quaternary)] hover:text-[var(--fg-secondary)] transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Upgrade Fee card */}
        <div className="px-5 pb-4">
          <div className="rounded-xl border border-[var(--border-primary)] p-4">
            <p className="text-xs font-semibold text-[var(--fg-tertiary)] mb-2">Upgrade Fee</p>
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="text-2xl font-bold text-[var(--fg-primary)]">$25</span>
              <span className="text-sm text-[var(--fg-tertiary)]">due today</span>
            </div>
            <Select defaultValue="workspace_1">
              <SelectTrigger className="h-9 text-sm bg-background border-[var(--border-primary)]">
                <SelectValue>Vijay&apos;s Lovable</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workspace_1">Vijay&apos;s Lovable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* What's changing */}
        <div className="px-5 pb-4">
          <p className="text-sm font-semibold text-[var(--fg-primary)] mb-1">What&apos;s changing?</p>
          <p className="text-sm text-[var(--fg-tertiary)] leading-snug">
            You are unlocking all business features but your credits will stay the same
          </p>
        </div>

        {/* Billing cycle + checkmarks */}
        <div className="px-5 pb-5">
          <p className="text-xs text-[var(--fg-tertiary)] mb-3">Next billing cycle (Jun 20th 2026)</p>
          <div className="flex flex-col gap-2">
            {BILLING_ITEMS.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Check className="w-4 h-4 shrink-0 mt-0.5 text-[var(--fg-primary)]" strokeWidth={2.5} />
                <span className="text-sm text-[var(--fg-secondary)]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 px-5 pb-5">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl text-sm font-medium text-[var(--fg-primary)] border border-[var(--border-primary)] bg-[var(--bg-tertiary)] hover:bg-[var(--bg-quaternary)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl text-sm font-medium text-[var(--fg-primary)] border border-[var(--border-primary)] bg-background hover:bg-[var(--hover-bg)] transition-colors"
          >
            Upgrade
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
