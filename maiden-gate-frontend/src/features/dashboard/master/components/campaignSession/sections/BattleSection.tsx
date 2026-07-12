import { Construction, Swords } from "lucide-react";

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

export default function BattleSection({ currentLocation }: Props) {
  return (
    <div className="rounded-2xl border border-amber-900/25 bg-slate-900/60 p-8 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/25 bg-amber-500/10">
        <Construction className="h-8 w-8 text-amber-400" />
      </div>

      <h2 className="text-xl font-semibold text-amber-100">
        Gerenciador de batalha em desenvolvimento
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-amber-100/45">
        Esta aba será usada para iniciar encontros, controlar turnos, selecionar
        monstros, acompanhar HP dos participantes e registrar eventos de combate.
        Por enquanto, use o chat de dados lateral para rolagens.
      </p>

      {currentLocation && (
        <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-rose-500/25 bg-rose-500/10 px-4 py-2 text-xs text-rose-300/80">
          <Swords className="h-3.5 w-3.5" />
          Local atual: {currentLocation}
        </div>
      )}
    </div>
  );
}
