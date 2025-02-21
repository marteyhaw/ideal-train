"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  hasMore: boolean;
  itemsPerPage: number;
}

export default function Pagination({ hasMore, itemsPerPage }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const skip = Number(searchParams.get("skip")) || 0;

  const goToPage = (newSkip: number) => {
    if (newSkip < 0) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("skip", newSkip.toString());
    router.push(`/dashboard/customers?${params.toString()}`);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => goToPage(skip - itemsPerPage)}
        disabled={skip === 0}
      >
        <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
      </button>
      <span>
        Showing {skip + 1} - {skip + itemsPerPage}
      </span>
      <button onClick={() => goToPage(skip + itemsPerPage)} disabled={!hasMore}>
        <ChevronRightIcon className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}
