import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Nama cookie harus sama dengan TOKEN_KEY di lib/token.ts
  const token = (await cookies()).get("agro_token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header name="Admin" email="admin@agrowisata.com" />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}