"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import {
  useTrafficByDeviceChartData,
  useTrafficByLocationChartData,
} from "@/hooks/use-dashboard-data";
import { Skeleton } from "@/components/ui/skeleton";

const CHART_COLORS = [
  "#8b5cf6", // purple
  "#10b981", // emerald
  "#1f2937", // gray-900
  "#3b82f6", // blue
  "#06b6d4", // cyan
  "#84cc16", // lime
  "#ef4444", // red
  "#f97316", // orange
];

/**
 * CustomTooltip component for Recharts to display data on hover for traffic charts.
 * @param {object} props - Props from Recharts.
 * @param {boolean} props.active - Whether the tooltip is active.
 * @param {Array<object>} props.payload - The data payload for the tooltip.
 * @param {string} props.label - The label for the tooltip.
 * @returns {JSX.Element | null} The rendered tooltip or null.
 */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm">
        <p className="font-semibold">{data.name || data.device}</p>
        <p>
          {data.value
            ? data.value.toLocaleString()
            : data.traffic.toLocaleString()}
        </p>
        {data.percentage && <p>{data.percentage}</p>}
      </div>
    );
  }
  return null;
};

/**
 * TrafficCharts component displays traffic data by device (bar chart) and by location (pie chart).
 * Fetches data using useTrafficByDeviceChartData and useTrafficByLocationChartData hooks.
 * @returns {JSX.Element} The rendered traffic charts.
 */
export function TrafficCharts() {
  const {
    data: deviceData,
    isLoading: isLoadingDevice,
    isError: isErrorDevice,
  } = useTrafficByDeviceChartData();
  const {
    data: locationData,
    isLoading: isLoadingLocation,
    isError: isErrorLocation,
  } = useTrafficByLocationChartData();

  if (isLoadingDevice || isLoadingLocation) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 min-w-0">
          <Skeleton className="h-6 w-1/2 mb-6" />
          <Skeleton className="h-80 w-full" />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 min-w-0">
          <Skeleton className="h-6 w-1/2 mb-6" />
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 h-80">
            <Skeleton className="w-48 h-48 rounded-full" />
            <div className="flex flex-col gap-3 w-full lg:w-auto">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isErrorDevice || isErrorLocation || !deviceData || !locationData) {
    return (
      <div className="text-red-500">Failed to load traffic charts data.</div>
    );
  }

  const formattedDeviceData = deviceData.map((item, index) => ({
    name: item.device,
    value: item.traffic,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));

  const formattedLocationData = locationData.map((item, index) => ({
    name: item.name,
    value: item.value,
    percentage: item.percentage,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 min-w-0">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Traffic by Device
        </h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formattedDeviceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              barCategoryGap="15%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                angle={0}
                textAnchor="middle"
                height={60}
                interval={0}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(value) => `${value / 1000000}M`}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                {formattedDeviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 min-w-0">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Traffic by Location
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 h-80">
          <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
            <div className="w-48 h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formattedLocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {formattedLocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm min-w-0 w-full lg:w-auto lg:min-w-[150px] flex-1">
            {formattedLocationData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 min-w-0"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-700 truncate">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900 shrink-0">
                  {item.percentage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
