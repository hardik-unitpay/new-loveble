import { useState } from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useBillingData } from "@/components/billing/useBillingData";
import { SettingsSidebar } from "@/components/billing/SettingsSidebar";
import { CurrentPlanCard } from "@/components/billing/CurrentPlanCard";
import { CreditsRemainingCard } from "@/components/billing/CreditsRemainingCard";
import { PlanCard } from "@/components/billing/PlanCard";
import { TopUpCreditsDialog } from "@/components/billing/TopUpCreditsDialog";
import { ManagePlanDialog } from "@/components/billing/ManagePlanDialog";
import { UpgradeCreditsDialog } from "@/components/billing/UpgradeCreditsDialog";
import { UpgradeToBusinessDialog } from "@/components/billing/UpgradeToBusinessDialog";
import { GiftCardsSection } from "@/components/billing/GiftCardsSection";
import { SpecialOffersSection } from "@/components/billing/SpecialOffersSection";
import { SecuritySection } from "@/components/billing/SecuritySection";

const PRO_FEATURES = [
  { label: "200 monthly credits", tooltip: "200 credits per month + 5 daily credits that reset each day" },
  { label: "5 daily credits (up to 150/month)" },
  { label: "Usage-based Cloud + AI", tooltip: "Pay for cloud compute and AI model usage beyond your plan" },
  { label: "Credit rollovers", tooltip: "Unused credits roll over to the next month" },
  { label: "On-demand credit top-ups" },
  { label: "Unlimited lovable.app domains" },
  { label: "Custom domains" },
  { label: "Remove the Lovable badge" },
  { label: "User roles & permissions" },
];

const BUSINESS_FEATURES = [
  { label: "100 monthly credits", tooltip: "100 credits per month shared across all workspace members" },
  { label: "Internal publish" },
  { label: "SSO" },
  { label: "Team workspace" },
  { label: "Personal projects" },
  { label: "Design templates" },
  { label: "Role-based access" },
  { label: "Security center" },
];

const ENTERPRISE_FEATURES = [
  { label: "Volume-based credit pricing" },
  { label: "Dedicated support" },
  { label: "Onboarding services" },
  { label: "Design systems" },
  { label: "SCIM" },
  { label: "Support for custom connectors" },
  { label: "Publishing controls" },
  { label: "Sharing controls" },
  { label: "Audit logs" },
  { label: "For additional or custom enterprise functionality, contact our team directly." },
];

export default function BillingPage() {
  const [manageOpen, setManageOpen] = useState(false);
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [upgradeCreditsOpen, setUpgradeCreditsOpen] = useState(false);
  const [upgradeBusinessOpen, setUpgradeBusinessOpen] = useState(false);
  const { data, isLoading } = useBillingData();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Sidebar — sticky full height */}
      <SettingsSidebar />

      {/* Main scrollable area */}
      <div className="flex flex-1 min-h-0 p-3 pl-0">
        {/* White rounded panel */}
        <div
          className="flex flex-1 flex-col rounded-xl border overflow-y-auto"
          style={{ background: "var(--background)", borderColor: "var(--border-primary)" }}
        >
          <div className="flex flex-col gap-6 p-6 xl:p-10">
                {/* Page header */}
                <div className="flex w-full items-end justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg font-semibold text-[var(--fg-primary)]">Plans &amp; credits</h1>
                    <p className="text-sm text-[var(--fg-tertiary)]">
                      Manage your subscription plan and credit balance.
                    </p>
                  </div>
                  <Link
                    href="https://docs.lovable.dev/user-guides/messaging-limits"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 h-8 px-2.5 rounded-lg text-sm text-[var(--fg-primary)] hover:bg-[var(--hover-bg)] transition-colors shrink-0"
                  >
                    Open docs
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                {/* Top two cards — plan (narrow) + credits (wide) */}
                <div className="flex flex-col gap-4 lg:flex-row">
                  <div className="w-full lg:w-[320px] shrink-0">
                    <CurrentPlanCard
                      data={data}
                      isLoading={isLoading}
                      onManage={() => setManageOpen(true)}
                      onTopUp={() => setTopUpOpen(true)}
                    />
                  </div>
                  <div className="flex-1">
                    <CreditsRemainingCard data={data} isLoading={isLoading} />
                  </div>
                </div>

                {/* Plan cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <PlanCard
                    name="Pro"
                    description="Designed for fast-moving teams building together in real time."
                    price="50"
                    priceNote="shared across unlimited users"
                    features={PRO_FEATURES}
                    featuresLabel="All features in Free, plus:"
                    defaultCredits="200"
                    buttonLabel="Upgrade current plan"
                    buttonVariant="primary"
                    onAction={() => setUpgradeCreditsOpen(true)}
                  />
                  <PlanCard
                    name="Business"
                    description="Advanced controls and power features for growing departments"
                    price="50"
                    priceNote="shared across unlimited users"
                    features={BUSINESS_FEATURES}
                    featuresLabel="All features in Pro, plus:"
                    defaultCredits="100"
                    buttonLabel="Upgrade"
                    buttonVariant="outline"
                    onAction={() => setUpgradeBusinessOpen(true)}
                  />
                  <PlanCard
                    name="Enterprise"
                    description="Built for large orgs needing flexibility, scale, and governance."
                    price={null}
                    priceNote="Based on company size, covering all employees"
                    features={ENTERPRISE_FEATURES}
                    featuresLabel="All features in Business, plus:"
                    buttonLabel="Book a demo"
                    buttonVariant="outline"
                    onAction={() => window.open("https://lovable.dev/enterprise-form", "_blank")}
                  />
                </div>

                {/* Gift cards */}
                <GiftCardsSection />

                {/* Special offers */}
                <SpecialOffersSection />

                {/* Security and compliance */}
                <SecuritySection />
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ManagePlanDialog open={manageOpen} onClose={() => setManageOpen(false)} data={data} />
      <TopUpCreditsDialog open={topUpOpen} onClose={() => setTopUpOpen(false)} />
      <UpgradeCreditsDialog open={upgradeCreditsOpen} onClose={() => setUpgradeCreditsOpen(false)} />
      <UpgradeToBusinessDialog open={upgradeBusinessOpen} onClose={() => setUpgradeBusinessOpen(false)} />
    </div>
  );
}
