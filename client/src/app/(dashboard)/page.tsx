"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CommonSidebar } from "./_components/CommonSidebar";
import { LeftSidebarContent } from "./_components/LeftSidebarContent";
import { RightSidebarContent } from "./_components/RightSidebarContent";
import { Header } from "./_components/Header";
import { StatsCards } from "./_components/StatsCard";
import { TotalUsersChart } from "./_components/TotalUsersChart";
import { TrafficCharts } from "./_components/TrafficChart";

/**
 * DashboardPage component renders the main dashboard UI.
 * It manages sidebar states and includes various dashboard sections like stats cards and charts.
 * @returns {JSX.Element} The rendered dashboard page.
 */
export default function DashboardPage() {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);
  const [isMobileLeftMenuOpen, setIsMobileLeftMenuOpen] = useState(false);
  const [isMobileRightMenuOpen, setIsMobileRightMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <CommonSidebar
        isCollapsed={isLeftSidebarCollapsed}
        isMobileOpen={isMobileLeftMenuOpen}
        onMobileClose={() => setIsMobileLeftMenuOpen(false)}
        direction="left"
        width="w-64"
      >
        <LeftSidebarContent />
      </CommonSidebar>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          isLeftSidebarCollapsed={isLeftSidebarCollapsed}
          setIsLeftSidebarCollapsed={setIsLeftSidebarCollapsed}
          isRightSidebarCollapsed={isRightSidebarCollapsed}
          setIsRightSidebarCollapsed={setIsRightSidebarCollapsed}
          onMobileLeftMenuToggle={() =>
            setIsMobileLeftMenuOpen(!isMobileLeftMenuOpen)
          }
          onMobileRightMenuToggle={() =>
            setIsMobileRightMenuOpen(!isMobileRightMenuOpen)
          }
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow-sm border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                Today
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="space-y-6 min-w-0 w-full">
            <StatsCards />
            <TotalUsersChart />
            <TrafficCharts />
          </div>
        </main>
      </div>

      <CommonSidebar
        isCollapsed={isRightSidebarCollapsed}
        isMobileOpen={isMobileRightMenuOpen}
        onMobileClose={() => setIsMobileRightMenuOpen(false)}
        direction="right"
        width="w-80"
      >
        <RightSidebarContent />
      </CommonSidebar>

      {(isMobileLeftMenuOpen || isMobileRightMenuOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => {
            setIsMobileLeftMenuOpen(false);
            setIsMobileRightMenuOpen(false);
          }}
        />
      )}
    </div>
  );
}
