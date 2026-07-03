import { ArrowLeft, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

import StatusBadge from "./StatusBadge";
import type { MasterCampaign } from "../../types/masterCampaign";

type Props = {
  campaign: MasterCampaign;
};

export default function CampaignTitleBar({ campaign }: Props) {
  const navigate = useNavigate();

  return (
    <div className="mb-6 flex flex-wrap items-center gap-4">
      <button
        onClick={() => navigate("/dashboard/master")}
        className="
          flex
          items-center
          gap-1.5
          text-sm
          text-amber-100/50
          transition
          hover:text-amber-400
        "
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </button>

      <div className="h-4 w-px bg-amber-900/40" />

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Crown className="h-5 w-5 flex-shrink-0 text-amber-400" />

        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold leading-tight text-amber-100">
            {campaign.nome}
          </h1>

          <p className="text-xs text-amber-100/45">
            {campaign.sessoes} sessões · Última: {campaign.ultimaSessao}
          </p>
        </div>

        <StatusBadge status={campaign.status} />
      </div>
    </div>
  );
}
