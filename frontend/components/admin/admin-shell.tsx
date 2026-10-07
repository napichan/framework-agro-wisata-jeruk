"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  IconBell,
  IconChevronDown,
  IconCreditCard,
  IconDocument,
  IconHome,
  IconLogout,
  IconMenu,
  IconUsers,
  LogoMark,
} from "@/components/icons";
import { logout } from "@/app/admin/actions";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: IconHome },
  { href: "/admin/users", label: "Manajemen User", icon: IconUsers },
  { href: "/admin/pembayaran", label: "Verifikasi Pembayaran", icon: IconCreditCard },
  { href: "/admin/laporan", label: "Laporan", icon: IconDocument },
] as const;

function isActiveLink(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type AdminShellProps = {
  name: string;
  email: string;
  children: ReactNode;
};

export function AdminShell({ name, email, children }: AdminShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Tutup sidebar mobile setiap kali pindah halaman.
  const handleNavigate = () => {
    setSidebarOpen(false);
    setProfileOpen(false);
  };

  const initial = name.trim().charAt(0).toUpperCase() || "A";
  const displayName = name.trim().split(" ")[0] || "Admin";

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* ================= OVERLAY (mobile) ================= */}
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Tutup menu sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-neutral-950/40 lg:hidden"
        />
      ) : null}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-neutral-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-5 py-5">
          <LogoMark className="h-9 w-9 shrink-0" />
          <span className="text-sm font-extrabold tracking-tight text-neutral-900">
            Agro Petik Jeruk
          </span>
        </div>

        {/* Navigasi */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {NAV_ITEMS.map((item) => {
            const active = isActiveLink(pathname, item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavigate}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold transition ${
                  active
                    ? "bg-grove-50 text-grove-700"
                    : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800"
                }`}
              >
                <Icon className={`h-[18px] w-[18px] ${active ? "text-grove-600" : ""}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-neutral-100 p-3">
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-neutral-500 transition hover:bg-neutral-50 hover:text-neutral-800"
            >
              <IconLogout className="h-[18px] w-[18px]" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* ================= KONTEN ================= */}
      <div className="flex min-h-screen flex-col lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            {/* Hamburger (mobile) */}
            <button
              type="button"
              aria-label="Buka menu sidebar"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800 lg:hidden"
            >
              <IconMenu className="h-5 w-5" />
            </button>

            <div className="hidden lg:block" />

            {/* Aksi kanan */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Notifikasi -> verifikasi pembayaran */}
              <Link
                href="/admin/pembayaran"
                onClick={handleNavigate}
                aria-label="Pembayaran menunggu verifikasi"
                className="relative rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800"
              >
                <IconBell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </Link>

              {/* Profil */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((open) => !open)}
                  aria-expanded={profileOpen}
                  className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition hover:bg-neutral-100"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-grove-600 text-xs font-bold text-white">
                    {initial}
                  </span>

                  <span className="hidden text-[13px] font-semibold text-neutral-700 sm:block">
                    {displayName}
                  </span>

                  <IconChevronDown
                    className={`h-3.5 w-3.5 text-neutral-400 transition ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen ? (
                  <div className="absolute right-0 top-12 w-52 overflow-hidden rounded-xl border border-neutral-200 bg-white py-1.5 shadow-lg">
                    <div className="px-4 py-2">
                      <p className="truncate text-xs font-bold text-neutral-800">{name}</p>
                      <p className="mt-0.5 truncate text-[11px] text-neutral-400">{email}</p>
                    </div>

                    <div className="my-1 border-t border-neutral-100" />

                    <form action={logout}>
                      <button
                        type="submit"
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900"
                      >
                        <IconLogout className="h-4 w-4" />
                        Logout
                      </button>
                    </form>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </header>

        {/* Halaman */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
