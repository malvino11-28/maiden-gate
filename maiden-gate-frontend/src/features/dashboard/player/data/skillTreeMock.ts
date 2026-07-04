import {
  AlertTriangle,
  BookOpen,
  Shield,
  Star,
  Swords,
  Zap,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export type SkillType = "ativa" | "passiva" | "penalidade" | "campanha";

export type SkillBranchKey =
  | "ofensivo"
  | "suporte"
  | "destreza"
  | "passivas"
  | "penalidade"
  | "campanha";

export type CharacterSkill = {
  id: string;
  nome: string;
  descricao: string;
  nivel: number;
  desbloqueada: boolean;
  tipo: SkillType;
  emoji: string;
};

export type SkillTree = Record<SkillBranchKey, CharacterSkill[]>;

export const MAX_EQUIPPED_SKILLS = 4;

export const skillBranches: {
  key: SkillBranchKey;
  label: string;
  icon: LucideIcon;
}[] = [
  {
    key: "ofensivo",
    label: "Ofensivo",
    icon: Swords,
  },
  {
    key: "suporte",
    label: "Suporte / Defensivo",
    icon: Shield,
  },
  {
    key: "destreza",
    label: "Destreza / Utilidade",
    icon: Zap,
  },
  {
    key: "passivas",
    label: "Passivas",
    icon: Star,
  },
  {
    key: "penalidade",
    label: "Penalidade",
    icon: AlertTriangle,
  },
];

export const markMeta: Record<
  string,
  {
    emoji: string;
    text: string;
    gradient: string;
    active: string;
    description: string;
  }
> = {
  Manifesto: {
    emoji: "⚔️",
    text: "text-orange-300",
    gradient: "from-orange-500/30 to-red-700/30",
    active: "border-orange-400 bg-orange-500/20",
    description: "Guerreiro da voz declarada",
  },
  Oculto: {
    emoji: "🌒",
    text: "text-violet-300",
    gradient: "from-violet-700/30 to-slate-800/30",
    active: "border-violet-400 bg-violet-500/20",
    description: "Mestre dos segredos sombrios",
  },
  Entoadora: {
    emoji: "🎶",
    text: "text-teal-300",
    gradient: "from-teal-500/30 to-emerald-700/30",
    active: "border-teal-400 bg-teal-500/20",
    description: "Tecelã de melodias arcanas",
  },
  Respiração: {
    emoji: "🌬️",
    text: "text-sky-300",
    gradient: "from-sky-400/30 to-cyan-600/30",
    active: "border-sky-400 bg-sky-500/20",
    description: "Portador do fluxo vital",
  },
  Maso: {
    emoji: "🩸",
    text: "text-rose-300",
    gradient: "from-rose-700/30 to-red-900/30",
    active: "border-rose-400 bg-rose-500/20",
    description: "Forjado pelo sacrifício",
  },
};

const manifestoSkills: SkillTree = {
  ofensivo: [
    {
      id: "man-of-1",
      nome: "Ordem Cortante",
      descricao:
        "Declara uma ordem de ataque que fortalece o próximo golpe físico.",
      nivel: 1,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "⚔️",
    },
    {
      id: "man-of-2",
      nome: "Sentença Imperial",
      descricao:
        "Concentra autoridade em um golpe direto, causando dano extra contra alvos marcados.",
      nivel: 3,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "👑",
    },
    {
      id: "man-of-3",
      nome: "Lâmina do Decreto",
      descricao:
        "Invoca uma lâmina simbólica de comando que atravessa defesas frágeis.",
      nivel: 6,
      desbloqueada: false,
      tipo: "ativa",
      emoji: "🗡️",
    },
  ],
  suporte: [
    {
      id: "man-su-1",
      nome: "Comando Protetor",
      descricao: "Ordena que um aliado resista, concedendo defesa temporária.",
      nivel: 1,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "🛡️",
    },
    {
      id: "man-su-2",
      nome: "Voz de Liderança",
      descricao:
        "Aliados próximos recebem bônus em testes de determinação até o fim da cena.",
      nivel: 4,
      desbloqueada: false,
      tipo: "ativa",
      emoji: "📣",
    },
  ],
  destreza: [
    {
      id: "man-de-1",
      nome: "Passo Disciplinado",
      descricao:
        "Movimenta-se com precisão militar, ignorando penalidades leves de terreno.",
      nivel: 2,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "🥾",
    },
  ],
  passivas: [
    {
      id: "man-pa-1",
      nome: "Autoridade Natural",
      descricao:
        "Ganha vantagem narrativa em situações de comando, negociação ou intimidação.",
      nivel: 1,
      desbloqueada: true,
      tipo: "passiva",
      emoji: "👁️",
    },
  ],
  penalidade: [
    {
      id: "man-pe-1",
      nome: "Peso da Ordem",
      descricao:
        "Ao falhar em manter sua autoridade, sofre penalidade em presença até recuperar controle da cena.",
      nivel: 1,
      desbloqueada: true,
      tipo: "penalidade",
      emoji: "⚠️",
    },
  ],
  campanha: [
    {
      id: "man-ca-1",
      nome: "Decreto do Abismo",
      descricao:
        "Skill exclusiva de campanha. Uma ordem ecoa pela Flor Negra e força um inimigo a hesitar por 1 turno.",
      nivel: 3,
      desbloqueada: true,
      tipo: "campanha",
      emoji: "🌑",
    },
  ],
};

const ocultoSkills: SkillTree = {
  ofensivo: [
    {
      id: "ocu-of-1",
      nome: "Lâmina Noturna",
      descricao:
        "Ataca a partir das sombras, causando dano extra se o alvo não tiver percebido sua presença.",
      nivel: 1,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "🌒",
    },
    {
      id: "ocu-of-2",
      nome: "Estilhaço Sombrio",
      descricao:
        "Dispara fragmentos de sombra condensada contra um alvo à distância.",
      nivel: 3,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "🖤",
    },
  ],
  suporte: [
    {
      id: "ocu-su-1",
      nome: "Véu Oculto",
      descricao:
        "Envolve um aliado em sombras, dificultando ataques contra ele.",
      nivel: 1,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "🕯️",
    },
  ],
  destreza: [
    {
      id: "ocu-de-1",
      nome: "Passo das Sombras",
      descricao: "Move-se silenciosamente entre áreas de pouca luz.",
      nivel: 2,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "👣",
    },
    {
      id: "ocu-de-2",
      nome: "Visão Oculta",
      descricao: "Permite detectar armadilhas, ilusões e intenções escondidas.",
      nivel: 4,
      desbloqueada: false,
      tipo: "ativa",
      emoji: "👁️",
    },
  ],
  passivas: [
    {
      id: "ocu-pa-1",
      nome: "Silêncio Natural",
      descricao: "Reduz dificuldade de ações furtivas em ambientes escuros.",
      nivel: 1,
      desbloqueada: true,
      tipo: "passiva",
      emoji: "🤫",
    },
  ],
  penalidade: [
    {
      id: "ocu-pe-1",
      nome: "Isolamento Oculto",
      descricao:
        "Quanto mais usa as sombras, mais difícil se torna confiar plenamente nos aliados.",
      nivel: 1,
      desbloqueada: true,
      tipo: "penalidade",
      emoji: "⚠️",
    },
  ],
  campanha: [],
};

const respiracaoSkills: SkillTree = {
  ofensivo: [
    {
      id: "res-of-1",
      nome: "Corrente Cortante",
      descricao: "Libera uma lâmina de ar comprimido contra um inimigo.",
      nivel: 1,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "🌬️",
    },
    {
      id: "res-of-2",
      nome: "Pulso do Vendaval",
      descricao: "Empurra inimigos próximos e pode interromper ações frágeis.",
      nivel: 4,
      desbloqueada: false,
      tipo: "ativa",
      emoji: "💨",
    },
  ],
  suporte: [
    {
      id: "res-su-1",
      nome: "Fôlego Restaurador",
      descricao: "Regulariza a respiração de um aliado, removendo fadiga leve.",
      nivel: 1,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "🫁",
    },
  ],
  destreza: [
    {
      id: "res-de-1",
      nome: "Passo do Vendaval",
      descricao: "Aumenta mobilidade e permite reposicionamento rápido.",
      nivel: 2,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "🍃",
    },
  ],
  passivas: [
    {
      id: "res-pa-1",
      nome: "Ritmo da Respiração",
      descricao:
        "Após descansar, recupera melhor efeitos de fadiga e esforço físico.",
      nivel: 1,
      desbloqueada: true,
      tipo: "passiva",
      emoji: "🌀",
    },
  ],
  penalidade: [
    {
      id: "res-pe-1",
      nome: "Ritmo Instável",
      descricao:
        "Se perder o controle emocional, sofre penalidade temporária em ações precisas.",
      nivel: 1,
      desbloqueada: true,
      tipo: "penalidade",
      emoji: "⚠️",
    },
  ],
  campanha: [
    {
      id: "res-ca-1",
      nome: "Eco do Vento Negro",
      descricao:
        "Skill exclusiva da campanha. A respiração ecoa através da Flor Negra e revela uma presença corrompida próxima.",
      nivel: 5,
      desbloqueada: false,
      tipo: "campanha",
      emoji: "🌑",
    },
  ],
};

const entoadoraSkills: SkillTree = {
  ofensivo: [
    {
      id: "ent-of-1",
      nome: "Nota Cortante",
      descricao:
        "Emite uma nota aguda que fere o alvo e desestabiliza sua concentração.",
      nivel: 1,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "🎵",
    },
  ],
  suporte: [
    {
      id: "ent-su-1",
      nome: "Cântico de Amparo",
      descricao:
        "Uma melodia breve concede proteção emocional e resistência a medo.",
      nivel: 1,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "🎶",
    },
    {
      id: "ent-su-2",
      nome: "Canção Curativa",
      descricao: "Cura um aliado com base na presença da Entoadora.",
      nivel: 4,
      desbloqueada: false,
      tipo: "ativa",
      emoji: "💚",
    },
  ],
  destreza: [
    {
      id: "ent-de-1",
      nome: "Sussurro Ilusório",
      descricao: "Cria uma distração sonora em um ponto próximo.",
      nivel: 2,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "🫧",
    },
  ],
  passivas: [
    {
      id: "ent-pa-1",
      nome: "Ouvido da Flor",
      descricao: "Percebe alterações sutis em vozes, ecos e melodias mágicas.",
      nivel: 1,
      desbloqueada: true,
      tipo: "passiva",
      emoji: "👂",
    },
  ],
  penalidade: [
    {
      id: "ent-pe-1",
      nome: "Voz Frágil",
      descricao:
        "Silêncio mágico ou dano vocal reduz temporariamente o uso de suas habilidades.",
      nivel: 1,
      desbloqueada: true,
      tipo: "penalidade",
      emoji: "⚠️",
    },
  ],
  campanha: [],
};

const masoSkills: SkillTree = {
  ofensivo: [
    {
      id: "mas-of-1",
      nome: "Golpe de Sangue",
      descricao:
        "Canaliza sangue nos punhos e desfere um golpe que drena parte da vitalidade do inimigo.",
      nivel: 1,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "🩸",
    },
    {
      id: "mas-of-2",
      nome: "Hemorragia",
      descricao: "Aplica uma maldição de sangramento por alguns turnos.",
      nivel: 3,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "💉",
    },
  ],
  suporte: [
    {
      id: "mas-su-1",
      nome: "Transfusão",
      descricao: "Transfere parte do próprio HP para estabilizar um aliado.",
      nivel: 1,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "❤️",
    },
  ],
  destreza: [
    {
      id: "mas-de-1",
      nome: "Sentido do Ferido",
      descricao: "Detecta seres vivos feridos em curta distância.",
      nivel: 2,
      desbloqueada: true,
      tipo: "ativa",
      emoji: "👃",
    },
  ],
  passivas: [
    {
      id: "mas-pa-1",
      nome: "Sede de Sangue",
      descricao:
        "Ao causar dano com habilidades Maso, recupera uma pequena quantidade de HP.",
      nivel: 1,
      desbloqueada: true,
      tipo: "passiva",
      emoji: "🦷",
    },
  ],
  penalidade: [
    {
      id: "mas-pe-1",
      nome: "Maldição do Maso",
      descricao:
        "O sangue manipulado exige sacrifícios. Uso excessivo pode causar perda temporária de HP máximo.",
      nivel: 1,
      desbloqueada: true,
      tipo: "penalidade",
      emoji: "⚠️",
    },
  ],
  campanha: [],
};

export const skillTreesByMark: Record<string, SkillTree> = {
  Manifesto: manifestoSkills,
  Oculto: ocultoSkills,
  Respiração: respiracaoSkills,
  Entoadora: entoadoraSkills,
  Maso: masoSkills,
};

export function getSkillTreeByMark(mark: string) {
  return skillTreesByMark[mark] ?? manifestoSkills;
}

export function getMarkMeta(mark: string) {
  return markMeta[mark] ?? markMeta.Manifesto;
}

export function getAllSkills(tree: SkillTree) {
  return Object.values(tree).flat();
}

export function getInitialEquippedSkills(tree: SkillTree) {
  return getAllSkills(tree)
    .filter((skill) => skill.desbloqueada && skill.tipo === "ativa")
    .slice(0, MAX_EQUIPPED_SKILLS)
    .map((skill) => skill.id);
}

export const campaignSkillIcon = BookOpen;
