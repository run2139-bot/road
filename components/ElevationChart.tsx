"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ElevationChart({
  profile,
}: {
  profile: [number, number][];
}) {
  const data = profile.map(([distance, elevation]) => ({ distance, elevation }));

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="elev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#00ff87" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis
            dataKey="distance"
            unit="km"
            type="number"
            domain={[0, "dataMax"]}
            stroke="#64748b"
            fontSize={12}
          />
          <YAxis unit="m" stroke="#64748b" fontSize={12} />
          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #00f2fe55",
              borderRadius: 8,
            }}
            formatter={(v) => [`${v} m`, "고도"]}
            labelFormatter={(l) => `${l} km`}
          />
          <Area
            type="monotone"
            dataKey="elevation"
            stroke="#00f2fe"
            strokeWidth={2}
            fill="url(#elev)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
