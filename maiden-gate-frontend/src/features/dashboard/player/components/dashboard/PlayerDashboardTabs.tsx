import { playerDashboardTabs } from "../../data/playerDashboardMock";
import type { PlayerDashboardTab } from "../../types/player";

type Props = {
  activeTab: PlayerDashboardTab;
  onChange: (tab: PlayerDashboardTab) => void;
};

export default function PlayerDashboardTabs({ activeTab, onChange }: Props) {
  return (
    <div className="mb-8 flex w-fit flex-wrap gap-1 rounded-xl border border-rose-900/25 bg-slate-900/60 p-1">
      {playerDashboardTabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            activeTab === tab.key
              ? "border border-rose-500/30 bg-gradient-to-r from-rose-500/30 to-amber-600/30 text-amber-200"
              : "text-amber-100/50 hover:text-amber-100/80"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
