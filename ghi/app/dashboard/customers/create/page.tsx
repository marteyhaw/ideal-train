import { roboto } from "@/app/ui/fonts";
import CustomerForm from "@/app/ui/dashboard/customers/create-form";

export default async function Page() {
  return (
    <main>
      <h1 className={`${roboto.className} mb-4 text-xl md:text-2xl`}>
        Create Customer
      </h1>
      <CustomerForm />
    </main>
  );
}
