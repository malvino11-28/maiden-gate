import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
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

import { createLoreEvent } from "../../services/masterElementService";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  fixedCampaignId?: string | number;
  fixedCampaignName?: string;
}

export default function EventModal({
  isOpen,
  onClose,
  fixedCampaignId,
  fixedCampaignName,
}: EventModalProps) {
  const [campaign, setCampaign] = useState(
    fixedCampaignId ? String(fixedCampaignId) : "",
  );
  const [collection, setCollection] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chronology, setChronology] = useState("");
  const [date, setDate] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setCampaign(fixedCampaignId ? String(fixedCampaignId) : "");
    setCollection("");
  }, [fixedCampaignId, isOpen]);

  const handleSubmit = async () => {
    if (!campaign || !title || !description || !chronology) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      await createLoreEvent(Number(campaign), {
        collection_id: collection ? Number(collection) : null,
        title,
        description,
        chronology,
        date: date || null,
      });

      if (!fixedCampaignId) {
        setCampaign("");
      }

      setCollection("");
      setTitle("");
      setDescription("");
      setChronology("");
      setDate("");

      onClose();
    } catch {
      setError("Não foi possível criar o evento.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader title="Novo Evento" icon={CalendarDays} onClose={onClose} />

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

        {error && <p className="text-sm text-rose-400">{error}</p>}
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>

        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Criando..." : "Criar Evento"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
