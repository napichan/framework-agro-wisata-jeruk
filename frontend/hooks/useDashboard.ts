"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type {
  ActivityLog,
  DashboardStat,
  DashboardTransaction,
  PaymentStatusItem,
  RevenuePoint,
} from "@/types/dashboard.types";

const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

export const formatRupiah = (value: number) =>
  `Rp${value.toLocaleString("id-ID")}`;

/** "2024-10-28T09:15:00.000Z" -> "28 Okt 2024" (deterministik, aman untuk SSR/CSR). */
export function formatDateID(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${Number(day)} ${MONTH_ABBR[Number(month) - 1]} ${year}`;
}

type DashboardApiResponse = {
  data: {
    totalUsers: number;
    totalPackages: number;
    totalBookings: number;
    bookings: {
      pending: number;
      confirmed: number;
      cancelled: number;
    };
    totalPayments: number;
    payments: {
      pending: number;
      verified: number;
      rejected: number;
    };
    verifiedRevenue: string;
    recentTransactions: Array<{
      booking_code: string;
      package_name: string;
      visit_date: string;
      total_amount: string;
      payment_status: "pending" | "verified" | "rejected" | null;
      customer_name: string;
    }>;
    monthlyRevenue: Array<{
      month: string;
      total: string;
    }>;
  };
};

type LoginActivityResponse = {
  data: Array<{
    created_at: string;
    email: string;
  }>;
};

function toIso(at: string | Date): string {
  return (at instanceof Date ? at : new Date(at)).toISOString();
}

export function useDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusItem[]>([]);
  const [transactions, setTransactions] = useState<DashboardTransaction[]>([]);
  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [dashboard, loginActivity] = await Promise.all([
        apiFetch<DashboardApiResponse>("/api/admin/dashboard"),
        apiFetch<LoginActivityResponse>("/api/admin/login-activity").catch(
          () => null,
        ),
      ]);

      const d = dashboard.data;
      const revenueValue = Number(d.verifiedRevenue ?? 0);

      setStats([
        {
          label: "Total User",
          value: String(d.totalUsers),
          delta: "",
          icon: "users",
          iconClass: "bg-grove-100 text-grove-600",
        },
        {
          label: "Total Transaksi",
          value: String(d.totalBookings),
          delta: "",
          icon: "receipt",
          iconClass: "bg-brand-100 text-brand-600",
        },
        {
          label: "Pendapatan",
          value: formatRupiah(revenueValue),
          delta: "",
          icon: "dollar",
          iconClass: "bg-grove-100 text-grove-700",
        },
        {
          label: "Pembayaran Pending",
          value: String(d.payments.pending),
          delta: "",
          icon: "clock",
          iconClass: "bg-amber-100 text-amber-600",
        },
      ]);

      setPaymentStatus([
        { label: "Terverifikasi", value: d.payments.verified, color: "#3D8B48" },
        { label: "Pending", value: d.payments.pending, color: "#F5A524" },
        { label: "Ditolak", value: d.payments.rejected, color: "#EF4444" },
      ]);

      setTransactions(
        d.recentTransactions.map((tx) => ({
          id: tx.booking_code,
          name: tx.customer_name,
          paket: tx.package_name,
          date: formatDateID(toIso(tx.visit_date)),
          total: Number(tx.total_amount),
          status: tx.payment_status === "verified" ? "Lunas" : "Pending",
        })),
      );

      // Isi 6 bulan terakhir; bulan tanpa pendapatan bernilai 0.
      const monthlyMap = new Map(
        d.monthlyRevenue.map((item) => [item.month, Number(item.total)]),
      );
      const now = new Date();
      const revenuePoints: RevenuePoint[] = [];

      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

        revenuePoints.push({
          bulan: MONTH_ABBR[date.getMonth()],
          nilai: monthlyMap.get(key) ?? 0,
        });
      }

      setRevenue(revenuePoints);

      setActivityLog(
        (loginActivity?.data ?? []).map((session) => {
          const iso = toIso(session.created_at);

          return {
            at: `${formatDateID(iso)}, ${iso.slice(11, 16).replace(":", ".")}`,
            email: session.email,
            status: "berhasil" as const,
            ip: "-",
            ua: "-",
          };
        }),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memuat data dashboard.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    displayName: "Admin",
    loading,
    error,
    stats,
    paymentStatus,
    transactions,
    revenue,
    activityLog,
    formatRupiah,
    reload: load,
  };
}
