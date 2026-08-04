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
bg-[#171717]
border
border-[#343434]
rounded-xl
p-5
h-[300px]
"
    >
      <h2
        className="
text-lg
font-semibold
mb-5
"
      >
        Earning Revenue Trend
      </h2>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={revenueData}>
          <XAxis dataKey="month" stroke="#777" fontSize={11} />

          <YAxis stroke="#777" fontSize={11} />

          <Tooltip
            contentStyle={{
              background: "#222",
              border: "1px solid #333",
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#line)"
            strokeWidth={3}
            dot={false}
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
  );
}
