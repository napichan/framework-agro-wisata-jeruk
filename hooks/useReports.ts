"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { reportsService, type ReportSummary } from "@/services/reports.service";
import { downloadExcel } from "@/lib/excel";
import type {
  ChartMode,
  ChartSeries,
  ReportStats,
  ReportStatusFilter,
  ReportTx,
} from "@/types/report.types";

const PAGE_SIZE = 6; // sesuai design: "Menampilkan 1-6 dari ..."

const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

/** "2024-10-28" -> "28 Okt 2024" (deterministik, aman untuk SSR/CSR). */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${Number(day)} ${MONTH_ABBR[Number(month) - 1]} ${year}`;
}

export const rupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;

const pad = (value: number) => String(value).padStart(2, "0");

function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** 28 tanggal terakhir sampai hari ini, terbaru di depan. */
function buildDateOptions(): string[] {
  const today = new Date();
  return Array.from({ length: 28 }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    return toIsoDate(date);
  });
}

const STATUS_OPTIONS: ReportStatusFilter[] = [
  "Semua Status",
  "Terverifikasi",
  "Pending",
  "Ditolak",
];

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

/* ==================== Grafik dari data transaksi ==================== */

/** Seri pendapatan terverifikasi per hari/bulan pada tanggal `endDate`. */
function buildChartSeries(txs: ReportTx[], endDate: string): Record<ChartMode, ChartSeries> {
  const verified = txs.filter((tx) => tx.status === "Terverifikasi");
  const end = new Date(`${endDate}T00:00:00.000`);

  // Bulanan: 6 bulan terakhir sampai tanggal akhir.
  const monthLabels: string[] = [];
  const monthValues: number[] = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date(end.getFullYear(), end.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
    monthLabels.push(MONTH_ABBR[date.getMonth()]);
    monthValues.push(sum(verified.filter((tx) => tx.date.slice(0, 7) === key).map((tx) => tx.nominal)));
  }

  // Harian: 7 hari terakhir sampai tanggal akhir.
  const dayLabels: string[] = [];
  const dayValues: number[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(end.getFullYear(), end.getMonth(), end.getDate() - i);
    const key = toIsoDate(date);
    dayLabels.push(`${date.getDate()} ${MONTH_ABBR[date.getMonth()]}`);
    dayValues.push(sum(verified.filter((tx) => tx.date === key).map((tx) => tx.nominal)));
  }

  // Mingguan: 5 pekan (Senin-Minggu) yang berakhir pada pekan tanggal akhir.
  const dayOfWeek = (end.getDay() + 6) % 7; // 0 = Senin
  const endMonday = new Date(end.getFullYear(), end.getMonth(), end.getDate() - dayOfWeek);
  const weekLabels: string[] = [];
  const weekValues: number[] = [];
  for (let i = 4; i >= 0; i--) {
    const monday = new Date(endMonday.getFullYear(), endMonday.getMonth(), endMonday.getDate() - i * 7);
    const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
    const from = toIsoDate(monday);
    const to = toIsoDate(sunday);
    weekLabels.push(`Mgg ${5 - i}`);
    weekValues.push(sum(verified.filter((tx) => tx.date >= from && tx.date <= to).map((tx) => tx.nominal)));
  }

  return {
    bulanan: { labels: monthLabels, values: monthValues, activeIndex: monthLabels.length - 1 },
    mingguan: { labels: weekLabels, values: weekValues, activeIndex: weekLabels.length - 1 },
    harian: { labels: dayLabels, values: dayValues, activeIndex: dayLabels.length - 1 },
  };
}

/* ==================== Helper ==================== */

function errorMessage(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback;
}

/* ==================== Hook ==================== */

export function useReports() {
  const dateOptions = useMemo(() => buildDateOptions(), []);
  const [date, setDate] = useState(dateOptions[0]);
  const [status, setStatus] = useState<ReportStatusFilter>("Semua Status");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [transactions, setTransactions] = useState<ReportTx[]>([]);
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (until: string) => {
    setError(null);

    try {
      const res = await reportsService.get(until);

      setTransactions(res.transactions);
      setSummary(res.summary);
    } catch (err) {
      setError(errorMessage(err, "Gagal memuat laporan."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Jalankan lewat microtask supaya setState di dalam load() tidak terjadi
    // sinkron di body effect (memicu render berantai).
    void (async () => {
      await Promise.resolve();
      await load(date);
    })();
  }, [date, load]);

  const stats: ReportStats = useMemo(() => {
    const total = summary?.totalPayments ?? 0;
    const verifiedCount = summary?.verifiedPayments ?? 0;
    const rejectedCount = summary?.rejectedPayments ?? 0;
    const pendingCount = summary?.pendingPayments ?? 0;
    const verifiedRatio = total === 0 ? 0 : (verifiedCount / total) * 100;
    const rejectedRatio = total === 0 ? 0 : (rejectedCount / total) * 100;

    return {
      total,
      revenue: summary?.verifiedRevenue ?? 0,
      verifiedCount,
      verifiedRatio,
      verifiedText: verifiedRatio.toFixed(1).replace(".", ","),
      rejectedCount,
      rejectedRatio,
      rejectedText: rejectedRatio.toFixed(1).replace(".", ","),
      pendingCount,
    };
  }, [summary]);

  const chartSeries = useMemo(() => buildChartSeries(transactions, date), [transactions, date]);

  const scoped = useMemo(() => {
    return transactions.filter(
      (tx) => status === "Semua Status" || tx.status === status,
    );
  }, [transactions, status]);

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

  const from = filtered.length === 0 ? 0 : start + 1;
  const to = Math.min(start + PAGE_SIZE, filtered.length);

  function changeDate(value: string) {
    setDate(value);
    setPage(1);
    setLoading(true);
  }

  function changeStatus(value: ReportStatusFilter) {
    setStatus(value);
    setPage(1);
  }

  function changeQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function exportExcel() {
    const header = ["ID", "Nama", "Paket", "Tanggal", "Total", "Status"];
    const rows = filtered.map((tx) => [
      tx.id,
      tx.user,
      tx.paket,
      formatDate(tx.date),
      tx.nominal,
      tx.status,
    ]);

    void downloadExcel("laporan-transaksi.xlsx", "Laporan", header, rows, {
      currencyColumns: [4],
      columnWidths: [28, 24, 24, 14, 14, 14],
    });
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

  return {
    // status muat
    loading,
    error,

    // filter
    date,
    status,
    query,
    changeDate,
    changeStatus,
    changeQuery,
    dateOptions,
    statusOptions: STATUS_OPTIONS,

    // data
    stats,
    chartSeries,
    visible,
    totalFiltered: filtered.length,

    // paginasi
    from,
    to,
    currentPage,
    totalPages,
    pageNumbers,
    setPage,

    // export
    exportExcel,
    exportPdf,
  };
}
