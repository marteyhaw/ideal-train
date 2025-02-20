import { useEffect, useState } from "react";
import { Customer } from "@/app/fe-lib/definitions";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function useCustomers(searchTerm = "", skip = 0, limit = 10) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${API_BASE_URL}/api/v1/customers/loose_search?search_term=${searchTerm}&skip=${skip}&limit=${
        limit + 1
      }`,
    )
      .then((res) => res.json())
      .then((data: Customer[]) => {
        if (data.length > limit) {
          setHasMore(true);
          setCustomers(data.slice(0, limit));
        } else {
          setHasMore(false);
          setCustomers(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchTerm, skip, limit]);

  return { customers, hasMore, loading };
}
