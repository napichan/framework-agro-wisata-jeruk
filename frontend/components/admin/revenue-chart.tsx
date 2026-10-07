"use client";

import { useState } from "react";
import { IconChevronDown } from "@/components/icons";

type RangeKey = "7" | "14" | "30";

type RangeData = {
  label: string;
  /** Tanggal terpendek dulu, mis. "22 Sep" */
  labels: string[];
  values: number[];
};

const RANGES: Record<RangeKey, RangeData> = {
  "7": {
    label: "7 Hari Terakhir",
    labels: ["22 Sep", "23 Sep", "24 Sep", "25 Sep", "26 Sep", "27 Sep", "28 Sep"],
    values: [350_000, 470_000, 600_000, 780_000, 880_000, 1_100_000, 1_500_000],
  },
  "14": {
    label: "14 Hari Terakhir",
    labels: [
      "15 Sep", "16 Sep", "17 Sep", "18 Sep", "19 Sep", "20 Sep", "21 Sep",
      "22 Sep", "23 Sep", "24 Sep", "25 Sep", "26 Sep", "27 Sep", "28 Sep",
    ],
    values: [
      210_000, 260_000, 300_000, 280_000, 340_000, 320_000, 360_000,
      350_000, 470_000, 600_000, 780_000, 880_000, 1_100_000, 1_500_000,
    ],
  },
  "30": {
    label: "30 Hari Terakhir",
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1} Sep`),
    values: [
      90_000, 120_000, 110_000, 150_000, 140_000, 170_000, 160_000, 190_000,
      180_000, 200_000, 220_000, 210_000, 240_000, 260_000, 250_000, 280_000,
      270_000, 300_000, 290_000, 320_000, 340_000, 330_000, 360_000, 380_000,
      400_000, 430_000, 460_000, 520_000, 700_000, 1_500_000,
    ],
  },
};

/** Step sumbu-Y yang "bulat" (1 / 2 / 2.5 / 5 / 10 × 10^k). */
function niceStep(target: number): number {
  const magnitude = 10 ** Math.floor(Math.log10(target));
  const candidates = [1, 2, 2.5, 5, 10].map((m) => m * magnitude);
  return candidates.find((c) => c >= target) ?? magnitude * 10;
}

const formatId = (value: number) => value.toLocaleString("id-ID");

const CHART = {
  width: 760,
  height: 280,
  padTop: 20,
  padRight: 24,
  padBottom: 44,
  padLeft: 74,
};

export function RevenueChart() {
  const [range, setRange] = useState<RangeKey>("7");
  const data = RANGES[range];

  const { linePath, areaPath, points, gridLines, xLabels } = (() => {
    const { width, height, padTop, padRight, padBottom, padLeft } = CHART;
    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    const max = Math.max(...data.values);
    const step = niceStep(max / 4);
    const niceMax = step * 4;

    const toX = (i: number) =>
      padLeft + (data.values.length === 1 ? plotW / 2 : (i * plotW) / (data.values.length - 1));
    const toY = (v: number) => padTop + plotH - (v / niceMax) * plotH;

    const points = data.values.map((v, i) => ({ x: toX(i), y: toY(v), value: v }));
    const linePath = points
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(" ");
    const baseline = padTop + plotH;
    const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(1)} ${baseline} L${points[0].x.toFixed(1)} ${baseline} Z`;

    const gridLines = [0, 1, 2, 3, 4].map((i) => {
      const value = step * i;
      return { value, y: toY(value) };
    });

    const labelEvery = data.values.length <= 7 ? 1 : data.values.length <= 14 ? 2 : 5;
    const xLabels = data.labels
      .map((label, i) => ({ label, x: toX(i), show: i % labelEvery === 0 || i === data.labels.length - 1 }))
      .filter((l) => l.show);

    return { linePath, areaPath, points, gridLines, xLabels };
  })();

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200/70 sm:p-6">
      {/* Header kartu */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-bold text-neutral-900">
          Pendapatan {RANGES[range].label}
        </h2>

        <div className="relative">
          <select
            aria-label="Pilih rentang waktu grafik"
            value={range}
            onChange={(e) => setRange(e.target.value as RangeKey)}
            className="cursor-pointer appearance-none rounded-lg border border-neutral-200 bg-white py-2 pl-3.5 pr-9 text-xs font-semibold text-neutral-600 outline-none transition hover:border-neutral-300 focus:border-grove-500"
          >
            {(Object.keys(RANGES) as RangeKey[]).map((key) => (
              <option key={key} value={key}>
                {RANGES[key].label}
              </option>
            ))}
          </select>

          <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
        </div>
      </div>

      {/* Grafik */}
      <svg
        viewBox={`0 0 ${CHART.width} ${CHART.height}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Grafik pendapatan ${RANGES[range].label}`}
      >
        <defs>
          <linearGradient id="rev-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3D8B48" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#3D8B48" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid horizontal + label sumbu Y */}
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
              {formatId(line.value)}
            </text>
          </g>
        ))}

        {/* Area + garis */}
        <path d={areaPath} fill="url(#rev-area)" />
        <path
          d={linePath}
          fill="none"
          stroke="#2C6F36"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Titik data */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="#2C6F36" />
        ))}

        {/* Label sumbu X */}
        {xLabels.map((label) => (
          <text
            key={label.label + label.x}
            x={label.x}
            y={CHART.height - 16}
            textAnchor="middle"
            fontSize={11}
            fill="#A3A3A3"
          >
            {label.label}
          </text>
        ))}
      </svg>
    </section>
  );
}
