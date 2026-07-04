import { LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../features/auth/hooks/useAuth";

export default function HeaderLoginUser() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="flex items-center gap-4">
      <div className="hidden text-right sm:block">
        <p className="text-sm font-semibold text-white">{user?.name}</p>

        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
          {user?.type === "master" ? "Mestre" : "Jogador"}
        </p>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
        <UserRound size={18} className="text-amber-300" />
      </div>

      <button
        onClick={handleLogout}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-white/10
          px-4
          py-2
          text-sm
          font-medium
          text-stone-300
          transition
          hover:border-red-500/40
          hover:bg-red-500/10
          hover:text-red-300
        "
      >
        <LogOut size={16} />
        Sair
      </button>
    </div>
  );
}
