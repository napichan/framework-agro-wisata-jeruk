import type {
  PaymentStatusItem,
  RevenuePoint,
} from "@/types/dashboard.types";

/* ============ Grafik pendapatan ============ */

export default function DashboardChart({ data }: { data: RevenuePoint[] }) {
  const max = Math.max(...data.map((item) => item.nilai));

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70 sm:p-6">
      <h2 className="text-sm font-bold text-neutral-900">Grafik Pendapatan</h2>
      <p className="mt-1 text-xs text-neutral-400">6 bulan terakhir (juta rupiah)</p>

      <div className="mt-6 flex h-52 items-end gap-3">
        {data.map((item) => (
          <div key={item.bulan} className="flex h-full flex-1 flex-col gap-2">
            <div className="flex flex-1 items-end">
              <div
                className="w-full rounded-t-lg bg-grove-600 transition hover:bg-grove-700"
                style={{ height: `${(item.nilai / max) * 100}%` }}
                title={`Rp${item.nilai.toLocaleString("id-ID")}`}
              />
            </div>
            <div className="text-center">
              <p className="text-[11px] font-semibold text-neutral-700">
                {(item.nilai / 1000000).toFixed(1)}
              </p>
              <p className="text-[11px] text-neutral-400">{item.bulan}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ Donut status pembayaran ============ */

const DONUT = { size: 200, radius: 72, strokeWidth: 26 };

export function PaymentStatusDonut({
  data,
  total,
}: {
  data: PaymentStatusItem[];
  total: number;
}) {
  const circumference = 2 * Math.PI * DONUT.radius;

  const segments = data.map((item, i) => {
    const length = (item.value / total) * circumference;
    const visible = Math.max(length - 4, 0);
    const before = data.slice(0, i).reduce((sum, s) => sum + s.value, 0);

    return {
      ...item,
      dashArray: `${visible} ${circumference - visible}`,
      dashOffset: -(before / total) * circumference,
    };
  });

  return (
    <svg
      viewBox={`0 0 ${DONUT.size} ${DONUT.size}`}
      className="h-44 w-44 shrink-0 sm:h-48 sm:w-48"
      role="img"
      aria-label="Diagram status pembayaran"
    >
      <g transform={`rotate(-90 ${DONUT.size / 2} ${DONUT.size / 2})`}>
        {segments.map((segment) => (
          <circle
            key={segment.label}
            cx={DONUT.size / 2}
            cy={DONUT.size / 2}
            r={DONUT.radius}
            fill="none"
            stroke={segment.color}
            strokeWidth={DONUT.strokeWidth}
            strokeDasharray={segment.dashArray}
            strokeDashoffset={segment.dashOffset}
            strokeLinecap="round"
          />
        ))}
      </g>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="-0.15em"
        className="fill-neutral-900"
        fontSize={34}
        fontWeight={800}
      >
        {total}
      </text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="1.5em"
        className="fill-neutral-400"
        fontSize={12}
        fontWeight={600}
      >
        Total Transaksi
      </text>
    </svg>
  );
}