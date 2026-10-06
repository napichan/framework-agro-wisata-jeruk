import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, getActivityLog } from "@/lib/auth";
import { logout } from "./actions";
import { LogoMark } from "@/components/icons";

export const metadata = {
  title: "Dashboard Admin — Agro Jeruk Selorejo",
};

export default async function AdminDashboardPage() {
  // Proteksi halaman: tanpa sesi valid -> langsung redirect ke login.
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  const activityLog = await getActivityLog();

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Topbar sederhana */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-8 w-8" />
            <div className="leading-tight">
              <p className="text-[13px] font-extrabold text-neutral-900">
                Dashboard Admin
              </p>
              <p className="text-[9px] font-semibold tracking-[0.16em] text-neutral-400">
                AGRO JERUK SELOREJO
              </p>
            </div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-md bg-neutral-900 px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-neutral-800"
            >
              Logout
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Kartu sambutan */}
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-200/70">
          <p className="text-[10px] font-bold tracking-[0.14em] text-brand-500">
            BERHASIL MASUK
          </p>
          <h1 className="mt-1 text-xl font-extrabold text-neutral-900">
            Selamat datang, {session.name} 👋
          </h1>
          <p className="mt-1 text-xs text-neutral-400">
            Login sebagai {session.email} · role: {session.role}
          </p>
          <p className="mt-4 text-xs leading-5 text-neutral-500">
            Ini placeholder dashboard — konten manajemen (reservasi, katalog,
            pemantauan pengunjung) akan dibangun di sini.
          </p>
        </section>

        {/* Log aktivitas login */}
        <section className="mt-8">
          <h2 className="text-sm font-bold text-neutral-900">
            Log Aktivitas Login
          </h2>
          <p className="mb-3 text-[11px] text-neutral-400">
            Riwayat percobaan login admin (maks. 50 entri terakhir).
          </p>

          {activityLog.length === 0 ? (
            <div className="rounded-xl bg-white p-6 text-center text-xs text-neutral-400 shadow-sm ring-1 ring-neutral-200/70">
              Belum ada aktivitas login tercatat.
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-neutral-200/70">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-[10px] uppercase tracking-wide text-neutral-400">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Waktu</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="hidden px-4 py-3 font-semibold sm:table-cell">
                      IP
                    </th>
                    <th className="hidden px-4 py-3 font-semibold md:table-cell">
                      Perangkat
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {activityLog.map((log, i) => (
                    <tr key={`${log.at}-${i}`} className="text-neutral-600">
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-neutral-800">
                        {new Date(log.at).toLocaleString("id-ID", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="px-4 py-3">{log.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            log.status === "berhasil"
                              ? "rounded-full bg-grove-50 px-2.5 py-1 text-[10px] font-bold text-grove-700"
                              : "rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-600"
                          }
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 sm:table-cell">
                        {log.ip}
                      </td>
                      <td className="hidden max-w-[220px] truncate px-4 py-3 md:table-cell">
                        {log.ua}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <p className="mt-6 text-center text-[11px] text-neutral-400">
          <Link
            href="/"
            className="font-semibold text-neutral-500 transition hover:text-grove-600"
          >
            Lihat halaman publik
          </Link>
        </p>
      </div>
    </main>
  );
}
