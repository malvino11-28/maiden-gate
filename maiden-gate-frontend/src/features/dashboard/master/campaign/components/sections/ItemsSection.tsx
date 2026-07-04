import { Gem } from "lucide-react";

import EditableListSection from "./EditableListSection";
import type { CampaignData, CampaignItem, UpdateCampaignField } from "../../types/campaign";

type Props = {
  campaign: CampaignData;
  updateField: UpdateCampaignField;
  onNext: () => void;
  onPrevious: () => void;
};

const emptyItem = (): CampaignItem => ({
  name: "",
  type: "",
  description: "",
});

export default function ItemsSection({ campaign, updateField, onNext, onPrevious }: Props) {
  return (
    <EditableListSection<CampaignItem>
      title="Artefatos & Itens"
      description="Equipamentos, relíquias, tesouros e objetos narrativos."
      icon={Gem}
      iconClassName="text-sky-400"
      items={campaign.items}
      emptyItem={emptyItem}
      titleField="name"
      onChange={(items) => updateField("items", items)}
      addLabel="Adicionar Item"
      onNext={onNext}
      onPrevious={onPrevious}
      nextLabel="Próximo: Eventos"
      fields={[
        { name: "name", label: "Nome", placeholder: "Ex: Cristal do Abismo" },
        { name: "type", label: "Tipo", placeholder: "Ex: Arma, Armadura, Artefato, Consumível…" },
        { name: "description", label: "Descrição & Efeito", placeholder: "História, propriedades mágicas e efeito mecânico…", type: "textarea" },
      ]}
    />
  );
}
