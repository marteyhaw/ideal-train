import { roboto } from "@/app/ui/fonts";
import ViewCustomer from "@/app/ui/dashboard/customers/view";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <main>
      <h1 className={`${roboto.className} mb-4 text-xl md:text-2xl`}>
        Customer Information
      </h1>
      <ViewCustomer id={params.id} />
    </main>
  );
}
