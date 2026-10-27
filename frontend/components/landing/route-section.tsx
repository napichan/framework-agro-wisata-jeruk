import {
  IconLocation,
  IconWalk,
  MapIllustration,
} from "./icons";

const ROUTES = [
  {
    name: "Akses Desa Selorejo",
    time: "Mudah Diakses",
    detail: "Menuju Dusun Krajan, Desa Selorejo, Kecamatan Dau",
  },
  {
    name: "Dari Kota Malang",
    time: "± 30 Menit",
    detail: "Akses menuju Desa Selorejo, Kecamatan Dau, Kabupaten Malang",
  },
];

const FACILITIES = [
  "Parkir Luas Bus & Mobil",
  "Mushola & Bersih",
  "Toilet Higienis",
  "Gazebo Piknik",
  "Kantin Kesehatan Murni",
];

export function RouteSection() {
  return (
    <section id="rute" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* ============ TEKS ============ */}
          <div>
            <p className="text-[11px] font-extrabold tracking-[0.16em] text-brand-500">
              RUTE &amp; AKSESIBILITAS
            </p>

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              Akses Mudah Menuju Agrowisata Petik Jeruk Selorejo
            </h2>

            <p className="mt-4 max-w-lg text-[13px] leading-6 text-neutral-500">
              Agrowisata Petik Jeruk berada di Dusun Krajan, Desa Selorejo,
              Kecamatan Dau, Kabupaten Malang. Lokasi dapat diakses menggunakan
              kendaraan pribadi maupun kendaraan rombongan.
            </p>

            {/* rute list */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {ROUTES.map((r) => (
                <div
                  key={r.name}
                  className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4"
                >
                  <p className="text-[12px] font-bold text-neutral-900">
                    {r.name}
                  </p>

                  <p className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-extrabold text-grove-600">
                    <IconWalk className="h-3.5 w-3.5" />
                    {r.time}
                  </p>

                  <p className="mt-1.5 text-[10px] leading-4 text-neutral-400">
                    {r.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* fasilitas */}
            <p className="mt-8 text-[9px] font-extrabold tracking-[0.16em] text-neutral-400">
              FASILITAS PENDUKUNG PERJALANAN
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {FACILITIES.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-[10.5px] font-semibold text-neutral-600"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* ============ PETA ============ */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-900/10">
              <MapIllustration className="h-auto w-full" />

              {/* overlay label bawah */}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
                    <IconLocation className="h-4 w-4" />
                  </span>

                  <div>
                    <p className="text-[11px] font-extrabold text-neutral-900">
                      Agrowisata Petik Jeruk
                    </p>

                    <p className="text-[9px] text-neutral-400">
                      Dusun Krajan, Desa Selorejo, Kecamatan Dau
                    </p>
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/MTCEqBvLV6SC1pP27?g_st=ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-lg bg-brand-500 px-3.5 py-2 text-[10px] font-bold text-white transition hover:bg-brand-600"
                >
                  Petunjuk Arah
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}