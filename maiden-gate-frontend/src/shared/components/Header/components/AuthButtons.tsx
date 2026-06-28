type AuthButtonsProps = {
  onLoginCheck: () => void;
  onRegisterCheck: () => void;
};

export default function AuthButtons({
  onLoginCheck,
  onRegisterCheck,
}: AuthButtonsProps) {
  return (
    <div
      className="
                flex
                items-center
                gap-3
            "
    >
      <button
        onClick={onLoginCheck}
        className="
                    rounded-xl
                    border
                    border-stone-600
                    px-4
                    py-2

                    text-sm
                    font-medium
                    text-stone-200

                    transition-all
                    duration-200

                    hover:border-amber-400
                    hover:text-amber-400
                "
      >
        Retornar à Jornada
      </button>

      <button
        onClick={onRegisterCheck}
        className="
            rounded-xl
            bg-amber-500
            px-4
            py-2

            text-sm
            font-semibold
            text-black

            transition-all
            duration-200

            hover:scale-105
        "
      >
        Forjar Destino
      </button>
    </div>
  );
}
