import { useMemo, useState } from "react";
import {
  Backpack,
  Gem,
  Minus,
  Plus,
  Scroll,
  Shield,
  Star,
  Swords,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import type { ElementType } from "react";

import type {
  PlayerCampaignElementItem,
  PlayerInventoryItem,
} from "../../../types/player";

type Props = {
  inventory: PlayerInventoryItem[];
  campaignItems?: PlayerCampaignElementItem[];
  onAddItem?: (itemId: number, quantity: number) => Promise<void>;
  onUpdateQuantity?: (inventoryId: number, quantity: number) => Promise<void>;
  onDeleteItem?: (inventoryId: number) => Promise<void>;
};

const typeIcons: Record<string, ElementType> = {
  Catalisador: Zap,
  Consumível: Star,
  Armadura: Shield,
  Arma: Swords,
  Misc: Scroll,
  Moeda: Gem,
  Artefato: Gem,
};

export default function PlayerInventorySection({
  inventory,
  campaignItems = [],
  onAddItem,
  onUpdateQuantity,
  onDeleteItem,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = inventory.reduce((sum, item) => sum + item.quantidade, 0);

  const selectedItem = useMemo(
    () => campaignItems.find((item) => String(item.id) === selectedItemId),
    [campaignItems, selectedItemId],
  );

  async function handleAddItem() {
    if (!onAddItem) return;

    const itemId = Number(selectedItemId);
    if (!itemId) {
      setError("Selecione um item da campanha.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      await onAddItem(itemId, quantity);
      setSelectedItemId("");
      setQuantity(1);
      setIsModalOpen(false);
    } catch {
      setError("Não foi possível adicionar o item.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleChangeQuantity(item: PlayerInventoryItem, nextQuantity: number) {
    if (!onUpdateQuantity || !item.inventoryId) return;

    try {
      await onUpdateQuantity(item.inventoryId, Math.max(0, nextQuantity));
    } catch {
      setError("Não foi possível alterar a quantidade.");
    }
  }

  async function handleDeleteItem(item: PlayerInventoryItem) {
    if (!onDeleteItem || !item.inventoryId) return;

    try {
      await onDeleteItem(item.inventoryId);
    } catch {
      setError("Não foi possível remover o item.");
    }
  }

  return (
    <div className="space-y-3">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="text-amber-100/60">
          Total de itens: <span className="font-medium text-amber-300">{total}</span>
        </p>

        <button
          type="button"
          onClick={() => {
            setError(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-1.5 rounded-lg border border-amber-700/40 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-300 transition hover:border-amber-500/60 hover:bg-amber-500/15"
        >
          <Plus className="h-3.5 w-3.5" />
          Adicionar item
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      )}

      {inventory.length === 0 ? (
        <div className="rounded-xl border border-dashed border-amber-900/25 bg-slate-900/40 px-6 py-10 text-center">
          <Backpack className="mx-auto mb-3 h-9 w-9 text-amber-900/50" />
          <p className="text-sm text-amber-100/35">
            Seu personagem ainda não possui itens no inventário.
          </p>
        </div>
      ) : (
        inventory.map((item) => {
          const Icon = typeIcons[item.tipo] ?? Backpack;

          return (
            <article
              key={item.inventoryId ?? item.nome}
              className="flex items-start gap-3 rounded-xl border border-amber-900/20 bg-slate-900/50 px-4 py-3"
            >
              <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/15 to-rose-600/15">
                <Icon className="h-4 w-4 text-amber-400" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-amber-100">{item.nome}</p>
                  <span className="text-xs text-amber-100/35">{item.tipo}</span>
                  <span className="ml-auto text-xs font-semibold text-amber-300">
                    ×{item.quantidade}
                  </span>
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-amber-100/50">
                  {item.descricao}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleChangeQuantity(item, item.quantidade - 1)}
                    className="flex items-center gap-1 rounded-md border border-amber-900/30 bg-slate-950/50 px-2 py-1 text-xs text-amber-100/50 transition hover:border-amber-500/40 hover:text-amber-300"
                  >
                    <Minus className="h-3 w-3" />
                    Remover 1
                  </button>

                  <button
                    type="button"
                    onClick={() => handleChangeQuantity(item, item.quantidade + 1)}
                    className="flex items-center gap-1 rounded-md border border-amber-900/30 bg-slate-950/50 px-2 py-1 text-xs text-amber-100/50 transition hover:border-amber-500/40 hover:text-amber-300"
                  >
                    <Plus className="h-3 w-3" />
                    Adicionar 1
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item)}
                    className="ml-auto flex items-center gap-1 rounded-md border border-rose-500/25 bg-rose-500/10 px-2 py-1 text-xs text-rose-300 transition hover:border-rose-400/40 hover:bg-rose-500/20"
                  >
                    <Trash2 className="h-3 w-3" />
                    Excluir
                  </button>
                </div>
              </div>
            </article>
          );
        })
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-amber-900/30 bg-slate-900 p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-amber-100">
                  Adicionar item ao inventário
                </h3>
                <p className="mt-1 text-sm text-amber-100/40">
                  Escolha um item cadastrado pelo mestre nesta campanha.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-2 text-amber-100/35 transition hover:bg-slate-800 hover:text-amber-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider text-amber-100/40">
                  Item
                </label>
                <select
                  value={selectedItemId}
                  onChange={(event) => setSelectedItemId(event.target.value)}
                  className="w-full rounded-xl border border-amber-900/30 bg-slate-950/70 px-4 py-3 text-sm text-amber-100 outline-none transition focus:border-amber-500/50"
                >
                  <option value="">Selecione um item</option>
                  {campaignItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nome} — {item.tipo}
                    </option>
                  ))}
                </select>
              </div>

              {selectedItem && (
                <div className="rounded-xl border border-amber-900/20 bg-slate-950/40 px-4 py-3 text-sm text-amber-100/55">
                  {selectedItem.descricao || "Sem descrição."}
                </div>
              )}

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider text-amber-100/40">
                  Quantidade
                </label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(Math.max(1, Number(event.target.value) || 1))
                  }
                  className="w-full rounded-xl border border-amber-900/30 bg-slate-950/70 px-4 py-3 text-sm text-amber-100 outline-none transition focus:border-amber-500/50"
                />
              </div>

              {campaignItems.length === 0 && (
                <p className="rounded-xl border border-amber-900/20 bg-slate-950/40 px-4 py-3 text-sm text-amber-100/35">
                  Esta campanha ainda não possui itens cadastrados pelo mestre.
                </p>
              )}

              <button
                type="button"
                onClick={handleAddItem}
                disabled={isSaving || campaignItems.length === 0}
                className="w-full rounded-xl border border-amber-500/40 bg-amber-500/15 px-4 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-500/25 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving ? "Adicionando..." : "Adicionar ao inventário"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
