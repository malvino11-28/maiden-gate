import type { ElementType } from "react";

export type PlayerDashboardTab =
  | "personagens"
  | "minhas-campanhas"
  | "campanhas-disponiveis"
  | "perfil";

export type CampaignStatus = "ativa" | "encerrada";
export type CharacterMark = "Manifesto" | "Oculto" | "Respiração" | "Entoadora" | "Maso";

export type AttributeKey = "POD" | "DES" | "RES" | "INT" | "DET" | "PRE";

export interface PlayerCharacterSummary {
  id: number;
  nome: string;
  sobrenome: string;
  marca: CharacterMark;
  nivel: number;
  hp: number;
  hpMax: number;
  campanha: string;
  marcaCor: string;
  marcaEmoji: string;
}

export interface PlayerCampaignSummary {
  id: number;
  campanha: string;
  mestre: string;
  proximaSessao: string;
  status: CampaignStatus;
  personagem: string;
}

export interface AvailableCampaign {
  id: number;
  campanha: string;
  mestre: string;
  vagas: number;
  nivel: string;
  proximaSessao: string;
  marca: string;
}

export interface PlayerStat {
  label: string;
  value: string | number;
  icon: ElementType;
}

export interface CharacterAttribute {
  nome: string;
  valor: number;
  mod: number;
}

export interface CharacterSkill {
  nome: string;
  descricao: string;
  tipo: "Ativa" | "Passiva" | "Reação";
}

export interface PlayerCampaignMember {
  nome: string;
  personagem: string;
  marca: CharacterMark;
  emoji: string;
  nivel: number;
  voce?: boolean;
}

export interface PlayerCharacterFull extends PlayerCharacterSummary {
  mp: number;
  mpMax: number;
  xp: number;
  xpProximo: number;
  atributos: CharacterAttribute[];
  habilidades: CharacterSkill[];
  origem?: string;
  historia?: string;
}

export interface PlayerInventoryItem {
  nome: string;
  tipo: string;
  quantidade: number;
  descricao: string;
}

export interface PlayerCampaignElementLocation {
  nome: string;
  tipo: string;
  regiao: string;
  descricao: string;
}

export interface PlayerCampaignElementNpc {
  nome: string;
  raca: string;
  ocupacao: string;
  personalidade: string;
}

export interface PlayerCampaignElementMonster {
  nome: string;
  tipo: string;
  ameaca: string;
  habilidades: string;
}

export interface PlayerCampaignElementItem {
  nome: string;
  tipo: string;
  descricao: string;
}

export interface PlayerCampaignElementEvent {
  titulo: string;
  cronologia: string;
  data: string;
  descricao: string;
}

export interface PlayerCampaignElements {
  localizacoes: PlayerCampaignElementLocation[];
  npcs: PlayerCampaignElementNpc[];
  monstros: PlayerCampaignElementMonster[];
  itens: PlayerCampaignElementItem[];
  eventos: PlayerCampaignElementEvent[];
}

export interface PlayerCampaignData {
  id: string;
  nome: string;
  mestre: string;
  localizacaoAtual: {
    nome: string;
    descricao: string;
    tipo: string;
  };
  membros: PlayerCampaignMember[];
  personagem: PlayerCharacterFull;
  inventario: PlayerInventoryItem[];
  elementos: PlayerCampaignElements;
}

export type PlayerCampaignSectionKey =
  | "elementos"
  | "personagem"
  | "membros"
  | "localizacao"
  | "inventario"
  | "batalha";

export interface CharacterMarkOption {
  value: CharacterMark;
  emoji: string;
  gradiente: string;
  borda: string;
  texto: string;
  ativo: string;
  descricao: string;
}

export interface AttributeDefinition {
  key: AttributeKey;
  label: string;
  nome: string;
  icon: ElementType;
}
