import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

/**
 * @interface DashboardSummaryData
 * @property {{ value: string; change: string; type: "increase" | "decrease" }} views - Data for total views.
 * @property {{ value: string; change: string; type: "increase" | "decrease" }} visits - Data for total visits.
 * @property {{ value: string; change: string; type: "increase" | "decrease" }} newUsers - Data for new users.
 * @property {{ value: string; change: string; type: "increase" | "decrease" }} activeUsers - Data for active users.
 */
interface DashboardSummaryData {
  views: { value: string; change: string; type: "increase" | "decrease" };
  visits: { value: string; change: string; type: "increase" | "decrease" };
  newUsers: { value: string; change: string; type: "increase" | "decrease" };
  activeUsers: { value: string; change: string; type: "increase" | "decrease" };
}

/**
 * @interface TotalUsersChartDataItem
 * @property {string} month - The month (e.g., "Jan").
 * @property {number} "This year" - User count for the current year.
 * @property {number} "Last year" - User count for the previous year.
 */
interface TotalUsersChartDataItem {
  month: string;
  "This year": number;
  "Last year": number;
}

/**
 * @interface TrafficByDeviceDataItem
 * @property {string} device - The device name (e.g., "Desktop").
 * @property {number} traffic - The traffic value for the device.
 */
interface TrafficByDeviceDataItem {
  device: string;
  traffic: number;
}

/**
 * @interface TrafficByLocationDataItem
 * @property {string} name - The location name (e.g., "United States").
 * @property {number} value - The traffic value for the location.
 * @property {string} percentage - The traffic percentage for the location (e.g., "30%").
 */
interface TrafficByLocationDataItem {
  name: string;
  value: number;
  percentage: string;
}

/**
 * Hook to fetch dashboard summary data.
 * @returns {object} TanStack Query result object for dashboard summary.
 */
export function useDashboardSummary() {
  return useQuery<DashboardSummaryData, Error>({
    queryKey: ["dashboardSummary"],
    queryFn: async () => {
      const response = await api<DashboardSummaryData>("/dashboard/summary");
      if (!response.success || !response.data) {
        throw new Error(
          response.message
            ? JSON.stringify(response.message)
            : "Failed to fetch summary data",
        );
      }
      return response.data;
    },
  });
}

/**
 * Hook to fetch total users chart data.
 * @returns {object} TanStack Query result object for total users chart data.
 */
export function useTotalUsersChartData() {
  return useQuery<TotalUsersChartDataItem[], Error>({
    queryKey: ["totalUsersChartData"],
    queryFn: async () => {
      const response = await api<TotalUsersChartDataItem[]>(
        "/dashboard/total-users",
      );
      if (!response.success || !response.data) {
        throw new Error(
          response.message
            ? JSON.stringify(response.message)
            : "Failed to fetch total users chart data",
        );
      }
      return response.data;
    },
  });
}

/**
 * Hook to fetch traffic by device chart data.
 * @returns {object} TanStack Query result object for traffic by device chart data.
 */
export function useTrafficByDeviceChartData() {
  return useQuery<TrafficByDeviceDataItem[], Error>({
    queryKey: ["trafficByDeviceChartData"],
    queryFn: async () => {
      const response = await api<TrafficByDeviceDataItem[]>(
        "/dashboard/traffic-by-device",
      );
      if (!response.success || !response.data) {
        throw new Error(
          response.message
            ? JSON.stringify(response.message)
            : "Failed to fetch traffic by device data",
        );
      }
      return response.data;
    },
  });
}

/**
 * Hook to fetch traffic by location chart data.
 * @returns {object} TanStack Query result object for traffic by location chart data.
 */
export function useTrafficByLocationChartData() {
  return useQuery<TrafficByLocationDataItem[], Error>({
    queryKey: ["trafficByLocationChartData"],
    queryFn: async () => {
      const response = await api<TrafficByLocationDataItem[]>(
        "/dashboard/traffic-by-location",
      );
      if (!response.success || !response.data) {
        throw new Error(
          response.message
            ? JSON.stringify(response.message)
            : "Failed to fetch traffic by location data",
        );
      }
      return response.data;
    },
  });
}
