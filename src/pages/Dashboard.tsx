import { ShoppingBag, Users, TrendingUp, Store } from "lucide-react";

import { stats } from "../data/dashboardData";

import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import UserRatioChart from "../components/dashboard/UserRatioChart";
import RecentActivity from "../components/dashboard/RecentActivity";

const icons = [ShoppingBag, Users, TrendingUp, Store];

export default function Dashboard() {
  return (
    <div className="w-full">
      {/* Stats */}
      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-2
          xl:grid-cols-4
          xl:gap-5
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

      {/* Charts */}
      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-5
          lg:mt-8
          lg:grid-cols-2
        "
      >
        <RevenueChart />

        <UserRatioChart />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}
