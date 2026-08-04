import {
  LayoutDashboard,
  Users,
  Store,
  Wallet,
  Settings,
  ShieldCheck,
  Ticket,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "User Management",
    icon: Users,
    path: "/dashboard/users",
  },
  {
    name: "Seller Approvals",
    icon: Store,
    path: "/dashboard/sellers",
  },
  {
    name: "Transaction and Payout",
    icon: Wallet,
    path: "/dashboard/transactions",
  },
  {
    name: "Raffle Management",
    icon: Ticket,
    path: "/dashboard/raffle",
  },
  {
    name: "Add Category",
    icon: ShieldCheck,
    path: "/dashboard/category",
  },
  {
    name: "Admin",
    icon: Users,
    path: "/dashboard/admin",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside
      className="
      w-[250px]
      min-h-screen
      bg-[#111]
      border-r
      border-[#252525]
      px-5
      pt-6
      "
    >
      <div className="text-2xl font-bold mb-10">
        <span className="text-red-600">◉</span>
        Pokelive
      </div>

      <div className="space-y-3">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              onClick={() => {
                console.log("clicked:", item.path);
                navigate(item.path);
              }}
              className="
                w-full
                flex
                items-center
                gap-4
                px-3
                py-3
                rounded-lg
                text-[#999]
                hover:bg-[#1e1e1e]
                hover:text-white
                "
            >
              <Icon size={21} />

              <span>{item.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
