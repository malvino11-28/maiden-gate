export type RecommendedLevel = "Iniciante" | "Intermediário" | "Avançado";

export interface CampaignLocation {
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
  image: File | null | string;
  name: string;
  type: string;
  threat: string;
  skills: string[];
  stats: StatusData;
  description: string;
}

export interface CampaignItem {
  name: string;
  type: string;
  description: string;
}

export interface CampaignEvent {
  title: string;
  chronology: string;
  date: string;
  description: string;
}

export interface CampaignData {
  image: string;
  name: string;
  description: string;
  recommendedLevel: RecommendedLevel;
  players: string;
  notes?: string;
  locations: CampaignLocation[];
  npcs: CampaignNpc[];
  monsters: CampaignMonster[];
  items: CampaignItem[];
  events: CampaignEvent[];
}

export type UpdateCampaignField = <K extends keyof CampaignData>(
  field: K,
  value: CampaignData[K],
) => void;
