import type { ElementType } from "react";

type Props = {
  label: string;
  value: string | number;
  icon: ElementType;
};

export default function PlayerStatCard({ label, value, icon: Icon }: Props) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-rose-900/25 bg-slate-900/50 px-5 py-4">
      <Icon className="h-5 w-5 flex-shrink-0 text-rose-400" />
      <div>
        <p className="text-xl font-semibold text-amber-100">{value}</p>
        <p className="text-xs text-amber-100/50">{label}</p>
      </div>
    </div>
  );
}
