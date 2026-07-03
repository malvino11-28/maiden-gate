import { Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type QuickActionCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
};

export default function QuickActionCard({ icon: Icon, title, description, onClick }: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-xl border border-amber-900/25 bg-slate-900/50 px-4 py-4 text-left transition-all hover:border-amber-700/40"
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-rose-600/20 transition-transform group-hover:scale-105">
        <Icon className="h-5 w-5 text-amber-400" />
      </div>

      <div className="min-w-0">
        <h3 className="flex items-center gap-1.5 text-sm font-medium text-amber-100">
          <Plus className="h-3.5 w-3.5 text-amber-400" />
          {title}
        </h3>
        <p className="mt-0.5 truncate text-xs text-amber-100/45">{description}</p>
      </div>
    </button>
  );
}
