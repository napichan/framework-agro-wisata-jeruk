import { IconScan, IconTicket, IconWallet } from "./icons";

const FEATURES = [
  {
    icon: <IconTicket className="h-5 w-5" />,
    title: "Tiket Digital & Bebas Antre",
    desc: "Beli tiket lewat aplikasi atau website. Dapatkan QR code langsung di aplikasi, scan langsung di gate kebun tanpa mengantre tiket konvensional.",
    accent: false,
  },
  {
    icon: <IconScan className="h-5 w-5" />,
    title: "AI Ripeness Scanner",
    desc: "Arahkan kamera ke jeruk untuk memindai tingkat kematangan buah secara real-time berbasis warna kulit dan ukuran.",
    accent: true,
  },
  {
    icon: <IconWallet className="h-5 w-5" />,
    title: "Pembayaran Instan",
    desc: "Terima pembayaran digital (QRIS Nasional, Gopay, OVO, ShopeePay, Transfer Bank Otomatis, hingga uang tunai di bantuan sistem kasir pos.",
    accent: false,
  },
];

export function Features() {
  return (
    <section id="teknologi" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-extrabold tracking-[0.16em] text-brand-500">
            SOLUSI KUNJUNGAN CERDAS
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Teknologi Cerdas untuk Liburan Kebun yang Nyaman
          </h2>
          <p className="mt-4 text-[13px] leading-6 text-neutral-500">
            Mulai dari reservasi tiket instan hingga pemindai AI kematangan
            buah di kebun secara langsung melalui smartphone Anda.
          </p>
        </div>

        {/* cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={
                f.accent
                  ? "relative overflow-hidden rounded-2xl bg-grove-950 p-6 text-white shadow-xl shadow-grove-950/20 md:-translate-y-3"
                  : "relative overflow-hidden rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm"
              }
            >
              {f.accent && (
                <>
                  <div
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-grove-500/25 blur-2xl"
                  />
                  <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[9px] font-bold tracking-wider text-grove-200 ring-1 ring-white/15">
                    <IconScan className="h-3 w-3" />
                    AI SCANNER
                  </span>
                </>
              )}

              <div
                className={
                  f.accent
                    ? "relative flex h-11 w-11 items-center justify-center rounded-xl bg-grove-500/20 text-grove-300"
                    : "flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-500"
                }
              >
                {f.icon}
              </div>

              <h3
                className={`mt-5 text-[15px] font-bold ${
                  f.accent ? "text-white" : "text-neutral-900"
                }`}
              >
                {f.title}
              </h3>
              <p
                className={`mt-2.5 text-[11.5px] leading-5 ${
                  f.accent ? "text-white/70" : "text-neutral-500"
                }`}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
