"use client";

import { useState, useEffect, useCallback } from "react";
import { productsService, type Product } from "@/services/products.service";

type FormData = {
  name: string;
  description: string;
  price: string;
  status: "active" | "inactive";
};

const EMPTY_FORM: FormData = {
  name: "",
  description: "",
  price: "",
  status: "active",
};

function rupiah(value: string | number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(value));
}

export default function ProductContents() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setProducts(await productsService.list());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal memuat produk.");
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

  function openCreate() {
    setEditProduct(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setModalOpen(true);
  }

  function openEdit(product: Product) {
    setEditProduct(product);
    setForm({
      name: product.name,
      description: product.description ?? "",
      price: String(product.price),
      status: product.status,
    });
    setFormError(null);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const price = Number(form.price);
    if (!form.name.trim()) return setFormError("Nama produk wajib diisi.");
    if (!price || price <= 0) return setFormError("Harga harus lebih dari 0.");

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim() || null,
        price,
        status: form.status,
      };

      if (editProduct) {
        await productsService.update(editProduct.id, payload);
      } else {
        await productsService.create(payload);
      }

      setModalOpen(false);
      await load();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await productsService.remove(deleteTarget.id);
      setDeleteTarget(null);
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Gagal menghapus.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Produk / Paket</h1>
          <p className="mt-0.5 text-sm text-neutral-500">
            Kelola paket wisata yang tersedia untuk pemesanan
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800 transition"
        >
          + Tambah Produk
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center text-sm text-neutral-400 shadow-sm ring-1 ring-neutral-200/70">
          Memuat data produk…
        </div>
      ) : error ? (
        <div className="rounded-2xl bg-white p-10 text-center text-sm text-red-500 shadow-sm ring-1 ring-neutral-200/70">
          {error}{" "}
          <button onClick={load} className="ml-2 underline text-green-700">
            Coba lagi
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center text-sm text-neutral-400 shadow-sm ring-1 ring-neutral-200/70">
          Belum ada produk. Klik &quot;+ Tambah Produk&quot; untuk membuat produk baru.
        </div>
      ) : (
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/70 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-neutral-100 bg-neutral-50">
              <tr>
                <th className="px-5 py-3 text-left font-semibold text-neutral-500">Nama Paket</th>
                <th className="px-5 py-3 text-left font-semibold text-neutral-500">Deskripsi</th>
                <th className="px-5 py-3 text-right font-semibold text-neutral-500">Harga</th>
                <th className="px-5 py-3 text-center font-semibold text-neutral-500">Status</th>
                <th className="px-5 py-3 text-center font-semibold text-neutral-500">Pemesanan</th>
                <th className="px-5 py-3 text-center font-semibold text-neutral-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50/60 transition">
                  <td className="px-5 py-3.5 font-medium text-neutral-900">{product.name}</td>
                  <td className="px-5 py-3.5 text-neutral-500 max-w-xs">
                    <span className="line-clamp-2">{product.description || "-"}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-semibold text-neutral-800">
                    {rupiah(product.price)}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        product.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {product.status === "active" ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    {product.bookingCount > 0 ? (
                      <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                        {product.bookingCount} booking
                      </span>
                    ) : (
                      <span className="text-xs text-neutral-300">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(product)}
                        className="rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-200 transition"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(product)}
                        className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Tambah/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-base font-bold text-neutral-900 mb-4">
              {editProduct ? "Edit Produk" : "Tambah Produk"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  Nama Paket <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  placeholder="mis. Paket Petik Jeruk Premium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 resize-none"
                  placeholder="Deskripsi singkat paket…"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  Harga (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  placeholder="mis. 75000"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, status: e.target.value as "active" | "inactive" }))
                  }
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Nonaktif</option>
                </select>
              </div>

              {formError && (
                <p className="text-xs text-red-500">{formError}</p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800 transition disabled:opacity-60"
                >
                  {saving ? "Menyimpan…" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Hapus */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-base font-bold text-neutral-900">Hapus Produk?</h2>
            <p className="mt-2 text-sm text-neutral-500">
              Produk <span className="font-semibold text-neutral-800">&quot;{deleteTarget.name}&quot;</span>{" "}
              akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
              {deleteTarget.bookingCount > 0 ? (
                <span className="mt-2 block rounded-lg bg-amber-50 p-2.5 text-xs text-amber-700">
                  Paket ini sudah dipakai pada {deleteTarget.bookingCount} pemesanan,
                  jadi kemungkinan besar akan ditolak server. Nonaktifkan saja bila
                  tidak ingin dipakai lagi.
                </span>
              ) : null}
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition disabled:opacity-60"
              >
                {deleting ? "Menghapus…" : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
