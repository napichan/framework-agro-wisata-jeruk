export type StatIcon = "users" | "receipt" | "dollar" | "clock";

export type DashboardStat = {
  label: string;
  value: string;
  delta: string;
  icon: StatIcon;
  iconClass: string;
};

export type PaymentStatusItem = {
  label: string;
  value: number;
  color: string;
};

export type TransactionStatus = "Lunas" | "Pending";

export type DashboardTransaction = {
  id: string;
  name: string;
  paket: string;
  date: string;
  total: number;
  status: TransactionStatus;
};

export type ActivityLog = {
  at: string;
  email: string;
  status: "berhasil" | "gagal";
  ip: string;
  ua: string;
};

export type RevenuePoint = {
  bulan: string;
  nilai: number;
};