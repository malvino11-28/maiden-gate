import { Shield, Skull, Swords, Users } from "lucide-react";

import type {
  CampaignLocation,
  CampaignMember,
  CampaignMonster,
} from "../../../types/masterCampaign";

type Props = {
  campaignId: string;
  monsters: CampaignMonster[];
  members: CampaignMember[];
  locations: CampaignLocation[];
  currentLocation: string;
};

export default function BattleSection({
  campaignId,
  monsters,
  members,
  locations,
  currentLocation,
}: Props) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-rose-900/30 bg-slate-900/50 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10">
            <Swords className="h-5 w-5 text-rose-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-amber-100">
              Gerenciador de Batalha
            </h2>

            <p className="text-sm text-amber-100/40">
              Campanha #{campaignId} · Local atual: {currentLocation}
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-amber-100/60">
          Esta área será usada para iniciar encontros, controlar turnos,
          selecionar monstros, acompanhar HP dos participantes e registrar
          eventos de combate.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-amber-900/20 bg-slate-900/50 p-4">
          <Users className="mb-3 h-5 w-5 text-emerald-400" />

          <p className="text-2xl font-bold text-amber-100">{members.length}</p>

          <p className="text-sm text-amber-100/40">Jogadores disponíveis</p>
        </div>

        <div className="rounded-xl border border-amber-900/20 bg-slate-900/50 p-4">
          <Skull className="mb-3 h-5 w-5 text-rose-400" />

          <p className="text-2xl font-bold text-amber-100">{monsters.length}</p>

          <p className="text-sm text-amber-100/40">Monstros cadastrados</p>
        </div>

        <div className="rounded-xl border border-amber-900/20 bg-slate-900/50 p-4">
          <Shield className="mb-3 h-5 w-5 text-sky-400" />

          <p className="text-2xl font-bold text-amber-100">
            {locations.length}
          </p>

          <p className="text-sm text-amber-100/40">Locais possíveis</p>
        </div>
      </div>

      <button
        className="
          rounded-xl
          border
          border-rose-500/30
          bg-rose-500/10
          px-5
          py-3
          text-sm
          font-semibold
          text-rose-300
          transition
          hover:border-rose-400/50
          hover:bg-rose-500/20
        "
      >
        Iniciar nova batalha
      </button>
    </div>
  );
}
