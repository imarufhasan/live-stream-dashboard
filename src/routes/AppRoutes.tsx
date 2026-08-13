import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import UserList from "../pages/users/UserList";
import Transactions from "../pages/Transactions";
import RaffleManagement from "../pages/RaffleManagement";
import CategoryPage from "../pages/CategoryPage";
import AdminManagement from "../pages/AdminManagement";
import Settings from "../pages/Settings";
import SellerList from "../pages/users/SellerList";
import SellerApprovals from "../pages/SellerApprovals";
import PrivacyPolicy from "../pages/settings/PrivacyPolicy";
import TermsConditions from "../pages/settings/TermsConditions";
import ContactSupport from "../pages/settings/ContactSupport";
import ReportPage from "../pages/ReportPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="users" element={<UserList />} />

        {/* Future */}
        <Route path="sellers" element={<SellerList />} />

        <Route path="seller-approvals" element={<SellerApprovals />} />

        <Route path="transactions" element={<Transactions />} />

        <Route path="raffle" element={<RaffleManagement />} />

        <Route path="category" element={<CategoryPage />} />
        <Route path="report" element={<ReportPage />} />

        <Route path="admin" element={<AdminManagement />} />

        <Route path="settings" element={<Settings />} />
        <Route path="settings/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="settings/terms-condition" element={<TermsConditions />} />
        <Route path="settings/support" element={<ContactSupport />} />
      </Route>
    </Routes>
  );
}
