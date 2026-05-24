import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function GiftCardsSection() {
  return (
    <div className="flex items-start justify-between gap-6 rounded-xl border border-[var(--muted-active)] bg-muted p-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-[var(--fg-primary)]">Gift cards</h3>
          <p className="text-sm text-[var(--fg-tertiary)]">Send a gift card to your friends.</p>
        </div>
        <Link
          href="#"
          className="inline-flex items-center justify-center h-7 px-[9px] py-1 rounded-lg text-sm font-normal text-[var(--fg-primary)] border border-[var(--muted-active)] bg-transparent hover:bg-[var(--hover-bg)] transition-colors w-fit"
        >
          See all gift cards
        </Link>
      </div>
      {/* Gift card illustration */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://lovable.dev/gift-cards/stack-v2.svg"
        alt="Gift cards"
        width={144}
        height={93}
        className="shrink-0 object-contain"
      />
    </div>
  );
}
