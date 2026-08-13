import {
  LayoutDashboard,
  Users,
  Store,
  Wallet,
  Settings,
  ShieldCheck,
  Flag,
  Ticket,
  ChevronDown,
  ChevronRight,
  X,
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
    name: "Report",
    icon: Flag,
    path: "/dashboard/report",
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

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState<string | null>("User Management");

  const isActive = (path?: string) => {
    if (!path) return false;

    return location.pathname === path;
  };

  const goTo = (path: string) => {
    navigate(path);

    // Close sidebar on mobile after navigation
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40
          bg-black/60
          transition-opacity
          duration-300
          lg:hidden
          ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          w-72
          sm:w-75
          min-h-screen
          overflow-y-auto
          border-r
          border-[#252525]
          bg-[#111]
          px-5
          pt-6
          transition-transform
          duration-300
          ease-in-out

          ${open ? "translate-x-0" : "-translate-x-full"}

          lg:static
          lg:z-auto
          lg:translate-x-0
        `}
      >
        {/* Logo + Close Button */}
        <div className="mb-10 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">
            <span className="text-red-600">◉</span> Pokelive
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-1.5
              text-[#999]
              transition
              hover:bg-[#1e1e1e]
              hover:text-white
              lg:hidden
            "
            title="Close menu"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
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
                  type="button"
                  onClick={() => {
                    if (hasChildren) {
                      setOpenMenu(openMenu === item.name ? null : item.name);
                    } else if (item.path) {
                      goTo(item.path);
                    }
                  }}
                  className={`
                    flex
                    w-full
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
                  {/* Icon + Name */}
                  <div className="flex items-center gap-4">
                    <Icon size={21} />

                    <span>{item.name}</span>
                  </div>

                  {/* Dropdown Icon */}
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
                    {item.children?.map((child) => {
                      const childActive = isActive(child.path);

                      return (
                        <button
                          type="button"
                          key={child.name}
                          onClick={() => goTo(child.path)}
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
                              childActive
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
                                childActive
                                  ? "scale-125 bg-red-500 shadow-[0_0_8px_#ef4444]"
                                  : "bg-[#555]"
                              }
                            `}
                          />

                          <span>{child.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
