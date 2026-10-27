"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU = [
  { label: "Dashboard", href: "/admin" },
  { label: "Pembayaran", href: "/admin/pembayaran" },
  { label: "Manajemen User", href: "/admin/users" },
  { label: "Laporan", href: "/admin/laporan" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-neutral-200 bg-white md:flex">
      <div className="px-6 py-5">
        <p className="text-sm font-extrabold text-green-700">Agro Jeruk</p>
        <p className="text-xs text-neutral-400">Selorejo • Admin</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {MENU.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                active
                  ? "bg-green-100 text-green-700"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}