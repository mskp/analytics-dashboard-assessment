import { verifySession } from "@/lib/dal"; // Import verifySession from DAL
import type { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // verifySession handles the redirect if the session is invalid
  await verifySession();

  return <>{children}</>;
}
