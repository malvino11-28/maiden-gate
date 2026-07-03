import { useState } from "react";
import { Backpack, CalendarDays, ChevronDown, ChevronUp, Gem, MapPin, Scroll, Skull, Users } from "lucide-react";

import type { PlayerCampaignElements } from "../../../types/player";

type Props = {
  elements: PlayerCampaignElements;
};

export default function PlayerElementsSection({ elements }: Props) {
  const [openGroup, setOpenGroup] = useState<string | null>("localizacoes");

  const groups = [
    {
      key: "localizacoes",
      label: "Localizações Conhecidas",
      icon: MapPin,
      color: "text-emerald-400",
      items: elements.localizacoes,
      render: (item: PlayerCampaignElements["localizacoes"][number]) => (
        <article key={item.nome} className="rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3">
          <p className="text-sm font-medium text-amber-100">{item.nome}</p>
          <p className="mt-0.5 text-xs text-amber-100/40">{item.tipo} · {item.regiao}</p>
          <p className="mt-2 text-xs leading-relaxed text-amber-100/55">{item.descricao}</p>
        </article>
      ),
    },
    {
      key: "npcs",
      label: "NPCs Encontrados",
      icon: Users,
      color: "text-violet-400",
      items: elements.npcs,
      render: (item: PlayerCampaignElements["npcs"][number]) => (
        <article key={item.nome} className="rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3">
          <p className="text-sm font-medium text-amber-100">{item.nome}</p>
          <p className="mt-0.5 text-xs text-amber-100/40">{item.raca} · {item.ocupacao}</p>
          <p className="mt-2 text-xs leading-relaxed text-amber-100/55">{item.personalidade}</p>
        </article>
      ),
    },
    {
      key: "monstros",
      label: "Bestiário Visto",
      icon: Skull,
      color: "text-rose-400",
      items: elements.monstros,
      render: (item: PlayerCampaignElements["monstros"][number]) => (
        <article key={item.nome} className="rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3">
          <p className="text-sm font-medium text-amber-100">{item.nome}</p>
          <p className="mt-0.5 text-xs text-amber-100/40">{item.tipo} · Ameaça {item.ameaca}</p>
          <p className="mt-2 text-xs leading-relaxed text-amber-100/55">{item.habilidades}</p>
        </article>
      ),
    },
    {
      key: "itens",
      label: "Itens de Lore",
      icon: Gem,
      color: "text-sky-400",
      items: elements.itens,
      render: (item: PlayerCampaignElements["itens"][number]) => (
        <article key={item.nome} className="rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3">
          <p className="text-sm font-medium text-amber-100">{item.nome}</p>
          <p className="mt-0.5 text-xs text-amber-100/40">{item.tipo}</p>
          <p className="mt-2 text-xs leading-relaxed text-amber-100/55">{item.descricao}</p>
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
        <article key={item.titulo} className="rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3">
          <p className="text-sm font-medium text-amber-100">{item.titulo}</p>
          <p className="mt-0.5 text-xs text-amber-100/40">{item.cronologia} · {item.data}</p>
          <p className="mt-2 text-xs leading-relaxed text-amber-100/55">{item.descricao}</p>
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
        <div key={key} className="overflow-hidden rounded-xl border border-amber-900/20 bg-slate-900/40">
          <button className="flex w-full items-center gap-2 px-4 py-3 text-left" onClick={() => setOpenGroup(openGroup === key ? null : key)}>
            <Icon className={`h-4 w-4 ${color}`} />
            <span className="text-sm font-medium text-amber-100">{label}</span>
            <span className="text-xs text-amber-100/35">({items.length})</span>
            <span className="ml-auto">
              {openGroup === key ? <ChevronUp className="h-4 w-4 text-amber-100/40" /> : <ChevronDown className="h-4 w-4 text-amber-100/40" />}
            </span>
          </button>

          {openGroup === key && (
            <div className="space-y-2 border-t border-amber-900/15 px-4 pb-4 pt-3">
              {items.length === 0 ? (
                <p className="py-3 text-center text-xs text-amber-100/30">Nenhum registro visível ainda.</p>
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
