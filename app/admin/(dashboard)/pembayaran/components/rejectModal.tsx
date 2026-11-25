import { useState } from "react";
import { rupiah } from "@/hooks/usePayments";
import type { Payment } from "@/types/payments.types";

export default function RejectModal({
  payment,
  onCancel,
  onConfirm,
}: {
  payment: Payment;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState(payment.infoNote ?? "");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleConfirm() {
    const value = reason.trim();

    if (!value) {
      setFormError("Alasan penolakan wajib diisi.");
      return;
    }

    if (value.length > 500) {
      setFormError("Alasan maksimal 500 karakter.");
      return;
    }

    setFormError(null);
    setSaving(true);

    try {
      await onConfirm(value);
    } finally {
      setSaving(false);
    }
  }

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

        <label htmlFor="reject-reason" className="mt-4 block text-xs font-semibold text-neutral-600">
          Alasan penolakan
        </label>

        <textarea
          id="reject-reason"
          rows={3}
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          placeholder="Mis. Nominal tidak sesuai dengan mutasi bank"
          className="mt-1.5 w-full resize-none rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
        />

        {formError ? (
          <p className="mt-1.5 text-[11px] font-semibold text-red-500">
            {formError}
          </p>
        ) : null}

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
            onClick={handleConfirm}
            disabled={saving}
            className="rounded-lg bg-red-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? "Menyimpan..." : "Ya, Tolak"}
          </button>
        </div>
      </div>
    </div>
  );
}