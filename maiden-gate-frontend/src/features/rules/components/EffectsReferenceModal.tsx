import { Search, Sparkles, X, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import {
  effectCatalog,
  effectCategories,
  type EffectCategory,
} from "../data/effectCatalog";

type Props = {
  onClose: () => void;
};

const categoryStyles: Record<EffectCategory, string> = {
  Buffs: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  Debuffs: "border-rose-500/30 bg-rose-500/10 text-rose-300",
  Controle: "border-violet-500/30 bg-violet-500/10 text-violet-300",
  Especiais: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  Marcas: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
};

export default function EffectsReferenceModal({ onClose }: Props) {
  const [activeCategory, setActiveCategory] = useState<
    EffectCategory | "Todos"
  >("Todos");
  const [search, setSearch] = useState("");
  const [openMobileCategories, setOpenMobileCategories] = useState<
    EffectCategory[]
  >([]);

  const filteredEffects = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return effectCatalog.filter((effect) => {
      const matchesCategory =
        activeCategory === "Todos" || effect.category === activeCategory;

      const matchesSearch =
        !normalizedSearch ||
        effect.name.toLowerCase().includes(normalizedSearch) ||
        effect.description.toLowerCase().includes(normalizedSearch) ||
        effect.source?.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const groupedMobileEffects = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return effectCategories.map((category) => {
      const effects = effectCatalog.filter((effect) => {
        if (effect.category !== category) return false;

        return (
          !normalizedSearch ||
          effect.name.toLowerCase().includes(normalizedSearch) ||
          effect.description.toLowerCase().includes(normalizedSearch) ||
          effect.source?.toLowerCase().includes(normalizedSearch)
        );
      });

      return {
        category,
        effects,
      };
    });
  }, [search]);

  function toggleMobileCategory(category: EffectCategory) {
    setOpenMobileCategories((previous) =>
      previous.includes(category)
        ? previous.filter((item) => item !== category)
        : [...previous, category],
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm">
      <div className="flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-amber-900/30 bg-slate-950 shadow-2xl shadow-black/60">
        <div className="flex items-start justify-between gap-4 border-b border-amber-900/25 bg-slate-900/80 px-5 py-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-amber-100">
              <Sparkles className="h-4 w-4 text-amber-400" />
              Guia de Efeitos
            </p>

            <p className="mt-1 text-xs leading-relaxed text-amber-100/45">
              Consulte rapidamente buffs, debuffs, controles e efeitos de Marca
              durante a sessão.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-amber-100/50 transition hover:border-amber-500/40 hover:text-amber-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 border-b border-amber-900/20 px-5 py-4">
          <div className="flex items-center gap-2 rounded-xl border border-amber-900/30 bg-slate-900/60 px-3 py-2">
            <Search className="h-4 w-4 text-amber-100/35" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar efeito, Marca ou descrição..."
              className="w-full bg-transparent text-sm text-amber-100 outline-none placeholder:text-amber-100/25"
            />
          </div>

          <div className="hidden flex-wrap gap-2 sm:flex">
            {(["Todos", ...effectCategories] as const).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  activeCategory === category
                    ? "border-amber-400/50 bg-amber-500/15 text-amber-200"
                    : "border-amber-900/25 bg-slate-900/60 text-amber-100/45 hover:border-amber-700/40 hover:text-amber-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden overflow-y-auto px-5 py-5 sm:block">
          {filteredEffects.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {filteredEffects.map((effect) => (
                <article
                  key={`${effect.category}-${effect.name}`}
                  className="rounded-2xl border border-amber-900/20 bg-slate-900/55 p-4"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                        categoryStyles[effect.category]
                      }`}
                    >
                      {effect.category}
                    </span>

                    {effect.source && (
                      <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-[10px] font-medium text-amber-300/80">
                        {effect.source}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-semibold text-amber-100">
                    {effect.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-amber-100/55">
                    {effect.description}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-amber-900/20 bg-slate-900/50 px-4 py-8 text-center text-sm text-amber-100/35">
              Nenhum efeito encontrado.
            </div>
          )}
        </div>

        <div className="space-y-3 overflow-y-auto px-4 py-4 sm:hidden">
          {groupedMobileEffects.map(({ category, effects }) => {
            const isOpen = openMobileCategories.includes(category);

            return (
              <section
                key={category}
                className="overflow-hidden rounded-2xl border border-amber-900/20 bg-slate-900/50"
              >
                <button
                  type="button"
                  onClick={() => toggleMobileCategory(category)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/5"
                >
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${categoryStyles[category]}`}
                  >
                    {category}
                  </span>

                  <span className="text-xs text-amber-100/35">
                    {effects.length} efeito{effects.length === 1 ? "" : "s"}
                  </span>

                  <ChevronDown
                    className={`ml-auto h-4 w-4 text-amber-100/40 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="space-y-2 border-t border-amber-900/20 bg-slate-950/30 p-3">
                    {effects.length > 0 ? (
                      effects.map((effect) => (
                        <article
                          key={`${effect.category}-${effect.name}`}
                          className="rounded-xl border border-amber-900/20 bg-slate-900/65 p-3"
                        >
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            {effect.source && (
                              <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-300/80">
                                {effect.source}
                              </span>
                            )}
                          </div>

                          <h3 className="text-sm font-semibold text-amber-100">
                            {effect.name}
                          </h3>

                          <p className="mt-1.5 text-xs leading-5 text-amber-100/55">
                            {effect.description}
                          </p>
                        </article>
                      ))
                    ) : (
                      <p className="rounded-xl border border-amber-900/20 bg-slate-900/50 px-3 py-4 text-center text-xs text-amber-100/30">
                        Nenhum efeito encontrado nesta categoria.
                      </p>
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <div className="border-t border-amber-900/20 bg-slate-900/70 px-5 py-3">
          <p className="text-xs leading-relaxed text-amber-100/35">
            Detalhes não especificados nos efeitos devem ser definidos pela
            habilidade que causou o efeito ou pela decisão do Mestre.
          </p>
        </div>
      </div>
    </div>
  );
}
