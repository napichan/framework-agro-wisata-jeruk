export type UserRole = "User" | "Staf Kebun" | "Admin";
export type UserStatus = "Aktif" | "Nonaktif";

export type UserRoleFilter = "Semua Role" | UserRole;
export type UserStatusFilter = "Semua Status" | UserStatus;

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  /** Mis. "Hari ini, 07:45 WIB" atau "Sedang Online" */
  lastLogin: string;
  /** Mis. "Mobile App (Android)" */
  lastDevice: string;
  /** Tanda centang untuk admin terverifikasi (sesuai design). */
  verified?: boolean;
};

export type UserModalMode = "view" | "edit";

export type UserModalState = {
  user: AdminUser;
  mode: UserModalMode;
} | null;