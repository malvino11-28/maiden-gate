import { useState } from "react";
import { Copy } from "lucide-react";

import Modal from "../../../../../shared/components/Modal/Modal";
import ModalHeader from "../../../../../shared/components/Modal/ModalHeader";
import ModalBody from "../../../../../shared/components/Modal/ModalBody";
import ModalFooter from "../../../../../shared/components/Modal/ModalFooter";

import FormField from "../forms/FormField";
import CampaignSelect from "../forms/CampaignSelect";
import ElementSelect from "../forms/ElementSelect";

import Button from "../../../../../shared/components/Button/Button";

import { transferElement } from "../../services/masterElementService";

const availableElements = [
  {
    id: 1,
    name: "Rei Arthur",
    type: "NPC",
  },
  {
    id: 2,
    name: "Espada Celestial",
    type: "Item",
  },
  {
    id: 3,
    name: "Dragão Negro",
    type: "Monstro",
  },
  {
    id: 4,
    name: "Capital Imperial",
    type: "Localização",
  },
];

interface TransferElementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TransferElementModal({
  isOpen,
  onClose,
}: TransferElementModalProps) {
  const [originCampaign, setOriginCampaign] = useState("");
  const [selectedElement, setSelectedElement] = useState("");
  const [destinationCampaign, setDestinationCampaign] = useState("");

  const canSubmit = Boolean(
    originCampaign &&
    selectedElement &&
    destinationCampaign &&
    originCampaign !== destinationCampaign,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const element = availableElements.find(
      (item) => String(item.id) === selectedElement,
    );

    if (!canSubmit || !element) {
      setError("Selecione todos os campos corretamente.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      await transferElement({
        origin_campaign_id: Number(originCampaign),
        destination_campaign_id: Number(destinationCampaign),
        element_id: element.id,
        element_type: element.type,
      });

      setOriginCampaign("");
      setSelectedElement("");
      setDestinationCampaign("");

      onClose();
    } catch {
      setError("Não foi possível copiar o elemento.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Copiar Elemento"
        subtitle="Mova elementos entre campanhas."
        icon={Copy}
        onClose={onClose}
      />

      <ModalBody>
        <div className="space-y-5">
          <FormField label="Campanha de Origem" required>
            <CampaignSelect
              value={originCampaign}
              onChange={setOriginCampaign}
            />
          </FormField>

          <FormField label="Elemento a Copiar" required>
            <ElementSelect
              value={selectedElement}
              onChange={setSelectedElement}
              disabled={!originCampaign}
              elements={availableElements}
            />
          </FormField>

          <FormField label="Campanha de Destino" required>
            <CampaignSelect
              value={destinationCampaign}
              onChange={setDestinationCampaign}
            />
          </FormField>
        </div>

        {error && <p className="text-sm text-rose-400">{error}</p>}
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>

        <Button disabled={!canSubmit || isLoading} onClick={handleSubmit}>
          {isLoading ? "Copiando..." : "Confirmar Cópia"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
