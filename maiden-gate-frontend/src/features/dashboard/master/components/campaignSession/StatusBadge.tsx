import type { CampaignStatus } from "../../types/masterCampaign";

const statusStyle = {
  ativa: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  pausada: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  encerrada: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

const statusLabel = {
  ativa: "Ativa",
  pausada: "Pausada",
  encerrada: "Encerrada",
};

type Props = {
  status: CampaignStatus;
};

export default function StatusBadge({ status }: Props) {
  return (
    <span
      className={`
        rounded-full
        border
        px-2.5
        py-1
        text-xs
        ${statusStyle[status]}
      `}
    >
      {statusLabel[status]}
    </span>
  );
}
