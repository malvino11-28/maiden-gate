import {
  BarChart2,
  Backpack,
  Calendar,
  Globe,
  Lock,
  Scroll,
  Shield,
  Star,
  Swords,
  User,
} from "lucide-react";

import type {
  AvailableCampaign,
  PlayerCampaignSummary,
  PlayerCharacterSummary,
  PlayerDashboardTab,
  PlayerStat,
} from "../types/player";

export const playerName = "Kael Sondra";

export const playerCharacters: PlayerCharacterSummary[] = [
  {
    id: 1,
    nome: "Lirien",
    sobrenome: "Respiração",
    marca: "Respiração",
    nivel: 7,
    hp: 58,
    hpMax: 72,
    campanha: "A Flor do Abismo",
    marcaCor: "from-sky-400 to-cyan-600",
    marcaEmoji: "🌬️",
  },
  {
    id: 2,
    nome: "Brann",
    sobrenome: "Maso",
    marca: "Maso",
    nivel: 4,
    hp: 40,
    hpMax: 40,
    campanha: "Véu de Cinzas",
    marcaCor: "from-red-600 to-rose-800",
    marcaEmoji: "🩸",
  },
];

export const myCampaigns: PlayerCampaignSummary[] = [
  {
    id: 1,
    campanha: "A Flor do Abismo",
    mestre: "Aldric Voss",
    proximaSessao: "28 Jun 2026",
    status: "ativa",
    personagem: "Lirien Respiração",
  },
  {
    id: 2,
    campanha: "Véu de Cinzas",
    mestre: "Sareth Mora",
    proximaSessao: "—",
    status: "encerrada",
    personagem: "Brann Maso",
  },
];

export const availableCampaigns: AvailableCampaign[] = [
  {
    id: 1,
    campanha: "Crônicas de Vareth",
    mestre: "Sareth Mora",
    vagas: 2,
    nivel: "Iniciante",
    proximaSessao: "02 Jul 2026",
    marca: "Qualquer",
  },
  {
    id: 2,
    campanha: "O Sangue de Maso",
    mestre: "Ilwen Drak",
    vagas: 1,
    nivel: "Intermediário",
    proximaSessao: "05 Jul 2026",
    marca: "Maso ou Manifesto",
  },
  {
    id: 3,
    campanha: "Lamentos do Norte",
    mestre: "Caius Ren",
    vagas: 3,
    nivel: "Iniciante",
    proximaSessao: "10 Jul 2026",
    marca: "Qualquer",
  },
];

export const playerDashboardTabs: { key: PlayerDashboardTab; label: string }[] =
  [
    { key: "personagens", label: "Personagens" },
    { key: "minhas-campanhas", label: "Minhas Campanhas" },
    { key: "campanhas-disponiveis", label: "Campanhas Disponíveis" },
    { key: "perfil", label: "Perfil" },
  ];

export const campaignStatusStyle = {
  ativa: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  pausada: "", // deixando sem nada pois atualmente nem tem como alterar o status da campanha
  encerrada: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

export const campaignStatusLabel = {
  ativa: "Ativa",
  pausada: "Pausada",
  encerrada: "Encerrada",
};

export function getPlayerStats(): PlayerStat[] {
  return [
    { label: "Personagens", value: playerCharacters.length, icon: User },
    {
      label: "Campanhas ativas",
      value: myCampaigns.filter((campaign) => campaign.status === "ativa")
        .length,
      icon: Scroll,
    },
    {
      label: "Campanhas disponíveis",
      value: availableCampaigns.length,
      icon: Globe,
    },
    { label: "Tipo de conta", value: "Jogador", icon: Shield },
  ];
}

export const profileQuickActions: {
  icon: typeof Swords;
  label: string;
  tab: PlayerDashboardTab | null;
}[] = [
  { icon: Swords, label: "Ver Personagens", tab: "personagens" },
  { icon: Scroll, label: "Minhas Campanhas", tab: "minhas-campanhas" },
  { icon: Globe, label: "Campanhas Disponíveis", tab: "campanhas-disponiveis" },
  { icon: Lock, label: "Privacidade", tab: null },
];

export const characterMiniStats = [
  { icon: Star, label: "Nível", key: "level" },
  { icon: BarChart2, label: "HP", key: "hp" },
  { icon: Backpack, label: "Itens", key: "items" },
];

export { Calendar };
