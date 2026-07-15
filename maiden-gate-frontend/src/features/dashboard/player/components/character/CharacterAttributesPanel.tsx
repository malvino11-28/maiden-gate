import { Minus, Plus } from "lucide-react";

import {
  baseAttributeValue,
  characterAttributes,
  extraPoints,
} from "../../data/characterFormMock";
import type { AttributeKey } from "../../types/player";

type Props = {
  attributes: Record<AttributeKey, number>;
  onChange: (attributes: Record<AttributeKey, number>) => void;

  minimumAttributes?: Record<AttributeKey, number>;
  pointLimit?: number;
  circleLimit?: number;
};

export default function CharacterAttributesPanel({
  attributes,
  onChange,
  minimumAttributes,
  pointLimit = extraPoints,
  circleLimit = 50,
}: Props) {
  const baseAttributes =
    minimumAttributes ??
    characterAttributes.reduce(
      (acc, attribute) => {
        acc[attribute.key] = baseAttributeValue;
        return acc;
      },
      {} as Record<AttributeKey, number>,
    );

  const spentPoints = Object.entries(attributes).reduce((sum, [key, value]) => {
    const attributeKey = key as AttributeKey;
    return sum + (value - baseAttributes[attributeKey]);
  }, 0);

  const remainingPoints = pointLimit - spentPoints;

  function adjustAttribute(key: AttributeKey, delta: number) {
    const minimumValue = baseAttributes[key];
    const nextValue = attributes[key] + delta;

    if (nextValue < minimumValue) return;
    if (delta > 0 && remainingPoints <= 0) return;

    onChange({ ...attributes, [key]: nextValue });
  }

  return (
    <>
      <p className="mb-6 text-xs text-amber-100/35">
        Cada atributo começa com valores diferentes dependendo da{" "}
        <strong className="text-amber-300/60">Marca</strong>. Distribua{" "}
        <strong className="text-amber-300/60">{pointLimit} pontos</strong>{" "}
        adicionais conforme a progressão do personagem.
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {characterAttributes.map(({ key, label, nome, icon: Icon }) => {
          const value = attributes[key];
          const minimumValue = baseAttributes[key];
          const extras = value - minimumValue;
          const canDecrease = value > minimumValue;
          const canIncrease = remainingPoints > 0;

          const circleProgress = Math.min(extras / circleLimit, 1);
          const circleLength = 175.93;

          return (
            <div
              key={key}
              className="relative flex flex-col items-center gap-3 rounded-xl border border-amber-900/30 bg-slate-950/60 p-4 transition-colors hover:border-amber-700/40"
            >
              <div className="absolute left-0 top-0 h-3 w-3 rounded-tl-xl border-l border-t border-amber-700/30" />
              <div className="absolute right-0 top-0 h-3 w-3 rounded-tr-xl border-r border-t border-amber-700/30" />
              <div className="absolute bottom-0 left-0 h-3 w-3 rounded-bl-xl border-b border-l border-amber-700/30" />
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-br-xl border-b border-r border-amber-700/30" />

              <div className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 text-amber-500/60" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-600/70">
                  {label}
                </span>
              </div>

              <span className="-mt-2 text-[9px] text-amber-100/30">{nome}</span>

              <div className="relative flex h-16 w-16 items-center justify-center">
                <svg
                  className="absolute inset-0 h-full w-full -rotate-90"
                  viewBox="0 0 64 64"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="rgba(120,53,15,0.2)"
                    strokeWidth="3"
                  />

                  {extras > 0 && (
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="rgba(251,191,36,0.5)"
                      strokeWidth="3"
                      strokeDasharray={`${circleProgress * circleLength} ${circleLength}`}
                      strokeLinecap="round"
                    />
                  )}
                </svg>

                <span className="relative z-10 text-3xl font-bold leading-none text-amber-200">
                  {value}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => adjustAttribute(key, -1)}
                  disabled={!canDecrease}
                  className={`flex h-7 w-7 items-center justify-center rounded-md border transition-all ${
                    canDecrease
                      ? "border-amber-800/50 text-amber-400 hover:border-amber-600/50 hover:bg-amber-900/30"
                      : "cursor-not-allowed border-slate-800 text-slate-700"
                  }`}
                >
                  <Minus className="h-3 w-3" />
                </button>

                <button
                  type="button"
                  onClick={() => adjustAttribute(key, 1)}
                  disabled={!canIncrease}
                  className={`flex h-7 w-7 items-center justify-center rounded-md border transition-all ${
                    canIncrease
                      ? "border-amber-800/50 text-amber-400 hover:border-amber-600/50 hover:bg-amber-900/30"
                      : "cursor-not-allowed border-slate-800 text-slate-700"
                  }`}
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              {extras > 0 && (
                <span className="absolute right-2.5 top-2 text-[9px] text-amber-400/60">
                  +{extras}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 space-y-1.5">
        <div className="flex justify-between text-[10px] text-amber-100/35">
          <span>Distribuição de pontos</span>

          <span>
            {spentPoints} / {pointLimit} usados
          </span>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              remainingPoints === 0
                ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                : spentPoints > pointLimit
                  ? "bg-gradient-to-r from-rose-600 to-rose-400"
                  : "bg-gradient-to-r from-amber-600 to-amber-400"
            }`}
            style={{
              width: `${Math.min((spentPoints / pointLimit) * 100, 100)}%`,
            }}
          />
        </div>

        {spentPoints > pointLimit && (
          <p className="text-[11px] text-rose-300/70">
            Este personagem possui mais pontos distribuídos do que o limite
            visual atual. Ajuste o nível ou revise os atributos.
          </p>
        )}
      </div>
    </>
  );
}
