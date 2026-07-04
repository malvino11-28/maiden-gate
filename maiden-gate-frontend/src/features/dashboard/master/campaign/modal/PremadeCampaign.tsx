import { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
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

function OrnamentDivider() {
  return (
    <div className="my-5 flex items-center gap-3">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-900/40 to-transparent" />
      <div className="h-1.5 w-1.5 rotate-45 border border-amber-800/50" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-900/40 to-transparent" />
    </div>
  );
}

export default function PremadeCampaignModal({
  isOpen,
  onClose,
  onUseCampaign,
}: Props) {
  const [selected, setSelected] = useState<PremadeCampaign | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

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
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-amber-900/40 bg-slate-950 shadow-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-amber-900/25 bg-gradient-to-r from-amber-950/60 to-rose-950/40 px-6 py-5">
          <div className="flex items-center gap-3">
            <Wand2 className="h-5 w-5 text-amber-400" />

            <div>
              <h2 className="text-lg font-semibold text-amber-100">
                Campanhas Pré-Desenvolvidas
              </h2>

              <p className="text-xs text-amber-100/40">
                Selecione uma campanha para visualizar e copiar.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-amber-100/40 transition-colors hover:bg-amber-900/30 hover:text-amber-100"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="w-64 shrink-0 space-y-2 overflow-y-auto border-r border-amber-900/20 p-3">
            {premadeCampaigns.map((campaign) => (
              <button
                key={campaign.id}
                type="button"
                onClick={() => setSelected(campaign)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition-all ${
                  selected?.id === campaign.id
                    ? "border-amber-500/50 bg-amber-500/10 text-amber-200"
                    : "border-amber-900/20 bg-slate-900/30 text-amber-100/60 hover:border-amber-700/40 hover:text-amber-100/80"
                }`}
              >
                <p className="text-sm font-medium">{campaign.name}</p>

                <p className="mt-0.5 text-xs opacity-60">{campaign.genre}</p>

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

          <div className="flex-1 overflow-y-auto p-6">
            {!selected ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <BookOpen className="h-10 w-10 text-amber-900/40" />

                <p className="text-sm text-amber-100/30">
                  Selecione uma campanha ao lado para visualizar seus detalhes.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-semibold leading-tight text-amber-100">
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

                  <div className="mb-4 flex gap-4 text-xs text-amber-100/40">
                    <span>
                      Nível:{" "}
                      <span className="text-amber-300">
                        {selected.recommendedLevel}
                      </span>
                    </span>

                    <span>
                      Jogadores:{" "}
                      <span className="text-amber-300">{selected.players}</span>
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-amber-100/65">
                    {selected.description}
                  </p>
                </div>

                <OrnamentDivider />

                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-100/40">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                    Localizações ({selected.locations.length})
                  </p>

                  <div className="space-y-2">
                    {selected.locations.map((location) => (
                      <div
                        key={location.name}
                        className="rounded-xl border border-emerald-900/20 bg-slate-900/50 px-4 py-3"
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
                </div>

                <OrnamentDivider />

                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-100/40">
                    <Users className="h-3.5 w-3.5 text-violet-400" />
                    NPCs ({selected.npcs.length})
                  </p>

                  <div className="space-y-2">
                    {selected.npcs.map((npc) => (
                      <div
                        key={npc.name}
                        className="rounded-xl border border-violet-900/20 bg-slate-900/50 px-4 py-3"
                      >
                        <p className="text-sm font-medium text-amber-100">
                          {npc.name}
                        </p>

                        <p className="mt-0.5 text-xs text-amber-100/40">
                          {npc.race} · {npc.occupation}
                        </p>

                        <p className="mt-1 text-xs text-amber-100/55">
                          {npc.personality}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <OrnamentDivider />

                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-100/40">
                    <Skull className="h-3.5 w-3.5 text-rose-400" />
                    Bestiário ({selected.monsters.length})
                  </p>

                  <div className="space-y-2">
                    {selected.monsters.map((monster) => (
                      <div
                        key={monster.name}
                        className="rounded-xl border border-rose-900/20 bg-slate-900/50 px-4 py-3"
                      >
                        <p className="text-sm font-medium text-amber-100">
                          {monster.name}
                        </p>

                        <p className="mt-0.5 text-xs text-amber-100/40">
                          {monster.type} · Ameaça {monster.threat}
                        </p>

                        <p className="mt-1 text-xs text-amber-100/55">
                          {monster.skills}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 border-t border-amber-900/20 pt-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}
