"use client";

import { useRouter } from "next/navigation";
import { useCustomer } from "@/app/hooks/useCustomer";
import { Select } from "@/app/ui/forms/select";
import { Label } from "@/app/ui/forms/label";
import { Input } from "@/app/ui/forms/input";
import { TextArea } from "@/app/ui/forms/textarea";
import { countryList } from "@/app/fe-lib/countries";

export default function ViewCustomer({ id }: { id: string }) {
  const router = useRouter();
  const { customer, loading } = useCustomer(id);

  if (loading) return <p className="text-center">Loading customer data...</p>;
  if (!customer)
    return <p className="text-center text-red-500">Customer not found.</p>;

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl font-semibold mb-4">Customer Details</h1>

      {/* Top Section */}
      <div className="flex flex-wrap">
        {/* Customer Name, Address, City, Country */}
        <div className="w-full md:w-2/3 px-3 mb-3 md:mb-0">
          <div className="block mb-3">
            <Label htmlFor="name">Customer Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={customer.name}
              disabled
              className="bg-gray-200"
            />
          </div>
          <div className="block mb-3">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={customer.address}
              disabled
              className="bg-gray-200"
            />
          </div>
          <div className="block mb-3">
            <div className="flex space-x-3">
              <div className="flex w-1/2">
                <div className="block mb-3">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    value={customer.city}
                    disabled
                    className="bg-gray-200"
                  />
                </div>
              </div>
              <div className="flex w-1/2">
                <div className="block mb-3">
                  <Select
                    label="Country"
                    id="country"
                    name="country"
                    selectOptions={countryList}
                    value={customer.country}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nickname, Contact No., & Email */}
        <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
          <div className="block mb-3">
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              name="nickname"
              type="text"
              value={customer.nickname}
              disabled
              className="bg-gray-200"
            />
          </div>
          <div className="block mb-3">
            <Label htmlFor="contact_no">Contact No.</Label>
            <Input
              id="contact_no"
              name="contact_no"
              type="tel"
              value={customer.contact_no}
              disabled
              className="bg-gray-200"
            />
          </div>
          <div className="block mb-3">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={customer.email}
              disabled
              className="bg-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full bg-gray-300 p-[1px] mb-3"></div>

      {/* Bottom Section */}
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
          <Label className="-ml-2">Default Rate Charges</Label>
          <Label htmlFor="rate_volume_charge">By Volume</Label>
          <Input
            id="rate_volume_charge"
            name="rate_volume_charge"
            type="text"
            value={customer.rate_volume_charge}
            disabled
            className="bg-gray-200"
          />
          <Label htmlFor="rate_weigh_charge">By Weight</Label>
          <Input
            id="rate_weigh_charge"
            name="rate_weigh_charge"
            type="text"
            value={customer.rate_weigh_charge}
            disabled
            className="bg-gray-200"
          />
          <Label htmlFor="rate_value_charge">By Value</Label>
          <Input
            id="rate_value_charge"
            name="rate_value_charge"
            type="text"
            value={customer.rate_value_charge}
            disabled
            className="bg-gray-200"
          />
        </div>
        <div className="w-full md:w-2/3 px-3 mb-3 md:mb-0">
          <Label htmlFor="notes">Notes</Label>
          <TextArea
            id="notes"
            name="notes"
            rows={5}
            value={customer.notes}
            disabled
            className="bg-gray-200"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex w-full justify-end space-x-2 mt-4">
        <button
          type="button"
          className="rounded-md border px-3 py-2 bg-neutral-200 hover:bg-neutral-300"
          onClick={() => router.push("/dashboard/customers")}
        >
          Back
        </button>
        <button
          type="button"
          className="rounded-md border px-3 py-2 text-white bg-blue-500 hover:bg-blue-600"
          onClick={() =>
            router.push(`/dashboard/customers/edit/${customer.id}`)
          }
        >
          Edit
        </button>
      </div>
    </div>
  );
}
