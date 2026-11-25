import type { LoginPayload, LoginResponse } from "@/types/auth.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** Login admin ke backend, mengembalikan token + user yang siap dipakai cookie. */
async function login(payload: LoginPayload): Promise<LoginResponse> {
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
      name: data.user?.name ?? "Admin",
      email: data.user?.email ?? payload.email,
      role: data.user?.role === "admin" ? "admin" : "user",
    },
  };
}

export const authService = { login };
