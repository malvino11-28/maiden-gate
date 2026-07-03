import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Hash, MapPin, Shield, Skull, Swords, Zap } from "lucide-react";

import Button from "../../../../../../shared/components/Button/Button";
import * as Battle from "../../../../../../shared/stores/battleStore";
import type { CharacterSkill } from "../../../types/player";

interface Props {
  campaignId: string;
  characterName: string;
  playerName: string;
  emoji: string;
  currentLocation: string;
  skills: CharacterSkill[];
}

type DiceType = 4 | 6 | 8 | 10 | 12 | 20 | 100;
const diceOptions: DiceType[] = [4, 6, 8, 10, 12, 20, 100];

function rollDice(faces: number): number {
  return Math.floor(Math.random() * faces) + 1;
}

function hpColor(percent: number) {
  return percent > 60 ? "bg-emerald-500" : percent > 30 ? "bg-amber-500" : "bg-rose-500";
}

function BattleLog({ log }: { log: Battle.LogEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [log]);

  const entryStyle: Record<Battle.LogEntry["tipo"], string> = {
    sistema: "border-slate-700/30 bg-slate-800/60 text-amber-100/50",
    dado: "border-amber-900/20 bg-slate-900/60",
    habilidade: "border-violet-700/30 bg-violet-900/20",
    dano: "border-rose-700/30 bg-rose-900/20",
    cura: "border-emerald-700/30 bg-emerald-900/20",
    entrada: "border-amber-700/30 bg-amber-900/20",
  };

  const authorColor: Record<Battle.LogEntry["autorTipo"], string> = {
    mestre: "text-amber-400",
    jogador: "text-sky-400",
    monstro: "text-rose-400",
  };

  return (
    <div ref={ref} className="min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1">
      {log.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
          <Swords className="h-8 w-8 text-amber-900/40" />
          <p className="text-sm text-amber-100/25">O log da batalha aparecerá aqui.</p>
        </div>
      )}

      {log.map((entry) => (
        <div key={entry.id} className={`rounded-lg border px-3 py-2 text-xs ${entryStyle[entry.tipo]}`}>
          <div className="mb-0.5 flex items-center justify-between">
            <span className={`font-medium ${authorColor[entry.autorTipo]}`}>{entry.autor}</span>
            <span className="text-amber-100/25">{entry.hora}</span>
          </div>
          <p className="leading-snug text-amber-100/65">{entry.texto.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
        </div>
      ))}
    </div>
  );
}

function PlayerDicePanel({ characterName }: { characterName: string }) {
  const [quantity, setQuantity] = useState(1);
  const [modifier, setModifier] = useState(0);

  function handleRoll(dice: DiceType) {
    const results = Array.from({ length: quantity }, () => rollDice(dice));
    const total = results.reduce((sum, result) => sum + result, 0) + modifier;
    const critical = dice === 20 && results.includes(20);
    const failure = dice === 20 && results.includes(1);
    Battle.playerRoll(characterName, dice, quantity, results, total, critical, failure);
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="mb-1 block text-xs text-amber-100/40">Qtd</label>
          <div className="flex items-center gap-1">
            <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="h-6 w-6 rounded border border-amber-900/30 bg-slate-800 text-xs font-bold text-amber-100/60 transition-colors hover:text-amber-300">−</button>
            <span className="flex-1 text-center text-sm font-medium text-amber-100">{quantity}</span>
            <button onClick={() => setQuantity((value) => Math.min(10, value + 1))} className="h-6 w-6 rounded border border-amber-900/30 bg-slate-800 text-xs font-bold text-amber-100/60 transition-colors hover:text-amber-300">+</button>
          </div>
        </div>

        <div>
          <label className="mb-1 flex items-center gap-1 text-xs text-amber-100/40">
            <Hash className="h-3 w-3" /> Mod
          </label>
          <input type="number" value={modifier} onChange={(event) => setModifier(Number.parseInt(event.target.value, 10) || 0)} className="w-full rounded border border-amber-900/30 bg-slate-800 px-2 py-1 text-center text-sm text-amber-100 transition-colors focus:border-amber-500/50 focus:outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1">
        {diceOptions.map((dice) => (
          <button key={dice} onClick={() => handleRoll(dice)} className="rounded-lg border border-sky-900/30 bg-slate-800/80 py-1.5 text-xs font-bold text-amber-100/60 transition-all hover:border-sky-500/50 hover:bg-sky-500/15 hover:text-sky-300 active:scale-95">
            d{dice}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PlayerBattleSection({ campaignId, characterName, playerName, emoji, currentLocation, skills }: Props) {
  const battle = Battle.useBattle();
  const [damageInput, setDamageInput] = useState("");

  const isThisCampaign = battle.campanhaId === campaignId;
  const isActive = battle.ativa && isThisCampaign;
  const sameLocation = battle.localizacao === currentLocation;

  const participant = battle.participantes.find((item) => item.nome === characterName);
  const isParticipating = participant?.joined ?? false;
  const isForced = participant?.forcado ?? false;

  const hp = participant?.hp ?? 0;
  const hpMax = participant?.hpMax ?? 1;
  const hpPercent = Math.round((hp / hpMax) * 100);

  function handleJoin() {
    Battle.playerJoin(characterName, playerName);
  }

  function handleTakeDamage() {
    const damage = Number.parseInt(damageInput, 10);
    if (!damage || damage <= 0) {
      return;
    }

    Battle.playerTakeDamage(characterName, damage);
    setDamageInput("");
  }

  if (!isActive) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <Swords className="h-12 w-12 text-amber-900/35" />
        <p className="text-base text-amber-100/40">Nenhuma batalha ativa no momento.</p>
        <p className="max-w-sm text-sm text-amber-100/25">
          Quando o Mestre iniciar uma batalha em sua localização, ela aparecerá aqui.
        </p>
      </div>
    );
  }

  if (!sameLocation) {
    return (
      <div className="mx-auto max-w-md">
        <div className="space-y-3 rounded-2xl border border-amber-700/30 bg-amber-900/20 p-6 text-center">
          <MapPin className="mx-auto h-10 w-10 text-amber-400" />
          <p className="font-semibold text-amber-100">Batalha em Andamento</p>
          <p className="text-sm text-amber-100/55">
            Há uma batalha acontecendo em <span className="font-medium text-amber-300">{battle.localizacao}</span>.
          </p>
          <p className="text-xs text-amber-100/35">
            Você está em <span className="text-amber-300">{currentLocation}</span>. Apenas jogadores na mesma localização podem participar.
          </p>
        </div>
      </div>
    );
  }

  if (!isParticipating) {
    return (
      <div className="mx-auto max-w-md space-y-4">
        <div className={`space-y-4 rounded-2xl border p-6 text-center ${isForced ? "border-rose-700/30 bg-rose-900/20" : "border-amber-700/30 bg-amber-900/20"}`}>
          {isForced ? (
            <>
              <AlertTriangle className="mx-auto h-10 w-10 text-rose-400" />
              <p className="font-semibold text-rose-300">Você foi convocado para a batalha!</p>
              <p className="text-sm text-amber-100/55">O Mestre forçou sua participação em <span className="font-medium text-amber-300">{battle.localizacao}</span>.</p>
            </>
          ) : (
            <>
              <Swords className="mx-auto h-10 w-10 text-amber-400" />
              <p className="font-semibold text-amber-100">Batalha em {battle.localizacao}!</p>
              <p className="text-sm text-amber-100/55">Há uma batalha na sua localização atual. Você pode participar voluntariamente.</p>
            </>
          )}

          <div className="space-y-1.5 rounded-xl bg-slate-900/40 p-3 text-left">
            <p className="mb-2 text-xs uppercase tracking-wider text-amber-100/40">Inimigos</p>
            {battle.monstros.map((monster) => {
              const monsterPercent = Math.round((monster.hp / monster.hpMax) * 100);

              return (
                <div key={monster.id} className="flex items-center gap-3">
                  <Skull className="h-3.5 w-3.5 flex-shrink-0 text-rose-400" />
                  <p className="flex-1 text-sm text-amber-100/70">{monster.nome}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-16 overflow-hidden rounded-full bg-slate-700">
                      <div className={`h-full rounded-full ${hpColor(monsterPercent)}`} style={{ width: `${monsterPercent}%` }} />
                    </div>
                    <span className={`text-[10px] ${monster.status === "derrotado" ? "text-slate-500" : "text-amber-100/35"}`}>{monster.hp}/{monster.hpMax}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <Button onClick={handleJoin} size="lg" className="w-full gap-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700">
            <Shield className="h-5 w-5" /> {isForced ? "Entrar na Batalha" : "Participar da Batalha"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[1fr_300px]">
      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-xl border border-rose-700/30 bg-rose-900/20 px-4 py-3">
          <Swords className="h-4 w-4 text-rose-400" />
          <div>
            <p className="text-sm font-semibold text-amber-100">{battle.localizacao}</p>
            <p className="text-xs text-amber-100/45">
              Turno {battle.turno} · {battle.monstros.filter((monster) => monster.status === "vivo").length} inimigo(s) ativo(s)
            </p>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-sky-900/30 bg-slate-900/50 p-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{emoji}</span>
            <div className="flex-1">
              <p className="font-semibold text-amber-100">{characterName}</p>
              <div>
                <div className="mb-1 flex justify-between text-xs text-amber-100/50">
                  <span>Pontos de Vida</span>
                  <span>{hp} / {hpMax}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                  <div className={`h-full rounded-full transition-all ${hpColor(hpPercent)}`} style={{ width: `${hpPercent}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs text-amber-100/50">Registrar dano recebido</p>
            <div className="flex gap-2">
              <input type="number" value={damageInput} onChange={(event) => setDamageInput(event.target.value)} placeholder="Qtd de dano" className="flex-1 rounded-lg border border-rose-900/30 bg-slate-800 px-3 py-2 text-sm text-amber-100 transition-colors focus:border-rose-500/50 focus:outline-none" />
              <Button size="sm" variant="danger" onClick={handleTakeDamage}>Aplicar</Button>
            </div>
          </div>
        </div>

        {skills.length > 0 && (
          <div className="rounded-2xl border border-violet-900/25 bg-slate-900/50 p-5">
            <p className="mb-3 text-xs uppercase tracking-wider text-amber-100/50">Usar Habilidade</p>
            <div className="space-y-2">
              {skills.map((skill) => (
                <button key={skill.nome} onClick={() => Battle.playerAbility(characterName, skill.nome)} className="group flex w-full items-start gap-3 rounded-xl border border-violet-900/25 bg-slate-800/50 px-4 py-3 text-left transition-all hover:border-violet-700/50 hover:bg-violet-900/20">
                  <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet-400 transition-colors group-hover:text-violet-300" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-amber-100">{skill.nome}</p>
                    <p className="mt-0.5 truncate text-xs leading-snug text-amber-100/40">{skill.descricao}</p>
                  </div>
                  <span className={`ml-auto flex-shrink-0 self-start rounded-full border px-2 py-0.5 text-xs ${skill.tipo === "Ativa" ? "border-amber-500/30 bg-amber-500/10 text-amber-300" : skill.tipo === "Passiva" ? "border-slate-500/30 bg-slate-500/15 text-slate-400" : "border-violet-500/30 bg-violet-500/10 text-violet-300"}`}>{skill.tipo}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-sky-900/25 bg-slate-900/50 p-5">
          <p className="mb-3 text-xs uppercase tracking-wider text-amber-100/50">Rolar Dados</p>
          <PlayerDicePanel characterName={characterName} />
        </div>
      </div>

      <div className="flex flex-col rounded-2xl border border-rose-900/25 bg-slate-900/60 p-4 lg:sticky lg:top-24" style={{ height: "calc(100vh - 14rem)", maxHeight: "640px" }}>
        <div className="mb-3 flex flex-shrink-0 items-center gap-2">
          <Swords className="h-4 w-4 text-rose-400" />
          <h3 className="text-sm font-semibold text-amber-100">Log da Batalha</h3>
        </div>
        <BattleLog log={battle.log} />
      </div>
    </div>
  );
}
