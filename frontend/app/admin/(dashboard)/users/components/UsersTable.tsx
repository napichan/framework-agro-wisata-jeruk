"use client";

import { useUser } from "@/hooks/useUser";
import type { UserRoleFilter, UserStatusFilter } from "@/types/user.types";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
  IconEye,
  IconPencil,
  IconSearch,
  IconShieldCheck,
} from "@/components/ui/icons";
import UserModal from "./UserModal";

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

function avatarColor(id: string): string {
  let hash = 0;
  for (const ch of id) hash = (hash + ch.charCodeAt(0)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[hash];
}

export default function UsersTable() {
  const {
    search,
    role,
    status,
    changeSearch,
    changeRole,
    changeStatus,
    roleOptions,
    statusOptions,
    users,
    totalFiltered,
    start,
    from,
    to,
    currentPage,
    totalPages,
    pageNumbers,
    setPage,
    modal,
    openModal,
    closeModal,
    saveUser,
    exportCsv,
  } = useUser();

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
            onChange={(event) => changeSearch(event.target.value)}
            placeholder="Cari nama atau email pengguna..."
            aria-label="Cari nama atau email pengguna"
            className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
          />
        </div>

        {/* Filter role */}
        <select
          value={role}
          onChange={(event) =>
            changeRole(event.target.value as UserRoleFilter)
          }
          aria-label="Filter role"
          className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-600 outline-none transition focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
        >
          {roleOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Filter status */}
        <select
          value={status}
          onChange={(event) =>
            changeStatus(event.target.value as UserStatusFilter)
          }
          aria-label="Filter status"
          className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-600 outline-none transition focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
        >
          {statusOptions.map((option) => (
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
              {users.length > 0 ? (
                users.map((user, index) => (
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
                          onClick={() => openModal(user, "view")}
                          className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
                        >
                          <IconEye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          aria-label={`Edit ${user.name}`}
                          onClick={() => openModal(user, "edit")}
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
          Menampilkan {from}-{to} dari {totalFiltered} pengguna
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
          avatarClass={avatarColor(modal.user.id)}
          onClose={closeModal}
          onSave={saveUser}
        />
      ) : null}
    </div>
  );
}