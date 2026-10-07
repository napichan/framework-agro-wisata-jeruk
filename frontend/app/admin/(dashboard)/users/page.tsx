import { USER_STATS } from "@/lib/admin-users";
import { UsersManager } from "@/components/admin/users-manager";
import {
  IconArrowUp,
  IconShieldCheck,
  IconTicket,
  IconUsers,
} from "@/components/icons";

export const metadata = {
  title: "Manajemen User — Dashboard Admin",
};

type UserStat = {
  label: string;
  value: string;
  note: string;
  icon: typeof IconUsers;
  highlight?: boolean;
};

const USER_STAT_CARDS: UserStat[] = [
  {
    label: "Total Pengguna",
    value: String(USER_STATS.total),
    note: "+ 12% bulan ini",
    icon: IconUsers,
    highlight: true,
  },
  {
    label: "Wisatawan Aktif",
    value: String(USER_STATS.wisatawan),
    note: "Tiket online",
    icon: IconTicket,
  },
  {
    label: "Staf Lapangan",
    value: String(USER_STATS.staf),
    note: "Blok jeruk Semen & Keprok",
    icon: IconUsers,
  },
  {
    label: "Admin Terverifikasi",
    value: String(USER_STATS.admin),
    note: "Akses penuh",
    icon: IconShieldCheck,
  },
];

export default function AdminUsersPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {/* ================= JUDUL ================= */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
          Manajemen User
        </h1>

        <p className="mt-1 max-w-xl text-sm text-neutral-400">
          Kelola data pengguna aplikasi agrowisata dan hak akses operasional
          kebun jeruk.
        </p>
      </div>

      {/* ================= KARTU STATISTIK ================= */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {USER_STAT_CARDS.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-400">
                  {stat.label}
                </p>

                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-50 text-neutral-400">
                  <Icon className="h-4 w-4" />
                </span>
              </div>

              <p className="mt-3 text-2xl font-extrabold tracking-tight text-neutral-900">
                {stat.value}
              </p>

              <p className="mt-1 flex items-center gap-1 text-[11px] text-neutral-400">
                {stat.highlight ? (
                  <span className="flex items-center gap-0.5 font-bold text-grove-600">
                    <IconArrowUp className="h-2.5 w-2.5" />
                    {stat.note}
                  </span>
                ) : (
                  stat.note
                )}
              </p>
            </div>
          );
        })}
      </section>

      {/* ================= TABEL + FILTER ================= */}
      <UsersManager />
    </div>
  );
}
