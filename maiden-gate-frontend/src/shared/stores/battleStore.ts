import { useSyncExternalStore } from "react";

export interface BattleMonstro {
  id: string;
  nome: string;
  tipo: string;
  hp: number;
  hpMax: number;
  habilidades: string[];
  status: "vivo" | "derrotado";
}

export interface BattleParticipante {
  nome: string;
  jogador: string;
  emoji: string;
  hp: number;
  hpMax: number;
  forcado: boolean;
  joined: boolean;
}

export interface LogEntry {
  id: number;
  hora: string;
  tipo: "sistema" | "dado" | "habilidade" | "dano" | "cura" | "entrada";
  autor: string;
  autorTipo: "mestre" | "jogador" | "monstro";
  texto: string;
}

export interface BattleState {
  ativa: boolean;
  campanhaId: string;
  localizacao: string;
  turno: number;
  monstroAtivoIdx: number;
  monstros: BattleMonstro[];
  participantes: BattleParticipante[];
  log: LogEntry[];
}

const STORAGE_KEY = "vof_battle_state";
let logId = 1;

function defaultState(): BattleState {
  return {
    ativa: false,
    campanhaId: "",
    localizacao: "",
    turno: 1,
    monstroAtivoIdx: 0,
    monstros: [],
    participantes: [],
    log: [],
  };
}

function loadState(): BattleState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as BattleState;
    }
  } catch {
    return defaultState();
  }

  return defaultState();
}

let state: BattleState = loadState();
const listeners = new Set<() => void>();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // mock store for frontend only
  }
}

function notify() {
  persist();
  listeners.forEach((listener) => listener());
}

export function getState(): BattleState {
  return state;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY && event.newValue) {
      try {
        state = JSON.parse(event.newValue);
        listener();
      } catch {
        // ignore invalid storage
      }
    }
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useBattle(): BattleState {
  return useSyncExternalStore(subscribe, getState, getState);
}

function hour(): string {
  return new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function addLog(entry: Omit<LogEntry, "id" | "hora">) {
  state = {
    ...state,
    log: [
      ...state.log,
      {
        id: logId,
        hora: hour(),
        ...entry,
      },
    ],
  };

  logId += 1;
}

export function startBattle(opts: {
  campanhaId: string;
  localizacao: string;
  monstros: BattleMonstro[];
  participantes: BattleParticipante[];
}) {
  state = {
    ativa: true,
    campanhaId: opts.campanhaId,
    localizacao: opts.localizacao,
    turno: 1,
    monstroAtivoIdx: 0,
    monstros: opts.monstros,
    participantes: opts.participantes,
    log: [],
  };

  addLog({
    tipo: "sistema",
    autor: "Sistema",
    autorTipo: "mestre",
    texto: `⚔️ Batalha iniciada em **${opts.localizacao}**!`,
  });

  notify();
}

export function endBattle() {
  addLog({ tipo: "sistema", autor: "Sistema", autorTipo: "mestre", texto: "🏁 A batalha foi encerrada." });
  state = { ...state, ativa: false };
  notify();
}

export function playerJoin(personagem: string, jogador: string) {
  state = {
    ...state,
    participantes: state.participantes.map((participante) =>
      participante.nome === personagem ? { ...participante, joined: true } : participante,
    ),
  };

  addLog({
    tipo: "entrada",
    autor: personagem,
    autorTipo: "jogador",
    texto: `**${personagem}** (${jogador}) entrou na batalha!`,
  });

  notify();
}

export function playerRoll(
  personagem: string,
  dado: number,
  qtd: number,
  resultados: number[],
  total: number,
  critico?: boolean,
  falha?: boolean,
) {
  const extra = critico ? " ⚡ Acerto Crítico!" : falha ? " 💀 Falha Crítica!" : "";

  addLog({
    tipo: "dado",
    autor: personagem,
    autorTipo: "jogador",
    texto: `rolou ${qtd}d${dado} → [${resultados.join(", ")}] = **${total}**${extra}`,
  });

  notify();
}

export function playerAbility(personagem: string, habilidade: string) {
  addLog({
    tipo: "habilidade",
    autor: personagem,
    autorTipo: "jogador",
    texto: `usou **${habilidade}**!`,
  });

  notify();
}

export function playerTakeDamage(personagem: string, dano: number) {
  state = {
    ...state,
    participantes: state.participantes.map((participante) =>
      participante.nome === personagem
        ? { ...participante, hp: Math.max(0, participante.hp - dano) }
        : participante,
    ),
  };

  addLog({
    tipo: "dano",
    autor: personagem,
    autorTipo: "jogador",
    texto: `recebeu **${dano} de dano**.`,
  });

  notify();
}

export function resetBattle() {
  state = defaultState();
  notify();
}
