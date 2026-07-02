import { Crown } from "lucide-react";

type DashboardHeaderProps = {
  name: string;
};

export default function DashboardHeader({ name }: DashboardHeaderProps) {
  return (
    <header className="flex items-center gap-5">
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-orange-500/20
          to-pink-500/20
        "
      >
        <Crown className="text-yellow-400" />
      </div>

      <div>
        <h1 className="text-4xl font-bold text-white">Painel do Mestre</h1>

        <p className="text-stone-400">
          Bem-vindo de volta,{" "}
          <span className="font-semibold text-yellow-400">{name}</span>
        </p>
      </div>
    </header>
  );
}
