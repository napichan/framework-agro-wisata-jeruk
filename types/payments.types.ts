export type PaymentStatus = "Menunggu" | "Diverifikasi" | "Ditolak";

export type StatusFilter = "semua" | "menunggu" | "diverifikasi" | "ditolak";

export type Payment = {
  /** ID pembayaran numerik dari database (untuk aksi verifikasi/tolak). */
  id: string;
  bookingCode: string;
  date: string; // "28 Okt 2024"
  time: string; // "09:15 WIB"
  customer: string;
  paket: string;
  bank: string;
  /** Catatan kecil di bawah info transfer (oranye). */
  infoNote?: string;
  nominal: number;
  status: PaymentStatus;
  hasSlip: boolean;
  /** Path berkas bukti transfer di server (opsional). */
  proofPath?: string;
  /** Nama admin yang memverifikasi/menolak (dari kolom verified_by). */
  verifiedBy?: string;
  /** Waktu verifikasi/penolakan (ISO) untuk statistik hari ini. */
  verifiedAt?: string;
};


export type PaymentStats = {
  menungguCount: number;
  menungguTotal: number;
  verifiedCount: number;
  verifiedTotal: number;
  verifiedTodayCount: number;
  verifiedTodayTotal: number;
  rejectedCount: number;
  rejectedTotal: number;
  totalCount: number;
};

