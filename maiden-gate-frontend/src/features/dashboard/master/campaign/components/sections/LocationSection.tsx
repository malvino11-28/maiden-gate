import { MapPin } from "lucide-react";

import EditableListSection from "./EditableListSection";
import type { CampaignData, CampaignLocation, UpdateCampaignField } from "../../types/campaign";

type Props = {
  campaign: CampaignData;
  updateField: UpdateCampaignField;
  onNext: () => void;
  onPrevious: () => void;
};

const emptyLocation = (): CampaignLocation => ({
  name: "",
  type: "",
  region: "",
  description: "",
});

export default function LocationSection({ campaign, updateField, onNext, onPrevious }: Props) {
  return (
    <EditableListSection<CampaignLocation>
      title="Localizações"
      description="Cidades, regiões, masmorras e pontos importantes da campanha."
      icon={MapPin}
      iconClassName="text-emerald-400"
      items={campaign.locations}
      emptyItem={emptyLocation}
      titleField="name"
      onChange={(items) => updateField("locations", items)}
      addLabel="Adicionar Localização"
      onNext={onNext}
      onPrevious={onPrevious}
      nextLabel="Próximo: NPCs"
      fields={[
        { name: "name", label: "Nome", placeholder: "Ex: Torre de Valdris" },
        { name: "type", label: "Tipo", placeholder: "Ex: Cidade, Masmorra, Floresta…" },
        { name: "region", label: "Região", placeholder: "Em qual região do mapa fica?" },
        { name: "description", label: "Descrição", placeholder: "História, clima, pontos de interesse…", type: "textarea" },
      ]}
    />
  );
}
