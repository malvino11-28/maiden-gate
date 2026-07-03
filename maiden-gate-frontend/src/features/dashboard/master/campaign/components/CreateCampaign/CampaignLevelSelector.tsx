import type { RecommendedLevel } from "../../types/campaign";

type Props = {
  value: RecommendedLevel;
  onChange: (value: RecommendedLevel) => void;
};

const levels: RecommendedLevel[] = ["Iniciante", "Intermediário", "Avançado"];

export default function CampaignLevelSelector({ value, onChange }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {levels.map((level) => {
        const active = value === level;

        return (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
              active
                ? "border-amber-500/60 bg-amber-500/10 text-amber-200 shadow-lg shadow-amber-950/15"
                : "border-amber-900/30 bg-slate-900/40 text-amber-100/50 hover:border-amber-700/50 hover:text-amber-100/75"
            }`}
          >
            {level}
          </button>
        );
      })}
    </div>
  );
}
