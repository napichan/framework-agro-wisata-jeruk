import { apiFetch } from "@/lib/api";
import type { RevenuePoint } from "@/types/dashboard.types";

/* ==================== Tipe respons backend ==================== */

type PendingPaymentRow = {
  id: number;
  amount: string;
  proof_path: string | null;
  created_at: string;
  booking_code: string;
  package_name: string;
  visit_date: string;
  customer_name: string;
};

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
    revenueThisMonth: string;
    pendingPaymentAmount: string;
    oldestPendingPaymentAt: string | null;
    todayVisits: number;
    upcomingVisits: number;
    activeTickets: number;
    todayScans: number;
    pendingQueue: PendingPaymentRow[];
    recentTransactions: Array<{
      booking_code: string;
      package_name: string;
      visit_date: string;
      total_amount: string;
      payment_status: "pending" | "verified" | "rejected" | null;
      customer_name: string;
    }>;
    dailyRevenue: Array<{
      day: string;
      total: string;
    }>;
    monthlyRevenue: Array<{
      month: string;
      total: string;
    }>;
  };
};

export type DashboardSummary = {
  totalUsers: number;
  totalPackages: number;
  totalBookings: number;
  bookings: DashboardApiResponse["data"]["bookings"];
  payments: DashboardApiResponse["data"]["payments"];
  verifiedRevenue: number;
  revenueThisMonth: number;
  pendingPaymentAmount: number;
  oldestPendingPaymentAt: string | null;
  todayVisits: number;
  upcomingVisits: number;
  activeTickets: number;
  todayScans: number;
  pendingQueue: Array<{
    id: number;
    code: string;
    name: string;
    paket: string;
    date: string;
    total: number;
    uploadedAt: string;
  }>;
  recentTransactions: DashboardApiResponse["data"]["recentTransactions"];
  dailyRevenue: Array<{ day: string; total: number }>;
  monthlyRevenue: Array<{ month: string; total: number }>;
};

/* ==================== Helper ==================== */

const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

const pad = (value: number) => String(value).padStart(2, "0");

/** "2024-10-28T09:15:00.000Z" -> "28 Okt 2024" (deterministik, aman untuk SSR/CSR). */
export function formatDateID(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${Number(day)} ${MONTH_ABBR[Number(month) - 1]} ${year}`;
}

/** "2024-10-28T09:15:00.000Z" -> "28/10". */
function formatShortDateID(iso: string): string {
  const [, month, day] = iso.slice(0, 10).split("-");
  return `${day}/${month}`;
}

/** Selisih waktu dalam jam, untuk label umur antrean. */
export function ageInHours(iso: string): number {
  return Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000));
}

function buildDailyPoints(
  rows: Array<{ day: string; total: number }>,
  days: number,
): RevenuePoint[] {
  const map = new Map(rows.map((row) => [row.day, row.total]));
  const points: RevenuePoint[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const key = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

    points.push({
      label: formatShortDateID(key),
      nilai: map.get(key) ?? 0,
    });
  }

  return points;
}

function buildMonthlyPoints(
  rows: Array<{ month: string; total: number }>,
): RevenuePoint[] {
  const map = new Map(rows.map((row) => [row.month, row.total]));
  const points: RevenuePoint[] = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;

    points.push({
      label: MONTH_ABBR[date.getMonth()],
      nilai: map.get(key) ?? 0,
    });
  }

  return points;
}

/* ==================== Service ==================== */

export const dashboardService = {
  /** Ringkasan dashboard admin. */
  async summary(): Promise<DashboardSummary> {
    const res = await apiFetch<DashboardApiResponse>("/api/admin/dashboard");
    const d = res.data;

    return {
      totalUsers: d.totalUsers,
      totalPackages: d.totalPackages,
      totalBookings: d.totalBookings,
      bookings: d.bookings,
      payments: d.payments,
      verifiedRevenue: Number(d.verifiedRevenue ?? 0),
      revenueThisMonth: Number(d.revenueThisMonth ?? 0),
      pendingPaymentAmount: Number(d.pendingPaymentAmount ?? 0),
      oldestPendingPaymentAt: d.oldestPendingPaymentAt,
      todayVisits: d.todayVisits ?? 0,
      upcomingVisits: d.upcomingVisits ?? 0,
      activeTickets: d.activeTickets ?? 0,
      todayScans: d.todayScans ?? 0,
      pendingQueue: (d.pendingQueue ?? []).map((row) => ({
        id: row.id,
        code: row.booking_code,
        name: row.customer_name,
        paket: row.package_name,
        date: formatDateID(row.visit_date),
        total: Number(row.amount),
        uploadedAt: row.created_at,
      })),
      recentTransactions: d.recentTransactions,
      dailyRevenue: (d.dailyRevenue ?? []).map((row) => ({
        day: row.day,
        total: Number(row.total),
      })),
      monthlyRevenue: (d.monthlyRevenue ?? []).map((row) => ({
        month: row.month,
        total: Number(row.total),
      })),
    };
  },

  /** Seri grafik pendapatan harian. */
  dailyPoints(summary: DashboardSummary, days: number): RevenuePoint[] {
    return buildDailyPoints(summary.dailyRevenue, days);
  },

  /** Seri grafik pendapatan 6 bulan terakhir. */
  monthlyPoints(summary: DashboardSummary): RevenuePoint[] {
    return buildMonthlyPoints(summary.monthlyRevenue);
  },
};
