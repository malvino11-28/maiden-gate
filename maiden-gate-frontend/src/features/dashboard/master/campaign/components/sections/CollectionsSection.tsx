import { FolderTree } from "lucide-react";

import EditableListSection from "./EditableListSection";
import type {
  CampaignCollection,
  CampaignData,
  UpdateCampaignField,
} from "../../types/campaign";

import {
  COLLECTION_COLOR_OPTIONS,
  DEFAULT_COLLECTION_COLOR,
} from "../../../data/collectionColors";

type Props = {
  campaign: CampaignData;
  updateField: UpdateCampaignField;
  onNext: () => void;
  onPrevious: () => void;
};

function createClientId() {
  return `collection-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const emptyCollection = (): CampaignCollection => ({
  clientId: createClientId(),
  name: "",
  description: "",
  color: DEFAULT_COLLECTION_COLOR,
});

export default function CollectionsSection({
  campaign,
  updateField,
  onNext,
  onPrevious,
}: Props) {
  return (
    <EditableListSection<CampaignCollection>
      title="Conjuntos"
      description="Organize elementos grandes da campanha por mapa, região, facção, arco narrativo ou segredo."
      icon={FolderTree}
      iconClassName="text-amber-400"
      items={campaign.collections}
      emptyItem={emptyCollection}
      titleField="name"
      onChange={(collections) => updateField("collections", collections)}
      addLabel="Adicionar Conjunto"
      onNext={onNext}
      onPrevious={onPrevious}
      nextLabel="Próximo: Localizações"
      fields={[
        {
          name: "name",
          label: "Nome",
          placeholder: "Ex: Domínio do Manifesto, Região da Cratera...",
        },
        {
          name: "description",
          label: "Descrição",
          placeholder: "Explique o que esse conjunto representa na campanha.",
          type: "textarea",
        },
        {
          name: "color",
          label: "Cor do Conjunto",
          type: "select",
          placeholder: "Selecione uma cor",
          options: COLLECTION_COLOR_OPTIONS,
        },
      ]}
    />
  );
}
