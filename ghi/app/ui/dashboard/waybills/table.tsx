"use client";

import { Waybill } from "@/app/fe-lib/definitions";
import { useState, useEffect } from "react";

const waybillsFields: string[][] = [
  ["created_date", "Date"],
  ["number", "Waybill No."],
  ["destination", "Destination"],
  ["consignee", "Consignee"],
  ["total_vat", "Volume"],
];

export default function WaybillsTable() {
  const [waybills, setWaybills] = useState<Waybill[]>([]);

  useEffect(() => {
    async function fetchWaybills() {
      try {
        const response = await fetch("http://localhost:8000/api/v1/waybills/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Waybill[] = await response.json();
        const waybillsWithDates = data.map((waybill: Waybill) => ({
          ...waybill,
          created_date: new Date(waybill.created_date),
        }));
        setWaybills(waybillsWithDates);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    }

    fetchWaybills();
  }, []);

  return (
    <>
      {/* Mobile view */}
      <div className="md:hidden">
        {waybills?.map((waybill) => (
          <div
            key={waybill.id}
            className="mb-2 w-full rounded-md bg-white p-4 hover:bg-gray-200"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <div className="mb-2 flex items-center">
                  <p>{waybill.created_date.toLocaleDateString()}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {waybill.consignee.name}
                </p>
                <p className="text-sm text-gray-500">{waybill.destination}</p>
              </div>
              {waybill.number}
            </div>
            <div className="flex w-full items-center justify-between pt-4">
              <div>
                <p>Volume Rate: {waybill.total_vat}</p>
                <p>Value Charge: {waybill.total_amount}</p>
              </div>
              <div className="flex justify-end gap-2">
                <p className="text-blue-600">Edit</p>
                <p className="text-red-500">Delete</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Non-mobile view */}
      <table className="hidden w-full text-gray-900 md:table">
        <thead className="text-left text-sm font-normal bg-gray-500 text-white">
          <tr className="[&:first-child>th:first-child]:sm:pl-6 [&:first-child>th:first-child]:rounded-l-lg [&:first-child>th:last-child]:rounded-r-lg">
            {waybillsFields.map((field, idx) => {
              return (
                <th scope="col" className="px-4 py-5 font-medium" key={idx}>
                  {field[1]}
                </th>
              );
            })}
            <th scope="col" className="relative py-3 pl-6 pr-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {waybills?.map((waybill) => (
            <tr
              key={waybill.id}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-gray-100"
            >
              {waybillsFields.map((field, idx) => {
                let fieldValue = waybill[field[0] as keyof Waybill];
                if (fieldValue instanceof Date) {
                  fieldValue = fieldValue.toLocaleDateString();
                }
                return (
                  <td className="whitespace-nowrap px-3 py-3" key={idx}>
                    {typeof fieldValue === "object" && fieldValue
                      ? fieldValue.name
                      : fieldValue}
                  </td>
                );
              })}
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  <button className="border rounded px-1 text-blue-500 border-blue-500">
                    Edit
                  </button>
                  <button className="border rounded px-1 text-red-500 border-red-500">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
