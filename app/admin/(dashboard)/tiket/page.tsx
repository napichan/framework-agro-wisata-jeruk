import TicketsContents from "./components/TicketsContents";

export const metadata = { title: "Tiket & Scan | Admin Agro Jeruk" };

export default function TiketPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <TicketsContents />
    </div>
  );
}
