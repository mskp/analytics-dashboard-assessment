"use client";

import { useMutation } from "@tanstack/react-query";
import type { LoginFormData, SignupFormData } from "@/schemas/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  loginAction,
  signupAction,
  googleLoginAction,
  logoutAction,
} from "@/lib/actions";

/**
 * Hook for handling user login.
 * Uses a Server Action to authenticate and set HttpOnly cookies.
 * @returns {object} TanStack Query mutation object for login.
 */
export function useLogin() {
  const router = useRouter();
  return useMutation<
    Awaited<ReturnType<typeof loginAction>>,
    Error,
    LoginFormData
  >({
    mutationFn: async (data) => {
      const result = await loginAction(data);
      console.log("myresult", result);
      if (!result.success) {
        throw new Error(
          result.message ? JSON.stringify(result.message) : "Login failed",
        );
      }
      return result;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Login successful!");
        router.push("/");
      } else {
        toast.error((data.message as string) || "Login failed!");
      }
    },
    onError: (error) => {
      try {
        const errorMessage = JSON.parse(error.message);
        if (typeof errorMessage === "object" && errorMessage !== null) {
          Object.values(errorMessage)
            .flat()
            .forEach((msg) => {
              toast.error(String(msg));
            });
        } else {
          toast.error(errorMessage);
        }
      } catch (e) {
        toast.error(
          error.message || "An unexpected error occurred during login.",
        );
      }
    },
  });
}

/**
 * Hook for handling user signup.
 * Uses a Server Action to register a new user and set HttpOnly cookies.
 * @returns {object} TanStack Query mutation object for signup.
 */
export function useSignup() {
  const router = useRouter();
  return useMutation<
    Awaited<ReturnType<typeof signupAction>>,
    Error,
    Omit<SignupFormData, "terms">
  >({
    mutationFn: async (data) => {
      const result = await signupAction(data);
      if (!result.success) {
        throw new Error(
          result.message ? JSON.stringify(result.message) : "Signup failed",
        );
      }
      return result;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Signup successful! Redirecting to dashboard...");
        router.push("/");
      } else {
        toast.error((data.message as string) || "Signup failed!");
      }
    },
    onError: (error) => {
      try {
        const errorMessage = JSON.parse(error.message);
        if (typeof errorMessage === "object" && errorMessage !== null) {
          Object.values(errorMessage)
            .flat()
            .forEach((msg) => {
              toast.error(String(msg));
            });
        } else {
          toast.error(errorMessage);
        }
      } catch (e) {
        toast.error(
          error.message || "An unexpected error occurred during signup.",
        );
      }
    },
  });
}

/**
 * Hook for handling Google OAuth login.
 * Uses a Server Action to process the Google ID token and set HttpOnly cookies.
 * @returns {object} TanStack Query mutation object for Google login.
 */
export function useGoogleLogin() {
  const router = useRouter();
  return useMutation<
    Awaited<ReturnType<typeof googleLoginAction>>,
    Error,
    { id_token: string }
  >({
    mutationFn: async (data) => {
      const result = await googleLoginAction(data.id_token);
      if (!result.success) {
        throw new Error(
          result.message
            ? JSON.stringify(result.message)
            : "Google login failed",
        );
      }
      return result;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Google login successful! Redirecting to dashboard...");
        router.push("/");
      } else {
        toast.error((data.message as string) || "Google login failed!");
      }
    },
    onError: (error) => {
      try {
        const errorMessage = JSON.parse(error.message);
        if (typeof errorMessage === "object" && errorMessage !== null) {
          Object.values(errorMessage)
            .flat()
            .forEach((msg) => {
              toast.error(String(msg));
            });
        } else {
          toast.error(errorMessage);
        }
      } catch (e) {
        toast.error(
          error.message || "An unexpected error occurred during Google login.",
        );
      }
    },
  });
}

/**
 * Hook for handling user logout.
 * Uses a Server Action to remove the HttpOnly cookie and redirect.
 * @returns {object} TanStack Query mutation object for logout.
 */
export function useLogout() {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      await logoutAction();
    },
    onSuccess: () => {
      toast.success("Logged out successfully.");
      router.push("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to log out.");
    },
  });
}
