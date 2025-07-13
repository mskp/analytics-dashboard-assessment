"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

/**
 * QueryProvider component wraps the application with TanStack Query's QueryClientProvider.
 * It initializes a QueryClient with default options.
 * @param {object} props - The props for the QueryProvider component.
 * @param {ReactNode} props.children - The child components to be wrapped.
 * @returns {JSX.Element} The rendered QueryClientProvider.
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
