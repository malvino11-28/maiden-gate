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
      className={`relative rounded-xl border px-3 py-4 text-center transition-all duration-200 ${
        selected
          ? "scale-[1.03] border-amber-500/60 bg-amber-500/10 text-amber-200 shadow-lg shadow-amber-950/20"
          : "border-amber-900/30 bg-slate-900/40 text-amber-100/50 hover:border-amber-700/50 hover:text-amber-100/75"
      }`}
    >
      <span className={`mx-auto mb-2 block h-3 w-3 rounded-full ${color} ${selected ? "opacity-100" : "opacity-45"}`} />
      <span className="block text-sm font-semibold">{title}</span>
      <span className="mt-1 block text-xs leading-snug opacity-80">
        {description}
      </span>
      {selected && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-current opacity-80" />}
    </button>
  );
}
