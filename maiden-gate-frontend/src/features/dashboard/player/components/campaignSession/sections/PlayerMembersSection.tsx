import { Shield } from "lucide-react";

import type { PlayerCampaignMember } from "../../../types/player";

type Props = {
  members: PlayerCampaignMember[];
};

export default function PlayerMembersSection({ members }: Props) {
  return (
    <div className="space-y-3">
      {members.map((member) => (
        <div
          key={member.nome}
          className={`flex items-center gap-4 rounded-xl border px-5 py-4 ${
            member.voce ? "border-amber-500/40 bg-slate-900/60" : "border-amber-900/25 bg-slate-900/50"
          }`}
        >
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 text-2xl">
            {member.emoji}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-amber-100">{member.personagem}</p>
              {member.voce && (
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs text-amber-300">
                  Você
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-amber-100/45">
              Jogador: {member.nome} · Marca {member.marca} · Nível {member.nivel}
            </p>
          </div>

          <Shield className={`h-4 w-4 flex-shrink-0 ${member.voce ? "text-amber-400" : "text-amber-100/20"}`} />
        </div>
      ))}
    </div>
  );
}
