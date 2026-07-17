/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Backpack,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  FolderTree,
  Gem,
  ImageIcon,
  MapPin,
  Scroll,
  Skull,
  Users,
  Sparkles,
} from "lucide-react";

import { getStorageImageUrl } from "../../../../../../services/apiUrl";
import type {
  PlayerCampaignElements,
  PlayerElementStatus,
} from "../../../types/player";

import EffectsReferenceModal from "../../../../../rules/components/EffectsReferenceModal";

type Props = {
  elements: PlayerCampaignElements;
};

type CollectionTarget = {
  collectionId?: number | null;
  collection?: {
    id?: number | null;
    name?: string | null;
    description?: string | null;
    color?: string | null;
  } | null;
};

type GroupedCollection = {
  id: string;
  name: string;
  description?: string | null;
  items: any[];
};

function getCollectionId(item: CollectionTarget) {
  return item.collectionId ?? item.collection?.id ?? null;
}

function getCollectionName(item: CollectionTarget) {
  const collectionId = getCollectionId(item);

  if (!collectionId) return "Sem conjunto";

  return item.collection?.name ?? "Conjunto";
}

function groupItemsByCollection(items: any[]): GroupedCollection[] {
  const groups = new Map<string, GroupedCollection>();

  items.forEach((item) => {
    const collectionId = getCollectionId(item);
    const groupId = collectionId ? String(collectionId) : "none";

    if (!groups.has(groupId)) {
      groups.set(groupId, {
        id: groupId,
        name: getCollectionName(item),
        description: item.collection?.description ?? null,
        items: [],
      });
    }

    groups.get(groupId)?.items.push(item);
  });

  return Array.from(groups.values()).sort((a, b) => {
    if (a.id === "none") return 1;
    if (b.id === "none") return -1;
    return a.name.localeCompare(b.name);
  });
}

function ElementImage({ image, alt }: { image?: string | null; alt: string }) {
  const imageSrc = getStorageImageUrl(image);

  if (!imageSrc) {
    return (
      <div className="flex h-24 w-full flex-shrink-0 items-center justify-center rounded-lg border border-amber-900/20 bg-slate-950/50 text-amber-100/20 sm:w-24">
        <ImageIcon className="h-6 w-6" />
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className="h-32 w-full flex-shrink-0 rounded-lg object-cover sm:h-24 sm:w-24"
    />
  );
}

function getStatusEntries(status?: PlayerElementStatus | null) {
  if (!status) return [];

  const labels: Record<string, string> = {
    level: "Nível",
    hp: "HP",
    mana: "Energia",
    atk: "ATK",
    def: "DEF",
    speed: "Velocidade",
  };

  const order = ["level", "hp", "atk", "def", "mana", "speed"];

  return Object.entries(status)
    .filter(([, value]) => value !== null && value !== undefined)
    .sort(([a], [b]) => {
      const indexA = order.indexOf(a);
      const indexB = order.indexOf(b);

      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB;
    })
    .map(([key, value]) => ({
      key,
      label: labels[key] ?? key,
      value: Number(value),
    }));
}

function StatusPanel({ status }: { status?: PlayerElementStatus | null }) {
  const entries = getStatusEntries(status);

  if (entries.length === 0) {
    return (
      <div className="mt-3 rounded-lg border border-amber-900/20 bg-slate-950/40 px-3 py-2 text-xs text-amber-100/35">
        Nenhum status cadastrado.
      </div>
    );
  }

  return (
    <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg border border-violet-500/20 bg-violet-500/5 p-3 sm:grid-cols-3 lg:grid-cols-6">
      {entries.map((entry) => {
        const isLevel = entry.key === "level";

        return (
          <div
            key={entry.label}
            className={`rounded-md border px-3 py-2 text-center ${
              isLevel
                ? "border-amber-500/40 bg-amber-500/15 text-amber-200"
                : "border-amber-900/20 bg-slate-950/50 text-amber-100"
            }`}
          >
            <p
              className={`text-[10px] uppercase tracking-wider ${
                isLevel ? "text-amber-200/70" : "text-amber-100/35"
              }`}
            >
              {entry.label}
            </p>
            <p className="text-base font-semibold">{entry.value}</p>
          </div>
        );
      })}
    </div>
  );
}

export default function PlayerElementsSection({ elements }: Props) {
  const [openGroup, setOpenGroup] = useState<string | null>("localizacoes");
  const [openCollectionByGroup, setOpenCollectionByGroup] = useState<
    Record<string, string | null>
  >({});
  const [openStatusId, setOpenStatusId] = useState<string | null>(null);

  const [showEffectsReference, setShowEffectsReference] = useState(false);

  function toggleCollection(groupKey: string, collectionKey: string) {
    setOpenCollectionByGroup((current) => ({
      ...current,
      [groupKey]: current[groupKey] === collectionKey ? null : collectionKey,
    }));
  }

  const groups = [
    {
      key: "localizacoes",
      label: "Localizações Conhecidas",
      icon: MapPin,
      color: "text-emerald-400",
      items: elements.localizacoes,
      render: (item: PlayerCampaignElements["localizacoes"][number]) => (
        <article
          key={item.id ?? item.nome}
          className="flex flex-col gap-4 rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3 sm:flex-row"
        >
          <ElementImage image={item.imagem} alt={item.nome} />

          <div className="min-w-0">
            <p className="text-sm font-medium text-amber-100">{item.nome}</p>
            <p className="mt-0.5 text-xs text-amber-100/40">
              {item.tipo} · {item.regiao}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-amber-100/55">
              {item.descricao}
            </p>
          </div>
        </article>
      ),
    },
    {
      key: "npcs",
      label: "NPCs Encontrados",
      icon: Users,
      color: "text-violet-400",
      items: elements.npcs,
      render: (item: PlayerCampaignElements["npcs"][number]) => {
        const statusId = `npc-${item.id ?? item.nome}`;
        const isStatusOpen = openStatusId === statusId;

        return (
          <article
            key={item.id ?? item.nome}
            className="flex flex-col gap-4 rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3 sm:flex-row"
          >
            <ElementImage image={item.imagem} alt={item.nome} />

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-amber-100">
                    {item.nome}
                  </p>
                  <p className="mt-0.5 text-xs text-amber-100/40">
                    {item.raca} · {item.ocupacao}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setOpenStatusId(isStatusOpen ? null : statusId)
                  }
                  className="rounded-md border border-violet-500/30 bg-slate-950/70 px-2.5 py-1.5 text-xs font-medium text-violet-400 transition-all hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-300 sm:w-auto"
                >
                  {isStatusOpen ? "Ocultar Status" : "Ver Status"}
                </button>
              </div>

              {item.marca && (
                <p className="mt-1 text-[11px] text-violet-300/60">
                  Marca {item.marca}
                </p>
              )}

              <p className="mt-2 text-xs leading-relaxed text-amber-100/55">
                {item.descricao || item.personalidade}
              </p>

              {item.habilidades && (
                <p className="mt-2 text-xs leading-relaxed text-amber-100/45">
                  {item.habilidades}
                </p>
              )}

              {isStatusOpen && (
                <StatusPanel status={item.status ?? item.stats} />
              )}
            </div>
          </article>
        );
      },
    },
    {
      key: "monstros",
      label: "Bestiário Visto",
      icon: Skull,
      color: "text-rose-400",
      items: elements.monstros,
      render: (item: PlayerCampaignElements["monstros"][number]) => {
        const statusId = `monster-${item.id ?? item.nome}`;
        const isStatusOpen = openStatusId === statusId;

        return (
          <article
            key={item.id ?? item.nome}
            className="flex flex-col gap-4 rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3 sm:flex-row"
          >
            <ElementImage image={item.imagem} alt={item.nome} />

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-amber-100">
                    {item.nome}
                  </p>
                  <p className="mt-0.5 text-xs text-amber-100/40">
                    {item.tipo} · Ameaça {item.ameaca}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setOpenStatusId(isStatusOpen ? null : statusId)
                  }
                  className="rounded-md border border-violet-500/30 bg-slate-950/70 px-2.5 py-1.5 text-xs font-medium text-violet-400 transition-all hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-300 sm:w-auto"
                >
                  {isStatusOpen ? "Ocultar Status" : "Ver Status"}
                </button>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-amber-100/55">
                {item.habilidades}
              </p>
              {item.descricao && (
                <p className="mt-2 text-xs leading-relaxed text-amber-100/45">
                  {item.descricao}
                </p>
              )}

              {isStatusOpen && (
                <StatusPanel status={item.status ?? item.stats} />
              )}
            </div>
          </article>
        );
      },
    },
    {
      key: "itens",
      label: "Itens de Lore",
      icon: Gem,
      color: "text-sky-400",
      items: elements.itens,
      render: (item: PlayerCampaignElements["itens"][number]) => (
        <article
          key={item.id ?? item.nome}
          className="rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3"
        >
          <p className="text-sm font-medium text-amber-100">{item.nome}</p>
          <p className="mt-0.5 text-xs text-amber-100/40">{item.tipo}</p>
          <p className="mt-2 text-xs leading-relaxed text-amber-100/55">
            {item.descricao}
          </p>
        </article>
      ),
    },
    {
      key: "eventos",
      label: "Eventos Descobertos",
      icon: CalendarDays,
      color: "text-orange-400",
      items: elements.eventos,
      render: (item: PlayerCampaignElements["eventos"][number]) => (
        <article
          key={item.id ?? item.titulo}
          className="rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3"
        >
          <p className="text-sm font-medium text-amber-100">{item.titulo}</p>
          <p className="mt-0.5 text-xs text-amber-100/40">
            {item.cronologia} · {item.data}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-amber-100/55">
            {item.descricao}
          </p>
        </article>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <div className="mb-2 flex items-center gap-2 text-xs text-amber-100/35">
        <div className="flex items-center justify-between gap-2 flex-nowrap">
          <Scroll className="h-3.5 w-3.5" />
          Elementos visíveis para jogadores.
          <button
            type="button"
            onClick={() => setShowEffectsReference(true)}
            className="inline-flex items-center justify-center lg:ml-[530px] gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-3 py-2 text-sm font-semibold text-violet-200 transition hover:border-violet-400/50 hover:bg-violet-500/20"
          >
            <Sparkles className="h-4 w-4" />
            Guia de Efeitos
          </button>
        </div>
      </div>

      {groups.map(({ key, label, icon: Icon, color, items, render }) => {
        const groupedItems = groupItemsByCollection(items as any[]);
        const openCollection = openCollectionByGroup[key];

        return (
          <div
            key={key}
            className="overflow-hidden rounded-xl border border-amber-900/20 bg-slate-900/40"
          >
            <button
              className="flex w-full items-center gap-2 px-4 py-3 text-left"
              onClick={() => setOpenGroup(openGroup === key ? null : key)}
            >
              <Icon className={`h-4 w-4 ${color}`} />
              <span className="text-sm font-medium text-amber-100">
                {label}
              </span>
              <span className="text-xs text-amber-100/35">
                ({items.length})
              </span>
              <span className="ml-auto">
                {openGroup === key ? (
                  <ChevronUp className="h-4 w-4 text-amber-100/40" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-amber-100/40" />
                )}
              </span>
            </button>

            {openGroup === key && (
              <div className="space-y-3 border-t border-amber-900/15 px-4 pb-4 pt-3">
                {items.length === 0 ? (
                  <p className="py-3 text-center text-xs text-amber-100/30">
                    Nenhum registro visível ainda.
                  </p>
                ) : (
                  groupedItems.map((collectionGroup) => {
                    const collectionKey = `${key}-${collectionGroup.id}`;
                    const isCollectionOpen = openCollection === collectionKey;

                    return (
                      <div
                        key={collectionKey}
                        className="overflow-hidden rounded-xl border border-amber-900/20 bg-slate-950/30"
                      >
                        <button
                          type="button"
                          onClick={() => toggleCollection(key, collectionKey)}
                          className="flex w-full items-center gap-2 px-3 py-2.5 text-left"
                        >
                          <FolderTree className="h-8 w-8 md:h-3.5 md:w-3.5 text-amber-400/70" />

                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-amber-100/85">
                              {collectionGroup.name}
                            </p>
                            {collectionGroup.description && (
                              <p className="mt-0.5 line-clamp-1 text-[11px] text-amber-100/35">
                                {collectionGroup.description}
                              </p>
                            )}
                          </div>
                          <span className="ml-auto text-[11px] text-amber-100/30">
                            {collectionGroup.items.length}
                          </span>
                          {isCollectionOpen ? (
                            <ChevronUp className="h-4 w-4 text-amber-100/35" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-amber-100/35" />
                          )}
                        </button>

                        {isCollectionOpen && (
                          <div className="space-y-2 border-t border-amber-900/15 p-3">
                            {collectionGroup.items.map((item) =>
                              render(item as never),
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        );
      })}

      <div className="rounded-xl border border-amber-900/20 bg-slate-900/30 p-4 text-xs text-amber-100/35">
        <Backpack className="mr-2 inline h-3.5 w-3.5 text-amber-400" />
        Segredos do mestre e informações não descobertas não aparecem nesta
        lista.
      </div>
      {showEffectsReference && (
        <EffectsReferenceModal onClose={() => setShowEffectsReference(false)} />
      )}
    </div>
  );
}
