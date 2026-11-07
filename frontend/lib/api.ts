
import type { LoginPayload, LoginResponse } from "@/types/auth.types";
import { getToken } from "./token";

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
    throw new Error(error?.message ?? "Terjadi kesalahan pada server");
  }

  return res.json() as Promise<T>;
}

export async function loginRequest(
  payload: LoginPayload
): Promise<LoginResponse> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL belum dikonfigurasi.");
  }

  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message ?? "Login gagal.");
  }

  if (!data?.access_token) {
    throw new Error("Respons login tidak berisi access token.");
  }

  return {
    token: data.access_token,
    user: {
      id: Number(data.user?.id ?? 0),
      nama: data.user?.name ?? data.user?.nama ?? "Admin",
      email: data.user?.email ?? payload.email,
      role: data.user?.role ?? "admin",
    },
  };
}
