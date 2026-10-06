import Link from "next/link";
import {
  IconInstagram,
  IconLocation,
  IconMail,
  IconPhone,
  IconTiktok,
  IconWhatsApp,
  IconYoutube,
  LogoMark,
} from "./icons";

export function ReservationCta() {
  return (
    <section className="bg-grove-50/60 pb-20 pt-4">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-night-800 via-night-900 to-grove-950 p-8 sm:p-12">
          {/* glow */}
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-grove-500/15 blur-3xl"
          />

          <div className="relative flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-lg">
              <p className="text-[10px] font-extrabold tracking-[0.18em] text-brand-400">
                RESERVASI ANDALAN DEPARTEMEN
              </p>
              <h2 className="mt-3 text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-[32px]">
                Mulai Pengalaman Petik Jeruk Digital Anda Sekarang
              </h2>
              <p className="mt-3 text-[12px] leading-5 text-white/60">
                Kunjungan dapat ketik saat QR Digital mudah, reservasi cepat,
                jaminan jeruk segar, dan diskon promo rombongan hingga 15%.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#katalog"
                className="rounded-lg bg-brand-500 px-6 py-3 text-[12px] font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
              >
                Pesan Tiket Online
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-[12px] font-bold text-white ring-1 ring-white/20 transition hover:bg-white/15"
              >
                <IconWhatsApp className="h-4 w-4" />
                Konsultasi WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const NAV_WISATA: { label: string; href: string }[] = [
  { label: "Beranda Utama", href: "/" },
  { label: "Profil Kebun Selorejo", href: "/tentang-wisata" },
  { label: "Fitur AI Scanner Budidaya", href: "/#teknologi" },
  { label: "Paket Tiket & Harga", href: "/#katalog" },
];

const PROGRAM = [
  "Paket Relawan Hutan",
  "Study Tour Sekolah",
  "Kunjungan Riset Kampus",
  "Pendampingan Blok Kemitraan",
  "Mitrun Petani Lokal",
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-9 w-9" />
              <div className="leading-tight">
                <p className="text-[13px] font-extrabold text-neutral-900">
                  Agro Jeruk Selorejo
                </p>
                <p className="text-[7px] font-semibold tracking-[0.18em] text-neutral-400">
                  WISATA PETIK &amp; EDUKASI
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[11px] leading-5 text-neutral-500">
              Destinasi wisata petik jeruk dan edukasi perkebunan terpadu di
              lereng perkebunan Dau, Malang. Memanjakan pengalaman petik jeruk
              interaktif yang sehat dengan integrasi teknologi agritani.
            </p>
            <div className="mt-5 flex gap-2.5">
              {[
                { icon: <IconInstagram className="h-3.5 w-3.5" />, label: "Instagram" },
                { icon: <IconYoutube className="h-3.5 w-3.5" />, label: "YouTube" },
                { icon: <IconTiktok className="h-3.5 w-3.5" />, label: "TikTok" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500 transition hover:bg-brand-50 hover:text-brand-500"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* navigasi wisata */}
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.16em] text-neutral-900">
              NAVIGASI WISATA
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_WISATA.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[11.5px] text-neutral-500 transition hover:text-grove-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* program wisata */}
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.16em] text-neutral-900">
              PROGRAM WISATA
            </p>
            <ul className="mt-4 space-y-2.5">
              {PROGRAM.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[11.5px] text-neutral-500 transition hover:text-grove-600"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* kontak */}
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.16em] text-neutral-900">
              KONTAK HOTLINE
            </p>
            <ul className="mt-4 space-y-3.5 text-[11.5px] text-neutral-500">
              <li className="flex items-start gap-2.5">
                <IconLocation className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                Jl. Raya Selorejo No. 43, Dau, Kab. Malang, Jawa Timur
              </li>
              <li className="flex items-center gap-2.5">
                <IconPhone className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                0821-3456-7890
              </li>
              <li className="flex items-center gap-2.5">
                <IconMail className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                halo@agrojerukselorejo.id
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-neutral-100">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-[10px] text-neutral-400">
          <p>
            © 2026 Agro Jeruk Selorejo Dau Malang. Seluruhnya dikelola penuh
            dibangun berkelanjutan.
          </p>
          <div className="flex gap-5">
            <a href="#" className="transition hover:text-neutral-600">
              Syarat &amp; Ketentuan
            </a>
            <a href="#" className="transition hover:text-neutral-600">
              Kebijakan Privasi
            </a>
            <a href="#" className="transition hover:text-neutral-600">
              Akses Petani
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
