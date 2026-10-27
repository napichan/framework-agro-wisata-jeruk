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

  // Sudah login, buka halaman login lagi -> ke dashboard
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};