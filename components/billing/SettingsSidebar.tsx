import Link from "next/link";
import { useRouter } from "next/router";
import {
  User,
  Smartphone,
  LayoutGrid,
  Cloud,
  Users,
  BookOpen,
  Zap,
  GitBranch,
  Globe,
  Shield,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const ConnectorIcons = () => (
  <div className="flex items-center gap-1 flex-wrap">
    {[
      { bg: "bg-[#4A154B]", label: "S" },
      { bg: "bg-[#5865F2]", label: "D" },
      { bg: "bg-[#96BF48]", label: "Sh" },
      { bg: "bg-[#1a1a1a]", label: "P" },
      { bg: "bg-[#1DA1F2]", label: "T" },
      { bg: "bg-[#FF6D00]", label: "G" },
    ].map(({ bg, label }, i) => (
      <div key={i} className={cn("w-[22px] h-[22px] rounded-md flex items-center justify-center text-white text-[9px] font-bold", bg)}>
        {label[0]}
      </div>
    ))}
  </div>
);

export function SettingsSidebar() {
  const router = useRouter();
  const currentPath = router.pathname;

  const sections: NavSection[] = [
    {
      title: "Account",
      items: [
        { label: "Your account", href: "/settings/account", icon: <User className="w-4 h-4" /> },
        { label: "Devices & apps", href: "/settings/devices", icon: <Smartphone className="w-4 h-4" /> },
      ],
    },
    {
      title: "Workspace",
      items: [
        {
          label: "Vijay's Lovable",
          href: "/settings/workspace",
          icon: (
            <span className="flex size-4 items-center justify-center rounded-sm bg-[oklch(47%_0.18_264)] text-[8px] font-bold text-white shrink-0">
              V
            </span>
          ),
        },
        {
          label: "Plans & credits",
          href: "/settings/billing",
          icon: <LayoutGrid className="w-4 h-4" />,
        },
        {
          label: "Cloud & AI balance",
          href: "/settings/cloud",
          icon: <Cloud className="w-4 h-4" />,
        },
      ],
    },
    {
      title: "Members & access",
      items: [
        { label: "People", href: "/settings/people", icon: <Users className="w-4 h-4" /> },
      ],
    },
    {
      title: "Customization",
      items: [
        { label: "Knowledge", href: "/settings/knowledge", icon: <BookOpen className="w-4 h-4" /> },
        { label: "Skills", href: "/settings/skills", icon: <Zap className="w-4 h-4" /> },
      ],
    },
    {
      title: "Build & deploy",
      items: [
        { label: "Git", href: "/settings/git", icon: <GitBranch className="w-4 h-4" /> },
        { label: "Workspace domains", href: "/settings/domains", icon: <Globe className="w-4 h-4" /> },
      ],
    },
    {
      title: "Security & compliance",
      items: [
        { label: "Privacy & security", href: "/settings/security", icon: <Shield className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <div
      className="flex h-screen w-[240px] shrink-0 flex-col overflow-y-auto sticky top-0"
      style={{ background: "var(--card)" }}
    >
      {/* Back link */}
      <div className="px-4 pt-4 pb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium"
          style={{ color: "var(--fg-secondary)" }}
        >
          <ChevronLeft className="w-4 h-4" />
          Go back
        </Link>
      </div>

      {/* Navigation sections */}
      <nav className="flex flex-col gap-0 px-2 flex-1 py-1">
        {sections.map((section) => (
          <div key={section.title} className="mb-2">
            <p className="px-2 py-1 text-xs font-medium tracking-wide" style={{ color: "var(--fg-quaternary)" }}>
              {section.title}
            </p>
            {section.items.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors",
                    isActive
                      ? "font-medium"
                      : "hover:bg-[var(--hover-bg)]"
                  )}
                  style={{
                    background: isActive ? "var(--active-bg)" : undefined,
                    color: isActive ? "var(--fg-primary)" : "var(--fg-secondary)",
                  }}
                >
                  <span style={{ color: isActive ? "var(--fg-primary)" : "var(--fg-tertiary)" }}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Connectors banner — pinned to bottom */}
      <div className="mx-2 mb-3 rounded-xl border p-3" style={{ borderColor: "var(--border-primary)", background: "var(--bg-primary)" }}>
        <ConnectorIcons />
        <p className="mt-2 text-xs font-semibold" style={{ color: "var(--fg-primary)" }}>
          Connectors have moved
        </p>
        <p className="mt-0.5 text-xs leading-snug" style={{ color: "var(--fg-tertiary)" }}>
          Find the new connector experience on the homepage.
        </p>
      </div>
    </div>
  );
}
