import { useEffect, useState } from "react";
import { Customer } from "@/app/fe-lib/definitions";
import { getAuthToken } from "../fe-lib/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function useCustomers(searchTerm = "", skip = 0, limit = 10) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const token = getAuthToken();

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/customers/loose_search?search_term=${searchTerm}&skip=${skip}&limit=${
            limit + 1
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }

        const data: Customer[] = await response.json();

        if (data.length > limit) {
          setHasMore(true);
          setCustomers(data.slice(0, limit));
        } else {
          setHasMore(false);
          setCustomers(data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [searchTerm, skip, limit]);

  return { customers, hasMore, loading };
}
