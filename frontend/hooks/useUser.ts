"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type {
  AdminUser,
  UserModalMode,
  UserModalState,
  UserRole,
  UserRoleFilter,
  UserStatusFilter,
} from "@/types/user.types";

const PAGE_SIZE = 7; // sesuai design: "Menampilkan 1-7 dari ... pengguna"

type ApiUser = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive" | "blocked";
  created_at: string;
  updated_at: string;
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

const ROLE_LABEL: Record<ApiUser["role"], UserRole> = {
  user: "User",
  admin: "Admin",
};

const STATUS_LABEL: Record<ApiUser["status"], "Aktif" | "Nonaktif"> = {
  active: "Aktif",
  inactive: "Nonaktif",
  blocked: "Nonaktif",
};

function mapUser(row: ApiUser): AdminUser {
  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    role: ROLE_LABEL[row.role],
    status: STATUS_LABEL[row.status],
    // Riwayat login/perangkat belum tersimpan di database.
    lastLogin: "-",
    lastDevice: "-",
    verified: row.role === "admin",
  };
}

const ROLE_OPTIONS: UserRoleFilter[] = ["Semua Role", "User", "Admin"];

const STATUS_OPTIONS: UserStatusFilter[] = ["Semua Status", "Aktif", "Nonaktif"];

function roleParam(role: UserRoleFilter): string {
  if (role === "User") return "user";
  if (role === "Admin") return "admin";
  return "";
}

function statusParam(status: UserStatusFilter): string {
  if (status === "Aktif") return "active";
  if (status === "Nonaktif") return "inactive,blocked";
  return "";
}

function errorMessage(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback;
}

/* ==================== Statistik (kartu) ==================== */

export function useUserStats() {
  const [stats, setStats] = useState<UserStats>({
    total: 0,
    wisatawan: 0,
    nonaktif: 0,
    admin: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await apiFetch<StatsResponse>("/api/admin/users/stats");

      setStats({
        total: res.data.total,
        wisatawan: res.data.user,
        nonaktif: res.data.inactive,
        admin: res.data.admin,
      });
    } catch (err) {
      setError(errorMessage(err, "Gagal memuat statistik pengguna."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { stats, loading, error, reload: load };
}

/* ==================== Hook utama ==================== */

export function useUser() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState<UserRoleFilter>("Semua Role");
  const [status, setStatus] = useState<UserStatusFilter>("Semua Status");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<UserModalState>(null);

  const load = useCallback(async () => {
    setError(null);

    const params = new URLSearchParams({
      page: String(page),
      limit: String(PAGE_SIZE),
    });

    const query = search.trim();
    const roleValue = roleParam(role);
    const statusValue = statusParam(status);

    if (query) params.set("search", query);
    if (roleValue) params.set("role", roleValue);
    if (statusValue) params.set("status", statusValue);

    try {
      const res = await apiFetch<UsersResponse>(`/api/admin/users?${params}`);

      setUsers(res.data.map(mapUser));
      setPagination({
        page: res.pagination.page,
        totalPages: res.pagination.totalPages,
        total: res.pagination.total,
      });
    } catch (err) {
      setError(errorMessage(err, "Gagal memuat data pengguna."));
    } finally {
      setLoading(false);
    }
  }, [page, search, role, status]);

  // Jeda singkat supaya mengetik tidak membanjiri request.
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      load();
    }, 300);

    return () => clearTimeout(timer);
  }, [load]);

  const currentPage = pagination.page;
  const start = (currentPage - 1) * PAGE_SIZE;
  const from = users.length === 0 ? 0 : start + 1;
  const to = start + users.length;

  const pageNumbers = useCallback(() => {
    const fromPage = Math.max(1, Math.min(currentPage - 1, pagination.totalPages - 2));
    const toPage = Math.min(pagination.totalPages, fromPage + 2);
    const numbers: number[] = [];
    for (let n = fromPage; n <= toPage; n++) numbers.push(n);
    return numbers;
  }, [currentPage, pagination.totalPages])();

  function changeSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function changeRole(value: UserRoleFilter) {
    setRole(value);
    setPage(1);
  }

  function changeStatus(value: UserStatusFilter) {
    setStatus(value);
    setPage(1);
  }

  function openModal(user: AdminUser, mode: UserModalMode) {
    setModal({ user, mode });
  }

  function closeModal() {
    setModal(null);
  }

  async function saveUser(updated: AdminUser) {
    setError(null);

    try {
      await apiFetch(`/api/admin/users/${updated.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: updated.name,
          email: updated.email,
          role: updated.role === "Admin" ? "admin" : "user",
        }),
      });

      await apiFetch(`/api/admin/users/${updated.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({
          status: updated.status === "Aktif" ? "active" : "inactive",
        }),
      });

      setModal(null);
      await load();
    } catch (err) {
      setError(errorMessage(err, "Gagal menyimpan perubahan pengguna."));
    }
  }

  function exportCsv() {
    const header = [
      "ID",
      "Nama",
      "Email",
      "Role",
      "Status",
      "Terakhir Login",
      "Perangkat",
    ];

    const rows = users.map((user) =>
      [
        user.id,
        user.name,
        user.email,
        user.role,
        user.status,
        user.lastLogin ?? "-",
        user.lastDevice ?? "-",
      ]
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(","),
    );

    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "manajemen-user.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return {
    // status muat
    loading,
    error,

    // filter
    search,
    role,
    status,
    changeSearch,
    changeRole,
    changeStatus,
    roleOptions: ROLE_OPTIONS,
    statusOptions: STATUS_OPTIONS,

    // data (satu halaman dari server)
    users,
    totalFiltered: pagination.total,

    // paginasi
    start,
    from,
    to,
    currentPage,
    totalPages: pagination.totalPages,
    pageNumbers,
    setPage,

    // modal
    modal,
    openModal,
    closeModal,
    saveUser,

    // export (baris halaman aktif)
    exportCsv,
  };
}