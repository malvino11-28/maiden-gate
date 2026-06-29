import { useState } from "react";

import Logo from "./components/Logo";
import Navigation from "./components/Navigation";
import AuthButtons from "./components/AuthButtons";
import UserMenu from "./components/UserMenu";
import LoginModal from "../../../features/auth/components/AuthModal/LoginForm";
import RegisterModal from "../../../features/auth/components/AuthModal/RegisterForm";

import { useAuth } from "../../../features/auth/hooks/useAuth";

export default function Header() {
  const { user } = useAuth();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const openRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  return (
    <>
      <header
        className="
            fixed
            top-0
            left-0
            z-50
            w-full

            h-16

            border-b
            border-white/10

            bg-zinc-950/40
            backdrop-blur-md
        "
      >
        <div
          className="
            mx-auto
            flex
            h-full

            max-w-7xl
            items-center
            justify-between

            px-6
            lg:px-10
        "
        >
          <Logo />

          <Navigation />

          {user ? (
            <UserMenu />
          ) : (
            <AuthButtons
              onLoginClick={openLogin}
              onRegisterClick={openRegister}
            />
          )}
        </div>
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
