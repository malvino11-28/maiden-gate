import { useAuth } from "../../features/auth/hooks/useAuth";

import HeaderLoginLogo from "./components/HeaderLoginLogo";
import HeaderLoginNav from "./components/HeaderLoginNav";
import HeaderLoginUser from "./components/HeaderLoginUser";

export default function HeaderLogin() {
  const { user } = useAuth();

  if (!user) {
    return null;
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
          px-6
          lg:px-10
        "
      >
        <HeaderLoginLogo />

        <HeaderLoginNav role={user.type} />

        <HeaderLoginUser />
      </div>
    </header>
  );
}
