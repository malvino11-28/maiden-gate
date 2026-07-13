import { BarChart2, Backpack, ChevronRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { PlayerCharacterSummary } from "../../types/player";

type Props = {
  character: PlayerCharacterSummary;
};

function getImageSrc(image?: string | null) {
  if (!image) return;

  if (image.startsWith("http") || image.startsWith("/")) {
    return image;
  }

  return `http://127.0.0.1:8000/storage/${image}`;
}

export default function CharacterCard({ character }: Props) {
  const navigate = useNavigate();
  const hpPercent = Math.round((character.hp / character.hpMax) * 100);

  return (
    <button
      onClick={() =>
        navigate(`/dashboard/player/character/${character.id}/edit`)
      }
      className="group cursor-pointer rounded-2xl border border-rose-900/25 bg-slate-900/50 p-5 text-left transition-colors hover:border-rose-700/40"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${character.marcaCor}`}
          >
            {character.iconImage ? (
              <img
                src={getImageSrc(character.iconImage)}
                alt={character.nome}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs font-semibold text-amber-100/60">
                {character.nome.charAt(0)}
              </span>
            )}
          </div>

          <div>
            <p className="font-semibold text-amber-100">
              {character.nome}
              {character.sobrenome ? ` ${character.sobrenome}` : ""}
            </p>
            <p className="mt-0.5 text-xs text-amber-100/50">
              Marca {character.marca} · Nível {character.nivel}
            </p>
          </div>
        </div>

        <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-amber-100/25 transition-colors group-hover:text-amber-400" />
      </div>

      <div className="mb-3">
        <div className="mb-1 flex justify-between text-xs text-amber-100/50">
          <span>Pontos de Vida</span>
          <span>
            {character.hp} / {character.hpMax}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-full rounded-full transition-all ${hpPercent > 60 ? "bg-emerald-500" : hpPercent > 30 ? "bg-amber-500" : "bg-rose-500"}`}
            style={{ width: `${hpPercent}%` }}
          />
        </div>
      </div>

      <span className="rounded-full border border-amber-900/25 bg-slate-800/80 px-2.5 py-1 text-xs text-amber-100/50">
        {character.campanha}
      </span>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-amber-900/15 pt-4">
        {[
          { icon: Star, label: "Nível", value: character.nivel },
          {
            icon: BarChart2,
            label: "HP",
            value: `${character.hp}/${character.hpMax}`,
          },
          { icon: Backpack, label: "Itens", value: "—" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="text-center">
            <Icon className="mx-auto mb-0.5 h-3.5 w-3.5 text-amber-400/60" />
            <p className="text-xs font-medium text-amber-100">{value}</p>
            <p className="text-[10px] text-amber-100/35">{label}</p>
          </div>
        ))}
      </div>
    </button>
  );
}
