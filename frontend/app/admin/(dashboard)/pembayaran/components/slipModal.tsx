import { IconReceipt } from "@/components/ui/icons";
import { rupiah } from "@/hooks/usePayments";
import type { Payment } from "@/types/payments.types";

export default function SlipModal({
  payment,
  onClose,
}: {
  payment: Payment;
  onClose: () => void;
}) {
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