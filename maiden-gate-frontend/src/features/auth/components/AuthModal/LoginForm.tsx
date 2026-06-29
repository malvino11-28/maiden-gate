import { useState } from "react";
import { login } from "../../services/AuthService";

import Modal from "../../../../shared/components/Modal/Modal";
import ModalBody from "../../../../shared/components/Modal/ModalBody";
import ModalHeader from "../../../../shared/components/Modal/ModalHeader";

import Input from "../../../../shared/components/Form/Input";
import PasswordInput from "../../../../shared/components/Form/PasswordInput";
import Label from "../../../../shared/components/Form/Label";
import Button from "../../../../shared/components/Form/Button";
import { useAuth } from "../../hooks/useAuth";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
};

export default function LoginModal({
  isOpen,
  onClose,
  onOpenRegister,
}: LoginModalProps) {
  const { login: authLogin } = useAuth();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const data = await login(name, password);

      authLogin(data.user);

      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Entrar"
        subtitle="Continue sua jornada em Voice of Flower"
        onClose={onClose}
      />

      <ModalBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit">Entrar</Button>
        </form>

        <p
          className="
                        text-center
                        text-sm
                        text-stone-400
                    "
        >
          Ainda não possuí conta?{" "}
          <button
            onClick={onOpenRegister}
            className="
                            font-semibold
                            text-orange-400
                            hover:text-orange-300
                        "
          >
            Criar Conta
          </button>
        </p>
      </ModalBody>
    </Modal>
  );
}
