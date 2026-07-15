import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Gem,
  ImageIcon,
  MapPin,
  Plus,
  Skull,
  Users,
  Zap,
} from "lucide-react";

import { useState } from "react";

import type {
  CampaignElementStatus,
  CampaignElements,
} from "../../../types/masterCampaign";

type ElementFormKey = "localizacao" | "npc" | "monstro" | "item" | "evento";
type ElementVisibilityType = "location" | "npc" | "monster" | "item" | "event";

type Props = {
  elements: CampaignElements;
  onAdd: (type: ElementFormKey) => void;
  onVisibilityChange?: (
    elementType: ElementVisibilityType,
    elementId: string | number,
    visibleToPlayers: boolean,
  ) => void | Promise<void>;
};

type VisibilityTarget = {
  id?: string | number;
  visible_to_players?: boolean;
  visibleToPlayers?: boolean;
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

function ElementImage({ image, alt }: { image?: string | null; alt: string }) {
  const imageSrc = getImageSrc(image);

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
  onAdd,
  onVisibilityChange,
}: Props) {
  const [openGroup, setOpenGroup] = useState<string | null>("localizacoes");
  const [openStatusId, setOpenStatusId] = useState<string | null>(null);

  const groups = [
    {
      key: "localizacoes",
      label: "Localizações",
      icon: MapPin,
      color: "text-emerald-400",
      formKey: "localizacao" as ElementFormKey,
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
                <p className="text-sm font-medium text-amber-100">{item.nome}</p>
                <p className="mt-0.5 text-xs text-amber-100/40">
                  {item.tipo} · {item.regiao}
                </p>
              </div>

              <VisibilitySelect
                item={item}
                elementType="location"
                onVisibilityChange={onVisibilityChange}
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
      items: elements.npcs,
      render: (item: CampaignElements["npcs"][number]) => {
        const statusId = `npc-${item.id ?? item.name}`;
        const isStatusOpen = openStatusId === statusId;

        return (
          <div
            key={item.id ?? item.name}
            className="flex flex-col gap-4 rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3 sm:flex-row"
          >
            <ElementImage image={item.image} alt={item.name} />

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-amber-100">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs text-amber-100/40">
                    {item.race} · {item.occupation}
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                  <VisibilitySelect
                    item={item}
                    elementType="npc"
                    onVisibilityChange={onVisibilityChange}
                  />
                  <StatusToggle
                    isOpen={isStatusOpen}
                    onClick={() => setOpenStatusId(isStatusOpen ? null : statusId)}
                  />
                </div>
              </div>

              <p className="mt-2 text-xs text-amber-100/55">
                {item.personality}
              </p>

              {isStatusOpen && <StatusPanel status={item.stats} />}

              {item.secret && (
                <div className="mt-2 rounded-lg border border-rose-900/25 bg-rose-900/15 px-3 py-2">
                  <p className="flex items-center gap-1.5 text-xs text-rose-300/70">
                    <Zap className="h-3 w-3" />
                    Segredo visível apenas ao Mestre
                  </p>

                  <p className="mt-0.5 text-xs text-amber-100/50">
                    {item.secret}
                  </p>
                </div>
              )}
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
      items: elements.monstros,
      render: (item: CampaignElements["monstros"][number]) => {
        const statusId = `monster-${item.id ?? item.name}`;
        const isStatusOpen = openStatusId === statusId;
        const skills = Array.isArray(item.skills)
          ? item.skills.join(" | ")
          : item.skills || item.habilidades || "";

        return (
          <div
            key={item.id ?? item.name}
            className="flex flex-col gap-4 rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3 sm:flex-row"
          >
            <ElementImage image={item.image} alt={item.name ?? "Monstro"} />

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-amber-100">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs text-amber-100/40">
                    {item.type} · Ameaça {item.threat}
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                  <VisibilitySelect
                    item={item}
                    elementType="monster"
                    onVisibilityChange={onVisibilityChange}
                  />
                  <StatusToggle
                    isOpen={isStatusOpen}
                    onClick={() => setOpenStatusId(isStatusOpen ? null : statusId)}
                  />
                </div>
              </div>

              {skills && <p className="mt-2 text-xs text-amber-100/55">{skills}</p>}

              <p className="mt-1 text-xs leading-relaxed text-amber-100/45">
                {item.description}
              </p>

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

            <VisibilitySelect
              item={item}
              elementType="item"
              onVisibilityChange={onVisibilityChange}
            />
          </div>

          <p className="mt-1 text-xs text-amber-100/55">{item.descricao}</p>
        </div>
      ),
    },
    {
      key: "eventos",
      label: "Eventos",
      icon: CalendarDays,
      color: "text-orange-400",
      formKey: "evento" as ElementFormKey,
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

            <VisibilitySelect
              item={item}
              elementType="event"
              onVisibilityChange={onVisibilityChange}
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
      {groups.map(
        ({ key, label, icon: Icon, color, formKey, items, render }) => (
          <div
            key={key}
            className="overflow-hidden rounded-xl border border-amber-900/20 bg-slate-900/40"
          >
            <div className="flex items-center px-4 py-3">
              <button
                className="flex flex-1 items-center gap-2 text-left"
                onClick={() => setOpenGroup(openGroup === key ? null : key)}
              >
                <Icon className={`h-4 w-4 ${color}`} />

                <span className="text-sm font-medium text-amber-100">
                  {label}
                </span>

                <span className="ml-1 text-xs text-amber-100/35">
                  ({items.length})
                </span>

                <span className="ml-2">
                  {openGroup === key ? (
                    <ChevronUp className="h-4 w-4 text-amber-100/40" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-amber-100/40" />
                  )}
                </span>
              </button>

              <button
                onClick={() => onAdd(formKey)}
                className="ml-2 flex items-center gap-1 rounded-lg border border-amber-700/40 bg-amber-500/5 px-2.5 py-1.5 text-xs text-amber-400 transition-all hover:border-amber-500/60 hover:bg-amber-500/15 hover:text-amber-300"
              >
                <Plus className="h-3 w-3" />
                Adicionar
              </button>
            </div>

            {openGroup === key && (
              <div className="space-y-2 border-t border-amber-900/15 px-4 pb-4 pt-3">
                {items.length === 0 ? (
                  <p className="py-3 text-center text-xs text-amber-100/30">
                    Nenhum elemento adicionado ainda.
                  </p>
                ) : (
                  items.map((item) => render(item as never))
                )}
              </div>
            )}
          </div>
        ),
      )}
    </div>
  );
}
