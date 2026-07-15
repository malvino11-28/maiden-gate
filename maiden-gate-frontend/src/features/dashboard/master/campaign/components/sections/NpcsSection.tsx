import { Users } from "lucide-react";

import EditableListSection from "./EditableListSection";
import type {
  CampaignData,
  CampaignNpc,
  UpdateCampaignField,
} from "../../types/campaign";

type markOption = {
  id: number;
  name: string;
};

type Props = {
  campaign: CampaignData;
  updateField: UpdateCampaignField;
  marks: markOption[];
  onNext: () => void;
  onPrevious: () => void;
};

const emptyNpc = (): CampaignNpc => ({
  collectionId: "",
  image: null,
  name: "",
  marca_id: "",
  race: "",
  occupation: "",
  personality: "",
  secret: "",
  description: "",
  skills: [],
  stats: {
    level: 1,
    hp: 100,
    mana: 50,
    atk: 10,
    def: 10,
    speed: 10,
  },
});

export default function NpcsSection({
  campaign,
  updateField,
  marks,
  onNext,
  onPrevious,
}: Props) {
  return (
    <EditableListSection<CampaignNpc>
      title="NPCs"
      description="Personagens não-jogadores, aliados, rivais e figuras políticas."
      icon={Users}
      iconClassName="text-violet-400"
      items={campaign.npcs}
      emptyItem={emptyNpc}
      titleField="name"
      onChange={(items) => updateField("npcs", items)}
      addLabel="Adicionar NPC"
      onNext={onNext}
      onPrevious={onPrevious}
      nextLabel="Próximo: Bestiário"
      fields={[
        {
          name: "collectionId",
          label: "Conjunto",
          placeholder: "Sem conjunto",
          type: "select",
          options: campaign.collections.map((collection) => ({
            value: collection.clientId,
            label: collection.name || "Conjunto sem nome",
          })),
        },
        { name: "image", label: "Imagem", type: "image", placeholder: "" },
        { name: "name", label: "Nome", placeholder: "Ex: Eryn, o Taberneiro" },
        {
          name: "marca_id",
          label: "Marca",
          type: "select",
          placeholder: "Selecione uma marca",
          options: marks.map((mark) => ({
            value: String(mark.id),
            label: mark.name,
          })),
        },
        {
          name: "race",
          label: "Raça / Espécie",
          placeholder: "Ex: Humano, Élfico...",
        },
        {
          name: "occupation",
          label: "Ocupação",
          placeholder: "Ex: Mercador, Guarda...",
        },
        {
          name: "description",
          label: "Descrição",
          placeholder: "Descrição geral do NPC...",
          type: "textarea",
        },
        {
          name: "personality",
          label: "Personalidade",
          placeholder: "Traços, objetivos e maneirismos...",
          type: "textarea",
        },
        {
          name: "secret",
          label: "Segredo",
          placeholder: "O que esse NPC esconde?",
          type: "textarea",
        },
        {
          name: "skills",
          label: "Habilidades",
          type: "skills",
          placeholder: "",
        },
        { name: "stats", label: "Status", type: "status", placeholder: "" },
      ]}
    />
  );
}
