import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NewCharacterCard() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dashboard/player/character/new")}
      className="group flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-amber-900/30 p-5 text-amber-100/40 transition-all hover:border-amber-700/50 hover:text-amber-100/60"
    >
      <Plus className="h-8 w-8 transition-transform group-hover:scale-110" />
      <span className="text-sm">Novo Personagem</span>
    </button>
  );
}
