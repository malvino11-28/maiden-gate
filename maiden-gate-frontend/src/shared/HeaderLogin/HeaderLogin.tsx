import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../features/auth/hooks/useAuth";

import HeaderLoginLogo from "./components/HeaderLoginLogo";
import HeaderLoginNav from "./components/HeaderLoginNav";
import HeaderLoginUser from "./components/HeaderLoginUser";

export default function HeaderLogin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) {
    return null;
  }

  const dashboardPath =
    user.type === "master" ? "/dashboard/master" : "/dashboard/player";

  const rulesPath =
    user.type === "master"
      ? "/dashboard/master/rules"
      : "/dashboard/player/rules";

  const mobileLinks = [
    {
      label: "Início",
      path: dashboardPath,
    },
    {
      label: "Regras",
      path: rulesPath,
    },
  ];

  function handleLogout() {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/", { replace: true });
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <header
      className="
        sticky
        top-0
        z-40
        border-b
        border-white/10
        bg-[#050816]/90
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-10
        "
      >
        <HeaderLoginLogo />

        <HeaderLoginNav role={user.type} />

        <div className="hidden lg:block">
          <HeaderLoginUser />
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-amber-900/40
            bg-amber-500/10
            px-3
            py-2
            text-sm
            font-medium
            text-amber-200
            transition
            hover:border-amber-500/60
            hover:bg-amber-500/20
            lg:hidden
          "
        >
          {isMobileMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
          Menu
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#050816]/95 px-4 pb-4 pt-3 shadow-xl lg:hidden">
          <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-sm font-semibold text-white">{user.name}</p>
            <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-stone-500">
              {user.type === "master" ? "Mestre" : "Jogador"}
            </p>
          </div>

          <nav className="space-y-2">
            {mobileLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `
                    block
                    rounded-xl
                    border
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition

                    ${
                      isActive
                        ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
                        : "border-white/10 bg-white/[0.03] text-stone-400 hover:border-amber-500/30 hover:text-amber-100"
                    }
                  `
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="
              mt-4
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-red-500/30
              bg-red-500/10
              px-4
              py-3
              text-sm
              font-medium
              text-red-300
              transition
              hover:border-red-400/50
              hover:bg-red-500/20
            "
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      )}
    </header>
  );
}
