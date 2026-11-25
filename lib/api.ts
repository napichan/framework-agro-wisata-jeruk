import { getToken, removeToken } from "./token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL belum dikonfigurasi.");
  }

  const token = getToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);

    // Sesi admin habis: bersihkan cookie lalu kembali ke halaman login agar
    // tabel tidak tampak kosong tanpa penjelasan.
    if (res.status === 401 && typeof window !== "undefined") {
      removeToken();
      window.location.replace(`${window.location.origin}/admin/login`);
    }

    throw new Error(error?.message ?? "Terjadi kesalahan pada server");
  }

  return res.json() as Promise<T>;
}
