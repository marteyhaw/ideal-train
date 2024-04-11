import { roboto } from "@/app/ui/fonts";
import { SearchBarWithDropdown } from "@/app/ui/forms/search-bar-dropdown";
import ManifestsTable from "@/app/ui/dashboard/manifests/table";
import Pagination from "@/app/ui/dashboard/customers/pagination";

export default async function ManifestsPage() {
  return (
    <main>
      <h1 className={`${roboto.className} mb-4 text-xl md:text-2xl`}>
        Manifest Search
      </h1>
      <div className="flex flex-col w-full">
        <div className="w-full">
          <SearchBarWithDropdown />
        </div>
        <div className="rounded-lg py-2 mt-4">
          <ManifestsTable />
        </div>
        <div className="mt-5 flex w-full justify-center space-x-1">
          <Pagination />
        </div>
      </div>
    </main>
  );
}
