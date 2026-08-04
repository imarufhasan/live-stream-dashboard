import { Routes, Route } from "react-router-dom";


import Dashboard from "../pages/Dashboard";
import UserManagement from "../pages/UserManagement";
import DashboardLayout from "../components/layout/DashboardLayout";
import SellerApprovals from "../pages/SellerApprovals";
import RaffleManagement from "../pages/RaffleManagement";
import AddCategory from "../pages/AddCategory";
import Adminn from "../pages/Adminn";
import Settings from "../pages/Settings";
import Transactions from "../pages/Transactions";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />

      <Route
        path="/dashboard/users"
        element={
          <DashboardLayout>
            <UserManagement />
          </DashboardLayout>
        }
      />

      <Route
        path="/dashboard/sellers"
        element={
          <DashboardLayout>
            <SellerApprovals />
          </DashboardLayout>
        }
      />

      <Route
        path="/dashboard/transactions"
        element={
          <DashboardLayout>
            <Transactions />
          </DashboardLayout>
        }
      />

      <Route
        path="/dashboard/raffle"
        element={
          <DashboardLayout>
            <RaffleManagement />
          </DashboardLayout>
        }
      />

      <Route
        path="/dashboard/category"
        element={
          <DashboardLayout>
            <AddCategory />
          </DashboardLayout>
        }
      />

      <Route
        path="/dashboard/admin"
        element={
          <DashboardLayout>
            <Adminn />
          </DashboardLayout>
        }
      />

      <Route
        path="/dashboard/settings"
        element={
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}
