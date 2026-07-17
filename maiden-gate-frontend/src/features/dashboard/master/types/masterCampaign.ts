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

export interface CampaignCollection {
  id: string | number;
  name: string;
  description?: string | null;
  color?: string | null;
  sortOrder?: number;
  visibleToPlayers?: boolean;
}

export interface CampaignElementCollection {
  id?: string | number | null;
  name?: string | null;
  description?: string | null;
  color?: string | null;
}

export interface CampaignLocation {
  id?: string | number;
  collection_id?: string | number | null;
  collectionId?: string | number | null;
  collection?: CampaignElementCollection | null;
  visible_to_players?: boolean;
  visibleToPlayers?: boolean;
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
  collection_id?: string | number | null;
  collectionId?: string | number | null;
  collection?: CampaignElementCollection | null;
  visible_to_players?: boolean;
  visibleToPlayers?: boolean;
  image?: string | null;
  imagem?: string | null;
  nome?: string;
  name?: string;
  raca?: string;
  race?: string;
  ocupacao?: string;
  occupation?: string;
  personalidade?: string;
  personality?: string;
  segredo?: string;
  secret?: string;
  description?: string;
  skills?: string | string[];
  stats?: CampaignElementStatus | null;
}

export interface CampaignMonster {
  id?: string | number;
  collection_id?: string | number | null;
  collectionId?: string | number | null;
  collection?: CampaignElementCollection | null;
  visible_to_players?: boolean;
  visibleToPlayers?: boolean;
  image?: string | null;
  imagem?: string | null;
  nome?: string;
  name?: string;
  tipo?: string;
  type?: string;
  ameaca?: string;
  threat?: string;
  habilidades: string;
  skills?: string | string[];
  descricao?: string;
  description?: string;
  stats?: CampaignElementStatus | null;
}

export interface CampaignItem {
  id?: string | number;
  collection_id?: string | number | null;
  collectionId?: string | number | null;
  collection?: CampaignElementCollection | null;
  visible_to_players?: boolean;
  visibleToPlayers?: boolean;
  name?: string;
  type?: string;
  description?: string;
  nome: string;
  tipo: string;
  descricao: string;
}

export interface CampaignEvent {
  id?: string | number;
  collection_id?: string | number | null;
  collectionId?: string | number | null;
  collection?: CampaignElementCollection | null;
  visible_to_players?: boolean;
  visibleToPlayers?: boolean;
  title?: string;
  chronology?: string;
  date?: string;
  description?: string;
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
  collections?: CampaignCollection[];
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
