export type RecommendedLevel = "Iniciante" | "Intermediário" | "Avançado";

export interface CampaignCollection {
  clientId: string;
  name: string;
  description: string;
  color: string;
}

export interface CampaignLocation {
  collectionId: string;
  image: File | null | string;
  name: string;
  type: string;
  region: string;
  description: string;
}

type StatusData = {
  level: number;
  hp: number;
  mana: number;
  atk: number;
  def: number;
  speed: number;
};

export interface CampaignNpc {
  collectionId: string;
  image: string | null | File;
  name: string;
  marca_id: string;
  race: string;
  occupation: string;
  personality: string;
  secret: string;
  description: string;
  skills: string[];
  stats: StatusData;
}

export interface CampaignMonster {
  collectionId: string;
  image: File | null | string;
  name: string;
  type: string;
  threat: string;
  skills: string[];
  stats: StatusData;
  description: string;
}

export interface CampaignItem {
  collectionId: string;
  name: string;
  type: string;
  description: string;
}

export interface CampaignEvent {
  collectionId: string;
  title: string;
  chronology: string;
  date: string;
  description: string;
}

export interface CampaignSkillForm {
  collectionId: string;
  marca_id: string;
  name: string;
  description: string;
  type: "ativa" | "passiva" | "penalidade" | "campanha";
  branch: "ofensivo" | "suporte" | "destreza" | "passivas" | "penalidade" | "campanha";
  unlock_level: string;
  resource_cost: string;
  range: string;
}

export interface CampaignData {
  image: string;
  name: string;
  description: string;
  recommendedLevel: RecommendedLevel;
  players: string;
  notes?: string;
  collections: CampaignCollection[];
  locations: CampaignLocation[];
  npcs: CampaignNpc[];
  monsters: CampaignMonster[];
  items: CampaignItem[];
  events: CampaignEvent[];
  skills: CampaignSkillForm[];
}

export type UpdateCampaignField = <K extends keyof CampaignData>(
  field: K,
  value: CampaignData[K],
) => void;
