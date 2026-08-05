import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/signin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <div className="flex-1">
        <Header onLogout={handleLogout} />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
