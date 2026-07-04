type AuthButtonsProps = {
  onLoginClick: () => void;
  onRegisterClick: () => void;
};

export default function AuthButtons({
  onLoginClick,
  onRegisterClick,
}: AuthButtonsProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onLoginClick}
        className="rounded-lg px-4 py-2 text-sm font-medium text-amber-100/75 transition-colors hover:bg-amber-900/25 hover:text-amber-100"
      >
        Entrar
      </button>

      <button
        onClick={onRegisterClick}
        className="rounded-lg bg-gradient-to-r from-amber-500 to-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-amber-950/25 transition-all hover:from-amber-600 hover:to-rose-700 active:scale-95"
      >
        Criar Conta
      </button>
    </div>
  );
}
