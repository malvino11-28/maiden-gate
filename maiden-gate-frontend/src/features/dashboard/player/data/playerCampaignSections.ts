import {
  Backpack,
  BookOpen,
  CalendarDays,
  MapPin,
  Swords,
  User,
  Users,
} from "lucide-react";
import type { ElementType } from "react";
import type { PlayerCampaignSectionKey } from "../types/player";

export const playerCampaignSections: {
  key: PlayerCampaignSectionKey;
  label: string;
  icon: ElementType;
}[] = [
  { key: "elementos", label: "Elementos", icon: BookOpen },
  { key: "personagem", label: "Personagem", icon: User },
  { key: "membros", label: "Membros", icon: Users },
  { key: "localizacao", label: "Localização", icon: MapPin },
  { key: "inventario", label: "Inventário", icon: Backpack },
  { key: "sessoes", label: "Sessões", icon: CalendarDays },
  { key: "batalha", label: "Batalha", icon: Swords },
];
