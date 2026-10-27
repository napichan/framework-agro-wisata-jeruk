import PaymentTable from "./components/paymentTable";

export const metadata = {
  title: "Pembayaran — Dashboard Admin",
};

export default function AdminPembayaranPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <PaymentTable />
    </div>
  );
}