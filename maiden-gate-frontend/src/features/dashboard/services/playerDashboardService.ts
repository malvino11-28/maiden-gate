/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../../../services/api";

import type {
  AvailableCampaign,
  CampaignStatus,
  CharacterMark,
  PlayerCampaignSummary,
  PlayerCharacterSummary,
} from "../player/types/player";

function getMarcaColor(marca?: string | null) {
  const colors: Record<string, string> = {
    Manifesto: "from-amber-500 to-yellow-700",
    Oculto: "from-violet-700 to-slate-950",
    Respiração: "from-cyan-500 to-blue-700",
    Entoadora: "from-rose-400 to-pink-700",
    Maso: "from-red-600 to-orange-800",
  };

  return colors[marca ?? ""] ?? "from-slate-700 to-slate-700";
}

function getMarcaName(marca: any): CharacterMark {
  const name = marca?.name ?? marca?.nome ?? marca ?? "Manifesto";

  if (
    ["Manifesto", "Oculto", "Respiração", "Entoadora", "Maso"].includes(name)
  ) {
    return name as CharacterMark;
  }

  return "Manifesto";
}

function getNextSessionLabel(sessions?: any[]) {
  if (!sessions || sessions.length === 0) return "—";

  const nextSession = [...sessions]
    .filter((session) => session.status !== "cancelado")
    .sort((a, b) => {
      const first = `${a.date ?? "9999-12-31"} ${a.time ?? "23:59"}`;
      const second = `${b.date ?? "9999-12-31"} ${b.time ?? "23:59"}`;
      return first.localeCompare(second);
    })[0];

  if (!nextSession?.date) return "—";

  const time = nextSession.time
    ? ` às ${String(nextSession.time).slice(0, 5)}`
    : "";
  return `${nextSession.date}${time}`;
}

function getCampaignStatus(status?: string | null): CampaignStatus {
  if (status === "pausada" || status === "encerrada") return status;
  return "ativa";
}

function getCharacterFullName(character: any) {
  if (!character) return "Não vinculado";

  return (
    [character.name, character.surname].filter(Boolean).join(" ") ||
    "Não vinculado"
  );
}

function getMaxPlayers(players?: string | null) {
  if (!players) return null;

  const numbers = players.match(/\d+/g)?.map(Number) ?? [];
  if (numbers.length === 0) return null;

  return Math.max(...numbers);
}

function getVacancies(campaign: any) {
  const maxPlayers = getMaxPlayers(campaign.players);
  const acceptedPlayers =
    campaign.accepted_users_count ?? campaign.users_count ?? 0;

  if (!maxPlayers) return campaign.vagas ?? 0;

  return Math.max(maxPlayers - acceptedPlayers, 0);
}

export async function getPlayerCharacters(
  userId: number,
): Promise<PlayerCharacterSummary[]> {
  const response = await api.get(`/users/${userId}/characters`);

  return response.data.map((character: any) => {
    const marca = getMarcaName(character.marca);

    return {
      id: character.id,
      nome: character.name,
      sobrenome: character.surname ?? "",
      marca,
      nivel: character.level ?? 1,
      hp: character.hp_current ?? 0,
      hpMax: character.hp_max ?? 1,
      campanha: character.campaign?.name ?? "Sem campanha",
      marcaCor: getMarcaColor(marca),
      marcaEmoji: character.marca?.emoji ?? character.marcaEmoji ?? "✦",
      iconImage: character.icon_image ?? null,
      fullImage: character.full_image ?? null,
    };
  });
}

export async function getPlayerCampaigns(
  userId: number,
): Promise<PlayerCampaignSummary[]> {
  const response = await api.get(`/users/${userId}/player-campaigns`);

  return response.data.map((campaign: any) => {
    const playerCharacter =
      campaign.characters?.[0] ?? campaign.pivot?.character ?? null;

    return {
      id: campaign.id,
      campanha: campaign.name ?? "Campanha sem nome",
      mestre: campaign.master?.name ?? "Mestre não informado",
      proximaSessao: getNextSessionLabel(campaign.sessions),
      status: getCampaignStatus(campaign.status),
      personagem: getCharacterFullName(playerCharacter),
    };
  });
}

export async function getAvailableCampaigns(
  userId: number,
): Promise<AvailableCampaign[]> {
  const response = await api.get("/campaigns/available", {
    params: { user_id: userId },
  });

  return response.data.map((campaign: any) => ({
    id: campaign.id,
    campanha: campaign.name ?? "Campanha sem nome",
    mestre: campaign.master?.name ?? "Mestre não informado",
    vagas: getVacancies(campaign),
    nivel: campaign.recommended_level ?? "Não informado",
    proximaSessao: getNextSessionLabel(campaign.sessions),
    marca: campaign.required_mark ?? campaign.marca ?? "Qualquer",
  }));
}

export async function requestCampaignEntry(campaignId: number, userId: number) {
  const response = await api.post(`/campaigns/${campaignId}/join-request`, {
    user_id: userId,
  });

  return response.data;
}
