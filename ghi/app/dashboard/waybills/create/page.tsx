"use client";

import { roboto } from "@/app/ui/fonts";
import WaybillForm from "@/app/ui/dashboard/waybills/create-form";
import { Customer, LocationField, Employee } from "@/app/fe-lib/definitions";
import { useState, useEffect } from "react";

const customers: CustomerField[] = [
  { id: 1, name: "Customer #1" },
  { id: 2, name: "Customer #2" },
  { id: 3, name: "Customer #3" },
];

const locations: LocationField[] = [
  { id: 1, name: "City #1" },
  { id: 2, name: "City #2" },
  { id: 3, name: "City #3" },
];

const employees: EmployeeField[] = [
  { id: 1, name: "Employee #1" },
  { id: 2, name: "Employee #2" },
  { id: 3, name: "Employee #3" },
];

export default async function Page() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [locations, setLocations] = useState<LocationField[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/employees/`);
        if (!response.ok) {
          throw new Error("Unable to fetch employees");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("ERROR:", error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/customers/`);
        if (!response.ok) {
          throw new Error("Unable to fetch customers");
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("ERROR:", error);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/locations/`);
        if (!response.ok) {
          throw new Error("Unable to fetch locations");
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("ERROR:", error);
      }
    };
  });

  return (
    <main>
      <h1 className={`${roboto.className} mb-4 text-xl md:text-2xl`}>
        Create Waybill
      </h1>
      <WaybillForm
        modal
        customers={customers}
        locations={locations}
        employees={employees}
      />
    </main>
  );
}
