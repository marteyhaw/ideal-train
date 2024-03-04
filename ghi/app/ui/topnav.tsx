"use client";

import TopNavLinks from "@/app/ui/topnav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import SeasonsLogo from "@/app/ui/seasons-logo";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

function TopNavLinksWithSignOut() {
  return (
    <>
      <div className="text-sm lg:flex-grow pr-4 lg:space-x-4">
        <TopNavLinks />
      </div>
      <div>
        <form>
          <button className="flex items-center justify-center gap-2 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-500 hover:bg-white mt-4 lg:mt-0">
            <PowerIcon className="w-6" />
            <div>Sign Out</div>
          </button>
        </form>
      </div>
    </>
  );
}

export default function TopNav() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <div className="flex items-center justify-between flex-wrap bg-blue-500 px-6 py-3">
        <Link
          href="/dashboard"
          className="flex items-center flex-shrink-0 text-white space-x-2"
        >
          <SeasonsLogo />
        </Link>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-white border-teal-400 hover:text-gray-500 hover:border-white"
            onClick={handleClick}
          >
            <svg
              className="fill-current h-3 w-3 text-white"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="hidden w-full block flex-grow-0 lg:flex lg:items-center lg:w-auto">
          <TopNavLinksWithSignOut />
        </div>
      </div>
      <div
        className={clsx(
          "absolute bg-blue-500 z-10 px-6 pb-6 w-full block flex-grow-0 lg:hidden lg:items-center lg:w-auto",
          {
            hidden: active === false,
          },
        )}
      >
        <TopNavLinksWithSignOut />
      </div>
    </>
  );
}
