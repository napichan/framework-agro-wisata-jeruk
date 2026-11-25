import type { RevenuePoint } from "@/types/dashboard.types";
import type { RevenueRange } from "@/hooks/useDashboard";

const RANGE_OPTIONS: Array<{ value: RevenueRange; label: string }> = [
  { value: "7d", label: "7 hari" },
  { value: "30d", label: "30 hari" },
  { value: "6m", label: "6 bulan" },
];

const rupiah = (value: number) => `Rp${value.toLocaleString("id-ID")}`;

export default function DashboardChart({
  data,
  range,
  onRangeChange,
}: {
  data: RevenuePoint[];
  range: RevenueRange;
  onRangeChange: (range: RevenueRange) => void;
}) {
  const total = data.reduce((sum, item) => sum + item.nilai, 0);
  const max = Math.max(...data.map((item) => item.nilai), 0);
  const hasData = max > 0;
  const labelStep = data.length > 12 ? 5 : 1;

  return (
    <section className="h-full rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">Pendapatan</h2>
          <p className="mt-1 text-xs text-neutral-400">
            Pembayaran terverifikasi • {rupiah(total)}
          </p>
        </div>

        <div className="flex rounded-lg bg-neutral-100 p-1">
          {RANGE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onRangeChange(option.value)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition ${
                range === option.value
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {hasData ? (
        <div className="mt-6 flex h-44 items-end gap-[3px]">
          {data.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="flex h-full flex-1 flex-col justify-end"
              title={`${item.label}: ${rupiah(item.nilai)}`}
            >
              <div
                className="w-full rounded-t bg-grove-600 transition hover:bg-grove-700"
                style={{
                  height: `${Math.max((item.nilai / max) * 100, 2)}%`,
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 flex h-44 items-center justify-center rounded-xl bg-neutral-50 text-xs text-neutral-400">
          Belum ada pendapatan pada periode ini.
        </div>
      )}

      <div className="mt-2 flex gap-[3px]">
        {data.map((item, index) => (
          <div
            key={`${item.label}-label-${index}`}
            className="flex-1 text-center"
          >
            <span className="text-[9px] text-neutral-400">
              {index % labelStep === 0 || index === data.length - 1
                ? item.label
                : ""}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
