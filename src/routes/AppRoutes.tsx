import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import UserList from "../pages/users/UserList";
import SellerApprovals from "../pages/SellerApprovals";
import Transactions from "../pages/Transactions";
import RaffleManagement from "../pages/RaffleManagement";
import AddCategory from "../pages/AddCategory";
import Adminn from "../pages/Adminn";
import Settings from "../pages/Settings";
import SellerList from "../pages/users/SellerList";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="users" element={<UserList />} />

        {/* Future */}
        <Route path="/dashboard/sellers" element={<SellerList />} />

        <Route path="seller-approvals" element={<SellerApprovals />} />

        <Route path="transactions" element={<Transactions />} />

        <Route path="raffle" element={<RaffleManagement />} />

        <Route path="category" element={<AddCategory />} />

        <Route path="admin" element={<Adminn />} />

        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
