import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";

/**
 * Shell untuk semua halaman admin (sidebar + topbar sesuai design Figma).
 * Berada di route group `(dashboard)` agar halaman login tidak ikut kena.
 */
export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell name={session.name} email={session.email}>
      {children}
    </AdminShell>
  );
}
