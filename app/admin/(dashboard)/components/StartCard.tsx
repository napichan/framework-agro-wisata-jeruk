import type { DashboardStat, StatIcon } from "@/types/dashboard.types";

const ICON_PATHS: Record<StatIcon, string> = {
  users:
    "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  receipt:
    "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z",
  dollar:
    "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  clock: "M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z",
  ticket:
    "M15 5v2m0 4v2m0 4v2M5 5h14a2 2 0 012 2v3a2 2 0 000 4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 000-4V7a2 2 0 012-2z",
};

export default function StartCard({ stat }: { stat: DashboardStat }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconClass}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d={ICON_PATHS[stat.icon]} />
          </svg>
        </span>

        <p className="text-xs font-semibold text-neutral-500">{stat.label}</p>
      </div>

      <p className="mt-4 text-2xl font-extrabold tracking-tight text-neutral-900">
        {stat.value}
      </p>

      {stat.hint ? (
        <p className="mt-2 text-[11px] text-neutral-400">{stat.hint}</p>
      ) : null}
    </div>
  );
}