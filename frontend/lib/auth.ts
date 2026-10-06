import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

/* ============================================================
 * Kredensial demo — GANTI dengan database / hash asli nantinya.
 * Password di-compare plain (demo). Produksi: bcrypt + DB.
 * ============================================================ */
const DEMO_ADMIN = {
  id: "1",
  name: "Admin Kebun",
  email: "admin@agrojeruk.id",
  password: "admin123",
};

/* ==================== Konstanta sesi ==================== */
export const SESSION_COOKIE = "agro_session";
const SESSION_TTL_MS = 2 * 60 * 60 * 1000; // 2 jam
const REMEMBER_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 hari

const encoder = new TextEncoder();
const secretKey = () =>
  encoder.encode(
    process.env.SESSION_SECRET ??
      "dev-secret-agro-wisata-jeruk-jangan-dipakai-di-produksi",
  );

/* ==================== JWT helpers ==================== */
export type SessionPayload = {
  sub: string;
  name: string;
  email: string;
  role: "admin";
  exp: number;
};

async function signSession(payload: Omit<SessionPayload, "exp">, ttlSec: number) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ttlSec}s`)
    .sign(secretKey());
}

export async function verifySessionToken(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ["HS256"],
    });
    if (
      typeof payload.sub !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.email !== "string" ||
      payload.role !== "admin"
    ) {
      return null;
    }
    return {
      sub: payload.sub,
      name: payload.name,
      email: payload.email,
      role: "admin",
      exp: typeof payload.exp === "number" ? payload.exp : 0,
    };
  } catch {
    return null;
  }
}

/* ==================== Cookie helpers ==================== */
async function setSessionCookie(token: string, ttlMs: number) {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(ttlMs / 1000),
  });
}

export async function createSession(email: string, remember: boolean) {
  const ttlMs = remember ? REMEMBER_TTL_MS : SESSION_TTL_MS;
  const token = await signSession(
    {
      sub: DEMO_ADMIN.id,
      name: DEMO_ADMIN.name,
      email,
      role: "admin",
    },
    ttlMs / 1000,
  );
  await setSessionCookie(token, ttlMs);
}

export async function destroySession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** Ambil sesi admin yang valid (tanpa redirect). */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

/* ==================== Log aktivitas (untuk dashboard) ==================== */
export type ActivityLog = {
  at: string; // ISO timestamp
  email: string;
  status: "berhasil" | "gagal";
  ip: string;
  ua: string;
};

const ACTIVITY_COOKIE = "agro_activity_log";
const ACTIVITY_MAX = 50;

/**
 * Catat aktivitas login ke cookie log (ringan, tanpa DB).
 * Catatan: cookie akan terkirim ke server pada request, jadi cocok
 * untuk demo. Untuk produksi gunakan DB / file log server-side.
 */
export async function logActivity(
  entry: Omit<ActivityLog, "at">,
): Promise<void> {
  const store = await cookies();
  const raw = store.get(ACTIVITY_COOKIE)?.value ?? "[]";
  let logs: ActivityLog[] = [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) logs = parsed as ActivityLog[];
  } catch {
    logs = [];
  }

  logs.unshift({ ...entry, at: new Date().toISOString() });
  if (logs.length > ACTIVITY_MAX) logs = logs.slice(0, ACTIVITY_MAX);

  store.set(ACTIVITY_COOKIE, JSON.stringify(logs), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30 hari
  });
}

export async function getActivityLog(): Promise<ActivityLog[]> {
  const store = await cookies();
  const raw = store.get(ACTIVITY_COOKIE)?.value ?? "[]";
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ActivityLog[]) : [];
  } catch {
    return [];
  }
}

/* ==================== Kredensial (demo) ==================== */
export function checkCredentials(email: string, password: string): boolean {
  return (
    email.toLowerCase() === DEMO_ADMIN.email && password === DEMO_ADMIN.password
  );
}
