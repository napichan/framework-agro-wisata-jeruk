"use client";

import { useMemo, useState } from "react";
import {
  DESTINATION_ACCOUNTS,
  PAYMENTS,
  computePaymentStats,
  rupiah,
  waLink,
  type Payment,
  type PaymentStatus,
} from "@/lib/admin-payments";
import {
  IconCalendar,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconDots,
  IconEye,
  IconReceipt,
  IconRefresh,
  IconSearch,
  IconWhatsApp,
} from "@/components/icons";

const PAGE_SIZE = 10; // sesuai design: "Menampilkan 10 per halaman dari 54..."

type StatusFilter = "semua" | "menunggu" | "diverifikasi" | "ditolak";

const STATUS_FILTERS: Array<{
  key: StatusFilter;
  label: (menunggu: number) => string;
}> = [
  { key: "menunggu", label: (n) => `Perlu Verifikasi (${n})` },
  { key: "semua", label: () => "Semua" },
  { key: "diverifikasi", label: () => "Diverifikasi" },
  { key: "ditolak", label: () => "Ditolak" },
];

const STATUS_STYLE: Record<PaymentStatus, { dot: string; text: string }> = {
  Menunggu: { dot: "bg-amber-500", text: "text-amber-600" },
  Diverifikasi: { dot: "bg-grove-500", text: "text-grove-600" },
  Ditolak: { dot: "bg-red-500", text: "text-red-500" },
};

/* ==================== Modal slip ==================== */

function SlipModal({ payment, onClose }: { payment: Payment; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Bukti slip transfer"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-neutral-900">
              Bukti Slip Transfer
            </p>
            <p className="text-xs text-neutral-400">{payment.id}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="rounded-lg px-2 py-1 text-lg leading-none text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
          >
            ×
          </button>
        </div>

        {payment.hasSlip ? (
          <>
            {/* Pratinjau slip */}
            <div className="mt-4 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-5 text-center">
              <IconReceipt className="mx-auto h-8 w-8 text-neutral-300" />
              <p className="mt-2 text-[11px] uppercase tracking-wide text-neutral-400">
                Slip {payment.bank}
              </p>
              <p className="mt-1 text-lg font-extrabold text-neutral-900">
                {rupiah(payment.nominal)}
              </p>
              <p className="mt-1 text-[11px] text-neutral-400">
                {payment.date} • {payment.time}
              </p>
            </div>

            <dl className="mt-4 space-y-2.5 text-sm">
              {[
                ["Pemesan", payment.customer],
                ["Pengirim", `${payment.senderName} (${payment.bank})`],
                ["No. Rekening", payment.senderAccount],
                ["Paket", payment.paket],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-xs text-neutral-400">{label}</dt>
                  <dd className="text-right text-xs font-semibold text-neutral-800">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </>
        ) : (
          <p className="mt-4 rounded-xl bg-red-50 p-4 text-center text-xs font-medium text-red-500">
            Slip tidak diunggah pemesan. Minta ulang lewat WhatsApp.
          </p>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}

/* ==================== Modal konfirmasi tolak ==================== */

function RejectModal({
  payment,
  onCancel,
  onConfirm,
}: {
  payment: Payment;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Konfirmasi tolak pembayaran"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-sm font-bold text-neutral-900">
          Tolak pembayaran ini?
        </p>

        <p className="mt-2 text-xs leading-5 text-neutral-500">
          {payment.customer} • {rupiah(payment.nominal)} akan berpindah ke
          status <span className="font-semibold text-red-500">Ditolak</span>.
          Pemesan bisa mengunggah ulang bukti transfer.
        </p>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-600"
          >
            Ya, Tolak
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==================== Manager ==================== */

export function PaymentsManager() {
  const [payments, setPayments] = useState<Payment[]>(PAYMENTS);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("semua");
  const [paketFilter, setPaketFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [slipFor, setSlipFor] = useState<Payment | null>(null);
  const [rejectFor, setRejectFor] = useState<Payment | null>(null);
  const [rowMenu, setRowMenu] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<string | null>(null);

  const stats = useMemo(() => computePaymentStats(payments), [payments]);

  const paketOptions = useMemo(() => {
    const unique = Array.from(new Set(payments.map((p) => p.paket)));
    return ["ALL", ...unique];
  }, [payments]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const digits = q.replace(/\D/g, "");

    return payments.filter((payment) => {
      const matchQuery =
        q === "" ||
        payment.customer.toLowerCase().includes(q) ||
        payment.id.toLowerCase().includes(q) ||
        (digits !== "" && payment.wa.replace(/\D/g, "").includes(digits));

      const matchStatus =
        statusFilter === "semua" ||
        (statusFilter === "menunggu" && payment.status === "Menunggu") ||
        (statusFilter === "diverifikasi" && payment.status === "Diverifikasi") ||
        (statusFilter === "ditolak" && payment.status === "Ditolak");

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

  function updateStatus(id: string, status: PaymentStatus, paid?: boolean) {
    setPayments((current) =>
      current.map((payment) =>
        payment.id === id ? { ...payment, status, paid } : payment,
      ),
    );
  }

  function handleRefresh() {
    if (refreshing) return;
    setRefreshing(true);

    window.setTimeout(() => {
      setPayments(PAYMENTS);
      setQuery("");
      setStatusFilter("semua");
      setPaketFilter("ALL");
      setPage(1);
      setRefreshing(false);
      setRowMenu(null);
      setLastRefresh(
        new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }, 700);
  }

  /* ==================== Render ==================== */

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
              Verifikasi Pembayaran Manual
            </h1>

            <span className="rounded-full bg-brand-100 px-2.5 py-1 text-[11px] font-bold text-brand-700">
              {stats.menungguCount} Perlu Konfirmasi
            </span>
          </div>

          <p className="mt-1.5 max-w-2xl text-sm text-neutral-400">
            Periksa slip transfer masuk dan riwayat, cocokkan dengan mutasi
            rekening bank, dan validasi dana dengan teliti.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-neutral-500">
            <IconCalendar className="h-4 w-4 text-neutral-400" />

            <div className="leading-tight">
              <p className="text-xs font-bold text-neutral-700">
                28 Okt 2024
              </p>
              <p className="text-[10px] text-neutral-400">
                {lastRefresh ? `Diperbarui ${lastRefresh}` : "(Hari Ini)"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-xl bg-grove-700 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-grove-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <IconRefresh className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Memperbarui..." : "Segarkan Data"}
          </button>
        </div>
      </div>

      {/* ================= KARTU STATISTIK ================= */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Menunggu verifikasi */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-wide text-brand-600">
              Menunggu Verifikasi
            </p>
            <IconReceipt className="h-4 w-4 text-brand-400" />
          </div>

          <p className="mt-3 text-2xl font-extrabold text-neutral-900">
            {stats.menungguCount}
            <span className="ml-1.5 text-xs font-semibold text-neutral-400">
              Transaksi
            </span>
          </p>

          <p className="mt-1 text-[11px] font-semibold text-brand-600">
            Total {rupiah(stats.menungguTotal)}
          </p>
        </div>

        {/* Diverifikasi hari ini */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-wide text-grove-600">
              Diverifikasi Hari Ini
            </p>
            <IconCheck className="h-4 w-4 text-grove-400" />
          </div>

          <p className="mt-3 text-2xl font-extrabold text-neutral-900">
            {stats.verifiedCount}
            <span className="ml-1.5 text-xs font-semibold text-neutral-400">
              Transaksi
            </span>
          </p>

          <p className="mt-1 text-[11px] font-semibold text-grove-600">
            Total {rupiah(stats.verifiedTotal)} lunas
          </p>
        </div>

        {/* Ditolak */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-wide text-red-500">
              Ditolak
            </p>
            <IconReceipt className="h-4 w-4 text-red-400" />
          </div>

          <p className="mt-3 text-2xl font-extrabold text-neutral-900">
            {stats.rejectedCount}
            <span className="ml-1.5 text-xs font-semibold text-neutral-400">
              Transaksi
            </span>
          </p>

          <p className="mt-1 text-[11px] font-semibold text-red-500">
            Bukti foto / mutasi nihil
          </p>
        </div>

        {/* Rekening tujuan aktif */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-wide text-grove-600">
              Rekening Tujuan Aktif
            </p>
            <IconCheck className="h-4 w-4 text-grove-400" />
          </div>

          <ul className="mt-3 space-y-1.5">
            {DESTINATION_ACCOUNTS.map((account) => (
              <li key={account.number} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-grove-500" />

                <span className="text-[11px] leading-4 text-neutral-600">
                  <span className="font-bold text-neutral-800">
                    {account.bank}
                  </span>{" "}
                  {account.number}
                  <span className="block text-neutral-400">
                    a.n {account.owner}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-2 text-[10px] text-neutral-400">
            Semua rekening terverifikasi
          </p>
        </div>
      </section>

      {/* ================= TOOLBAR ================= */}
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-neutral-200/70">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Cari nama pemesan, no. WA, atau ID..."
              aria-label="Cari nama pemesan, nomor WhatsApp, atau ID transaksi"
              className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
            />
          </div>

          {/* Filter status */}
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((filter) => {
              const active = statusFilter === filter.key;

              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => {
                    setStatusFilter(filter.key);
                    setPage(1);
                  }}
                  aria-pressed={active}
                  className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition ${
                    active
                      ? "border-grove-600 bg-grove-700 text-white"
                      : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  {filter.label(stats.menungguCount)}
                  <IconChevronDown
                    className={`h-3.5 w-3.5 ${active ? "text-white/70" : "text-neutral-400"}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Filter paket */}
          <select
            value={paketFilter}
            onChange={(event) => {
              setPaketFilter(event.target.value);
              setPage(1);
            }}
            aria-label="Filter paket wisata"
            className="rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-neutral-600 outline-none transition focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
          >
            {paketOptions.map((option) => (
              <option key={option} value={option}>
                {option === "ALL" ? "Semua Paket Wisata" : option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ================= TABEL ================= */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/70">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] text-left">
            <thead>
              <tr className="border-b border-neutral-100 text-[11px] uppercase tracking-wide text-neutral-400">
                <th className="px-5 py-3.5 font-semibold">No</th>
                <th className="px-5 py-3.5 font-semibold">Tanggal &amp; Waktu</th>
                <th className="px-5 py-3.5 font-semibold">
                  Pemesan / Paket Wisata
                </th>
                <th className="px-5 py-3.5 font-semibold">Info Transfer</th>
                <th className="px-5 py-3.5 font-semibold">Nominal Transfer</th>
                <th className="px-5 py-3.5 font-semibold">Bukti Slip</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold">
                  Tindakan Verifikasi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100">
              {visible.length > 0 ? (
                visible.map((payment, index) => {
                  const statusStyle = STATUS_STYLE[payment.status];

                  return (
                    <tr
                      key={payment.id}
                      className="align-top text-[13px] text-neutral-500 transition hover:bg-neutral-50/60"
                    >
                      {/* No */}
                      <td className="px-5 py-4">{start + index + 1}</td>

                      {/* Tanggal & waktu */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <p className="font-semibold text-neutral-700">
                          {payment.date}
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          {payment.time}
                        </p>
                      </td>

                      {/* Pemesan / paket */}
                      <td className="px-5 py-4">
                        <p className="font-semibold text-neutral-800">
                          {payment.customer}
                        </p>

                        <span className="mt-1.5 inline-block rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700">
                          {payment.paket}
                        </span>
                      </td>

                      {/* Info transfer */}
                      <td className="px-5 py-4">
                        <p className="font-bold text-brand-600">
                          {payment.bank}
                        </p>
                        <p className="font-medium text-neutral-700">
                          {payment.senderName}
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          {payment.senderAccount}
                        </p>

                        {payment.infoNote ? (
                          <p className="mt-1 max-w-[190px] text-[11px] leading-4 text-amber-600">
                            {payment.infoNote}
                          </p>
                        ) : null}
                      </td>

                      {/* Nominal */}
                      <td className="px-5 py-4">
                        <p className="font-bold text-neutral-900">
                          {rupiah(payment.nominal)}
                        </p>

                        {payment.nominalNote ? (
                          <p className="mt-1 text-[11px] font-medium text-red-500">
                            {payment.nominalNote}
                          </p>
                        ) : null}
                      </td>

                      {/* Bukti slip */}
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => setSlipFor(payment)}
                          className="flex flex-col items-center gap-1 rounded-lg text-[11px] font-semibold text-grove-600 transition hover:text-grove-700"
                        >
                          <span
                            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                              payment.hasSlip
                                ? "bg-neutral-100 text-neutral-400"
                                : "bg-red-50 text-red-400"
                            }`}
                          >
                            <IconEye className="h-4 w-4" />
                          </span>
                          {payment.hasSlip ? "Lihat Slip" : "Tidak Ada"}
                        </button>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold ${statusStyle.text}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                          />
                          {payment.status}
                        </span>
                      </td>

                      {/* Tindakan */}
                      <td className="relative px-5 py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          {payment.status === "Menunggu" ? (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  updateStatus(payment.id, "Diverifikasi", false)
                                }
                                className="flex items-center gap-1.5 rounded-lg bg-grove-700 px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-grove-800"
                              >
                                <IconCheck className="h-3.5 w-3.5" />
                                Setujui
                              </button>

                              <button
                                type="button"
                                onClick={() => setRejectFor(payment)}
                                className="rounded-lg border border-red-200 px-3 py-1.5 text-[11px] font-bold text-red-500 transition hover:bg-red-50"
                              >
                                Tolak
                              </button>
                            </>
                          ) : null}

                          {payment.status === "Diverifikasi" ? (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  updateStatus(
                                    payment.id,
                                    "Diverifikasi",
                                    !payment.paid,
                                  )
                                }
                                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold transition ${
                                  payment.paid
                                    ? "bg-grove-50 text-grove-600 ring-1 ring-grove-200"
                                    : "border border-grove-300 text-grove-700 hover:bg-grove-50"
                                }`}
                              >
                                <IconCheck className="h-3.5 w-3.5" />
                                {payment.paid ? "QR Ditandai" : "Tandai QR"}
                              </button>

                              <button
                                type="button"
                                aria-label={`Aksi lain untuk ${payment.id}`}
                                onClick={() =>
                                  setRowMenu(
                                    rowMenu === payment.id ? null : payment.id,
                                  )
                                }
                                className="rounded-lg border border-neutral-200 p-1.5 text-neutral-400 transition hover:bg-neutral-50 hover:text-neutral-700"
                              >
                                <IconDots className="h-4 w-4" />
                              </button>
                            </>
                          ) : null}

                          {payment.status === "Ditolak" ? (
                            <>
                              <a
                                href={waLink(payment.wa)}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 rounded-lg border border-grove-300 px-3 py-1.5 text-[11px] font-bold text-grove-700 transition hover:bg-grove-50"
                              >
                                <IconWhatsApp className="h-3.5 w-3.5" />
                                Chat WA
                              </a>

                              <button
                                type="button"
                                onClick={() =>
                                  updateStatus(payment.id, "Menunggu")
                                }
                                className="rounded-lg border border-neutral-200 px-3 py-1.5 text-[11px] font-bold text-neutral-500 transition hover:bg-neutral-50"
                              >
                                Cek Ulang
                              </button>
                            </>
                          ) : null}
                        </div>

                        {/* Menu lain (baris diverifikasi) */}
                        {rowMenu === payment.id ? (
                          <>
                            <button
                              type="button"
                              aria-label="Tutup menu aksi"
                              onClick={() => setRowMenu(null)}
                              className="fixed inset-0 z-30 cursor-default"
                            />

                            <div className="absolute right-4 top-12 z-40 w-40 overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 shadow-lg">
                              <button
                                type="button"
                                onClick={() => {
                                  setSlipFor(payment);
                                  setRowMenu(null);
                                }}
                                className="flex w-full items-center gap-2 px-3.5 py-2 text-left text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50"
                              >
                                <IconEye className="h-3.5 w-3.5" />
                                Lihat Slip
                              </button>

                              <a
                                href={waLink(payment.wa)}
                                target="_blank"
                                rel="noreferrer"
                                className="flex w-full items-center gap-2 px-3.5 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50"
                              >
                                <IconWhatsApp className="h-3.5 w-3.5" />
                                Chat WA
                              </a>

                              <button
                                type="button"
                                onClick={() => {
                                  updateStatus(payment.id, "Menunggu");
                                  setRowMenu(null);
                                }}
                                className="flex w-full items-center gap-2 px-3.5 py-2 text-left text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50"
                              >
                                <IconRefresh className="h-3.5 w-3.5" />
                                Cek Ulang
                              </button>
                            </div>
                          </>
                        ) : null}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-14 text-center text-sm text-neutral-400"
                  >
                    Tidak ada pembayaran yang cocok dengan filtermu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= FOOTER TABEL ================= */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-neutral-400">
          Menampilkan {Math.min(PAGE_SIZE, visible.length)} per halaman dari{" "}
          {filtered.length} hasil pembayaran
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-500 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <IconChevronLeft className="h-3.5 w-3.5" />
            Sebelumnya
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => setPage(number)}
              aria-current={number === currentPage ? "page" : undefined}
              className={`min-w-8 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                number === currentPage
                  ? "bg-grove-700 text-white"
                  : "border border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-500 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Selanjutnya
            <IconChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {slipFor ? (
        <SlipModal payment={slipFor} onClose={() => setSlipFor(null)} />
      ) : null}

      {rejectFor ? (
        <RejectModal
          payment={rejectFor}
          onCancel={() => setRejectFor(null)}
          onConfirm={() => {
            updateStatus(rejectFor.id, "Ditolak", false);
            setRejectFor(null);
          }}
        />
      ) : null}
    </div>
  );
}
