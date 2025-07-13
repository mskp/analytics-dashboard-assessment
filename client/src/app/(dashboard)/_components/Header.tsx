"use client";

import { logoutAction } from "@/lib/actions";
import {
  ChevronRight,
  Search,
  Sun,
  Bell,
  Clock,
  Star,
  PanelLeft,
  PanelRight,
  Menu,
  LogOut,
} from "lucide-react";

/**
 * @interface HeaderProps
 * @property {boolean} isLeftSidebarCollapsed - State of the left sidebar's collapse.
 * @property {(collapsed: boolean) => void} setIsLeftSidebarCollapsed - Function to set the left sidebar's collapse state.
 * @property {boolean} isRightSidebarCollapsed - State of the right sidebar's collapse.
 * @property {(collapsed: boolean) => void} setIsRightSidebarCollapsed - Function to set the right sidebar's collapse state.
 * @property {() => void} onMobileLeftMenuToggle - Callback to toggle the left sidebar on mobile.
 * @property {() => void} onMobileRightMenuToggle - Callback to toggle the right sidebar on mobile.
 */
interface HeaderProps {
  isLeftSidebarCollapsed: boolean;
  setIsLeftSidebarCollapsed: (collapsed: boolean) => void;
  isRightSidebarCollapsed: boolean;
  setIsRightSidebarCollapsed: (collapsed: boolean) => void;
  onMobileLeftMenuToggle: () => void;
  onMobileRightMenuToggle: () => void;
}

/**
 * Header component for the dashboard, including sidebar toggles, search, and action buttons.
 * @param {HeaderProps} props - The props for the Header component.
 * @returns {JSX.Element} The rendered header.
 */
export function Header({
  isLeftSidebarCollapsed,
  setIsLeftSidebarCollapsed,
  isRightSidebarCollapsed,
  setIsRightSidebarCollapsed,
  onMobileLeftMenuToggle,
  onMobileRightMenuToggle,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-gray-200 relative z-10">
      <div className="flex items-center gap-2 md:gap-4 min-w-0">
        <button
          onClick={onMobileLeftMenuToggle}
          className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
          aria-label="Open left menu"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>

        <button
          onClick={() => setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed)}
          className="hidden lg:flex p-2 rounded-md hover:bg-gray-100"
          aria-label={
            isLeftSidebarCollapsed
              ? "Expand left sidebar"
              : "Collapse left sidebar"
          }
        >
          {isLeftSidebarCollapsed ? (
            <PanelRight className="w-5 h-5 text-gray-600" />
          ) : (
            <PanelLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>

        <button className="p-2 rounded-md hover:bg-gray-100">
          <Star className="w-5 h-5 text-gray-600" />
        </button>

        <div className="hidden md:flex items-center text-sm text-gray-500 whitespace-nowrap">
          <span>Dashboards</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="font-medium text-gray-700">Default</span>
        </div>
      </div>

      <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
        <div className="relative hidden sm:block flex-1 max-w-md mx-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="pl-9 pr-16 py-2 rounded-md bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 w-full"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded">
            ⌘K
          </span>
        </div>

        <button className="p-2 rounded-md hover:bg-gray-100 sm:hidden">
          <Search className="w-5 h-5 text-gray-600" />
        </button>

        <div className="hidden md:flex items-center gap-2">
          <button className="p-2 rounded-md hover:bg-gray-100">
            <Sun className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <Clock className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => {
              logoutAction();
            }}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <button
          onClick={onMobileRightMenuToggle}
          className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
          aria-label="Open right menu"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>

        <button
          onClick={() => setIsRightSidebarCollapsed(!isRightSidebarCollapsed)}
          className="hidden lg:flex p-2 rounded-md hover:bg-gray-100"
          aria-label={
            isRightSidebarCollapsed
              ? "Expand right sidebar"
              : "Collapse right sidebar"
          }
        >
          {isRightSidebarCollapsed ? (
            <PanelLeft className="w-5 h-5 text-gray-600" />
          ) : (
            <PanelRight className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    </header>
  );
}
