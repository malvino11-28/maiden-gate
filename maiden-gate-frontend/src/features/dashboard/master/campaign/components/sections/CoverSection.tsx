import { useState } from "react";

import Input from "../../../../../../shared/components/Form/Input";
import TextArea from "../../../../../../shared/components/Form/TextArea";

import FormField from "../../../components/forms/FormField";

import CampaignImageUpload from "../CreateCampaign/CampaignImageUpload";
import CampaignLevelSelector from "../CreateCampaign/CampaignLevelSelector";
import CampaignStepNavigation from "../CreateCampaign/CampaignStepNavigation";

type Props = {
  onNext: () => void;
};

export default function CoverSection({ onNext }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [players, setPlayers] = useState("");
  const [level, setLevel] = useState("Iniciante");

  return (
    <div className="mt-10 max-w-3xl space-y-8">
      <FormField label="Imagem da Campanha" required>
        <CampaignImageUpload />
      </FormField>

      <FormField label="Nome da Campanha" required>
        <Input
          value={name}
          placeholder="O nome que ficará para a história..."
          onChange={(e) => setName(e.target.value)}
        />
      </FormField>

      <FormField label="Descrição" required>
        <TextArea
          rows={6}
          value={description}
          placeholder="Qual é a premissa da campanha?"
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-8">
        <FormField label="Nível Recomendado" required>
          <CampaignLevelSelector value={level} onChange={setLevel} />
        </FormField>

        <FormField label="Número de Jogadores" required>
          <Input
            value={players}
            placeholder="Ex.: 3-5"
            onChange={(e) => setPlayers(e.target.value)}
          />
        </FormField>
      </div>

      <CampaignStepNavigation onNext={onNext} />
    </div>
  );
}
