/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertCircle, Dice1, Loader2 } from "lucide-react";

import { useAuth } from "../../../auth/hooks/useAuth";

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

import type {
  PlayerCampaignData,
  PlayerCampaignSectionKey,
} from "../types/player";
import {
  addInventoryItem,
  deleteInventoryItem,
  getPlayerCampaignView,
  updateInventoryQuantity,
} from "../../services/playerCampaignPageService";

export default function PlayerCampaignPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [activeSection, setActiveSection] =
    useState<PlayerCampaignSectionKey>("elementos");
  const [campaign, setCampaign] = useState<PlayerCampaignData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCampaign = useCallback(async () => {
    if (!id || !user) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await getPlayerCampaignView(id, user.id);
      setCampaign(data);
    } catch {
      setError("Não foi possível carregar os dados da campanha.");
    } finally {
      setIsLoading(false);
    }
  }, [id, user]);

  useEffect(() => {
    loadCampaign();
  }, [loadCampaign]);

  async function handleAddInventoryItem(itemId: number, quantity: number) {
    if (!campaign?.personagem.id) return;

    await addInventoryItem(campaign.personagem.id, itemId, quantity);
    await loadCampaign();
  }

  async function handleUpdateInventoryQuantity(
    inventoryId: number,
    quantity: number,
  ) {
    await updateInventoryQuantity(inventoryId, quantity);
    await loadCampaign();
  }

  async function handleDeleteInventoryItem(inventoryId: number) {
    await deleteInventoryItem(inventoryId);
    await loadCampaign();
  }

  if (isLoading) {
    return (
      <main className="mx-auto flex min-h-[60vh] w-full max-w-7xl items-center justify-center px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 rounded-2xl border border-amber-900/25 bg-slate-900/60 px-5 py-4 text-amber-100/60">
          <Loader2 className="h-5 w-5 animate-spin text-amber-400" />
          Carregando campanha...
        </div>
      </main>
    );
  }

  if (error || !campaign) {
    return (
      <main className="mx-auto flex min-h-[60vh] w-full max-w-7xl items-center justify-center px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <div className="max-w-md rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-center">
          <AlertCircle className="mx-auto mb-3 h-8 w-8 text-rose-300" />
          <p className="text-sm text-rose-200">
            {error ?? "Campanha não encontrada."}
          </p>
          <button
            type="button"
            onClick={() => navigate("/dashboard/player")}
            className="mt-4 rounded-xl border border-rose-400/30 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-500/10"
          >
            Voltar para dashboard
          </button>
        </div>
      </main>
    );
  }

  const characterName =
    `${campaign.personagem.nome} ${campaign.personagem.sobrenome ?? ""}`.trim();

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
            <PlayerInventorySection
              inventory={campaign.inventario}
              campaignItems={campaign.itensDaCampanha}
              onAddItem={handleAddInventoryItem}
              onUpdateQuantity={handleUpdateInventoryQuantity}
              onDeleteItem={handleDeleteInventoryItem}
            />
          )}

          {activeSection === "sessoes" && (
            <PlayerSessionsSection sessions={campaign.sessoes} />
          )}

          {activeSection === "batalha" && (
            <PlayerBattleSection
              campaignId={id ?? campaign.id}
              characterName={characterName}
              playerName={user?.name ?? "Jogador"}
              emoji={
                campaign.personagem.marcaEmoji ??
                campaign.personagem.nome.charAt(0)
              }
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
