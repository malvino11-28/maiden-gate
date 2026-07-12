import { useState } from "react";
import {
  Backpack,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Gem,
  ImageIcon,
  MapPin,
  Scroll,
  Skull,
  Users,
} from "lucide-react";

import type {
  PlayerCampaignElements,
  PlayerElementStatus,
} from "../../../types/player";

type Props = {
  elements: PlayerCampaignElements;
};

function getImageSrc(image?: string | null) {
  if (!image) return "";

  if (image.startsWith("http") || image.startsWith("/")) {
    return image;
  }

  return `http://127.0.0.1:8000/storage/${image}`;
}

function ElementImage({ image, alt }: { image?: string | null; alt: string }) {
  const imageSrc = getImageSrc(image);

  if (!imageSrc) {
    return (
      <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg border border-amber-900/20 bg-slate-950/50 text-amber-100/20">
        <ImageIcon className="h-6 w-6" />
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className="h-24 w-24 flex-shrink-0 rounded-lg object-cover"
    />
  );
}

function getStatusEntries(status?: PlayerElementStatus | null) {
  if (!status) return [];

  const labels: Record<string, string> = {
    level: "Nível",
    hp: "HP",
    mana: "Mana",
    atk: "ATK",
    def: "DEF",
    speed: "Velocidade",
  };

  return Object.entries(status)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(([key, value]) => ({
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
    <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg border border-violet-500/20 bg-violet-500/5 p-3 sm:grid-cols-3">
      {entries.map((entry) => (
        <div
          key={entry.label}
          className="rounded-md border border-amber-900/20 bg-slate-950/50 px-3 py-2"
        >
          <p className="text-[10px] uppercase tracking-wider text-amber-100/35">
            {entry.label}
          </p>
          <p className="text-sm font-semibold text-amber-100">
            {entry.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function PlayerElementsSection({ elements }: Props) {
  const [openGroup, setOpenGroup] = useState<string | null>("localizacoes");
  const [openStatusId, setOpenStatusId] = useState<string | null>(null);

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
          className="flex gap-4 rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3"
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
            className="relative flex gap-4 rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3"
          >
            <button
              type="button"
              onClick={() => setOpenStatusId(isStatusOpen ? null : statusId)}
              className="absolute right-2 top-2 z-10 rounded-md border border-violet-500/30 bg-slate-950/80 px-1.5 py-0.5 text-[10px] font-medium text-violet-400 transition-all hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-300"
            >
              {isStatusOpen ? "Ocultar Status" : "Ver Status"}
            </button>

            <ElementImage image={item.imagem} alt={item.nome} />

            <div className="min-w-0 flex-1 pr-20">
              <p className="text-sm font-medium text-amber-100">{item.nome}</p>
              <p className="mt-0.5 text-xs text-amber-100/40">
                {item.raca} · {item.ocupacao}
              </p>

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
            className="relative flex gap-4 rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3"
          >
            <button
              type="button"
              onClick={() => setOpenStatusId(isStatusOpen ? null : statusId)}
              className="absolute right-2 top-2 z-10 rounded-md border border-violet-500/30 bg-slate-950/80 px-1.5 py-0.5 text-[10px] font-medium text-violet-400 transition-all hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-300"
            >
              {isStatusOpen ? "Ocultar Status" : "Ver Status"}
            </button>

            <ElementImage image={item.imagem} alt={item.nome} />

            <div className="min-w-0 flex-1 pr-20">
              <p className="text-sm font-medium text-amber-100">{item.nome}</p>
              <p className="mt-0.5 text-xs text-amber-100/40">
                {item.tipo} · Ameaça {item.ameaca}
              </p>
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
        <Scroll className="h-3.5 w-3.5" />
        Elementos visíveis para jogadores nesta campanha.
      </div>

      {groups.map(({ key, label, icon: Icon, color, items, render }) => (
        <div
          key={key}
          className="overflow-hidden rounded-xl border border-amber-900/20 bg-slate-900/40"
        >
          <button
            className="flex w-full items-center gap-2 px-4 py-3 text-left"
            onClick={() => setOpenGroup(openGroup === key ? null : key)}
          >
            <Icon className={`h-4 w-4 ${color}`} />
            <span className="text-sm font-medium text-amber-100">{label}</span>
            <span className="text-xs text-amber-100/35">({items.length})</span>
            <span className="ml-auto">
              {openGroup === key ? (
                <ChevronUp className="h-4 w-4 text-amber-100/40" />
              ) : (
                <ChevronDown className="h-4 w-4 text-amber-100/40" />
              )}
            </span>
          </button>

          {openGroup === key && (
            <div className="space-y-2 border-t border-amber-900/15 px-4 pb-4 pt-3">
              {items.length === 0 ? (
                <p className="py-3 text-center text-xs text-amber-100/30">
                  Nenhum registro visível ainda.
                </p>
              ) : (
                items.map((item) => render(item as never))
              )}
            </div>
          )}
        </div>
      ))}

      <div className="rounded-xl border border-amber-900/20 bg-slate-900/30 p-4 text-xs text-amber-100/35">
        <Backpack className="mr-2 inline h-3.5 w-3.5 text-amber-400" />
        Segredos do mestre e informações não descobertas não aparecem nesta lista.
      </div>
    </div>
  );
}
