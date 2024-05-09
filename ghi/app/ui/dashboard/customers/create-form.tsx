"use client";

import { Select } from "@/app/ui/forms/select";
import { Label } from "@/app/ui/forms/label";
import { Input } from "@/app/ui/forms/input";
import { TextArea } from "@/app/ui/forms/textarea";
import { countryList } from "@/app/fe-lib/countries";
import { useState } from "react";

const defaultCountry = "PH";

export default function CustomerForm() {
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    nickname: "",
    address: "",
    city: "",
    country: defaultCountry,
    email: "",
    contact_no: "",
    rate_volume_charge: 0,
    rate_weigh_charge: 0,
    rate_value_charge: 0,
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(JSON.stringify(customer));
      const response = await fetch(`http://localhost:8000/api/v1/customers/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
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
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col w-full">
        {/* Top Section */}
        <div className="flex flex-wrap">
          {/* Customer Name, Street Address, City, & Country */}
          <div className="w-full md:w-2/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Label htmlFor="name">Customer Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Customer Name"
                value={customer.name}
                onChange={handleChange}
              />
            </div>
            <div className="block mb-3">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="Street Address"
                value={customer.address}
                onChange={handleChange}
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
                      placeholder="City"
                      value={customer.city}
                      onChange={handleChange}
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
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Nickname, Contact No., & Email Address*/}
          <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                name="nickname"
                type="text"
                placeholder="(Optional)"
                value={customer.nickname}
                onChange={handleChange}
              />
            </div>
            <div className="block mb-3">
              <Label htmlFor="contact-no">Contact No.</Label>
              <Input
                id="contact-no"
                name="contact_no"
                type="tel"
                pattern="[0-9]{3}-[0-9]{4}"
                placeholder="012-3456"
                value={customer.contact_no}
                onChange={handleChange}
              />
            </div>
            <div className="block mb-3">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={customer.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full bg-gray-300 p-[1px] mb-3"> </div>

        {/* Bottom Section */}
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Label className="-ml-2">Default Rate Charges</Label>
              <Label htmlFor="volume-charge">By Volume</Label>
              <Input
                id="volume-charge"
                name="rate_volume_charge"
                type="text"
                placeholder="Volume Charge"
                value={customer.rate_volume_charge}
                onChange={handleChange}
              />
            </div>
            <div className="block mb-3">
              <Label htmlFor="weight-charge">By Weight</Label>
              <Input
                id="weight-charge"
                name="rate_weigh_charge"
                type="text"
                placeholder="Weight Charge"
                value={customer.rate_weigh_charge}
                onChange={handleChange}
              />
            </div>
            <div className="block mb-3">
              <Label htmlFor="value-charge">By Value</Label>
              <Input
                id="value-charge"
                name="rate_value_charge"
                type="text"
                placeholder="Value Charge"
                value={customer.rate_value_charge}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full md:w-2/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Label htmlFor="notes">Notes</Label>
              <TextArea
                id="notes"
                name="notes"
                rows={10}
                placeholder="Notes"
                value={customer.notes}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end space-x-2">
        <button className="rounded-md border px-3 py-2 transition-colors bg-neutral-200 hover:bg-neutral-300 ">
          Cancel
        </button>
        <button className="rounded-md border px-3 py-2 text-white transition-colors bg-gray-500 hover:bg-gray-600 ">
          Create
        </button>
      </div>
    </form>
  );
}
