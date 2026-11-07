"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import type {
  DestinationAccount,
  Payment,
  PaymentStats,
  PaymentStatus,
  StatusFilter,
} from "@/types/payments.types";

const PAGE_SIZE = 10;

const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

const STATUS_LABEL: Record<StatusFilter, PaymentStatus | null> = {
  semua: null,
  menunggu: "Menunggu",
  diverifikasi: "Diverifikasi",
  ditolak: "Ditolak",
};

/** "2024-10-28T09:15:00.000Z" -> "28 Okt 2024" (aman untuk SSR/CSR). */
function formatDateID(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${Number(day)} ${MONTH_ABBR[Number(month) - 1]} ${year}`;
}

/** ISO -> "09.15 WIB" (diambil dari jam data, bukan zona lokal). */
function formatTimeWIB(iso: string): string {
  return `${iso.slice(11, 16).replace(":", ".")} WIB`;
}

type ApiPayment = {
  id: number;
  booking_id: number;
  payment_method: string;
  amount: string;
  proof_path: string | null;
  status: "pending" | "verified" | "rejected";
  rejection_reason: string | null;
  created_at: string;
  booking_code: string;
  package_name: string;
  visit_date: string;
  visitor_count: number;
  customer_name: string;
  customer_email: string;
};

type PaymentsResponse = {
  total: number;
  data: ApiPayment[];
};

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
    infoNote: row.rejection_reason ?? undefined,
  };
}

const DESTINATION_ACCOUNTS: DestinationAccount[] = [
  { bank: "BCA", number: "123-456-9900", owner: "PT Agro Petik Jeruk" },
  { bank: "BRI", number: "3021-01-008875-53-21", owner: "PT Agro Petik Jeruk" },
];

const STATUS_FILTERS: Array<{
  key: StatusFilter;
  label: (menunggu: number) => string;
}> = [
  { key: "menunggu", label: (n) => `Perlu Verifikasi (${n})` },
  { key: "semua", label: () => "Semua" },
  { key: "diverifikasi", label: () => "Diverifikasi" },
  { key: "ditolak", label: () => "Ditolak" },
];

/* ==================== Helper ==================== */

export const rupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;

/** Nomor WhatsApp siap pakai untuk tombol "Chat WA" ("#" bila tak ada data). */
export function waLink(phone?: string): string {
  if (!phone) return "#";

  const digits = phone.replace(/\D/g, "").replace(/^0/, "62");
  return `https://wa.me/${digits}`;
}

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

function computePaymentStats(payments: Payment[]): PaymentStats {
  const menunggu = payments.filter((p) => p.status === "Menunggu");
  const verified = payments.filter((p) => p.status === "Diverifikasi");
  const rejected = payments.filter((p) => p.status === "Ditolak");

  return {
    menungguCount: menunggu.length,
    menungguTotal: sum(menunggu.map((p) => p.nominal)),
    verifiedCount: verified.length,
    verifiedTotal: sum(verified.map((p) => p.nominal)),
    rejectedCount: rejected.length,
    totalCount: payments.length,
  };
}

function errorMessage(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback;
}

/* ==================== Hook ==================== */

export function usePayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("semua");
  const [paketFilter, setPaketFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [slipFor, setSlipFor] = useState<Payment | null>(null);
  const [rejectFor, setRejectFor] = useState<Payment | null>(null);
  const [rowMenu, setRowMenu] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<string | null>(null);
  // Penanda "QR Ditandai" — state klien, belum punya kolom di database.
  const [qrMarked, setQrMarked] = useState<Record<string, boolean>>({});

  const load = useCallback(async () => {
    setError(null);

    try {
      const res = await apiFetch<PaymentsResponse>("/api/admin/payments");

      setPayments(res.data.map(mapPayment));
      setLastRefresh(
        new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    } catch (err) {
      setError(errorMessage(err, "Gagal memuat data pembayaran."));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => computePaymentStats(payments), [payments]);

  const paketOptions = useMemo(() => {
    const unique = Array.from(new Set(payments.map((p) => p.paket)));
    return ["ALL", ...unique];
  }, [payments]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchQuery =
        q === "" ||
        payment.customer.toLowerCase().includes(q) ||
        payment.bookingCode.toLowerCase().includes(q) ||
        payment.id.toLowerCase().includes(q);

      const matchStatus =
        statusFilter === "semua" ||
        payment.status === STATUS_LABEL[statusFilter];

      const matchPaket =
        paketFilter === "ALL" || payment.paket === paketFilter;

      return matchQuery && matchStatus && matchPaket;
    });
  }, [payments, query, statusFilter, paketFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  // Jendela 4 nomor halaman (seperti design: 1 2 3 4).
  const pageNumbers = useMemo(() => {
    const from = Math.max(1, Math.min(currentPage - 1, totalPages - 3));
    const to = Math.min(totalPages, from + 3);
    const numbers: number[] = [];
    for (let n = from; n <= to; n++) numbers.push(n);
    return numbers;
  }, [currentPage, totalPages]);

  /* ==================== Aksi ==================== */

  async function approve(id: string) {
    setError(null);

    try {
      await apiFetch(`/api/admin/payments/${id}/verify`, { method: "PATCH" });
      await load();
    } catch (err) {
      setError(errorMessage(err, "Gagal memverifikasi pembayaran."));
    }
  }

  async function confirmReject(reason: string) {
    if (!rejectFor) return;

    setError(null);

    try {
      await apiFetch(`/api/admin/payments/${rejectFor.id}/reject`, {
        method: "PATCH",
        body: JSON.stringify({ reason }),
      });

      setRejectFor(null);
      await load();
    } catch (err) {
      setError(errorMessage(err, "Gagal menolak pembayaran."));
    }
  }

  async function reopen(id: string) {
    setError(null);

    try {
      await apiFetch(`/api/admin/payments/${id}/reopen`, { method: "PATCH" });
      setRowMenu(null);
      await load();
    } catch (err) {
      setError(errorMessage(err, "Gagal mengajukan ulang pembayaran."));
    }
  }

  // Penanda QR hanya di sisi klien (belum tersimpan di database).
  function toggleQr(id: string) {
    setQrMarked((current) => ({ ...current, [id]: !current[id] }));
  }

  function changeQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function changeStatusFilter(value: StatusFilter) {
    setStatusFilter(value);
    setPage(1);
  }

  function changePaketFilter(value: string) {
    setPaketFilter(value);
    setPage(1);
  }

  async function handleRefresh() {
    if (refreshing) return;

    setRefreshing(true);
    await load();
  }

  return {
    // data
    loading,
    error,
    stats,
    destinationAccounts: DESTINATION_ACCOUNTS,
    statusFilters: STATUS_FILTERS,
    paketOptions,
    visible,
    totalFiltered: filtered.length,

    // filter
    query,
    statusFilter,
    paketFilter,
    changeQuery,
    changeStatusFilter,
    changePaketFilter,

    // paginasi
    pageSize: PAGE_SIZE,
    start,
    currentPage,
    totalPages,
    pageNumbers,
    setPage,

    // aksi
    approve,
    confirmReject,
    reopen,
    toggleQr,
    isQrMarked: (id: string) => Boolean(qrMarked[id]),
    refreshing,
    lastRefresh,
    handleRefresh,

    // modal & menu baris
    slipFor,
    setSlipFor,
    rejectFor,
    setRejectFor,
    rowMenu,
    setRowMenu,
    toggleRowMenu: (id: string) =>
      setRowMenu((current) => (current === id ? null : id)),
  };
}