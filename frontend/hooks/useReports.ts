"use client";

import { useMemo, useState } from "react";
import type {
  ChartMode,
  ChartSeries,
  ReportStats,
  ReportStatus,
  ReportStatusFilter,
  ReportTx,
} from "@/types/report.types";

/**
 * Data demo Laporan.
 * Angka dirancang agar cocok dengan design Figma:
 * - Total transaksi : 184
 * - Total pendapatan: Rp 14.850.000 (dari seluruh transaksi)
 * - Terverifikasi   : 168 (91,3%)
 * - Ditolak / Batal : 15 (8,2%) + 1 Pending = 184
 *
 * Untuk produksi: ganti dengan panggilan API (apiFetch dari @/lib/api).
 */

const PAGE_SIZE = 6; // sesuai design: "Menampilkan 1-6 dari 184 transaksi"

const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

/** "2024-10-28" -> "28 Okt 2024" (deterministik, aman untuk SSR/CSR). */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${Number(day)} ${MONTH_ABBR[Number(month) - 1]} ${year}`;
}

export const rupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;

/* ==================== 6 baris pertama (persis design) ==================== */

const FEATURED: ReportTx[] = [
  {
    id: "#TRX-1824",
    user: "Budi Hartono",
    paket: "Paket Keluarga 5 Pax",
    date: "2024-10-28",
    nominal: 450_000,
    status: "Terverifikasi",
  },
  {
    id: "#TRX-1823",
    user: "Siti Aminah",
    paket: "Petik Sendiri 3kg Jeruk",
    date: "2024-10-28",
    nominal: 225_000,
    status: "Terverifikasi",
  },
  {
    id: "#TRX-1822",
    user: "Yayasan Insan Cita",
    paket: "Paket Edukasi 35 Pax",
    date: "2024-10-27",
    nominal: 2_425_000,
    status: "Terverifikasi",
  },
  {
    id: "#TRX-1821",
    user: "Denny Sumargo",
    paket: "Tiket Masuk Weekend 40 Pax",
    date: "2024-10-27",
    nominal: 180_000,
    status: "Pending",
  },
  {
    id: "#TRX-1820",
    user: "Hendri Kurniawan",
    paket: "Petik Jeruk 2 Orang",
    date: "2024-10-26",
    nominal: 90_000,
    status: "Ditolak",
  },
  {
    id: "#TRX-1819",
    user: "Dimas Lestari",
    paket: "Paket VIP Kebun Siang",
    date: "2024-10-25",
    nominal: 350_000,
    status: "Terverifikasi",
  },
];

/* ==================== Pool generate ==================== */

const FIRST_NAMES = [
  "Agus", "Dewi", "Fajar", "Rizky", "Putri", "Bayu", "Intan", "Yoga",
  "Lestari", "Hendra", "Melati", "Arif", "Citra", "Dimas", "Rina", "Taufik",
  "Wulan", "Ilham", "Vina", "Galih", "Anisa", "Reza", "Fitri", "Bagus",
];

const LAST_NAMES = [
  "Wijaya", "Saputra", "Permata", "Hidayat", "Nugroho", "Susanto",
  "Anggraini", "Kusuma", "Firmansyah", "Ramadhan", "Oktaviani", "Sanjaya",
];

const PAKETS = [
  "Tiket Masuk Reguler 2 Tiket",
  "Tiket Masuk Reguler 4 Tiket",
  "Petik Jeruk 2 Orang",
  "Paket Keluarga 5 Pax",
  "Petik Sendiri 3kg Jeruk",
  "Paket VIP Kebun Siang",
  "Tiket Masuk Weekend 40 Pax",
];

/** Target total pendapatan (sesuai design). */
const REVENUE_TARGET = 14_850_000;
const FEATURED_SUM = FEATURED.reduce((total, tx) => total + tx.nominal, 0);

/**
 * Nominal tiket/paket kecil — mayoritas transaksi adalah penjualan tiket.
 * 177 nilai pertama dari pool, 1 nilai terakhir diseimbangkan
 * agar total pendapatan tepat Rp 14.850.000.
 */
const NOMINAL_POOL = [
  35_000, 40_000, 45_000, 50_000, 55_000, 60_000, 65_000, 70_000,
  75_000, 85_000, 95_000,
];

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

const GENERATED_COUNT = 178; // 184 - 6 baris design

function buildGenerated(): ReportTx[] {
  const firstCount = GENERATED_COUNT - 1;

  // 177 nominal dari pool + 1 penyeimbang
  const nominals = Array.from(
    { length: firstCount },
    (_, i) => NOMINAL_POOL[i % NOMINAL_POOL.length],
  );
  nominals.push(REVENUE_TARGET - FEATURED_SUM - sum(nominals));

  const lastNominal = nominals[nominals.length - 1];
  if (lastNominal < 20_000 || lastNominal > 500_000) {
    throw new Error(`Nominal penyeimbang tidak wajar: ${lastNominal}`);
  }

  return Array.from({ length: GENERATED_COUNT }, (_, i) => {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last =
      LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length];
    const day = 24 - (i % 24); // 24 Okt s.d. 01 Okt, berulang

    return {
      id: `#TRX-${1818 - i}`,
      user: `${first} ${last}`,
      paket: PAKETS[i % PAKETS.length],
      date: `2024-10-${String(day).padStart(2, "0")}`,
      nominal: nominals[i],
      // 14 ditolak (i = 5, 18, 31, ... 174), sisanya terverifikasi
      status: (i % 13 === 5 ? "Ditolak" : "Terverifikasi") as ReportStatus,
    };
  });
}

const REPORT_TX: ReportTx[] = [...FEATURED, ...buildGenerated()];

/* ==================== Statistik ==================== */

function computeReportStats(txs: ReportTx[]): ReportStats {
  const total = txs.length;
  const verified = txs.filter((tx) => tx.status === "Terverifikasi").length;
  const rejected = txs.filter((tx) => tx.status === "Ditolak").length;
  const pending = txs.filter((tx) => tx.status === "Pending").length;
  const verifiedRatio = total === 0 ? 0 : (verified / total) * 100;
  const rejectedRatio = total === 0 ? 0 : (rejected / total) * 100;

  return {
    total,
    revenue: txs.reduce((acc, tx) => acc + tx.nominal, 0),
    verifiedCount: verified,
    verifiedRatio,
    verifiedText: verifiedRatio.toFixed(1).replace(".", ","),
    rejectedCount: rejected,
    rejectedRatio,
    rejectedText: rejectedRatio.toFixed(1).replace(".", ","),
    pendingCount: pending,
  };
}

/* ==================== Data grafik ==================== */

/**
 * Ketiga seri menjumlah tepat Rp 14.850.000 (periode berjalan).
 */
export const CHART_SERIES: Record<ChartMode, ChartSeries> = {
  bulanan: {
    labels: ["Mei", "Jun", "Jul", "Agu", "Sep", "Okt (Aktif)"],
    values: [
      8_650_000, 9_400_000, 10_750_000, 11_300_000, 12_950_000, 14_850_000,
    ],
    activeIndex: 5,
  },
  mingguan: {
    labels: ["Mgg 1", "Mgg 2", "Mgg 3", "Mgg 4", "Mgg 5"],
    values: [3_200_000, 3_450_000, 3_600_000, 3_150_000, 1_450_000],
    activeIndex: 4,
  },
  harian: {
    labels: ["22 Okt", "23 Okt", "24 Okt", "25 Okt", "26 Okt", "27 Okt", "28 Okt"],
    values: [
      1_850_000, 2_100_000, 1_950_000, 2_400_000, 2_250_000, 2_650_000,
      1_650_000,
    ],
    activeIndex: 6,
  },
};

/** Daftar tanggal untuk filter tanggal (28 Okt s.d. 1 Okt 2024). */
const DATE_OPTIONS: string[] = Array.from(
  { length: 28 },
  (_, i) => `2024-10-${String(28 - i).padStart(2, "0")}`,
);

const STATUS_OPTIONS: ReportStatusFilter[] = [
  "Semua Status",
  "Terverifikasi",
  "Pending",
  "Ditolak",
];

/* ==================== Export ==================== */

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([`\uFEFF${content}`], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/* ==================== Hook ==================== */

export function useReports() {
  const [date, setDate] = useState(DATE_OPTIONS[0]);
  const [status, setStatus] = useState<ReportStatusFilter>("Semua Status");
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

  const from = filtered.length === 0 ? 0 : start + 1;
  const to = Math.min(start + PAGE_SIZE, filtered.length);

  function changeDate(value: string) {
    setDate(value);
    setPage(1);
  }

  function changeStatus(value: ReportStatusFilter) {
    setStatus(value);
    setPage(1);
  }

  function changeQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

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

  return {
    // filter
    date,
    status,
    query,
    changeDate,
    changeStatus,
    changeQuery,
    dateOptions: DATE_OPTIONS,
    statusOptions: STATUS_OPTIONS,

    // data
    stats,
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
    exportCsv,
    exportPdf,
  };
}