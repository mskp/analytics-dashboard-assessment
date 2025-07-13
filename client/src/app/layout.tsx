import type React from "react";
import type { Metadata } from "next/types";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "@/providers/query-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard UI Replica",
  description: "A dashboard UI replica built with Next.js and Tailwind CSS.",
};

/**
 * RootLayout component wraps the entire application.
 * It sets up the HTML structure, font, metadata, and global providers like GoogleOAuthProvider and QueryProvider.
 * @param {object} props - The props for the RootLayout component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered root layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
