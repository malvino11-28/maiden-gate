import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  CalendarDays,
  FolderTree,
  Gem,
  MapPin,
  Skull,
  Sparkles,
  Users,
} from "lucide-react";

import CampaignHeader from "./components/CreateCampaign/CampaignHeader";
import CampaignSidebar from "./components/CreateCampaign/CampaignSidebar";
import CoverSection from "./components/sections/CoverSection";
import CollectionsSection from "./components/sections/CollectionsSection";
import LocationSection from "./components/sections/LocationSection";
import NpcsSection from "./components/sections/NpcsSection";
import MonstersSection from "./components/sections/MonstersSection";
import ItemsSection from "./components/sections/ItemsSection";
import EventsSection from "./components/sections/EventsSection";
import SkillsSection from "./components/sections/SkillsSection";
import useCampaignForm from "./hooks/useCampaignForm";
import type { CampaignStep } from "./types/campaignStep";

import PremadeCampaignModal from "./modal/PremadeCampaign";
import type { PremadeCampaign } from "./data/premadeCampaign";

import { getMarks } from "./service/markService";
import type { MarkOption } from "./service/markService";

import { useAuth } from "../../../auth/hooks/useAuth";
import { createCampaign } from "./service/createCampaignService";

const steps: CampaignStep[] = [
  "cover",
  "collections",
  "locations",
  "npcs",
  "monsters",
  "items",
  "events",
  "skills",
];

const stepLabels: Record<CampaignStep, string> = {
  cover: "Capa",
  collections: "Conjuntos",
  locations: "Localizações",
  npcs: "NPCs",
  monsters: "Bestiário",
  items: "Artefatos & Itens",
  events: "Eventos",
  skills: "Skills",
};

const stepIcons = {
  cover: BookOpen,
  collections: FolderTree,
  locations: MapPin,
  npcs: Users,
  monsters: Skull,
  items: Gem,
  events: CalendarDays,
  skills: Sparkles,
};

export default function CreateCampaignPage() {
  const navigate = useNavigate();

  const [marks, setMarks] = useState<MarkOption[]>([]);

  useEffect(() => {
    async function loadBrands() {
      const data = await getMarks();
      setMarks(data);
    }

    loadBrands();
  }, []);

  const [isPremadeModalOpen, setIsPremadeModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<CampaignStep>("cover");
  const [saved, setSaved] = useState(false);
  const { campaign, updateField } = useCampaignForm();

  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentIndex = steps.indexOf(currentStep);
  const progress = useMemo(
    () => ((currentIndex + 1) / steps.length) * 100,
    [currentIndex],
  );

  function findMarkId(markName?: string | null) {
    if (!markName) return "";

    const normalizedMarkName = markName.trim().toLowerCase();
    const mark = marks.find(
      (item) => item.name.trim().toLowerCase() === normalizedMarkName,
    );

    return mark ? String(mark.id) : "";
  }

  function handleUsePremadeCampaign(campaign: PremadeCampaign) {
    updateField("image", campaign.image);
    updateField("name", campaign.name);
    updateField("description", campaign.description);
    updateField("recommendedLevel", campaign.recommendedLevel);
    updateField("players", campaign.players);

    updateField(
      "collections",
      (campaign.collections ?? []).map((collection, index) => ({
        clientId: collection.id ?? `premade-collection-${index}`,
        name: collection.name,
        description: collection.description ?? "",
        color: collection.color ?? "",
      })),
    );

    updateField(
      "locations",
      campaign.locations.map((location) => ({
        collectionId: location.collectionId ?? "",
        image: location.image,
        name: location.name,
        type: location.type,
        region: location.region,
        description: location.description,
      })),
    );
    updateField(
      "npcs",
      campaign.npcs.map((npc) => ({
        collectionId: npc.collectionId ?? "",
        image: npc.image,
        name: npc.name,
        marca_id: findMarkId(npc.brand),
        race: npc.race,
        occupation: npc.occupation,
        personality: npc.personality,
        secret: npc.secret,
        description: npc.description,
        skills: npc.skills
          ? npc.skills
              .split(".")
              .map((skill) => skill.trim())
              .filter(Boolean)
          : [],
        stats: {
          level: 1,
          hp: 100,
          mana: 50,
          atk: 10,
          def: 10,
          speed: 10,
        },
      })),
    );

    updateField(
      "monsters",
      campaign.monsters.map((monster) => ({
        collectionId: monster.collectionId ?? "",
        image: monster.image,
        name: monster.name,
        type: monster.type,
        threat: monster.threat,
        description: monster.description,
        skills: monster.skills
          ? monster.skills
              .split(".")
              .map((skill) => skill.trim())
              .filter(Boolean)
          : [],
        stats: {
          level: 1,
          hp: 100,
          mana: 50,
          atk: 10,
          def: 10,
          speed: 10,
        },
      })),
    );
    updateField(
      "items",
      campaign.items.map((item) => ({
        ...item,
        collectionId: item.collectionId ?? "",
      })),
    );
    updateField(
      "events",
      campaign.events.map((event) => ({
        ...event,
        collectionId: event.collectionId ?? "",
      })),
    );
  }

  function goNext() {
    const nextStep = steps[currentIndex + 1];
    if (nextStep) setCurrentStep(nextStep);
  }

  function goPrevious() {
    const previousStep = steps[currentIndex - 1];
    if (previousStep) setCurrentStep(previousStep);
  }

  async function handleFinish() {
    if (!user) {
      setError("Você precisa estar logado para criar uma campanha.");
      return;
    }

    if (!campaign.name || !campaign.recommendedLevel) {
      setError("Preencha os dados principais da campanha.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const createdCampaign = await createCampaign({
        master_id: user.id,
        name: campaign.name,
        description: campaign.description || null,
        image: campaign.image || null,
        recommended_level: campaign.recommendedLevel,
        players: campaign.players || null,
        status: "ativa",
        notes: campaign.notes ?? null,

        collections: campaign.collections,

        locations: campaign.locations,

        npcs: campaign.npcs.map((npc) => ({
          collectionId: npc.collectionId,
          image: npc.image,
          name: npc.name,
          marca_id: npc.marca_id || "",
          race: npc.race || "",
          occupation: npc.occupation || "",
          personality: npc.personality || "",
          secret: npc.secret || "",
          description: npc.description || "",
          skills: npc.skills,
          stats: npc.stats,
        })),

        monsters: campaign.monsters.map((monster) => ({
          collectionId: monster.collectionId,
          image: monster.image,
          name: monster.name,
          type: monster.type || "",
          threat: monster.threat || "",
          description: monster.description || "",
          skills: monster.skills,
          stats: monster.stats,
        })),

        items: campaign.items,
        events: campaign.events,
        skills: campaign.skills,
      });
      setSaved(true);

      setTimeout(() => {
        navigate(`/dashboard/master/campaign/${createdCampaign.id}`);
      }, 900);
    } catch {
      setError("Não foi possível criar a campanha.");
    } finally {
      setIsSaving(false);
    }
  }

  const summary = [
    { label: "Conjuntos", value: campaign.collections.length, icon: FolderTree },
    { label: "Localizações", value: campaign.locations.length, icon: MapPin },
    { label: "NPCs", value: campaign.npcs.length, icon: Users },
    { label: "Criaturas", value: campaign.monsters.length, icon: Skull },
    { label: "Itens", value: campaign.items.length, icon: Gem },
    { label: "Eventos", value: campaign.events.length, icon: CalendarDays },
    { label: "Skills", value: campaign.skills.length, icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-amber-100">
      <CampaignHeader
        onOpenPremadeCampaigns={() => setIsPremadeModalOpen(true)}
      />

      <div className="flex">
        <CampaignSidebar currentStep={currentStep} onChange={setCurrentStep} />

        <main className="min-w-0 flex-1">
          <div className="border-b border-amber-900/25 bg-slate-950/50 px-4 py-4 lg:hidden">
            <div className="mb-3 flex items-center justify-between text-xs text-amber-100/45">
              <span>
                Etapa {currentIndex + 1} de {steps.length}
              </span>
              <span>{stepLabels[currentStep]}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-amber-950/50">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-600"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 -mx-1 overflow-x-auto pb-2 sm:mx-0 sm:overflow-visible sm:pb-0">
              <div className="flex min-w-max gap-2 px-1 sm:grid sm:min-w-0 sm:grid-cols-8 sm:px-0">
                {steps.map((step) => {
                  const Icon = stepIcons[step];
                  const active = currentStep === step;

                  return (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setCurrentStep(step)}
                      className={`min-w-[92px] rounded-lg border px-3 py-2 text-xs transition-all sm:min-w-0 ${
                        active
                          ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
                          : "border-amber-900/25 bg-slate-900/40 text-amber-100/45 hover:border-amber-700/40 hover:text-amber-100/70"
                      }`}
                    >
                      <Icon className="mx-auto mb-1 h-4 w-4" />
                      <span className="block truncate">{stepLabels[step]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[1fr_180px]">
            <div>
              {currentStep === "cover" && (
                <CoverSection
                  campaign={campaign}
                  updateField={updateField}
                  onNext={goNext}
                />
              )}

              {currentStep === "collections" && (
                <CollectionsSection
                  campaign={campaign}
                  updateField={updateField}
                  onNext={goNext}
                  onPrevious={goPrevious}
                />
              )}

              {currentStep === "locations" && (
                <LocationSection
                  campaign={campaign}
                  updateField={updateField}
                  onNext={goNext}
                  onPrevious={goPrevious}
                />
              )}

              {currentStep === "npcs" && (
                <NpcsSection
                  campaign={campaign}
                  updateField={updateField}
                  marks={marks}
                  onNext={goNext}
                  onPrevious={goPrevious}
                />
              )}

              {currentStep === "monsters" && (
                <MonstersSection
                  campaign={campaign}
                  updateField={updateField}
                  onNext={goNext}
                  onPrevious={goPrevious}
                />
              )}

              {currentStep === "items" && (
                <ItemsSection
                  campaign={campaign}
                  updateField={updateField}
                  onNext={goNext}
                  onPrevious={goPrevious}
                />
              )}

              {currentStep === "events" && (
                <EventsSection
                  campaign={campaign}
                  updateField={updateField}
                  onNext={goNext}
                  onPrevious={goPrevious}
                />
              )}

              {currentStep === "skills" && (
                <SkillsSection
                  campaign={campaign}
                  updateField={updateField}
                  marks={marks}
                  onPrevious={goPrevious}
                  onFinish={handleFinish}
                />
              )}
            </div>

            <aside className="hidden border-l border-amber-900/25 bg-slate-950/40 p-4.5 lg:block">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h2 className="text-[14px] font-semibold uppercase tracking-widest text-amber-100/55 text-center">
                    Resumo
                  </h2>
                </div>

                <div className="rounded-xl border border-amber-900/25 bg-slate-900/50 p-4 text-center">
                  <p className="mb-1 text-xs uppercase tracking-wider text-amber-100/35">
                    Nome
                  </p>
                  <p className="truncate font-medium text-amber-100">
                    {campaign.name || "Nova Campanha"}
                  </p>
                  <p className="mt-3 text-xs text-amber-100/45">
                    {campaign.recommendedLevel} •{" "}
                    {campaign.players || "? jogadores"}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {summary.map(({ label, value, icon: Icon }) => (
                    <div
                      key={label}
                      className="rounded-xl border border-amber-900/20 bg-slate-900/45 p-3 text-center"
                    >
                      <Icon className="mx-auto mb-1 h-4 w-4 text-amber-400/60" />
                      <p className="text-lg font-semibold text-amber-100">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
                    {error}
                  </div>
                )}

                {isSaving && (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
                    Salvando campanha...
                  </div>
                )}

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
      <PremadeCampaignModal
        isOpen={isPremadeModalOpen}
        onClose={() => setIsPremadeModalOpen(false)}
        onUseCampaign={handleUsePremadeCampaign}
      />
    </div>
  );
}
