import { useState } from "react";
import type { ReactNode } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Copy,
  MapPin,
  Skull,
  Users,
  Wand2,
  X,
} from "lucide-react";

import type { PremadeCampaign } from "../data/premadeCampaign";
import { premadeCampaigns } from "../data/premadeCampaign";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onUseCampaign: (campaign: PremadeCampaign) => void;
};

type SectionKey = "locations" | "npcs" | "monsters";

function OrnamentDivider() {
  return (
    <div className="my-4 flex items-center gap-3">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-900/40 to-transparent" />
      <div className="h-1.5 w-1.5 rotate-45 border border-amber-800/50" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-900/40 to-transparent" />
    </div>
  );
}

function CollapsibleSection({
  title,
  count,
  icon,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  count: number;
  icon: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-amber-900/25 bg-slate-900/35">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-amber-500/5 sm:px-5"
      >
        <div className="flex min-w-0 items-center gap-2">
          {icon}

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-100/55">
              {title}
            </p>

            <p className="mt-0.5 text-xs text-amber-100/30">
              {count} {count === 1 ? "elemento" : "elementos"}
            </p>
          </div>
        </div>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-amber-300/70 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-amber-900/20 px-3 py-3 sm:px-4">
          {children}
        </div>
      )}
    </section>
  );
}

export default function PremadeCampaignModal({
  isOpen,
  onClose,
  onUseCampaign,
}: Props) {
  const [selected, setSelected] = useState<PremadeCampaign | null>(null);
  const [copied, setCopied] = useState(false);
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>(
    {
      locations: false,
      npcs: false,
      monsters: false,
    },
  );

  if (!isOpen) return null;

  function handleSelectCampaign(campaign: PremadeCampaign) {
    setSelected(campaign);
    setOpenSections({
      locations: false,
      npcs: false,
      monsters: false,
    });
  }

  function toggleSection(section: SectionKey) {
    setOpenSections((previous) => ({
      ...previous,
      [section]: !previous[section],
    }));
  }

  function handleCopy() {
    if (!selected) return;

    setCopied(true);

    setTimeout(() => {
      onUseCampaign(selected);
      setCopied(false);
      onClose();
    }, 900);
  }

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div className="relative flex h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-amber-900/40 bg-slate-950 shadow-2xl">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-amber-900/25 bg-gradient-to-r from-amber-950/60 to-rose-950/40 px-4 py-4 sm:items-center sm:px-6 sm:py-5">
          <div className="flex min-w-0 items-start gap-3 sm:items-center">
            <Wand2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-400 sm:mt-0" />

            <div className="min-w-0">
              <h2 className="text-base font-semibold text-amber-100 sm:text-lg">
                Campanhas Pré-Desenvolvidas
              </h2>

              <p className="mt-1 text-xs leading-relaxed text-amber-100/40">
                Selecione uma campanha para visualizar e copiar.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-amber-100/40 transition-colors hover:bg-amber-900/30 hover:text-amber-100"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
          <aside className="w-full shrink-0 overflow-x-auto border-b border-amber-900/20 p-3 lg:w-72 lg:overflow-y-auto lg:overflow-x-hidden lg:border-b-0 lg:border-r lg:border-amber-900/20">
            <div className="flex flex-nowrap gap-2 lg:block lg:space-y-2">
              {premadeCampaigns.map((campaign) => (
                <button
                  key={campaign.id}
                  type="button"
                  onClick={() => handleSelectCampaign(campaign)}
                  className={`min-w-[230px] rounded-xl border px-4 py-3 text-left transition-all lg:w-full lg:min-w-0 ${
                    selected?.id === campaign.id
                      ? "border-amber-500/50 bg-amber-500/10 text-amber-200"
                      : "border-amber-900/20 bg-slate-900/30 text-amber-100/60 hover:border-amber-700/40 hover:text-amber-100/80"
                  }`}
                >
                  <p className="line-clamp-1 text-sm font-medium">
                    {campaign.name}
                  </p>

                  <p className="mt-0.5 line-clamp-1 text-xs opacity-60">
                    {campaign.genre}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded border border-amber-800/30 bg-amber-900/30 px-1.5 py-0.5 text-[10px] text-amber-400/70">
                      {campaign.recommendedLevel}
                    </span>

                    <span className="rounded border border-slate-700/30 bg-slate-800/60 px-1.5 py-0.5 text-[10px] text-amber-100/40">
                      {campaign.tone}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
              {!selected ? (
                <div className="flex min-h-full flex-col items-center justify-center gap-3 text-center">
                  <BookOpen className="h-10 w-10 text-amber-900/40" />

                  <p className="max-w-sm text-sm leading-relaxed text-amber-100/30">
                    Selecione uma campanha para visualizar descrição,
                    localizações, NPCs e ameaças.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <h3 className="text-xl font-semibold leading-tight text-amber-100 sm:text-2xl">
                        {selected.name}
                      </h3>

                      <div className="flex shrink-0 flex-wrap gap-1.5">
                        <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300">
                          {selected.genre}
                        </span>

                        <span className="rounded-full border border-slate-600/30 bg-slate-700/40 px-2.5 py-1 text-xs text-amber-100/50">
                          {selected.tone}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-3 text-xs text-amber-100/40">
                      <span>
                        Nível:{" "}
                        <span className="text-amber-300">
                          {selected.recommendedLevel}
                        </span>
                      </span>

                      <span>
                        Jogadores:{" "}
                        <span className="text-amber-300">
                          {selected.players}
                        </span>
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-amber-100/65">
                      {selected.description}
                    </p>
                  </div>

                  <OrnamentDivider />

                  <CollapsibleSection
                    title="Localizações"
                    count={selected.locations.length}
                    icon={<MapPin className="h-3.5 w-3.5 text-emerald-400" />}
                    isOpen={openSections.locations}
                    onToggle={() => toggleSection("locations")}
                  >
                    <div className="space-y-2">
                      {selected.locations.map((location) => (
                        <div
                          key={location.name}
                          className="rounded-xl border border-emerald-900/20 bg-slate-950/45 px-4 py-3"
                        >
                          <p className="text-sm font-medium text-amber-100">
                            {location.name}
                          </p>

                          <p className="mt-0.5 text-xs text-amber-100/40">
                            {location.type} · {location.region}
                          </p>

                          <p className="mt-1 text-xs leading-relaxed text-amber-100/55">
                            {location.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection
                    title="NPCs"
                    count={selected.npcs.length}
                    icon={<Users className="h-3.5 w-3.5 text-violet-400" />}
                    isOpen={openSections.npcs}
                    onToggle={() => toggleSection("npcs")}
                  >
                    <div className="space-y-2">
                      {selected.npcs.map((npc) => (
                        <div
                          key={npc.name}
                          className="rounded-xl border border-violet-900/20 bg-slate-950/45 px-4 py-3"
                        >
                          <p className="text-sm font-medium text-amber-100">
                            {npc.name}
                          </p>

                          <p className="mt-0.5 text-xs text-amber-100/40">
                            {npc.race} · {npc.occupation}
                          </p>

                          <p className="mt-1 text-xs leading-relaxed text-amber-100/55">
                            {npc.personality}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection
                    title="Bestiário"
                    count={selected.monsters.length}
                    icon={<Skull className="h-3.5 w-3.5 text-rose-400" />}
                    isOpen={openSections.monsters}
                    onToggle={() => toggleSection("monsters")}
                  >
                    <div className="space-y-2">
                      {selected.monsters.map((monster) => (
                        <div
                          key={monster.name}
                          className="rounded-xl border border-rose-900/20 bg-slate-950/45 px-4 py-3"
                        >
                          <p className="text-sm font-medium text-amber-100">
                            {monster.name}
                          </p>

                          <p className="mt-0.5 text-xs text-amber-100/40">
                            {monster.type} · Ameaça {monster.threat}
                          </p>

                          <p className="mt-1 text-xs leading-relaxed text-amber-100/55">
                            {monster.skills}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CollapsibleSection>
                </div>
              )}
            </div>

            {selected && (
              <div className="shrink-0 border-t border-amber-900/20 bg-slate-950/95 px-4 py-4 backdrop-blur sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-xl border border-amber-900/30 py-3 text-sm text-amber-100/50 transition-all hover:border-amber-700/50 hover:text-amber-100"
                  >
                    Cancelar
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-white transition-all ${
                      copied
                        ? "bg-emerald-600"
                        : "bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700"
                    }`}
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copiar Campanha
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
