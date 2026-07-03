export type RecommendedLevel = "Iniciante" | "Intermediário" | "Avançado";

export interface CampaignData {
  image: string;

  name: string;

  description: string;

  recommendedLevel: RecommendedLevel;

  players: string;

  locations: unknown[];

  npcs: unknown[];

  monsters: unknown[];

  items: unknown[];

  events: unknown[];
}
