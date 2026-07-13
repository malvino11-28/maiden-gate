import { Skull } from "lucide-react";

import EditableListSection from "./EditableListSection";
import type {
  CampaignData,
  CampaignMonster,
  UpdateCampaignField,
} from "../../types/campaign";

type Props = {
  campaign: CampaignData;
  updateField: UpdateCampaignField;
  onNext: () => void;
  onPrevious: () => void;
};

const emptyMonster = (): CampaignMonster => ({
  image: null,
  name: "",
  type: "",
  threat: "",
  skills: [],
  stats: {
    level: 1,
    hp: 100,
    mana: 50,
    atk: 10,
    def: 10,
    speed: 10,
  },
  description: "",
});

export default function MonstersSection({
  campaign,
  updateField,
  onNext,
  onPrevious,
}: Props) {
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
        { name: "image", label: "Imagem", type: "image", placeholder: "" },
        { name: "name", label: "Nome", placeholder: "Ex: Golem de Cristal" },
        {
          name: "type",
          label: "Tipo",
          placeholder: "Ex: Constructo, Morto-vivo...",
        },
        {
          name: "threat",
          label: "Nível de Ameaça",
          placeholder: "Ex: 4 (médio)",
        },
        {
          name: "description",
          label: "Descrição",
          placeholder: "Aparência, habitat e comportamento...",
          type: "textarea",
        },
        {
          name: "skills",
          label: "Habilidades Especiais",
          type: "skills",
          placeholder: "",
        },
        { name: "stats", label: "Status", type: "status", placeholder: "" },
      ]}
    />
  );
}
