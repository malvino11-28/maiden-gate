import { Calendar, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { campaignStatusLabel, campaignStatusStyle } from "../../data/playerDashboardMock";
import type { PlayerCampaignSummary } from "../../types/player";

type Props = {
  campaign: PlayerCampaignSummary;
};

export default function MyCampaignCard({ campaign }: Props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/dashboard/player/campaign/${campaign.id}`)}
      className="group flex w-full items-center justify-between gap-4 rounded-xl border border-rose-900/25 bg-slate-900/50 px-5 py-4 text-left transition-colors hover:border-rose-700/40"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500/15 to-amber-600/15">
          <Calendar className="h-5 w-5 text-rose-400" />
        </div>

        <div className="min-w-0">
          <p className="truncate font-medium text-amber-100">{campaign.campanha}</p>
          <p className="mt-0.5 text-xs text-amber-100/50">
            Mestre: {campaign.mestre} · Personagem: {campaign.personagem}
            {campaign.proximaSessao !== "—" && ` · Próxima sessão: ${campaign.proximaSessao}`}
          </p>
        </div>
      </div>

      <div className="flex flex-shrink-0 items-center gap-3">
        <span className={`rounded-full border px-2.5 py-1 text-xs ${campaignStatusStyle[campaign.status]}`}>
          {campaignStatusLabel[campaign.status]}
        </span>
        <ChevronRight className="h-4 w-4 text-amber-100/30 transition-colors group-hover:text-amber-400" />
      </div>
    </button>
  );
}
