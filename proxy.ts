import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Harus sama dengan TOKEN_KEY di lib/token.ts, login/actions.ts, dan layout.tsx
const TOKEN_KEY = "agro_token";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TOKEN_KEY)?.value;
  const isLoginPage = pathname === "/admin/login";

  // Belum login, mau masuk halaman admin -> ke login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Sudah login, buka halaman login lagi -> ke dashboard.
  // Jangan redirect request non-GET: POST server action (login/logout) harus
  // sampai ke handler-nya. Kalau dialihkan, Next.js menerima HTML dan
  // menampilkan "An unexpected response was received from the server".
  if (token && isLoginPage) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};