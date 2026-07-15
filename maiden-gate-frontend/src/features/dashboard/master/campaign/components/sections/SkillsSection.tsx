import { Sparkles } from "lucide-react";

import EditableListSection from "./EditableListSection";
import type {
  CampaignData,
  CampaignSkillForm,
  UpdateCampaignField,
} from "../../types/campaign";
import type { MarkOption } from "../../service/markService";

type Props = {
  campaign: CampaignData;
  updateField: UpdateCampaignField;
  marks: MarkOption[];
  onPrevious: () => void;
  onFinish: () => void;
};

const emptySkill = (): CampaignSkillForm => ({
  marca_id: "",
  name: "",
  description: "",
  type: "campanha",
  branch: "campanha",
  unlock_level: "1",
  resource_cost: "0",
  range: "",
});

export default function SkillsSection({
  campaign,
  updateField,
  marks,
  onPrevious,
  onFinish,
}: Props) {
  return (
    <EditableListSection<CampaignSkillForm>
      title="Skills da Campanha"
      description="Habilidades exclusivas criadas pelo Mestre para esta campanha. Toda skill criada aqui será registrada automaticamente com tipo e ramo Campanha."
      icon={Sparkles}
      iconClassName="text-violet-400"
      items={campaign.skills}
      emptyItem={emptySkill}
      titleField="name"
      onChange={(skills) => updateField("skills", skills)}
      addLabel="Adicionar Skill"
      onPrevious={onPrevious}
      onNext={onFinish}
      nextLabel="Criar Campanha"
      finish
      fields={[
        {
          name: "marca_id",
          label: "Marca vinculada",
          placeholder: "Skill geral da campanha",
          type: "select",
          options: marks.map((mark) => ({
            value: String(mark.id),
            label: mark.name,
          })),
        },
        { name: "name", label: "Nome", placeholder: "Ex: Corte do Véu" },
        {
          name: "unlock_level",
          label: "Nível necessário",
          placeholder: "Ex: 1",
        },
        {
          name: "resource_cost",
          label: "Custo de recurso",
          placeholder: "Ex: 0, 1, 2…",
        },
        {
          name: "range",
          label: "Alcance / Momento de uso",
          placeholder: "Ex: Próprio turno, reação, curto alcance…",
        },
        {
          name: "description",
          label: "Descrição & efeito",
          placeholder: "Explique o que a habilidade faz, seu custo, condição e consequência narrativa.",
          type: "textarea",
        },
      ]}
    />
  );
}
