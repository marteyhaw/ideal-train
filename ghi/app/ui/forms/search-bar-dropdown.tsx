"use client";

import clsx from "clsx";
import { useState, useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {}

const DROPDOWN_OPTIONS: string[] = [
  "Name",
  "City",
  "Email",
  "Volume Rate",
  "Value Charge",
];

const DropdownOption = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      type="button"
      className="inline-flex justify-center items-center w-full px-4 py-2 hover:bg-gray-100"
    >
      {children}
    </button>
  );
};

export function SearchBarWithDropdown() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdownClick = useCallback(() => {
    setShowDropdown((prev) => !prev);
  }, []);
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term.trim() === searchParams.get("query")) return;
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <form className="flex w-full">
      <div className="flex relative">
        <button
          onClick={handleDropdownClick}
          className="whitespace-nowrap inline-flex items-center py-3 px-3 text-sm font-medium text-center text-gray-700 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200"
          type="button"
        >
          <span className="hidden md:block">All categories</span>
          <span className="block md:hidden">All</span>
          <ChevronDownIcon
            className={clsx([
              "w-3 h-3 ms-2.5 [&>path]:stroke-[4] transition-all transform",
              { "rotate-180": showDropdown },
            ])}
          />
        </button>
        <div
          className={clsx([
            "absolute top-12 w-full z-10 bg-white rounded-lg shadow",
            {
              hidden: !showDropdown,
            },
          ])}
        >
          <ul
            className="py-2 text-xs md:text-sm text-gray-700"
            aria-labelledby="dropdown-button"
          >
            {DROPDOWN_OPTIONS.map((label, idx) => {
              return (
                <li key={idx}>
                  <DropdownOption>{label}</DropdownOption>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="relative w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          type="search"
          id="search"
          className="dark:text-black block py-3 pl-3 pr-14 md:pr-28 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 focus:outline-none"
          placeholder="Please enter..."
          defaultValue={searchParams.get("query")?.toString()}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          required
        />
        {/* In case search is called on submit vs on query change
        <button
          type="submit"
          className="dark:text-black absolute top-0 end-0 p-3 text-sm font-medium h-full bg-blue-700 border rounded-e-lg border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <div className="flex items-center justify-center space-x-2">
            <MagnifyingGlassIcon className="w-5 h-5 [&>path]:stroke-[2]" />
            <span className="hidden lg:inline font-bold">Search</span>
          </div>
        </button>
        */}
      </div>
    </form>
  );
}
