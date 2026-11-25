import { apiFetch } from "@/lib/api";
import type { ReportStatus, ReportTx } from "@/types/report.types";

/* ==================== Tipe respons backend ==================== */

type ApiTransaction = {
  payment_id: number;
  booking_code: string;
  customer_name: string;
  customer_email: string;
  package_name: string;
  visit_date: string;
  visitor_count: number;
  payment_method: string;
  amount: string;
  payment_status: "pending" | "verified" | "rejected";
  rejection_reason: string | null;
  payment_created_at: string;
};

type ReportsResponse = {
  period: { from: string | null; to: string | null };
  summary: {
    payments: {
      total_payments: number;
      pending_payments: number;
      verified_payments: number;
      rejected_payments: number;
      verified_revenue: string;
    };
  };
  total_transactions: number;
  transactions: ApiTransaction[];
};

export type ReportSummary = {
  totalPayments: number;
  pendingPayments: number;
  verifiedPayments: number;
  rejectedPayments: number;
  verifiedRevenue: number;
};

export type ReportResult = {
  transactions: ReportTx[];
  summary: ReportSummary;
};

/* ==================== Mapping ==================== */

const STATUS_MAP: Record<ApiTransaction["payment_status"], ReportStatus> = {
  pending: "Pending",
  verified: "Terverifikasi",
  rejected: "Ditolak",
};

function mapTransaction(row: ApiTransaction): ReportTx {
  return {
    id: `#${row.booking_code}`,
    user: row.customer_name,
    paket: row.package_name,
    date: row.payment_created_at.slice(0, 10),
    nominal: Number(row.amount),
    status: STATUS_MAP[row.payment_status],
  };
}

/* ==================== Service ==================== */

export const reportsService = {
  /** Laporan transaksi sampai tanggal `to` (format YYYY-MM-DD). */
  async get(until: string): Promise<ReportResult> {
    const res = await apiFetch<ReportsResponse>(
      `/api/admin/reports?to=${encodeURIComponent(until)}`,
    );

    return {
      transactions: res.transactions.map(mapTransaction),
      summary: {
        totalPayments: res.summary.payments.total_payments,
        pendingPayments: res.summary.payments.pending_payments,
        verifiedPayments: res.summary.payments.verified_payments,
        rejectedPayments: res.summary.payments.rejected_payments,
        verifiedRevenue: Number(res.summary.payments.verified_revenue ?? 0),
      },
    };
  },
};
