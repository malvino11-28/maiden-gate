import { useCallback, useEffect, useRef, useState } from "react";
import { Crown, Dice1, Hash, RefreshCw, Trash2, UserRound } from "lucide-react";

import {
  createCampaignDiceRoll,
  getCampaignDiceRolls,
  type DiceRollEntry,
  type DiceType,
} from "../../../services/diceRollService";

type Props = {
  campaignId: number | string;
  masterName: string;
  userId?: number | null;
};

export default function DiceChat({ campaignId, masterName, userId }: Props) {
  const [history, setHistory] = useState<DiceRollEntry[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [inputModifier, setInputModifier] = useState("0");
  const [isRolling, setIsRolling] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatRef = useRef<HTMLDivElement>(null);

  const diceOptions: DiceType[] = [4, 6, 8, 10, 12, 20, 100];

  const loadHistory = useCallback(async () => {
    try {
      setError(null);
      const rolls = await getCampaignDiceRolls(campaignId);
      setHistory(rolls);
    } catch {
      setError("Não foi possível atualizar o histórico de dados.");
    }
  }, [campaignId]);

  useEffect(() => {
    async function loadInitialHistory() {
      try {
        setIsLoadingHistory(true);
        await loadHistory();
      } finally {
        setIsLoadingHistory(false);
      }
    }

    loadInitialHistory();

    const intervalId = window.setInterval(() => {
      loadHistory();
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [loadHistory]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [history]);

  async function handleRoll(dice: DiceType) {
    try {
      setIsRolling(true);
      setError(null);

      const newRoll = await createCampaignDiceRoll(campaignId, {
        user_id: userId ?? null,
        author_name: masterName,
        author_type: "master",
        dice,
        quantity,
        modifier,
      });

      setHistory((previous) => [
        ...previous.filter((entry) => entry.id !== newRoll.id),
        newRoll,
      ]);
    } catch {
      setError("Não foi possível registrar a rolagem.");
    } finally {
      setIsRolling(false);
    }
  }

  function handleModifier(value: string) {
    setInputModifier(value);

    const number = Number.parseInt(value, 10);

    if (!Number.isNaN(number)) {
      setModifier(number);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div
        ref={chatRef}
        className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1"
      >
        {history.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-3 py-8 text-center">
            <Dice1 className="h-10 w-10 text-amber-900/40" />

            <p className="text-sm text-amber-100/30">
              {isLoadingHistory
                ? "Carregando histórico..."
                : "Nenhuma rolagem ainda."}
              <br />
              Selecione um dado abaixo.
            </p>
          </div>
        )}

        {history.map((entry) => {
          const AuthorIcon = entry.tipoAutor === "master" ? Crown : UserRound;

          return (
            <div
              key={entry.id}
              className={`
                rounded-xl
                border
                px-3
                py-2.5
                text-sm

                ${
                  entry.critico
                    ? "border-amber-500/40 bg-amber-500/10"
                    : entry.falha
                      ? "border-rose-700/30 bg-rose-900/20"
                      : "border-amber-900/20 bg-slate-900/60"
                }
              `}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs font-medium text-amber-400/70">
                  <AuthorIcon className="h-3 w-3" />
                  {entry.autor}
                </span>

                <span className="text-xs text-amber-100/30">{entry.hora}</span>
              </div>

              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-xs text-amber-100/70">
                  {entry.quantidade}d{entry.dado}
                  {entry.modificador !== 0 && (
                    <span
                      className={
                        entry.modificador > 0
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }
                    >
                      {entry.modificador > 0 ? "+" : ""}
                      {entry.modificador}
                    </span>
                  )}
                </span>

                <span className="text-xs text-amber-100/40">
                  → [{entry.resultados.join(", ")}]
                </span>

                <span
                  className={`
                    ml-auto
                    text-lg
                    font-bold

                    ${
                      entry.critico
                        ? "text-amber-300"
                        : entry.falha
                          ? "text-rose-400"
                          : "text-amber-100"
                    }
                  `}
                >
                  {entry.total}
                </span>
              </div>

              {entry.critico && (
                <p className="mt-0.5 text-xs font-semibold text-amber-400">
                  ⚡ Acerto crítico!
                </p>
              )}

              {entry.falha && !entry.critico && (
                <p className="mt-0.5 text-xs font-semibold text-rose-400">
                  💀 Falha crítica!
                </p>
              )}
            </div>
          );
        })}
      </div>

      {error && (
        <p className="mt-2 rounded-lg border border-rose-500/25 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
          {error}
        </p>
      )}

      <div className="mt-3 flex-shrink-0 space-y-3 border-t border-amber-900/20 pt-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs text-amber-100/40">
              Qtd. de dados
            </label>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="h-7 w-7 rounded bg-slate-800 text-sm font-bold text-amber-100/60 transition hover:text-amber-300"
              >
                −
              </button>

              <span className="flex-1 text-center text-sm font-medium text-amber-100">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity((value) => Math.min(10, value + 1))}
                className="h-7 w-7 rounded bg-slate-800 text-sm font-bold text-amber-100/60 transition hover:text-amber-300"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 flex items-center gap-1 text-xs text-amber-100/40">
              <Hash className="h-3 w-3" />
              Modificador
            </label>

            <input
              type="number"
              value={inputModifier}
              onChange={(event) => handleModifier(event.target.value)}
              className="
                w-full
                rounded
                border
                border-amber-900/30
                bg-slate-800
                px-2
                py-1.5
                text-center
                text-sm
                text-amber-100
                outline-none
                transition
                focus:border-amber-500/50
              "
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {diceOptions.map((dice) => (
            <button
              key={dice}
              disabled={isRolling}
              onClick={() => handleRoll(dice)}
              className="
                rounded-lg
                border
                border-amber-900/30
                bg-slate-800/80
                py-2
                text-xs
                font-bold
                text-amber-100/70
                transition-all
                hover:border-amber-500/50
                hover:bg-amber-500/15
                hover:text-amber-300
                active:scale-95
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              d{dice}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={loadHistory}
            className="flex w-full items-center justify-center gap-1.5 py-1 text-xs text-amber-100/30 transition hover:text-amber-400"
          >
            <RefreshCw className="h-3 w-3" />
            Atualizar
          </button>

          {history.length > 0 && (
            <button
              onClick={() => setHistory([])}
              className="flex w-full items-center justify-center gap-1.5 py-1 text-xs text-amber-100/30 transition hover:text-rose-400"
            >
              <Trash2 className="h-3 w-3" />
              Ocultar local
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
