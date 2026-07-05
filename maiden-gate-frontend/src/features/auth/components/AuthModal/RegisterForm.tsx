import { useState } from "react";
import { register } from "../../services/AuthService";

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

  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    try {
      await register(name, type, password);

      onClose();
      onOpenLogin();
    } catch (err: unknown) {
      const errorResponse = err as {
        response?: { data?: { errors?: Record<string, string[]> } };
      };

      if (errorResponse.response?.data?.errors) {
        const validationErrors = errorResponse.response.data.errors;
        const firstError = Object.values(validationErrors)[0];

        if (firstError && firstError.length > 0) {
          setError(firstError[0]);
        } else {
          setError("Erro de validação.");
        }
      } else {
        setError("Ocorreu um erro ao criar a conta. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
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
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <Label htmlFor="type">Tipo de Conta</Label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-2xl border border-orange-500/20 bg-slate-900/80 px-5 py-4 text-stone-100 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Criando..." : "Criar Conta"}
          </Button>
        </form>

        <p className="text-center text-sm text-stone-400 mt-4">
          Já possui uma conta?{" "}
          <button
            type="button"
            onClick={onOpenLogin}
            className="font-semibold text-orange-400 hover:text-orange-300"
          >
            Entrar
          </button>
        </p>
      </ModalBody>
    </Modal>
  );
}
