import { getToken } from "@/lib/actions";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import axiosInstance from "./axios-instance";

/**
 * @interface ApiResponse
 * @template T - The type of the data returned in the API response.
 * @property {boolean} success - Indicates if the API call was successful.
 * @property {T | null} data - The data returned by the API, or null if unsuccessful.
 * @property {string | Record<string, string[]> | null} message - A message describing the outcome, or validation errors.
 */
interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string | Record<string, string[]> | null;
}

/**
 * Generic API utility function for making requests using an Axios instance.
 * Handles success/failure responses and extracts messages.
 * @template T - The expected type of the response data.
 * @param {string} endpoint - The API endpoint to call.
 * @param {AxiosRequestConfig} [options] - Axios request configuration options.
 * @returns {Promise<ApiResponse<T>>} A promise that resolves to an ApiResponse object.
 */
export async function api<T>(
  endpoint: string,
  options?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  try {
    const accessToken = await getToken();

    const response = await axiosInstance<T>(endpoint, {
      ...options,
      headers: { ...options?.headers, Authorization: `Bearer ${accessToken}` },
    });

    return response.data as ApiResponse<T>;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      return {
        success: false,
        data: null,
        message: errorMessage,
      };
    } else {
      return {
        success: false,
        data: null,
        message: "An unexpected error occurred.",
      };
    }
  }
}
