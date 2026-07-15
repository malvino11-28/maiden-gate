import { useEffect, useState } from "react";
import { FolderTree } from "lucide-react";

import Modal from "../../../../../shared/components/Modal/Modal";
import ModalHeader from "../../../../../shared/components/Modal/ModalHeader";
import ModalBody from "../../../../../shared/components/Modal/ModalBody";
import ModalFooter from "../../../../../shared/components/Modal/ModalFooter";
import FormField from "../forms/FormField";
import CampaignSelect from "../forms/CampaignSelect";
import Input from "../../../../../shared/components/Form/Input";
import TextArea from "../../../../../shared/components/Form/TextArea";
import Button from "../../../../../shared/components/Button/Button";

import { createCampaignCollection } from "../../services/masterElementService";

import {
  COLLECTION_COLOR_OPTIONS,
  DEFAULT_COLLECTION_COLOR,
} from "../../data/collectionColors";

type CollectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fixedCampaignId?: string | number;
  fixedCampaignName?: string;
};

export default function CollectionModal({
  isOpen,
  onClose,
  fixedCampaignId,
  fixedCampaignName,
}: CollectionModalProps) {
  const [campaign, setCampaign] = useState(
    fixedCampaignId ? String(fixedCampaignId) : "",
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(DEFAULT_COLLECTION_COLOR);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setCampaign(fixedCampaignId ? String(fixedCampaignId) : "");
  }, [fixedCampaignId, isOpen]);

  function resetForm() {
    if (!fixedCampaignId) {
      setCampaign("");
    }

    setName("");
    setDescription("");
    setColor(DEFAULT_COLLECTION_COLOR);
  }

  async function handleSubmit() {
    if (!campaign || !name.trim()) {
      setError("Selecione uma campanha e informe o nome do conjunto.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      await createCampaignCollection(Number(campaign), {
        name: name.trim(),
        description: description.trim() || null,
        color: color.trim() || null,
      });

      resetForm();
      onClose();
    } catch {
      setError("Não foi possível criar o conjunto.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Novo Conjunto"
        subtitle="Agrupe elementos por mapa, região, arco ou segredo."
        icon={FolderTree}
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

          <FormField label="Nome" required>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormField>

          <FormField label="Descrição">
            <TextArea
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </FormField>

          <FormField label="Cor do conjunto">
            <select
              value={color}
              onChange={(event) => setColor(event.target.value)}
              className="w-full rounded-xl border border-orange-500/20 bg-[#11162B] px-4 py-3 text-sm text-stone-200 outline-none transition focus:border-orange-500/50"
            >
              {COLLECTION_COLOR_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-slate-950"
                >
                  {option.label}
                </option>
              ))}
            </select>

            <div className="mt-2 flex items-center gap-2 text-xs text-stone-400">
              <span
                className="h-3 w-3 rounded-full border border-white/20"
                style={{ backgroundColor: color }}
              />
              Essa cor será usada como marcador visual do conjunto.
            </div>
          </FormField>
        </div>

        {error && <p className="text-sm text-rose-400">{error}</p>}
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>

        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Criando..." : "Criar Conjunto"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
