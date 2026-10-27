export type ReportStatus = "Terverifikasi" | "Pending" | "Ditolak";

export type ReportStatusFilter = "Semua Status" | ReportStatus;

export type ReportTx = {
  id: string; // "#TRX-1824"
  user: string;
  paket: string;
  date: string; // ISO "2024-10-28"
  nominal: number;
  status: ReportStatus;
};

export type ReportStats = {
  total: number;
  revenue: number;
  verifiedCount: number;
  verifiedRatio: number; // persen, mis. 91.3
  verifiedText: string; // "91,3"
  rejectedCount: number;
  rejectedRatio: number;
  rejectedText: string;
  pendingCount: number;
};

export type ChartMode = "harian" | "mingguan" | "bulanan";

export type ChartSeries = {
  labels: string[];
  values: number[];
  /** Indeks titik yang ditandai (mis. "Okt (Aktif)"). */
  activeIndex: number;
};