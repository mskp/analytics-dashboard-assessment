"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGoogleLogin, useLogin } from "@/hooks/use-auth";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CredentialResponse } from "@react-oauth/google";
import Link from "next/link";
import { useForm } from "react-hook-form";
import GoogleLoginButton from "../_components/GoogleLoginButton";

/**
 * LoginPage component provides the user login interface.
 * It includes email/password login and Google OAuth integration.
 * @returns {JSX.Element} The rendered login page.
 */
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();
  const googleLoginMutation = useGoogleLogin();

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      googleLoginMutation.mutate({ id_token: credentialResponse.credential });
    } else {
      console.error("Google login failed: No credential received.");
    }
  };

  const handleGoogleError = () => {
    console.error("Google login failed.");
  };

  return (
    <div className="space-y-6">
      <div className="w-full flex justify-center">
        <GoogleLoginButton
          handleGoogleSuccess={handleGoogleSuccess}
          handleGoogleError={handleGoogleError}
          text="signin_with"
        />
      </div>

      <div className="relative flex items-center justify-center text-xs uppercase text-gray-400">
        <span className="bg-white px-2 z-10">Or, sign in with your email</span>
        <div className="absolute inset-x-0 h-px bg-gray-200" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-gray-700">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="gilroybwborn@gmail.com"
            {...register("email")}
            className="mt-1 border-gray-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password" className="text-gray-700">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            {...register("password")}
            className="mt-1 border-gray-300"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Checkbox id="remember-me" className="border-gray-300" />
            <Label htmlFor="remember-me" className="text-gray-600">
              Keep me sign in
            </Label>
          </div>
          <Link href="#" className="text-blue-700 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full py-2 text-base"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <div className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link href="/auth/signup" className="text-blue-700 hover:underline">
          Sign up now
        </Link>
      </div>
    </div>
  );
}
