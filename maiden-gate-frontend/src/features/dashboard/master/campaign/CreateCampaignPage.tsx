import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, CalendarDays, Gem, MapPin, Skull, Users } from "lucide-react";

import CampaignHeader from "./components/CreateCampaign/CampaignHeader";
import CampaignSidebar from "./components/CreateCampaign/CampaignSidebar";
import CoverSection from "./components/sections/CoverSection";
import LocationSection from "./components/sections/LocationSection";
import NpcsSection from "./components/sections/NpcsSection";
import MonstersSection from "./components/sections/MonstersSection";
import ItemsSection from "./components/sections/ItemsSection";
import EventsSection from "./components/sections/EventsSection";
import useCampaignForm from "./hooks/useCampaignForm";
import type { CampaignStep } from "./types/campaignStep";

const steps: CampaignStep[] = ["cover", "locations", "npcs", "monsters", "items", "events"];

const stepLabels: Record<CampaignStep, string> = {
  cover: "Capa",
  locations: "Localizações",
  npcs: "NPCs",
  monsters: "Bestiário",
  items: "Artefatos & Itens",
  events: "Eventos",
};

const stepIcons = {
  cover: BookOpen,
  locations: MapPin,
  npcs: Users,
  monsters: Skull,
  items: Gem,
  events: CalendarDays,
};

export default function CreateCampaignPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CampaignStep>("cover");
  const [saved, setSaved] = useState(false);
  const { campaign, updateField } = useCampaignForm();

  const currentIndex = steps.indexOf(currentStep);
  const progress = useMemo(() => ((currentIndex + 1) / steps.length) * 100, [currentIndex]);

  function goNext() {
    const nextStep = steps[currentIndex + 1];
    if (nextStep) setCurrentStep(nextStep);
  }

  function goPrevious() {
    const previousStep = steps[currentIndex - 1];
    if (previousStep) setCurrentStep(previousStep);
  }

  function handleFinish() {
    console.log("Criar campanha", campaign);
    setSaved(true);
    setTimeout(() => navigate("/dashboard/master"), 900);
  }

  const summary = [
    { label: "Localizações", value: campaign.locations.length, icon: MapPin },
    { label: "NPCs", value: campaign.npcs.length, icon: Users },
    { label: "Criaturas", value: campaign.monsters.length, icon: Skull },
    { label: "Itens", value: campaign.items.length, icon: Gem },
    { label: "Eventos", value: campaign.events.length, icon: CalendarDays },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-amber-100">
      <CampaignHeader />

      <div className="flex">
        <CampaignSidebar currentStep={currentStep} onChange={setCurrentStep} />

        <main className="min-w-0 flex-1">
          <div className="border-b border-amber-900/25 bg-slate-950/50 px-4 py-4 lg:hidden">
            <div className="mb-3 flex items-center justify-between text-xs text-amber-100/45">
              <span>Etapa {currentIndex + 1} de {steps.length}</span>
              <span>{stepLabels[currentStep]}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-amber-950/50">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-600" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {steps.map((step) => {
                const Icon = stepIcons[step];
                const active = currentStep === step;
                return (
                  <button
                    key={step}
                    onClick={() => setCurrentStep(step)}
                    className={`rounded-lg border px-3 py-2 text-xs transition-all ${active ? "border-amber-500/40 bg-amber-500/10 text-amber-200" : "border-amber-900/25 bg-slate-900/40 text-amber-100/45"}`}
                  >
                    <Icon className="mx-auto mb-1 h-4 w-4" />
                    {stepLabels[step]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[1fr_320px]">
            <div>
              {currentStep === "cover" && (
                <CoverSection campaign={campaign} updateField={updateField} onNext={goNext} />
              )}

              {currentStep === "locations" && (
                <LocationSection campaign={campaign} updateField={updateField} onNext={goNext} onPrevious={goPrevious} />
              )}

              {currentStep === "npcs" && (
                <NpcsSection campaign={campaign} updateField={updateField} onNext={goNext} onPrevious={goPrevious} />
              )}

              {currentStep === "monsters" && (
                <MonstersSection campaign={campaign} updateField={updateField} onNext={goNext} onPrevious={goPrevious} />
              )}

              {currentStep === "items" && (
                <ItemsSection campaign={campaign} updateField={updateField} onNext={goNext} onPrevious={goPrevious} />
              )}

              {currentStep === "events" && (
                <EventsSection campaign={campaign} updateField={updateField} onPrevious={goPrevious} onFinish={handleFinish} />
              )}
            </div>

            <aside className="hidden border-l border-amber-900/25 bg-slate-950/40 p-6 lg:block">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-100/55">
                    Resumo
                  </h2>
                  <p className="mt-2 text-xs leading-5 text-amber-100/35">
                    A campanha será montada em etapas. Os dados permanecem no formulário enquanto você navega.
                  </p>
                </div>

                <div className="rounded-xl border border-amber-900/25 bg-slate-900/50 p-4">
                  <p className="mb-1 text-xs uppercase tracking-wider text-amber-100/35">
                    Nome
                  </p>
                  <p className="truncate font-medium text-amber-100">
                    {campaign.name || "Nova Campanha"}
                  </p>
                  <p className="mt-3 text-xs text-amber-100/45">
                    {campaign.recommendedLevel} • {campaign.players || "? jogadores"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {summary.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="rounded-xl border border-amber-900/20 bg-slate-900/45 p-3 text-center">
                      <Icon className="mx-auto mb-1 h-4 w-4 text-amber-400/60" />
                      <p className="text-lg font-semibold text-amber-100">{value}</p>
                      <p className="text-xs text-amber-100/35">{label}</p>
                    </div>
                  ))}
                </div>

                {saved && (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                    Campanha criada! Redirecionando…
                  </div>
                )}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
