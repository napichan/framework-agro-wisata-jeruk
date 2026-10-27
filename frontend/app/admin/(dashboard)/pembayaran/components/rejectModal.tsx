import { rupiah } from "@/hooks/usePayments";
import type { Payment } from "@/types/payments.types";

export default function RejectModal({
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