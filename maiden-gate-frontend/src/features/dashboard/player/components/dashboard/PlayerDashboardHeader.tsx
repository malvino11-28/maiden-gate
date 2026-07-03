import { Shield } from "lucide-react";

type Props = {
  playerName: string;
};

export default function PlayerDashboardHeader({ playerName }: Props) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500/20 to-amber-600/20">
        <Shield className="h-5 w-5 text-rose-400" />
      </div>

      <div>
        <h1 className="text-3xl font-semibold leading-tight text-amber-100">
          Painel do Jogador
        </h1>
        <p className="text-sm text-amber-100/50">
          Bem-vindo de volta, <span className="text-amber-300">{playerName}</span>
        </p>
      </div>
    </div>
  );
}
