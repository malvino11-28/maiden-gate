import {
  BookOpen,
  Crown,
  Globe,
  CalendarDays,
  MapPinned,
  Users,
  Skull,
  Gem,
  CalendarPlus,
  Copy,
} from "lucide-react";

export const stats = [
  {
    icon: BookOpen,
    value: 3,
    label: "Campanhas",
  },
  {
    icon: Globe,
    value: 1,
    label: "Ativas",
  },
  {
    icon: CalendarDays,
    value: 39,
    label: "Sessões totais",
  },
  {
    icon: Crown,
    value: "Mestre",
    label: "Tipo de conta",
  },
];

export const campaigns = [
  {
    title: "A Flor do Abismo",
    players: 4,
    sessions: 12,
    lastSession: "22 Jun 2026",
    status: "active" as const,
  },
  {
    title: "Crônicas de Vareth",
    players: 3,
    sessions: 7,
    lastSession: "10 Mai 2026",
    status: "paused" as const,
  },
  {
    title: "O Despertar da Donzela",
    players: 5,
    sessions: 20,
    lastSession: "03 Jan 2026",
    status: "closed" as const,
  },
];

export const quickActions = [
  {
    icon: MapPinned,
    title: "Nova Localização",
    description: "Adicione cidades, regiões e masmorras.",
  },
  {
    icon: Users,
    title: "Novo NPC",
    description: "Crie personagens não-jogadores.",
  },
  {
    icon: Skull,
    title: "Novo Monstro",
    description: "Adicione criaturas ao bestiário.",
  },
  {
    icon: Gem,
    title: "Novo Item",
    description: "Armas, armaduras e artefatos.",
  },
  {
    icon: CalendarPlus,
    title: "Novo Evento",
    description: "Registre acontecimentos da campanha.",
  },
  {
    icon: Copy,
    title: "Duplicar Recursos",
    description: "Reutilize NPCs, locais e monstros.",
  },
];
