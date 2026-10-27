"use client";

import { formatDate, rupiah, useReports } from "@/hooks/useReports";
import type { ReportStatus, ReportStatusFilter } from "@/types/report.types";
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconDocument,
  IconDownload,
  IconSearch,
} from "@/components/ui/icons";
import ReportChart from "./report-chart";

const STATUS_STYLE: Record<ReportStatus, { bg: string; text: string }> = {
  Terverifikasi: { bg: "bg-grove-100", text: "text-grove-700" },
  Pending: { bg: "bg-amber-100", text: "text-amber-700" },
  Ditolak: { bg: "bg-red-100", text: "text-red-600" },
};

const AVATAR_COLORS = [
  "bg-grove-500",
  "bg-brand-500",
  "bg-sky-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-teal-500",
  "bg-indigo-500",
];

function avatarColor(id: string): string {
  let hash = 0;
  for (const ch of id) hash = (hash + ch.charCodeAt(0)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[hash];
}

/* ==================== Kartu statistik ==================== */

type StatCard = {
  label: string;
  value: string;
  sub: string;
  chip: string;
  chipClass: string;
  icon: typeof IconDocument;
  iconClass: string;
};

export default function ReportContents() {
  const {
    date,
    status,
    query,
    changeDate,
    changeStatus,
    changeQuery,
    dateOptions,
    statusOptions,
    stats,
    visible,
    totalFiltered,
    from,
    to,
    currentPage,
    totalPages,
    pageNumbers,
    setPage,
    exportCsv,
    exportPdf,
  } = useReports();

  const statCards: StatCard[] = [
    {
      label: "Total Transaksi",
      value: String(stats.total),
      sub: "↑ 7,2% dari bulan lalu",
      chip: "+7,2%",
      chipClass: "bg-grove-100 text-grove-700",
      icon: IconDocument,
      iconClass: "bg-brand-100 text-brand-600",
    },
    {
      label: "Total Pendapatan",
      value: rupiah(stats.revenue),
      sub: "Target bulanan Rp 15 Jt",
      chip: "+16%",
      chipClass: "bg-grove-100 text-grove-700",
      icon: IconDownload,
      iconClass: "bg-brand-100 text-brand-600",
    },
    {
      label: "Terverifikasi",
      value: `${stats.verifiedCount} Transaksi`,
      sub: `${stats.verifiedText}% dari total transaksi`,
      chip: `${stats.verifiedText}% Rasio`,
      chipClass: "bg-grove-100 text-grove-700",
      icon: IconCalendar,
      iconClass: "bg-grove-100 text-grove-600",
    },
    {
      label: "Ditolak / Batal",
      value: `${stats.rejectedCount} Transaksi`,
      sub: `${stats.rejectedText}% dari total transaksi`,
      chip: `${stats.rejectedText}% Rasio`,
      chipClass: "bg-red-100 text-red-600",
      icon: IconDocument,
      iconClass: "bg-red-100 text-red-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
              Laporan
            </h1>

            <span className="flex items-center gap-1.5 rounded-full bg-grove-100 px-2.5 py-1 text-[11px] font-bold text-grove-700">
              <span className="h-1.5 w-1.5 rounded-full bg-grove-500" />
              Data Live
            </span>
          </div>

          <p className="mt-1.5 max-w-2xl text-sm text-neutral-400">
            Rekap pendapatan dan riwayat transaksi agrowisata periode berjalan
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          <div className="flex flex-wrap items-center gap-2">
            {/* Filter tanggal */}
            <div className="relative">
              <IconCalendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

              <select
                value={date}
                onChange={(event) => changeDate(event.target.value)}
                aria-label="Pilih tanggal laporan"
                className="cursor-pointer appearance-none rounded-xl border border-neutral-200 bg-white py-2.5 pl-9 pr-8 text-xs font-semibold text-neutral-600 outline-none transition focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
              >
                {dateOptions.map((option) => (
                  <option key={option} value={option}>
                    {formatDate(option)}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter status */}
            <select
              value={status}
              onChange={(event) =>
                changeStatus(event.target.value as ReportStatusFilter)
              }
              aria-label="Filter status transaksi"
              className="rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-neutral-600 outline-none transition focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={exportPdf}
              className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-bold text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50"
            >
              <IconDocument className="h-4 w-4 text-red-500" />
              Unduh PDF
            </button>

            <button
              type="button"
              onClick={exportCsv}
              className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-bold text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50"
            >
              <IconDownload className="h-4 w-4 text-grove-600" />
              Unduh Excel
            </button>
          </div>
        </div>
      </div>

      {/* ================= KARTU STATISTIK ================= */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.iconClass}`}
                >
                  <Icon className="h-4 w-4" />
                </span>

                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${card.chipClass}`}
                >
                  {card.chip}
                </span>
              </div>

              <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-neutral-400">
                {card.label}
              </p>

              <p className="mt-1 truncate text-xl font-extrabold tracking-tight text-neutral-900">
                {card.value}
              </p>

              <p className="mt-1 truncate text-[11px] text-neutral-400">
                {card.sub}
              </p>
            </div>
          );
        })}
      </section>

      {/* ================= GRAFIK ================= */}
      <ReportChart />

      {/* ================= RIWAYAT TRANSAKSI ================= */}
      <section className="rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/70">
        <div className="flex flex-col gap-4 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-sm font-bold text-neutral-900">
              Riwayat Transaksi
            </h2>
            <p className="mt-0.5 text-xs text-neutral-400">
              Daftar transaksi terakhir dan status validasi periode berjalan
            </p>
          </div>

          <div className="relative w-full lg:max-w-xs">
            <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

            <input
              type="search"
              value={query}
              onChange={(event) => changeQuery(event.target.value)}
              placeholder="Cari TRX, nama user..."
              aria-label="Cari transaksi"
              className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
            />
          </div>
        </div>

        <div className="overflow-x-auto border-t border-neutral-100">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-neutral-100 text-[11px] uppercase tracking-wide text-neutral-400">
                <th className="px-5 py-3.5 font-semibold">ID Transaksi</th>
                <th className="px-5 py-3.5 font-semibold">Nama User</th>
                <th className="px-5 py-3.5 font-semibold">Paket</th>
                <th className="px-5 py-3.5 font-semibold">Tanggal</th>
                <th className="px-5 py-3.5 font-semibold">Total</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100">
              {visible.length > 0 ? (
                visible.map((tx) => (
                  <tr
                    key={tx.id}
                    className="text-[13px] text-neutral-500 transition hover:bg-neutral-50/60"
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-bold text-brand-600">
                      {tx.id}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${avatarColor(tx.id)}`}
                        >
                          {tx.user
                            .split(" ")
                            .slice(0, 2)
                            .map((part) => part.charAt(0))
                            .join("")
                            .toUpperCase()}
                        </span>

                        <span className="font-semibold text-neutral-800">
                          {tx.user}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">{tx.paket}</td>

                    <td className="whitespace-nowrap px-5 py-4">
                      {formatDate(tx.date)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-bold text-neutral-900">
                      {rupiah(tx.nominal)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold ${STATUS_STYLE[tx.status].bg} ${STATUS_STYLE[tx.status].text}`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-14 text-center text-sm text-neutral-400"
                  >
                    Tidak ada transaksi yang cocok dengan pencarianmu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer tabel */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-100 px-5 py-4 sm:flex-row sm:px-6">
          <p className="text-xs text-neutral-400">
            Menampilkan {from}-{to} dari {totalFiltered} transaksi
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-500 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <IconChevronLeft className="h-3.5 w-3.5" />
              Sebelumnya
            </button>

            {pageNumbers.map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => setPage(number)}
                aria-current={number === currentPage ? "page" : undefined}
                className={`min-w-8 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  number === currentPage
                    ? "bg-grove-700 text-white"
                    : "border border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50"
                }`}
              >
                {number}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-500 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Selanjutnya
              <IconChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}