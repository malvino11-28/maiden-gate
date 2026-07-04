import { Shield, Sparkles } from "lucide-react";

type CharacterBattleResourcesProps = {
  paMax: number;
  prMax: number;
};

export default function CharacterBattleResources({
  paMax,
  prMax,
}: CharacterBattleResourcesProps) {
  return (
    <div className="rounded-xl border border-sky-900/25 bg-slate-950/50 p-3">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-[11px] text-amber-100/45">
          <Sparkles className="h-3 w-3 text-sky-400" />
          PA Máx.
        </p>

        <p className="text-lg font-semibold text-amber-100">{paMax}</p>
      </div>

      <div className="my-2 border-t border-amber-900/20" />

      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-[11px] text-amber-100/45">
          <Shield className="h-3 w-3 text-violet-400" />
          PR Máx.
        </p>

        <p className="text-lg font-semibold text-amber-100">{prMax}</p>
      </div>
    </div>
  );
}
