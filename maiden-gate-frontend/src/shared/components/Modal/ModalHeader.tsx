import type { LucideIcon } from "lucide-react";
import { X } from "lucide-react";

type ModalHeaderProps = {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  onClose: () => void;
};

export default function ModalHeader({ title, subtitle, icon: Icon, onClose }: ModalHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-amber-900/30 bg-gradient-to-r from-amber-900/40 to-rose-900/40 px-6 py-5">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-rose-600/20">
            <Icon className="h-5 w-5 text-amber-400" />
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold text-amber-100">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-amber-100/50">{subtitle}</p>}
        </div>
      </div>

      <button
        onClick={onClose}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-amber-100/50 transition-colors hover:bg-amber-900/30 hover:text-amber-100"
        aria-label="Fechar"
      >
        <X className="h-5 w-5" />
      </button>
    </header>
  );
}
