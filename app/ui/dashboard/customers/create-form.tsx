"use client";

import { Select } from "@/app/ui/forms/select";
import { Label } from "@/app/ui/forms/label";
import { Input } from "@/app/ui/forms/input";
import { TextArea } from "@/app/ui/forms/textarea";
import { countryList } from "@/app/fe-lib/countries";

const defaultCountry = "PH";

export default function CustomerForm() {
  return (
    <form>
      <div className="flex flex-col w-full">
        {/* Top Section */}
        <div className="flex flex-wrap">
          {/* Customer Name, Street Address, City, & Country */}
          <div className="w-full md:w-2/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Label htmlFor="customer-name">Customer Name</Label>
              <Input
                id="customer-name"
                type="text"
                placeholder="Customer Name"
              />
            </div>
            <div className="block mb-3">
              <Label htmlFor="street-address">Street Address</Label>
              <Input
                id="street-address"
                type="text"
                placeholder="Street Address"
              />
            </div>
            <div className="block mb-3">
              <div className="flex space-x-3">
                <div className="flex w-1/2">
                  <div className="block mb-3">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" type="text" placeholder="City" />
                  </div>
                </div>
                <div className="flex w-1/2">
                  <div className="block mb-3">
                    <Select
                      label="Country"
                      id="country"
                      name="country"
                      defaultValue={defaultCountry}
                      selectOptions={countryList}
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
              <Input id="nickname" type="text" placeholder="(Optional)" />
            </div>
            <div className="block mb-3">
              <Label htmlFor="contact-no">Contact No.</Label>
              <Input
                id="contact-no"
                type="tel"
                pattern="[0-9]{3}-[0-9]{4}"
                placeholder="012-3456"
              />
            </div>
            <div className="block mb-3">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="example@email.com" />
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
                type="text"
                placeholder="Volume Charge"
              />
            </div>
            <div className="block mb-3">
              <Label htmlFor="weight-charge">By Weight</Label>
              <Input
                id="weight-charge"
                type="text"
                placeholder="Weight Charge"
              />
            </div>
            <div className="block mb-3">
              <Label htmlFor="value-charge">By Value</Label>
              <Input id="value-charge" type="text" placeholder="Value Charge" />
            </div>
          </div>
          <div className="w-full md:w-2/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Label htmlFor="notes">Notes</Label>
              <TextArea id="notes" name="notes" rows={10} placeholder="Notes" />
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
