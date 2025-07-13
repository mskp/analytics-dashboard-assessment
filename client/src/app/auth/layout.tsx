import { getToken } from "@/lib/actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import AuthPageTitle from "./_components/AuthPageTitle";

/**
 * @interface AuthLayoutProps
 * @property {ReactNode} children - The content (form) to be rendered inside the layout.
 */
interface AuthLayoutProps {
  children: ReactNode;
}

/**
 * AuthLayout component provides a consistent layout for authentication pages (login, signup).
 * It features an illustration on the left (hidden on small screens) and a form section on the right.
 * @param {AuthLayoutProps} props - The props for the AuthLayout component.
 * @returns {JSX.Element} The rendered authentication layout.
 */
export default async function AuthLayout({ children }: AuthLayoutProps) {
  const token = await getToken();

  if (token) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-white relative overflow-hidden">
        <div className="relative w-full max-w-xl h-full flex items-center justify-center">
          <Image
            src="/login_page_image.png"
            width={500}
            height={500}
            alt="Illustration of a person working"
            className="object-contain animate-fade-in"
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-white">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg">
          <AuthPageTitle />
          {children}
        </div>
      </div>
    </div>
  );
}
