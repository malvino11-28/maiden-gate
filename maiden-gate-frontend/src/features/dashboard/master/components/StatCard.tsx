import type { LucideIcon } from "lucide-react";

type StateCardProps = {
  icon: LucideIcon;
  value: string | number;
  label: string;
};

export default function StatCard({ icon: Icon, value, label }: StateCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-[#11162B]
        p-6
      "
    >
      <div className="flex items-center gap-4">
        <Icon size={24} className="text-yellow-400" />

        <div>
          <h2 className="text-3xl font-bold text-white">{value}</h2>

          <p className="text-stone-400">{label}</p>
        </div>
      </div>
    </div>
  );
}
