import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Gem,
  MapPin,
  Plus,
  Skull,
  Users,
  Zap,
  ImageIcon,
} from "lucide-react";

import { useState } from "react";

import type { CampaignElements } from "../../../types/masterCampaign";
import type { ElementFormKey } from "../../../data/elementForms";

type Props = {
  elements: CampaignElements;
  onAdd: (type: ElementFormKey) => void;
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

export default function ElementsSection({ elements, onAdd }: Props) {
  const [openGroup, setOpenGroup] = useState<string | null>("localizacoes");

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
          key={item.nome}
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
      render: (item: CampaignElements["npcs"][number]) => (
        <div
          key={item.nome}
          className="flex gap-4 rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3"
        >
          <ElementImage image={item.imagem ?? item.image} alt={item.nome} />

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-amber-100">{item.nome}</p>
            <p className="mt-0.5 text-xs text-amber-100/40">
              {item.raca} · {item.ocupacao}
            </p>
            <p className="mt-2 text-xs text-amber-100/55">
              {item.personalidade}
            </p>

            {item.segredo && (
              <div className="mt-2 rounded-lg border border-rose-900/25 bg-rose-900/15 px-3 py-2">
                <p className="flex items-center gap-1.5 text-xs text-rose-300/70">
                  <Zap className="h-3 w-3" />
                  Segredo visível apenas ao Mestre
                </p>

                <p className="mt-0.5 text-xs text-amber-100/50">
                  {item.segredo}
                </p>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "monstros",
      label: "Monstros",
      icon: Skull,
      color: "text-rose-400",
      formKey: "monstro" as ElementFormKey,
      items: elements.monstros,
      render: (item: CampaignElements["monstros"][number]) => (
        <div
          key={item.nome}
          className="flex gap-4 rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3"
        >
          <ElementImage image={item.imagem ?? item.image} alt={item.nome} />

          <div className="min-w-0">
            <p className="text-sm font-medium text-amber-100">{item.nome}</p>
            <p className="mt-0.5 text-xs text-amber-100/40">
              {item.tipo} · Ameaça {item.ameaca}
            </p>
            <p className="mt-1 text-xs text-amber-100/55">{item.habilidades}</p>
            <p className="mt-1 text-xs leading-relaxed text-amber-100/45">
              {item.descricao}
            </p>
          </div>
        </div>
      ),
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
          key={item.nome}
          className="rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3"
        >
          <p className="text-sm font-medium text-amber-100">{item.nome}</p>
          <p className="mt-0.5 text-xs text-amber-100/40">{item.tipo}</p>
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
          key={item.titulo}
          className="rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3"
        >
          <p className="text-sm font-medium text-amber-100">{item.titulo}</p>
          <p className="mt-0.5 text-xs text-amber-100/40">
            {item.cronologia} · {item.data}
          </p>
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
                className="
                ml-2
                flex
                items-center
                gap-1
                rounded-lg
                border
                border-amber-700/40
                bg-amber-500/5
                px-2.5
                py-1.5
                text-xs
                text-amber-400
                transition-all
                hover:border-amber-500/60
                hover:bg-amber-500/15
                hover:text-amber-300
              "
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
