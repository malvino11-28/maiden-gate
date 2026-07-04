import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-amber-100">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
