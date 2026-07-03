type Props = {
  value: string;
  onChange: (value: string) => void;
};

const levels = ["Iniciante", "Intermediário", "Avançado"];

export default function CampaignLevelSelector({ value, onChange }: Props) {
  return (
    <div className="flex gap-3">
      {levels.map((level) => {
        const active = value === level;

        return (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={`
              rounded-xl
              border
              px-5
              py-3
              transition

              ${
                active
                  ? "border-orange-500 bg-orange-500/20 text-white"
                  : "border-white/10 bg-[#11162B] text-stone-400 hover:border-orange-500/40"
              }
            `}
          >
            {level}
          </button>
        );
      })}
    </div>
  );
}
