import { Crown } from "lucide-react";

type DashboardHeaderProps = {
  name: string;
};

export default function DashboardHeader({ name }: DashboardHeaderProps) {
  return (
    <header className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-rose-600/20">
        <Crown className="h-5 w-5 text-amber-400" />
      </div>

      <div>
        <h1 className="text-3xl font-semibold leading-tight text-amber-100">
          Painel do Mestre
        </h1>
        <p className="text-sm text-amber-100/50">
          Bem-vindo de volta, <span className="text-amber-300">{name}</span>
        </p>
      </div>
    </header>
  );
}
