"use client";

import { useState } from "react";
import { CHART_SERIES, type ChartMode, rupiah } from "@/lib/admin-reports";

const MODES: Array<{ key: ChartMode; label: string }> = [
  { key: "harian", label: "Harian" },
  { key: "mingguan", label: "Mingguan" },
  { key: "bulanan", label: "Bulanan" },
];

/** Step sumbu-Y yang "bulat". */
function niceStep(target: number): number {
  const magnitude = 10 ** Math.floor(Math.log10(target));
  const candidates = [1, 2, 2.5, 5, 10].map((m) => m * magnitude);
  return candidates.find((c) => c >= target) ?? magnitude * 10;
}

/** 14.850.000 -> "14,85 jt" */
function formatMillion(value: number): string {
  if (value === 0) return "0";
  const millions = value / 1_000_000;
  const text = Number.isInteger(millions)
    ? String(millions)
    : millions.toFixed(2).replace(".", ",").replace(/,?0+$/, "");
  return `${text} jt`;
}

const CHART = {
  width: 760,
  height: 280,
  padTop: 24,
  padRight: 24,
  padBottom: 48,
  padLeft: 64,
};

export function ReportChart() {
  const [mode, setMode] = useState<ChartMode>("bulanan");
  const series = CHART_SERIES[mode];

  const { gridLines, bars, points, linePath, xLabels, max } = (() => {
    const { width, height, padTop, padRight, padBottom, padLeft } = CHART;
    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    const max = Math.max(...series.values);
    const step = niceStep(max / 3);
    const niceMax = step * 3;

    const slot = plotW / series.values.length;
    const barWidth = Math.min(slot * 0.5, 64);
    const baseline = padTop + plotH;
    const toY = (v: number) => baseline - (v / niceMax) * plotH;

    const gridLines = [0, 1, 2, 3].map((i) => {
      const value = step * i;
      return { value, y: toY(value) };
    });

    const bars = series.values.map((value, i) => ({
      x: padLeft + slot * i + (slot - barWidth) / 2,
      y: toY(value),
      width: barWidth,
      height: baseline - toY(value),
      active: i === series.activeIndex,
    }));

    const points = series.values.map((value, i) => ({
      x: padLeft + slot * i + slot / 2,
      y: toY(value),
      active: i === series.activeIndex,
    }));

    const linePath = points
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(" ");

    const xLabels = series.labels.map((label, i) => ({
      label,
      x: padLeft + slot * i + slot / 2,
      active: i === series.activeIndex,
    }));

    return { gridLines, bars, points, linePath, xLabels, max };
  })();

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70 sm:p-6">
      {/* Header kartu */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-neutral-900">
            Grafik Pendapatan
          </h2>
          <p className="mt-0.5 text-xs text-neutral-400">
            Tren pemasukan tiket masuk &amp; paket wisata per periode
          </p>
        </div>

        {/* Tab periode */}
        <div className="flex items-center gap-1 rounded-lg bg-neutral-50 p-1">
          {MODES.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setMode(item.key)}
              aria-pressed={mode === item.key}
              className={`rounded-md px-3 py-1.5 text-[11px] font-bold transition ${
                mode === item.key
                  ? "bg-white text-grove-700 shadow-sm ring-1 ring-neutral-200"
                  : "text-neutral-400 hover:text-neutral-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grafik */}
      <svg
        viewBox={`0 0 ${CHART.width} ${CHART.height}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Grafik pendapatan periode ${mode}. Tertinggi ${rupiah(max)}`}
      >
        {/* Grid + label sumbu Y */}
        {gridLines.map((line) => (
          <g key={line.value}>
            <line
              x1={CHART.padLeft}
              y1={line.y}
              x2={CHART.width - CHART.padRight}
              y2={line.y}
              stroke="#F0F0F0"
              strokeWidth={1}
            />
            <text
              x={CHART.padLeft - 12}
              y={line.y + 4}
              textAnchor="end"
              fontSize={11}
              fill="#A3A3A3"
            >
              {formatMillion(line.value)}
            </text>
          </g>
        ))}

        {/* Batang */}
        {bars.map((bar, i) => (
          <rect
            key={i}
            x={bar.x}
            y={bar.y}
            width={bar.width}
            height={bar.height}
            rx={8}
            fill={bar.active ? "#8C3B1B" : "#FFE0CE"}
          />
        ))}

        {/* Garis tren */}
        <path
          d={linePath}
          fill="none"
          stroke="#2C6F36"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Titik data */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={4}
            fill={point.active ? "#8C3B1B" : "#FFFFFF"}
            stroke="#2C6F36"
            strokeWidth={2}
          />
        ))}

        {/* Label sumbu X */}
        {xLabels.map((label) => (
          <text
            key={label.label}
            x={label.x}
            y={CHART.height - 18}
            textAnchor="middle"
            fontSize={11}
            fontWeight={label.active ? 700 : 500}
            fill={label.active ? "#8C3B1B" : "#A3A3A3"}
          >
            {label.label}
          </text>
        ))}
      </svg>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-[11px] font-semibold text-neutral-500">
          <span className="h-3 w-3 rounded-sm bg-[#FFE0CE] ring-1 ring-brand-200" />
          Pendapatan Aktif
        </span>

        <span className="text-[11px] text-neutral-400">
          Puncak: Kamis, Jumat / Weekend (Sabtu–Minggu)
        </span>
      </div>
    </section>
  );
}
