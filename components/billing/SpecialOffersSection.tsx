import Link from "next/link";

interface OfferCard {
  title: string;
  description: string;
  actionLabel: string;
  href: string;
}

const offers: OfferCard[] = [
  {
    title: "Lovable for students",
    description: "Verify student status and get access to up to 50% off Lovable Pro.",
    actionLabel: "Get started",
    href: "#",
  },
  {
    title: "Lovable for campus",
    description: "Billing and administrative controls for universities and colleges.",
    actionLabel: "Contact sales",
    href: "#",
  },
  {
    title: "Lovable for kids",
    description: "Compliant access & curriculum for schools in partnership with imagi.",
    actionLabel: "Learn more",
    href: "#",
  },
];

export function SpecialOffersSection() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {offers.map((offer) => (
        <div
          key={offer.title}
          className="flex flex-col gap-4 rounded-xl border border-[var(--border-primary)] bg-muted p-4"
        >
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-semibold text-[var(--fg-primary)]">{offer.title}</h3>
            <p className="text-sm text-[var(--fg-tertiary)] leading-snug">{offer.description}</p>
          </div>
          <Link
            href={offer.href}
            className="inline-flex items-center justify-center h-9 w-full rounded-lg text-sm font-normal text-[var(--fg-primary)] border border-[var(--border-primary)] bg-transparent hover:bg-[oklch(0_0_0/0.04)] transition-colors"
          >
            {offer.actionLabel}
          </Link>
        </div>
      ))}
    </div>
  );
}
