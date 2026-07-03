import { MapPin, Scroll } from "lucide-react";

import type { PlayerCampaignData } from "../../../types/player";

type Props = {
  location: PlayerCampaignData["localizacaoAtual"];
};

export default function PlayerLocationSection({ location }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-900/30 bg-slate-900/50">
      <div className="flex items-center gap-3 border-b border-emerald-900/25 bg-gradient-to-r from-emerald-900/30 to-teal-900/20 px-5 py-4">
        <MapPin className="h-5 w-5 text-emerald-400" />
        <div>
          <p className="font-semibold text-amber-100">{location.nome}</p>
          <p className="text-xs text-amber-100/45">{location.tipo}</p>
        </div>
        <span className="ml-auto rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
          Localização Atual
        </span>
      </div>

      <div className="px-5 py-5">
        <p className="text-sm leading-relaxed text-amber-100/65">{location.descricao}</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-amber-100/35">
          <Scroll className="h-3.5 w-3.5" />
          <span>Notas do Mestre visíveis para o grupo</span>
        </div>
      </div>
    </div>
  );
}
