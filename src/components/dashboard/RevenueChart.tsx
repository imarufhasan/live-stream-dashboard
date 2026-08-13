import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { revenueData } from "../../data/dashboardData";

export default function RevenueChart() {
  return (
    <div
      className="
        w-full
        rounded-xl
        border
        border-[#343434]
        bg-[#171717]
        p-4
        sm:p-5
      "
    >
      <h2
        className="
          mb-4
          text-base
          font-semibold
          sm:mb-5
          sm:text-lg
        "
      >
        Earning Revenue Trend
      </h2>

      <div className="h-[240px] w-full sm:h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueData}
            margin={{
              top: 5,
              right: 5,
              left: -15,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="month"
              stroke="#777"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#777"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              width={40}
            />

            <Tooltip
              contentStyle={{
                background: "#222",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#line)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
            />

            <defs>
              <linearGradient id="line" x1="0" x2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
