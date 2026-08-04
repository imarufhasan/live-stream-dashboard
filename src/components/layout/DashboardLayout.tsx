import Sidebar from "../dashboard/Sidebar";
import Header from "../dashboard/Header";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/signin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <div className="flex-1">
         <Header onLogout={handleLogout} />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
