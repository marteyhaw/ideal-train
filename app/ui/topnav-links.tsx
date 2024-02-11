"use client";

import { HomeIcon, EnvelopeIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const links = [
  { name: "Home", href: "/dashboard/waybills", icon: HomeIcon },
  {
    name: "Inbox",
    href: "/dashboard/inbox",
    icon: EnvelopeIcon,
  },
  { name: "Account", href: "/dashboard/account", icon: UserIcon },
];

export default function TopNavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <div key={link.name} className="lg:inline-block">
            <Link href={link.href} className="text-teal-200 hover:text-white">
              <div
                className={clsx("mt-4 lg:mt-0 px-1 pb-1 flex items-end", {
                  "box-border border-b-4": pathname === link.href,
                })}
              >
                <LinkIcon className="w-6 mr-1" />
                <p className="">{link.name}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}