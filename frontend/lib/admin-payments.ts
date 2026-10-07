/**
 * Data demo Verifikasi Pembayaran.
 * Angka dirancang agar cocok dengan design Figma:
 * - Menunggu verifikasi : 14 transaksi — Total Rp 4.999.000
 * - Diverifikasi hari ini: 38 transaksi — Total Rp 12.400.000
 * - Ditolak              : 2 transaksi  — Total 54 pembayaran
 *
 * Untuk produksi: ganti dengan panggilan API / query DB.
 */

export type PaymentStatus = "Menunggu" | "Diverifikasi" | "Ditolak";

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

/* ==================== 5 baris pertama (persis design) ==================== */

const FEATURED_PAYMENTS: Payment[] = [
  {
    id: "TRX-10241",
    date: "28 Okt 2024",
    time: "09:15 WIB",
    customer: "Budi Hartono",
    wa: "0812-3344-5566",
    paket: "Paket Keluarga (5 Pax)",
    bank: "BCA",
    senderName: "Sutrisno",
    senderAccount: "123-456-9900",
    infoNote: "Transfer rek. atas nama sendiri",
    nominal: 450_250,
    status: "Menunggu",
    hasSlip: true,
  },
  {
    id: "TRX-10240",
    date: "28 Okt 2024",
    time: "08:20 WIB",
    customer: "Siti Aminah",
    wa: "0813-7788-9911",
    paket: "Paket Sendiri (2 Pax)",
    bank: "BCA",
    senderName: "Siti Aminah",
    senderAccount: "0099-8877-6655",
    infoNote: "Tujuan: MANDIRI 0876-5432 a.n Agro Wisata",
    nominal: 219_000,
    status: "Menunggu",
    hasSlip: true,
  },
  {
    id: "TRX-10239",
    date: "28 Okt 2024",
    time: "07:48 WIB",
    customer: "SMP IT Insan Cita (Bpk. Jaelani)",
    wa: "0857-2211-4433",
    paket: "Paket Edukasi (30 Pax)",
    bank: "BCA",
    senderName: "Yayan S",
    senderAccount: "678-0101",
    infoNote: "Tujuan: BCA 777 a.n Agro Petik Jeruk",
    nominal: 2_425_000,
    status: "Menunggu",
    hasSlip: true,
  },
  {
    id: "TRX-10238",
    date: "28 Okt 2024",
    time: "07:05 WIB",
    customer: "Denny Sumargo",
    wa: "0821-5566-7788",
    paket: "Tiket Masuk Reguler (4 Tiket)",
    bank: "BRI",
    senderName: "Denny S",
    senderAccount: "3021-01-008875",
    infoNote: "Verifikasi data rekening",
    nominal: 189_000,
    status: "Diverifikasi",
    hasSlip: true,
    paid: true,
  },
  {
    id: "TRX-10237",
    date: "27 Okt 2024",
    time: "19:30 WIB",
    customer: "Hendri Kurnia",
    wa: "0878-9900-1122",
    paket: "Paket Petik Jeruk (3 Pax)",
    bank: "BNI",
    senderName: "Hendri K",
    senderAccount: "0099-12-77",
    infoNote: "Nominal tidak sesuai",
    nominal: 99_000,
    nominalNote: "Butuh bukti ulang",
    status: "Ditolak",
    hasSlip: false,
  },
];

/* ==================== Pool untuk data generate ==================== */

const FIRST_NAMES = [
  "Agus", "Dewi", "Fajar", "Rizky", "Putri", "Bayu", "Intan", "Yoga",
  "Lestari", "Hendra", "Melati", "Arif", "Citra", "Dimas", "Rina", "Taufik",
  "Wulan", "Ilham", "Vina", "Galih", "Anisa", "Reza", "Fitri", "Bagus",
];

const LAST_NAMES = [
  "Wijaya", "Saputra", "Permata", "Hidayat", "Nugroho", "Susanto",
  "Anggraini", "Kusuma", "Firmansyah", "Ramadhan", "Oktaviani", "Sanjaya",
  "Hakim", "Puspita", "Maulana", "Utami", "Santoso", "Wirawan",
];

const PAKETS = [
  "Tiket Masuk Reguler (2 Tiket)",
  "Tiket Masuk Reguler (4 Tiket)",
  "Paket Sendiri (2 Pax)",
  "Paket Keluarga (5 Pax)",
  "Paket Petik Jeruk (3 Pax)",
  "Paket Rombongan (15 Pax)",
];

const BANKS = ["BCA", "MANDIRI", "BRI", "BNI"];

const WAITING_TIMES = [
  "07:02 WIB", "06:45 WIB", "06:20 WIB", "05:58 WIB", "05:31 WIB",
  "05:12 WIB", "04:47 WIB", "04:20 WIB", "03:55 WIB", "03:30 WIB", "03:05 WIB",
];

const VERIFIED_TIMES = [
  "21:40 WIB", "20:15 WIB", "18:52 WIB", "17:30 WIB", "16:05 WIB",
  "14:48 WIB", "13:22 WIB", "12:05 WIB", "10:40 WIB", "09:18 WIB",
];

const INFO_NOTES = [
  "Cocok dengan mutasi bank",
  "Transfer rek. atas nama sendiri",
  "Pembayaran via mobile banking",
  "Tujuan: BCA 777 a.n Agro Petik Jeruk",
  "Verifikasi data rekening",
];

/* ==================== Nominal ==================== */

/**
 * Total yang ditargetkan per status (sesuai design).
 * Elemen terakhir tiap grup diseimbangkan agar jumlahnya pas.
 */
const WAITING_TARGET = 4_999_000;
const VERIFIED_TARGET = 12_400_000;

/** 10 nominal pertama (Menunggu) — sisa 1 item diseimbangkan. */
const WAITING_POOL = [
  175_000, 199_000, 145_000, 225_000, 99_000,
  250_000, 130_000, 210_000, 165_000, 187_500,
];

/** 36 nominal (Diverifikasi) — sisa 1 item diseimbangkan. */
const VERIFIED_POOL = [
  400_000, 375_000, 299_000, 325_000, 350_000, 425_000,
  210_000, 380_000, 300_000, 265_000, 250_000, 340_000,
  399_000, 315_000, 275_000, 300_000, 430_000, 360_000,
  290_000, 345_000, 220_000, 305_000, 385_000, 330_000,
  280_000, 410_000, 320_000, 355_000, 320_000, 405_000,
  295_000, 365_000, 445_000, 310_000, 285_000, 300_000,
];

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

/**
 * Gabungkan pool dengan 1 nilai penyeimbang sehingga total grup
 * tepat sama dengan target design.
 */
function balanced(pool: number[], target: number): number[] {
  const last = target - sum(pool);
  if (last <= 0) {
    throw new Error(`Pool melebihi target (sisa ${last})`);
  }
  return [...pool, last];
}

const WAITING_NOMINALS = balanced(
  WAITING_POOL,
  WAITING_TARGET - sum(FEATURED_PAYMENTS.filter((p) => p.status === "Menunggu").map((p) => p.nominal)),
);

const VERIFIED_NOMINALS = balanced(
  VERIFIED_POOL,
  VERIFIED_TARGET - sum(FEATURED_PAYMENTS.filter((p) => p.status === "Diverifikasi").map((p) => p.nominal)),
);

/* ==================== Generator deterministik ==================== */

function buildPayments(): Payment[] {
  const payments: Payment[] = [...FEATURED_PAYMENTS];
  let counter = 10236; // lanjutan TRX-10237 (descending)

  // 14 menunggu = 3 featured + 11 generate
  for (let i = 0; i < WAITING_NOMINALS.length; i++, counter--) {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last = LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length];

    payments.push({
      id: `TRX-${counter}`,
      date: "28 Okt 2024",
      time: WAITING_TIMES[i] ?? "02:45 WIB",
      customer: `${first} ${last}`,
      wa: `081${i % 9}-${1000 + i}-${2000 + i}`,
      paket: PAKETS[i % PAKETS.length],
      bank: BANKS[i % BANKS.length],
      senderName: `${first} ${last}`,
      senderAccount: `${100 + i}-${200 + i}-${300 + i}`,
      infoNote: INFO_NOTES[i % INFO_NOTES.length],
      nominal: WAITING_NOMINALS[i],
      status: "Menunggu",
      hasSlip: i % 7 !== 6, // sesekali tanpa slip
    });
  }

  // 38 diverifikasi = 1 featured + 37 generate
  for (let i = 0; i < VERIFIED_NOMINALS.length; i++, counter--) {
    const first = FIRST_NAMES[(i + 7) % FIRST_NAMES.length];
    const last = LAST_NAMES[(i + 3) % LAST_NAMES.length];

    payments.push({
      id: `TRX-${counter}`,
      date: i % 3 === 0 ? "27 Okt 2024" : "28 Okt 2024",
      time: VERIFIED_TIMES[i % VERIFIED_TIMES.length],
      customer: `${first} ${last}`,
      wa: `085${i % 9}-${3000 + i}-${4000 + i}`,
      paket: PAKETS[(i + 2) % PAKETS.length],
      bank: BANKS[(i + 1) % BANKS.length],
      senderName: `${first} ${last}`,
      senderAccount: `${400 + i}-${500 + i}-${600 + i}`,
      infoNote: INFO_NOTES[(i + 2) % INFO_NOTES.length],
      nominal: VERIFIED_NOMINALS[i],
      status: "Diverifikasi",
      hasSlip: true,
      paid: i % 4 !== 3,
    });
  }

  // 2 ditolak = 1 featured + 1 generate
  payments.push({
    id: `TRX-${counter}`,
    date: "27 Okt 2024",
    time: "15:12 WIB",
    "customer": "Rudi Hartanto",
    wa: "0895-3344-1122",
    paket: "Paket Rombongan (15 Pax)",
    bank: "MANDIRI",
    senderName: "Rudi H",
    senderAccount: "9911-22-33",
    infoNote: "Nominal tidak sesuai",
    nominal: 150_000,
    nominalNote: "Butuh bukti ulang",
    status: "Ditolak",
    hasSlip: true,
  });

  return payments;
}

export const PAYMENTS: Payment[] = buildPayments();

export type PaymentStats = {
  menungguCount: number;
  menungguTotal: number;
  verifiedCount: number;
  verifiedTotal: number;
  rejectedCount: number;
  totalCount: number;
};

export function computePaymentStats(payments: Payment[]): PaymentStats {
  const menunggu = payments.filter((p) => p.status === "Menunggu");
  const verified = payments.filter((p) => p.status === "Diverifikasi");
  const rejected = payments.filter((p) => p.status === "Ditolak");

  return {
    menungguCount: menunggu.length,
    menungguTotal: sum(menunggu.map((p) => p.nominal)),
    verifiedCount: verified.length,
    verifiedTotal: sum(verified.map((p) => p.nominal)),
    rejectedCount: rejected.length,
    totalCount: payments.length,
  };
}

export const DESTINATION_ACCOUNTS = [
  { bank: "BCA", number: "123-456-9900", owner: "PT Agro Petik Jeruk" },
  { bank: "BRI", number: "3021-01-008875-53-21", owner: "PT Agro Petik Jeruk" },
];

/** Nomor WhatsApp siap pakai untuk tombol "Chat WA". */
export function waLink(phone: string): string {
  const digits = phone.replace(/\D/g, "").replace(/^0/, "62");
  return `https://wa.me/${digits}`;
}

export const rupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;
