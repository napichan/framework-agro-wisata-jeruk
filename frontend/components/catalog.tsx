"use client";

import { useState } from "react";
import { IconCheck, IconChevronRight } from "./icons";

type Package = {
  id: string;
  category: "individu" | "rombongan";
  badge?: { label: string; style: string };
  ribbon?: { label: string; style: string };
  title: string;
  desc: string;
  image: string;
  features: { label: string; highlight?: boolean }[];
  priceLabel: string;
  price: string;
  unit: string;
  priceAccent?: boolean;
  cta: string;
  ctaStyle: string;
  popular?: boolean;
};

const PACKAGES: Package[] = [
  {
    id: "mandiri",
    category: "individu",
    badge: {
      label: "Tiket Harian",
      style: "bg-black/55 text-white backdrop-blur",
    },
    title: "Petik Mandiri Reguler",
    desc: "Cocok untuk individu, pasangan, atau kunjungan santai keluarga kecil.",
    image:
      "linear-gradient(160deg, #4a7c3a 0%, #2d5a24 45%, #1d4726 100%)",
    features: [
      { label: "Tiket masuk kebun utama" },
      { label: "Makan buah sepuasnya di kebun" },
      { label: "Peminjaman keranjang & gunting petik" },
      { label: "Akses fitur AI Scanner dasar" },
    ],
    priceLabel: "Harga per Orang",
    price: "Rp 25.000",
    unit: "org",
    cta: "Pilih Tiket Mandiri",
    ctaStyle:
      "bg-night-900 text-white hover:bg-night-800",
  },
  {
    id: "edukasi",
    category: "individu",
    ribbon: {
      label: "PAKET PALING POPULER & EDUKATIF",
      style: "bg-brand-500 text-white",
    },
    badge: {
      label: "Rekomendasi Keluarga",
      style: "bg-brand-500 text-white",
    },
    title: "Edukasi Budidaya & Sekolah",
    desc: "Pilihan utama rombongan sekolah, komunitas, dan keluarga belajar.",
    image:
      "linear-gradient(160deg, #f0a24c 0%, #d96a1f 55%, #a94e12 100%)",
    features: [
      { label: "Tiket masuk & Edukasi budidaya petik" },
      { label: "Demonstrasi Panen & Praktik Alut" },
      { label: "Gratis bawa pulang 1kg Jeruk Segar", highlight: true },
      { label: "Workshop Grafting & Bonsai Jeruk" },
      { label: "Souvenir Edukasi Digital & Stiker" },
    ],
    priceLabel: "Harga per Orang",
    price: "Rp 45.000",
    unit: "org",
    priceAccent: true,
    cta: "Pesan Paket Edukasi",
    ctaStyle:
      "bg-brand-500 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-600",
    popular: true,
  },
  {
    id: "vip",
    category: "rombongan",
    badge: {
      label: "VIP Riset",
      style: "bg-night-900 text-white",
    },
    title: "Observasi & Riset / VIP Tour",
    desc: "Disediakan bagi mahasiswa, peneliti akademik, atau korporat VIP.",
    image:
      "linear-gradient(160deg, #e07b3a 0%, #b6521a 50%, #77350e 100%)",
    features: [
      { label: "Akses Kebun Riset & Lab Perbibitan Unggul" },
      { label: "Sesi Wawancara Pakar Agronomis" },
      { label: "Gazebo Piknik & Coffee Break Jeruk" },
      { label: "Data parameter tanah & cuaca kebun" },
    ],
    priceLabel: "Harga Rombongan (sd 20 orang)",
    price: "Rp 120.000",
    unit: "paket",
    cta: "Reservasi Rombongan VIP",
    ctaStyle:
      "bg-night-900 text-white hover:bg-night-800",
  },
];

const TABS = [
  { id: "semua", label: "Semua Paket" },
  { id: "individu", label: "Tiket Harian" },
  { id: "rombongan", label: "Rombongan/Riset" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function Catalog() {
  const [tab, setTab] = useState<TabId>("semua");

  const visible = PACKAGES.filter(
    (p) => tab === "semua" || p.category === tab,
  );

  return (
    <section id="katalog" className="bg-grove-50/60 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* heading + tabs */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-[11px] font-extrabold tracking-[0.16em] text-brand-500">
              TIKET RESMI PERKEBUNAN
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              Katalog Paket Wisata Petik Jeruk
            </h2>
            <p className="mt-3 text-[13px] leading-6 text-neutral-500">
              Pilih paket pengalaman memetik jeruk sesuai dengan kebutuhan
              rekreasi keluarga atau rombongan Anda.
            </p>
          </div>

          {/* tabs */}
          <div className="flex items-center gap-1 rounded-full bg-white p-1 shadow-sm ring-1 ring-neutral-100">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-full px-4 py-2 text-[11px] font-bold transition ${
                  tab === t.id
                    ? "bg-night-900 text-white"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <article
              key={p.id}
              className={
                p.popular
                  ? "relative flex flex-col overflow-hidden rounded-2xl border-2 border-brand-500 bg-white shadow-xl shadow-brand-500/10"
                  : "relative flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm"
              }
            >
              {p.ribbon && (
                <span
                  className={`absolute left-0 right-0 top-0 z-10 rounded-b-none px-4 py-1.5 text-center text-[9px] font-extrabold tracking-[0.14em] ${p.ribbon.style}`}
                >
                  {p.ribbon.label}
                </span>
              )}

              {/* gambar paket */}
              <div
                className={`relative h-40 w-full ${p.ribbon ? "pt-0" : ""}`}
                style={{ background: p.image }}
              >
                {p.ribbon && <div className="h-7" />}
                {/* pola daun */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.7) 0 2px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.5) 0 2px, transparent 2px)",
                    backgroundSize: "90px 70px, 130px 90px",
                  }}
                />
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[9px] font-bold ${p.badge?.style}`}
                >
                  {p.badge?.label}
                </span>
                {/* jeruk dekoratif */}
                <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-300 to-brand-500 text-lg shadow-lg">
                  🍊
                </span>
              </div>

              {/* body */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[15px] font-extrabold text-neutral-900">
                  {p.title}
                </h3>
                <p className="mt-2 text-[11px] leading-5 text-neutral-500">
                  {p.desc}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f.label} className="flex items-start gap-2.5">
                      <span
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          f.highlight
                            ? "bg-brand-500 text-white"
                            : "bg-grove-100 text-grove-600"
                        }`}
                      >
                        <IconCheck className="h-2.5 w-2.5" />
                      </span>
                      <span
                        className={`text-[11px] leading-4 ${
                          f.highlight
                            ? "font-bold text-neutral-900"
                            : "text-neutral-600"
                        }`}
                      >
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <div className="flex items-end justify-between border-t border-dashed border-neutral-200 pt-4">
                    <p className="text-[10px] leading-4 text-neutral-400">
                      {p.priceLabel}
                    </p>
                    <p className="text-right">
                      <span
                        className={`text-xl font-extrabold ${
                          p.priceAccent ? "text-brand-500" : "text-neutral-900"
                        }`}
                      >
                        {p.price}
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        {" "}
                        /{p.unit}
                      </span>
                    </p>
                  </div>

                  <a
                    href="#"
                    className={`mt-4 flex items-center justify-center gap-1.5 rounded-lg py-3 text-[12px] font-bold transition ${p.ctaStyle}`}
                  >
                    {p.cta}
                    <IconChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-[10px] text-neutral-400">
          *Harga dapat berubah sewaktu-waktu. Tersedia diskon khusus rombongan
          pelajar &amp; UMKM mulai Rp 10.000/orang.
        </p>
      </div>
    </section>
  );
}
