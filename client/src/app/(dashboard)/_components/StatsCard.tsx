"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { useDashboardSummary } from "@/hooks/use-dashboard-data";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * StatsCards component displays key performance indicators (KPIs) with trend indicators.
 * Fetches data using useDashboardSummary hook.
 * @returns {JSX.Element} The rendered stats cards.
 */
export function StatsCards() {
  const { data, isLoading, isError } = useDashboardSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-4 md:p-6 flex flex-col gap-2 border border-gray-200"
          >
            <Skeleton className="h-4 w-1/2 mb-2" />
            <div className="flex items-end justify-between">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-red-500">Failed to load dashboard summary.</div>
    );
  }

  const statsData = [
    {
      title: "Views",
      value: data.views.value,
      change: data.views.change,
      trend: data.views.type === "increase" ? "up" : "down",
      bgColor: "bg-blue-100",
    },
    {
      title: "Visits",
      value: data.visits.value,
      change: data.visits.change,
      trend: data.visits.type === "increase" ? "up" : "down",
      bgColor: "bg-purple-100",
    },
    {
      title: "New Users",
      value: data.newUsers.value,
      change: data.newUsers.change,
      trend: data.newUsers.type === "increase" ? "up" : "down",
      bgColor: "bg-cyan-100",
    },
    {
      title: "Active Users",
      value: data.activeUsers.value,
      change: data.activeUsers.change,
      trend: data.activeUsers.type === "increase" ? "up" : "down",
      bgColor: "bg-gray-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-lg p-4 md:p-6 flex flex-col gap-2 border border-gray-200`}
        >
          <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
          <div className="flex items-end justify-between min-w-0">
            <span className="text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
              {stat.value}
            </span>
            <div
              className={`flex items-center text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis ${
                stat.trend === "up" ? "text-green-600" : "text-red-500"
              }`}
            >
              {stat.change}
              {stat.trend === "up" ? (
                <TrendingUp className="w-4 h-4 ml-1 shrink-0" />
              ) : (
                <TrendingDown className="w-4 h-4 ml-1 shrink-0" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
