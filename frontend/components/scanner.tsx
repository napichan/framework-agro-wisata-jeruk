import Image from "next/image";
import { IconChevronRight } from "./icons";

export function ScannerSection() {
  return (
    <section className="bg-night-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-night-800 via-grove-950 to-grove-900 p-8 sm:p-12 lg:p-14">
          {/* glow dekoratif */}
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-grove-500/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl"
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            {/* ================= MOCKUP HP ================= */}
            <div className="mx-auto w-full max-w-[280px]">
              <div className="relative rounded-[2.2rem] border-[8px] border-neutral-800 bg-neutral-900 shadow-2xl shadow-black/50">
                {/* layar */}
                <div className="relative overflow-hidden rounded-[1.7rem] bg-[#3a2f26]">
                  {/* status bar */}
                  <div className="flex items-center justify-between bg-black/25 px-5 pt-3 pb-2 text-[9px] font-semibold text-white/90">
                    <span>9:41</span>
                    <span className="tracking-wide">5G ⦿ ▮</span>
                  </div>

                  {/* app bar */}
                  <div className="flex items-center justify-between bg-black/25 px-4 py-2.5 text-white">
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold">
                      <span className="h-4 w-4 rounded-full bg-grove-400/80" />
                      AI Jeruk Vision v2.1
                    </span>
                    <span className="rounded-full bg-white/15 px-2 py-0.5 text-[8px] font-bold">
                      99% ACC
                    </span>
                  </div>

                  {/* viewfinder */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {/* foto kebun sebagai output kamera */}
                    <Image
                      src="/images/kebun-jeruk.jpg"
                      alt="Tampilan kamera aplikasi memindai pohon jeruk"
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                    {/* bounding box scan */}
                    <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2">
                      {[
                        "left-0 top-0 border-l-2 border-t-2 rounded-tl-md",
                        "right-0 top-0 border-r-2 border-t-2 rounded-tr-md",
                        "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-md",
                        "bottom-0 right-0 border-b-2 border-r-2 rounded-br-md",
                      ].map((pos) => (
                        <span
                          key={pos}
                          className={`absolute h-6 w-6 border-brand-400 ${pos}`}
                        />
                      ))}
                      {/* garis scan beranimasi */}
                      <span className="absolute left-1 right-1 top-1/2 h-0.5 animate-pulse rounded-full bg-brand-400/80" />
                    </div>
                    {/* label target */}
                    <span className="absolute left-1/2 top-[62%] -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-[8px] font-bold text-white shadow-lg shadow-brand-500/40">
                      JERUK · TERDETEKSI
                    </span>
                  </div>

                  {/* panel hasil */}
                  <div className="bg-neutral-900 px-4 pb-5 pt-4 text-white">
                    <div className="rounded-xl bg-neutral-800/80 p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-bold">
                          Jeruk Baby Java #14
                        </p>
                        <span className="rounded-full bg-grove-500/25 px-2 py-0.5 text-[8px] font-bold text-grove-300">
                          Matang Optimal
                        </span>
                      </div>
                      <div className="mt-2.5">
                        <div className="h-1.5 overflow-hidden rounded-full bg-neutral-700">
                          <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-brand-400 to-brand-500" />
                        </div>
                        <div className="mt-1.5 flex justify-between text-[8px] text-white/60">
                          <span>Kematangan &amp; kualitas</span>
                          <span className="font-bold text-grove-300">
                            12.8 Bx / 94%
                          </span>
                        </div>
                      </div>
                      <p className="mt-2.5 text-[8.5px] leading-4 text-white/50">
                        Rekomendasi: Sangat layak petik ✓
                      </p>
                    </div>
                  </div>
                </div>

                {/* notch */}
                <span className="absolute left-1/2 top-1.5 h-5 w-24 -translate-x-1/2 rounded-full bg-neutral-800" />
              </div>
            </div>

            {/* ================= TEKS ================= */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-grove-500/15 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.14em] text-grove-300 ring-1 ring-grove-400/30">
                ● INOVASI AGRO · WISATA PERKEBUNAN DI MALANG
              </span>

              <h2 className="mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl">
                Pilih Jeruk Paling Manis
                <br />
                <span className="text-brand-400">
                  Tanpa Perlu Mencicipinya Dulu
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-[13px] leading-6 text-white/60">
                Teknologi mobile scanning cerdas kami membantu mendeteksi
                kematangan jeruk secara real-time berdasarkan pigmen kulit,
                diameter buah, dan tingkat keasaman berbasis pembacaan cerdas
                via aplikasi Agro Jeruk Selorejo.
              </p>

              {/* badges */}
              <div className="mt-7 grid max-w-xl gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-grove-500/25 text-grove-300">
                    ✓
                  </span>
                  <div>
                    <p className="text-[12px] font-bold text-white">
                      Akurasi Deteksi 96%
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-white/50">
                      Berbasis uji coba di kebun mitra Selorejo.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-grove-500/25 text-grove-300">
                    ✓
                  </span>
                  <div>
                    <p className="text-[12px] font-bold text-white">
                      Rekomendasi Pohon Terbaik
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-white/50">
                      Aplikasi menyarankan blok pohon dengan tingkat kematangan
                      optimal hari ini.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                href="#katalog"
                className="mt-9 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 text-[12px] font-bold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600"
              >
                Coba Scanner Berkunjung Jeruk
                <IconChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
