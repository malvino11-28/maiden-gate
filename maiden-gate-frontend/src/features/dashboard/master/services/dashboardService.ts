import api from "../../../../services/api";

export type MasterCampaignApi = {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
  status: "ativa" | "pausada" | "encerrada";
  recommended_level: string | null;
  players: string | null;
  sessions_count?: number;
  characters_count?: number;
};

export async function getMasterCampaigns(userId: number) {
  const response = await api.get<MasterCampaignApi[]>(
    `/users/${userId}/master-campaigns`,
  );

  return response.data;
}
