"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/app/state";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const AppLogo = ({ isCollapsed }: { isCollapsed: boolean }) => {
  if (isCollapsed) {
    return (
      <svg
        viewBox="0 0 42 42"
        className="h-10 w-10 shrink-0"
        role="img"
        aria-label="Appstock logo"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="5" y="15" width="6" height="12" rx="3" fill="#111111" />
        <rect x="15" y="8" width="6" height="26" rx="3" fill="#F4A259" />
        <rect x="25" y="12" width="6" height="18" rx="3" fill="#111111" />
        <rect x="33" y="17" width="4" height="8" rx="2" fill="#F4A259" opacity="0.95" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 280 52"
      className="h-10 w-auto shrink-0"
      role="img"
      aria-label="Appstock logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(0 2)">
        <rect x="0" y="11" width="8" height="20" rx="4" fill="#111111" />
        <rect x="12" y="5" width="8" height="32" rx="4" fill="#F4A259" />
        <rect x="24" y="0" width="8" height="40" rx="4" fill="#111111" />
        <rect x="36" y="10" width="8" height="20" rx="4" fill="#F4A259" />
        <rect x="48" y="15" width="6" height="10" rx="3" fill="#111111" opacity="0.9" />
      </g>

      <text
        x="72"
        y="33"
        fontSize="30"
        fontWeight="800"
        fill="#111111"
        fontFamily="Arial, Helvetica, sans-serif"
        letterSpacing="-1.5"
      >
        appstock
      </text>
    </svg>
  );
};

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }
      }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />

        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-3" : "px-4"
        }`}
      >
        <div className="flex items-center justify-center overflow-hidden">
          <AppLogo isCollapsed={isSidebarCollapsed} />
        </div>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">&copy; 2024 Appstock</p>
      </div>
    </div>
  );
};

export default Sidebar;