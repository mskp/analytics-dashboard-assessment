"use client";

import { ChevronRight, Folder, User } from "lucide-react";
import { useState } from "react";

/**
 * LeftSidebarContent component displays user info, favorites/recently tabs, dashboards, and pages.
 * @returns {JSX.Element} The rendered left sidebar content.
 */
export function LeftSidebarContent() {
  const [activeTab, setActiveTab] = useState("favorites");

  return (
    <>
      <nav className="flex-1 space-y-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-3 px-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-gray-600" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">ByeWind</h3>
        </div>
        <div>
          <div className="flex gap-6 mb-3 px-2">
            <button
              onClick={() => setActiveTab("favorites")}
              className={`text-xs font-semibold uppercase tracking-wider ${
                activeTab === "favorites" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Favorites
            </button>
            <button
              onClick={() => setActiveTab("recently")}
              className={`text-xs font-semibold uppercase tracking-wider ${
                activeTab === "recently" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Recently
            </button>
          </div>

          <ul className="space-y-1">
            {activeTab === "favorites" ? (
              <>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <span>Overview</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <span>Projects</span>
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <span>Analytics</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <span>Reports</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <span>Dashboard</span>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
            Dashboards
          </h3>
          <ul className="space-y-1">
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 bg-gray-100 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-700"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
                <span>Default</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4 text-gray-500" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>eCommerce</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4 text-gray-500" />
                <Folder className="w-4 h-4 text-gray-500" />
                <span>Projects</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4 text-gray-500" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M4 19.5v-15A2.5 2 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
                <span>Online Courses</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
            Pages
          </h3>
          <ul className="space-y-1">
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4 text-gray-500" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>User Profile</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-50 ml-6"
              >
                <span>Overview</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-50 ml-6"
              >
                <span>Projects</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-50 ml-6"
              >
                <span>Campaigns</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-50 ml-6"
              >
                <span>Documents</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-50 ml-6"
              >
                <span>Followers</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4 text-gray-500" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M2 21a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
                  <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                </svg>
                <span>Account</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4 text-gray-500" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>Corporate</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4 text-gray-500" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" x2="8" y1="13" y2="13" />
                  <line x1="16" x2="8" y1="17" y2="17" />
                  <line x1="10" x2="8" y1="9" y2="9" />
                </svg>
                <span>Blog</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4 text-gray-500" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
                <span>Social</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
