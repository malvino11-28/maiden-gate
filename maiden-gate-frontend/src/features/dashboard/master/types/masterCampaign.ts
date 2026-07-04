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
  tipo: "Ativa" | "Passiva";
}

export interface CampaignMember {
  nome: string;
  personagem: string;
  marca: string;
  emoji: string;
  nivel: number;
  hp: number;
  hpMax: number;
  atributos: CampaignAttribute[];
  habilidades: CampaignSkill[];
}

export interface CampaignLocation {
  nome: string;
  tipo: string;
  regiao: string;
  descricao: string;
}

export interface CampaignNpc {
  nome: string;
  raca: string;
  ocupacao: string;
  personalidade: string;
  segredo: string;
}

export interface CampaignMonster {
  nome: string;
  tipo: string;
  ameaca: string;
  habilidades: string;
  descricao: string;
}

export interface CampaignItem {
  nome: string;
  tipo: string;
  descricao: string;
}

export interface CampaignEvent {
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
  nome: string;
  tipo: string;
  descricao: string;
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
