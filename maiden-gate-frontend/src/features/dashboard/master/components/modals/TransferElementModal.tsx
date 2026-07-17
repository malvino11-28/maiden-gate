import { useEffect, useState } from "react";
import { Copy } from "lucide-react";

import Modal from "../../../../../shared/components/Modal/Modal";
import ModalHeader from "../../../../../shared/components/Modal/ModalHeader";
import ModalBody from "../../../../../shared/components/Modal/ModalBody";
import ModalFooter from "../../../../../shared/components/Modal/ModalFooter";

import FormField from "../forms/FormField";
import CampaignSelect from "../forms/CampaignSelect";
import ElementSelect from "../forms/ElementSelect";

import Button from "../../../../../shared/components/Button/Button";

import {
  getCampaignElementsForTransfer,
  transferElement,
  type TransferElementOption,
} from "../../services/masterElementService";

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
  const [availableElements, setAvailableElements] = useState<
    TransferElementOption[]
  >([]);
  const [isLoadingElements, setIsLoadingElements] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !originCampaign) {
      setAvailableElements([]);
      setSelectedElement("");
      return;
    }

    let active = true;

    async function loadElements() {
      try {
        setIsLoadingElements(true);
        setError(null);
        setSelectedElement("");

        const elements = await getCampaignElementsForTransfer(originCampaign);

        if (active) {
          setAvailableElements(elements);
        }
      } catch {
        if (active) {
          setAvailableElements([]);
          setError(
            "Não foi possível carregar os elementos da campanha origem.",
          );
        }
      } finally {
        if (active) {
          setIsLoadingElements(false);
        }
      }
    }

    loadElements();

    return () => {
      active = false;
    };
  }, [isOpen, originCampaign]);

  const canSubmit = Boolean(
    originCampaign &&
    selectedElement &&
    destinationCampaign &&
    originCampaign !== destinationCampaign,
  );

  const handleSubmit = async () => {
    const element = availableElements.find(
      (item) => `${item.elementType}:${item.id}` === selectedElement,
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
        element_type: element.elementType,
      });

      setOriginCampaign("");
      setSelectedElement("");
      setDestinationCampaign("");
      setAvailableElements([]);

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
        subtitle="Copie elementos reais de uma campanha para outra."
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
              disabled={!originCampaign || isLoadingElements}
              elements={availableElements}
              isLoading={isLoadingElements}
            />
          </FormField>

          <FormField label="Campanha de Destino" required>
            <CampaignSelect
              value={destinationCampaign}
              onChange={setDestinationCampaign}
            />
          </FormField>
        </div>

        {originCampaign &&
          !isLoadingElements &&
          availableElements.length === 0 && (
            <p className="mt-3 rounded-lg border border-amber-900/20 bg-slate-950/40 px-3 py-2 text-xs text-amber-100/40">
              Nenhum elemento encontrado na campanha selecionada.
            </p>
          )}

        {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
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
