/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { AlertTriangle, Crown, Download, Shield } from "lucide-react";

import { masterTabs } from "../data/MasterRulesTabs";
import { playerTabs } from "../data/playerRulesTabs";

type Props = {
  role: "master" | "player";
};

export default function RoleRulesPage({ role }: Props) {
  const tabs = role === "master" ? masterTabs : playerTabs;
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  useEffect(() => {
    setActiveTab(tabs[0].key);
  }, [role, tabs]);

  const activeRule = tabs.find((tab) => tab.key === activeTab) ?? tabs[0];
  const ActiveIcon = activeRule.icon;

  const isMaster = role === "master";

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="mb-8 overflow-hidden rounded-3xl border border-amber-900/25 bg-slate-900/60">
        <div className="relative p-6 sm:p-8">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-rose-600/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-500/25 bg-amber-500/10">
                  {isMaster ? (
                    <Crown className="h-5 w-5 text-amber-300" />
                  ) : (
                    <Shield className="h-5 w-5 text-rose-300" />
                  )}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-amber-100/35">
                    Guia essencial
                  </p>
                  <h1 className="text-3xl font-semibold text-amber-100 sm:text-4xl">
                    Regras para {isMaster ? "Mestres" : "Jogadores"}
                  </h1>
                </div>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-amber-100/60 sm:text-base">
                {isMaster
                  ? "Um resumo prático para conduzir campanhas, controlar elementos da mesa, criar tensão narrativa e organizar sessões em Voice of Flower."
                  : "Um guia rápido para entender criação de personagem, testes, combate, habilidades e participação nas campanhas de Voice of Flower."}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-900/25 bg-slate-950/50 p-4">
              <button
                type="button"
                disabled
                className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-3 text-sm font-medium text-amber-100/35"
              >
                <Download className="h-4 w-4" />
                Download indisponível
              </button>

              <p className="mt-2 text-center text-xs text-amber-100/30">
                O livro completo ainda está em desenvolvimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-amber-900/25 bg-slate-900/50 p-3 lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 px-2 text-xs uppercase tracking-[0.2em] text-amber-100/35">
            Abas
          </p>

          <div className="space-y-2">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                  activeTab === key
                    ? "border-amber-500/40 bg-gradient-to-r from-amber-500/20 to-rose-600/20 text-amber-200"
                    : "border-amber-900/20 bg-slate-950/40 text-amber-100/50 hover:border-amber-700/40 hover:text-amber-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </aside>

        <section className="rounded-2xl border border-amber-900/25 bg-slate-900/50 p-5 sm:p-6">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-amber-500/25 bg-amber-500/10">
              <ActiveIcon className="h-5 w-5 text-amber-300" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-amber-100">
                {activeRule.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-amber-100/55">
                {activeRule.description}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {activeRule.topics.map((topic, index) => (
              <article
                key={topic.title}
                className="rounded-2xl border border-amber-900/20 bg-slate-950/40 p-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-xs font-semibold text-amber-300">
                    {index + 1}
                  </span>

                  <h3 className="font-semibold text-amber-100">
                    {topic.title}
                  </h3>
                </div>

                <p className="text-sm leading-7 text-amber-100/55">
                  {topic.content}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-300/80" />
              <div>
                <p className="text-sm font-semibold text-amber-100">
                  Conteúdo resumido
                </p>
                <p className="mt-1 text-sm leading-6 text-amber-100/50">
                  Esta página contém apenas as regras essenciais para uso no
                  sistema. O livro completo de Voice of Flower será adicionado
                  futuramente.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
