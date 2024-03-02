import { roboto } from "@/app/ui/fonts";
import { SearchBarWithDropdown } from "@/app/ui/forms/search-bar-dropdown";
import CustomersTable from "@/app/ui/dashboard/customers/table";
import Pagination from "@/app/ui/dashboard/customers/pagination";

export default async function CustomersPage() {
  return (
    <main>
      <h1 className={`${roboto.className} mb-4 text-xl md:text-2xl`}>
        Customer Search
      </h1>
      <div className="flex flex-col w-full">
        <div className="w-full">
          <SearchBarWithDropdown />
        </div>
        <div className="rounded-lg py-2 mt-4">
          <CustomersTable />
        </div>
        <div className="mt-5 flex w-full justify-center space-x-1">
          <Pagination />
        </div>
      </div>
    </main>
  );
}
