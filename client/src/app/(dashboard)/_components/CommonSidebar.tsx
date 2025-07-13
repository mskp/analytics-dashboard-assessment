"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";

/**
 * @interface CommonSidebarProps
 * @property {boolean} isCollapsed - Whether the sidebar is collapsed (hidden on desktop).
 * @property {boolean} isMobileOpen - Whether the sidebar is open on mobile.
 * @property {() => void} onMobileClose - Callback to close the mobile sidebar.
 * @property {"left" | "right"} direction - The side the sidebar is positioned on.
 * @property {string} [width="w-64"] - Tailwind CSS width class for the sidebar.
 * @property {ReactNode} children - The content to be rendered inside the sidebar.
 * @property {string} [className=""] - Additional Tailwind CSS classes for the sidebar container.
 */
interface CommonSidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  direction: "left" | "right";
  width?: string;
  children: ReactNode;
  className?: string;
}

/**
 * CommonSidebar component for both left and right sidebars, handling collapse and mobile states.
 * @param {CommonSidebarProps} props - The props for the CommonSidebar component.
 * @returns {JSX.Element | null} The rendered sidebar component or null if collapsed.
 */
export function CommonSidebar({
  isCollapsed,
  isMobileOpen,
  onMobileClose,
  direction,
  width = "w-64",
  children,
  className = "",
}: CommonSidebarProps) {
  if (isCollapsed) {
    return null;
  }

  const sideClass = direction === "left" ? "left-0" : "right-0";
  const borderClass = direction === "left" ? "border-r" : "border-l";
  const translateClass =
    direction === "left" ? "-translate-x-full" : "translate-x-full";

  return (
    <>
      <aside
        className={`hidden lg:flex flex-col bg-white ${borderClass} border-gray-200 transition-all duration-300 ${width} ${className}`}
      >
        <SidebarContent direction={direction} onMobileClose={onMobileClose}>
          {children}
        </SidebarContent>
      </aside>

      <aside
        className={`fixed top-0 ${sideClass} h-full bg-white ${borderClass} border-gray-200 z-50 transform transition-transform duration-300 lg:hidden ${
          isMobileOpen ? "translate-x-0" : translateClass
        } ${width}`}
      >
        <SidebarContent
          direction={direction}
          onMobileClose={onMobileClose}
          showCloseButton
        >
          {children}
        </SidebarContent>
      </aside>
    </>
  );
}

/**
 * Internal component to render sidebar content and a mobile close button.
 * @param {object} props - Props for SidebarContent.
 * @param {"left" | "right"} props.direction - The direction of the sidebar.
 * @param {() => void} props.onMobileClose - Callback to close the mobile sidebar.
 * @param {boolean} [props.showCloseButton=false] - Whether to show the close button.
 * @param {ReactNode} props.children - The content to be rendered.
 * @returns {JSX.Element} The rendered sidebar content.
 */
function SidebarContent({
  direction,
  onMobileClose,
  showCloseButton = false,
  children,
}: {
  direction: "left" | "right";
  onMobileClose: () => void;
  showCloseButton?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col h-full py-6 px-4">
      {showCloseButton && (
        <div
          className={`flex mb-4 lg:hidden ${
            direction === "right" ? "justify-start" : "justify-end"
          }`}
        >
          <button
            onClick={onMobileClose}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      )}
      {children}
    </div>
  );
}
