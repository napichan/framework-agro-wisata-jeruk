"use client";

import Link from "next/link";
import { useDashboard } from "@/hooks/useDashboard";
import DashboardChart from "./DashboardChart";
import StartCard from "./StartCard";
import type { TransactionStatus } from "@/types/dashboard.types";

const STATUS_CLASS: Record<TransactionStatus, string> = {
  Lunas: "bg-grove-100 text-grove-700",
  Pending: "bg-amber-100 text-amber-700",
  Ditolak: "bg-red-100 text-red-600",
};

export default function DashboardContent() {
  const {
    loading,
    error,
    stats,
    transactions,
    pendingPayments,
    pendingCount,
    revenue,
    range,
    setRange,
    formatRupiah,
  } = useDashboard();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-neutral-400">
          Ringkasan operasional dan antrean verifikasi hari ini.
        </p>

        {loading ? (
          <p className="mt-1 text-xs font-semibold text-neutral-400">
            Memuat data dashboard…
          </p>
        ) : null}

        {error ? (
          <p className="mt-1 text-xs font-semibold text-red-500">
            {error} (pastikan backend &amp; MySQL berjalan)
          </p>
        ) : null}
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StartCard key={stat.label} stat={stat} />
        ))}
      </section>

      <div className="grid gap-5 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <DashboardChart
            data={revenue}
            range={range}
            onRangeChange={setRange}
          />
        </div>

        <section className="flex h-full flex-col rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/70 xl:col-span-2">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-neutral-900">
                Perlu Diverifikasi
              </h2>
              {pendingCount > 0 ? (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                  {pendingCount}
                </span>
              ) : null}
            </div>

            <Link
              href="/admin/pembayaran"
              className="text-xs font-semibold text-grove-600 transition hover:text-grove-700"
            >
              Lihat semua →
            </Link>
          </div>

          <div className="flex-1 border-t border-neutral-100">
            {pendingPayments.length === 0 ? (
              <div className="flex h-full min-h-40 items-center justify-center px-5 text-center text-xs text-neutral-400">
                Semua pembayaran sudah diproses.
              </div>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {pendingPayments.map((payment) => (
                  <li key={payment.id}>
                    <Link
                      href="/admin/pembayaran"
                      className="flex items-start justify-between gap-3 px-5 py-3.5 transition hover:bg-neutral-50"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold text-neutral-800">
                          {payment.name}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-neutral-400">
                          {payment.paket} • {payment.date}
                        </p>
                        <p className="mt-0.5 text-[11px] text-amber-600">
                          diunggah {payment.age}
                        </p>
                      </div>

                      <p className="shrink-0 text-right text-[13px] font-bold text-neutral-800">
                        {formatRupiah(payment.total)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>

      <section className="rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/70">
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-sm font-bold text-neutral-900">
            Transaksi Terbaru
          </h2>
          <Link
            href="/admin/pemesanan"
            className="text-xs font-semibold text-grove-600 transition hover:text-grove-700"
          >
            Lihat semua →
          </Link>
        </div>

        <div className="overflow-x-auto border-t border-neutral-100">
          <table className="w-full min-w-[680px] text-left">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-neutral-400">
                <th className="px-5 py-3 font-semibold">Kode</th>
                <th className="px-5 py-3 font-semibold">Nama</th>
                <th className="px-5 py-3 font-semibold">Paket</th>
                <th className="px-5 py-3 font-semibold">Kunjungan</th>
                <th className="px-5 py-3 font-semibold">Total</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100">
              {transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-10 text-center text-xs text-neutral-400"
                  >
                    Belum ada transaksi.
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.id} className="text-[13px] text-neutral-500">
                    <td className="px-5 py-3.5 font-semibold text-neutral-800">
                      {tx.id}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-neutral-700">
                      {tx.name}
                    </td>
                    <td className="px-5 py-3.5">{tx.paket}</td>
                    <td className="whitespace-nowrap px-5 py-3.5">
                      {tx.date}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 font-semibold text-neutral-800">
                      {formatRupiah(tx.total)}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold ${STATUS_CLASS[tx.status]}`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Link
                        href="/admin/pembayaran"
                        className="inline-block rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
