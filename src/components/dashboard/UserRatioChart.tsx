import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Active User",
    value: 150,
    color: "#22a3ff",
  },
  {
    name: "Inactive User",
    value: 10,
    color: "#e11d48",
  },
  {
    name: "Other",
    value: 40,
    color: "#d4d4d4",
  },
];

export default function UserRatioChart() {
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
          mb-3
          text-base
          font-semibold
          sm:mb-5
          sm:text-lg
        "
      >
        Active & Inactive User Ratio
      </h2>

      <div className="h-[190px] w-full sm:h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={55}
              outerRadius={75}
              dataKey="value"
              paddingAngle={2}
            >
              {data.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div
        className="
          flex
          flex-wrap
          justify-center
          gap-6
          text-sm
          sm:justify-around
        "
      >
        <div className="text-center">
          <p className="text-blue-400">● 150</p>

          <span className="text-gray-500">Active User</span>
        </div>

        <div className="text-center">
          <p className="text-red-500">● 10</p>

          <span className="text-gray-500">Inactive User</span>
        </div>
      </div>
    </div>
  );
}
