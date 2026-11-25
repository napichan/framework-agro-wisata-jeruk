import { apiFetch } from "@/lib/api";
import type { Payment, PaymentStatus } from "@/types/payments.types";

/* ==================== Tipe respons backend ==================== */

type ApiPayment = {
  id: number;
  booking_id: number;
  payment_method: string;
  amount: string;
  proof_path: string | null;
  status: "pending" | "verified" | "rejected";
  verified_by: number | null;
  verified_by_name: string | null;
  verified_at: string | null;
  rejection_reason: string | null;
  created_at: string;
  booking_code: string;
  package_name: string;
  visit_date: string;
  visitor_count: number;
  customer_name: string;
  customer_email: string;
};

export type PaymentsResponse = {
  total: number;
  data: ApiPayment[];
};

/* ==================== Mapping ==================== */

const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

/** "2024-10-28T09:15:00.000Z" -> "28 Okt 2024" (aman untuk SSR/CSR). */
function formatDateID(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${Number(day)} ${MONTH_ABBR[Number(month) - 1]} ${year}`;
}

/** ISO -> "09.15 WIB" (diambil dari jam data, bukan zona lokal). */
function formatTimeWIB(iso: string): string {
  return `${iso.slice(11, 16).replace(":", ".")} WIB`;
}

const STATUS_MAP: Record<ApiPayment["status"], PaymentStatus> = {
  pending: "Menunggu",
  verified: "Diverifikasi",
  rejected: "Ditolak",
};

function mapPayment(row: ApiPayment): Payment {
  return {
    id: String(row.id),
    bookingCode: row.booking_code,
    date: formatDateID(row.created_at),
    time: formatTimeWIB(row.created_at),
    customer: row.customer_name,
    paket: row.package_name,
    bank: row.payment_method,
    nominal: Number(row.amount),
    status: STATUS_MAP[row.status],
    hasSlip: Boolean(row.proof_path),
    proofPath: row.proof_path ?? undefined,
    verifiedBy: row.verified_by_name ?? undefined,
    verifiedAt: row.verified_at ?? undefined,
    infoNote: row.rejection_reason ?? undefined,
  };
}

/** URL publik berkas bukti transfer (disajikan backend di /uploads). */
export function proofUrl(path?: string): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;

  const base = process.env.NEXT_PUBLIC_API_URL ?? "";
  return `${base}/${path.replace(/^\/+/, "")}`;
}

/* ==================== Service ==================== */

export const paymentsService = {
  /** Ambil semua pembayaran yang sudah dipetakan ke tipe UI. */
  async list(): Promise<Payment[]> {
    const res = await apiFetch<PaymentsResponse>("/api/admin/payments");
    return res.data.map(mapPayment);
  },

  /** Setujui / verifikasi pembayaran. */
  async verify(id: string): Promise<void> {
    await apiFetch(`/api/admin/payments/${id}/verify`, { method: "PATCH" });
  },

  /** Tolak pembayaran beserta alasannya. */
  async reject(id: string, reason: string): Promise<void> {
    await apiFetch(`/api/admin/payments/${id}/reject`, {
      method: "PATCH",
      body: JSON.stringify({ reason }),
    });
  },

  /** Ajukan ulang pembayaran yang sudah ditolak. */
  async reopen(id: string): Promise<void> {
    await apiFetch(`/api/admin/payments/${id}/reopen`, { method: "PATCH" });
  },
};
