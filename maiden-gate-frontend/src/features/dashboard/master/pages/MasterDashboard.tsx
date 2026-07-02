import { useState } from "react";
import { Plus } from "lucide-react";

import EventModal from "../components/modals/EventModal";
import ItemModal from "../components/modals/ItemModal";
import LocationModal from "../components/modals/LocationModal";
import MonsterModal from "../components/modals/MonsterModal";
import NpcModal from "../components/modals/NpcModal";

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
    <div className="space-y-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <DashboardHeader name="Aldric Voss" />

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </section>

        <div className="grid gap-8 xl:grid-cols-[2fr_380px]">
          <section className="space-y-6">
            <DashboardTabs activeTab={activeTab} onChange={setActiveTab} />

            {activeTab === "campaigns" && (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-white">
                    Campanhas Criadas
                  </h2>

                  <Button
                    className="
                      w-auto
                      px-6
                      py-3
                    "
                  >
                    <Plus size={18} />
                    Nova Campanha
                  </Button>
                </div>

                <div className="space-y-5">
                  {campaigns.map((campaign) => (
                    <CampaignCard key={campaign.title} {...campaign} />
                  ))}
                </div>
              </>
            )}

            {activeTab === "profile" && (
              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#11162B]
                  p-10
                "
              >
                <h2 className="mb-3 text-2xl font-bold text-white">Perfil</h2>

                <p className="text-stone-400">
                  Área reservada para edição do perfil do mestre.
                </p>
              </div>
            )}
          </section>

          <aside className="space-y-5">
            <h2 className="text-xl font-bold uppercase tracking-widest text-stone-300">
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
    </div>
  );
}
