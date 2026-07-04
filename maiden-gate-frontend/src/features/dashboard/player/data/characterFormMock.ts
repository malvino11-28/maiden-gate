import { Brain, Eye, Flame, Heart, Users, Wind } from "lucide-react";

import type { AttributeDefinition, CharacterMarkOption } from "../types/player";

import type { AttributeKey, CharacterMark } from "../types/player";

export const extraPoints = 18;
export const baseAttributeValue = 6;

export const campaignsForCharacter = [
  { id: 1, nome: "A Flor do Abismo" },
  { id: 2, nome: "Véu de Cinzas" },
  { id: 3, nome: "Crônicas de Vareth" },
  { id: 4, nome: "O Sangue de Maso" },
];

export const characterMarks: CharacterMarkOption[] = [
  {
    value: "Manifesto",
    emoji: "⚔️",
    gradiente: "from-orange-500/30 to-red-700/30",
    borda: "border-orange-500/50",
    texto: "text-orange-300",
    ativo: "border-orange-400 bg-orange-500/20 shadow-orange-500/20",
    descricao: "Guerreiro da voz declarada",
  },
  {
    value: "Oculto",
    emoji: "🌒",
    gradiente: "from-violet-700/30 to-slate-800/30",
    borda: "border-violet-500/50",
    texto: "text-violet-300",
    ativo: "border-violet-400 bg-violet-500/20 shadow-violet-500/20",
    descricao: "Mestre dos segredos sombrios",
  },
  {
    value: "Entoadora",
    emoji: "🎶",
    gradiente: "from-teal-500/30 to-emerald-700/30",
    borda: "border-teal-500/50",
    texto: "text-teal-300",
    ativo: "border-teal-400 bg-teal-500/20 shadow-teal-500/20",
    descricao: "Tecelã de melodias arcanas",
  },
  {
    value: "Respiração",
    emoji: "🌬️",
    gradiente: "from-sky-400/30 to-cyan-600/30",
    borda: "border-sky-500/50",
    texto: "text-sky-300",
    ativo: "border-sky-400 bg-sky-500/20 shadow-sky-500/20",
    descricao: "Portador do fluxo vital",
  },
  {
    value: "Maso",
    emoji: "🩸",
    gradiente: "from-rose-700/30 to-red-900/30",
    borda: "border-rose-500/50",
    texto: "text-rose-300",
    ativo: "border-rose-400 bg-rose-500/20 shadow-rose-500/20",
    descricao: "Forjado pelo sacrifício",
  },
];

export const characterAttributes: AttributeDefinition[] = [
  { key: "POD", label: "POD", nome: "Poder", icon: Flame },
  { key: "DES", label: "DES", nome: "Destreza", icon: Wind },
  { key: "RES", label: "RES", nome: "Resiliência", icon: Heart },
  { key: "INT", label: "INT", nome: "Intelecto", icon: Brain },
  { key: "DET", label: "DET", nome: "Determinação", icon: Eye },
  { key: "PRE", label: "PRE", nome: "Presença", icon: Users },
];

export function createBaseAttributes(): Record<AttributeKey, number> {
  return {
    POD: baseAttributeValue,
    DES: baseAttributeValue,
    RES: baseAttributeValue,
    INT: baseAttributeValue,
    DET: baseAttributeValue,
    PRE: baseAttributeValue,
  };
}

export const markMinimumAttributes: Record<
  CharacterMark,
  Record<AttributeKey, number>
> = {
  Manifesto: {
    POD: baseAttributeValue + 1,
    DES: baseAttributeValue - 1,
    RES: baseAttributeValue + 1,
    INT: baseAttributeValue - 1,
    DET: baseAttributeValue,
    PRE: baseAttributeValue,
  },

  Oculto: {
    POD: baseAttributeValue - 1,
    DES: baseAttributeValue + 1,
    RES: baseAttributeValue - 1,
    INT: baseAttributeValue + 1,
    DET: baseAttributeValue + 1,
    PRE: baseAttributeValue - 1,
  },

  Entoadora: {
    POD: baseAttributeValue - 1,
    DES: baseAttributeValue - 1,
    RES: baseAttributeValue,
    INT: baseAttributeValue + 1,
    DET: baseAttributeValue,
    PRE: baseAttributeValue + 1,
  },

  Respiração: {
    POD: baseAttributeValue,
    DES: baseAttributeValue + 1,
    RES: baseAttributeValue + 1,
    INT: baseAttributeValue - 1,
    DET: baseAttributeValue,
    PRE: baseAttributeValue - 1,
  },

  Maso: {
    POD: baseAttributeValue + 1,
    DES: baseAttributeValue - 1,
    RES: baseAttributeValue + 1,
    INT: baseAttributeValue - 1,
    DET: baseAttributeValue,
    PRE: baseAttributeValue,
  },
};

export function getMinimumAttributesByMark(
  mark: CharacterMark | "",
): Record<AttributeKey, number> {
  if (!mark) {
    return createBaseAttributes();
  }

  return markMinimumAttributes[mark];
}
