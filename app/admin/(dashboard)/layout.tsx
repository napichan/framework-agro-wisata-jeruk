import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

type AdminProfile = {
  name: string;
  email: string;
};

// Profil admin diambil dari /api/admin/me memakai token di cookie.
async function getAdminProfile(
  token: string,
): Promise<AdminProfile | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return { name: "Admin", email: "" };
  }

  try {
    const res = await fetch(`${apiUrl}/api/admin/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    // Token kedaluwarsa/dicabut: paksa login ulang.
    if (res.status === 401) return null;

    if (!res.ok) {
      return { name: "Admin", email: "" };
    }

    const data = (await res.json()) as {
      user?: { name?: string; email?: string };
    };

    return {
      name: data.user?.name ?? "Admin",
      email: data.user?.email ?? "",
    };
  } catch {
    return { name: "Admin", email: "" };
  }
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const token = (await cookies()).get("agro_token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  const profile = await getAdminProfile(token);

  if (!profile) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header name={profile.name} email={profile.email} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
