import { Skull } from "lucide-react";

import EditableListSection from "./EditableListSection";
import type { CampaignData, CampaignMonster, UpdateCampaignField } from "../../types/campaign";

type Props = {
  campaign: CampaignData;
  updateField: UpdateCampaignField;
  onNext: () => void;
  onPrevious: () => void;
};

const emptyMonster = (): CampaignMonster => ({
  name: "",
  type: "",
  threat: "",
  skills: "",
  description: "",
});

export default function MonstersSection({ campaign, updateField, onNext, onPrevious }: Props) {
  return (
    <EditableListSection<CampaignMonster>
      title="Bestiário"
      description="Criaturas, antagonistas e ameaças que os aventureiros enfrentarão."
      icon={Skull}
      iconClassName="text-rose-400"
      items={campaign.monsters}
      emptyItem={emptyMonster}
      titleField="name"
      onChange={(items) => updateField("monsters", items)}
      addLabel="Adicionar Criatura"
      onNext={onNext}
      onPrevious={onPrevious}
      nextLabel="Próximo: Itens"
      fields={[
        { name: "name", label: "Nome", placeholder: "Ex: Golem de Cristal" },
        { name: "type", label: "Tipo", placeholder: "Ex: Constructo, Morto-vivo, Besta…" },
        { name: "threat", label: "Nível de Ameaça", placeholder: "Ex: 4 (médio)" },
        { name: "skills", label: "Habilidades Especiais", placeholder: "Ex: Regeneração, Voo, Veneno…" },
        { name: "description", label: "Descrição & Comportamento", placeholder: "Aparência, habitat e tática de combate…", type: "textarea" },
      ]}
    />
  );
}
