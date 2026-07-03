import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, HeartPulse, Plus, Shield, Sparkles, Swords, User } from "lucide-react";

import Button from "../../../../shared/components/Button/Button";

const campaigns = [
  { title: "A Flor do Abismo", master: "Aldric Voss", sessions: 12, status: "Em andamento" },
  { title: "Crônicas de Vareth", master: "Mira Nox", sessions: 7, status: "Pausada" },
];

const characters = [
  { name: "Eleanor", mark: "Entoadora", level: 6, hp: "42/48" },
  { name: "Uriel", mark: "Respiração", level: 4, hp: "36/36" },
];

export default function PlayerDashboard() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-rose-600/20">
          <Shield className="h-5 w-5 text-amber-400" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold leading-tight text-amber-100">
            Painel do Jogador
          </h1>
          <p className="text-sm text-amber-100/50">
            Gerencie personagens, campanhas e sua jornada.
          </p>
        </div>
      </div>

      <section className="mb-10 grid gap-4 sm:grid-cols-4">
        {[
          { label: "Personagens", value: characters.length, icon: User },
          { label: "Campanhas", value: campaigns.length, icon: BookOpen },
          { label: "Nível máximo", value: 6, icon: Sparkles },
          { label: "Status", value: "Jogador", icon: Swords },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-amber-900/25 bg-slate-900/50 px-5 py-4">
            <div className="flex items-center gap-4">
              <Icon className="h-5 w-5 text-amber-400" />
              <div>
                <p className="text-xl font-semibold text-amber-100">{value}</p>
                <p className="text-xs text-amber-100/50">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-amber-100">Campanhas</h2>
            <Button size="sm" variant="outline">Entrar em Campanha</Button>
          </div>

          {campaigns.map((campaign) => (
            <button key={campaign.title} className="group flex w-full items-center justify-between rounded-xl border border-amber-900/25 bg-slate-900/50 px-5 py-4 text-left transition-colors hover:border-amber-700/40">
              <div>
                <p className="font-medium text-amber-100">{campaign.title}</p>
                <p className="mt-0.5 text-xs text-amber-100/50">
                  Mestre: {campaign.master} · {campaign.sessions} sessões
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300">
                  {campaign.status}
                </span>
                <ChevronRight className="h-4 w-4 text-amber-100/30 group-hover:text-amber-400" />
              </div>
            </button>
          ))}
        </section>

        <aside className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-amber-100">Personagens</h2>
            <Link to="/tools">
              <Button size="sm">
                <Plus className="h-3.5 w-3.5" /> Novo
              </Button>
            </Link>
          </div>

          {characters.map((character) => (
            <article key={character.name} className="rounded-xl border border-amber-900/25 bg-slate-900/50 p-5">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/15 to-rose-600/15">
                  <User className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-amber-100">{character.name}</p>
                  <p className="text-xs text-amber-100/45">Marca {character.mark}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-slate-950/40 p-3">
                  <p className="text-xs text-amber-100/35">Nível</p>
                  <p className="text-amber-100">{character.level}</p>
                </div>
                <div className="rounded-lg bg-slate-950/40 p-3">
                  <p className="flex items-center gap-1 text-xs text-amber-100/35"><HeartPulse className="h-3 w-3" /> Vida</p>
                  <p className="text-amber-100">{character.hp}</p>
                </div>
              </div>
            </article>
          ))}
        </aside>
      </div>
    </main>
  );
}
