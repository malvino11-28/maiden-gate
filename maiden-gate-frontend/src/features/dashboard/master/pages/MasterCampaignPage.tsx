/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Crown, Dice1 } from "lucide-react";

import CampaignTitleBar from "../components/campaignSession/CampaignTitleBar";
import CampaignSectionTabs from "../components/campaignSession/CampaignSectionTabs";
import DiceChat from "../components/campaignSession/DiceChat";

import ElementsSection from "../components/campaignSession/sections/ElementsSection";
import MembersSection from "../components/campaignSession/sections/MembersSection";
import LocationSection from "../components/campaignSession/sections/LocationSection";
import NotesSection from "../components/campaignSession/sections/NotesSection";
import BattleSection from "../components/campaignSession/sections/BattleSection";
import SessionsSection from "../components/campaignSession/sections/SessionsSection";
import CampaignDataSection from "../components/campaignSession/sections/CampaignDataSection";

import EventModal from "../components/modals/EventModal";
import ItemModal from "../components/modals/ItemModal";
import LocationModal from "../components/modals/LocationModal";
import MonsterModal from "../components/modals/MonsterModal";
import NpcModal from "../components/modals/NpcModal";

import type { SectionKey } from "../types/masterCampaign";
import type { ActiveModal } from "../data/dashboardMock";

import {
  deleteCampaign,
  getMasterCampaignView,
  updateCampaign,
  updateCampaignCurrentLocation,
  updateCampaignNotes,
} from "../services/campaignPageService";

type ElementActionType = "localizacao" | "npc" | "monstro" | "item" | "evento";

const elementActionToModal: Record<ElementActionType, ActiveModal> = {
  localizacao: "location",
  npc: "npc",
  monstro: "monster",
  item: "item",
  evento: "event",
};

const markEmojis: Record<string, string> = {
  Manifesto: "⚔️",
  Oculto: "🌒",
  Respiração: "🌬️",
  Entoadora: "🎶",
  Maso: "🩸",
};

function getNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getAttributeMod(value: number) {
  return Math.floor((value - 10) / 2);
}

function getSkillType(type?: string | null) {
  if (type === "passiva") return "Passiva" as const;
  if (type === "reacao" || type === "reação") return "Reação" as const;
  return "Ativa" as const;
}

function getMarkName(mark: any) {
  return mark?.name ?? mark?.nome ?? mark ?? "Sem marca";
}

function mapCampaignMember(character: any) {
  const user = character.user ?? {};
  const markName = getMarkName(character.marca);
  const fullName = [character.name, character.surname].filter(Boolean).join(" ");

  const attributes = [
    { nome: "POD", valor: getNumber(character.pod, 0) },
    { nome: "DES", valor: getNumber(character.des, 0) },
    { nome: "RES", valor: getNumber(character.res, 0) },
    { nome: "INT", valor: getNumber(character.int, 0) },
    { nome: "DET", valor: getNumber(character.det, 0) },
    { nome: "PRE", valor: getNumber(character.pre, 0) },
  ].map((attribute) => ({
    ...attribute,
    mod: getAttributeMod(attribute.valor),
  }));

  const skills = (character.skills ?? [])
    .filter((skill: any) => skill?.pivot?.equipped ?? true)
    .map((skill: any) => ({
      nome: skill.name ?? skill.nome ?? "Habilidade sem nome",
      tipo: getSkillType(skill.type ?? skill.tipo),
    }));

  return {
    id: character.id,
    nome: user.name ?? "Jogador",
    personagem: fullName || "Personagem sem nome",
    marca: markName,
    emoji: markEmojis[markName] ?? "✦",
    iconImage: character.icon_image ?? character.iconImage ?? null,
    nivel: getNumber(character.level, 1),
    hp: getNumber(character.hp_current, 0),
    hpMax: Math.max(getNumber(character.hp_max, 1), 1),
    atributos: attributes,
    habilidades: skills,
  };
}

export default function MasterCampaignPage() {
  const { id } = useParams<{ id: string }>();

  const [activeSection, setActiveSection] = useState<SectionKey>("elementos");
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);
  const navigate = useNavigate();

  // eslint-disable-all-line @typescript-eslint/no-explicit-any
  const [campaign, setCampaign] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadCampaign() {
    if (!id) {
      setError("Campanha não encontrada.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const data = await getMasterCampaignView(Number(id));
      const currentLocation = data.current_location ?? data.currentLocation;

      setCampaign({
        id: data.id,
        nome: data.name,
        name: data.name,
        descricao: data.description ?? "",
        description: data.description ?? "",
        imagem: data.image ?? null,
        nivelRecomendado: data.recommended_level,
        jogadores: data.players,
        status: data.status,
        notas: data.notes ?? "",

        membros: (data.characters ?? []).map(mapCampaignMember),
        agendaSessoes: data.sessions ?? [],

        localizacaoAtual: currentLocation
          ? {
              ...currentLocation,
              nome: currentLocation.nome ?? currentLocation.name ?? "Sem nome",
              name: currentLocation.name ?? currentLocation.nome ?? "Sem nome",
              descricao:
                currentLocation.descricao ?? currentLocation.description ?? "",
              description:
                currentLocation.description ?? currentLocation.descricao ?? "",
              imagem: currentLocation.imagem ?? currentLocation.image ?? null,
              image: currentLocation.image ?? currentLocation.imagem ?? null,
            }
          : {
              id: 0,
              nome: "Nenhuma localização",
              name: "Nenhuma localização",
            },

        elementos: {
          localizacoes: (data.locations ?? []).map((location: any) => ({
            ...location,
            nome: location.nome ?? location.name ?? "Sem nome",
            name: location.name ?? location.nome ?? "Sem nome",
            tipo: location.tipo ?? location.type ?? "",
            type: location.type ?? location.tipo ?? "",
            regiao: location.regiao ?? location.region ?? "",
            region: location.region ?? location.regiao ?? "",
            descricao: location.descricao ?? location.description ?? "",
            description: location.description ?? location.descricao ?? "",
            imagem: location.imagem ?? location.image ?? null,
            image: location.image ?? location.imagem ?? null,
          })),

          npcs: (data.npcs ?? []).map((npc: any) => ({
            ...npc,
            id: String(npc.id),

            nome: npc.nome ?? npc.name ?? "Sem nome",
            name: npc.name ?? npc.nome ?? "Sem nome",

            raca: npc.raca ?? npc.race ?? "Não informada",
            race: npc.race ?? npc.raca ?? "Não informada",

            ocupacao: npc.ocupacao ?? npc.occupation ?? "",
            occupation: npc.occupation ?? npc.ocupacao ?? "",

            personalidade: npc.personalidade ?? npc.personality ?? "",
            personality: npc.personality ?? npc.personalidade ?? "",

            segredo: npc.segredo ?? npc.secret ?? "",
            secret: npc.secret ?? npc.segredo ?? "",

            descricao: npc.descricao ?? npc.description ?? "",
            description: npc.description ?? npc.descricao ?? "",

            imagem: npc.imagem ?? npc.image ?? null,
            image: npc.image ?? npc.imagem ?? null,

            status: npc.status ?? npc.stats ?? {},
            stats: npc.stats ?? npc.status ?? {},
          })),

          monstros: (data.bestiary ?? []).map((monster: any) => ({
            ...monster,
            id: String(monster.id),

            nome: monster.nome ?? monster.name ?? "Sem nome",
            name: monster.name ?? monster.nome ?? "Sem nome",

            tipo: monster.tipo ?? monster.type ?? "",
            type: monster.type ?? monster.tipo ?? "",

            ameaca: monster.ameaca ?? monster.threat ?? "",
            threat: monster.threat ?? monster.ameaca ?? "",

            habilidades:
              typeof monster.habilidades === "string"
                ? monster.habilidades
                : typeof monster.skills === "string"
                  ? monster.skills
                  : Array.isArray(monster.skills)
                    ? monster.skills.join(" | ")
                    : monster.skills
                      ? Object.values(monster.skills)
                          .filter(Boolean)
                          .join(" | ")
                      : "",

            skills: monster.skills ?? monster.habilidades ?? "",

            status: monster.status ?? monster.stats ?? {},
            stats: monster.stats ?? monster.status ?? {},

            descricao: monster.descricao ?? monster.description ?? "",
            description: monster.description ?? monster.descricao ?? "",

            imagem: monster.imagem ?? monster.image ?? null,
            image: monster.image ?? monster.imagem ?? null,
          })),

          itens: (data.items ?? []).map((item: any) => ({
            ...item,
            nome: item.nome ?? item.name ?? "Sem nome",
            name: item.name ?? item.nome ?? "Sem nome",
            tipo: item.tipo ?? item.type ?? "",
            type: item.type ?? item.tipo ?? "",
            descricao: item.descricao ?? item.description ?? "",
            description: item.description ?? item.descricao ?? "",
            imagem: item.imagem ?? item.image ?? null,
            image: item.image ?? item.imagem ?? null,
          })),

          eventos: (data.lore_events ?? data.loreEvents ?? []).map(
            (event: any) => ({
              ...event,
              titulo: event.titulo ?? event.title ?? "Sem título",
              title: event.title ?? event.titulo ?? "Sem título",
              cronologia: event.cronologia ?? event.chronology ?? "",
              chronology: event.chronology ?? event.cronologia ?? "",
              data: event.data ?? event.event_date ?? event.date ?? "",
              date: event.date ?? event.event_date ?? event.data ?? "",
              descricao: event.descricao ?? event.description ?? "",
              description: event.description ?? event.descricao ?? "",
            }),
          ),

          agendaSessoes: (data.sessions ?? []).map((session: any) => ({
            id: String(session.id),
            title: session.title,
            date: session.date,
            time: session.time,
            description: session.description ?? "",
            status: session.status ?? "em_espera",
          })),
        },

        masterName: data.master?.name ?? "Mestre",
      });
    } catch {
      setError("Não foi possível carregar a campanha.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCampaign();
  }, [id]);

  function handleAddElement(type: ElementActionType) {
    setActiveModal(elementActionToModal[type]);
  }

  async function handleEditCampaign(data: {
    nome: string;
    imagem: string;
    imageFile: File | null;
    descricao: string;
    nivelRecomendado: string;
    jogadores: string;
  }) {
    const updatedCampaign = await updateCampaign(Number(campaign.id), {
      name: data.nome,
      image: data.imageFile,
      description: data.descricao || null,
      recommended_level: data.nivelRecomendado,
      players: data.jogadores || null,
    });

    setCampaign((current: any) => ({
      ...current,
      nome: updatedCampaign.name,
      name: updatedCampaign.name,
      imagem: updatedCampaign.image ?? null,
      image: updatedCampaign.image ?? null,
      descricao: updatedCampaign.description ?? "",
      description: updatedCampaign.description ?? "",
      nivelRecomendado: updatedCampaign.recommended_level,
      recommendedLevel: updatedCampaign.recommended_level,
      jogadores: updatedCampaign.players ?? "",
      players: updatedCampaign.players ?? "",
      status: updatedCampaign.status,
    }));
  }

  async function handleDeleteCampaign() {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta campanha?",
    );

    if (!confirmDelete) return;

    await deleteCampaign(Number(campaign.id));

    navigate("/dashboard/master");
  }

  function handleCloseModal() {
    setActiveModal(null);
    loadCampaign();
  }

  async function handleSaveNotes(notes: string) {
    const updatedCampaign = await updateCampaignNotes(campaign.id, notes);

    setCampaign((current: any) => ({
      ...current,
      notas: updatedCampaign.notes ?? notes,
    }));
  }

  async function handleChangeCurrentLocation(locationId: number) {
    const selectedLocation = campaign.elementos.localizacoes.find(
      (location: any) => Number(location.id) === locationId,
    );

    await updateCampaignCurrentLocation(campaign.id, locationId);

    if (!selectedLocation) return;

    setCampaign((current: any) => ({
      ...current,
      localizacaoAtual: {
        ...selectedLocation,
        nome: selectedLocation.nome ?? selectedLocation.name ?? "Sem nome",
        name: selectedLocation.name ?? selectedLocation.nome ?? "Sem nome",
        tipo: selectedLocation.tipo ?? selectedLocation.type ?? "",
        type: selectedLocation.type ?? selectedLocation.tipo ?? "",
        regiao: selectedLocation.regiao ?? selectedLocation.region ?? "",
        region: selectedLocation.region ?? selectedLocation.regiao ?? "",
        descricao:
          selectedLocation.descricao ?? selectedLocation.description ?? "",
        description:
          selectedLocation.description ?? selectedLocation.descricao ?? "",
        imagem: selectedLocation.imagem ?? selectedLocation.image ?? null,
        image: selectedLocation.image ?? selectedLocation.imagem ?? null,
      },
    }));
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-amber-100">
        Carregando campanha...
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-rose-400">
        {error ?? "Campanha não encontrada."}
      </div>
    );
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
                onChangeCurrentLocation={handleChangeCurrentLocation}
              />
            )}

            {activeSection === "notas" && (
              <NotesSection
                initialNotes={campaign.notas}
                onSave={handleSaveNotes}
              />
            )}

            {activeSection === "sessoes" && (
              <SessionsSection
                campaignId={Number(campaign.id)}
                initialSessions={campaign.agendaSessoes}
              />
            )}

            {activeSection === "dados" && (
              <CampaignDataSection
                campaign={campaign}
                onEdit={handleEditCampaign}
                onDelete={handleDeleteCampaign}
              />
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

            <DiceChat masterName={campaign.masterName} />
          </aside>
        </div>
      </main>

      <EventModal isOpen={activeModal === "event"} onClose={handleCloseModal} />
      <ItemModal isOpen={activeModal === "item"} onClose={handleCloseModal} />
      <LocationModal
        isOpen={activeModal === "location"}
        onClose={handleCloseModal}
      />
      <MonsterModal
        isOpen={activeModal === "monster"}
        onClose={handleCloseModal}
      />
      <NpcModal isOpen={activeModal === "npc"} onClose={handleCloseModal} />
    </div>
  );
}
