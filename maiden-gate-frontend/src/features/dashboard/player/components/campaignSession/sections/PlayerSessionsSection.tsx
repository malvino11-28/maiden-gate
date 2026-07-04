import { CalendarDays, CheckCircle2, Clock, XCircle } from "lucide-react";

import type {
  PlayerCampaignSession,
  PlayerCampaignSessionStatus,
} from "../../../types/player";

type Props = {
  sessions: PlayerCampaignSession[];
};

const statusLabel: Record<PlayerCampaignSessionStatus, string> = {
  em_espera: "Em espera",
  concluido: "Concluído",
  cancelado: "Cancelado",
};

const statusClass: Record<PlayerCampaignSessionStatus, string> = {
  em_espera: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  concluido: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  cancelado: "border-rose-500/30 bg-rose-500/10 text-rose-300",
};

const statusIcon = {
  em_espera: Clock,
  concluido: CheckCircle2,
  cancelado: XCircle,
};

export default function PlayerSessionsSection({ sessions }: Props) {
  return (
    <section className="rounded-2xl border border-amber-900/25 bg-slate-900/60 p-6">
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-amber-100">
          <CalendarDays className="h-5 w-5 text-amber-400" />
          Sessões
        </h2>

        <p className="mt-1 text-sm text-amber-100/40">
          Acompanhe os avisos de datas criados pelo mestre para esta campanha.
        </p>
      </div>

      {sessions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-amber-900/30 bg-slate-950/40 px-6 py-10 text-center">
          <Clock className="mx-auto mb-3 h-8 w-8 text-amber-900/60" />

          <p className="text-sm text-amber-100/40">
            Nenhuma sessão foi agendada pelo mestre ainda.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => {
            const StatusIcon = statusIcon[session.status];

            return (
              <article
                key={session.id}
                className="rounded-2xl border border-amber-900/25 bg-slate-950/50 p-5"
              >
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-amber-100">
                      {session.title}
                    </h3>

                    <p className="mt-1 text-sm text-amber-100/45">
                      {session.date} às {session.time}
                    </p>
                  </div>

                  <span
                    className={`flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${statusClass[session.status]}`}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />
                    {statusLabel[session.status]}
                  </span>
                </div>

                {session.description && (
                  <p className="text-sm leading-relaxed text-amber-100/55">
                    {session.description}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
