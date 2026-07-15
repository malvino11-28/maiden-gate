/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  FolderTree,
  Gem,
  ImageIcon,
  MapPin,
  Plus,
  Skull,
  Users,
  Zap,
} from "lucide-react";

import type {
  CampaignCollection,
  CampaignElementStatus,
  CampaignElements,
} from "../../../types/masterCampaign";

type ElementFormKey = "localizacao" | "npc" | "monstro" | "item" | "evento";
type ElementVisibilityType = "location" | "npc" | "monster" | "item" | "event";

type Props = {
  elements: CampaignElements;
  collections?: CampaignCollection[];
  onAdd: (type: ElementFormKey) => void;
  onAddCollection?: () => void;
  onVisibilityChange?: (
    elementType: ElementVisibilityType,
    elementId: string | number,
    visibleToPlayers: boolean,
  ) => void | Promise<void>;
  onCollectionChange?: (
    elementType: ElementVisibilityType,
    elementId: string | number,
    collectionId: string | number | null,
  ) => void | Promise<void>;
};

type VisibilityTarget = {
  id?: string | number;
  visible_to_players?: boolean;
  visibleToPlayers?: boolean;
};

type CollectionTarget = {
  id?: string | number;
  collection_id?: string | number | null;
  collectionId?: string | number | null;
  collection?: {
    id?: string | number | null;
    name?: string | null;
    description?: string | null;
    color?: string | null;
  } | null;
};

type GroupedCollection = {
  id: string;
  rawId: string | number | null;
  name: string;
  description?: string | null;
  items: any[];
  color?: string | null;
};

function getImageSrc(image?: string | null) {
  if (!image) return "";

  if (image.startsWith("http") || image.startsWith("/")) {
    return image;
  }

  return `http://127.0.0.1:8000/storage/${image}`;
}

function getVisibleToPlayers(item: VisibilityTarget) {
  return Boolean(item.visibleToPlayers ?? item.visible_to_players ?? false);
}

function getCollectionId(item: CollectionTarget) {
  return item.collectionId ?? item.collection_id ?? item.collection?.id ?? null;
}

function getCollectionName(
  item: CollectionTarget,
  collections: CampaignCollection[] = [],
) {
  const collectionId = getCollectionId(item);

  if (!collectionId) return "Sem conjunto";

  return (
    item.collection?.name ??
    collections.find(
      (collection) => String(collection.id) === String(collectionId),
    )?.name ??
    "Conjunto"
  );
}

const DEFAULT_COLLECTION_COLOR = "#f59e0b";

function normalizeCollectionColor(color?: string | null) {
  if (!color) return DEFAULT_COLLECTION_COLOR;

  if (color.startsWith("#")) return color;

  const colorMap: Record<string, string> = {
    Ambar: "#f59e0b",
    Roxo: "#8b5cf6",
    Violeta: "#8b5cf6",
    Rosa: "#ec4899",
    Ciano: "#06b6d4",
    Vermelho: "#ef4444",
  };

  return colorMap[color] ?? DEFAULT_COLLECTION_COLOR;
}

function hexToRgba(hex: string, opacity: number) {
  const normalized = normalizeCollectionColor(hex).replace("#", "");

  const fullHex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  const red = Number.parseInt(fullHex.slice(0, 2), 16);
  const green = Number.parseInt(fullHex.slice(2, 4), 16);
  const blue = Number.parseInt(fullHex.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

function groupItemsByCollection(
  items: any[],
  collections: CampaignCollection[] = [],
): GroupedCollection[] {
  const groups = new Map<string, GroupedCollection>();

  items.forEach((item) => {
    const rawId = getCollectionId(item);
    const groupId = rawId ? String(rawId) : "none";

    if (!groups.has(groupId)) {
      const collection = rawId
        ? collections.find((entry) => String(entry.id) === String(rawId))
        : null;

      groups.set(groupId, {
        id: groupId,
        rawId: rawId ?? null,
        name: getCollectionName(item, collections),
        description:
          item.collection?.description ?? collection?.description ?? null,
        color: item.collection?.color ?? collection?.color ?? null,
        items: [],
      });
    }

    groups.get(groupId)?.items.push(item);
  });

  return Array.from(groups.values()).sort((a, b) => {
    if (a.id === "none") return 1;
    if (b.id === "none") return -1;

    const orderA = collections.find(
      (collection) => String(collection.id) === String(a.rawId),
    )?.sortOrder;
    const orderB = collections.find(
      (collection) => String(collection.id) === String(b.rawId),
    )?.sortOrder;

    if (orderA !== undefined || orderB !== undefined) {
      return (orderA ?? 9999) - (orderB ?? 9999);
    }

    return a.name.localeCompare(b.name);
  });
}

function ElementImage({ image, alt }: { image?: string | null; alt: string }) {
  const imageSrc = getImageSrc(image);

  const containerClass =
    "flex w-full flex-shrink-0 overflow-hidden rounded-lg border border-amber-900/20 bg-slate-950/50 sm:w-32 sm:self-stretch";

  if (!imageSrc) {
    return (
      <div
        className={`${containerClass} min-h-32 items-center justify-center text-amber-100/20 sm:min-h-full`}
      >
        <ImageIcon className="h-6 w-6" />
      </div>
    );
  }

  return (
    <div className={`${containerClass} min-h-32 sm:min-h-full`}>
      <img src={imageSrc} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

function VisibilitySelect({
  item,
  elementType,
  onVisibilityChange,
}: {
  item: VisibilityTarget;
  elementType: ElementVisibilityType;
  onVisibilityChange?: Props["onVisibilityChange"];
}) {
  if (!onVisibilityChange) return null;

  const visible = getVisibleToPlayers(item);
  const disabled = item.id === undefined || item.id === null;

  return (
    <label className="flex w-full items-center gap-2 rounded-lg border border-amber-900/20 bg-slate-950/50 px-2.5 py-2 text-xs text-amber-100/45 sm:w-auto">
      {visible ? (
        <Eye className="h-3.5 w-3.5 text-emerald-400" />
      ) : (
        <EyeOff className="h-3.5 w-3.5 text-amber-100/30" />
      )}

      <span className="whitespace-nowrap">Visível para</span>

      <select
        value={visible ? "players" : "master"}
        disabled={disabled}
        onChange={(event) =>
          onVisibilityChange(
            elementType,
            item.id as string | number,
            event.target.value === "players",
          )
        }
        className="min-w-0 flex-1 bg-transparent text-amber-100 outline-none disabled:opacity-50 sm:min-w-[118px]"
      >
        <option className="bg-slate-950" value="master">
          Mestre
        </option>
        <option className="bg-slate-950" value="players">
          Jogadores
        </option>
      </select>
    </label>
  );
}

function ElementCollectionSelect({
  item,
  elementType,
  collections = [],
  onCollectionChange,
}: {
  item: CollectionTarget;
  elementType: ElementVisibilityType;
  collections?: CampaignCollection[];
  onCollectionChange?: Props["onCollectionChange"];
}) {
  if (!onCollectionChange) return null;

  const disabled = item.id === undefined || item.id === null;
  const selectedCollection = getCollectionId(item);

  const selectedCollectionData = selectedCollection
    ? collections.find(
        (collection) => String(collection.id) === String(selectedCollection),
      )
    : null;

  const selectedCollectionColor =
    item.collection?.color ?? selectedCollectionData?.color ?? "#f59e0b";

  return (
    <label className="flex w-full items-center gap-2 rounded-lg border border-amber-900/20 bg-slate-950/50 px-2.5 py-2 text-xs text-amber-100/45 sm:w-auto">
      <FolderTree className="h-3.5 w-3.5 text-amber-400/70" />
      <span className="whitespace-nowrap">Conjunto</span>
      <select
        value={selectedCollection ? String(selectedCollection) : ""}
        disabled={disabled}
        onChange={(event) =>
          onCollectionChange(
            elementType,
            item.id as string | number,
            event.target.value || null,
          )
        }
        className="min-w-0 flex-1 bg-transparent text-amber-100 outline-none disabled:opacity-50 sm:min-w-[130px]"
      >
        <option className="bg-slate-950" value="">
          Sem conjunto
        </option>
        {collections.map((collection) => (
          <option
            key={collection.id}
            className="bg-slate-950"
            value={collection.id}
          >
            {collection.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function ElementControls({
  item,
  elementType,
  collections,
  onVisibilityChange,
  onCollectionChange,
}: {
  item: VisibilityTarget & CollectionTarget;
  elementType: ElementVisibilityType;
  collections?: CampaignCollection[];
  onVisibilityChange?: Props["onVisibilityChange"];
  onCollectionChange?: Props["onCollectionChange"];
}) {
  return (
    <div className="flex flex-col gap-2 sm:items-end">
      <VisibilitySelect
        item={item}
        elementType={elementType}
        onVisibilityChange={onVisibilityChange}
      />
      <ElementCollectionSelect
        item={item}
        elementType={elementType}
        collections={collections}
        onCollectionChange={onCollectionChange}
      />
    </div>
  );
}

function getStatusEntries(status?: CampaignElementStatus | null) {
  if (!status) return [];

  const labels: Record<string, string> = {
    level: "Nível",
    hp: "HP",
    mana: "Mana",
    atk: "ATK",
    def: "DEF",
    speed: "Velocidade",
  };

  const order = ["level", "hp", "mana", "atk", "def", "speed"];

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

function StatusPanel({ status }: { status?: CampaignElementStatus | null }) {
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

function StatusToggle({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-md border border-violet-500/30 bg-slate-950/70 px-2.5 py-1.5 text-xs font-medium text-violet-400 transition-all hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-300 sm:w-auto"
    >
      {isOpen ? "Ocultar Status" : "Ver Status"}
    </button>
  );
}

export default function ElementsSection({
  elements,
  collections = [],
  onAdd,
  onAddCollection,
  onVisibilityChange,
  onCollectionChange,
}: Props) {
  const [openGroup, setOpenGroup] = useState<string | null>("localizacoes");
  const [openCollectionByGroup, setOpenCollectionByGroup] = useState<
    Record<string, string | null>
  >({});
  const [openStatusId, setOpenStatusId] = useState<string | null>(null);

  function toggleCollection(groupKey: string, collectionKey: string) {
    setOpenCollectionByGroup((current) => ({
      ...current,
      [groupKey]: current[groupKey] === collectionKey ? null : collectionKey,
    }));
  }

  const groups = [
    {
      key: "localizacoes",
      label: "Localizações",
      icon: MapPin,
      color: "text-emerald-400",
      formKey: "localizacao" as ElementFormKey,
      elementType: "location" as ElementVisibilityType,
      items: elements.localizacoes,
      render: (item: CampaignElements["localizacoes"][number]) => (
        <div
          key={item.id ?? item.nome}
          className="flex flex-col gap-4 rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3 sm:flex-row"
        >
          <ElementImage image={item.imagem ?? item.image} alt={item.nome} />

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-medium text-amber-100">
                  {item.nome}
                </p>
                <p className="mt-0.5 text-xs text-amber-100/40">
                  {item.tipo} · {item.regiao}
                </p>
              </div>

              <ElementControls
                item={item}
                elementType="location"
                collections={collections}
                onVisibilityChange={onVisibilityChange}
                onCollectionChange={onCollectionChange}
              />
            </div>

            <p className="mt-2 text-xs leading-relaxed text-amber-100/55">
              {item.descricao}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "npcs",
      label: "NPCs",
      icon: Users,
      color: "text-violet-400",
      formKey: "npc" as ElementFormKey,
      elementType: "npc" as ElementVisibilityType,
      items: elements.npcs,
      render: (item: CampaignElements["npcs"][number]) => {
        const statusId = `npc-${item.id ?? item.name}`;
        const isStatusOpen = openStatusId === statusId;

        return (
          <div
            key={item.id ?? item.name}
            className="flex flex-col gap-4 rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3 sm:flex-row"
          >
            <ElementImage
              image={item.image ?? item.imagem}
              alt={item.name ?? item.nome ?? "NPC"}
            />

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-amber-100">
                    {item.name ?? item.nome}
                  </p>
                  <p className="mt-0.5 text-xs text-amber-100/40">
                    {item.race ?? item.raca} ·{" "}
                    {item.occupation ?? item.ocupacao}
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                  <StatusToggle
                    isOpen={isStatusOpen}
                    onClick={() =>
                      setOpenStatusId(isStatusOpen ? null : statusId)
                    }
                  />
                  <ElementControls
                    item={item}
                    elementType="npc"
                    collections={collections}
                    onVisibilityChange={onVisibilityChange}
                    onCollectionChange={onCollectionChange}
                  />
                </div>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-amber-100/55">
                {item.description ?? item.personalidade ?? item.personality}
              </p>

              {item.skills && (
                <p className="mt-2 text-xs leading-relaxed text-amber-100/45">
                  {Array.isArray(item.skills)
                    ? item.skills.join(" | ")
                    : item.skills}
                </p>
              )}

              {isStatusOpen && <StatusPanel status={item.stats} />}
            </div>
          </div>
        );
      },
    },
    {
      key: "monstros",
      label: "Monstros",
      icon: Skull,
      color: "text-rose-400",
      formKey: "monstro" as ElementFormKey,
      elementType: "monster" as ElementVisibilityType,
      items: elements.monstros,
      render: (item: CampaignElements["monstros"][number]) => {
        const statusId = `monster-${item.id ?? item.name}`;
        const isStatusOpen = openStatusId === statusId;

        return (
          <div
            key={item.id ?? item.name}
            className="flex flex-col gap-4 rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3 sm:flex-row"
          >
            <ElementImage
              image={item.image ?? item.imagem}
              alt={item.name ?? item.nome ?? "Monstro"}
            />

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-amber-100">
                    {item.name ?? item.nome}
                  </p>
                  <p className="mt-0.5 text-xs text-amber-100/40">
                    {item.type ?? item.tipo} · Ameaça{" "}
                    {item.threat ?? item.ameaca}
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                  <StatusToggle
                    isOpen={isStatusOpen}
                    onClick={() =>
                      setOpenStatusId(isStatusOpen ? null : statusId)
                    }
                  />
                  <ElementControls
                    item={item}
                    elementType="monster"
                    collections={collections}
                    onVisibilityChange={onVisibilityChange}
                    onCollectionChange={onCollectionChange}
                  />
                </div>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-amber-100/55">
                {item.habilidades ||
                  (Array.isArray(item.skills)
                    ? item.skills.join(" | ")
                    : item.skills)}
              </p>

              {item.description || item.descricao ? (
                <p className="mt-2 text-xs leading-relaxed text-amber-100/45">
                  {item.description ?? item.descricao}
                </p>
              ) : null}

              {isStatusOpen && <StatusPanel status={item.stats} />}
            </div>
          </div>
        );
      },
    },
    {
      key: "itens",
      label: "Itens",
      icon: Gem,
      color: "text-sky-400",
      formKey: "item" as ElementFormKey,
      elementType: "item" as ElementVisibilityType,
      items: elements.itens,
      render: (item: CampaignElements["itens"][number]) => (
        <div
          key={item.id ?? item.nome}
          className="rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-amber-100">{item.nome}</p>
              <p className="mt-0.5 text-xs text-amber-100/40">{item.tipo}</p>
            </div>

            <ElementControls
              item={item}
              elementType="item"
              collections={collections}
              onVisibilityChange={onVisibilityChange}
              onCollectionChange={onCollectionChange}
            />
          </div>

          <p className="mt-2 text-xs leading-relaxed text-amber-100/55">
            {item.descricao}
          </p>
        </div>
      ),
    },
    {
      key: "eventos",
      label: "Eventos",
      icon: CalendarDays,
      color: "text-orange-400",
      formKey: "evento" as ElementFormKey,
      elementType: "event" as ElementVisibilityType,
      items: elements.eventos,
      render: (item: CampaignElements["eventos"][number]) => (
        <div
          key={item.id ?? item.titulo}
          className="rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-amber-100">
                {item.titulo}
              </p>
              <p className="mt-0.5 text-xs text-amber-100/40">
                {item.cronologia} · {item.data}
              </p>
            </div>

            <ElementControls
              item={item}
              elementType="event"
              collections={collections}
              onVisibilityChange={onVisibilityChange}
              onCollectionChange={onCollectionChange}
            />
          </div>

          <p className="mt-2 text-xs leading-relaxed text-amber-100/55">
            {item.descricao}
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <div className="mb-2 flex flex-col gap-3 text-xs text-amber-100/35 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-3.5 w-3.5" />
          Elementos da campanha organizados por conjunto.
        </div>

        {onAddCollection && (
          <button
            type="button"
            onClick={onAddCollection}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-300 transition hover:bg-amber-500/20"
          >
            <FolderTree className="h-3.5 w-3.5" />
            Criar Conjunto
          </button>
        )}
      </div>

      {groups.map(
        ({ key, label, icon: Icon, color, formKey, items, render }) => {
          const groupedItems = groupItemsByCollection(
            items as any[],
            collections,
          );
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
                  <button
                    type="button"
                    onClick={() => onAdd(formKey)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-amber-500/25 bg-slate-950/30 px-3 py-2 text-xs font-medium text-amber-300/80 transition hover:bg-amber-500/10"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Adicionar {label.slice(0, -1)}
                  </button>

                  {items.length === 0 ? (
                    <p className="py-3 text-center text-xs text-amber-100/30">
                      Nenhum registro cadastrado.
                    </p>
                  ) : (
                    groupedItems.map((collectionGroup) => {
                      const collectionKey = `${key}-${collectionGroup.id}`;
                      const isCollectionOpen = openCollection === collectionKey;

                      return (
                        <div
                          key={collectionKey}
                          className="overflow-hidden rounded-xl border"
                          style={{
                            borderColor: hexToRgba(collectionGroup.color, 0.55),
                            background: `linear-gradient(135deg, ${hexToRgba(
                              collectionGroup.color,
                              0.22,
                            )} 0%, rgba(15, 23, 42, 0.58) 72%)`,
                            boxShadow: `0 0 18px ${hexToRgba(collectionGroup.color, 0.08)}`,
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => toggleCollection(key, collectionKey)}
                            className="flex w-full items-center gap-2 px-3 py-2.5 text-left"
                          >
                            <FolderTree className="h-3.5 w-3.5 text-amber-400/70" />
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
                            <div
                              className="space-y-2 border-t p-3"
                              style={{
                                borderColor: hexToRgba(
                                  collectionGroup.color,
                                  0.35,
                                ),
                                backgroundColor: "rgba(2, 6, 23, 0.18)",
                              }}
                            >
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
        },
      )}
    </div>
  );
}
