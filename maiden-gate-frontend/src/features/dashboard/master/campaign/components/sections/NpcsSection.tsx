import { Users } from "lucide-react";

import EditableListSection from "./EditableListSection";
import type { CampaignData, CampaignNpc, UpdateCampaignField } from "../../types/campaign";

type Props = {
  campaign: CampaignData;
  updateField: UpdateCampaignField;
  onNext: () => void;
  onPrevious: () => void;
};

const emptyNpc = (): CampaignNpc => ({
  name: "",
  species: "",
  occupation: "",
  personality: "",
  secret: "",
});

export default function NpcsSection({ campaign, updateField, onNext, onPrevious }: Props) {
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
        { name: "name", label: "Nome", placeholder: "Ex: Eryn, o Taberneiro" },
        { name: "species", label: "Raça / Espécie", placeholder: "Ex: Humano, Élfico…" },
        { name: "occupation", label: "Ocupação", placeholder: "Ex: Mercador, Guarda, Oráculo…" },
        { name: "personality", label: "Personalidade & Motivação", placeholder: "Traços marcantes, objetivos e maneirismos…", type: "textarea" },
        { name: "secret", label: "Segredo", placeholder: "O que esse NPC esconde?", type: "textarea" },
      ]}
    />
  );
}
