import { useState, useEffect, useMemo } from "react";
import { HeartPulse, Plus, ScrollText, Star, Users } from "lucide-react";
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
  myCampaigns,
  playerName,
} from "../data/playerDashboardMock";
import type { PlayerDashboardTab } from "../types/player";

import { useAuth } from "../../../auth/hooks/useAuth";
import { getPlayerCharacters } from "../../services/playerDashboardService";
import type { PlayerCharacterSummary } from "../types/player";

export default function PlayerDashboard() {
  const [tab, setTab] = useState<PlayerDashboardTab>("personagens");
  const { user } = useAuth();
  const [characters, setCharacters] = useState<PlayerCharacterSummary[]>([]);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [charactersError, setCharactersError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    async function loadCharacters() {
      try {
        setIsLoadingCharacters(true);
        setCharactersError(null);

        const data = await getPlayerCharacters(user.id);
        setCharacters(data);
      } catch {
        setCharactersError("Não foi possível carregar seus personagens.");
      } finally {
        setIsLoadingCharacters(false);
      }
    }

    loadCharacters();
  }, [user]);

  const playerStats = useMemo(() => {
    const campaignNames = new Set(
      characters
        .map((character) => character.campanha)
        .filter(
          (campaignName) => campaignName && campaignName !== "Sem campanha",
        ),
    );

    const averageLevel =
      characters.length > 0
        ? Math.round(
            characters.reduce(
              (total, character) => total + character.nivel,
              0,
            ) / characters.length,
          )
        : 0;

    const averageHpPercent =
      characters.length > 0
        ? Math.round(
            characters.reduce((total, character) => {
              if (!character.hpMax) return total;

              return total + (character.hp / character.hpMax) * 100;
            }, 0) / characters.length,
          )
        : 0;

    return [
      {
        label: "Personagens",
        value: characters.length,
        icon: Users,
      },
      {
        label: "Campanhas",
        value: campaignNames.size,
        icon: ScrollText,
      },
      {
        label: "Nível Médio",
        value: averageLevel,
        icon: Star,
      },
      {
        label: "Vida Média",
        value: `${averageHpPercent}%`,
        icon: HeartPulse,
      },
    ];
  }, [characters]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <PlayerDashboardHeader playerName={user?.name ?? playerName} />

      <section className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {playerStats.map((stat) => (
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
            <h2 className="text-lg font-semibold text-amber-100">
              Personagens Criados
            </h2>

            <Button
              size="sm"
              className="gap-1.5 text-xs"
              onClick={() => navigate("/dashboard/player/character/new")}
            >
              <Plus className="h-3.5 w-3.5" /> Criar Personagem
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {isLoadingCharacters && (
              <p className="text-sm text-amber-100/45">
                Carregando personagens...
              </p>
            )}

            {charactersError && (
              <p className="text-sm text-rose-300">{charactersError}</p>
            )}

            {!isLoadingCharacters &&
              !charactersError &&
              characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}

            <NewCharacterCard />
          </div>
        </section>
      )}

      {tab === "minhas-campanhas" && (
        <section>
          <h2 className="mb-5 text-lg font-semibold text-amber-100">
            Minhas Campanhas
          </h2>

          <div className="space-y-3">
            {myCampaigns.map((campaign) => (
              <MyCampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </section>
      )}

      {tab === "campanhas-disponiveis" && (
        <section>
          <h2 className="mb-2 text-lg font-semibold text-amber-100">
            Campanhas Disponíveis
          </h2>
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

      {tab === "perfil" && (
        <PlayerProfileCard
          playerName={user?.name ?? playerName}
          onChangeTab={setTab}
        />
      )}
    </main>
  );
}
