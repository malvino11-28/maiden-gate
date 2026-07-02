import { useState } from "react";
import { UserRound } from "lucide-react";

import Modal from "../../../../../shared/components/Modal/Modal";
import ModalHeader from "../../../../../shared/components/Modal/ModalHeader";
import ModalBody from "../../../../../shared/components/Modal/ModalBody";
import ModalFooter from "../../../../../shared/components/Modal/ModalFooter";

import FormField from "../forms/FormField";
import CampaignSelect from "../forms/CampaignSelect";
import SkillSelector from "../forms/SkillSelector";
import StatusEditor from "../forms/StatusEditor";

import Input from "../../../../../shared/components/Form/Input";
import TextArea from "../../../../../shared/components/Form/TextArea";
import Button from "../../../../../shared/components/Button/Button";

interface NpcModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NpcModal({ isOpen, onClose }: NpcModalProps) {
  const [campaign, setCampaign] = useState("");

  const [name, setName] = useState("");

  const [brand, setBrand] = useState("");

  const [description, setDescription] = useState("");

  const [skills, setSkills] = useState<string[]>([]);

  const [status, setStatus] = useState({
    level: 1,
    hp: 100,
    mana: 50,
    atk: 10,
    def: 10,
    speed: 10,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Novo NPC"
        subtitle="Cadastre um personagem não jogável."
        icon={UserRound}
        onClose={onClose}
      />

      <ModalBody>
        <div className="space-y-5">
          <FormField label="Campanha" required>
            <CampaignSelect value={campaign} onChange={setCampaign} />
          </FormField>

          <FormField label="Nome" required>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormField>

          <FormField label="Marca">
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="
                w-full
                rounded-xl
                border
                border-orange-500/20
                bg-[#11162B]
                px-4
                py-3
                text-stone-200
                focus:border-orange-400
                focus:outline-none
              "
            >
              <option value="">Nenhuma</option>
              <option value="Manifesto">Manifesto</option>
              <option value="Oculto">Oculto</option>
              <option value="Respiração">Respiração</option>
              <option value="Flor">Flor</option>
            </select>
          </FormField>

          <FormField label="Descrição" required>
            <TextArea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormField>

          <FormField label="Habilidades">
            <SkillSelector selected={skills} onChange={setSkills} />
          </FormField>

          <FormField label="Status">
            <StatusEditor value={status} onChange={setStatus} />
          </FormField>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>

        <Button>Criar NPC</Button>
      </ModalFooter>
    </Modal>
  );
}
