import { MapPinned } from "lucide-react";
import { useState } from "react";

import Modal from "../../../../../shared/components/Modal/Modal";
import ModalHeader from "../../../../../shared/components/Modal/ModalHeader";
import ModalBody from "../../../../../shared/components/Modal/ModalBody";
import ModalFooter from "../../../../../shared/components/Modal/ModalFooter";
import FormField from "../forms/FormField";
import CampaignSelect from "../forms/CampaignSelect";
import Input from "../../../../../shared/components/Form/Input";
import TextArea from "../../../../../shared/components/Form/TextArea";
import Button from "../../../../../shared/components/Button/Button";
import ImageInput from "../forms/ImageField";

import { createLocation } from "../../services/masterElementService";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const [campaign, setCampaign] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!campaign || !name || !type || !description) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await createLocation(Number(campaign), {
        image,
        name,
        type,
        description,
      });

      setCampaign("");
      setImage(null);
      setName("");
      setType("");
      setDescription("");

      onClose();
    } catch {
      setError("Não foi possível criar a localização.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Nova Localização"
        icon={MapPinned}
        onClose={onClose}
      />

      <ModalBody>
        <FormField label="Campanha" required>
          <CampaignSelect value={campaign} onChange={setCampaign} />
        </FormField>

        <FormField label="Imagem do Local">
          <ImageInput value={null} onChange={setImage} />
        </FormField>

        <FormField label="Nome" required>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormField>

        <FormField label="Tipo" required>
          <Input value={type} onChange={(e) => setType(e.target.value)} />
        </FormField>

        <FormField label="Descrição" required>
          <TextArea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>
      </ModalBody>

      {error && <p className="text-sm text-rose-400">{error}</p>}

      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>

        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Criando..." : "Criar Localização"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
