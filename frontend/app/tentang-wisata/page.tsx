import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  IconAccessibility,
  IconCalendar,
  IconCheck,
  IconClock,
  IconCup,
  IconFacebook,
  IconFruit,
  IconGraduationCap,
  IconInstagram,
  IconLeaf,
  IconLocation,
  IconMountain,
  IconTree,
  IconUsers,
  IconWhatsApp,
  IconYoutube,
  LogoMark,
} from "@/components/icons";
import { Navbar, TopBar } from "@/components/sections";

export const metadata: Metadata = {
  title: "Tentang Wisata — Agro Jeruk Selorejo",
  description:
    "Profil Agrowisata Petik Jeruk Selorejo: dedikasi, visi & misi, varietas jeruk unggulan, komitmen pengunjung, dan tim kebun di Dau, Malang.",
};

/* ============ DATA ============ */

const STATS = [
  {
    icon: <IconMountain className="h-5 w-5" />,
    value: "15+",
    label: "Hektar Lahan Aktif",
  },
  {
    icon: <IconTree className="h-5 w-5" />,
    value: "35.000+",
    label: "Pohon Jeruk Produktif",
  },
  {
    icon: <IconFruit className="h-5 w-5" />,
    value: "8",
    label: "Varietas Unggulan",
  },
  {
    icon: <IconUsers className="h-5 w-5" />,
    value: "50.000+",
    label: "Pengunjung per Tahun",
  },
];

const MISSIONS = [
  "Mengembangkan varietas jeruk unggul manis tanpa pestisida kimia untuk kesehatan konsumen dan keberlanjutan lahan pertanian.",
  "Memberikan edukasi budidaya dan pengalaman panen langsung secara interaktif bagi anak-anak, pelajar, serta keluarga.",
  "Menerapkan sistem reservasi digital yang nyaman, transparan, dan teratur demi daya dukung lingkungan perkebunan.",
];

const VARIETIES = [
  {
    image: "/images/edukasi-jeruk.jpg",
    alt: "Pohon jeruk baby java di kebun Selorejo",
    name: "Jeruk Baby Java",
    desc: "Tekstur lembut dengan bulir air melimpah. Rasa manisnya segar dengan sentuhan asam yang sangat tipis. Kulit tipis dan mudah dikupas, cocok untuk jus dan camilan keluarga.",
    season: "Sepanjang Tahun",
  },
  {
    image: "/images/petik-jeruk.jpg",
    alt: "Tangan memetik jeruk keprok dari pohon",
    name: "Jeruk Keprok 55 Selorejo",
    desc: "Varietas unggulan dengan kualitas tinggi. Saat sudah matang, daging buahnya tebal dan padat, berwarna cerah, dan rasanya manis legit dengan aroma khas yang harum.",
    season: "Juli – Oktober",
  },
  {
    image: "/images/kebun-jeruk.jpg",
    alt: "Petani memanen jeruk sunkist di kebun",
    name: "Jeruk Sunkist Madu",
    desc: "Menyajikan rasa asam manis yang seimbang dengan sensasi kesegaran alami. Buah besar, berair, dan cocok untuk stok persediaan di rumah. Sangat menyegarkan saat dinikmati dingin.",
    season: "Juli – November",
  },
];

const COMMITMENTS = [
  {
    icon: <IconLeaf className="h-5 w-5" />,
    title: "Ramah Lingkungan & Alami",
    desc: "Menerapkan pupuk organik, kompos, dan meminimalkan zat kimia sintetis agar tanah tetap subur serta buah higienis langsung siap petik.",
  },
  {
    icon: <IconGraduationCap className="h-5 w-5" />,
    title: "Edukasi Berkelanjutan",
    desc: "Dipandu langsung petani dan agronomis lokal, bermanfaat bagi pelajar, mahasiswa, serta komunitas peduli lingkungan.",
  },
  {
    icon: <IconCup className="h-5 w-5" />,
    title: "Kenyamanan Pengunjung",
    desc: "Tersedia gazebo istirahat, musala, jalur berjalan yang aman, toilet higienis, dan fasilitas pendukung selama berkunjung.",
  },
  {
    icon: <IconAccessibility className="h-5 w-5" />,
    title: "Aksesibel & Terjangkau",
    desc: "Sistem tiket terstandar tanpa antre, integrasi reservasi daring, pembayaran QRIS, dan infrastruktur digital transparan.",
  },
];

const TEAM = [
  {
    photo: "/images/mariadi.jpg",
    name: "Pak Mariadi",
    role: "Ketua Kelompok Tani Jeruk Selorejo",
    detail: "Pengalaman 20+ Tahun",
    bio: "Pelopor budidaya petik jeruk lokal Selorejo. Mengawasi rotasi pemupukan dan menjaga standar rasa buah pada setiap blok panen.",
  },
  {
    photo: null,
    name: "Rizky Hidayat, S.P.",
    role: "Agronomis & Koordinator Budidaya",
    detail: "Riset & Kualitas Tanah",
    bio: "Bertanggung jawab terhadap pemantauan hama alami, optimasi nutrisi organik, dan penjadwalan panen berkala agar jeruk siap dipanen setiap musim.",
  },
  {
    photo: null,
    name: "Navel",
    role: "Pemandu Edukasi & Layanan Pengunjung",
    detail: "Edukasi Anak & Keluarga",
    bio: "Memandu keluarga dan rombongan sekolah menjelajahi kebun, menjelaskan proses tani, serta mengajarkan cara memetik jeruk yang baik dan benar.",
  },
];

/* ============ PAGE ============ */

export default function TentangWisataPage() {
  return (
    <main className="min-h-screen bg-white">
      <TopBar />
      <Navbar active="tentang" />

      {/* ============ BREADCRUMB + PROFIL ============ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-8">
          {/* breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] font-semibold text-neutral-400">
            <IconLocation className="h-3.5 w-3.5" />
            <Link href="/" className="transition-colors hover:text-brand-500">
              Beranda
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-900">Tentang Wisata</span>
          </nav>

          <div className="mt-10 max-w-2xl">
            <p className="text-[11px] font-extrabold tracking-[0.16em] text-neutral-400">
              PROFIL &amp; SEJARAH AGROWISATA
            </p>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
              Mengenal Destinasi Agro Jeruk Selorejo
            </h1>
            <p className="mt-4 text-[13px] leading-6 text-neutral-500">
              Perkebunan agrowisata &amp; edukasi di lereng perbukitan
              Selorejo, Dau, Malang yang memadukan keindahan alam, tradisi tani
              lokal, dan kenyamanan wisata keluarga.
            </p>
          </div>

          {/* dedikasi + foto */}
          <div className="mt-14 grid items-start gap-12 lg:grid-cols-2">
            {/* foto kiri */}
            <div className="relative">
              <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[340px]">
                <Image
                  src="/images/pegang-jeruk.jpg"
                  alt="Petani memegang jeruk matang di kebun Selorejo"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              {/* pin lokasi */}
              <span className="absolute bottom-6 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-white text-brand-500 shadow-lg">
                <IconLocation className="h-4 w-4" />
              </span>
              {/* aksen kartu di bawah foto */}
              <div className="absolute -bottom-4 left-1/2 h-8 w-[85%] -translate-x-1/2 rounded-xl border border-neutral-100 bg-white shadow-sm" />
            </div>

            {/* teks kanan */}
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.16em] text-neutral-400">
                DEDIKASI AGROWISATA
              </p>
              <h2 className="mt-2 text-[15px] font-extrabold text-neutral-900">
                Harmoni Alam, Penguatan Kualitas, dan Tradisi Petani Jeruk
              </h2>
              <p className="mt-3 text-[12px] leading-6 text-neutral-500">
                Berawal dari perkebunan jeruk keluarga yang dikelola dengan
                teknik pertanian ramah lingkungan, kami berkomitmen menjaga
                kualitas panen di setiap musim. Perpaduan perawatan alami dan
                pemilihan bibit unggul menjadikan setiap buah mencapai rasa
                terbaiknya saat tiba di tangan pengunjung.
              </p>

              {/* VISI */}
              <p className="mt-8 text-[10px] font-extrabold tracking-[0.16em] text-neutral-400">
                VISI KAMI
              </p>
              <blockquote className="mt-2 border-l-2 border-brand-500 pl-4 text-[12.5px] italic leading-6 text-neutral-600">
                &quot;Menghadirkan pengalaman berwisata alam yang edukatif,
                sehat, dan berkesan langsung dari kebun jeruk lokal.&quot;
              </blockquote>

              {/* MISI */}
              <p className="mt-8 text-[10px] font-extrabold tracking-[0.16em] text-neutral-400">
                MISI PERKEBUNAN
              </p>
              <ul className="mt-3 space-y-3.5">
                {MISSIONS.map((m) => (
                  <li key={m} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-grove-100 text-grove-600">
                      <IconCheck className="h-2.5 w-2.5" />
                    </span>
                    <span className="text-[12px] leading-5 text-neutral-600">
                      {m}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STAT BAR ============ */}
      <section className="border-y border-neutral-100 bg-neutral-50/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-start gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-neutral-700 ring-1 ring-neutral-200">
                {s.icon}
              </span>
              <p className="text-xl font-extrabold text-neutral-900">
                {s.value}
              </p>
              <p className="text-[11px] font-semibold text-neutral-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ VARIETAS ============ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-extrabold tracking-[0.16em] text-neutral-900">
              KEKAYAAN VARIETAS UNGGULAN
            </p>
            <h2 className="mt-2 text-[15px] font-extrabold text-neutral-500">
              Varietas Jeruk yang Dibudidayakan
            </h2>
            <p className="mt-4 text-[12.5px] leading-6 text-neutral-500">
              Setiap pohon dirawat berdasarkan periode pemangkasan dan umur
              panen untuk menghasilkan rasa manis alami dengan tingkat
              kematangan dan keasaman optimal.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {VARIETIES.map((v) => (
              <article key={v.name} className="flex flex-col">
                <div className="relative h-44 overflow-hidden rounded-xl">
                  <Image
                    src={v.image}
                    alt={v.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 text-[14px] font-extrabold text-neutral-900">
                  {v.name}
                </h3>
                <p className="mb-4 mt-2 text-[11.5px] leading-5 text-neutral-500">
                  {v.desc}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-3 text-[11px]">
                  <span className="text-neutral-400">Musim Panen:</span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-grove-600">
                    <IconCalendar className="h-3.5 w-3.5" />
                    {v.season}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ KOMITMEN ============ */}
      <section className="border-y border-neutral-100 bg-neutral-50/60 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-[11px] font-extrabold tracking-[0.16em] text-neutral-900">
            KOMITMEN PENGUNJUNG
          </p>
          <p className="mt-1 text-[13px] font-semibold text-neutral-500">
            Nilai &amp; Standar Wisata Kebun
          </p>
          <p className="mt-2 max-w-xl text-[12px] leading-6 text-neutral-500">
            Kami memadukan prinsip kelestarian lingkungan, pemberdayaan petani
            lokal, dan kenyamanan wisata terbaik bagi setiap keluarga.
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {COMMITMENTS.map((c) => (
              <div key={c.title}>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-neutral-700 ring-1 ring-neutral-200">
                  {c.icon}
                </span>
                <h3 className="mt-4 text-[13px] font-extrabold text-neutral-900">
                  {c.title}
                </h3>
                <p className="mt-2 text-[11.5px] leading-5 text-neutral-500">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TIM KEBUN ============ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-[11px] font-extrabold tracking-[0.16em] text-neutral-900">
                TOKOH DI BALIK KEBUN
              </p>
              <p className="mt-1 text-[13px] font-semibold text-neutral-500">
                Dikelola Bersama Petani Lokal
              </p>
              <p className="mt-3 text-[12px] leading-6 text-neutral-500">
                Kolaborasi harmonis kelompok tani Selorejo dengan agronomis
                muda untuk menjaga kualitas buah prima dan keberlanjutan wisata
                terbaik.
              </p>
            </div>
            <p className="inline-flex items-center gap-2 text-[12px] font-bold text-neutral-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-grove-50 text-grove-600">
                <IconUsers className="h-4 w-4" />
              </span>
              100% Tenaga Tani Dari Selorejo
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {TEAM.map((t) => (
              <article
                key={t.name}
                className="flex flex-col items-center rounded-2xl border border-neutral-100 bg-white p-7 text-center shadow-sm"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-grove-50">
                  {t.photo ? (
                    <Image
                      src={t.photo}
                      alt={`Foto ${t.name}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-grove-100 to-grove-200 text-xl font-extrabold text-grove-700">
                      {t.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-[14px] font-extrabold text-neutral-900">
                  {t.name}
                </h3>
                <p className="text-[11.5px] font-semibold text-neutral-600">
                  {t.role}
                </p>
                <p className="mt-0.5 text-[10px] font-bold text-brand-500">
                  {t.detail}
                </p>
                <p className="mt-3 text-[11.5px] leading-5 text-neutral-500">
                  {t.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA KARTU ============ */}
      <section className="bg-neutral-50/60 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm sm:p-10">
            <p className="inline-flex items-center gap-2 text-[11px] font-bold text-neutral-500">
              <IconClock className="h-3.5 w-3.5 text-grove-600" />
              Reservasi Kunjungan Mudah &amp; Cepat
            </p>
            <h2 className="mt-3 text-xl font-extrabold tracking-tight text-neutral-900 sm:text-2xl">
              Ingin Berkunjung dan Memetik Langsung di Suasana Kebun?
            </h2>
            <p className="mt-3 max-w-2xl text-[12.5px] leading-6 text-neutral-500">
              Pesan tiket petik jeruk sekarang dan rasakan pengalaman terbaik
              kami untuk wisata rombongan sekolah, instansi penelitian, dan
              gathering keluarga.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/#katalog"
                className="rounded-lg bg-brand-500 px-6 py-3 text-[12px] font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
              >
                Lihat Paket Wisata
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-6 py-3 text-[12px] font-bold text-neutral-900 transition hover:bg-neutral-50"
              >
                <IconWhatsApp className="h-4 w-4 text-grove-600" />
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER HALAMAN ============ */}
      <footer className="border-t border-neutral-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr]">
            {/* brand */}
            <div>
              <div className="flex items-center gap-2.5">
                <LogoMark className="h-9 w-9" />
                <div className="leading-tight">
                  <p className="text-[13px] font-extrabold text-neutral-900">
                    Agro Jeruk
                  </p>
                  <p className="text-[7px] font-semibold tracking-[0.18em] text-neutral-400">
                    SELOREJO
                  </p>
                </div>
              </div>
              <p className="mt-4 max-w-xs text-[11px] leading-5 text-neutral-500">
                Destinasi wisata buah terkemuka yang menghadirkan pengalaman
                petik jeruk edukatif, segar, dan menyenangkan untuk semua
                umur.
              </p>
              <p className="mt-3 text-[10px] leading-5 text-neutral-400">
                <span className="font-bold text-neutral-500">
                  Jam Operasional:
                </span>
                <br />
                Senin–Minggu, 08.00 – 16.00 WIB
              </p>
            </div>

            {/* navigasi */}
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.16em] text-neutral-900">
                NAVIGASI
              </p>
              <ul className="mt-4 space-y-2.5 text-[11.5px] text-neutral-500">
                <li>
                  <Link href="/" className="transition hover:text-grove-600">
                    Beranda
                  </Link>
                </li>
                <li>
                  <span className="font-semibold text-neutral-900">
                    Tentang Kebun
                  </span>
                </li>
                <li>
                  <Link
                    href="/#katalog"
                    className="transition hover:text-grove-600"
                  >
                    Paket Wisata
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#rute"
                    className="transition hover:text-grove-600"
                  >
                    Fasilitas Wisata
                  </Link>
                </li>
                <li>
                  <a href="#" className="transition hover:text-grove-600">
                    Bantuan Pengunjung
                  </a>
                </li>
              </ul>
            </div>

            {/* layanan */}
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.16em] text-neutral-900">
                LAYANAN
              </p>
              <ul className="mt-4 space-y-2.5 text-[11.5px] text-neutral-500">
                {[
                  "Reservasi Rombongan",
                  "Paket Outbound",
                  "Syarat & Ketentuan",
                  "Kebijakan Privasi",
                  "Panduan Memetik",
                ].map((l) => (
                  <li key={l}>
                    <a href="#" className="transition hover:text-grove-600">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* kontak */}
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.16em] text-neutral-900">
                KONTAK &amp; LOKASI
              </p>
              <ul className="mt-4 space-y-3 text-[11.5px] leading-5 text-neutral-500">
                <li className="flex items-start gap-2.5">
                  <IconLocation className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                  Jl. Raya Perkebunan Asri No. 88, Lereng Perbukitan Malang,
                  Jawa Timur
                </li>
                <li>
                  <span className="font-semibold text-neutral-700">
                    WhatsApp:
                  </span>{" "}
                  +62 812-3456-7890
                </li>
                <li>
                  <span className="font-semibold text-neutral-700">Email:</span>{" "}
                  halo@agrojerukselorejo.id
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="border-t border-neutral-100">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-[10px] text-neutral-400">
            <p>© 2026 Agro Jeruk Selorejo. Seluruh hak cipta dilindungi.</p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="transition hover:text-brand-500"
              >
                <IconInstagram className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="transition hover:text-brand-500"
              >
                <IconFacebook className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="transition hover:text-brand-500"
              >
                <IconYoutube className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
