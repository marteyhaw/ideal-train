"use client";

import {
  LocationField,
  Customer,
  Employee,
  Manifest,
  WaybillCreate,
} from "@/app/fe-lib/definitions";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Select } from "@/app/ui/forms/select";
import { Label } from "@/app/ui/forms/label";
import { Input } from "@/app/ui/forms/input";
import { TextArea } from "@/app/ui/forms/textarea";
import Link from "next/link";
import { useCargo } from "./cargo-context";
import { useState, useEffect } from "react";

const defaultCustomer: Customer = {
  id: "",
  name: "",
  email: "",
  contact_no: "",
};

const defaultEmployee: Employee = {
  id: "",
  last_name: "",
  first_name: "",
  middle_name: "",
  email: "",
};

const defaultManifest: Manifest = {
  id: "",
  number: 0,
  destination: "",
};

export default function WaybillForm({
  modal,
  customers,
  locations,
  employees,
}: {
  modal: React.ReactNode;
  customers: Customer[]; // We will be using CustomerField (will be CustomerView) instead but need to create the new models first
  locations: LocationField[];
  employees: Employee[];
}) {
  const { cargoList } = useCargo();
  const [waybill, setWaybill] = useState<WaybillCreate>({
    number: 0,
    destination: "",
    shipper: defaultCustomer,
    consignee: defaultCustomer,
    origin_address: "",
    destination_address: "",
    created_date: new Date(),
    total_amount: 0,
    total_weight_charge: 0,
    total_value_charge: 0,
    total_cu_msmt_charge: 0,
    total_delivery_charge: 0,
    total_vat: 0,
    payment_terms: "",
    notes: "",
    manifest_id: defaultManifest,
    received_by: defaultEmployee,
    received_at: Date.now(),
    encoded_by: defaultEmployee,
    encoded_on: new Date(),
    cargos: [],
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setWaybill({ ...waybill, [name]: value });
  };

  // Change these values and make sure its changed throughout file
  const total_amount =
    Number(waybill.total_weight_charge) +
    Number(waybill.total_value_charge) +
    Number(waybill.total_cu_msmt_charge) +
    Number(waybill.total_delivery_charge) +
    Number(waybill.total_vat);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(JSON.stringify(waybill));
      const response = await fetch(`http://localhost:8000/api/v1/waybills/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(waybill),
      });

      if (!response.ok) {
        throw new Error(`Request could not be completed`);
      }

      const result = await response.json();
      console.log("SUCCESS:", result);
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  return (
    <form>
      <div className="w-full">
        <div className="w-1/3">
          <Label htmlFor="waybill-no">Waybill No.</Label>
          <Input id="text" type="text" name="number" placeholder="AR-XXXXXX" />
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
                name="destination_address"
                rows={4}
                value={waybill.destination_address}
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
                selectOptions={locations}
                value={waybill.destination}
                onChange={handleChange}
              />
            </div>
            <div className="block mb-3">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="encoded_on"
                type="date"
                value={waybill.encoded_on}
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
                name="origin_address"
                rows={4}
                value={waybill.origin_address}
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
                selectOptions={locations}
                value={waybill.received_at}
                onChange={handleChange}
              />
            </div>
            <div className="block mb-3">
              <Select
                label="Received By"
                id="received-by"
                name="receivedBy"
                selectOptions={employees}
                value={waybill.received_by}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Total Freight Charges */}
      <div className="flex justify-between w-full py-4 pr-8">
        <Label htmlFor="total-freight-charge">Total Freight Charges</Label>
        {total_amount === 0 ? (
          <p className="text-right">$0.00</p>
        ) : (
          <p className="text-right">${total_amount}</p>
        )}
      </div>
      <div className="flex flex-wrap -mx-3 mb-3">
        <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
          <div className="block mb-3">
            <Label htmlFor="volume-charge">Volume Charge</Label>
            <Input
              id="volume-charge"
              name="total_cu_msmt_charge"
              type="number"
              value={waybill.total_cu_msmt_charge}
              onChange={handleChange}
            />
          </div>
          <div className="block mb-3">
            <Label htmlFor="weight-charge">Weight Charge</Label>
            <Input
              id="weight-charge"
              name="total_weight_charge"
              type="number"
              value={waybill.total_weight_charge}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
          <div className="block mb-3">
            <Label htmlFor="value-charge">Value Charge</Label>
            <Input
              id="value-charge"
              name="total_value_charge"
              type="number"
              value={waybill.total_value_charge}
              onChange={handleChange}
            />
          </div>
          <div className="block mb-3">
            <Label htmlFor="delivery-charge">Delivery Charge</Label>
            <Input
              id="delivery-charge"
              name="total_delivery_charge"
              type="number"
              value={waybill.total_delivery_charge}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
          <div className="block mb-3">
            <Label htmlFor="value-added-tax">Value-Added Tax</Label>
            <Input
              id="value-added-tax"
              name="total_vat"
              type="number"
              value={waybill.total_vat}
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
