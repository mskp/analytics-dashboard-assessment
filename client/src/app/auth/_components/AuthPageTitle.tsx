"use client";

import { usePathname } from "next/navigation";

export default function AuthPageTitle() {
  const pathname = usePathname();
  const title = pathname.includes("login") ? "Welcome Back" : "Let's join us";
  return (
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-left">
      {title}
    </h1>
  );
}
