import { useState } from "react";
import { CalendarDays } from "lucide-react";
import Modal from "../../../../../shared/components/Modal/Modal";
import ModalHeader from "../../../../../shared/components/Modal/ModalHeader";
import ModalBody from "../../../../../shared/components/Modal/ModalBody";
import ModalFooter from "../../../../../shared/components/Modal/ModalFooter";
import FormField from "../forms/FormField";
import CampaignSelect from "../forms/CampaignSelect";
import Input from "../../../../../shared/components/Form/Input";
import TextArea from "../../../../../shared/components/Form/TextArea";
import Button from "../../../../../shared/components/Button/Button";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EventModal({ isOpen, onClose }: EventModalProps) {
  const [campaign, setCampaign] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chronology, setChronology] = useState("");
  const [date, setDate] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader title="Novo Evento" icon={CalendarDays} onClose={onClose} />

      <ModalBody>
        <FormField label="Campanha" required>
          <CampaignSelect value={campaign} onChange={setCampaign} />
        </FormField>

        <FormField label="Título" required>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormField>

        <FormField label="Descrição" required>
          <TextArea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>

        <FormField label="Cronologia" required>
          <Input
            value={chronology}
            onChange={(e) => setChronology(e.target.value)}
          />
        </FormField>

        <FormField label="Data do Evento">
          <Input value={date} onChange={(e) => setDate(e.target.value)} />
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
