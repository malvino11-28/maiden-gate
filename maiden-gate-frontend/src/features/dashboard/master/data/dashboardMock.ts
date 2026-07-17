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
  FolderTree,
  Sparkles,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

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
    id: "1",
    title: "A Flor do Abismo",
    players: 4,
    sessions: 12,
    lastSession: "22 Jun 2026",
    status: "active" as const,
  },
  {
    id: "2",
    title: "Crônicas de Vareth",
    players: 3,
    sessions: 7,
    lastSession: "10 Mai 2026",
    status: "paused" as const,
  },
  {
    id: "3",
    title: "O Despertar da Donzela",
    players: 5,
    sessions: 20,
    lastSession: "03 Jan 2026",
    status: "closed" as const,
  },
];

export type ActiveModal =
  | "event"
  | "npc"
  | "monster"
  | "item"
  | "location"
  | "skill"
  | "collection"
  | "transfer";

type QuickAction = {
  id: ActiveModal;
  icon: LucideIcon;
  title: string;
  description: string;
};

export const quickActions: QuickAction[] = [
  {
    id: "collection",
    icon: FolderTree,
    title: "Novo Conjunto",
    description: "Agrupe elementos por mapa ou arco.",
  },
  {
    id: "location",
    icon: MapPinned,
    title: "Nova Localização",
    description: "Adicione cidades, regiões e masmorras.",
  },
  {
    id: "npc",
    icon: Users,
    title: "Novo NPC",
    description: "Crie personagens não-jogadores.",
  },
  {
    id: "monster",
    icon: Skull,
    title: "Novo Monstro",
    description: "Adicione criaturas ao bestiário.",
  },
  {
    id: "item",
    icon: Gem,
    title: "Novo Item",
    description: "Armas, armaduras e artefatos.",
  },
  {
    id: "event",
    icon: CalendarPlus,
    title: "Novo Evento",
    description: "Registre acontecimentos da campanha.",
  },
  {
    id: "skill",
    icon: Sparkles,
    title: "Nova Skill",
    description: "Crie habilidades exclusivas de campanha.",
  },
  {
    id: "transfer",
    icon: Copy,
    title: "Duplicar Recursos",
    description: "Reutilize NPCs, locais e mais.",
  },
];
