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
import { useState } from "react";

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
  const { cargoList } = useCargo();
  const [waybill, setWaybill] = useState<Waybill>({
    waybillNo: "",
    consignee: "",
    consigneeAddress: "",
    destination: "",
    date: "",
    cargos: [],
    shipper: "",
    shipperAddress: "",
    receivedAt: "",
    receivedBy: "",
    volumeCharge: 0,
    valueCharge: 0,
    miscCharge: 0,
    weightCharge: 0,
    deliveryCharge: 0,
    valueAddedTax: 0,
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setWaybill({ ...waybill, [name]: value });
  };

  const totalCharges =
    Number(waybill.volumeCharge) +
    Number(waybill.valueCharge) +
    Number(waybill.miscCharge) +
    Number(waybill.weightCharge) +
    Number(waybill.deliveryCharge) +
    Number(waybill.valueAddedTax);

  return (
    <form>
      <div className="w-full">
        <div className="w-1/3">
          <Label htmlFor="waybill-no">Waybill No.</Label>
          <Input id="text" type="text" placeholder="AR-XXXXXX" />
        </div>
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
                value={waybill.consignee}
                onChange={handleChange}
              />
            </div>

            <div className="block mb-3">
              <Label htmlFor="consignee-address">Address</Label>
              <TextArea
                id="consignee-address"
                name="consigneeAddress"
                rows={4}
                value={waybill.consigneeAddress}
                onChange={handleChange}
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
                value={waybill.destination}
                onChange={handleChange}
              />
            </div>
            <div className="block mb-3">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={waybill.date}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Cargo List */}
        {/* Need to add the onChange and values to the cargoList */}
        {cargoList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-3 text-left border-black"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-3 text-left border-black"
                  >
                    Unit
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-3 text-left border-black"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-3 text-left border-black"
                  >
                    Volume
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-3 text-left border-black"
                  >
                    Weight
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-3 text-left border-black"
                  >
                    Declared Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {cargoList.map((cargo, index) => (
                  <tr className="border-b" key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-black">
                      {cargo.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-black">
                      {cargo.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-black">
                      {cargo.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-black">
                      {cargo.length * cargo.width * cargo.height}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-black">
                      {cargo.weight}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-black">
                      {cargo.declaredValue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <Link
                href="dashboard/waybills/add-cargos"
                className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <span>Add More Cargo</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex w-full h-64 bg-gray-50 mb-3">
            <Link
              href="dashboard/waybills/add-cargos"
              className="flex items-center m-auto rounded-md border p-2 hover:bg-gray-100 "
            >
              <PlusIcon className="w-5" />
              <span>Add to Cargo</span>
            </Link>
          </div>
        )}

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
                value={waybill.shipper}
                onChange={handleChange}
              />
            </div>

            <div className="block mb-3">
              <Label htmlFor="shipper-address">Address</Label>
              <TextArea
                id="shipper-address"
                name="shipperAddress"
                rows={4}
                value={waybill.shipperAddress}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Received At & By */}
          <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Select
                label="Received At"
                id="received-at"
                name="receivedAt"
                selectOptions={offices}
                value={waybill.receivedAt}
                onChange={handleChange}
              />
            </div>
            <div className="block mb-3">
              <Select
                label="Received By"
                id="received-by"
                name="receivedBy"
                selectOptions={employees}
                value={waybill.receivedBy}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Total Freight Charges */}
      <div className="flex justify-between w-full py-4 pr-8">
        <Label htmlFor="total-freight-charge">Total Freight Charges</Label>
        {totalCharges === 0 ? (
          <p className="text-right">$0.00</p>
        ) : (
          <p className="text-right">${totalCharges}</p>
        )}
      </div>
      <div className="flex flex-wrap -mx-3 mb-3">
        <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
          <div className="block mb-3">
            <Label htmlFor="volume-charge">Volume Charge</Label>
            <Input
              id="volume-charge"
              name="volumeCharge"
              type="number"
              value={waybill.volumeCharge}
              onChange={handleChange}
            />
          </div>
          <div className="block mb-3">
            <Label htmlFor="weight-charge">Weight Charge</Label>
            <Input
              id="weight-charge"
              name="weightCharge"
              type="number"
              value={waybill.weightCharge}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
          <div className="block mb-3">
            <Label htmlFor="value-charge">Value Charge</Label>
            <Input
              id="value-charge"
              name="valueCharge"
              type="number"
              value={waybill.valueCharge}
              onChange={handleChange}
            />
          </div>
          <div className="block mb-3">
            <Label htmlFor="delivery-charge">Delivery Charge</Label>
            <Input
              id="delivery-charge"
              name="deliveryCharge"
              type="number"
              value={waybill.deliveryCharge}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
          <div className="block mb-3">
            <Label htmlFor="misc-charge">Misc Charge</Label>
            <Input
              id="misc-charge"
              name="miscCharge"
              type="number"
              value={waybill.miscCharge}
              onChange={handleChange}
            />
          </div>
          <div className="block mb-3">
            <Label htmlFor="value-added-tax">Value-Added Tax</Label>
            <Input
              id="value-added-tax"
              name="valueAddedTax"
              type="number"
              value={waybill.valueAddedTax}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <button className="float-right rounded-md border px-3 py-2 text-white transition-colors bg-green-500 hover:bg-green-600 ">
        <span>Create Waybill</span>
      </button>
    </form>
  );
}
