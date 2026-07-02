import type { LucideIcon } from "lucide-react";

type ModalHeaderProps = {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  onClose: () => void;
};

export default function ModalHeader({
  title,
  subtitle,
  icon: Icon,
  onClose,
}: ModalHeaderProps) {
  return (
    <header
      className="
    flex
    items-start
    justify-between
    bg-gradient-to-r
    from-[#5A2D18]
    to-[#4B0F36]
    px-8
    py-6
  "
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <div
            className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-orange-500/20
        "
          >
            <Icon className="text-orange-400" size={24} />
          </div>
        )}

        <div>
          <h2 className="text-3xl font-bold text-amber-100">{title}</h2>

          {subtitle && <p className="mt-1 text-stone-300">{subtitle}</p>}
        </div>
      </div>

      <button
        onClick={onClose}
        className="
      rounded-full
      p-2
      text-stone-300
      transition
      hover:bg-white/10
      hover:text-white
    "
      >
        ✕
      </button>
    </header>
  );
}
