import { PaymentsManager } from "@/components/admin/payments-manager";

export const metadata = {
  title: "Verifikasi Pembayaran — Dashboard Admin",
};

export default function AdminPembayaranPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <PaymentsManager />
    </div>
  );
}
