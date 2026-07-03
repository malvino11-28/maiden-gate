import { BookOpen, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type CampaignCardProps = {
  id: string;
  title: string;
  players: number;
  sessions: number;
  lastSession: string;
  status: "active" | "paused" | "closed";
};

const statusMap = {
  active: {
    label: "Ativa",
    className: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
  },
  paused: {
    label: "Pausada",
    className: "border-amber-500/30 bg-amber-500/15 text-amber-300",
  },
  closed: {
    label: "Encerrada",
    className: "border-slate-500/30 bg-slate-500/15 text-slate-400",
  },
};

export default function CampaignCard({
  id,
  title,
  players,
  sessions,
  lastSession,
  status,
}: CampaignCardProps) {
  const currentStatus = statusMap[status];

  return (
    <Link to={`/dashboard/master/campaign/${id}`} className="block">
      <button className="group flex w-full items-center justify-between gap-4 rounded-xl border border-amber-900/25 bg-slate-900/50 px-5 py-4 text-left transition-colors hover:border-amber-700/40">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/15 to-rose-600/15">
            <BookOpen className="h-5 w-5 text-amber-400" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-medium text-amber-100">{title}</h3>
            <p className="mt-0.5 text-xs text-amber-100/50">
              {players} jogadores · {sessions} sessões · Última: {lastSession}
            </p>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-3">
          <span
            className={`rounded-full border px-2.5 py-1 text-xs ${currentStatus.className}`}
          >
            {currentStatus.label}
          </span>

          <ChevronRight className="h-4 w-4 text-amber-100/30 transition-colors group-hover:text-amber-400" />
        </div>
      </button>
    </Link>
  );
}
