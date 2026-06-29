import { useAuth } from "../../../../features/auth/hooks/useAuth";

export default function UserMenu() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-stone-200">
        Bem-vindo, <strong>{user?.name}</strong>
      </span>

      <button
        onClick={logout}
        className="
          rounded-md
          border
          border-red-500/30
          px-4
          py-2
          text-sm
          text-red-400
          transition
          hover:bg-red-500/10
        "
      >
        Sair
      </button>
    </div>
  );
}
