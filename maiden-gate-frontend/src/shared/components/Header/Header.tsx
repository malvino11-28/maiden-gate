import { useState } from "react";

import Logo from "./components/Logo";
import Navigation from "./components/Navigation";
import AuthButtons from "./components/AuthButtons";
import UserMenu from "./components/UserMenu";

export default function Header() {
  const [isAuthenticated] = useState(false);

  const handleLoginClick = () => {
    console.log("Abrir modal de login");
  };

  const handleRegisterClick = () => {
    console.log("Abrir modal de registro");
  };

  return (
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

        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <AuthButtons
            onLoginClick={handleLoginClick}
            onRegisterClick={handleRegisterClick}
          />
        )}
      </div>
    </header>
  );
}
