/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
  BarChart2,
  CheckCircle2,
  Heart,
  Pencil,
  Shield,
  Star,
  X,
  Zap,
} from "lucide-react";

import { getStorageImageUrl } from "../../../../../../services/apiUrl";
import type { AttributeKey, PlayerCharacterFull } from "../../../types/player";

import CharacterBattleResources from "../../character/CharacterBattleResources";
import {
  updateCharacterModifiers,
  updateCharacterProgress,
} from "../../../../services/characterCreationService";

type Props = {
  character: PlayerCharacterFull;
  onUpdated?: () => void;
};

function clampNumber(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
}

function getModifierDraft(character: PlayerCharacterFull) {
  return character.atributos.reduce<Record<AttributeKey, number>>(
    (modifiers, attribute) => {
      modifiers[attribute.key] = attribute.mod;
      return modifiers;
    },
    { POD: 0, DES: 0, RES: 0, INT: 0, DET: 0, PRE: 0 },
  );
}

export default function PlayerCharacterSection({
  character,
  onUpdated,
}: Props) {
  const [hpDraft, setHpDraft] = useState(character.hp);
  const [xpDraft, setXpDraft] = useState(character.xp);
  const [isSavingProgress, setIsSavingProgress] = useState(false);
  const [progressSaved, setProgressSaved] = useState(false);
  const [progressError, setProgressError] = useState<string | null>(null);
  const [modifierDraft, setModifierDraft] = useState(() =>
    getModifierDraft(character),
  );
  const [isEditingModifiers, setIsEditingModifiers] = useState(false);
  const [isSavingModifiers, setIsSavingModifiers] = useState(false);
  const [modifiersSaved, setModifiersSaved] = useState(false);
  const [modifierError, setModifierError] = useState<string | null>(null);

  useEffect(() => {
    setHpDraft(character.hp);
    setXpDraft(character.xp);
  }, [character.hp, character.xp]);

  useEffect(() => {
    if (!isEditingModifiers) {
      setModifierDraft(getModifierDraft(character));
    }
  }, [character, isEditingModifiers]);

  const hpMax = Math.max(character.hpMax, 1);
  const xpMax = Math.max(character.xpProximo, 1000);
  const hpPercent = Math.round((character.hp / hpMax) * 100);
  const xpPercent = Math.round((character.xp / xpMax) * 100);

  const hasProgressChanges =
    hpDraft !== character.hp || xpDraft !== character.xp;

  function handleEditModifiers() {
    setModifierDraft(getModifierDraft(character));
    setModifierError(null);
    setIsEditingModifiers(true);
  }

  function handleCancelModifiers() {
    setModifierDraft(getModifierDraft(character));
    setModifierError(null);
    setIsEditingModifiers(false);
  }

  function handleModifierChange(key: AttributeKey, value: number) {
    setModifierDraft((current) => ({
      ...current,
      [key]: clampNumber(value, -99, 99),
    }));
  }

  async function handleSaveModifiers() {
    try {
      setIsSavingModifiers(true);
      setModifierError(null);

      await updateCharacterModifiers(character.id, modifierDraft);

      setModifiersSaved(true);
      setIsEditingModifiers(false);
      setTimeout(() => setModifiersSaved(false), 1200);
      onUpdated?.();
    } catch {
      setModifierError("Não foi possível atualizar os modificadores.");
    } finally {
      setIsSavingModifiers(false);
    }
  }

  async function handleSaveProgress() {
    try {
      setIsSavingProgress(true);
      setProgressError(null);

      await updateCharacterProgress(character.id, {
        hpCurrent: clampNumber(hpDraft, 0, hpMax),
        exp: Math.max(0, xpDraft),
      });

      setProgressSaved(true);
      setTimeout(() => setProgressSaved(false), 1200);
      onUpdated?.();
    } catch {
      setProgressError("Não foi possível atualizar vida e experiência.");
    } finally {
      setIsSavingProgress(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-2xl border border-amber-900/25 bg-slate-900/50">
        <div className={`bg-gradient-to-r ${character.marcaCor} px-5 py-5`}>
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-950/30 text-3xl text-white/80">
              {character.iconImage ? (
                <img
                  src={getStorageImageUrl(character.iconImage)}
                  alt={character.nome}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{character.marcaEmoji ?? character.nome.charAt(0)}</span>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {character.nome} {character.sobrenome}
              </h2>
              <p className="text-sm text-white/70">
                Marca {character.marca} · Nível {character.nivel}
              </p>
            </div>
          </div>
        </div>

        {character.fullImage && (
          <div className="border-b border-amber-900/15 bg-slate-950/35 p-5">
            <img
              src={getStorageImageUrl(character.fullImage)}
              alt={`${character.nome} ${character.sobrenome ?? ""}`.trim()}
              className="mx-auto max-h-[420px] rounded-2xl object-contain"
            />
          </div>
        )}

        <div className="grid gap-4 p-5 md:grid-cols-3">
          <div className="rounded-xl border border-rose-900/25 bg-slate-950/40 p-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs text-amber-100/45">
              <Heart className="h-3.5 w-3.5 text-rose-400" /> Pontos de Vida
            </p>
            <p className="text-xl font-semibold text-amber-100">
              {character.hp} / {hpMax}
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full ${hpPercent > 60 ? "bg-emerald-500" : hpPercent > 30 ? "bg-amber-500" : "bg-rose-500"}`}
                style={{ width: `${Math.min(Math.max(hpPercent, 0), 100)}%` }}
              />
            </div>
          </div>

          <CharacterBattleResources
            paMax={character.paMax}
            prMax={character.prMax}
          />

          <div className="rounded-xl border border-amber-900/25 bg-slate-950/40 p-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs text-amber-100/45">
              <Star className="h-3.5 w-3.5 text-amber-400" /> Experiência
            </p>
            <p className="text-xl font-semibold text-amber-100">
              {character.xp} / {xpMax}
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-amber-500"
                style={{ width: `${Math.min(Math.max(xpPercent, 0), 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-amber-900/15 bg-slate-950/30 p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
            <label className="block">
              <span className="mb-1 block text-[11px] uppercase tracking-[0.2em] text-amber-100/35">
                Ajustar HP
              </span>
              <input
                type="number"
                min={0}
                max={hpMax}
                value={hpDraft}
                onChange={(event) =>
                  setHpDraft(clampNumber(Number(event.target.value), 0, hpMax))
                }
                className="w-full rounded-xl border border-rose-900/25 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-amber-100 outline-none transition focus:border-rose-400/50"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[11px] uppercase tracking-[0.2em] text-amber-100/35">
                Adicionar / ajustar XP
              </span>
              <input
                type="number"
                min={0}
                value={xpDraft}
                onChange={(event) =>
                  setXpDraft(Math.max(0, Number(event.target.value) || 0))
                }
                className="w-full rounded-xl border border-amber-900/25 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-amber-100 outline-none transition focus:border-amber-400/50"
              />
            </label>

            <div className="flex items-end">
              <button
                type="button"
                disabled={!hasProgressChanges || isSavingProgress}
                onClick={handleSaveProgress}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/20 disabled:cursor-not-allowed disabled:opacity-45 md:w-auto"
              >
                {progressSaved ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Salvo
                  </>
                ) : isSavingProgress ? (
                  "Salvando..."
                ) : (
                  "Salvar"
                )}
              </button>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-amber-100/35">
            Ao atingir 1000 de experiência, o contador volta para 0 e o nível
            sobe em 1. Novos níveis liberam pontos de atributo na edição da
            ficha.
          </p>

          {progressError && (
            <p className="mt-3 text-sm text-rose-300">{progressError}</p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-amber-900/25 bg-slate-900/50 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-100/60">
            <BarChart2 className="h-4 w-4 text-amber-400" /> Atributos
          </h3>

          {!isEditingModifiers && (
            <button
              type="button"
              onClick={handleEditModifiers}
              className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-300 transition hover:bg-amber-500/20"
            >
              <Pencil className="h-3.5 w-3.5" />
              Editar modificadores
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {character.atributos.map((attribute) => (
            <div
              key={attribute.key}
              className="rounded-xl bg-slate-800/50 p-3 text-center"
            >
              <p className="mb-1 text-xs uppercase tracking-wide text-amber-100/40">
                {attribute.nome}
              </p>
              <p className="text-xl font-bold text-amber-100">
                {attribute.valor}
              </p>

              {isEditingModifiers ? (
                <label className="mt-2 block">
                  <span className="sr-only">
                    Modificador de {attribute.nome}
                  </span>
                  <input
                    type="number"
                    min={-99}
                    max={99}
                    value={modifierDraft[attribute.key]}
                    onChange={(event) =>
                      handleModifierChange(
                        attribute.key,
                        Number(event.target.value) || 0,
                      )
                    }
                    className="w-full rounded-lg border border-amber-500/25 bg-slate-950/60 px-2 py-1.5 text-center text-sm font-semibold text-amber-100 outline-none transition focus:border-amber-400/60"
                  />
                </label>
              ) : (
                <p
                  className={`text-xs font-medium ${attribute.mod >= 0 ? "text-emerald-400" : "text-rose-400"}`}
                >
                  {attribute.mod >= 0 ? "+" : ""}
                  {attribute.mod}
                </p>
              )}
            </div>
          ))}
        </div>

        {isEditingModifiers && (
          <div className="mt-4 flex flex-wrap justify-end gap-2 border-t border-amber-900/15 pt-4">
            <button
              type="button"
              disabled={isSavingModifiers}
              onClick={handleCancelModifiers}
              className="flex items-center gap-2 rounded-xl border border-slate-600/50 px-4 py-2 text-sm font-semibold text-amber-100/60 transition hover:bg-slate-800/70 disabled:opacity-50"
            >
              <X className="h-4 w-4" />
              Cancelar
            </button>
            <button
              type="button"
              disabled={isSavingModifiers}
              onClick={handleSaveModifiers}
              className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSavingModifiers ? "Salvando..." : "Salvar modificadores"}
            </button>
          </div>
        )}

        {modifiersSaved && (
          <p className="mt-3 flex items-center gap-2 text-sm text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            Modificadores atualizados.
          </p>
        )}

        {modifierError && (
          <p className="mt-3 text-sm text-rose-300">{modifierError}</p>
        )}
      </div>

      <div className="rounded-2xl border border-amber-900/25 bg-slate-900/50 p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-100/60">
          <Shield className="h-4 w-4 text-amber-400" /> Habilidades da Marca
        </h3>
        <div className="space-y-3">
          {character.habilidades.map((skill) => (
            <div
              key={skill.nome}
              className="rounded-xl bg-slate-800/50 px-4 py-3"
            >
              <div className="mb-1 flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                <p className="text-sm font-medium text-amber-100">
                  {skill.nome}
                </p>
                <span
                  className={`ml-auto rounded-full border px-2 py-0.5 text-xs ${
                    skill.tipo === "Ativa"
                      ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                      : skill.tipo === "Passiva"
                        ? "border-slate-500/30 bg-slate-500/15 text-slate-400"
                        : "border-violet-500/30 bg-violet-500/10 text-violet-300"
                  }`}
                >
                  {skill.tipo}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-amber-100/55">
                {skill.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
