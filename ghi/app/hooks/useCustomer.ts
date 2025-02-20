import { useEffect, useState } from "react";
import { Customer } from "@/app/fe-lib/definitions";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function useCustomer(id: string) {
  const [customer, setCustomer] = useState<Customer>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/customers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomer(data);
        setLoading(false);
      });
  }, [id]);

  return { customer, loading };
}
