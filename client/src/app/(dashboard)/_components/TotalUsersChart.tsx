"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTotalUsersChartData } from "@/hooks/use-dashboard-data";
import { Skeleton } from "@/components/ui/skeleton";

const topTabs = [
  { id: "total-users", label: "Total Users", active: true },
  { id: "total-projects", label: "Total Projects", active: false },
  { id: "operating-status", label: "Operating Status", active: false },
];

const bottomTabs = [
  { id: "overview", label: "Overview", active: true },
  { id: "targets", label: "Targets", active: false },
  { id: "budget", label: "Budget", active: false },
  { id: "users", label: "Users", active: false },
  { id: "files", label: "Files", active: false },
  { id: "activity", label: "Activity", active: false },
  { id: "settings", label: "Settings", active: false },
];

/**
 * CustomTooltip component for Recharts to display data on hover.
 * @param {object} props - Props from Recharts.
 * @param {boolean} props.active - Whether the tooltip is active.
 * @param {Array<object>} props.payload - The data payload for the tooltip.
 * @param {string} props.label - The label for the tooltip.
 * @returns {JSX.Element | null} The rendered tooltip or null.
 */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm">
        <p className="font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.stroke }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * TotalUsersChart component displays a line chart of total users over time.
 * Includes interactive tabs and fetches data using useTotalUsersChartData hook.
 * @returns {JSX.Element} The rendered total users chart.
 */
export function TotalUsersChart() {
  const [activeTopTab, setActiveTopTab] = useState("total-users");
  const [activeBottomTab, setActiveBottomTab] = useState("overview");
  const { data: chartData, isLoading, isError } = useTotalUsersChartData();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 min-w-0">
        <div className="flex items-center gap-6 mb-6 overflow-x-auto">
          {topTabs.map((tab) => (
            <Skeleton key={tab.id} className="h-6 w-24" />
          ))}
          <div className="flex items-center gap-4 ml-auto text-sm text-gray-600">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <Skeleton className="h-80 w-full mb-6" />
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {bottomTabs.map((tab) => (
            <Skeleton key={tab.id} className="h-8 w-20 mr-2" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !chartData) {
    return (
      <div className="text-red-500">Failed to load total users chart data.</div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 min-w-0">
      <div className="flex items-center gap-6 mb-6 overflow-x-auto">
        {topTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTopTab(tab.id)}
            className={`text-sm font-medium whitespace-nowrap pb-1 ${
              activeTopTab === tab.id
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}

        <div className="flex items-center gap-4 ml-auto text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            <span>This year</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-gray-400 border-dashed rounded-full"></div>
            <span>Last year</span>
          </div>
        </div>
      </div>

      <div className="h-80 mb-6 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => `${value / 1000000}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="This year"
              stroke="#1f2937"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, fill: "#1f2937" }}
            />
            <Line
              type="monotone"
              dataKey="Last year"
              stroke="#9ca3af"
              strokeWidth={2}
              strokeDasharray="8 8"
              dot={false}
              activeDot={{ r: 4, fill: "#9ca3af" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex border-b border-gray-200 overflow-x-auto">
        {bottomTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveBottomTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeBottomTab === tab.id
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
