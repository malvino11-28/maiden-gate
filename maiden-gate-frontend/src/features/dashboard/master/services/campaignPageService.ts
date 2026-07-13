import api from "../../../../services/api";

export type CampaignSessionStatus = "em_espera" | "concluido" | "cancelado";

export type CreateCampaignSessionData = {
  title: string;
  date: string;
  time: string;
  description?: string | null;
  status?: CampaignSessionStatus;
};

export type UpdateCampaignData = {
  name: string;
  description: string | null;
  image: File | null;
  recommended_level: string;
  players: string | null;
  status?: "ativa" | "pausada" | "encerrada";
};

export async function updateCampaign(
  campaignId: number,
  data: UpdateCampaignData,
) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description ?? "");
  formData.append("recommended_level", data.recommended_level);
  formData.append("players", data.players ?? "");

  if (data.status) {
    formData.append("status", data.status);
  }

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await api.post(`/campaigns/${campaignId}`, formData, {
    headers: {
      "X-HTTP-Method-Override": "PATCH", // post com override
    },
  });

  return response.data;
}
export async function deleteCampaign(campaignId: number) {
  const response = await api.delete(`/campaigns/${campaignId}`);

  return response.data;
}

export async function createCampaignSession(
  campaignId: number,
  data: CreateCampaignSessionData,
) {
  const response = await api.post(`/campaigns/${campaignId}/sessions`, data);

  return response.data;
}

export async function updateCampaignSessionStatus(
  sessionId: string,
  status: CampaignSessionStatus,
) {
  const response = await api.patch(`/campaign-sessions/${sessionId}/status`, {
    status,
  });

  return response.data;
}

export async function getMasterCampaignView(campaignId: number) {
  const response = await api.get(`/campaigns/${campaignId}/master-view`);

  return response.data;
}

export async function updateCampaignNotes(campaignId: number, notes: string) {
  const response = await api.put(`/campaigns/${campaignId}/notes`, {
    notes,
  });

  return response.data;
}

export async function updateCampaignCurrentLocation(
  campaignId: number,
  currentLocationId: number,
) {
  const response = await api.put(`/campaigns/${campaignId}/current-location`, {
    current_location_id: currentLocationId,
  });

  return response.data;
}
