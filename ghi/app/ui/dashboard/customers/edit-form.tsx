"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Select } from "@/app/ui/forms/select";
import { Label } from "@/app/ui/forms/label";
import { Input } from "@/app/ui/forms/input";
import { TextArea } from "@/app/ui/forms/textarea";
import { countryList } from "@/app/fe-lib/countries";
import { Customer } from "@/app/fe-lib/definitions";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function EditCustomerForm() {
  const router = useRouter();
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedFields, setUpdatedFields] = useState<Partial<Customer>>({});

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/customers/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch customer data.");
        }
        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error("Error fetching customer:", error);
        setError("Failed to load customer data.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCustomer();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (!customer) return;
    const { name, value } = e.target;

    setCustomer((prev) => (prev ? { ...prev, [name]: value } : null));
    setUpdatedFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/customers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        throw new Error("Failed to update customer.");
      }

      router.push(`/dashboard/customers/view/${id}`);
    } catch (error) {
      console.error("Error updating customer:", error);
      setError("Failed to update customer.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p className="text-center">Loading customer data...</p>;
  if (!customer) return <p className="text-center text-red-500">{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col w-full">
        {error && <div style={{ color: "red" }}>{error}</div>}

        {/* Top Section */}
        <div className="flex flex-wrap">
          {/* Customer Name (Disabled) */}
          <div className="w-full md:w-2/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Label htmlFor="name">Customer Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={customer.name}
                disabled
                className="bg-gray-200 cursor-not-allowed"
              />
            </div>

            <div className="block mb-3">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
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

          {/* Nickname, Contact No., & Email */}
          <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                name="nickname"
                type="text"
                value={customer.nickname}
                onChange={handleChange}
              />
            </div>
            <div className="block mb-3">
              <Label htmlFor="contact_no">Contact No.</Label>
              <Input
                id="contact_no"
                name="contact_no"
                type="tel"
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
            <Label className="-ml-2">Default Rate Charges</Label>
            <Label htmlFor="rate_volume_charge">By Volume</Label>
            <Input
              id="rate_volume_charge"
              name="rate_volume_charge"
              type="text"
              value={customer.rate_volume_charge}
              onChange={handleChange}
            />
            <Label htmlFor="rate_weigh_charge">By Weight</Label>
            <Input
              id="rate_weigh_charge"
              name="rate_weigh_charge"
              type="text"
              value={customer.rate_weigh_charge}
              onChange={handleChange}
            />
            <Label htmlFor="rate_value_charge">By Value</Label>
            <Input
              id="rate_value_charge"
              name="rate_value_charge"
              type="text"
              value={customer.rate_value_charge}
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-2/3 px-3 mb-3 md:mb-0">
            <Label htmlFor="notes">Notes</Label>
            <TextArea
              id="notes"
              name="notes"
              rows={5}
              value={customer.notes}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex w-full justify-end space-x-2">
        <button
          type="button"
          className="rounded-md border px-3 py-2 bg-neutral-200 hover:bg-neutral-300"
          onClick={() => router.push(`/dashboard/customers/view/${id}`)}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md border px-3 py-2 text-white bg-blue-500 hover:bg-blue-600"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
