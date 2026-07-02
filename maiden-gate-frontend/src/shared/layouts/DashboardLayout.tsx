import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <main
      className="
        min-h-screen
        bg-[#05071A]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl

          px-6
          py-10

          lg:px-10
        "
      >
        <Outlet />
      </div>
    </main>
  );
}
