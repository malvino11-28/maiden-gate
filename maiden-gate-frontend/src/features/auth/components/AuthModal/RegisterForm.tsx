import { useState } from "react";

import Modal from "../../../../shared/components/Modal/Modal";
import ModalBody from "../../../../shared/components/Modal/ModalBody";
import ModalHeader from "../../../../shared/components/Modal/ModalHeader";

import Input from "../../../../shared/components/Form/Input";
import PasswordInput from "../../../../shared/components/Form/PasswordInput";
import Label from "../../../../shared/components/Form/Label";
import Button from "../../../../shared/components/Form/Button";

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
};

export default function RegisterModal({
  isOpen,
  onClose,
  onOpenLogin,
}: RegisterModalProps) {
  const [type, setType] = useState("player");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log({
      type,
      name,
      password,
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Criar Conta"
        subtitle="Inicie sua jornada em Voice Of Flower"
        onClose={onClose}
      />

      <ModalBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <Label htmlFor="type">Tipo de Conta</Label>

            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="
                                w-full

                                rounded-2xl

                                border
                                border-orange-500/20

                                bg-slate-900/80

                                px-5
                                py-4

                                text-stone-100

                                outline-none

                                focus:border-amber-400
                                focus:ring-2
                                focus:ring-amber-500/20
                            "
            >
              <option value="player">Jogador</option>

              <option value="master">Mestre</option>
            </select>
          </div>

          <div>
            <Label htmlFor="name">Nome</Label>

            <Input
              id="name"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>

            <PasswordInput
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit">Criar Conta</Button>
        </form>

        <p className="text-center text-sm text-stone-400">
          Já possui uma conta?{" "}
          <button
            type="button"
            onClick={onOpenLogin}
            className="
                            font-semibold
                            text-orange-400

                            hover:text-orange-300
                        "
          >
            Entrar
          </button>
        </p>
      </ModalBody>
    </Modal>
  );
}
