"use server";

import { api } from "@/lib/api";
import type { LoginFormData, SignupFormData } from "@/schemas/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { TOKEN_KEY } from "@/lib/constants";

/**
 * Sets an HttpOnly cookie with the provided token.
 * @param {string} token - The authentication token to set.
 */
export const setToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
};

/**
 * Retrieves the authentication token from the HttpOnly cookie.
 * @returns The authentication token, or undefined if not found.
 */
export const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_KEY)?.value;
};

/**
 * Removes the authentication token HttpOnly cookie.
 */
export const removeToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_KEY);
};

interface AuthResponseData {
  user_id: number;
  token: string;
}

/**
 * Server Action to handle user login.
 * Authenticates with the backend and sets an HttpOnly cookie upon success.
 * @param {LoginFormData} data - The login form data (email, password).
 * @returns {Promise<{ success: boolean; message: string | Record<string, string[]> }>} The result of the login attempt.
 */
export async function loginAction(data: LoginFormData) {
  try {
    const response = await api<AuthResponseData>("/auth/login", {
      method: "POST",
      data: data,
    });

    if (!response.success || !response.data) {
      return { success: false, message: response.message || "Login failed" };
    }

    setToken(response.data.token);
    return { success: true, message: "Login successful!" };
  } catch (error: any) {
    console.error("Login action error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred during login.",
    };
  }
}

/**
 * Server Action to handle user signup.
 * Registers a new user with the backend and sets an HttpOnly cookie upon success.
 * @param {Omit<SignupFormData, "terms">} data - The signup form data (name, email, password, terms).
 * @returns {Promise<{ success: boolean; message: string | Record<string, string[]> }>} The result of the signup attempt.
 */
export async function signupAction(data: Omit<SignupFormData, "terms">) {
  try {
    const response = await api<AuthResponseData>("/auth/signup", {
      method: "POST",
      data: data,
    });

    if (!response.success || !response.data) {
      return { success: false, message: response.message || "Signup failed" };
    }

    setToken(response.data.token);
    return { success: true, message: "Signup successful! Redirecting..." };
  } catch (error: any) {
    console.error("Signup action error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred during signup.",
    };
  }
}

/**
 * Server Action to handle Google OAuth login.
 * Processes the Google ID token with the backend and sets an HttpOnly cookie upon success.
 * @param {string} id_token - The ID token received from Google.
 * @returns {Promise<{ success: boolean; message: string | Record<string, string[]> }>} The result of the Google login attempt.
 */
export async function googleLoginAction(id_token: string) {
  try {
    const response = await api<AuthResponseData>("/auth/google-login", {
      method: "POST",
      data: { id_token },
    });

    if (!response.success || !response.data) {
      return {
        success: false,
        message: response.message || "Google login failed",
      };
    }
    console.log("myresponse", response);

    setToken(response.data.token);
    return { success: true, message: "Google login successful!" };
  } catch (error: any) {
    console.error("Google login action error:", error);
    return {
      success: false,
      message:
        error.message || "An unexpected error occurred during Google login.",
    };
  }
}

/**
 * Server Action to handle user logout.
 * Removes the HttpOnly cookie and redirects the user to the login page.
 */
export async function logoutAction() {
  await removeToken();
  redirect("/auth/login");
}
