"use client";

import Image from "next/image";
import { Bell, Users, Rss, User } from "lucide-react";

/**
 * RightSidebarContent component displays notifications, activities, and contacts.
 * @returns {JSX.Element} The rendered right sidebar content.
 */
export function RightSidebarContent() {
  return (
    <nav className="flex-1 space-y-6 overflow-y-auto">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Notifications
        </h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <Bell className="w-3 h-3 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">You fixed a bug.</p>
              <span className="text-xs text-gray-500">Just now</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <Users className="w-3 h-3 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">New user registered.</p>
              <span className="text-xs text-gray-500">59 minutes ago</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <Bell className="w-3 h-3 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">You fixed a bug.</p>
              <span className="text-xs text-gray-500">12 hours ago</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <Rss className="w-3 h-3 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                Andi Lane subscribed to you.
              </p>
              <span className="text-xs text-gray-500">Today, 11:59 AM</span>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Activities</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">Changed the style.</p>
              <span className="text-xs text-gray-500">Just now</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">Released a new version.</p>
              <span className="text-xs text-gray-500">59 minutes ago</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">Submitted a bug.</p>
              <span className="text-xs text-gray-500">12 hours ago</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                Modified A data in Page X.
              </p>
              <span className="text-xs text-gray-500">Today, 11:59 AM</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                Deleted a page in Project X.
              </p>
              <span className="text-xs text-gray-500">Feb 2, 2024</span>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Contacts</h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100"></div>
            <span className="text-sm text-gray-900">Natali Craig</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100"></div>
            <span className="text-sm text-gray-900">Drew Cano</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100"></div>
            <span className="text-sm text-gray-900">Andi Lane</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100"></div>
            <span className="text-sm text-gray-900">Koray Okumus</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100"></div>
            <span className="text-sm text-gray-900">Kate Morrison</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100"></div>
            <span className="text-sm text-gray-900">Melody Macy</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
