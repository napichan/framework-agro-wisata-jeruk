"use client";

import { useTransition } from "react";
import { logout } from "@/app/admin/actions";

type HeaderProps = {
  name: string;
  email: string;
};

export default function Header({ name, email }: HeaderProps) {
  const [pending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 sm:px-6">
      <p className="text-sm font-bold text-neutral-900">Dashboard Admin</p>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs font-semibold text-neutral-800">{name}</p>
          {email ? (
            <p className="text-[11px] text-neutral-400">{email}</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={pending}
          className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Keluar..." : "Keluar"}
        </button>
      </div>
    </header>
  );
}