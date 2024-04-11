"use client";

import { Label } from "../../forms/label";
import { Input } from "../../forms/input";
import { TextArea } from "../../forms/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCargo } from "../waybills/cargo-context";

const waybillsFields: string[][] = [
  ["date", "Date"],
  ["waybillNo", "Waybill No."],
  ["destination", "Destination"],
  ["cosignee", "Cosignee"],
  ["volume", "Volume"],
  ["status", "Status"],
];

const waybills: { [key: string]: string | number }[] = [
  {
    date: "02/15/2024",
    waybillNo: "AR-000001",
    destination: "CEBU",
    cosignee: "Customer 1",
    volume: 10,
    status: "Recieved",
  },
  {
    date: "02/24/2024",
    waybillNo: "AR-000002",
    destination: "CEBU",
    cosignee: "Customer 2",
    volume: 14,
    status: "In Transit",
  },
  {
    date: "02/28/2024",
    waybillNo: "AR-000003",
    destination: "BATTAAN",
    cosignee: "Customer 1",
    volume: 18,
    status: "Recieved",
  },
];

export default function AddWaybills() {
  const [checkedWaybills, setCheckedWaybills] = useState(new Set());
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  const handleCheckboxClick = (waybillNo: string | number) => {
    setCheckedWaybills((prevCheckedWaybills) => {
      const newCheckedWaybills = new Set(prevCheckedWaybills);
      if (newCheckedWaybills.has(waybillNo)) {
        newCheckedWaybills.delete(waybillNo);
      } else {
        newCheckedWaybills.add(waybillNo);
      }
      return newCheckedWaybills;
    });
  };

  return (
    <div
      className="fixed inset-0 z-10 w-screen overflow-y-auto"
      onClick={handleClose}
    >
      <div className="bg-black bg-opacity-50 h-full w-full">
        <div
          className="relative top-1/4 mx-auto p-5 border w-2/3 md:w-2/3 shadow-lg rounded-md bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <table className="hidden w-full text-gray-900 md:table">
            <thead className="text-left text-sm font-normal bg-gray-500 text-white">
              <tr className="[&:first-child>th:first-child]:sm:pl-6 [&:first-child>th:first-child]:rounded-l-lg [&:first-child>th:last-child]:rounded-r-lg">
                <th scope="col" className="px-4 py-5">
                  <input type="checkbox" name="selectAll" />
                </th>
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
                  key={waybill.waybillNo}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-gray-100"
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedWaybills.has(waybill.waybillNo)}
                      onChange={() => handleCheckboxClick(waybill.waybillNo)}
                      className="px-6"
                    />
                  </td>
                  {waybillsFields.map((field, idx) => {
                    return (
                      <td className="whitespace-nowrap px-3 py-3" key={idx}>
                        {waybill[field[0]]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end pt-2">
            <button
              onClick={handleClose}
              className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
            >
              Cancel
            </button>
            <button className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">
              Add Waybills
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
