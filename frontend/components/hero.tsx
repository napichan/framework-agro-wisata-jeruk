import Image from "next/image";
import {
  AppleBadge,
  GooglePlayBadge,
  IconStar,
} from "./icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-brand-50">
      {/* glow oranye lembut di kanan atas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[10%] h-80 w-80 rounded-full bg-gradient-to-br from-brand-200/70 to-brand-100/0 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gradient-to-tr from-grove-100/80 to-transparent blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-2 lg:py-24">
        {/* ================= KIRI ================= */}
        <div>
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-4 py-1.5 text-[11px] font-semibold text-brand-600 shadow-sm ring-1 ring-brand-100">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
              <path d="M12 21s7-5.1 7-11a7 7 0 10-14 0c0 5.9 7 11 7 11z" />
            </svg>
            Kota Wisata Selorejo — Malang, Jawa Timur
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-neutral-900 sm:text-5xl xl:text-[56px]">
            Nikmati Serunya
            <br />
            <span className="text-brand-500">Petik Jeruk Langsung</span>
            <br />
            dari Pohonnya
          </h1>

          <p className="mt-5 max-w-lg text-[13px] leading-6 text-neutral-500">
            Nikmati pengalaman edukasi &amp; rekreasi keluarga memetik jeruk
            segar pilihan di kebun perkebunan bersama aksi, didukung teknologi
            reservasi digital bebas antre.
          </p>

          {/* Store buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-2.5 rounded-lg bg-neutral-900 px-4 py-2.5 text-white transition hover:bg-neutral-800"
            >
              <GooglePlayBadge className="h-6 w-6" />
              <span className="text-left leading-tight">
                <span className="block text-[8px] tracking-wide text-white/70">
                  TERSEDIA DI
                </span>
                <span className="block text-[13px] font-semibold">
                  Google Play
                </span>
              </span>
            </a>

            <a
              href="#"
              className="flex items-center gap-2.5 rounded-lg bg-neutral-900 px-4 py-2.5 text-white transition hover:bg-neutral-800"
            >
              <AppleBadge className="h-6 w-6" />
              <span className="text-left leading-tight">
                <span className="block text-[8px] tracking-wide text-white/70">
                  DOWNLOAD ON THE
                </span>
                <span className="block text-[13px] font-semibold">App Store</span>
              </span>
            </a>
          </div>

          {/* Rating */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["bg-brand-200", "bg-grove-200", "bg-amber-200", "bg-sky-200"].map(
                (c, i) => (
                  <span
                    key={c}
                    className={`h-7 w-7 rounded-full ${c} ring-2 ring-white`}
                    style={{ zIndex: 4 - i }}
                  />
                ),
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <IconStar key={i} className="h-3 w-3" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-neutral-900">
                  4.9/5.0
                </span>
              </div>
              <p className="text-[10px] text-neutral-400">
                1.240+ pengunjung keluarga puas
              </p>
            </div>
          </div>
        </div>

        {/* ================= KANAN ================= */}
        <div className="relative">
          {/* kartu unggulan di belakang */}
          <div
            aria-hidden="true"
            className="absolute -left-4 top-10 hidden w-56 rounded-2xl border border-neutral-100 bg-white p-3.5 shadow-lg shadow-neutral-900/5 lg:block"
          >
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-grove-50 text-grove-600">
                🍃
              </span>
              <div>
                <p className="text-[10px] font-bold text-neutral-900">
                  100% Alami
                </p>
                <p className="text-[9px] leading-4 text-neutral-400">
                  Tanpa pestisida berlebih, panen langsung dari pohon.
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-xl shadow-neutral-900/10">
            <div className="relative h-[320px] w-full sm:h-[360px]">
              <Image
                src="/images/pegang-jeruk.jpg"
                alt="Petani memegang hasil panen jeruk di Kebun Jeruk Selorejo"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
              {/* gradasi agar chip kamera terbaca */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/35 to-transparent"
              />
            </div>
            {/* chip kamera */}
            <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-grove-300" />
              Kebun Petik Reguler AF
            </span>

            {/* footer kartu */}
            <div className="border-t border-neutral-100 bg-white px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold tracking-[0.14em] text-brand-500">
                    VARIETAS UNGGULAN
                  </p>
                  <p className="text-[13px] font-bold text-neutral-900">
                    Jeruk Baby Java &amp; Keprok 55
                  </p>
                </div>
                <span className="rounded-full bg-grove-50 px-3 py-1.5 text-[10px] font-bold text-grove-600">
                  Manis 94%
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 divide-x divide-neutral-100">
                <div className="pr-2">
                  <p className="text-base font-extrabold text-neutral-900">
                    5.000+
                  </p>
                  <p className="text-[9px] text-neutral-400">Pohon aktif</p>
                </div>
                <div className="px-2 text-center">
                  <p className="text-base font-extrabold text-grove-600">
                    3 Varietas
                  </p>
                  <p className="text-[9px] text-neutral-400">Induk Panen</p>
                </div>
                <div className="pl-2 text-right">
                  <p className="text-base font-extrabold text-neutral-900">
                    100%
                  </p>
                  <p className="text-[9px] text-neutral-400">Alami &amp; Manis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
