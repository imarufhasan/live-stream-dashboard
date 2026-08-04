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
        Active & Inactive User Ratio
      </h2>

      <div className="h-[190px]">
        <ResponsiveContainer>
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

      <div
        className="
flex
justify-around
text-sm
"
      >
        <div>
          <p className="text-blue-400">● 150</p>

          <span className="text-gray-500">Active User</span>
        </div>

        <div>
          <p className="text-red-500">● 10</p>

          <span className="text-gray-500">Inactive User</span>
        </div>
      </div>
    </div>
  );
}
