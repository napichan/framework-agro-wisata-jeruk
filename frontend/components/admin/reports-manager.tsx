"use client";

import { useMemo, useState } from "react";
import {
  DATE_OPTIONS,
  REPORT_TX,
  computeReportStats,
  formatDate,
  rupiah,
  type ReportStatus,
} from "@/lib/admin-reports";
import { ReportChart } from "@/components/admin/report-chart";
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconDocument,
  IconDownload,
  IconSearch,
} from "@/components/icons";

const PAGE_SIZE = 6; // sesuai design: "Menampilkan 1-6 dari 184 transaksi"

type StatusFilter = "Semua Status" | ReportStatus;

const STATUS_OPTIONS: StatusFilter[] = [
  "Semua Status",
  "Terverifikasi",
  "Pending",
  "Ditolak",
];

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

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([`\uFEFF${content}`], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
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

export function ReportsManager() {
  const [date, setDate] = useState(DATE_OPTIONS[0]);
  const [status, setStatus] = useState<StatusFilter>("Semua Status");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  /** Data sesuai filter tanggal & status (dipakai kartu + tabel). */
  const scoped = useMemo(() => {
    return REPORT_TX.filter((tx) => {
      const matchDate = tx.date <= date;
      const matchStatus = status === "Semua Status" || tx.status === status;
      return matchDate && matchStatus;
    });
  }, [date, status]);

  const stats = useMemo(() => computeReportStats(scoped), [scoped]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return scoped.filter((tx) => {
      if (q === "") return true;
      return (
        tx.id.toLowerCase().includes(q) ||
        tx.user.toLowerCase().includes(q) ||
        tx.paket.toLowerCase().includes(q)
      );
    });
  }, [scoped, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  const pageNumbers = useMemo(() => {
    const from = Math.max(1, Math.min(currentPage - 1, totalPages - 2));
    const to = Math.min(totalPages, from + 2);
    const numbers: number[] = [];
    for (let n = from; n <= to; n++) numbers.push(n);
    return numbers;
  }, [currentPage, totalPages]);

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

  function exportCsv() {
    const header = ["ID", "Nama", "Paket", "Tanggal", "Total", "Status"];
    const rows = filtered.map((tx) =>
      [tx.id, tx.user, tx.paket, formatDate(tx.date), rupiah(tx.nominal), tx.status]
        .map((cell) => `"${cell.replace(/"/g, '""')}"`)
        .join(","),
    );

    download(
      "laporan-transaksi.csv",
      [header.join(","), ...rows].join("\n"),
      "text/csv;charset=utf-8;",
    );
  }

  function exportPdf() {
    // Render laporan sederhana ke jendela cetak (bisa "Save as PDF").
    const rows = filtered
      .map(
        (tx) =>
          `<tr><td>${tx.id}</td><td>${tx.user}</td><td>${tx.paket}</td><td>${formatDate(
            tx.date,
          )}</td><td>${rupiah(tx.nominal)}</td><td>${tx.status}</td></tr>`,
      )
      .join("");

    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Laporan Transaksi</title>
<style>
body{font-family:system-ui,sans-serif;padding:24px;color:#171717}
h1{font-size:20px;margin:0 0 4px}
p{font-size:12px;color:#737373;margin:0 0 16px}
table{width:100%;border-collapse:collapse;font-size:12px}
th,td{border:1px solid #e5e5e5;padding:6px 8px;text-align:left}
th{background:#fafafa}
</style></head><body>
<h1>Laporan Transaksi — Agro Petik Jeruk</h1>
<p>Periode s.d. ${formatDate(date)} • ${stats.total} transaksi • ${rupiah(
      stats.revenue,
    )} • ${stats.verifiedCount} terverifikasi (${stats.verifiedText}%)</p>
<table><thead><tr><th>ID</th><th>Nama</th><th>Paket</th><th>Tanggal</th><th>Total</th><th>Status</th></tr></thead>
<tbody>${rows}</tbody></table>
<script>window.onload = () => { window.print(); };</script>
</body></html>`;

    const win = window.open("", "_blank", "width=900,height=700");
    if (!win) return;
    win.document.write(html);
    win.document.close();
  }

  const from = filtered.length === 0 ? 0 : start + 1;
  const to = Math.min(start + PAGE_SIZE, filtered.length);

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
                onChange={(event) => {
                  setDate(event.target.value);
                  setPage(1);
                }}
                aria-label="Pilih tanggal laporan"
                className="cursor-pointer appearance-none rounded-xl border border-neutral-200 bg-white py-2.5 pl-9 pr-8 text-xs font-semibold text-neutral-600 outline-none transition focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
              >
                {DATE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {formatDate(option)}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter status */}
            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value as StatusFilter);
                setPage(1);
              }}
              aria-label="Filter status transaksi"
              className="rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-neutral-600 outline-none transition focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
            >
              {STATUS_OPTIONS.map((option) => (
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
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
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
            Menampilkan {from}-{to} dari {filtered.length} transaksi
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
