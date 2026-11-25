"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ageInHours,
  dashboardService,
  formatDateID,
  type DashboardSummary,
} from "@/services/dashboard.service";
import type {
  DashboardStat,
  DashboardTransaction,
  RevenuePoint,
  TransactionStatus,
} from "@/types/dashboard.types";

export type RevenueRange = "7d" | "30d" | "6m";

export const formatRupiah = (value: number) =>
  `Rp${value.toLocaleString("id-ID")}`;

function toIso(at: string | Date): string {
  return (at instanceof Date ? at : new Date(at)).toISOString();
}

function ageLabel(iso: string): string {
  const hours = ageInHours(iso);

  if (hours < 1) return "baru saja";
  if (hours < 24) return `${hours} jam lalu`;

  return `${Math.floor(hours / 24)} hari lalu`;
}

function paymentStatusLabel(
  status: "pending" | "verified" | "rejected" | null,
): TransactionStatus {
  if (status === "verified") return "Lunas";
  if (status === "rejected") return "Ditolak";
  return "Pending";
}

export function useDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [range, setRange] = useState<RevenueRange>("30d");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      setSummary(await dashboardService.summary());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memuat data dashboard.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Jalankan lewat microtask supaya setState di dalam load() tidak terjadi
    // sinkron di body effect (memicu render berantai).
    void (async () => {
      await Promise.resolve();
      await load();
    })();
  }, [load]);

  const stats = useMemo<DashboardStat[]>(() => {
    if (!summary) return [];

    const oldest = summary.oldestPendingPaymentAt;

    return [
      {
        label: "Perlu Verifikasi",
        value: String(summary.payments.pending),
        hint:
          summary.payments.pending > 0
            ? `${formatRupiah(summary.pendingPaymentAmount)} • tertua ${
                oldest ? ageLabel(oldest) : "-"
              }`
            : "Tidak ada antrean",
        icon: "clock",
        iconClass: "bg-amber-100 text-amber-600",
      },
      {
        label: "Kunjungan Hari Ini",
        value: String(summary.todayVisits),
        hint: `${summary.upcomingVisits} kunjungan 7 hari ke depan`,
        icon: "users",
        iconClass: "bg-brand-100 text-brand-600",
      },
      {
        label: "Tiket Aktif",
        value: String(summary.activeTickets),
        hint: `${summary.todayScans} scan hari ini`,
        icon: "ticket",
        iconClass: "bg-grove-100 text-grove-600",
      },
      {
        label: "Pendapatan Bulan Ini",
        value: formatRupiah(summary.revenueThisMonth),
        hint: `Total ${formatRupiah(summary.verifiedRevenue)}`,
        icon: "dollar",
        iconClass: "bg-grove-100 text-grove-700",
      },
    ];
  }, [summary]);

  const transactions = useMemo<DashboardTransaction[]>(
    () =>
      (summary?.recentTransactions ?? []).map((tx) => ({
        id: tx.booking_code,
        name: tx.customer_name,
        paket: tx.package_name,
        date: formatDateID(toIso(tx.visit_date)),
        total: Number(tx.total_amount),
        status: paymentStatusLabel(tx.payment_status),
      })),
    [summary],
  );

  const pendingPayments = useMemo(
    () =>
      (summary?.pendingQueue ?? []).map((row) => ({
        ...row,
        age: ageLabel(row.uploadedAt),
      })),
    [summary],
  );

  const revenue = useMemo<RevenuePoint[]>(() => {
    if (!summary) return [];

    if (range === "6m") return dashboardService.monthlyPoints(summary);

    return dashboardService.dailyPoints(summary, range === "7d" ? 7 : 30);
  }, [summary, range]);

  return {
    loading,
    error,
    stats,
    transactions,
    pendingPayments,
    pendingCount: summary?.payments.pending ?? 0,
    revenue,
    range,
    setRange,
    formatRupiah,
    reload: load,
  };
}
