import SideNavLinks from "@/app/ui/dashboard/sidenav-links";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-50">
      <div className="flex grow flex-col space-y-2">
        <SideNavLinks />
        <div className="h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
