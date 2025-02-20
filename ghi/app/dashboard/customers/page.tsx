"use client";

import { roboto } from "@/app/ui/fonts";
import { SearchBarWithDropdown } from "@/app/ui/forms/search-bar-dropdown";
import CustomersTable, {
  ITEMS_PER_PAGE,
} from "@/app/ui/dashboard/customers/table";
import Pagination from "@/app/ui/dashboard/customers/pagination";
import { SetStateAction, Suspense, useEffect, useState } from "react";

export default async function CustomersPage(props: {
  searchParams?: Promise<{ query?: string; skip?: string; limit?: string }>;
}) {
  const searchParams = await props.searchParams;
  const searchTerm = searchParams?.query || "";
  const skip = Number(searchParams?.skip) || 0;
  const limit = Number(searchParams?.limit) || ITEMS_PER_PAGE;

  return (
    <main>
      <h1 className={`${roboto.className} mb-4 text-xl md:text-2xl`}>
        Customer Search
      </h1>
      <div className="flex flex-col w-full">
        <div className="w-full">
          <SearchBarWithDropdown />
        </div>
        <div className="rounded-lg py-2 mt-4">
          <Suspense key={searchTerm + skip + limit}>
            <CustomersTable />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
