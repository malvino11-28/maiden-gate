import api from "../../../services/api";

export type DiceType = 4 | 6 | 8 | 10 | 12 | 20 | 100;
export type DiceAuthorType = "master" | "player";

export type DiceRollEntry = {
  id: number;
  dado: DiceType;
  quantidade: number;
  modificador: number;
  resultados: number[];
  total: number;
  critico: boolean;
  falha: boolean;
  hora: string;
  autor: string;
  tipoAutor: DiceAuthorType;
};

type ApiDiceRoll = {
  id: number;
  dice: DiceType;
  quantity: number;
  modifier: number;
  results: number[] | string;
  total: number;
  critical: boolean;
  failure: boolean;
  author_name: string;
  author_type: DiceAuthorType;
  created_at?: string;
};

type CreateDiceRollData = {
  user_id?: number | null;
  character_id?: number | null;
  author_name: string;
  author_type: DiceAuthorType;
  dice: DiceType;
  quantity: number;
  modifier: number;
};

function parseResults(results: ApiDiceRoll["results"]) {
  if (Array.isArray(results)) {
    return results.map(Number);
  }

  try {
    const parsed = JSON.parse(results);
    return Array.isArray(parsed) ? parsed.map(Number) : [];
  } catch {
    return [];
  }
}

function formatRollTime(createdAt?: string) {
  if (!createdAt) {
    return new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return new Date(createdAt).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function mapDiceRoll(roll: ApiDiceRoll): DiceRollEntry {
  return {
    id: roll.id,
    dado: roll.dice,
    quantidade: roll.quantity,
    modificador: roll.modifier,
    resultados: parseResults(roll.results),
    total: roll.total,
    critico: Boolean(roll.critical),
    falha: Boolean(roll.failure),
    hora: formatRollTime(roll.created_at),
    autor: roll.author_name,
    tipoAutor: roll.author_type,
  };
}

export async function getCampaignDiceRolls(campaignId: number | string) {
  const response = await api.get<ApiDiceRoll[]>(
    `/campaigns/${campaignId}/dice-rolls`,
  );

  return response.data.map(mapDiceRoll);
}

export async function createCampaignDiceRoll(
  campaignId: number | string,
  data: CreateDiceRollData,
) {
  const response = await api.post<ApiDiceRoll>(
    `/campaigns/${campaignId}/dice-rolls`,
    data,
  );

  return mapDiceRoll(response.data);
}

export async function clearDiceRollHistory(
  campaignId: number | string,
  userId: number | string,
) {
  const response = await api.delete(`/campaigns/${campaignId}/dice-rolls`, {
    data: {
      user_id: userId,
    },
  });

  return response.data;
}
