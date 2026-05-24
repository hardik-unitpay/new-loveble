import { X, Check, Info } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { BillingData } from "./useBillingData";

interface Props {
  open: boolean;
  onClose: () => void;
  data?: BillingData;
}

function GiftCardIcon() {
  return (
    <div className="size-10 rounded-xl bg-gradient-to-br from-orange-300 to-rose-400 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white">
        <rect x="2" y="9" width="20" height="13" rx="2" stroke="white" strokeWidth="1.8" />
        <path d="M12 9V22" stroke="white" strokeWidth="1.8" />
        <path d="M2 13h20" stroke="white" strokeWidth="1.8" />
        <path d="M8 9C8 9 8 5 12 5C16 5 16 9 16 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 5C12 5 10 2 8 4C6 6 8 9 8 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 5C12 5 14 2 16 4C18 6 16 9 16 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function ManagePlanDialog({ open, onClose, data }: Props) {
  const planName = data?.plan.name ?? "Pro";
  const renewsAt = data?.plan.renewsAt ?? "Jun 20, 2026";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden rounded-2xl bg-background border-[var(--border-primary)]">
        {/* Header */}
        <div className="flex items-start justify-between p-5 pb-4">
          <div>
            <h2 className="text-base font-bold text-[var(--fg-primary)] leading-tight">Manage plan</h2>
            <p className="text-sm text-[var(--fg-tertiary)] mt-0.5">Subscription &amp; billing settings</p>
          </div>
          <button
            onClick={onClose}
            className="mt-0.5 text-[var(--fg-quaternary)] hover:text-[var(--fg-secondary)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-3 px-5 pb-5">
          {/* Current plan card */}
          <div className="rounded-xl border border-[var(--border-primary)] p-4">
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-xl bg-gradient-to-br from-orange-400 via-rose-500 to-violet-600 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                  <path
                    d="M10 17.5C10 17.5 2 12 2 7C2 4.8 3.8 3 6 3C7.6 3 9 3.9 10 5.2C11 3.9 12.4 3 14 3C16.2 3 18 4.8 18 7C18 12 10 17.5 10 17.5Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-[var(--fg-primary)]">
                  You&apos;re on {planName} plan
                </span>
                <p className="text-xs text-[var(--fg-tertiary)] mt-0.5">Renews {renewsAt}</p>
              </div>
              <button className="shrink-0 h-8 px-3 rounded-lg text-xs font-medium text-[var(--fg-primary)] bg-[oklch(0_0_0/0.08)] hover:bg-[oklch(0_0_0/0.12)] transition-colors border border-[var(--border-primary)]">
                Downgrade to free
              </button>
            </div>
            <div className="flex items-center gap-2 mt-3 text-sm text-[var(--fg-secondary)]">
              <Check className="w-3.5 h-3.5 shrink-0 text-[var(--fg-tertiary)]" strokeWidth={2.5} />
              <span>5 daily credits (up to 150/month)</span>
            </div>
          </div>

          {/* Gift card balance card */}
          <div className="rounded-xl border border-[var(--border-primary)] p-4">
            <div className="flex items-center gap-3">
              <GiftCardIcon />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--fg-primary)]">
                  Gift card balance:{" "}
                  <span className="font-normal text-[var(--fg-tertiary)]">No balance</span>
                </p>
                <p className="text-xs text-[var(--fg-tertiary)] mt-0.5">
                  Automatically applied to subscription payments
                </p>
              </div>
              <button className="shrink-0 h-8 px-3 rounded-lg text-xs font-medium text-[var(--fg-primary)] bg-[oklch(0_0_0/0.08)] hover:bg-[oklch(0_0_0/0.12)] transition-colors border border-[var(--border-primary)]">
                Redeem
              </button>
            </div>
          </div>

          {/* Coupon code link */}
          <div className="flex items-center gap-1.5 px-1">
            <Info className="w-3.5 h-3.5 text-[var(--fg-tertiary)]" />
            <button className="text-sm text-[var(--fg-tertiary)] hover:text-[var(--fg-secondary)] transition-colors">
              Have a coupon code?
            </button>
          </div>

          {/* Bottom action buttons */}
          <div className="flex gap-2 mt-1">
            <button className="flex-1 h-10 rounded-xl text-sm font-medium text-white bg-[oklch(28%_0.16_264)] hover:bg-[oklch(32%_0.16_264)] transition-colors">
              Edit billing information
            </button>
            <button className="flex-1 h-10 rounded-xl text-sm font-medium text-white bg-[oklch(28%_0.16_264)] hover:bg-[oklch(32%_0.16_264)] transition-colors">
              Invoices &amp; payments
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
