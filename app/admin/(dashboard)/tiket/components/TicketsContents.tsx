"use client";

import { useCallback, useEffect, useState } from "react";
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
} from "@/components/ui/icons";
import {
  ticketsService,
  type ScanHistory,
  type ScanOutcome,
  type Ticket,
  type TicketStats,
  type TicketStatus,
} from "@/services/tickets.service";

const PAGE_SIZE = 8;

const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${Number(day)} ${MONTH_ABBR[Number(month) - 1]} ${year}`;
}

function formatDateTime(iso: string | null): string {
  if (!iso) return "—";
  return `${formatDate(iso)} • ${iso.slice(11, 16).replace(":", ".")}`;
}

const STATUS_STYLE: Record<TicketStatus, { label: string; className: string }> =
  {
    active: { label: "Aktif", className: "bg-grove-50 text-grove-700" },
    used: { label: "Sudah Dipakai", className: "bg-neutral-100 text-neutral-500" },
    cancelled: { label: "Dibatalkan", className: "bg-red-50 text-red-500" },
  };

const RESULT_STYLE: Record<
  ScanOutcome["result"],
  { label: string; className: string; note: string }
> = {
  valid: {
    label: "Tiket Valid",
    className: "bg-grove-50 text-grove-700 ring-grove-200",
    note: "Pengunjung boleh masuk.",
  },
  invalid: {
    label: "Tiket Tidak Dikenali",
    className: "bg-red-50 text-red-600 ring-red-200",
    note: "Kode tidak ada di database. Periksa kembali.",
  },
  already_used: {
    label: "Sudah Pernah Dipakai",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
    note: "Tiket ini sudah divalidasi sebelumnya.",
  },
  cancelled: {
    label: "Tiket Dibatalkan",
    className: "bg-red-50 text-red-600 ring-red-200",
    note: "Pemesanan ini sudah dibatalkan.",
  },
};

const FILTERS: Array<{ key: string; label: string }> = [
  { key: "", label: "Semua" },
  { key: "active", label: "Aktif" },
  { key: "used", label: "Dipakai" },
  { key: "cancelled", label: "Dibatalkan" },
];

export default function TicketsContents() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [scans, setScans] = useState<ScanHistory[]>([]);
  const [stats, setStats] = useState<TicketStats>({
    active: 0,
    used: 0,
    cancelled: 0,
    total: 0,
    scansToday: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [code, setCode] = useState("");
  const [scanning, setScanning] = useState(false);
  const [outcome, setOutcome] = useState<ScanOutcome | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setError(null);

    try {
      const [list, summary, history] = await Promise.all([
        ticketsService.list({ page, limit: PAGE_SIZE, status, search }),
        ticketsService.stats(),
        ticketsService.scans(8),
      ]);

      setTickets(list.tickets);
      setTotalPages(Math.max(1, list.totalPages));
      setTotal(list.total);
      setStats(summary);
      setScans(history);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat data tiket.");
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

  async function submitScan(event: React.FormEvent) {
    event.preventDefault();
    const value = code.trim();

    if (!value) {
      setScanError("Masukkan kode tiket terlebih dahulu.");
      return;
    }

    setScanning(true);
    setOutcome(null);
    setScanError(null);

    try {
      const result = await ticketsService.scan(value);
      setOutcome(result);
      setCode("");
      await load();
    } catch (err) {
      // 404 berarti tiket tidak dikenali: tetap tampilkan sebagai hasil scan.
      if (err instanceof Error && err.message.toLowerCase().includes("tidak dikenali")) {
        setOutcome({ result: "invalid", ticket: null });
      } else {
        setScanError(err instanceof Error ? err.message : "Gagal memindai tiket.");
      }
    } finally {
      setScanning(false);
    }
  }

  async function cancelTicket(ticket: Ticket) {
    if (!window.confirm(`Batalkan tiket ${ticket.code}?`)) return;

    setCancellingId(ticket.id);
    setError(null);

    try {
      await ticketsService.cancel(ticket.id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal membatalkan tiket.");
    } finally {
      setCancellingId(null);
    }
  }

  const start = (page - 1) * PAGE_SIZE;
  const outcomeStyle = outcome ? RESULT_STYLE[outcome.result] : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
          Tiket &amp; Scan
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm text-neutral-400">
          Validasi tiket pengunjung di pintu masuk dan pantau riwayat scan.
        </p>
      </div>

      {/* Statistik */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Tiket Aktif", value: stats.active, tone: "text-grove-600" },
          { label: "Sudah Dipakai", value: stats.used, tone: "text-neutral-800" },
          { label: "Dibatalkan", value: stats.cancelled, tone: "text-red-500" },
          { label: "Scan Hari Ini", value: stats.scansToday, tone: "text-brand-600" },
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
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Scanner */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70">
          <p className="text-sm font-bold text-neutral-900">Validasi Tiket</p>
          <p className="mt-1 text-xs text-neutral-400">
            Arahkan pemindai QR ke tiket, atau ketik kode tiketnya
            (contoh: TKT-...).
          </p>

          <form onSubmit={submitScan} className="mt-4 flex gap-2">
            <input
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Kode tiket / isi QR"
              aria-label="Kode tiket"
              className="w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
            />
            <button
              type="submit"
              disabled={scanning}
              className="shrink-0 rounded-xl bg-grove-700 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-grove-800 disabled:opacity-60"
            >
              {scanning ? "Memeriksa..." : "Validasi"}
            </button>
          </form>

          {scanError ? (
            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
              {scanError}
            </p>
          ) : null}

          {outcome && outcomeStyle ? (
            <div
              className={`mt-4 rounded-xl p-4 ring-1 ${outcomeStyle.className}`}
            >
              <p className="flex items-center gap-2 text-sm font-bold">
                <IconCheck className="h-4 w-4" />
                {outcomeStyle.label}
              </p>
              <p className="mt-1 text-xs opacity-80">{outcomeStyle.note}</p>

              {outcome.ticket ? (
                <dl className="mt-3 space-y-1.5 border-t border-current/10 pt-3 text-[11px]">
                  {[
                    ["Kode tiket", outcome.ticket.ticket_code],
                    ["Kode booking", outcome.ticket.booking_code],
                    ["Pemesan", outcome.ticket.customer_name],
                    ["Paket", outcome.ticket.package_name],
                    ["Kunjungan", formatDate(outcome.ticket.visit_date)],
                    ["Pengunjung", `${outcome.ticket.visitor_count} orang`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-3">
                      <dt className="opacity-70">{label}</dt>
                      <dd className="text-right font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          ) : null}

          {/* Riwayat scan */}
          <div className="mt-5">
            <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-400">
              Riwayat Scan Terakhir
            </p>

            {scans.length === 0 ? (
              <p className="mt-2 text-xs text-neutral-400">
                Belum ada scan tiket.
              </p>
            ) : (
              <ul className="mt-2 divide-y divide-neutral-100">
                {scans.map((scan) => (
                  <li
                    key={scan.id}
                    className="flex items-center justify-between gap-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-semibold text-neutral-700">
                        {scan.ticketCode}
                      </p>
                      <p className="truncate text-[10px] text-neutral-400">
                        {scan.customer} • {formatDateTime(scan.scannedAt)}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        scan.result === "valid"
                          ? "bg-grove-50 text-grove-700"
                          : scan.result === "already_used"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-red-50 text-red-500"
                      }`}
                    >
                      {RESULT_STYLE[scan.result].label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Daftar tiket */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-neutral-900">Daftar Tiket</p>
            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-bold text-neutral-500">
              {total} tiket
            </span>
          </div>

          <div className="relative mt-3">
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Cari kode tiket, booking, atau nama..."
              aria-label="Cari tiket"
              className="w-full rounded-xl border border-neutral-200 py-2 pl-9 pr-3 text-xs outline-none transition placeholder:text-neutral-400 focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
            />
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {FILTERS.map((filter) => (
              <button
                key={filter.key || "all"}
                type="button"
                onClick={() => {
                  setStatus(filter.key);
                  setPage(1);
                }}
                aria-pressed={status === filter.key}
                className={`rounded-lg border px-2.5 py-1 text-[10px] font-semibold transition ${
                  status === filter.key
                    ? "border-grove-600 bg-grove-700 text-white"
                    : "border-neutral-200 text-neutral-500 hover:bg-neutral-50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {loading && tickets.length === 0 ? (
            <p className="mt-6 text-center text-xs text-neutral-400">
              Memuat tiket...
            </p>
          ) : tickets.length === 0 ? (
            <p className="mt-6 text-center text-xs text-neutral-400">
              Belum ada tiket. Tiket terbit otomatis saat pembayaran
              diverifikasi.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-neutral-100">
              {tickets.map((ticket) => {
                const style = STATUS_STYLE[ticket.status];

                return (
                  <li key={ticket.id} className="py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-neutral-800">
                          {ticket.code}
                        </p>
                        <p className="truncate text-[10px] text-neutral-400">
                          {ticket.customer} • {ticket.bookingCode}
                        </p>
                        <p className="truncate text-[10px] text-neutral-400">
                          {ticket.paket} • {formatDate(ticket.visitDate)} •{" "}
                          {ticket.visitorCount} orang
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${style.className}`}
                      >
                        {style.label}
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <p className="text-[10px] text-neutral-400">
                        {ticket.scannedAt
                          ? `Dipakai ${formatDateTime(ticket.scannedAt)}`
                          : "Belum dipakai"}
                      </p>

                      {ticket.status === "active" ? (
                        <button
                          type="button"
                          onClick={() => cancelTicket(ticket)}
                          disabled={cancellingId === ticket.id}
                          className="rounded-lg border border-red-200 px-2 py-1 text-[10px] font-bold text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          {cancellingId === ticket.id
                            ? "Membatalkan..."
                            : "Batalkan"}
                        </button>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {error ? (
            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-[11px] font-medium text-red-600">
              {error}
            </p>
          ) : null}

          <div className="mt-4 flex items-center justify-between">
            <p className="text-[10px] text-neutral-400">
              Halaman {page} dari {totalPages}
            </p>

            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                aria-label="Halaman sebelumnya"
                className="rounded-lg border border-neutral-200 p-1.5 text-neutral-500 transition hover:bg-neutral-50 disabled:opacity-40"
              >
                <IconChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                aria-label="Halaman berikutnya"
                className="rounded-lg border border-neutral-200 p-1.5 text-neutral-500 transition hover:bg-neutral-50 disabled:opacity-40"
              >
                <IconChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <p className="sr-only">{start} tiket ditampilkan</p>
        </div>
      </div>
    </div>
  );
}
