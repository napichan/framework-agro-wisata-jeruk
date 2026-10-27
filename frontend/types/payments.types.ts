export type PaymentStatus = "Menunggu" | "Diverifikasi" | "Ditolak";

export type StatusFilter = "semua" | "menunggu" | "diverifikasi" | "ditolak";

export type Payment = {
  id: string;
  date: string; // "28 Okt 2024"
  time: string; // "09:15 WIB"
  customer: string;
  wa: string; // "0812-3344-5566"
  paket: string;
  bank: string;
  senderName: string;
  senderAccount: string;
  /** Catatan kecil di bawah info transfer (oranye/merah). */
  infoNote?: string;
  nominal: number;
  /** Catatan di bawah nominal (merah). */
  nominalNote?: string;
  status: PaymentStatus;
  hasSlip: boolean;
  /** Penanda sudah ditandai QR (khusus status Diverifikasi). */
  paid?: boolean;
};

export type PaymentStats = {
  menungguCount: number;
  menungguTotal: number;
  verifiedCount: number;
  verifiedTotal: number;
  rejectedCount: number;
  totalCount: number;
};

export type DestinationAccount = {
  bank: string;
  number: string;
  owner: string;
};