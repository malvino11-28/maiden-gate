type Props = {
  selected: boolean;

  title: string;

  description: string;

  color: string;

  onClick: () => void;
};

export default function UrgencyCard({
  selected,
  title,
  description,
  color,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        rounded-2xl
        border
        p-6
        text-center
        transition-all

        ${
          selected
            ? "border-orange-400 bg-orange-500/10"
            : "border-white/10 bg-[#11162B] hover:border-orange-500/40"
        }
      `}
    >
      <div className={`mx-auto mb-4 h-4 w-4 rounded-full ${color}`} />

      <h3 className="mb-2 font-semibold text-white">{title}</h3>

      <p className="text-sm text-stone-400">{description}</p>
    </button>
  );
}
