import { Shield, User } from "lucide-react";

import { profileQuickActions } from "../../data/playerDashboardMock";
import type { PlayerDashboardTab } from "../../types/player";

type Props = {
  playerName: string;
  charactersCount?: number;
  activeCampaignsCount?: number;
  onChangeTab: (tab: PlayerDashboardTab) => void;
};

export default function PlayerProfileCard({
  playerName,
  charactersCount = 0,
  activeCampaignsCount = 0,
  onChangeTab,
}: Props) {
  return (
    <div className="max-w-xl space-y-5">
      <h2 className="mb-2 text-lg font-semibold text-amber-100">
        Informações do Perfil
      </h2>

      <div className="rounded-xl border border-rose-900/25 bg-slate-900/50 p-6">
        <div className="space-y-5">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 border-rose-500/40 bg-gradient-to-br from-rose-500/30 to-amber-600/30">
              <User className="h-8 w-8 text-rose-400" />
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-100">
                {playerName}
              </p>
              <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-xs text-rose-300">
                <Shield className="h-3 w-3" /> Jogador
              </span>
            </div>
          </div>

          <div className="grid gap-4 border-t border-rose-900/20 pt-4 sm:grid-cols-2">
            {[
              { label: "Nome", value: playerName },
              { label: "Tipo de conta", value: "Jogador" },
              { label: "Personagens criados", value: String(charactersCount) },
              {
                label: "Campanhas ativas",
                value: String(activeCampaignsCount),
              },
              { label: "Status", value: "Ativo" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="mb-0.5 text-xs uppercase tracking-wider text-amber-100/40">
                  {label}
                </p>
                <p className="text-sm text-amber-100">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        {profileQuickActions.map(({ icon: Icon, label, tab }) => (
          <button
            key={label}
            type="button"
            onClick={() => tab && onChangeTab(tab)}
            className="group flex items-center gap-3 rounded-xl border border-rose-900/20 bg-slate-900/40 px-4 py-3 text-left transition-colors hover:border-rose-700/40"
          >
            <Icon className="h-4 w-4 flex-shrink-0 text-rose-400 transition-transform group-hover:scale-110" />
            <span className="text-sm text-amber-100/70 group-hover:text-amber-100">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
