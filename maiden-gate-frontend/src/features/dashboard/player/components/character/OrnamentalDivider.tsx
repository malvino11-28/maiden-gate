type Props = {
  label: string;
};

export default function OrnamentalDivider({ label }: Props) {
  return (
    <div className="my-1 flex items-center gap-3">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-700/50 to-amber-700/20" />
      <span className="px-1 text-[10px] font-medium uppercase tracking-[0.25em] text-amber-600/70">
        {label}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-700/50 to-amber-700/20" />
    </div>
  );
}
