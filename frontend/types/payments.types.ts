export type PaymentStatus = "Menunggu" | "Diverifikasi" | "Ditolak";

export type StatusFilter = "semua" | "menunggu" | "diverifikasi" | "ditolak";

export type Payment = {
  /** ID pembayaran numerik dari database (untuk aksi verifikasi/tolak). */
  id: string;
  bookingCode: string;
  date: string; // "28 Okt 2024"
  time: string; // "09:15 WIB"
  customer: string;
  /** Nomor WhatsApp tidak tersedia di database; bersifat opsional. */
  wa?: string;
  paket: string;
  bank: string;
  /** Data pengirim transfer tidak tersedia di database; opsional. */
  senderName?: string;
  senderAccount?: string;
  /** Catatan kecil di bawah info transfer (oranye). */
  infoNote?: string;
  nominal: number;
  status: PaymentStatus;
  hasSlip: boolean;
  /** Path berkas bukti transfer di server (opsional). */
  proofPath?: string;
  /** Penanda sudah ditandai QR (khusus status Diverifikasi, state sisi klien). */
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