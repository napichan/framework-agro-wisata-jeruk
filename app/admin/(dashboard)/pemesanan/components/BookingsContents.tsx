"use client";

import { useCallback, useEffect, useState } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
} from "@/components/ui/icons";
import { rupiah } from "@/hooks/usePayments";
import {
  bookingsService,
  type Booking,
  type BookingStats,
  type BookingStatus,
} from "@/services/bookings.service";

const PAGE_SIZE = 10;

const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

function formatDate(iso: string): string {
  if (!iso) return "-";
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${Number(day)} ${MONTH_ABBR[Number(month) - 1]} ${year}`;
}

const STATUS_STYLE: Record<BookingStatus, { label: string; className: string }> =
  {
    pending: {
      label: "Menunggu",
      className: "bg-amber-50 text-amber-600",
    },
    confirmed: {
      label: "Dikonfirmasi",
      className: "bg-grove-50 text-grove-700",
    },
    cancelled: {
      label: "Dibatalkan",
      className: "bg-red-50 text-red-500",
    },
  };

const STATUS_FILTERS: Array<{ key: string; label: string }> = [
  { key: "", label: "Semua" },
  { key: "pending", label: "Menunggu" },
  { key: "confirmed", label: "Dikonfirmasi" },
  { key: "cancelled", label: "Dibatalkan" },
];

export default function BookingsContents({
  initialSearch = "",
}: {
  initialSearch?: string;
}) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<BookingStats>({
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    total: 0,
    totalAmount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [savingId, setSavingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setError(null);

    try {
      const [list, summary] = await Promise.all([
        bookingsService.list({
          page,
          limit: PAGE_SIZE,
          status,
          search,
        }),
        bookingsService.stats(),
      ]);

      setBookings(list.bookings);
      setTotalPages(Math.max(1, list.totalPages));
      setTotal(list.total);
      setStats(summary);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memuat data pemesanan.",
      );
    } finally {
      setLoading(false);
    }
  }, [page, status, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      load();
    }, 300);

    return () => clearTimeout(timer);
  }, [load]);

  async function changeStatus(booking: Booking, next: BookingStatus) {
    setSavingId(booking.id);
    setError(null);

    try {
      await bookingsService.updateStatus(booking.id, next);
      await load();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal mengubah status pemesanan.",
      );
    } finally {
      setSavingId(null);
    }
  }

  const start = (page - 1) * PAGE_SIZE;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
          Pemesanan
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm text-neutral-400">
          Daftar pemesanan paket wisata beserta status pembayaran dan tiketnya.
        </p>
      </div>

      {/* Statistik */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Menunggu", value: stats.pending, tone: "text-amber-600" },
          {
            label: "Dikonfirmasi",
            value: stats.confirmed,
            tone: "text-grove-600",
          },
          { label: "Dibatalkan", value: stats.cancelled, tone: "text-red-500" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70"
          >
            <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-400">
              {item.label}
            </p>
            <p className={`mt-3 text-2xl font-extrabold ${item.tone}`}>
              {item.value}
            </p>
          </div>
        ))}

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70">
          <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-400">
            Nilai Pemesanan
          </p>
          <p className="mt-3 text-lg font-extrabold text-neutral-900">
            {rupiah(stats.totalAmount)}
          </p>
          <p className="mt-1 text-[11px] text-neutral-400">
            {stats.total} pemesanan (tanpa yang dibatalkan)
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-neutral-200/70 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Cari kode booking, nama pemesan, atau paket..."
            aria-label="Cari pemesanan"
            className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((filter) => {
            const active = status === filter.key;

            return (
              <button
                key={filter.key || "all"}
                type="button"
                onClick={() => {
                  setStatus(filter.key);
                  setPage(1);
                }}
                aria-pressed={active}
                className={`rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition ${
                  active
                    ? "border-grove-600 bg-grove-700 text-white"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}

      {/* Tabel */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/70">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead>
              <tr className="border-b border-neutral-100 text-[11px] uppercase tracking-wide text-neutral-400">
                <th className="px-5 py-3.5 font-semibold">No</th>
                <th className="px-5 py-3.5 font-semibold">Kode / Tanggal</th>
                <th className="px-5 py-3.5 font-semibold">Pemesan</th>
                <th className="px-5 py-3.5 font-semibold">Paket & Kunjungan</th>
                <th className="px-5 py-3.5 font-semibold">Total</th>
                <th className="px-5 py-3.5 font-semibold">Pembayaran</th>
                <th className="px-5 py-3.5 font-semibold">Tiket</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100">
              {loading && bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-14 text-center text-sm text-neutral-400"
                  >
                    Memuat data pemesanan...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-14 text-center text-sm text-neutral-400"
                  >
                    {error
                      ? "Data pemesanan gagal dimuat."
                      : "Belum ada pemesanan yang cocok dengan filtermu."}
                  </td>
                </tr>
              ) : (
                bookings.map((booking, index) => {
                  const style = STATUS_STYLE[booking.status];

                  return (
                    <tr
                      key={booking.id}
                      className="align-top text-[13px] text-neutral-500 transition hover:bg-neutral-50/60"
                    >
                      <td className="px-5 py-4">{start + index + 1}</td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <p className="font-semibold text-neutral-800">
                          {booking.bookingCode}
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          dibuat {formatDate(booking.createdAt)}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-neutral-800">
                          {booking.customer}
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          {booking.email}
                        </p>
                        {booking.contactPhone ? (
                          <p className="text-[11px] text-neutral-400">
                            HP: {booking.contactPhone}
                          </p>
                        ) : null}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-block rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700">
                          {booking.paket}
                        </span>
                        <p className="mt-1 text-[11px] text-neutral-400">
                          {formatDate(booking.visitDate)}
                          {booking.session ? ` • ${booking.session}` : ""}
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          {booking.adultCount > 0
                            ? `${booking.adultCount} dewasa`
                            : `${booking.visitorCount} pengunjung`}
                          {booking.childCount > 0
                            ? ` + ${booking.childCount} anak`
                            : ""}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 font-bold text-neutral-900">
                        {rupiah(booking.total)}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-[12px] font-semibold text-neutral-700">
                          {booking.paymentStatus
                            ? booking.paymentStatus === "verified"
                              ? "Diverifikasi"
                              : booking.paymentStatus === "rejected"
                                ? "Ditolak"
                                : "Menunggu"
                            : "Belum ada"}
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          {booking.paymentMethod ?? "—"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        {booking.ticketCode ? (
                          <>
                            <p className="text-[11px] font-semibold text-neutral-700">
                              {booking.ticketCode}
                            </p>
                            <p className="text-[11px] text-neutral-400">
                              {booking.ticketStatus === "used"
                                ? "Sudah dipakai"
                                : booking.ticketStatus === "cancelled"
                                  ? "Dibatalkan"
                                  : "Aktif"}
                            </p>
                          </>
                        ) : (
                          <span className="text-[11px] text-neutral-300">
                            Belum terbit
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold ${style.className}`}
                        >
                          {style.label}
                        </span>

                        <select
                          value={booking.status}
                          disabled={savingId === booking.id}
                          onChange={(event) =>
                            changeStatus(
                              booking,
                              event.target.value as BookingStatus,
                            )
                          }
                          aria-label={`Ubah status ${booking.bookingCode}`}
                          className="mt-2 block w-full rounded-lg border border-neutral-200 bg-white px-2 py-1.5 text-[11px] font-semibold text-neutral-600 outline-none transition disabled:opacity-50"
                        >
                          <option value="pending">Menunggu</option>
                          <option value="confirmed">Dikonfirmasi</option>
                          <option value="cancelled">Dibatalkan</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-neutral-400">
          Menampilkan {bookings.length} dari {total} pemesanan
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-500 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <IconChevronLeft className="h-3.5 w-3.5" />
            Sebelumnya
          </button>

          <span className="px-2 text-xs font-semibold text-neutral-500">
            {page} / {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-500 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Selanjutnya
            <IconChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
