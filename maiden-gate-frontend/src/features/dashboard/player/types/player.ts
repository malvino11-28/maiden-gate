import type { ElementType } from "react";

export type PlayerDashboardTab =
  | "personagens"
  | "minhas-campanhas"
  | "campanhas-disponiveis"
  | "perfil";

export type CampaignStatus = "ativa" | "pausada" | "encerrada";
export type CharacterMark =
  | "Manifesto"
  | "Oculto"
  | "Respiração"
  | "Entoadora"
  | "Maso";

export type AttributeKey = "POD" | "DES" | "RES" | "INT" | "DET" | "PRE";

export interface PlayerCharacterSummary {
  id: number;
  nome: string;
  sobrenome?: string;
  marca: CharacterMark;
  nivel: number;
  hp: number;
  hpMax: number;
  campanha: string;
  marcaCor: string;
  marcaEmoji?: string;
  iconImage?: string | null;
  fullImage?: string | null;
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
  key: AttributeKey;
  nome: string;
  valor: number;
  mod: number;
}

export interface CharacterSkill {
  id?: string;
  nome: string;
  descricao: string;
  tipo: "Ativa" | "Passiva" | "Reação";
}

export interface PlayerCampaignMember {
  id?: number;
  nome: string;
  personagem: string;
  marca: CharacterMark;
  emoji: string;
  iconImage?: string | null;
  nivel: number;
  voce?: boolean;
}

export interface PlayerCharacterFull extends PlayerCharacterSummary {
  marcaId?: number;
  campaignId?: number | null;
  paMax: number;
  prMax: number;
  xp: number;
  xpProximo: number;
  atributos: CharacterAttribute[];
  habilidades: CharacterSkill[];
  origem?: string;
  historia?: string;
}

export interface PlayerInventoryItem {
  id?: number;
  inventoryId?: number;
  itemId?: number;
  nome: string;
  tipo: string;
  quantidade: number;
  descricao: string;
}

export type PlayerElementStatus = {
  level?: number;
  hp?: number;
  mana?: number;
  atk?: number;
  def?: number;
  speed?: number;
  [key: string]: number | undefined;
};

export interface PlayerElementCollection {
  id?: number | null;
  name?: string | null;
  description?: string | null;
  color?: string | null;
}

export interface PlayerCampaignElementLocation {
  id?: number;
  collectionId?: number | null;
  collection?: PlayerElementCollection | null;
  imagem?: string | null;
  nome: string;
  tipo: string;
  regiao: string;
  descricao: string;
}

export interface PlayerCampaignElementNpc {
  id?: number;
  collectionId?: number | null;
  collection?: PlayerElementCollection | null;
  imagem?: string | null;
  nome: string;
  marca?: CharacterMark;
  raca: string;
  ocupacao: string;
  personalidade: string;
  descricao?: string;
  habilidades?: string;
  status?: PlayerElementStatus | null;
  stats?: PlayerElementStatus | null;
}

export interface PlayerCampaignElementMonster {
  id?: number;
  collectionId?: number | null;
  collection?: PlayerElementCollection | null;
  imagem?: string | null;
  nome: string;
  tipo: string;
  ameaca: string;
  habilidades: string;
  descricao?: string;
  status?: PlayerElementStatus | null;
  stats?: PlayerElementStatus | null;
}

export interface PlayerCampaignElementItem {
  id?: number;
  collectionId?: number | null;
  collection?: PlayerElementCollection | null;
  nome: string;
  tipo: string;
  descricao: string;
}

export interface PlayerCampaignElementEvent {
  id?: number;
  collectionId?: number | null;
  collection?: PlayerElementCollection | null;
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

export type PlayerCampaignSessionStatus =
  | "em_espera"
  | "concluido"
  | "cancelado";

export interface PlayerCampaignSession {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  status: PlayerCampaignSessionStatus;
}

export interface PlayerCampaignData {
  id: string;
  nome: string;
  mestre: string;
  localizacaoAtual: {
    id?: number;
    imagem?: string | null;
    nome: string;
    descricao: string;
    tipo: string;
    regiao?: string;
  };
  membros: PlayerCampaignMember[];
  personagem: PlayerCharacterFull;
  inventario: PlayerInventoryItem[];
  itensDaCampanha?: PlayerCampaignElementItem[];
  elementos: PlayerCampaignElements;
  sessoes: PlayerCampaignSession[];
}

export type PlayerCampaignSectionKey =
  | "elementos"
  | "personagem"
  | "membros"
  | "localizacao"
  | "inventario"
  | "sessoes"
  | "batalha";

export interface CharacterMarkOption {
  id?: number;
  value: CharacterMark;
  emoji: string;
  gradiente: string;
  borda: string;
  texto: string;
  ativo: string;
  descricao: string;
  image?: string | null;
}

export interface AttributeDefinition {
  key: AttributeKey;
  label: string;
  nome: string;
  icon: ElementType;
}
