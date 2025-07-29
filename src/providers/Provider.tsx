"use client";
import { Children } from "@/types";
import { SessionProvider } from "next-auth/react";

import { AlertDialog } from "@/components/alerts/AlertDialog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3600000, // 1 hour,
    },
  },
});

const Provider = ({ children }: Children) => {
  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster position="top-center" />
          <AlertDialog />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default Provider;
