import { useState } from "react";
import { useParams } from "react-router-dom";
import { Crown, Dice1 } from "lucide-react";

import CampaignTitleBar from "../components/campaignSession/CampaignTitleBar";
import CampaignSectionTabs from "../components/campaignSession/CampaignSectionTabs";
import DiceChat from "../components/campaignSession/DiceChat";

import ElementsSection from "../components/campaignSession/sections/ElementsSection";
import MembersSection from "../components/campaignSession/sections/MembersSection";
import LocationSection from "../components/campaignSession/sections/LocationSection";
import NotesSection from "../components/campaignSession/sections/NotesSection";
import BattleSection from "../components/campaignSession/sections/BattleSection";

import EventModal from "../components/modals/EventModal";
import ItemModal from "../components/modals/ItemModal";
import LocationModal from "../components/modals/LocationModal";
import MonsterModal from "../components/modals/MonsterModal";
import NpcModal from "../components/modals/NpcModal";

import { masterCampaignData } from "../data/masterCampaignMock";

import type { SectionKey } from "../types/masterCampaign";
import type { ActiveModal } from "../data/dashboardMock";

type ElementActionType = "localizacao" | "npc" | "monstro" | "item" | "evento";

const elementActionToModal: Record<ElementActionType, ActiveModal> = {
  localizacao: "location",
  npc: "npc",
  monstro: "monster",
  item: "item",
  evento: "event",
};

export default function MasterCampaignPage() {
  const { id } = useParams<{ id: string }>();

  const [activeSection, setActiveSection] = useState<SectionKey>("elementos");
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);

  const campaign = masterCampaignData[id ?? "1"] ?? masterCampaignData["1"];

  function handleAddElement(type: ElementActionType) {
    setActiveModal(elementActionToModal[type]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <CampaignTitleBar campaign={campaign} />

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_300px]">
          <div>
            <CampaignSectionTabs
              activeSection={activeSection}
              onChange={setActiveSection}
            />

            {activeSection === "elementos" && (
              <ElementsSection
                elements={campaign.elementos}
                onAdd={handleAddElement}
              />
            )}

            {activeSection === "membros" && (
              <MembersSection members={campaign.membros} />
            )}

            {activeSection === "localizacao" && (
              <LocationSection
                currentLocation={campaign.localizacaoAtual}
                allLocations={campaign.elementos.localizacoes}
              />
            )}

            {activeSection === "notas" && (
              <NotesSection initialNotes={campaign.notas} />
            )}

            {activeSection === "batalha" && (
              <BattleSection
                campaignId={id ?? "1"}
                monsters={campaign.elementos.monstros}
                members={campaign.membros}
                locations={campaign.elementos.localizacoes}
                currentLocation={campaign.localizacaoAtual.nome}
              />
            )}
          </div>

          <aside
            className="
              flex
              flex-col
              rounded-2xl
              border
              border-amber-900/25
              bg-slate-900/60
              p-4
              lg:sticky
              lg:top-24
            "
            style={{
              height: "calc(100vh - 8rem)",
              maxHeight: "680px",
            }}
          >
            <div className="mb-3 flex flex-shrink-0 items-center gap-2">
              <Dice1 className="h-4 w-4 text-amber-400" />

              <h3 className="text-sm font-semibold text-amber-100">
                Rolar Dados
              </h3>

              <span className="ml-auto flex items-center gap-1 text-xs text-amber-400/60">
                <Crown className="h-3 w-3" />
                Mestre
              </span>
            </div>

            <DiceChat masterName="Aldric Voss" />
          </aside>
        </div>
      </main>

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
