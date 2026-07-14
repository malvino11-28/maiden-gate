import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Swords, User, Crown } from "lucide-react";

import { useAuth } from "../../../auth/hooks/useAuth";
import {
  getMasterCampaigns,
  type MasterCampaignApi,
} from "../services/dashboardService";

import {
  acceptCampaignRequest,
  getMasterCampaignRequests,
  rejectCampaignRequest,
  type CampaignRequestApi,
} from "../services/campaignRequestService";

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

import { quickActions } from "../data/dashboardMock";
import type { ActiveModal } from "../data/dashboardMock";

export default function MasterDashboard() {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    "campaigns" | "request" | "profile"
  >("campaigns");
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);

  const [requests, setRequests] = useState<CampaignRequestApi[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  useEffect(() => {
    // buscando solicitações
    async function loadRequests() {
      if (!user) return;

      try {
        setIsLoadingRequests(true);
        setRequestError(null);

        const data = await getMasterCampaignRequests(user.id);

        setRequests(data);
      } catch {
        setRequestError("Não foi possível carregar as solicitações");
      } finally {
        setIsLoadingRequests(false);
      }
    }

    loadRequests();
  }, [activeTab, user]);

  async function handleAcceptRequest(requestId: number) {
    await acceptCampaignRequest(requestId);

    setRequests((currentRequests) =>
      currentRequests.filter((request) => request.id !== requestId),
    );
  }

  async function handleRejectRequest(requestId: number) {
    await rejectCampaignRequest(requestId);

    setRequests((currentRequests) =>
      currentRequests.filter((request) => request.id !== requestId),
    );
  }

  const [masterCampaigns, setMasterCampaigns] = useState<MasterCampaignApi[]>(
    [],
  );

  useEffect(() => {
    // buscando campanhas
    if (!user) return;

    const userId = user.id;

    async function loadCampaigns() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getMasterCampaigns(userId);

        setMasterCampaigns(data);
      } catch {
        setError("Não foi possível carregar suas campanhas.");
      } finally {
        setIsLoading(false);
      }
    }

    loadCampaigns();
  }, [user]);

  const dashboardStats = [
    {
      icon: Crown,
      value: String(masterCampaigns.length),
      label: "Campanhas",
    },
    {
      icon: Swords,
      value: String(
        masterCampaigns.reduce(
          (total, campaign) => total + (campaign.sessions_count ?? 0),
          0,
        ),
      ),
      label: "Sessões",
    },
    {
      icon: User,
      value: String(
        masterCampaigns.reduce(
          (total, campaign) => total + (campaign.characters_count ?? 0),
          0,
        ),
      ),
      label: "Jogadores",
    },
    {
      icon: Plus,
      value: String(
        masterCampaigns.filter((campaign) => campaign.status === "ativa")
          .length,
      ),
      label: "Ativas",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-13 sm:px-6 lg:px-8">
      <div className="space-y-10">
        <DashboardHeader name={user?.name ?? "Mestre"} />

        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {dashboardStats.map((stat) => (
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

                {isLoading && (
                  <p className="text-sm text-amber-100/50">
                    Carregando campanhas...
                  </p>
                )}

                {error && <p className="text-sm text-rose-400">{error}</p>}

                {!isLoading && !error && masterCampaigns.length === 0 && (
                  <p className="text-sm text-amber-100/50">
                    Você ainda não criou nenhuma campanha
                  </p>
                )}

                {!isLoading &&
                  !error &&
                  masterCampaigns.map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      id={String(campaign.id)}
                      title={campaign.name}
                      description={
                        campaign.description ?? "Sem descrição cadastrada."
                      }
                      status={campaign.status}
                      sessions={campaign.sessions_count ?? 0}
                      players={campaign.characters_count ?? 0}
                      lastSession="—"
                      to={`/dashboard/master/campaign/${campaign.id}`}
                    />
                  ))}
              </div>
            )}

            {activeTab === "request" && (
              <div className="space-y-4">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-amber-100">
                    Requisições
                  </h2>
                </div>

                {isLoadingRequests && (
                  <p className="text-sm text-amber-100/50">
                    Carregando solicitações...
                  </p>
                )}

                {requestError && (
                  <p className="text-sm text-rose-400">{requestError}</p>
                )}

                {!isLoadingRequests &&
                  !requestError &&
                  requests.length === 0 && (
                    <p className="text-sm text-amber-100/50">
                      Nenhuma solicitação pendente no momento.
                    </p>
                  )}

                {!isLoadingRequests &&
                  !requestError &&
                  requests.map((request) => (
                    <div
                      key={request.id}
                      className="rounded-xl border border-amber-900/25 bg-slate-900/50 p-5"
                    >
                      <p className="text-sm text-amber-100">
                        <span className="font-semibold">
                          {request.user.name}
                        </span>{" "}
                        pediu para entrar na campanha{" "}
                        <span className="font-semibold text-amber-300">
                          {request.campaign.name}
                        </span>
                        .
                      </p>

                      {request.character && (
                        <p className="mt-1 text-xs text-amber-100/45">
                          Personagem: {request.character.name}{" "}
                          {request.character.surname ?? ""}
                        </p>
                      )}

                      <div className="mt-4 flex gap-3">
                        <Button
                          size="sm"
                          onClick={() => handleAcceptRequest(request.id)}
                        >
                          Aceitar
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="border-rose-500/40 text-rose-400 hover:bg-rose-500/10"
                          onClick={() => handleRejectRequest(request.id)}
                        >
                          Recusar
                        </Button>
                      </div>
                    </div>
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
                        {user?.name ?? "Master"}
                      </p>
                      <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300">
                        <Crown className="h-3 w-3" /> Mestre
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-4 border-t border-amber-900/20 pt-4 sm:grid-cols-2">
                    {[
                      { label: "Nome", value: user?.name ?? "Mestre" },
                      { label: "Tipo de conta", value: "Mestre" },
                      {
                        label: "Campanhas criadas",
                        value: String(masterCampaigns.length),
                      },
                      {
                        label: "Sessões narradas",
                        value: String(
                          masterCampaigns.reduce(
                            (total, campaign) =>
                              total + (campaign.sessions_count ?? 0),
                            0,
                          ),
                        ),
                      },
                      { label: "CAMPANHAS ENCERRADAS", value: "0" },
                      { label: "Status", value: "Ativo" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="mb-0.5 text-xs uppercase tracking-wider text-amber-100/40">
                          {label}
                        </p>
                        <p className="text-sm text-amber-100">{value}</p>
                      </div>
                    ))}
                    <div className="flex gap-3 border-t border-rose-900/20 pt-4 hidden">
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
