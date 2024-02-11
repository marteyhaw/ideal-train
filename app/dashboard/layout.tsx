import TopNav from "@/app/ui/topnav";
import SideNav from "@/app/ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TopNav />
      <div className="flex min-h-screen h-full flex-col md:flex-row md:overflow-hidden shrink-0">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
