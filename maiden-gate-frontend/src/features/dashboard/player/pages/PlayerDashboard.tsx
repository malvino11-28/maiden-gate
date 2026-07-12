import { useEffect, useMemo, useState } from "react";
import { Globe, Plus, ScrollText, Star, Users } from "lucide-react";
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

import { playerName } from "../data/playerDashboardMock";
import type {
  AvailableCampaign,
  PlayerCampaignSummary,
  PlayerCharacterSummary,
  PlayerDashboardTab,
} from "../types/player";

import { useAuth } from "../../../auth/hooks/useAuth";
import {
  getAvailableCampaigns,
  getPlayerCampaigns,
  getPlayerCharacters,
  requestCampaignEntry,
} from "../../services/playerDashboardService";

export default function PlayerDashboard() {
  const [tab, setTab] = useState<PlayerDashboardTab>("personagens");
  const { user } = useAuth();
  const [characters, setCharacters] = useState<PlayerCharacterSummary[]>([]);
  const [myCampaigns, setMyCampaigns] = useState<PlayerCampaignSummary[]>([]);
  const [availableCampaigns, setAvailableCampaigns] = useState<AvailableCampaign[]>([]);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(false);
  const [charactersError, setCharactersError] = useState<string | null>(null);
  const [campaignsError, setCampaignsError] = useState<string | null>(null);
  const [requestingCampaignId, setRequestingCampaignId] = useState<number | null>(null);
  const [requestMessage, setRequestMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const userId = user.id;

    async function loadDashboardData() {
      try {
        setIsLoadingCharacters(true);
        setIsLoadingCampaigns(true);
        setCharactersError(null);
        setCampaignsError(null);

        const [charactersData, myCampaignsData, availableCampaignsData] =
          await Promise.all([
            getPlayerCharacters(userId),
            getPlayerCampaigns(userId),
            getAvailableCampaigns(userId),
          ]);

        setCharacters(charactersData);
        setMyCampaigns(myCampaignsData);
        setAvailableCampaigns(availableCampaignsData);
      } catch {
        setCharactersError("Não foi possível carregar seus personagens.");
        setCampaignsError("Não foi possível carregar suas campanhas.");
      } finally {
        setIsLoadingCharacters(false);
        setIsLoadingCampaigns(false);
      }
    }

    loadDashboardData();
  }, [user]);

  const playerStats = useMemo(() => {
    const activeCampaigns = myCampaigns.filter(
      (campaign) => campaign.status === "ativa",
    ).length;

    const averageLevel =
      characters.length > 0
        ? Math.round(
            characters.reduce(
              (total, character) => total + character.nivel,
              0,
            ) / characters.length,
          )
        : 0;

    return [
      {
        label: "Personagens",
        value: characters.length,
        icon: Users,
      },
      {
        label: "Campanhas Ativas",
        value: activeCampaigns,
        icon: ScrollText,
      },
      {
        label: "Disponíveis",
        value: availableCampaigns.length,
        icon: Globe,
      },
      {
        label: "Nível Médio",
        value: averageLevel,
        icon: Star,
      },
    ];
  }, [availableCampaigns.length, characters, myCampaigns]);

  async function handleRequestCampaign(campaignId: number) {
    if (!user) return;

    try {
      setRequestingCampaignId(campaignId);
      setRequestMessage(null);
      await requestCampaignEntry(campaignId, user.id);

      setAvailableCampaigns((currentCampaigns) =>
        currentCampaigns.filter((campaign) => campaign.id !== campaignId),
      );
      setRequestMessage("Solicitação enviada ao mestre.");
    } catch (error: any) {
      setRequestMessage(
        error?.response?.data?.message ??
          "Não foi possível solicitar entrada nesta campanha.",
      );
    } finally {
      setRequestingCampaignId(null);
    }
  }

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

          {isLoadingCampaigns && (
            <p className="text-sm text-amber-100/45">Carregando campanhas...</p>
          )}

          {campaignsError && (
            <p className="text-sm text-rose-300">{campaignsError}</p>
          )}

          {!isLoadingCampaigns && !campaignsError && myCampaigns.length === 0 && (
            <p className="rounded-xl border border-amber-900/20 bg-slate-900/40 px-4 py-5 text-sm text-amber-100/45">
              Você ainda não participa de nenhuma campanha.
            </p>
          )}

          {!isLoadingCampaigns && !campaignsError && myCampaigns.length > 0 && (
            <div className="space-y-3">
              {myCampaigns.map((campaign) => (
                <MyCampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
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

          {requestMessage && (
            <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              {requestMessage}
            </div>
          )}

          {isLoadingCampaigns && (
            <p className="text-sm text-amber-100/45">Carregando campanhas...</p>
          )}

          {campaignsError && (
            <p className="text-sm text-rose-300">{campaignsError}</p>
          )}

          {!isLoadingCampaigns &&
            !campaignsError &&
            availableCampaigns.length === 0 && (
              <p className="rounded-xl border border-amber-900/20 bg-slate-900/40 px-4 py-5 text-sm text-amber-100/45">
                Nenhuma campanha disponível no momento.
              </p>
            )}

          {!isLoadingCampaigns &&
            !campaignsError &&
            availableCampaigns.length > 0 && (
              <div className="space-y-4">
                {availableCampaigns.map((campaign) => (
                  <AvailableCampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    isRequesting={requestingCampaignId === campaign.id}
                    onRequest={() => handleRequestCampaign(campaign.id)}
                  />
                ))}
              </div>
            )}
        </section>
      )}

      {tab === "perfil" && (
        <PlayerProfileCard
          playerName={user?.name ?? playerName}
          charactersCount={characters.length}
          activeCampaignsCount={
            myCampaigns.filter((campaign) => campaign.status === "ativa").length
          }
          onChangeTab={setTab}
        />
      )}
    </main>
  );
}
