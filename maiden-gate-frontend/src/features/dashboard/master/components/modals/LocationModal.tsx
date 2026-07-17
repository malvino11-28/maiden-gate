import { MapPinned } from "lucide-react";
import { useEffect, useState } from "react";

import Modal from "../../../../../shared/components/Modal/Modal";
import ModalHeader from "../../../../../shared/components/Modal/ModalHeader";
import ModalBody from "../../../../../shared/components/Modal/ModalBody";
import ModalFooter from "../../../../../shared/components/Modal/ModalFooter";
import FormField from "../forms/FormField";
import CampaignSelect from "../forms/CampaignSelect";
import CollectionSelect from "../forms/CollectionSelect";
import Input from "../../../../../shared/components/Form/Input";
import TextArea from "../../../../../shared/components/Form/TextArea";
import Button from "../../../../../shared/components/Button/Button";
import ImageInput from "../forms/ImageField";

import { createLocation } from "../../services/masterElementService";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  fixedCampaignId?: string | number;
  fixedCampaignName?: string;
}

export default function LocationModal({
  isOpen,
  onClose,
  fixedCampaignId,
  fixedCampaignName,
}: LocationModalProps) {
  const [campaign, setCampaign] = useState(
    fixedCampaignId ? String(fixedCampaignId) : "",
  );
  const [collection, setCollection] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setCampaign(fixedCampaignId ? String(fixedCampaignId) : "");
    setCollection("");
  }, [fixedCampaignId, isOpen]);

  const handleSubmit = async () => {
    if (!campaign || !name || !type || !description) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await createLocation(Number(campaign), {
        collection_id: collection ? Number(collection) : null,
        image,
        name,
        type,
        description,
      });

      if (!fixedCampaignId) {
        setCampaign("");
      }

      setCollection("");
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
          {fixedCampaignId ? (
            <div className="rounded-xl border border-orange-500/20 bg-[#11162B] px-4 py-3 text-sm text-stone-200">
              {fixedCampaignName ?? `Campanha #${fixedCampaignId}`}
            </div>
          ) : (
            <CampaignSelect value={campaign} onChange={setCampaign} />
          )}
        </FormField>

        <FormField label="Conjunto">
          <CollectionSelect
            campaignId={campaign}
            value={collection}
            onChange={setCollection}
          />
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
