"use client";

import Link from "next/link";
import { useDashboard } from "@/hooks/useDashboard";
import DashboardChart, { PaymentStatusDonut } from "./DashboardChart";
import StartCard from "./StartCard";

export default function DashboardContent() {
  const {
    displayName,
    stats,
    paymentStatus,
    totalTransaksi,
    transactions,
    revenue,
    activityLog,
    formatRupiah,
  } = useDashboard();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {/* Judul */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-neutral-400">
          Selamat datang kembali, {displayName} 👋
        </p>
      </div>

      {/* Kartu statistik */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StartCard key={stat.label} stat={stat} />
        ))}
      </section>

      {/* Grafik pendapatan */}
      <DashboardChart data={revenue} />

      {/* Status pembayaran */}
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70 sm:p-6">
        <h2 className="mb-6 text-sm font-bold text-neutral-900">
          Status Pembayaran
        </h2>

        <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-12 sm:pl-6">
          <PaymentStatusDonut data={paymentStatus} total={totalTransaksi} />

          <ul className="space-y-4">
            {paymentStatus.map((status) => (
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
                    {Math.round((status.value / totalTransaksi) * 100)}%)
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Transaksi terbaru */}
      <section className="rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/70">
        <div className="flex items-center justify-between px-5 py-4 sm:px-6">
          <h2 className="text-sm font-bold text-neutral-900">
            Transaksi Terbaru
          </h2>
          <Link
            href="/admin/laporan"
            className="text-xs font-semibold text-grove-600 transition hover:text-grove-700"
          >
            Lihat Semua →
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
              {transactions.map((tx, index) => (
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
                    {formatRupiah(tx.total)}
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

      {/* Aktivitas login */}
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
                        {log.at}
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