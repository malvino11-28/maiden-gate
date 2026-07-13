import { Globe } from "lucide-react";

import Button from "../../../../../shared/components/Button/Button";
import type { AvailableCampaign } from "../../types/player";

type Props = {
  campaign: AvailableCampaign;
  isRequesting?: boolean;
  onRequest?: () => void;
};

export default function AvailableCampaignCard({
  campaign,
  isRequesting = false,
  onRequest,
}: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-amber-900/25 bg-slate-900/50 px-5 py-5 transition-colors hover:border-amber-700/40 sm:flex-row sm:items-center">
      <div className="flex min-w-0 items-start gap-4">
        <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/15 to-rose-600/15">
          <Globe className="h-5 w-5 text-amber-400" />
        </div>

        <div className="min-w-0">
          <p className="font-medium text-amber-100">{campaign.campanha}</p>
          <p className="mt-0.5 text-xs text-amber-100/50">
            Mestre: {campaign.mestre} · Próxima sessão: {campaign.proximaSessao}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full border border-amber-900/25 bg-slate-800 px-2 py-0.5 text-xs text-amber-100/50">
              Nível: {campaign.nivel}
            </span>
            <span className="rounded-full border border-amber-900/25 bg-slate-800 px-2 py-0.5 text-xs text-amber-100/50">
              Marca: {campaign.marca}
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
              {campaign.vagas} vaga{campaign.vagas === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>

      <Button
        size="sm"
        className="self-start text-xs sm:self-center"
        disabled={isRequesting}
        onClick={onRequest}
      >
        {isRequesting ? "Solicitando..." : "Solicitar Entrada"}
      </Button>
    </div>
  );
}
