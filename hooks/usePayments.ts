"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { paymentsService } from "@/services/payments.service";
import type {
  Payment,
  PaymentStats,
  PaymentStatus,
  StatusFilter,
} from "@/types/payments.types";

const PAGE_SIZE = 10;

const STATUS_LABEL: Record<StatusFilter, PaymentStatus | null> = {
  semua: null,
  menunggu: "Menunggu",
  diverifikasi: "Diverifikasi",
  ditolak: "Ditolak",
};

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

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

function computePaymentStats(payments: Payment[]): PaymentStats {
  const menunggu = payments.filter((p) => p.status === "Menunggu");
  const verified = payments.filter((p) => p.status === "Diverifikasi");
  const rejected = payments.filter((p) => p.status === "Ditolak");

  // Statistik "hari ini" memakai tanggal verifikasi (verified_at) dari database.
  const today = new Date().toISOString().slice(0, 10);
  const verifiedToday = verified.filter(
    (p) => p.verifiedAt?.slice(0, 10) === today,
  );

  return {
    menungguCount: menunggu.length,
    menungguTotal: sum(menunggu.map((p) => p.nominal)),
    verifiedCount: verified.length,
    verifiedTotal: sum(verified.map((p) => p.nominal)),
    verifiedTodayCount: verifiedToday.length,
    verifiedTodayTotal: sum(verifiedToday.map((p) => p.nominal)),
    rejectedCount: rejected.length,
    rejectedTotal: sum(rejected.map((p) => p.nominal)),
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

  const load = useCallback(async () => {
    setError(null);

    try {
      setPayments(await paymentsService.list());
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
    // Jalankan lewat microtask supaya setState di dalam load() tidak terjadi
    // sinkron di body effect (memicu render berantai).
    void (async () => {
      await Promise.resolve();
      await load();
    })();

    // Pembayaran baru dari aplikasi mobile harus muncul tanpa reload manual.
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") load();
    }, 15_000);

    return () => clearInterval(timer);
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
      await paymentsService.verify(id);
      await load();
    } catch (err) {
      setError(errorMessage(err, "Gagal memverifikasi pembayaran."));
    }
  }

  async function confirmReject(reason: string) {
    if (!rejectFor) return;

    setError(null);

    try {
      await paymentsService.reject(rejectFor.id, reason);

      setRejectFor(null);
      await load();
    } catch (err) {
      setError(errorMessage(err, "Gagal menolak pembayaran."));
    }
  }

  async function reopen(id: string) {
    setError(null);

    try {
      await paymentsService.reopen(id);
      setRowMenu(null);
      await load();
    } catch (err) {
      setError(errorMessage(err, "Gagal mengajukan ulang pembayaran."));
    }
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