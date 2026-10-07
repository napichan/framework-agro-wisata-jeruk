import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, getActivityLog } from "@/lib/auth";
import { RevenueChart } from "@/components/admin/revenue-chart";
import {
  IconArrowUp,
  IconChevronRight,
  IconClock,
  IconDollar,
  IconDots,
  IconReceipt,
  IconUsers,
} from "@/components/icons";

export const metadata = {
  title: "Dashboard Admin — Agro Jeruk Selorejo",
};

/* ==================== Data demo (ganti dengan API/DB nantinya) ==================== */

type Stat = {
  label: string;
  value: string;
  delta: string;
  icon: typeof IconUsers;
  iconClass: string;
};

const STATS: Stat[] = [
  {
    label: "Total User",
    value: "248",
    delta: "+ 12%",
    icon: IconUsers,
    iconClass: "bg-grove-100 text-grove-600",
  },
  {
    label: "Total Transaksi",
    value: "156",
    delta: "+ 8%",
    icon: IconReceipt,
    iconClass: "bg-brand-100 text-brand-600",
  },
  {
    label: "Pendapatan",
    value: "Rp 12.450.000",
    delta: "+ 16%",
    icon: IconDollar,
    iconClass: "bg-grove-100 text-grove-700",
  },
  {
    label: "Pembayaran Pending",
    value: "18",
    delta: "+ 5%",
    icon: IconClock,
    iconClass: "bg-amber-100 text-amber-600",
  },
];

const PAYMENT_STATUS = [
  { label: "Terverifikasi", value: 128, color: "#3D8B48" },
  { label: "Pending", value: 18, color: "#F5A524" },
  { label: "Ditolak", value: 10, color: "#EF4444" },
];

const TOTAL_TRANSACTIONS = PAYMENT_STATUS.reduce(
  (sum, status) => sum + status.value,
  0,
);

const TRANSACTIONS = [
  { id: "#001", name: "Dinda", paket: "Paket A", date: "28 Sep 2026", total: 150_000, status: "Lunas" },
  { id: "#002", name: "Raka", paket: "Paket B", date: "27 Sep 2026", total: 250_000, status: "Pending" },
  { id: "#003", name: "Budi Santoso", paket: "Petik Jeruk Sepuasnya", date: "27 Sep 2026", total: 350_000, status: "Lunas" },
  { id: "#004", name: "Siti Rahmawati", paket: "Paket Edukasi", date: "26 Sep 2026", total: 400_000, status: "Lunas" },
] as const;

/* ==================== Donut status pembayaran ==================== */

const DONUT = { size: 200, radius: 72, strokeWidth: 26 };

function PaymentStatusDonut() {
  const circumference = 2 * Math.PI * DONUT.radius;

  // Posisi kumulatif tiap segmen (tanpa mutasi saat render).
  const cumulative = PAYMENT_STATUS.map((_, i) =>
    PAYMENT_STATUS.slice(0, i).reduce((sum, s) => sum + s.value, 0),
  );

  const segments = PAYMENT_STATUS.map((status, i) => {
    const length = (status.value / TOTAL_TRANSACTIONS) * circumference;
    const visible = Math.max(length - 4, 0);

    return {
      ...status,
      dashArray: `${visible} ${circumference - visible}`,
      dashOffset: -(cumulative[i] / TOTAL_TRANSACTIONS) * circumference,
    };
  });

  return (
    <svg
      viewBox={`0 0 ${DONUT.size} ${DONUT.size}`}
      className="h-44 w-44 shrink-0 sm:h-48 sm:w-48"
      role="img"
      aria-label="Diagram status pembayaran"
    >
      <g transform={`rotate(-90 ${DONUT.size / 2} ${DONUT.size / 2})`}>
        {segments.map((segment) => (
          <circle
            key={segment.label}
            cx={DONUT.size / 2}
            cy={DONUT.size / 2}
            r={DONUT.radius}
            fill="none"
            stroke={segment.color}
            strokeWidth={DONUT.strokeWidth}
            strokeDasharray={segment.dashArray}
            strokeDashoffset={segment.dashOffset}
            strokeLinecap="round"
          />
        ))}
      </g>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="-0.15em"
        className="fill-neutral-900"
        fontSize={34}
        fontWeight={800}
      >
        {TOTAL_TRANSACTIONS}
      </text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="1.5em"
        className="fill-neutral-400"
        fontSize={12}
        fontWeight={600}
      >
        Total Transaksi
      </text>
    </svg>
  );
}

/* ==================== Halaman ==================== */

export default async function AdminDashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  const activityLog = await getActivityLog();
  const displayName = session.name.trim().split(" ")[0] || "Admin";

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {/* ================= JUDUL ================= */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-neutral-400">
          Selamat datang kembali, {displayName} 👋
        </p>
      </div>

      {/* ================= KARTU STATISTIK ================= */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconClass}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <p className="text-xs font-semibold text-neutral-500">
                    {stat.label}
                  </p>
                </div>

                <IconDots className="h-4 w-4 shrink-0 text-neutral-300" />
              </div>

              <p className="mt-4 text-2xl font-extrabold tracking-tight text-neutral-900">
                {stat.value}
              </p>

              <p className="mt-2 flex items-center gap-1 text-[11px] text-neutral-400">
                <span className="flex items-center gap-0.5 font-bold text-grove-600">
                  <IconArrowUp className="h-2.5 w-2.5" />
                  {stat.delta}
                </span>
                dari bulan lalu
              </p>
            </div>
          );
        })}
      </section>

      {/* ================= GRAFIK PENDAPATAN ================= */}
      <RevenueChart />

      {/* ================= STATUS PEMBAYARAN ================= */}
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70 sm:p-6">
        <h2 className="mb-6 text-sm font-bold text-neutral-900">
          Status Pembayaran
        </h2>

        <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-12 sm:pl-6">
          <PaymentStatusDonut />

          <ul className="space-y-4">
            {PAYMENT_STATUS.map((status) => (
              <li key={status.label} className="flex items-start gap-2.5">
                <span
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: status.color }}
                />

                <div>
                  <p className="text-[13px] font-semibold text-neutral-800">
                    {status.label}
                  </p>

                  <p className="text-xs text-neutral-400">
                    ({status.value},{" "}
                    {Math.round((status.value / TOTAL_TRANSACTIONS) * 100)}%)
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= TRANSAKSI TERBARU ================= */}
      <section className="rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/70">
        <div className="flex items-center justify-between px-5 py-4 sm:px-6">
          <h2 className="text-sm font-bold text-neutral-900">
            Transaksi Terbaru
          </h2>

          <Link
            href="/admin/laporan"
            className="flex items-center gap-1 text-xs font-semibold text-grove-600 transition hover:text-grove-700"
          >
            Lihat Semua
            <IconChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto border-t border-neutral-100">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-neutral-400">
                <th className="px-5 py-3 font-semibold">No</th>
                <th className="px-5 py-3 font-semibold">ID Transaksi</th>
                <th className="px-5 py-3 font-semibold">Nama</th>
                <th className="px-5 py-3 font-semibold">Paket</th>
                <th className="px-5 py-3 font-semibold">Tanggal</th>
                <th className="px-5 py-3 font-semibold">Total</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100">
              {TRANSACTIONS.map((tx, index) => (
                <tr key={tx.id} className="text-[13px] text-neutral-500">
                  <td className="px-5 py-4">{index + 1}</td>

                  <td className="px-5 py-4 font-semibold text-neutral-800">
                    {tx.id}
                  </td>

                  <td className="px-5 py-4 font-medium text-neutral-700">
                    {tx.name}
                  </td>

                  <td className="px-5 py-4">{tx.paket}</td>

                  <td className="whitespace-nowrap px-5 py-4">{tx.date}</td>

                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-neutral-800">
                    Rp{tx.total.toLocaleString("id-ID")}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={
                        tx.status === "Lunas"
                          ? "inline-block rounded-full bg-grove-100 px-3 py-1 text-[11px] font-bold text-grove-700"
                          : "inline-block rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-700"
                      }
                    >
                      {tx.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      href="/admin/laporan"
                      className="inline-block rounded-lg border border-neutral-200 px-3.5 py-1.5 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= AKTIVITAS LOGIN (fitur lama, di luar design) ================= */}
      <section>
        <div className="mb-4">
          <h2 className="text-sm font-bold text-neutral-900">
            Aktivitas Login
          </h2>

          <p className="mt-1 text-xs text-neutral-400">
            Riwayat aktivitas login admin terbaru.
          </p>
        </div>

        {activityLog.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-xs text-neutral-400 shadow-sm ring-1 ring-neutral-200/70">
            Belum ada aktivitas login tercatat.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/70">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-[10px] uppercase tracking-wide text-neutral-400">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Waktu</th>
                    <th className="px-5 py-3 font-semibold">Email</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="hidden px-5 py-3 font-semibold sm:table-cell">
                      IP
                    </th>
                    <th className="hidden px-5 py-3 font-semibold md:table-cell">
                      Perangkat
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-neutral-100">
                  {activityLog.map((log, i) => (
                    <tr key={`${log.at}-${i}`} className="text-neutral-600">
                      <td className="whitespace-nowrap px-5 py-3 font-medium text-neutral-800">
                        {new Date(log.at).toLocaleString("id-ID", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>

                      <td className="px-5 py-3">{log.email}</td>

                      <td className="px-5 py-3">
                        <span
                          className={
                            log.status === "berhasil"
                              ? "rounded-full bg-grove-100 px-2.5 py-1 text-[10px] font-bold text-grove-700"
                              : "rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-600"
                          }
                        >
                          {log.status}
                        </span>
                      </td>

                      <td className="hidden px-5 py-3 sm:table-cell">
                        {log.ip}
                      </td>

                      <td className="hidden max-w-[220px] truncate px-5 py-3 md:table-cell">
                        {log.ua}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
