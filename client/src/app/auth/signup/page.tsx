"use client";

import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "@/schemas/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useSignup } from "@/hooks/use-auth";
import { useGoogleLogin } from "@/hooks/use-auth";
import GoogleLoginButton from "../_components/GoogleLoginButton";
import type { CredentialResponse } from "@react-oauth/google";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });
  const signupMutation = useSignup();
  const googleLoginMutation = useGoogleLogin();

  const onSubmit = (data: SignupFormData) => {
    const { terms, ...signupData } = data;
    signupMutation.mutate(signupData);
  };

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      googleLoginMutation.mutate({ id_token: credentialResponse.credential });
    } else {
      console.error("Google signup failed: No credential received.");
    }
  };

  const handleGoogleError = () => {
    console.error("Google signup failed.");
  };

  return (
    <div className="space-y-6">
      <div className="w-full flex justify-center">
        <GoogleLoginButton
          handleGoogleSuccess={handleGoogleSuccess}
          handleGoogleError={handleGoogleError}
          text="signup_with"
        />
      </div>
      <div className="relative flex items-center justify-center text-xs uppercase text-gray-400">
        <span className="bg-white px-2 z-10">Or, sign up with your email</span>
        <div className="absolute inset-x-0 h-px bg-gray-200" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-gray-700">
            Your name*
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Gilroy Brown"
            {...register("name")}
            className="mt-1 border-gray-300"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email" className="text-gray-700">
            Email address*
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email address"
            {...register("email")}
            className="mt-1 border-gray-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password" className="text-gray-700">
            Password*
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
        <div className="flex items-center gap-2 text-sm">
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="terms"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="border-gray-300"
              />
            )}
          />
          <Label htmlFor="terms" className="text-gray-600">
            Agree to terms & conditions
          </Label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
        )}
        <Button
          type="submit"
          className="w-full py-2 text-base"
          disabled={signupMutation.isPending}
        >
          {signupMutation.isPending ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
      <div className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-700 hover:underline">
          Sign in now
        </Link>
      </div>
    </div>
  );
}
