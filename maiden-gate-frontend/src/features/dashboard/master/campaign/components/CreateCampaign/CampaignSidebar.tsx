import {
  BookOpen,
  MapPinned,
  Users,
  Skull,
  Gem,
  CalendarDays,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import type { CampaignStep } from "../../CreateCampaignPage";

type Step = {
  id: CampaignStep;
  title: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    id: "cover",
    title: "Capa",
    icon: BookOpen,
  },
  {
    id: "locations",
    title: "Localizações",
    icon: MapPinned,
  },
  {
    id: "npcs",
    title: "NPCs",
    icon: Users,
  },
  {
    id: "monsters",
    title: "Bestiário",
    icon: Skull,
  },
  {
    id: "items",
    title: "Artefatos & Itens",
    icon: Gem,
  },
  {
    id: "events",
    title: "Eventos",
    icon: CalendarDays,
  },
];

type Props = {
  currentStep: CampaignStep;
  onChange: (step: CampaignStep) => void;
};

export default function CampaignSidebar({ currentStep, onChange }: Props) {
  return (
    <aside
      className="
        flex
        min-h-[calc(100vh-81px)]
        w-72
        flex-col
        border-r
        border-white/10
        bg-[#080C1B]
        p-6
      "
    >
      <p
        className="
          mb-8
          text-xs
          font-semibold
          uppercase
          tracking-[0.3em]
          text-orange-400
        "
      >
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
              className={`
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                transition

                ${
                  active
                    ? "bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 text-white"
                    : "text-stone-400 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <Icon size={18} />

              {step.title}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-8">
        <p className="text-xs italic text-stone-600">Forge sua lenda.</p>
      </div>
    </aside>
  );
}
