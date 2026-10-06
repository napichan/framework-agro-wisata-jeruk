"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  checkCredentials,
  createSession,
  logActivity,
} from "@/lib/auth";

export type LoginState = {
  error?: string;
  email?: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const remember = formData.get("remember") === "on";

  /* ---------- Validasi sisi server ---------- */
  if (!email || !password) {
    return { error: "Email dan password wajib diisi.", email };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Format email tidak valid.", email };
  }

  const ok = checkCredentials(email, password);

  /* ---------- Catat aktivitas login ---------- */
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";
  const ua = h.get("user-agent") ?? "unknown";

  if (!ok) {
    await logActivity({ email, status: "gagal", ip, ua });
    // Pesan sengaja generik agar tidak membocorkan kredensial.
    return { error: "Email atau password salah.", email };
  }

  await logActivity({ email, status: "berhasil", ip, ua });
  await createSession(email, remember);

  redirect("/admin");
}
