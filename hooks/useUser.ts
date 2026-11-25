"use client";

import { useCallback, useEffect, useState } from "react";
import { usersService, type UserStats } from "@/services/users.service";
import type {
  AdminUser,
  UserModalMode,
  UserModalState,
  UserRoleFilter,
  UserStatusFilter,
} from "@/types/user.types";

const PAGE_SIZE = 7; // sesuai design: "Menampilkan 1-7 dari ... pengguna"

const ROLE_OPTIONS: UserRoleFilter[] = ["Semua Role", "User", "Admin"];

const STATUS_OPTIONS: UserStatusFilter[] = [
  "Semua Status",
  "Aktif",
  "Nonaktif",
  "Diblokir",
];

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
      setStats(await usersService.stats());
    } catch (err) {
      setError(errorMessage(err, "Gagal memuat statistik pengguna."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Jalankan lewat microtask supaya setState di dalam load() tidak terjadi
    // sinkron di body effect (memicu render berantai).
    void (async () => {
      await Promise.resolve();
      await load();
    })();
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

    try {
      const res = await usersService.list({
        page,
        limit: PAGE_SIZE,
        search,
        role,
        status,
      });

      setUsers(res.users);
      setPagination({
        page: res.page,
        totalPages: res.totalPages,
        total: res.total,
      });
    } catch (err) {
      setError(errorMessage(err, "Gagal memuat data pengguna."));
    } finally {
      setLoading(false);
    }
  }, [page, search, role, status]);

  // Jeda singkat supaya mengetik tidak membanjiri request.
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
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
      await usersService.update({
        id: updated.id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
        status: updated.status,
      });

      setModal(null);
      await load();
    } catch (err) {
      setError(errorMessage(err, "Gagal menyimpan perubahan pengguna."));
    }
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
  };
}