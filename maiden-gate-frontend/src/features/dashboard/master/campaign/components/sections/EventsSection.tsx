import { CalendarDays } from "lucide-react";

import EditableListSection from "./EditableListSection";
import type { CampaignData, CampaignEvent, UpdateCampaignField } from "../../types/campaign";

type Props = {
  campaign: CampaignData;
  updateField: UpdateCampaignField;
  onNext: () => void;
  onPrevious: () => void;
};

const emptyEvent = (): CampaignEvent => ({
  title: "",
  chronology: "",
  date: "",
  description: "",
});

export default function EventsSection({ campaign, updateField, onNext, onPrevious }: Props) {
  return (
    <EditableListSection<CampaignEvent>
      title="Eventos & Crônicas"
      description="A linha do tempo da campanha: passado, presente e eventos futuros."
      icon={CalendarDays}
      iconClassName="text-orange-400"
      items={campaign.events}
      emptyItem={emptyEvent}
      titleField="title"
      onChange={(items) => updateField("events", items)}
      addLabel="Adicionar Evento"
      onPrevious={onPrevious}
      onNext={onNext}
      nextLabel="Próximo: Skills"
      fields={[
        { name: "title", label: "Título do Evento", placeholder: "Ex: A Queda de Valdris" },
        { name: "chronology", label: "Cronologia", placeholder: "Ex: 300 anos antes, Sessão 3, Clímax…" },
        { name: "date", label: "Data do Evento", placeholder: "Ex: Ano 7 da Era das Cinzas" },
        { name: "description", label: "Descrição", placeholder: "O que aconteceu e por que importa para a narrativa…", type: "textarea" },
      ]}
    />
  );
}
