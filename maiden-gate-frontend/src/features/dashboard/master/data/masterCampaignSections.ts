import {
  BookOpen,
  CalendarDays,
  FileText,
  MapPin,
  PenLine,
  Swords,
  Users,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { SectionKey } from "../types/masterCampaign";

export const campaignSections: {
  key: SectionKey;
  label: string;
  icon: LucideIcon;
}[] = [
  {
    key: "elementos",
    label: "Elementos",
    icon: BookOpen,
  },
  {
    key: "membros",
    label: "Membros",
    icon: Users,
  },
  {
    key: "localizacao",
    label: "Localização",
    icon: MapPin,
  },
  {
    key: "notas",
    label: "Notas",
    icon: PenLine,
  },
  {
    key: "sessoes",
    label: "Sessões",
    icon: CalendarDays,
  },
  {
    key: "dados",
    label: "Dados",
    icon: FileText,
  },
  {
    key: "batalha",
    label: "Batalha",
    icon: Swords,
  },
];
