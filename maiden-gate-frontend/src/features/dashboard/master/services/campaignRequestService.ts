import api from "../../../../services/api";

export type CampaignRequestApi = {
  id: number;
  status: "pending" | "accepted" | "rejected";
  user: {
    id: number;
    name: string;
  };
  campaign: {
    id: number;
    name: string;
  };
  character: {
    id: number;
    name: string;
    surname: string | null;
  } | null;
};

export async function getMasterCampaignRequests(userId: number) {
  const response = await api.get<CampaignRequestApi[]>(
    `/users/${userId}/campaign-requests`,
  );

  return response.data;
}

export async function acceptCampaignRequest(requestId: number) {
  const response = await api.patch(`/campaign-requests/${requestId}/accept`);

  return response.data;
}

export async function rejectCampaignRequest(requestId: number) {
  const response = await api.patch(`/campaign-requests/${requestId}/reject`);

  return response.data;
}
