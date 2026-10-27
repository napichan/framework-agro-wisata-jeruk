"use client";

import { USER_STATS } from "@/hooks/useUser";
import {
  IconArrowUp,
  IconShieldCheck,
  IconTicket,
  IconUsers,
} from "@/components/ui/icons";

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

export default function UserStatCards() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {USER_STAT_CARDS.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70"
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  card.highlight
                    ? "bg-brand-100 text-brand-600"
                    : "bg-grove-100 text-grove-600"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>

              <p className="text-xs font-semibold text-neutral-500">
                {card.label}
              </p>
            </div>

            <p className="mt-4 text-2xl font-extrabold tracking-tight text-neutral-900">
              {card.value}
            </p>

            <p className="mt-2 flex items-center gap-1 text-[11px] text-neutral-400">
              {card.highlight ? (
                <IconArrowUp className="h-2.5 w-2.5 text-grove-600" />
              ) : null}
              {card.note}
            </p>
          </div>
        );
      })}
    </section>
  );
}