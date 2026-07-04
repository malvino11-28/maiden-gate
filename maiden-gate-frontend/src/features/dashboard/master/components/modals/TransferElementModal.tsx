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

  const canSubmit =
    originCampaign &&
    selectedElement &&
    destinationCampaign &&
    originCampaign !== destinationCampaign;

  console.log(isOpen);

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
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>

        <Button disabled={!canSubmit}>Confirmar Cópia</Button>
      </ModalFooter>
    </Modal>
  );
}
