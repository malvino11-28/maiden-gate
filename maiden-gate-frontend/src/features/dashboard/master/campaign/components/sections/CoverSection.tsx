import Input from "../../../../../../shared/components/Form/Input";
import TextArea from "../../../../../../shared/components/Form/TextArea";

import FormField from "../../../components/forms/FormField";

import CampaignImageUpload from "../CreateCampaign/CampaignImageUpload";
import CampaignLevelSelector from "../CreateCampaign/CampaignLevelSelector";
import CampaignStepNavigation from "../CreateCampaign/CampaignStepNavigation";

import type { CampaignData, UpdateCampaignField } from "../../types/campaign";

type Props = {
  campaign: CampaignData;
  updateField: UpdateCampaignField;
  onNext: () => void;
};

export default function CoverSection({ campaign, updateField, onNext }: Props) {
  return (
    <section className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-6">
        <h2 className="mb-1 flex items-center gap-3 text-3xl font-semibold text-amber-100">
          Capa da Campanha
        </h2>
        <p className="text-sm text-amber-100/40">
          Defina a identidade visual e essencial da sua aventura.
        </p>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-900/40" />
        <div className="h-1.5 w-1.5 rotate-45 bg-amber-700/50" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-900/40" />
      </div>

      <div className="space-y-6">
        <FormField label="Imagem da Campanha" required>
          <CampaignImageUpload image={campaign.image} onChange={(image) => updateField("image", image)} />
        </FormField>

        <FormField label="Nome da Campanha" required>
          <Input
            value={campaign.name}
            placeholder="O nome que ficará para a história..."
            onChange={(e) => updateField("name", e.target.value)}
          />
        </FormField>

        <FormField label="Descrição" required>
          <TextArea
            rows={6}
            value={campaign.description}
            placeholder="Qual é a premissa da campanha?"
            onChange={(e) => updateField("description", e.target.value)}
          />
        </FormField>

        <FormField label="Nível Recomendado" required>
          <CampaignLevelSelector
            value={campaign.recommendedLevel}
            onChange={(value) => updateField("recommendedLevel", value)}
          />
        </FormField>

        <FormField label="Número de Jogadores" required>
          <Input
            value={campaign.players}
            placeholder="Ex.: 3–5"
            onChange={(e) => updateField("players", e.target.value)}
          />
        </FormField>
      </div>

      <CampaignStepNavigation onNext={onNext} nextLabel="Próximo: Localizações" />
    </section>
  );
}
