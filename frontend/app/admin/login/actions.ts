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

// Jalankan request login ke backend, termasuk memetakan pesan
// error dari backend (network gagal / API down / kredensial salah).
async function authenticate(
  email: string,
  password: string
): Promise<LoginResponse> {
  if (USE_DUMMY) {
    if (email === "admin@agrowisata.com" && password === "admin123") {
      return {
        token: "dummy-token-agro-wisata",
        user: { id: 1, nama: "Admin Utama", email, role: "admin" },
      };
    }
    throw new Error("Email atau password salah");
  }

  try {
    return await loginRequest({ email, password });
  } catch (error) {
    // fetch gagal total (backend mati / DCONN refused)
    if (error instanceof TypeError) {
      throw new Error(
        "Tidak dapat terhubung ke server. Pastikan backend berjalan."
      );
    }

    // Pesan error sudah rapi dari apiFetch / loginRequest
    throw error instanceof Error
      ? error
      : new Error("Login gagal. Coba lagi nanti.");
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

  try {
    const data = await authenticate(email, password);

    if (data.user.role !== "admin") {
      return { error: "Akun ini tidak memiliki akses admin", email };
    }

    const store = await cookies();
    store.set(TOKEN_KEY, data.token, {
      path: "/",
      sameSite: "lax",
      // dicentang "ingat saya" = 7 hari, kalau nggak = hilang saat browser ditutup
      maxAge: remember ? 60 * 60 * 24 * 7 : undefined,
    });

    redirect("/admin");
  } catch (error) {
    // redirect() melempar error khusus NEXT_REDIRECT, harus di-rethrow
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as { digest?: string }).digest === "string" &&
      (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    return {
      error:
        error instanceof Error
          ? error.message
          : "Login gagal. Coba lagi nanti.",
      email,
    };
  }
}