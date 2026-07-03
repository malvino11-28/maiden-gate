import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { PlayerCampaignData } from "../../types/player";

type Props = {
  campaign: PlayerCampaignData;
};

export default function PlayerCampaignTitleBar({ campaign }: Props) {
  const navigate = useNavigate();

  return (
    <div className="mb-6 flex items-center gap-4">
      <button
        onClick={() => navigate("/dashboard/player")}
        className="flex items-center gap-1.5 text-sm text-amber-100/50 transition-colors hover:text-amber-400"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </button>

      <div className="h-4 w-px bg-amber-900/40" />

      <div>
        <h1 className="text-2xl font-semibold leading-tight text-amber-100">
          {campaign.nome}
        </h1>
        <p className="text-xs text-amber-100/45">Mestre: {campaign.mestre}</p>
      </div>
    </div>
  );
}
