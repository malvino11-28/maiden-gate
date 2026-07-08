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
import ImageInput from "../forms/ImageField";

import Input from "../../../../../shared/components/Form/Input";
import TextArea from "../../../../../shared/components/Form/TextArea";
import Button from "../../../../../shared/components/Button/Button";

import { createNpc } from "../../services/masterElementService";

interface NpcModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NpcModal({ isOpen, onClose }: NpcModalProps) {
  const [campaign, setCampaign] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [race, setRace] = useState("");
  const [occupation, setOccupation] = useState("");
  const [personality, setPersonality] = useState("");
  const [secret, setSecret] = useState("");

  const handleSubmit = async () => {
    if (!campaign || !name || !description) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      await createNpc(Number(campaign), {
        image,
        name,
        brand: brand || null,
        race,
        occupation,
        personality,
        secret,
        description,
        skills,
        status,
      });

      setCampaign("");
      setImage(null);
      setName("");
      setBrand("");
      setRace("");
      setOccupation("");
      setPersonality("");
      setSecret("");
      setDescription("");
      setSkills([]);
      setStatus({
        level: 1,
        hp: 100,
        mana: 50,
        atk: 10,
        def: 10,
        speed: 10,
      });

      onClose();
    } catch {
      setError("Não foi possível criar o NPC.");
    } finally {
      setIsLoading(false);
    }
  };

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

          <FormField label="Imagem">
            <ImageInput onChange={setImage} />
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

          <FormField label="Raça / Espécie">
            <Input value={race} onChange={(e) => setRace(e.target.value)} />
          </FormField>

          <FormField label="Ocupação">
            <Input
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </FormField>

          <FormField label="Personalidade">
            <TextArea
              rows={3}
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
            />
          </FormField>

          <FormField label="Segredo">
            <TextArea
              rows={3}
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
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

        {error && <p className="text-sm text-rose-400">{error}</p>}
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>

        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Criando..." : "Criar NPC"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
