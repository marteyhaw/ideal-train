import { roboto } from "@/app/ui/fonts";

export default async function DashboardPage() {
  return (
    <main>
      <h1 className={`${roboto.className} mb-4 text-xl md:text-2xl`}>
        Welcome to your dashboard!
      </h1>
    </main>
  );
}
