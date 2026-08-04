import { ShoppingBag, Users, TrendingUp, Store } from "lucide-react";

import { stats } from "../data/dashboardData";

import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import UserRatioChart from "../components/dashboard/UserRatioChart";
import RecentActivity from "../components/dashboard/RecentActivity";

const icons = [ShoppingBag, Users, TrendingUp, Store];

export default function Dashboard() {
  return (
    <div>
      <div
        className="
        grid
        grid-cols-4
        gap-5
        "
      >
        {stats.map((item, index) => {
          const Icon = icons[index];

          return (
            <StatCard
              key={item.label}
              icon={Icon}
              value={item.value}
              label={item.label}
            />
          );
        })}
      </div>

      <div
        className="
        grid
        grid-cols-2
        gap-5
        mt-8
        "
      >
        <RevenueChart />

        <UserRatioChart />
      </div>

      <RecentActivity />
    </div>
  );
}
