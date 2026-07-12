import { useState } from "react";
import { useParams } from "react-router-dom";
import { Dice1 } from "lucide-react";

import PlayerCampaignTitleBar from "../components/campaignSession/PlayerCampaignTitleBar";
import PlayerCampaignTabs from "../components/campaignSession/PlayerCampaignTabs";
import PlayerDiceChat from "../components/campaignSession/PlayerDiceChat";

import PlayerElementsSection from "../components/campaignSession/sections/PlayerElementsSection";
import PlayerCharacterSection from "../components/campaignSession/sections/PlayerCharacterSection";
import PlayerMembersSection from "../components/campaignSession/sections/PlayerMembersSection";
import PlayerLocationSection from "../components/campaignSession/sections/PlayerLocationSection";
import PlayerInventorySection from "../components/campaignSession/sections/PlayerInventorySection";
import PlayerBattleSection from "../components/campaignSession/sections/PlayerBattleSection";
import PlayerSessionsSection from "../components/campaignSession/sections/PlayerSessionsSection";

import { playerCampaignData } from "../data/playerCampaignMock";
import { playerName } from "../data/playerDashboardMock";
import type { PlayerCampaignSectionKey } from "../types/player";

export default function PlayerCampaignPage() {
  const { id } = useParams<{ id: string }>();
  const [activeSection, setActiveSection] =
    useState<PlayerCampaignSectionKey>("elementos");

  const campaign = playerCampaignData[id ?? "1"] ?? playerCampaignData["1"];
  const characterName = `${campaign.personagem.nome} ${campaign.personagem.sobrenome}`;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      <PlayerCampaignTitleBar campaign={campaign} />

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_300px]">
        <div>
          <PlayerCampaignTabs
            activeSection={activeSection}
            onChange={setActiveSection}
          />

          {activeSection === "elementos" && (
            <PlayerElementsSection elements={campaign.elementos} />
          )}

          {activeSection === "personagem" && (
            <PlayerCharacterSection character={campaign.personagem} />
          )}

          {activeSection === "membros" && (
            <PlayerMembersSection members={campaign.membros} />
          )}

          {activeSection === "localizacao" && (
            <PlayerLocationSection location={campaign.localizacaoAtual} />
          )}

          {activeSection === "inventario" && (
            <PlayerInventorySection inventory={campaign.inventario} />
          )}

          {activeSection === "sessoes" && (
            <PlayerSessionsSection sessions={campaign.sessoes} />
          )}

          {activeSection === "batalha" && (
            <PlayerBattleSection
              campaignId={id ?? "1"}
              characterName={characterName}
              playerName={playerName}
              emoji={campaign.personagem.marcaEmoji ?? campaign.personagem.nome.charAt(0)}
              currentLocation={campaign.localizacaoAtual.nome}
              skills={campaign.personagem.habilidades}
            />
          )}
        </div>

        <aside
          className="flex flex-col rounded-2xl border border-amber-900/25 bg-slate-900/60 p-4 lg:sticky lg:top-24"
          style={{ height: "calc(100vh - 8rem)", maxHeight: "680px" }}
        >
          <div className="mb-3 flex flex-shrink-0 items-center gap-2">
            <Dice1 className="h-4 w-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-amber-100">
              Rolar Dados
            </h3>
            <span className="ml-auto text-xs text-amber-100/30">
              {campaign.personagem.nome}
            </span>
          </div>

          <PlayerDiceChat characterName={campaign.personagem.nome} />
        </aside>
      </div>
    </main>
  );
}
