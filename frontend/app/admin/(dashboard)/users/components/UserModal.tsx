"use client";

import { useState } from "react";
import type {
  AdminUser,
  UserModalMode,
  UserRole,
  UserStatus,
} from "@/types/user.types";

export default function UserModal({
  user,
  mode,
  avatarClass,
  onClose,
  onSave,
}: {
  user: AdminUser;
  mode: UserModalMode;
  avatarClass: string;
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
            className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ${avatarClass}`}
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