export type ApiUser = {
  id: string | number;
  name: string;
  email: string;
  role: string;
};

/* Akun demo: dipakai HANYA kalau API_URL belum diisi (mode tanpa backend).
   Hapus blok ini sebelum merge ke main. */
const DEMO_ADMIN = {
  id: "1",
  name: "Admin Kebun",
  email: "admin@agrojeruk.id",
  password: "admin123",
  role: "admin",
};

/** Cek email+password ke API. Return user kalau valid, null kalau tidak. */
export async function authenticate(
  email: string,
  password: string,
): Promise<ApiUser | null> {
  // ===== Mode demo (tanpa backend) =====
  if (!process.env.API_URL) {
    if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      const { password: _pw, ...user } = DEMO_ADMIN;
      return user;
    }
    return null;
  }

  // ===== Mode asli (ke Express) =====
  try {
    const res = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[auth] login ditolak API:", res.status);
      return null;
    }

    const data = await res.json();
    const u = data.user ?? data.data; // sesuaikan dengan response backend
    if (!u) return null;

    return {
      id: u.id,
      name: u.name ?? u.nama ?? "Admin",
      email: u.email,
      role: String(u.role ?? "").toLowerCase(), // "ADMIN" → "admin"
    };
  } catch (err) {
    console.error("[auth] API tidak terjangkau:", err);
    return null;
  }
}