import { roboto } from "@/app/ui/fonts";
import ManifestForm from "@/app/ui/dashboard/manifests/create-form";
import {
  DestinationField,
  CarrierField,
  EmployeeField,
} from "@/app/fe-lib/definitions";

const destinations: DestinationField[] = [
  { id: 1, name: "Destination #1" },
  { id: 2, name: "Destination #2" },
  { id: 3, name: "Destination #3" },
];

const carriers: CarrierField[] = [
  { id: 1, name: "Carrier #1" },
  { id: 2, name: "Carrier #2" },
  { id: 3, name: "Carrier #3" },
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
        Manifest Info
      </h1>
      <ManifestForm
        modal={true}
        destinations={destinations}
        carriers={carriers}
        employees={employees}
      />
    </main>
  );
}
