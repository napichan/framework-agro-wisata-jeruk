import ReportContents from "./components/report-contents";

export const metadata = {
  title: "Laporan — Dashboard Admin",
};

export default function AdminLaporanPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <ReportContents />
    </div>
  );
}