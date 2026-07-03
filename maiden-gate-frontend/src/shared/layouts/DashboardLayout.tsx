import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#05071A] text-white">
      <Outlet />
    </div>
  );
}
