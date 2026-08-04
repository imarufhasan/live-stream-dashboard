import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;

  value: string;

  label: string;
}

export default function StatCard({ icon: Icon, value, label }: Props) {
  return (
    <div
      className="
h-[118px]
rounded-xl
border
border-[#343434]
bg-[#171717]
p-5
flex
flex-col
justify-between
"
    >
      <Icon size={25} className="text-gray-300" />

      <div>
        <h3
          className="
text-[26px]
font-medium
text-white
"
        >
          {value}
        </h3>

        <p
          className="
text-sm
text-[#9a9a9a]
mt-2
"
        >
          {label}
        </p>
      </div>
    </div>
  );
}
