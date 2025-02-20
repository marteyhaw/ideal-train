import { roboto } from "@/app/ui/fonts";
import EditCustomerForm from "@/app/ui/dashboard/customers/edit-form";

export default async function Page() {
  return (
    <main>
      <h1 className={`${roboto.className} mb-4 text-xl md:text-2xl`}>
        Update Customer
      </h1>
      <EditCustomerForm />
    </main>
  );
}
