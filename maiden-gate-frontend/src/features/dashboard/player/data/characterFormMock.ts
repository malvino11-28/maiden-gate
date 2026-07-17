import { Brain, Eye, Flame, Heart, Users, Wind } from "lucide-react";

import type { AttributeDefinition, CharacterMarkOption } from "../types/player";

import type { AttributeKey, CharacterMark } from "../types/player";

import manifest from "../../../../assets/images/marks/min/manifest_arv.png";
import occult from "../../../../assets/images/marks/min/occult_arv.png";
import intoner from "../../../../assets/images/marks/min/intoner_arv.png";
import breath from "../../../../assets/images/marks/min/breath_arv.png";
import maso from "../../../../assets/images/marks/min/maso_arv.png";

export const extraPoints = 8;
export const baseAttributeValue = 6;

export const characterMarks: CharacterMarkOption[] = [
  {
    value: "Manifesto",
    emoji: "⚔️",
    image: manifest,
    gradiente: "from-orange-500/30 to-red-700/30",
    borda: "border-orange-500/50",
    texto: "text-orange-300",
    ativo: "border-orange-400 bg-orange-500/20 shadow-orange-500/20",
    descricao: "Guerreiro da voz declarada",
  },
  {
    value: "Oculto",
    emoji: "🌒",
    image: occult,
    gradiente: "from-violet-700/30 to-slate-800/30",
    borda: "border-violet-500/50",
    texto: "text-violet-300",
    ativo: "border-violet-400 bg-violet-500/20 shadow-violet-500/20",
    descricao: "Mestre dos segredos sombrios",
  },
  {
    value: "Entoadora",
    emoji: "🎶",
    image: intoner,
    gradiente: "from-teal-500/30 to-emerald-700/30",
    borda: "border-rose-500/40",
    texto: "text-teal-300",
    ativo: "border-teal-400 bg-teal-500/20 shadow-teal-500/20",
    descricao: "Tecelã de melodias arcanas",
  },
  {
    value: "Respiração",
    emoji: "🌬️",
    image: breath,
    gradiente: "from-sky-400/30 to-cyan-600/30",
    borda: "border-sky-500/50",
    texto: "text-sky-300",
    ativo: "border-sky-400 bg-sky-500/20 shadow-sky-500/20",
    descricao: "Portador do fluxo vital",
  },
  {
    value: "Maso",
    emoji: "🩸",
    image: maso,
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
    POD: baseAttributeValue - 4,
    DES: baseAttributeValue - 4,
    RES: baseAttributeValue - 3,
    INT: baseAttributeValue - 3,
    DET: baseAttributeValue - 2,
    PRE: baseAttributeValue - 2,
  },

  Oculto: {
    POD: baseAttributeValue - 4,
    DES: baseAttributeValue - 1,
    RES: baseAttributeValue - 4,
    INT: baseAttributeValue - 2,
    DET: baseAttributeValue - 3,
    PRE: baseAttributeValue - 4,
  },

  Entoadora: {
    POD: baseAttributeValue - 5,
    DES: baseAttributeValue - 4,
    RES: baseAttributeValue - 5,
    INT: baseAttributeValue - 1,
    DET: baseAttributeValue - 2,
    PRE: baseAttributeValue - 1,
  },

  Respiração: {
    POD: baseAttributeValue - 3,
    DES: baseAttributeValue - 2,
    RES: baseAttributeValue - 3,
    INT: baseAttributeValue - 4,
    DET: baseAttributeValue - 3,
    PRE: baseAttributeValue - 3,
  },

  Maso: {
    POD: baseAttributeValue - 3,
    DES: baseAttributeValue - 4,
    RES: baseAttributeValue - 1,
    INT: baseAttributeValue - 4,
    DET: baseAttributeValue - 2,
    PRE: baseAttributeValue - 4,
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
