import { BookOpen, ChevronRight } from "lucide-react";

type CampaignCardProps = {
  title: string;
  players: number;
  sessions: number;
  lastSession: string;
  status: "active" | "paused" | "closed";
};

const statusMap = {
  active: {
    label: "Ativa",
    className: "bg-green-500/20 text-green-300",
  },
  paused: {
    label: "Pausada",
    className: "bg-yellow-500/20 text-yellow-300",
  },
  closed: {
    label: "Encerrada",
    className: "bg-stone-500/20 text-stone-300",
  },
};

export default function CampaignCard({
  title,
  players,
  sessions,
  lastSession,
  status,
}: CampaignCardProps) {
  const currentStatus = statusMap[status];

  return (
    <button
      className="
        flex
        w-full
        items-center
        justify-between
        rounded-2xl
        border
        border-white/10
        bg-[#11162B]
        p-6
        transition
        hover:border-orange-500/40
      "
    >
      <div className="flex items-center gap-5">
        <div className="rounded-xl bg-orange-500/20 p-3">
          <BookOpen className="text-yellow-400" />
        </div>

        <div className="text-left">
          <h3 className="text-xl font-semibold text-white">{title}</h3>

          <p className="text-stone-400">
            {players} jogadores • {sessions} sessões • Última: {lastSession}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`
            rounded-full
            px-3
            py-1
            text-sm
            ${currentStatus.className}
          `}
        >
          {currentStatus.label}
        </span>

        <ChevronRight className="text-stone-500" />
      </div>
    </button>
  );
}
