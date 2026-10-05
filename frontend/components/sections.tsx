import { LogoMark } from "./icons";

export function TopBar() {
  return (
    <div className="bg-grove-800 px-4 py-2 text-center">
      <p className="text-[10px] font-medium tracking-wide text-emerald-100/90 sm:text-[11px]">
        🌿 Kebun Buka Hari Ini • Pukul 08.00 - 16.00 WIB • 🍊 Panen Jeruk Baby
        Java Sedang Melimpah!
      </p>
    </div>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <a href="#" className="flex items-center gap-2.5">
          <LogoMark className="h-9 w-9" />
          <div className="leading-tight">
            <p className="text-[13px] font-extrabold text-neutral-900">
              Agro Jeruk Selorejo
            </p>
            <p className="text-[7px] font-semibold tracking-[0.18em] text-neutral-400">
              WISATA PETIK &amp; EDUKASI
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-9 text-[13px] font-semibold md:flex">
          <a href="#" className="text-neutral-900">
            Beranda
          </a>
          <a
            href="#teknologi"
            className="text-neutral-500 transition-colors hover:text-grove-600"
          >
            Tentang Wisata
          </a>
          <a
            href="#katalog"
            className="text-neutral-500 transition-colors hover:text-grove-600"
          >
            Katalog Paket
          </a>
          <a
            href="#rute"
            className="text-neutral-500 transition-colors hover:text-grove-600"
          >
            Rute &amp; Aksesibilitas
          </a>
        </div>

        <a
          href="#katalog"
          className="rounded-md bg-brand-500 px-4 py-2 text-[11px] font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-600"
        >
          Download Sekarang
        </a>
      </nav>
    </header>
  );
}
