import { apiFetch } from "@/lib/api";
import type {
  AdminUser,
  UserRole,
  UserRoleFilter,
  UserStatusFilter,
} from "@/types/user.types";

/* ==================== Tipe respons backend ==================== */

type ApiUser = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive" | "blocked";
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
};

type UsersResponse = {
  data: ApiUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type StatsResponse = {
  data: {
    admin: number;
    user: number;
    total: number;
    inactive: number;
  };
};

export type UserStats = {
  total: number;
  wisatawan: number;
  nonaktif: number;
  admin: number;
};

export type UserListParams = {
  page: number;
  limit: number;
  search?: string;
  role: UserRoleFilter;
  status: UserStatusFilter;
};

export type UserListResult = {
  users: AdminUser[];
  page: number;
  totalPages: number;
  total: number;
};

export type UserPayload = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: AdminUser["status"];
};

/* ==================== Mapping ==================== */

const ROLE_LABEL: Record<ApiUser["role"], UserRole> = {
  user: "User",
  admin: "Admin",
};

const STATUS_LABEL: Record<ApiUser["status"], AdminUser["status"]> = {
  active: "Aktif",
  inactive: "Nonaktif",
  blocked: "Diblokir",
};

const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

// "2026-11-19T07:45:00.000Z" -> "19 Nov 2026 • 07.45"
function formatLastLogin(iso: string | null): string {
  if (!iso) return "-";

  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${Number(day)} ${MONTH_ABBR[Number(month) - 1]} ${year} • ${iso
    .slice(11, 16)
    .replace(":", ".")}`;
}

function mapUser(row: ApiUser): AdminUser {
  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    role: ROLE_LABEL[row.role],
    status: STATUS_LABEL[row.status],
    lastLogin: formatLastLogin(row.last_login_at),
    verified: row.role === "admin",
  };
}

function roleParam(role: UserRoleFilter): string {
  if (role === "User") return "user";
  if (role === "Admin") return "admin";
  return "";
}

function statusParam(status: UserStatusFilter): string {
  if (status === "Aktif") return "active";
  if (status === "Nonaktif") return "inactive";
  if (status === "Diblokir") return "blocked";
  return "";
}

/* ==================== Service ==================== */

export const usersService = {
  /** Daftar pengguna satu halaman beserta info paginasi server. */
  async list(params: UserListParams): Promise<UserListResult> {
    const query = new URLSearchParams({
      page: String(params.page),
      limit: String(params.limit),
    });

    const search = params.search?.trim() ?? "";
    const role = roleParam(params.role);
    const status = statusParam(params.status);

    if (search) query.set("search", search);
    if (role) query.set("role", role);
    if (status) query.set("status", status);

    const res = await apiFetch<UsersResponse>(`/api/admin/users?${query}`);

    return {
      users: res.data.map(mapUser),
      page: res.pagination.page,
      totalPages: res.pagination.totalPages,
      total: res.pagination.total,
    };
  },

  /** Angka ringkas untuk kartu statistik pengguna. */
  async stats(): Promise<UserStats> {
    const res = await apiFetch<StatsResponse>("/api/admin/users/stats");

    return {
      total: res.data.total,
      wisatawan: res.data.user,
      nonaktif: res.data.inactive,
      admin: res.data.admin,
    };
  },

  /** Simpan perubahan profil + status pengguna. */
  async update(payload: UserPayload): Promise<void> {
    await apiFetch(`/api/admin/users/${payload.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        role: payload.role === "Admin" ? "admin" : "user",
      }),
    });

    await apiFetch(`/api/admin/users/${payload.id}/status`, {
      method: "PATCH",
      body: JSON.stringify({
        status:
          payload.status === "Aktif"
            ? "active"
            : payload.status === "Diblokir"
              ? "blocked"
              : "inactive",
      }),
    });
  },
};
