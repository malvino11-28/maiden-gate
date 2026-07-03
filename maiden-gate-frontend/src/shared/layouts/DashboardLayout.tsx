import { Outlet } from "react-router-dom";

import HeaderLogin from "../HeaderLogin/HeaderLogin";
import FooterLogin from "../FooterLogin/FooterLogin";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <HeaderLogin />

      <main className="min-h-[calc(100vh-160px)]">
        <Outlet />
      </main>

      <FooterLogin />
    </div>
  );
}
