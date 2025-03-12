"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 bg-red-500 text-white rounded"
    >
      Logout
    </button>
  );
}
