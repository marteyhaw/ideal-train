"use client";

import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline"; // Hamburger menu icon
import SideNavLinks from "@/app/ui/dashboard/sidenav-links";

export default function SideNav() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <button
        className="p-4 bg-gray-100 md:hidden"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <Bars3Icon className="w-6 h-6 text-gray-700" />
      </button>

      {/* Sidebar Menu */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block h-full flex flex-col px-3 py-4 md:px-2`}
      >
        <SideNavLinks />
        <div className="h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
