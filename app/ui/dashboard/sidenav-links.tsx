"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { SIDENAV_ITEMS } from "@/app/fe-lib/constants";
import { SideNavItem } from "@/app/fe-lib/definitions";
import { useState } from "react";

const SideNavItemNoSubMenu = ({
  item,
  pathname,
}: {
  item: SideNavItem;
  pathname: string;
}) => {
  const LinkIcon = item.icon;
  return (
    <div className="w-full">
      <Link
        href={item.path}
        className={clsx(
          "flex h-[48px] grow items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
          {
            "bg-sky-100 text-blue-600": pathname === item.path,
          },
        )}
      >
        {LinkIcon && <LinkIcon className="w-6" />}
        <p className="md:block">{item.title}</p>
      </Link>
    </div>
  );
};

const SideNavItemWithSubMenu = ({
  item,
  pathname,
}: {
  item: SideNavItem;
  pathname: string;
}) => {
  const LinkIcon = item.icon;
  const preOpenSubmenu = pathname.includes(item.path);
  const [subMenuOpen, setSubMenuOpen] = useState(preOpenSubmenu);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };
  return (
    <div className="w-full">
      <button
        onClick={toggleSubMenu}
        className={clsx(
          "w-full flex h-[48px] grow items-center gap-2 rounded-md bg-gray-50 p-3 text-sm hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
          {
            "font-bold": preOpenSubmenu,
            "font-medium": !preOpenSubmenu,
          },
        )}
      >
        {LinkIcon && <LinkIcon className="w-6" />}
        <p className="md:block">{item.title}</p>
        <svg
          className={clsx("fill-current h-4 w-4 transition-all transform", {
            "rotate-180": subMenuOpen,
          })}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>

      {subMenuOpen && item.subMenuItems && (
        <div className="ml-6 flex flex-col space-y-2">
          {item.subMenuItems.map((subItem) => {
            return subItem.subMenuItems ? (
              <SideNavItemWithSubMenu
                key={subItem.title}
                item={subItem}
                pathname={pathname}
              />
            ) : (
              <SideNavItemNoSubMenu
                key={subItem.title}
                item={subItem}
                pathname={pathname}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function SideNavLinks() {
  const pathname = usePathname();

  return (
    <>
      {SIDENAV_ITEMS.map((item) => {
        return item.subMenuItems ? (
          <SideNavItemWithSubMenu
            key={item.title}
            item={item}
            pathname={pathname}
          />
        ) : (
          <SideNavItemNoSubMenu
            key={item.title}
            item={item}
            pathname={pathname}
          />
        );
      })}
    </>
  );
}
