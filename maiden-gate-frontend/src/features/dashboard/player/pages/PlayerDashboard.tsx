import { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../../../shared/components/Button/Button";

import PlayerDashboardHeader from "../components/dashboard/PlayerDashboardHeader";
import PlayerStatCard from "../components/dashboard/PlayerStatCard";
import PlayerDashboardTabs from "../components/dashboard/PlayerDashboardTabs";
import CharacterCard from "../components/dashboard/CharacterCard";
import NewCharacterCard from "../components/dashboard/NewCharacterCard";
import MyCampaignCard from "../components/dashboard/MyCampaignCard";
import AvailableCampaignCard from "../components/dashboard/AvailableCampaignCard";
import PlayerProfileCard from "../components/dashboard/PlayerProfileCard";

import {
  availableCampaigns,
  getPlayerStats,
  myCampaigns,
  playerCharacters,
  playerName,
} from "../data/playerDashboardMock";
import type { PlayerDashboardTab } from "../types/player";

export default function PlayerDashboard() {
  const [tab, setTab] = useState<PlayerDashboardTab>("personagens");
  const navigate = useNavigate();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <PlayerDashboardHeader playerName={playerName} />

      <section className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {getPlayerStats().map((stat) => (
          <PlayerStatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </section>

      <PlayerDashboardTabs activeTab={tab} onChange={setTab} />

      {tab === "personagens" && (
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-amber-100">Personagens Criados</h2>

            <Button
              size="sm"
              className="gap-1.5 text-xs"
              onClick={() => navigate("/dashboard/player/character/new")}
            >
              <Plus className="h-3.5 w-3.5" /> Criar Personagem
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {playerCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}

            <NewCharacterCard />
          </div>
        </section>
      )}

      {tab === "minhas-campanhas" && (
        <section>
          <h2 className="mb-5 text-lg font-semibold text-amber-100">Minhas Campanhas</h2>

          <div className="space-y-3">
            {myCampaigns.map((campaign) => (
              <MyCampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </section>
      )}

      {tab === "campanhas-disponiveis" && (
        <section>
          <h2 className="mb-2 text-lg font-semibold text-amber-100">Campanhas Disponíveis</h2>
          <p className="mb-6 text-sm text-amber-100/50">
            Encontre campanhas abertas para novos aventureiros.
          </p>

          <div className="space-y-4">
            {availableCampaigns.map((campaign) => (
              <AvailableCampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </section>
      )}

      {tab === "perfil" && <PlayerProfileCard playerName={playerName} onChangeTab={setTab} />}
    </main>
  );
}
