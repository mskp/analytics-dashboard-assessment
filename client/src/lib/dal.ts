import { api } from "@/lib/api";
import { redirect } from "next/navigation";

/**
 * Verifies the user's session by calling a backend API endpoint.
 * If the session is invalid or verification fails, it redirects to the login page.
 * @returns A promise that resolves with user session data if valid.
 */
export async function verifySession() {
  const response = await api<null>("/auth/verify-token", { method: "GET" });

  if (!response.success) {
    // redirect to login page if token is invalid
    redirect("/auth/login");
  }

  return response;
}
