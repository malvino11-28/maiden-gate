import { Backpack, Gem, Scroll, Shield, Star, Swords, Zap } from "lucide-react";
import type { ElementType } from "react";

import type { PlayerInventoryItem } from "../../../types/player";

type Props = {
  inventory: PlayerInventoryItem[];
};

const typeIcons: Record<string, ElementType> = {
  Catalisador: Zap,
  Consumível: Star,
  Armadura: Shield,
  Arma: Swords,
  Misc: Scroll,
  Moeda: Gem,
};

export default function PlayerInventorySection({ inventory }: Props) {
  const total = inventory.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <div className="space-y-3">
      <div className="mb-1 flex items-center justify-between text-sm">
        <p className="text-amber-100/60">
          Total de itens: <span className="font-medium text-amber-300">{total}</span>
        </p>
      </div>

      {inventory.map((item) => {
        const Icon = typeIcons[item.tipo] ?? Backpack;

        return (
          <article key={item.nome} className="flex items-start gap-3 rounded-xl border border-amber-900/20 bg-slate-900/50 px-4 py-3">
            <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/15 to-rose-600/15">
              <Icon className="h-4 w-4 text-amber-400" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-amber-100">{item.nome}</p>
                <span className="text-xs text-amber-100/35">{item.tipo}</span>
                <span className="ml-auto text-xs font-semibold text-amber-300">×{item.quantidade}</span>
              </div>
              <p className="mt-0.5 text-xs leading-relaxed text-amber-100/50">{item.descricao}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
