import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function GiftCardsSection() {
  return (
    <div className="flex items-start justify-between gap-6 rounded-xl border border-[var(--border-primary)] bg-background p-5 shadow-sm">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-[var(--fg-primary)]">Gift cards</h3>
          <p className="text-sm text-[var(--fg-tertiary)]">Send a gift card to your friends.</p>
        </div>
        <Link
          href="#"
          className="inline-flex items-center justify-center h-8 px-3.5 rounded-lg text-sm font-medium text-[var(--fg-primary)] border border-[var(--border-primary)] bg-background hover:bg-[oklch(0_0_0/0.04)] transition-colors shadow-sm w-fit"
        >
          See all gift cards
        </Link>
      </div>
      {/* Gift card illustration */}
      <div className="shrink-0 w-24 h-16 relative">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-rose-400 via-pink-500 to-violet-600 rotate-3 shadow-md" />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 -rotate-2 shadow-md flex items-center justify-center">
          <div className="text-white text-xs font-bold opacity-90 text-center leading-tight">
            <div className="text-[10px] uppercase tracking-widest opacity-60">Lovable</div>
            <div className="mt-0.5">Gift card</div>
          </div>
        </div>
      </div>
    </div>
  );
}
