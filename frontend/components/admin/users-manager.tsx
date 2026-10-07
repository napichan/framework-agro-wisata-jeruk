"use client";

import { useMemo, useState } from "react";
import {
  ADMIN_USERS,
  type AdminUser,
  type UserRole,
  type UserStatus,
} from "@/lib/admin-users";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
  IconEye,
  IconPencil,
  IconSearch,
  IconShieldCheck,
} from "@/components/icons";

const PAGE_SIZE = 7; // sesuai design: "Menampilkan 1-7 dari 248 pengguna"

const AVATAR_COLORS = [
  "bg-grove-500",
  "bg-brand-500",
  "bg-sky-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-teal-500",
  "bg-indigo-500",
];

const ROLE_OPTIONS: Array<"Semua Role" | UserRole> = [
  "Semua Role",
  "User",
  "Staf Kebun",
  "Admin",
];

const STATUS_OPTIONS: Array<"Semua Status" | UserStatus> = [
  "Semua Status",
  "Aktif",
  "Nonaktif",
];

function avatarColor(id: string): string {
  let hash = 0;
  for (const ch of id) hash = (hash + ch.charCodeAt(0)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[hash];
}

/* ==================== Modal detail / edit ==================== */

function UserModal({
  user,
  mode,
  onClose,
  onSave,
}: {
  user: AdminUser;
  mode: "view" | "edit";
  onClose: () => void;
  onSave: (updated: AdminUser) => void;
}) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  });

  const isEdit = mode === "edit";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={isEdit ? "Edit pengguna" : "Detail pengguna"}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Kepala modal */}
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ${avatarColor(user.id)}`}
          >
            {user.name.charAt(0).toUpperCase()}
          </span>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-neutral-900">
              {user.name}
            </p>
            <p className="truncate text-xs text-neutral-400">{user.id}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="rounded-lg px-2 py-1 text-lg leading-none text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
          >
            ×
          </button>
        </div>

        {/* Isi modal */}
        {isEdit ? (
          <div className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="edit-name"
                className="mb-1.5 block text-xs font-semibold text-neutral-600"
              >
                Nama lengkap
              </label>
              <input
                id="edit-name"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="edit-email"
                className="mb-1.5 block text-xs font-semibold text-neutral-600"
              >
                Email
              </label>
              <input
                id="edit-email"
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="edit-role"
                  className="mb-1.5 block text-xs font-semibold text-neutral-600"
                >
                  Role
                </label>
                <select
                  id="edit-role"
                  value={form.role}
                  onChange={(event) =>
                    setForm({ ...form, role: event.target.value as UserRole })
                  }
                  className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
                >
                  <option>User</option>
                  <option>Staf Kebun</option>
                  <option>Admin</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="edit-status"
                  className="mb-1.5 block text-xs font-semibold text-neutral-600"
                >
                  Status
                </label>
                <select
                  id="edit-status"
                  value={form.status}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      status: event.target.value as UserStatus,
                    })
                  }
                  className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
                >
                  <option>Aktif</option>
                  <option>Nonaktif</option>
                </select>
              </div>
            </div>
          </div>
        ) : (
          <dl className="mt-5 space-y-3 text-sm">
            {[
              ["Email", user.email],
              ["Role", user.role],
              ["Status", user.status],
              ["Terakhir login", user.lastLogin],
              ["Perangkat", user.lastDevice],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-start justify-between gap-4"
              >
                <dt className="text-xs text-neutral-400">{label}</dt>
                <dd className="text-right font-medium text-neutral-800">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {/* Aksi */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50"
          >
            {isEdit ? "Batal" : "Tutup"}
          </button>

          {isEdit ? (
            <button
              type="button"
              onClick={() =>
                onSave({
                  ...user,
                  name: form.name.trim() || user.name,
                  email: form.email.trim() || user.email,
                  role: form.role,
                  status: form.status,
                })
              }
              className="rounded-lg bg-grove-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-grove-800"
            >
              Simpan
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ==================== Halaman ==================== */

export function UsersManager() {
  const [users, setUsers] = useState<AdminUser[]>(ADMIN_USERS);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<(typeof ROLE_OPTIONS)[number]>("Semua Role");
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>(
    "Semua Status",
  );
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<{
    user: AdminUser;
    mode: "view" | "edit";
  } | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchSearch =
        query === "" ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query);

      const matchRole = role === "Semua Role" || user.role === role;
      const matchStatus = status === "Semua Status" || user.status === status;

      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, role, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  // Nomor halaman: jendela 3 di sekitar halaman aktif (seperti design).
  const pageNumbers = useMemo(() => {
    const from = Math.max(1, Math.min(currentPage - 1, totalPages - 2));
    const to = Math.min(totalPages, from + 2);
    const numbers: number[] = [];
    for (let n = from; n <= to; n++) numbers.push(n);
    return numbers;
  }, [currentPage, totalPages]);

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

    const rows = filtered.map((user) =>
      [
        user.id,
        user.name,
        user.email,
        user.role,
        user.status,
        user.lastLogin,
        user.lastDevice,
      ]
        .map((cell) => `"${cell.replace(/"/g, '""')}"`)
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

  const from = filtered.length === 0 ? 0 : start + 1;
  const to = Math.min(start + PAGE_SIZE, filtered.length);

  return (
    <div className="space-y-5">
      {/* ================= TOOLBAR ================= */}
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-neutral-200/70 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Cari nama atau email pengguna..."
            aria-label="Cari nama atau email pengguna"
            className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
          />
        </div>

        {/* Filter role */}
        <select
          value={role}
          onChange={(event) => {
            setRole(event.target.value as (typeof ROLE_OPTIONS)[number]);
            setPage(1);
          }}
          aria-label="Filter role"
          className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-600 outline-none transition focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
        >
          {ROLE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Filter status */}
        <select
          value={status}
          onChange={(event) => {
            setStatus(event.target.value as (typeof STATUS_OPTIONS)[number]);
            setPage(1);
          }}
          aria-label="Filter status"
          className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-600 outline-none transition focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Export */}
        <button
          type="button"
          onClick={exportCsv}
          className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-600 transition hover:border-neutral-300 hover:bg-neutral-50"
        >
          <IconDownload className="h-4 w-4" />
          Export
        </button>
      </div>

      {/* ================= TABEL ================= */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/70">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="border-b border-neutral-100 text-[11px] uppercase tracking-wide text-neutral-400">
                <th className="px-5 py-3.5 font-semibold">No</th>
                <th className="px-5 py-3.5 font-semibold">Nama Pengguna</th>
                <th className="px-5 py-3.5 font-semibold">Email</th>
                <th className="px-5 py-3.5 font-semibold">Role</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold">Terakhir Login</th>
                <th className="px-5 py-3.5 text-right font-semibold">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100">
              {visible.length > 0 ? (
                visible.map((user, index) => (
                  <tr
                    key={user.id}
                    className="text-[13px] text-neutral-500 transition hover:bg-neutral-50/60"
                  >
                    {/* No */}
                    <td className="px-5 py-4">{start + index + 1}</td>

                    {/* Nama + ID */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColor(user.id)}`}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </span>

                        <div className="min-w-0">
                          <p className="flex items-center gap-1.5 font-semibold text-neutral-800">
                            <span className="truncate">{user.name}</span>

                            {user.verified ? (
                              <IconShieldCheck
                                className="h-3.5 w-3.5 shrink-0 text-grove-500"
                                aria-label="Admin terverifikasi"
                              />
                            ) : null}
                          </p>

                          <p className="text-[11px] text-neutral-400">
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4">{user.email}</td>

                    {/* Role */}
                    <td className="px-5 py-4">{user.role}</td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[13px] font-semibold ${
                          user.status === "Aktif"
                            ? "text-grove-600"
                            : "text-neutral-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            user.status === "Aktif"
                              ? "bg-grove-500"
                              : "bg-neutral-300"
                          }`}
                        />
                        {user.status}
                      </span>
                    </td>

                    {/* Terakhir login */}
                    <td className="px-5 py-4">
                      <p
                        className={
                          user.lastLogin === "Sedang Online"
                            ? "font-semibold text-grove-600"
                            : "font-medium text-neutral-700"
                        }
                      >
                        {user.lastLogin}
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        {user.lastDevice}
                      </p>
                    </td>

                    {/* Aksi */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          aria-label={`Lihat ${user.name}`}
                          onClick={() => setModal({ user, mode: "view" })}
                          className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
                        >
                          <IconEye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          aria-label={`Edit ${user.name}`}
                          onClick={() => setModal({ user, mode: "edit" })}
                          className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
                        >
                          <IconPencil className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-14 text-center text-sm text-neutral-400"
                  >
                    Tidak ada pengguna yang cocok dengan pencarianmu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= FOOTER TABEL ================= */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-neutral-400">
          Menampilkan {from}-{to} dari {filtered.length} pengguna
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-500 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <IconChevronLeft className="h-3.5 w-3.5" />
            Prev
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => setPage(number)}
              aria-current={number === currentPage ? "page" : undefined}
              className={`min-w-8 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                number === currentPage
                  ? "bg-grove-700 text-white"
                  : "border border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-500 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <IconChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {modal ? (
        <UserModal
          user={modal.user}
          mode={modal.mode}
          onClose={() => setModal(null)}
          onSave={(updated) => {
            setUsers((current) =>
              current.map((item) => (item.id === updated.id ? updated : item)),
            );
            setModal(null);
          }}
        />
      ) : null}
    </div>
  );
}
