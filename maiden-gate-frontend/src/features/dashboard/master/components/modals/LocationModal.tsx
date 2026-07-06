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

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const [campaign, setCampaign] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null); // Guarda o arquivo para o envio
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    // Aqui você faz o envio do formulário
    console.log({ campaign, imageFile, name, type, description });
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
          {/* REPARO AQUI: Removido o value={imageFile} que quebrava o TypeScript */}
          <ImageInput onChange={(file) => setImageFile(file)} />
        </FormField>

        <FormField label="Nome" required>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormField>

        <FormField label="Tipo" required>
          <CampaignSelect value={type} onChange={setType} />
        </FormField>

        <FormField label="Descrição" required>
          <TextArea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>

        <Button onClick={handleSubmit}>Criar Localização</Button>
      </ModalFooter>
    </Modal>
  );
}
