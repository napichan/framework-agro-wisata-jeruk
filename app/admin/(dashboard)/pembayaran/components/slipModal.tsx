import { rupiah } from "@/hooks/usePayments";
import { proofUrl } from "@/services/payments.service";
import type { Payment } from "@/types/payments.types";

export default function SlipModal({
  payment,
  onClose,
}: {
  payment: Payment;
  onClose: () => void;
}) {
  const imageUrl = proofUrl(payment.proofPath);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Bukti slip transfer"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-neutral-900">
              Bukti Slip Transfer
            </p>
            <p className="text-xs text-neutral-400">{payment.bookingCode}</p>
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

        {imageUrl ? (
          <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={`Bukti transfer ${payment.bookingCode}`}
              className="max-h-[420px] w-full object-contain"
            />
          </div>
        ) : (
          <p className="mt-4 rounded-xl bg-red-50 p-4 text-center text-xs font-medium text-red-500">
            Slip tidak diunggah pemesan.
          </p>
        )}

        <dl className="mt-4 space-y-2.5 text-sm">
          {[
            ["Pemesan", payment.customer],
            ["Metode", payment.bank],
            ["Paket", payment.paket],
            ["Nominal", rupiah(payment.nominal)],
            ...(payment.verifiedBy
              ? [["Diproses oleh", payment.verifiedBy] as [string, string]]
              : []),
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4">
              <dt className="text-xs text-neutral-400">{label}</dt>
              <dd className="text-right text-xs font-semibold text-neutral-800">
                {value}
              </dd>
            </div>
          ))}
        </dl>

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
