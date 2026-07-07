import api from "../../../../services/api";

type CreateLocationData = {
  image: File | null;
  name: string;
  type: string;
  description: string;
};

export type CreateLoreEventData = {
  title: string;
  description: string;
  chronology: string;
  date?: string | null;
};

export type CreateItemData = {
  name: string;
  description: string;
  type: string;
};

export type StatusData = {
  level: number;
  hp: number;
  mana: number;
  atk: number;
  def: number;
  speed: number;
};

export type CreateMonsterData = {
  image: File | null;
  name: string;
  description: string;
  skills: string[];
  status: StatusData;
};

export type CreateNpcData = {
  image: File | null;
  name: string;
  brand?: string | null;
  description: string;
  skills: string[];
  status: StatusData;
};

export type TransferElementData = {
  origin_campaign_id: number;
  destination_campaign_id: number;
  element_id: number;
  element_type: string;
};

export async function createLoreEvent(
  campaignId: number,
  data: CreateLoreEventData,
) {
  const response = await api.post(`/campaigns/${campaignId}/lore-events`, data);

  return response.data;
}

export async function createItem(campaignId: number, data: CreateItemData) {
  const response = await api.post(`/campaigns/${campaignId}/items`, data);

  return response.data;
}

export async function createMonster(
  campaignId: number,
  data: CreateMonsterData,
) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);

  data.skills.forEach((skill) => {
    formData.append("skills[]", skill);
  });

  Object.entries(data.status).forEach(([key, value]) => {
    formData.append(`status[${key}]`, String(value));
  });

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await api.post(
    `/campaigns/${campaignId}/bestiary`,
    formData,
  );

  return response.data;
}

export async function createNpc(campaignId: number, data: CreateNpcData) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);

  if (data.brand) {
    formData.append("brand", data.brand);
  }

  data.skills.forEach((skill) => {
    formData.append("skills[]", skill);
  });

  Object.entries(data.status).forEach(([key, value]) => {
    formData.append(`status[${key}]`, String(value));
  });

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await api.post(`/campaigns/${campaignId}/npcs`, formData);

  return response.data;
}
export async function transferElement(data: TransferElementData) {
  const response = await api.post("/campaign-elements/transfer", data);

  return response.data;
}

export async function createLocation(
  campaignId: number,
  data: CreateLocationData,
) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("type", data.type);
  formData.append("description", data.description);

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await api.post(
    `/campaigns/${campaignId}/locations`,
    formData,
  );

  return response.data;
}
