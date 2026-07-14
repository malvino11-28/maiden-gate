import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { playerCampaignSections } from "../../data/playerCampaignSections";
import type { PlayerCampaignSectionKey } from "../../types/player";

type Props = {
  activeSection: PlayerCampaignSectionKey;
  onChange: (section: PlayerCampaignSectionKey) => void;
};

export default function PlayerCampaignTabs({ activeSection, onChange }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeItem =
    playerCampaignSections.find((section) => section.key === activeSection) ??
    playerCampaignSections[0];

  const ActiveIcon = activeItem.icon;

  function handleChange(section: PlayerCampaignSectionKey) {
    onChange(section);
    setIsMobileMenuOpen(false);
  }

  return (
    <div className="mb-6">
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="
            flex
            w-full
            items-center
            justify-between
            rounded-xl
            border
            border-amber-900/25
            bg-slate-900/70
            px-4
            py-3
            text-left
            transition
            hover:border-amber-700/40
          "
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10">
              <ActiveIcon className="h-4 w-4 text-amber-300" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-100/35">
                Seção atual
              </p>
              <p className="text-sm font-semibold text-amber-100">
                {activeItem.label}
              </p>
            </div>
          </div>

          {isMobileMenuOpen ? (
            <ChevronUp className="h-5 w-5 text-amber-100/40" />
          ) : (
            <ChevronDown className="h-5 w-5 text-amber-100/40" />
          )}
        </button>

        {isMobileMenuOpen && (
          <div className="mt-3 grid gap-2 rounded-xl border border-amber-900/25 bg-slate-950/80 p-3">
            {playerCampaignSections.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => handleChange(key)}
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-left
                  text-sm
                  font-medium
                  transition-all

                  ${
                    activeSection === key
                      ? "border-amber-500/40 bg-gradient-to-r from-amber-500/20 to-rose-600/20 text-amber-200"
                      : "border-amber-900/20 bg-slate-900/50 text-amber-100/55 hover:border-amber-700/40 hover:text-amber-100"
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hidden flex-wrap gap-1 rounded-xl border border-amber-900/25 bg-slate-900/60 p-1 lg:flex">
        {playerCampaignSections.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              activeSection === key
                ? "border border-amber-500/30 bg-gradient-to-r from-amber-500/30 to-rose-600/30 text-amber-200"
                : "text-amber-100/50 hover:text-amber-100/80"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
