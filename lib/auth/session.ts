import { cookies } from "next/headers";

// Nama cookie harus sama dengan TOKEN_KEY di lib/token.ts dan login/actions.ts
const TOKEN_KEY = "agro_token";

// Logout server-side: cabut token di backend (hapus admin_sessions),
// lalu hapus cookie di sisi browser. Best-effort: kalau backend sedang
// mati, cookie tetap dihapus agar pengguna bisa keluar.
export async function destroySession(): Promise<void> {
  const store = await cookies();
  const token = store.get(TOKEN_KEY)?.value;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (token && apiUrl) {
    try {
      await fetch(`${apiUrl}/api/admin/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
    } catch {
      // Backend tidak terjangkau, tetap lanjut hapus cookie di bawah.
    }
  }

  store.delete(TOKEN_KEY);
}
