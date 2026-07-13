export type CampaignStatus = "ativa" | "pausada" | "encerrada";

export type SectionKey =
  | "elementos"
  | "membros"
  | "localizacao"
  | "notas"
  | "sessoes"
  | "dados"
  | "batalha";

export type DiceType = 4 | 6 | 8 | 10 | 12 | 20 | 100;

export interface CampaignAttribute {
  nome: string;
  valor: number;
  mod: number;
}

export interface CampaignSkill {
  nome: string;
  tipo: "Ativa" | "Passiva" | "Reação";
}

export interface CampaignMember {
  id?: string | number;
  nome: string;
  personagem: string;
  marca: string;
  emoji?: string;
  iconImage?: string | null;
  nivel: number;
  hp: number;
  hpMax: number;
  atributos: CampaignAttribute[];
  habilidades: CampaignSkill[];
}

export interface CampaignLocation {
  id?: string | number;
  imagem?: string | null;
  image?: string | null;
  nome: string;
  name?: string;
  tipo: string;
  type?: string;
  regiao?: string;
  region?: string;
  descricao: string;
  description?: string;
}

export type CampaignElementStatus = {
  level?: number;
  hp?: number;
  mana?: number;
  atk?: number;
  def?: number;
  speed?: number;
  [key: string]: number | undefined;
};

export interface CampaignNpc {
  id?: string | number;
  image?: string | null;
  name: string;
  race: string;
  occupation: string;
  personality: string;
  secret: string;
  description?: string;
  skills?: string | string[];
  stats?: CampaignElementStatus | null;
}

export interface CampaignMonster {
  id?: string | number;
  image?: string | null;
  name?: string;
  type?: string;
  threat?: string;
  habilidades: string;
  skills?: string | string[];
  description?: string;
  stats?: CampaignElementStatus | null;
}

export interface CampaignItem {
  id?: string | number;
  nome: string;
  tipo: string;
  descricao: string;
}

export interface CampaignEvent {
  id?: string | number;
  titulo: string;
  cronologia: string;
  data: string;
  descricao: string;
}

export interface CampaignElements {
  localizacoes: CampaignLocation[];
  npcs: CampaignNpc[];
  monstros: CampaignMonster[];
  itens: CampaignItem[];
  eventos: CampaignEvent[];
}

export interface CurrentLocation {
  id?: string | number | null;
  imagem?: string | null;
  image?: string | null;
  nome: string;
  name?: string;
  tipo?: string;
  type?: string;
  regiao?: string;
  region?: string;
  descricao?: string;
  description?: string;
}

export interface MasterCampaign {
  id: string;
  nome: string;
  status: CampaignStatus;
  sessoes: number;
  ultimaSessao: string;

  imagem?: string;
  descricao?: string;
  nivelRecomendado?: string;
  jogadores?: string;
  agendaSessoes?: CampaignSessionNotice[];

  localizacaoAtual: CurrentLocation;
  membros: CampaignMember[];
  elementos: CampaignElements;
  notas: string;
}

export type CampaignSessionStatus = "em_espera" | "concluido" | "cancelado";

export interface CampaignSessionNotice {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  status: CampaignSessionStatus;
}
