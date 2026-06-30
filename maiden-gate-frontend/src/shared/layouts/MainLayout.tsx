import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />

      <main className="pt-16 min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
