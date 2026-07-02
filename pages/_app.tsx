import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/AppShell";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  // /settings/* pages render their own full-page sidebar, so skip the app shell there.
  const useShell = !pathname.startsWith("/settings");

  const page = <Component {...pageProps} />;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>{useShell ? <AppShell>{page}</AppShell> : page}</TooltipProvider>
    </QueryClientProvider>
  );
}
