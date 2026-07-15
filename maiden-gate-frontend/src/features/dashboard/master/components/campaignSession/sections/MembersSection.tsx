import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useState } from "react";

import { getStorageImageUrl } from "../../../../../../services/apiUrl";
import type { CampaignMember } from "../../../types/masterCampaign";

type Props = {
  members: CampaignMember[];
  onCreateSkill?: () => void;
};

export default function MembersSection({ members, onCreateSkill }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-amber-900/25 bg-slate-900/40 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-amber-100">
            Membros da Campanha
          </p>
          <p className="mt-1 text-xs text-amber-100/45">
            Acompanhe personagens conectados à campanha e crie habilidades
            exclusivas para esta mesa.
          </p>
        </div>

        {onCreateSkill && (
          <button
            type="button"
            onClick={onCreateSkill}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-2 text-xs font-medium text-violet-300 transition hover:border-violet-400/50 hover:bg-violet-500/20 sm:w-auto"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Criar Skill
          </button>
        )}
      </div>

      {members.length === 0 ? (
        <p className="rounded-xl border border-amber-900/20 bg-slate-900/40 py-8 text-center text-sm text-amber-100/40">
          Nenhum membro nesta campanha.
        </p>
      ) : (
        <div className="space-y-3">
          {members.map((member) => {
            const hpMax = Math.max(member.hpMax || 1, 1);
            const hpPercent = Math.round((member.hp / hpMax) * 100);
            const isOpen = expanded === String(member.id ?? member.nome);
            const iconSrc = getStorageImageUrl(member.iconImage);

            return (
              <div
                key={member.id ?? member.nome}
                className="overflow-hidden rounded-xl border border-amber-900/25 bg-slate-900/50"
              >
                <button
                  type="button"
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  onClick={() =>
                    setExpanded(isOpen ? null : String(member.id ?? member.nome))
                  }
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 text-2xl">
                    {iconSrc ? (
                      <img
                        src={iconSrc}
                        alt={member.personagem}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      member.emoji ?? member.personagem.charAt(0)
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-amber-100">
                      {member.personagem}
                    </p>

                    <p className="mt-0.5 text-xs text-amber-100/45">
                      {member.nome} · Marca {member.marca} · Nível {member.nivel}
                    </p>

                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full ${
                            hpPercent > 60
                              ? "bg-emerald-500"
                              : hpPercent > 30
                                ? "bg-amber-500"
                                : "bg-rose-500"
                          }`}
                          style={{ width: `${Math.min(hpPercent, 100)}%` }}
                        />
                      </div>

                      <span className="whitespace-nowrap text-xs text-amber-100/35">
                        {member.hp}/{hpMax} HP
                      </span>
                    </div>
                  </div>

                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 flex-shrink-0 text-amber-100/30" />
                  ) : (
                    <ChevronDown className="h-4 w-4 flex-shrink-0 text-amber-100/30" />
                  )}
                </button>

                {isOpen && (
                  <div className="space-y-4 border-t border-amber-900/20 px-5 py-4">
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-wider text-amber-100/40">
                        Atributos
                      </p>

                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {member.atributos.map((attribute) => (
                          <div
                            key={attribute.nome}
                            className="rounded-lg bg-slate-800/60 p-2 text-center"
                          >
                            <p className="text-[10px] uppercase text-amber-100/40">
                              {attribute.nome}
                            </p>

                            <p className="text-base font-bold text-amber-100">
                              {attribute.valor}
                            </p>

                            <p
                              className={`text-xs ${
                                attribute.mod >= 0
                                  ? "text-emerald-400"
                                  : "text-rose-400"
                              }`}
                            >
                              {attribute.mod >= 0 ? "+" : ""}
                              {attribute.mod}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-xs uppercase tracking-wider text-amber-100/40">
                        Habilidades
                      </p>

                      {member.habilidades.length === 0 ? (
                        <p className="text-xs text-amber-100/30">
                          Nenhuma habilidade equipada.
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {member.habilidades.map((skill) => (
                            <span
                              key={skill.nome}
                              className={`rounded-full border px-2.5 py-1 text-xs ${
                                skill.tipo === "Ativa"
                                  ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                                  : skill.tipo === "Passiva"
                                    ? "border-slate-500/30 bg-slate-500/15 text-slate-400"
                                    : "border-violet-500/30 bg-violet-500/10 text-violet-300"
                              }`}
                            >
                              {skill.nome} · {skill.tipo}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
