"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginRequest } from "@/lib/api";
import type { LoginResponse } from "@/types/auth.types";

export type LoginState = { error?: string; email?: string };

// Nama cookie harus sama dengan TOKEN_KEY di lib/token.ts dan layout.tsx
const TOKEN_KEY = "agro_token";

// Kalau NEXT_PUBLIC_API_URL belum diisi, pakai login dummy
const USE_DUMMY = !process.env.NEXT_PUBLIC_API_URL;

async function authenticate(
  email: string,
  password: string
): Promise<LoginResponse | null> {
  if (USE_DUMMY) {
    if (email === "admin@agrowisata.com" && password === "admin123") {
      return {
        token: "dummy-token-agro-wisata",
        user: { id: 1, nama: "Admin Utama", email, role: "admin" },
      };
    }
    return null;
  }

  try {
    return await loginRequest({ email, password });
  } catch {
    return null;
  }
}

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const remember = formData.get("remember") === "on";

  if (!email || !password) {
    return { error: "Email dan password wajib diisi", email };
  }

  const data = await authenticate(email, password);

  if (!data || data.user.role !== "admin") {
    return { error: "Email atau password salah", email };
  }

  const store = await cookies();
  store.set(TOKEN_KEY, data.token, {
    path: "/",
    sameSite: "lax",
    // dicentang "ingat saya" = 7 hari, kalau nggak = hilang saat browser ditutup
    maxAge: remember ? 60 * 60 * 24 * 7 : undefined,
  });

  redirect("/admin");
}