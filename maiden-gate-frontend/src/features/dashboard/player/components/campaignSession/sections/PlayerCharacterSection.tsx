import { BarChart2, Heart, Shield, Sparkles, Star, Zap } from "lucide-react";

import type { PlayerCharacterFull } from "../../../types/player";

type Props = {
  character: PlayerCharacterFull;
};

export default function PlayerCharacterSection({ character }: Props) {
  const hpPercent = Math.round((character.hp / character.hpMax) * 100);
  const mpPercent = Math.round((character.mp / character.mpMax) * 100);
  const xpPercent = Math.round((character.xp / character.xpProximo) * 100);

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-2xl border border-amber-900/25 bg-slate-900/50">
        <div className={`bg-gradient-to-r ${character.marcaCor} px-5 py-5`}>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{character.marcaEmoji}</span>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {character.nome} {character.sobrenome}
              </h2>
              <p className="text-sm text-white/70">Marca {character.marca} · Nível {character.nivel}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-3">
          <div className="rounded-xl border border-rose-900/25 bg-slate-950/40 p-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs text-amber-100/45">
              <Heart className="h-3.5 w-3.5 text-rose-400" /> Pontos de Vida
            </p>
            <p className="text-xl font-semibold text-amber-100">{character.hp} / {character.hpMax}</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className={`h-full rounded-full ${hpPercent > 60 ? "bg-emerald-500" : hpPercent > 30 ? "bg-amber-500" : "bg-rose-500"}`} style={{ width: `${hpPercent}%` }} />
            </div>
          </div>

          <div className="rounded-xl border border-sky-900/25 bg-slate-950/40 p-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs text-amber-100/45">
              <Sparkles className="h-3.5 w-3.5 text-sky-400" /> Energia
            </p>
            <p className="text-xl font-semibold text-amber-100">{character.mp} / {character.mpMax}</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-sky-500" style={{ width: `${mpPercent}%` }} />
            </div>
          </div>

          <div className="rounded-xl border border-amber-900/25 bg-slate-950/40 p-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs text-amber-100/45">
              <Star className="h-3.5 w-3.5 text-amber-400" /> Experiência
            </p>
            <p className="text-xl font-semibold text-amber-100">{character.xp} / {character.xpProximo}</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-amber-500" style={{ width: `${xpPercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-900/25 bg-slate-900/50 p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-100/60">
          <BarChart2 className="h-4 w-4 text-amber-400" /> Atributos
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {character.atributos.map((attribute) => (
            <div key={attribute.nome} className="rounded-xl bg-slate-800/50 p-3 text-center">
              <p className="mb-1 text-xs uppercase tracking-wide text-amber-100/40">{attribute.nome}</p>
              <p className="text-xl font-bold text-amber-100">{attribute.valor}</p>
              <p className={`text-xs font-medium ${attribute.mod >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                {attribute.mod >= 0 ? "+" : ""}{attribute.mod}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-amber-900/25 bg-slate-900/50 p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-100/60">
          <Shield className="h-4 w-4 text-amber-400" /> Habilidades da Marca
        </h3>
        <div className="space-y-3">
          {character.habilidades.map((skill) => (
            <div key={skill.nome} className="rounded-xl bg-slate-800/50 px-4 py-3">
              <div className="mb-1 flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                <p className="text-sm font-medium text-amber-100">{skill.nome}</p>
                <span className={`ml-auto rounded-full border px-2 py-0.5 text-xs ${
                  skill.tipo === "Ativa"
                    ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                    : skill.tipo === "Passiva"
                      ? "border-slate-500/30 bg-slate-500/15 text-slate-400"
                      : "border-violet-500/30 bg-violet-500/10 text-violet-300"
                }`}>{skill.tipo}</span>
              </div>
              <p className="text-xs leading-relaxed text-amber-100/55">{skill.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
