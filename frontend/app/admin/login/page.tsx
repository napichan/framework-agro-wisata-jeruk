"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { login, type LoginState } from "./actions";
import { LogoMark } from "@/components/icons";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-10">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/70 md:grid-cols-[45%_55%]">
        {/* ================= KIRI: Foto kebun ================= */}
        <div className="relative hidden min-h-[560px] md:block">
          <Image
            src="/images/pegang-jeruk.jpg"
            alt="Tangan memetik jeruk segar di Kebun Jeruk Selorejo"
            fill
            sizes="(min-width: 768px) 45vw, 0px"
            className="object-cover"
            priority
          />

          {/* Badge nama kebun di kiri bawah */}
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-full bg-white/85 py-2 pl-4 pr-2 backdrop-blur">
            <span className="flex items-center gap-2 text-[10px] font-semibold text-grove-700">
              <span className="h-1.5 w-1.5 rounded-full bg-grove-500" />
              Kebun Jeruk Selorejo • Portal Resmi
            </span>
            <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-bold tracking-[0.16em] text-neutral-500 shadow-sm">
              EST. 1994
            </span>
          </div>
        </div>

        {/* ================= KANAN: Form ================= */}
        <div className="flex flex-col justify-center px-7 py-12 sm:px-12">
          {/* Brand */}
          <div className="flex items-center justify-center gap-2.5">
            <LogoMark className="h-10 w-10" />
            <p className="text-lg font-bold text-neutral-900">
              Agro Petik Jeruk
            </p>
          </div>

          <div className="mt-8 text-center">
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
              Login to your account
            </h1>
            <p className="mt-2 text-xs text-neutral-400">
              Welcome back! Enter your details to login to your account
            </p>
          </div>

          {/* Pesan error dari Server Action */}
          {state.error ? (
            <p
              role="alert"
              className="mt-6 rounded-lg bg-red-50 px-3.5 py-2.5 text-center text-xs font-medium text-red-600 ring-1 ring-red-100"
            >
              {state.error}
            </p>
          ) : null}

          <form action={formAction} className="mt-6 space-y-5" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-semibold text-neutral-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                defaultValue={state.email}
                className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-[13px] text-neutral-900 placeholder:text-neutral-300 outline-none transition focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
              />
            </div>

            {/* Password + toggle show/hide */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold text-neutral-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your Password"
                  className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 pr-10 text-[13px] text-neutral-900 placeholder:text-neutral-300 outline-none transition focus:border-grove-500 focus:ring-2 focus:ring-grove-500/20"
                />
              </div>
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-[11px] text-neutral-500">
                <input
                  type="checkbox"
                  name="remember"
                  className="h-3.5 w-3.5 rounded border-neutral-300 accent-grove-600"
                />
                Remember login
              </label>
              <Link
                href="#"
                className="text-[11px] font-semibold text-grove-600 transition hover:text-grove-700"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Tombol login */}
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-lg bg-grove-700 py-3 text-[13px] font-bold text-white transition hover:bg-grove-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-[11px] text-neutral-400">
            <Link
              href="/"
              className="font-semibold text-neutral-500 transition hover:text-grove-600"
            >
              Kembali ke halaman utama
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
