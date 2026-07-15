import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

import Modal from "../../../../../shared/components/Modal/Modal";
import ModalHeader from "../../../../../shared/components/Modal/ModalHeader";
import ModalBody from "../../../../../shared/components/Modal/ModalBody";
import ModalFooter from "../../../../../shared/components/Modal/ModalFooter";
import FormField from "../forms/FormField";
import CampaignSelect from "../forms/CampaignSelect";
import Input from "../../../../../shared/components/Form/Input";
import TextArea from "../../../../../shared/components/Form/TextArea";
import Button from "../../../../../shared/components/Button/Button";

import { createSkill } from "../../services/masterElementService";
import { getMarks, type MarkOption } from "../../campaign/service/markService";

type SkillModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fixedCampaignId?: string | number;
  fixedCampaignName?: string;
};

const selectClass =
  "w-full rounded-xl border border-orange-500/20 bg-[#11162B] px-4 py-3 text-stone-200 transition focus:border-orange-400 focus:outline-none";

export default function SkillModal({
  isOpen,
  onClose,
  fixedCampaignId,
  fixedCampaignName,
}: SkillModalProps) {
  const [campaign, setCampaign] = useState(
    fixedCampaignId ? String(fixedCampaignId) : "",
  );
  const [marks, setMarks] = useState<MarkOption[]>([]);
  const [markId, setMarkId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unlockLevel, setUnlockLevel] = useState("1");
  const [resourceCost, setResourceCost] = useState("0");
  const [range, setRange] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setCampaign(fixedCampaignId ? String(fixedCampaignId) : "");

    async function loadMarks() {
      const data = await getMarks();
      setMarks(data);
    }

    loadMarks();
  }, [fixedCampaignId, isOpen]);

  function resetForm() {
    if (!fixedCampaignId) {
      setCampaign("");
    }

    setMarkId("");
    setName("");
    setDescription("");
    setUnlockLevel("1");
    setResourceCost("0");
    setRange("");
  }

  async function handleSubmit() {
    if (!campaign || !name.trim()) {
      setError("Selecione uma campanha e informe o nome da skill.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      await createSkill({
        campaign_id: Number(campaign),
        marca_id: markId ? Number(markId) : null,
        name: name.trim(),
        description: description.trim() || null,
        type: "campanha",
        branch: "campanha",
        unlock_level: Number(unlockLevel) || 1,
        resource_cost: Number(resourceCost) || 0,
        range: range.trim() || null,
      });

      resetForm();
      onClose();
    } catch {
      setError("Não foi possível criar a skill.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Nova Skill da Campanha"
        subtitle="Crie habilidades exclusivas da campanha."
        icon={Sparkles}
        onClose={onClose}
      />

      <ModalBody>
        <div className="space-y-5">
          <FormField label="Campanha" required>
            {fixedCampaignId ? (
              <div className="rounded-xl border border-orange-500/20 bg-[#11162B] px-4 py-3 text-sm text-stone-200">
                {fixedCampaignName ?? `Campanha #${fixedCampaignId}`}
              </div>
            ) : (
              <CampaignSelect value={campaign} onChange={setCampaign} />
            )}
          </FormField>

          <FormField label="Marca vinculada">
            <select
              value={markId}
              onChange={(event) => setMarkId(event.target.value)}
              className={selectClass}
            >
              <option value="">Skill geral da campanha</option>
              {marks.map((mark) => (
                <option key={mark.id} value={mark.id}>
                  {mark.name}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Nome" required>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormField>

          <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-3 text-sm leading-6 text-violet-100/70">
            Esta habilidade será registrada automaticamente como uma skill de
            <span className="font-semibold text-violet-200"> Campanha</span>.
            Use a descrição para explicar se ela funciona como ataque, suporte,
            reação, passiva ou penalidade dentro desta mesa.
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <FormField label="Nível">
              <Input
                type="number"
                min={1}
                value={unlockLevel}
                onChange={(event) => setUnlockLevel(event.target.value)}
              />
            </FormField>

            <FormField label="Custo">
              <Input
                type="number"
                min={0}
                value={resourceCost}
                onChange={(event) => setResourceCost(event.target.value)}
              />
            </FormField>

            <FormField label="Alcance / uso">
              <Input
                value={range}
                onChange={(event) => setRange(event.target.value)}
              />
            </FormField>
          </div>

          <FormField label="Descrição">
            <TextArea
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </FormField>
        </div>

        {error && <p className="text-sm text-rose-400">{error}</p>}
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>

        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Criando..." : "Criar Skill"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
