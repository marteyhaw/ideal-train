import { roboto } from "@/app/ui/fonts";
import WaybillForm from "@/app/ui/dashboard/waybills/create-form";
import {
  CustomerField,
  OfficeField,
  EmployeeField,
} from "@/app/fe-lib/definitions";

const customers: CustomerField[] = [
  { id: 1, name: "Customer #1" },
  { id: 2, name: "Customer #2" },
  { id: 3, name: "Customer #3" },
];

const offices: OfficeField[] = [
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
  return (
    <main>
      <h1 className={`${roboto.className} mb-4 text-xl md:text-2xl`}>
        Create Waybill
      </h1>
      <WaybillForm
        modal
        customers={customers}
        offices={offices}
        employees={employees}
      />
    </main>
  );
}
