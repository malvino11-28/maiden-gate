import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import Logo from "./components/Logo";
import Navigation from "./components/Navigation";
import AuthButtons from "./components/AuthButtons";
import UserMenu from "./components/UserMenu";
import LoginModal from "../../../features/auth/components/AuthModal/LoginForm";
import RegisterModal from "../../../features/auth/components/AuthModal/RegisterForm";

import { useAuth } from "../../../features/auth/hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { label: "Início", path: "/" },
    {
      label: "Regras",
      path:
        user?.type === "master"
          ? "/dashboard/master/rules"
          : user?.type === "player"
            ? "/dashboard/player/rules"
            : "/rules",
    },
    { label: "Ferramentas", path: "/tools" },
    { label: "Contato", path: "/contact" },
  ];

  if (user?.type === "master") {
    navigationLinks.push({
      label: "Mestre",
      path: "/dashboard/master",
    });
  }

  if (user?.type === "player") {
    navigationLinks.push({
      label: "Jogador",
      path: "/dashboard/player",
    });
  }

  const openLogin = () => {
    setIsMobileMenuOpen(false);
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const openRegister = () => {
    setIsMobileMenuOpen(false);
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  function handleLogout() {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/", { replace: true });
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-amber-900/30 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          <Navigation links={navigationLinks} />

          <div className="hidden lg:block">
            {user ? (
              <UserMenu />
            ) : (
              <AuthButtons
                onLoginClick={openLogin}
                onRegisterClick={openRegister}
              />
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="flex items-center gap-2 rounded-xl border border-amber-900/40 bg-amber-500/10 px-3 py-2 text-sm font-medium text-amber-200 transition hover:border-amber-500/60 hover:bg-amber-500/20 lg:hidden"
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
          <div className="border-t border-amber-900/25 bg-slate-950/95 px-4 py-4 shadow-xl lg:hidden">
            <nav className="space-y-2">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block rounded-xl border px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
                        : "border-amber-900/20 bg-slate-900/60 text-amber-100/70 hover:border-amber-700/40 hover:text-amber-100"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-4 border-t border-amber-900/20 pt-4">
              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300 transition hover:border-red-400/50 hover:bg-red-500/20"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={openLogin}
                    className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-200 transition hover:border-amber-400/50 hover:bg-amber-500/20"
                  >
                    Entrar
                  </button>

                  <button
                    type="button"
                    onClick={openRegister}
                    className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-200 transition hover:border-rose-400/50 hover:bg-rose-500/20"
                  >
                    Criar Conta
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeModals}
        onOpenRegister={openRegister}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={closeModals}
        onOpenLogin={openLogin}
      />
    </>
  );
}
