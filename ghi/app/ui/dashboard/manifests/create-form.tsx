"use client";

import { Select } from "@/app/ui/forms/select";
import { Label } from "@/app/ui/forms/label";
import { Input } from "@/app/ui/forms/input";
import Link from "next/link";
import {
  DestinationField,
  CarrierField,
  EmployeeField,
} from "@/app/fe-lib/definitions";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function ManifestForm({
  modal,
  destinations,
  carriers,
  employees,
}: {
  modal: Boolean;
  destinations: DestinationField[];
  carriers: CarrierField[];
  employees: EmployeeField[];
}) {
  return (
    <form>
      <div className="w-full">
        <div className="w-1/3">
          <Select
            label="destination"
            id="destination"
            name="destination"
            selectOptions={destinations}
          />
        </div>
        <div className="flex flex-wrap -mx-3 mb-3">
          {/* Carrier and Container Code */}
          <div className="w-full md:w-2/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Select
                label="Carrier"
                id="carrier"
                name="carrier"
                selectOptions={carriers}
              />
            </div>
            <div className="block mb-3">
              <Label
                htmlFor="containerCode"
                className="block text-sm font-medium text-gray-700"
              >
                Container Code
              </Label>
              <Input
                type="text"
                id="containerCode"
                name="containerCode"
                placeholder="Please enter"
              />
            </div>
          </div>
          {/* Date and Checked By */}
          <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Label htmlFor="date">Date</Label>
              <Input type="date" id="date" />
            </div>
            <div className="block mb-3">
              <Select
                label="Checked By"
                id="checkedBy"
                name="checkedBy"
                selectOptions={employees}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add to Manifest */}
      <div className="flex w-full h-64 bg-gray-50 mb-3">
        <Link
          href="dashboard/manifests/add-waybills"
          className="flex items-center m-auto rounded-md border p-2 hover:bg-gray-100"
        >
          <PlusIcon className="w-5" />
          <span>Add to Manifest</span>
        </Link>
      </div>

      {/* Add more form elements as required */}

      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Create
        </button>
      </div>
    </form>
  );
}
