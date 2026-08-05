import {
  LayoutDashboard,
  Users,
  Store,
  Wallet,
  Settings,
  ShieldCheck,
  Ticket,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { ElementType } from "react";

type ChildMenu = {
  name: string;
  path: string;
};

type MenuItem = {
  name: string;
  icon: ElementType;
  path?: string;
  children?: ChildMenu[];
};

const menu: MenuItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },

  {
    name: "User Management",
    icon: Users,
    children: [
      {
        name: "Users",
        path: "/dashboard/users",
      },
      {
        name: "Sellers",
        path: "/dashboard/sellers",
      },
    ],
  },

  {
    name: "Seller Approvals",
    icon: Store,
    path: "/dashboard/seller-approvals",
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
    children: [
      {
        name: "Privacy Policy",
        path: "/dashboard/settings/privacy-policy",
      },
      {
        name: "Terms & Condition",
        path: "/dashboard/settings/terms-condition",
      },
      {
        name: "Support",
        path: "/dashboard/settings/support",
      },
    ],
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const location = useLocation();

  const [openMenu, setOpenMenu] = useState<string | null>("User Management");

  const isActive = (path?: string) => {
    if (!path) return false;

    return location.pathname === path;
  };

  return (
    <aside
      className="
      w-75
      min-h-screen
      bg-[#111]
      border-r
      border-[#252525]
      px-5
      pt-6
      "
    >
      {/* Logo */}

      <div
        className="
        mb-10
        text-2xl
        font-bold
        text-white
        "
      >
        <span className="text-red-600">◉</span> Pokelive
      </div>

      <div className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          const hasChildren = Boolean(item.children);

          const parentActive =
            item.children?.some((child) => isActive(child.path)) ||
            isActive(item.path);

          return (
            <div key={item.name}>
              {/* Parent Menu */}

              <button
                onClick={() => {
                  if (hasChildren) {
                    setOpenMenu(openMenu === item.name ? null : item.name);
                  } else {
                    if (item.path) {
                      navigate(item.path);
                    }
                  }
                }}
                className={`
                  w-full
                  flex
                  items-center
                  justify-between
                  rounded-lg
                  px-3
                  py-3
                  transition


                  ${
                    parentActive
                      ? "bg-[#1e1e1e] text-white"
                      : "text-[#999] hover:bg-[#1e1e1e] hover:text-white"
                  }

                  `}
              >
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    "
                >
                  <Icon size={21} />

                  <span>{item.name}</span>
                </div>

                {hasChildren &&
                  (openMenu === item.name ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  ))}
              </button>

              {/* Children */}

              {hasChildren && openMenu === item.name && (
                <div
                  className="
                      ml-8
                      mt-2
                      space-y-1
                      border-l
                      border-[#333]
                      pl-4
                      "
                >
                  {item.children?.map((child) => (
                    <button
                      key={child.name}
                      onClick={() => navigate(child.path)}
                      className={`
                            relative
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-md
                            px-3
                            py-2
                            text-sm
                            transition


                            ${
                              isActive(child.path)
                                ? "bg-[#222] text-white"
                                : "text-[#888] hover:bg-[#1a1a1a] hover:text-white"
                            }

                            `}
                    >
                      {/* Active Dot */}

                      <span
                        className={`
                              h-2
                              w-2
                              rounded-full
                              transition


                              ${
                                isActive(child.path)
                                  ? "bg-red-500 scale-125 shadow-[0_0_8px_#ef4444]"
                                  : "bg-[#555]"
                              }

                              `}
                      />

                      {child.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
