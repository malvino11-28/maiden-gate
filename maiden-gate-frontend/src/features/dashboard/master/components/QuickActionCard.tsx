import type { LucideIcon } from "lucide-react";

type QuickActionCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function QuickActionCard({
  icon: Icon,
  title,
  description,
}: QuickActionCardProps) {
  return (
    <button
      className="
        flex
        w-full
        items-center
        gap-4
        rounded-2xl
        border
        border-white/10
        bg-[#11162B]
        p-5
        text-left
        transition
        hover:border-orange-500/40
      "
    >
      <div className="rounded-xl bg-orange-500/20 p-3">
        <Icon className="text-yellow-400" />
      </div>

      <div>
        <h3 className="font-semibold text-white">{title}</h3>

        <p className="text-sm text-stone-400">{description}</p>
      </div>
    </button>
  );
}
