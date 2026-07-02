import { useState } from "react";
import { Gem } from "lucide-react";
import Modal from "../../../../../shared/components/Modal/Modal";
import ModalHeader from "../../../../../shared/components/Modal/ModalHeader";
import ModalBody from "../../../../../shared/components/Modal/ModalBody";
import ModalFooter from "../../../../../shared/components/Modal/ModalFooter";
import FormField from "../forms/FormField";
import CampaignSelect from "../forms/CampaignSelect";
import Input from "../../../../../shared/components/Form/Input";
import TextArea from "../../../../../shared/components/Form/TextArea";
import Button from "../../../../../shared/components/Button/Button";

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ItemModal({ isOpen, onClose }: ItemModalProps) {
  const [campaign, setCampaign] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader title="Novo Item" icon={Gem} onClose={onClose} />

      <ModalBody>
        <FormField label="Campanha" required>
          <CampaignSelect value={campaign} onChange={setCampaign} />
        </FormField>

        <FormField label="Nome" required>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormField>

        <FormField label="Descrição" required>
          <TextArea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>

        <FormField label="Tipo" required>
          <Input value={type} onChange={(e) => setType(e.target.value)} />
        </FormField>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>

        <Button>Criar Evento</Button>
      </ModalFooter>
    </Modal>
  );
}
