import { BookOpen, CalendarDays, Gem, MapPin, Skull, Sparkles, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { CampaignStep } from "../../types/campaignStep";

type Step = {
  id: CampaignStep;
  title: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  { id: "cover", title: "Capa", icon: BookOpen },
  { id: "locations", title: "Localizações", icon: MapPin },
  { id: "npcs", title: "NPCs", icon: Users },
  { id: "monsters", title: "Bestiário", icon: Skull },
  { id: "items", title: "Artefatos & Itens", icon: Gem },
  { id: "events", title: "Eventos", icon: CalendarDays },
  { id: "skills", title: "Skills", icon: Sparkles },
];

type Props = {
  currentStep: CampaignStep;
  onChange: (step: CampaignStep) => void;
};

export default function CampaignSidebar({ currentStep, onChange }: Props) {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 flex-shrink-0 border-r border-amber-900/25 bg-slate-950/80 p-5 lg:block">
      <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/70">
        Capítulos
      </p>

      <nav className="space-y-2">
        {steps.map((step) => {
          const Icon = step.icon;
          const active = currentStep === step.id;

          return (
            <button
              key={step.id}
              onClick={() => onChange(step.id)}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                active
                  ? "border-amber-500/40 bg-gradient-to-r from-amber-500/20 to-rose-600/20 text-amber-100"
                  : "border-transparent text-amber-100/45 hover:border-amber-900/30 hover:bg-slate-900/60 hover:text-amber-100/75"
              }`}
            >
              <Icon className="h-4 w-4" />
              {step.title}
            </button>
          );
        })}
      </nav>

      <p className="absolute bottom-6 left-5 right-5 text-xs italic text-amber-100/25">
        Forge sua lenda.
      </p>
    </aside>
  );
}
