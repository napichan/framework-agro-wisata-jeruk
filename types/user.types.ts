export type UserRole = "User" | "Admin";
export type UserStatus = "Aktif" | "Nonaktif" | "Diblokir";

export type UserRoleFilter = "Semua Role" | UserRole;
export type UserStatusFilter = "Semua Status" | UserStatus;

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  /** Diambil dari sesi login terakhir di database; "-" bila belum pernah login. */
  lastLogin: string;
  /** Tanda centang untuk admin terverifikasi (sesuai design). */
  verified?: boolean;
};

export type UserModalMode = "view" | "edit";

export type UserModalState = {
  user: AdminUser;
  mode: UserModalMode;
} | null;