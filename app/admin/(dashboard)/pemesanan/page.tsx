import BookingsContents from "./components/BookingsContents";

export const metadata = { title: "Pemesanan | Admin Agro Jeruk" };

export default async function PemesananPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <BookingsContents initialSearch={params.search ?? ""} />
    </div>
  );
}
