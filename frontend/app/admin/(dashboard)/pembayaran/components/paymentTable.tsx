"use client";

import { rupiah, usePayments, waLink } from "@/hooks/usePayments";
import type { PaymentStatus } from "@/types/payments.types";
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
} from "@/components/ui/icons";
import RejectModal from "./rejectModal";
import SlipModal from "./slipModal";

const STATUS_STYLE: Record<PaymentStatus, { dot: string; text: string }> = {
  Menunggu: { dot: "bg-amber-500", text: "text-amber-600" },
  Diverifikasi: { dot: "bg-grove-500", text: "text-grove-600" },
  Ditolak: { dot: "bg-red-500", text: "text-red-500" },
};

export default function PaymentTable() {
  const {
    stats,
    destinationAccounts,
    statusFilters,
    paketOptions,
    visible,
    totalFiltered,
    query,
    statusFilter,
    paketFilter,
    changeQuery,
    changeStatusFilter,
    changePaketFilter,
    start,
    currentPage,
    totalPages,
    pageNumbers,
    setPage,
    updateStatus,
    refreshing,
    lastRefresh,
    handleRefresh,
    slipFor,
    setSlipFor,
    rejectFor,
    setRejectFor,
    confirmReject,
    rowMenu,
    setRowMenu,
    toggleRowMenu,
  } = usePayments();

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
              <p className="text-xs font-bold text-neutral-700">28 Okt 2024</p>
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
            <IconRefresh
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
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
            {destinationAccounts.map((account) => (
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
              onChange={(event) => changeQuery(event.target.value)}
              placeholder="Cari nama pemesan, no. WA, atau ID..."
              aria-label="Cari nama pemesan, nomor WhatsApp, atau ID transaksi"
              className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
            />
          </div>

          {/* Filter status */}
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((filter) => {
              const active = statusFilter === filter.key;

              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => changeStatusFilter(filter.key)}
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
            onChange={(event) => changePaketFilter(event.target.value)}
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
                <th className="px-5 py-3.5 font-semibold">
                  Tanggal &amp; Waktu
                </th>
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
                                onClick={() => toggleRowMenu(payment.id)}
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
          Menampilkan {visible.length} per halaman dari {totalFiltered} hasil
          pembayaran
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
          onConfirm={confirmReject}
        />
      ) : null}
    </div>
  );
}