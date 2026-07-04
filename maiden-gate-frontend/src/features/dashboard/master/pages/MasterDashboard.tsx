import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Swords, User, Crown } from "lucide-react";

import EventModal from "../components/modals/EventModal";
import ItemModal from "../components/modals/ItemModal";
import LocationModal from "../components/modals/LocationModal";
import MonsterModal from "../components/modals/MonsterModal";
import NpcModal from "../components/modals/NpcModal";
import TransferElementModal from "../components/modals/TransferElementModal";

import DashboardHeader from "../components/DashboardHeader";
import DashboardTabs from "../components/DashboardTabs";
import StatCard from "../components/StatCard";
import CampaignCard from "../components/CampaignCard";
import QuickActionCard from "../components/QuickActionCard";
import Button from "../../../../shared/components/Button/Button";

import { stats, campaigns, quickActions } from "../data/dashboardMock";
import type { ActiveModal } from "../data/dashboardMock";

export default function MasterDashboard() {
  const [activeTab, setActiveTab] = useState<"campaigns" | "profile">(
    "campaigns",
  );
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-13 sm:px-6 lg:px-8">
      <div className="space-y-10">
        <DashboardHeader name="Aldric Voss" />

        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </section>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_300px]">
          <section>
            <DashboardTabs activeTab={activeTab} onChange={setActiveTab} />

            {activeTab === "campaigns" && (
              <div className="space-y-4">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-amber-100">
                    Campanhas Criadas
                  </h2>

                  <Link to="/dashboard/master/create-campaign">
                    <Button size="sm">
                      <Plus className="h-3.5 w-3.5" />
                      Nova Campanha
                    </Button>
                  </Link>
                </div>

                {campaigns.map((campaign) => (
                  <CampaignCard key={campaign.title} {...campaign} />
                ))}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="max-w-xl space-y-5">
                <h2 className="mb-2 text-lg font-semibold text-amber-100">
                  Informações do Perfil
                </h2>
                <div className="rounded-xl border border-amber-900/25 bg-slate-900/50 p-6">
                  <div className="mb-5 flex items-center gap-5">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 border-amber-500/40 bg-gradient-to-br from-amber-500/30 to-rose-600/30">
                      <User className="h-8 w-8 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-amber-100">
                        Aldric Voss
                      </p>
                      <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300">
                        <Crown className="h-3 w-3" /> Mestre
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-4 border-t border-amber-900/20 pt-4 sm:grid-cols-2">
                    {[
                      { label: "Nome", value: "Aldric Voss" },
                      { label: "Tipo de conta", value: "Mestre" },
                      {
                        label: "Campanhas criadas",
                        value: String(campaigns.length),
                      },
                      { label: "Sessões narradas", value: "39" },
                      { label: "Membro desde", value: "Jan 2026" },
                      { label: "Status", value: "Ativo" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="mb-0.5 text-xs uppercase tracking-wider text-amber-100/40">
                          {label}
                        </p>
                        <p className="text-sm text-amber-100">{value}</p>
                      </div>
                    ))}
                    <div className="flex gap-3 border-t border-rose-900/20 pt-4">
                      <Button
                        variant="outline"
                        className="border-rose-500/40 text-rose-400 hover:bg-rose-500/10"
                      >
                        Editar Perfil
                      </Button>
                      <Button
                        variant="outline"
                        className="border-amber-500/40 text-amber-400 hover:bg-amber-500/10"
                      >
                        Alterar Senha
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          <aside className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-100/60">
              Ações Rápidas
            </h2>

            {quickActions.map((action) => (
              <QuickActionCard
                key={action.title}
                icon={action.icon}
                title={action.title}
                description={action.description}
                onClick={() => setActiveModal(action.id)}
              />
            ))}

            <div className="rounded-xl border border-amber-900/20 bg-slate-900/30 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Swords className="h-4 w-4 text-amber-400" />
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-100/70">
                  Dica do Mestre
                </p>
              </div>
              <p className="text-xs leading-relaxed text-amber-100/45">
                Crie localizações antes de montar sessões para que os jogadores
                possam explorar o mundo com mais imersão.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <EventModal
        isOpen={activeModal === "event"}
        onClose={() => setActiveModal(null)}
      />
      <ItemModal
        isOpen={activeModal === "item"}
        onClose={() => setActiveModal(null)}
      />
      <LocationModal
        isOpen={activeModal === "location"}
        onClose={() => setActiveModal(null)}
      />
      <MonsterModal
        isOpen={activeModal === "monster"}
        onClose={() => setActiveModal(null)}
      />
      <NpcModal
        isOpen={activeModal === "npc"}
        onClose={() => setActiveModal(null)}
      />
      <TransferElementModal
        isOpen={activeModal === "transfer"}
        onClose={() => setActiveModal(null)}
      />
    </main>
  );
}
