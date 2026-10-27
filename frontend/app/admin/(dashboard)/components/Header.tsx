"use client";

import { useRouter } from "next/navigation";
import { removeToken } from "@/lib/token";

type HeaderProps = {
  name: string;
  email: string;
};

export default function Header({ name, email }: HeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 sm:px-6">
      <p className="text-sm font-bold text-neutral-900">Dashboard Admin</p>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs font-semibold text-neutral-800">{name}</p>
          <p className="text-[11px] text-neutral-400">{email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50"
        >
          Keluar
        </button>
      </div>
    </header>
  );
}