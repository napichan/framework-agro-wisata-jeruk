export type StatIcon = "users" | "receipt" | "dollar" | "clock" | "ticket";

export type DashboardStat = {
  label: string;
  value: string;
  hint?: string;
  icon: StatIcon;
  iconClass: string;
};

export type TransactionStatus = "Lunas" | "Pending" | "Ditolak";

export type DashboardTransaction = {
  id: string;
  name: string;
  paket: string;
  date: string;
  total: number;
  status: TransactionStatus;
};

export type PendingPayment = {
  id: number;
  code: string;
  name: string;
  paket: string;
  date: string;
  total: number;
  uploadedAt: string;
};

export type RevenuePoint = {
  label: string;
  nilai: number;
};