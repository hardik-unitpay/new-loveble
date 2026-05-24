import Link from "next/link";

function SecurityBadge({ label, sublabel }: { label: string; sublabel?: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-[var(--fg-primary)] text-white">
      <span className="text-[9px] font-bold uppercase tracking-tight leading-tight text-center px-1">
        {label}
      </span>
      {sublabel && (
        <span className="text-[7px] uppercase tracking-widest opacity-70 mt-0.5">{sublabel}</span>
      )}
    </div>
  );
}

export function SecuritySection() {
  return (
    <div className="flex items-center justify-between gap-6 rounded-xl border border-[var(--border-primary)] bg-muted p-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-[var(--fg-primary)]">Security and compliance</h3>
        <p className="text-sm text-[var(--fg-tertiary)]">
          Enterprise-grade security and compliance certifications
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <SecurityBadge label="SOC 2" sublabel="TYPE II" />
        <SecurityBadge label="GDPR" sublabel="★ ★ ★" />
        <SecurityBadge label="ISO 27001" />
      </div>

      <Link
        href="#"
        className="shrink-0 inline-flex items-center justify-center h-7 px-[9px] py-1 rounded-lg text-sm font-normal text-[var(--fg-primary)] border border-[var(--border-primary)] bg-transparent hover:bg-[oklch(0_0_0/0.04)] transition-colors"
      >
        Learn more
      </Link>
    </div>
  );
}
