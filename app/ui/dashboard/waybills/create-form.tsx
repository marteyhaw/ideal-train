"use client";

import {
  CustomerField,
  OfficeField,
  EmployeeField,
} from "@/app/fe-lib/definitions";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Select } from "@/app/ui/forms/select";
import { Label } from "@/app/ui/forms/label";
import { Input } from "@/app/ui/forms/input";
import { TextArea } from "@/app/ui/forms/textarea";
import Link from "next/link";
import { useCargo } from "./cargo-context";

export default function WaybillForm({
  modal,
  customers,
  offices,
  employees,
}: {
  modal: React.ReactNode;
  customers: CustomerField[];
  offices: OfficeField[];
  employees: EmployeeField[];
}) {

  const cargoList = useCargo()

  return (
    <form>
      <div className="w-full">
        {/* Top Section */}
        <div className="flex flex-wrap -mx-3 mb-3">
          {/* Consignee & Address */}
          <div className="w-full md:w-2/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Select
                label="Consignee"
                id="consignee"
                name="consignee"
                selectOptions={customers}
              />
            </div>

            <div className="block mb-3">
              <Label htmlFor="consignee-address">Address</Label>
              <TextArea
                id="consignee-address"
                name="consignee-address"
                rows={4}
              />
            </div>
          </div>

          {/* Destination & Date */}
          <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Select
                label="Destination"
                id="destination"
                name="destination"
                selectOptions={offices}
              />
            </div>
            <div className="block mb-3">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
          </div>
        </div>

        {/* Cargo List */}
        <div className="flex w-full h-64 bg-gray-50 mb-3">
          {/* {cargoList.map((cargo, index) => (
            <div key={index}>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                    </tr>
                  </thead>
                </table>
            </div>
          ))} */}
          <Link
            href="dashboard/waybills/add-cargos"
            className="flex items-center m-auto rounded-md border p-2 hover:bg-gray-100 "
          >
            <PlusIcon className="w-5" />
            <span>Add to Cargo</span>
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-wrap -mx-3 mb-3">
          {/* Shipper & Address */}
          <div className="w-full md:w-2/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Select
                label="Shipper"
                id="shipper"
                name="shipper"
                selectOptions={customers}
              />
            </div>

            <div className="block mb-3">
              <Label htmlFor="shipper-address">Address</Label>
              <TextArea id="shipper-address" name="shipper-address" rows={4} />
            </div>
          </div>

          {/* Received At & By */}
          <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Select
                label="Received At"
                id="received-at"
                name="received-at"
                selectOptions={offices}
              />
            </div>
            <div className="block mb-3">
              <Select
                label="Received By"
                id="received-by"
                name="received-by"
                selectOptions={employees}
              />
            </div>
          </div>
        </div>
      </div>

      <button className="float-right rounded-md border px-3 py-2 text-white transition-colors bg-green-500 hover:bg-green-600 ">
        <span>Create Waybill</span>
      </button>
    </form>
  );
}
