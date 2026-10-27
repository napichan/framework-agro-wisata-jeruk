"use client";

import type {
  ActivityLog,
  DashboardStat,
  DashboardTransaction,
  PaymentStatusItem,
  RevenuePoint,
} from "@/types/dashboard.types";

const stats: DashboardStat[] = [
  {
    label: "Total User",
    value: "248",
    delta: "+ 12%",
    icon: "users",
    iconClass: "bg-grove-100 text-grove-600",
  },
  {
    label: "Total Transaksi",
    value: "156",
    delta: "+ 8%",
    icon: "receipt",
    iconClass: "bg-brand-100 text-brand-600",
  },
  {
    label: "Pendapatan",
    value: "Rp 12.450.000",
    delta: "+ 16%",
    icon: "dollar",
    iconClass: "bg-grove-100 text-grove-700",
  },
  {
    label: "Pembayaran Pending",
    value: "18",
    delta: "+ 5%",
    icon: "clock",
    iconClass: "bg-amber-100 text-amber-600",
  },
];

const paymentStatus: PaymentStatusItem[] = [
  { label: "Terverifikasi", value: 128, color: "#3D8B48" },
  { label: "Pending", value: 18, color: "#F5A524" },
  { label: "Ditolak", value: 10, color: "#EF4444" },
];

const transactions: DashboardTransaction[] = [
  { id: "#001", name: "Dinda", paket: "Paket A", date: "28 Sep 2026", total: 150000, status: "Lunas" },
  { id: "#002", name: "Raka", paket: "Paket B", date: "27 Sep 2026", total: 250000, status: "Pending" },
  { id: "#003", name: "Budi Santoso", paket: "Petik Jeruk Sepuasnya", date: "27 Sep 2026", total: 350000, status: "Lunas" },
  { id: "#004", name: "Siti Rahmawati", paket: "Paket Edukasi", date: "26 Sep 2026", total: 400000, status: "Lunas" },
];

const revenue: RevenuePoint[] = [
  { bulan: "Mei", nilai: 6200000 },
  { bulan: "Jun", nilai: 7800000 },
  { bulan: "Jul", nilai: 9100000 },
  { bulan: "Agu", nilai: 8400000 },
  { bulan: "Sep", nilai: 10900000 },
  { bulan: "Okt", nilai: 12450000 },
];

const activityLog: ActivityLog[] = [
  { at: "26 Okt 2026, 08.15", email: "admin@agrowisata.com", status: "berhasil", ip: "182.253.10.4", ua: "Chrome 141 / Windows 11" },
  { at: "25 Okt 2026, 19.40", email: "admin@agrowisata.com", status: "gagal", ip: "182.253.10.4", ua: "Chrome 141 / Windows 11" },
  { at: "25 Okt 2026, 09.02", email: "rina@agrowisata.com", status: "berhasil", ip: "114.122.7.31", ua: "Safari / iPhone" },
];

function formatRupiah(value: number) {
  return `Rp${value.toLocaleString("id-ID")}`;
}

export function useDashboard() {
  const totalTransaksi = paymentStatus.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return {
    displayName: "Admin",
    stats,
    paymentStatus,
    totalTransaksi,
    transactions,
    revenue,
    activityLog,
    formatRupiah,
  };
}