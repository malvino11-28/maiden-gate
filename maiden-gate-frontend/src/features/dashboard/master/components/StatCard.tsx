import type { LucideIcon } from "lucide-react";

type StateCardProps = {
  icon: LucideIcon;
  value: string | number;
  label: string;
};

export default function StatCard({ icon: Icon, value, label }: StateCardProps) {
  return (
    <div className="rounded-xl border border-amber-900/25 bg-slate-900/50 px-5 py-4">
      <div className="flex items-center gap-4">
        <Icon className="h-5 w-5 flex-shrink-0 text-amber-400" />
        <div>
          <h2 className="text-xl font-semibold text-amber-100">{value}</h2>
          <p className="text-xs text-amber-100/50">{label}</p>
        </div>
      </div>
    </div>
  );
}
