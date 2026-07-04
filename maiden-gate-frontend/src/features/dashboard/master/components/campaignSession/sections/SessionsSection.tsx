import { useState } from "react";
import type { FormEvent } from "react";
import { CalendarDays, CheckCircle2, Clock, XCircle } from "lucide-react";

import type {
  CampaignSessionNotice,
  CampaignSessionStatus,
} from "../../../types/masterCampaign";

type Props = {
  initialSessions?: CampaignSessionNotice[];
};

const statusLabel: Record<CampaignSessionStatus, string> = {
  em_espera: "Em espera",
  concluido: "Concluído",
  cancelado: "Cancelado",
};

const statusClass: Record<CampaignSessionStatus, string> = {
  em_espera: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  concluido: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  cancelado: "border-rose-500/30 bg-rose-500/10 text-rose-300",
};

export default function SessionsSection({ initialSessions = [] }: Props) {
  const [sessions, setSessions] =
    useState<CampaignSessionNotice[]>(initialSessions);

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!form.title.trim() || !form.date.trim() || !form.time.trim()) {
      return;
    }

    const newSession: CampaignSessionNotice = {
      id: crypto.randomUUID(),
      title: form.title,
      date: form.date,
      time: form.time,
      description: form.description,
      status: "em_espera",
    };

    setSessions((previous) => [newSession, ...previous]);

    setForm({
      title: "",
      date: "",
      time: "",
      description: "",
    });
  }

  function updateStatus(id: string, status: CampaignSessionStatus) {
    setSessions((previous) =>
      previous.map((session) =>
        session.id === id ? { ...session, status } : session,
      ),
    );
  }

  return (
    <section className="rounded-2xl border border-amber-900/25 bg-slate-900/60 p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-amber-100">
            <CalendarDays className="h-5 w-5 text-amber-400" />
            Sessões
          </h2>

          <p className="mt-1 text-sm text-amber-100/40">
            Crie avisos de datas para as próximas sessões da campanha.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-6 rounded-2xl border border-amber-900/25 bg-slate-950/50 p-5"
      >
        <div className="grid gap-4 md:grid-cols-[1fr_160px_130px]">
          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">
              Título da sessão
            </label>

            <input
              value={form.title}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  title: event.target.value,
                }))
              }
              placeholder="Ex: A chegada à Cidade Catedral"
              className="w-full rounded-lg border border-amber-900/40 bg-slate-950/70 px-4 py-3 text-sm text-amber-100 outline-none transition-all placeholder:text-amber-100/20 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">
              Data
            </label>

            <input
              type="date"
              value={form.date}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  date: event.target.value,
                }))
              }
              className="w-full rounded-lg border border-amber-900/40 bg-slate-950/70 px-4 py-3 text-sm text-amber-100 outline-none transition-all focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">
              Horário
            </label>

            <input
              type="time"
              value={form.time}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  time: event.target.value,
                }))
              }
              className="w-full rounded-lg border border-amber-900/40 bg-slate-950/70 px-4 py-3 text-sm text-amber-100 outline-none transition-all focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">
            Aviso / descrição
          </label>

          <textarea
            rows={3}
            value={form.description}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                description: event.target.value,
              }))
            }
            placeholder="Ex: Trazer ficha atualizada, revisar inventário e preparar habilidades."
            className="w-full resize-none rounded-lg border border-amber-900/40 bg-slate-950/70 px-4 py-3 text-sm leading-relaxed text-amber-100 outline-none transition-all placeholder:text-amber-100/20 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-900/20 transition-all hover:scale-[1.02] hover:from-amber-400 hover:to-rose-500 active:scale-95"
          >
            Criar sessão
          </button>
        </div>
      </form>

      {sessions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-amber-900/30 bg-slate-950/40 px-6 py-10 text-center">
          <Clock className="mx-auto mb-3 h-8 w-8 text-amber-900/60" />

          <p className="text-sm text-amber-100/40">
            Nenhuma sessão agendada ainda.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
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
                  className={`w-fit rounded-full border px-3 py-1 text-xs font-medium ${statusClass[session.status]}`}
                >
                  {statusLabel[session.status]}
                </span>
              </div>

              {session.description && (
                <p className="mb-4 text-sm leading-relaxed text-amber-100/55">
                  {session.description}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => updateStatus(session.id, "em_espera")}
                  className="rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 transition hover:bg-amber-500/20"
                >
                  Em espera
                </button>

                <button
                  type="button"
                  onClick={() => updateStatus(session.id, "concluido")}
                  className="flex items-center gap-1.5 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/20"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Concluído
                </button>

                <button
                  type="button"
                  onClick={() => updateStatus(session.id, "cancelado")}
                  className="flex items-center gap-1.5 rounded-lg border border-rose-500/25 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 transition hover:bg-rose-500/20"
                >
                  <XCircle className="h-3.5 w-3.5" />
                  Cancelado
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
