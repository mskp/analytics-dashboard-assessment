import axios from "axios";
import { BASE_URL } from "./constants";

/**
 * Pre-configured Axios instance for API calls.
 * Sets base URL and ensures credentials (cookies) are sent with requests.
 */
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
