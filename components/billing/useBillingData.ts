import { useQuery } from "@tanstack/react-query";

export interface BillingData {
  plan: {
    name: string;
    renewsAt: string;
    features: Array<{ label: string; tooltip?: string }>;
  };
  credits: {
    total: number;
    daily: { amount: number; resetsIn: string };
    monthly: { amount: number; resetsIn: string };
    extra: { amount: number; rolloverAmount: number; expiresIn: string };
  };
}

const mockBillingData: BillingData = {
  plan: {
    name: "Pro",
    renewsAt: "Jun 20, 2026",
    features: [
      { label: "100 monthly credits", tooltip: "100 credits per month + 5 daily credits that reset each day" },
      { label: "5 daily credits (up to 150/month)" },
      { label: "Credit rollovers", tooltip: "Unused credits roll over to the next month (up to 2x your monthly limit)" },
    ],
  },
  credits: {
    total: 215,
    daily: { amount: 5, resetsIn: "11 hours" },
    monthly: { amount: 100, resetsIn: "27 days" },
    extra: { amount: 110, rolloverAmount: 100, expiresIn: "26 days" },
  },
};

async function fetchBillingData(): Promise<BillingData> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return mockBillingData;
}

export function useBillingData() {
  return useQuery({
    queryKey: ["billing"],
    queryFn: fetchBillingData,
    staleTime: 5 * 60 * 1000,
  });
}

export const PLAN_CREDITS_OPTIONS = [
  { value: "20", label: "20 credits / month" },
  { value: "100", label: "100 credits / month" },
  { value: "200", label: "200 credits / month" },
  { value: "400", label: "400 credits / month" },
  { value: "800", label: "800 credits / month" },
  { value: "1200", label: "1200 credits / month" },
  { value: "2000", label: "2000 credits / month" },
  { value: "3000", label: "3000 credits / month" },
  { value: "4000", label: "4000 credits / month" },
  { value: "5000", label: "5000 credits / month" },
  { value: "7500", label: "7500 credits / month" },
  { value: "10000", label: "10000 credits / month" },
];

export const TOP_UP_OPTIONS = [
  { value: "100", label: "+100 credits" },
  { value: "200", label: "+200 credits" },
  { value: "500", label: "+500 credits" },
  { value: "1000", label: "+1000 credits" },
];

export const UPGRADE_CREDITS_OPTIONS = [
  { value: "100", label: "+100 additional credits" },
  { value: "200", label: "+200 additional credits" },
  { value: "500", label: "+500 additional credits" },
];
