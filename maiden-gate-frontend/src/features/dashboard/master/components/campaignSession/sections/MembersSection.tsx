import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import type { CampaignMember } from "../../../types/masterCampaign";

type Props = {
  members: CampaignMember[];
};

export default function MembersSection({ members }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (members.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-amber-100/40">
        Nenhum membro nesta campanha.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {members.map((member) => {
        const hpPercent = Math.round((member.hp / member.hpMax) * 100);
        const isOpen = expanded === member.nome;

        return (
          <div
            key={member.nome}
            className="overflow-hidden rounded-xl border border-amber-900/25 bg-slate-900/50"
          >
            <button
              className="flex w-full items-center gap-4 px-5 py-4 text-left"
              onClick={() => setExpanded(isOpen ? null : member.nome)}
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 text-2xl">
                {member.emoji}
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
                      className={`
                        h-full
                        rounded-full

                        ${
                          hpPercent > 60
                            ? "bg-emerald-500"
                            : hpPercent > 30
                              ? "bg-amber-500"
                              : "bg-rose-500"
                        }
                      `}
                      style={{ width: `${hpPercent}%` }}
                    />
                  </div>

                  <span className="whitespace-nowrap text-xs text-amber-100/35">
                    {member.hp}/{member.hpMax} HP
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

                  <div className="grid grid-cols-6 gap-2">
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
                          className={`
                            text-xs

                            ${
                              attribute.mod >= 0
                                ? "text-emerald-400"
                                : "text-rose-400"
                            }
                          `}
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

                  <div className="flex flex-wrap gap-2">
                    {member.habilidades.map((skill) => (
                      <span
                        key={skill.nome}
                        className={`
                          rounded-full
                          border
                          px-2.5
                          py-1
                          text-xs

                          ${
                            skill.tipo === "Ativa"
                              ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                              : "border-slate-500/30 bg-slate-500/15 text-slate-400"
                          }
                        `}
                      >
                        {skill.nome} · {skill.tipo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
