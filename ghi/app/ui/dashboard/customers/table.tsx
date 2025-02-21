"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCustomers } from "@/app/hooks/useCustomers";
import { Customer } from "@/app/fe-lib/definitions";
import Pagination from "./pagination";

export const ITEMS_PER_PAGE = 10;

const customerFields: [keyof Customer, string][] = [
  ["name", "Name"],
  ["city", "City"],
  ["email", "Email"],
  ["contact_no", "Contact No."],
  ["rate_volume_charge", "Volume Rate"],
  ["rate_value_charge", "Value Rate"],
];

export default function CustomersTable() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";
  const skip = Number(searchParams.get("skip")) || 0;
  const limit = Number(searchParams.get("limit")) || ITEMS_PER_PAGE;

  const { customers, hasMore, loading } = useCustomers(searchTerm, skip, limit);

  return (
    <>
      {/* Mobile view */}
      <div className="md:hidden">
        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : (
          customers.map((customer: Customer) => (
            <div
              key={customer.id}
              className="mb-2 w-full rounded-md bg-white p-4 hover:bg-gray-200"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p>{customer.id}</p>
                  <p className="text-sm text-gray-500">{customer.contact_no}</p>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
                {customer.city}
              </div>
              <div className="flex w-full items-center justify-between pt-4">
                <div>
                  <p>Volume Rate: {customer.rate_volume_charge}</p>
                  <p>Value Charge: {customer.rate_value_charge}</p>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="text-blue-600"
                    onClick={() =>
                      router.push(`/dashboard/customers/view/${customer.id}`)
                    }
                  >
                    View
                  </button>
                  <button className="text-red-500">Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Non-mobile view */}
      <table className="hidden w-full text-gray-900 md:table">
        <thead className="text-left text-sm font-normal bg-gray-500 text-white">
          <tr>
            {customerFields.map(([key, label]) => (
              <th key={key} className="px-4 py-5 font-medium">
                {label}
              </th>
            ))}
            <th className="relative py-3 pl-6 pr-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {loading ? (
            <tr>
              <td
                colSpan={customerFields.length + 1}
                className="text-center py-4"
              >
                Loading...
              </td>
            </tr>
          ) : (
            customers.map((customer: Customer) => (
              <tr
                key={customer.id}
                className="border-b py-3 text-sm hover:bg-gray-100"
              >
                {customerFields.map(([key]) => (
                  <td key={key} className="whitespace-nowrap px-3 py-3">
                    {customer[key]}
                  </td>
                ))}
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
                    <button
                      className="border rounded px-1 text-blue-500 border-blue-500"
                      onClick={() =>
                        router.push(`/dashboard/customers/view/${customer.id}`)
                      }
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-5 flex w-full justify-center space-x-1">
        <Pagination hasMore={hasMore} itemsPerPage={limit} />
      </div>
    </>
  );
}
