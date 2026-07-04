import { Crown, Shield } from "lucide-react";

import { useAuth } from "../../../../features/auth/hooks/useAuth";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const Icon = user?.type === "master" ? Crown : Shield;

  return (
    <div className="flex items-center gap-3">
      <div className="hidden items-center gap-2 rounded-full border border-amber-900/35 bg-slate-900/55 px-3 py-1.5 text-sm text-amber-100/75 sm:flex">
        <Icon className="h-4 w-4 text-amber-400" />
        <span className="max-w-32 truncate">{user?.name}</span>
      </div>

      <button
        onClick={logout}
        className="rounded-lg border border-rose-500/30 px-4 py-2 text-sm text-rose-300 transition-colors hover:bg-rose-500/10"
      >
        Sair
      </button>
    </div>
  );
}
