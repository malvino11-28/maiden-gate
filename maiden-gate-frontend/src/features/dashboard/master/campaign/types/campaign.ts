export type RecommendedLevel = "Iniciante" | "Intermediário" | "Avançado";

export interface CampaignLocation {
  name: string;
  type: string;
  region: string;
  description: string;
}

export interface CampaignNpc {
  name: string;
  occupation: string;
  personality: string;
  secret: string;
}

export interface CampaignMonster {
  name: string;
  type: string;
  threat: string;
  skills: string;
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
