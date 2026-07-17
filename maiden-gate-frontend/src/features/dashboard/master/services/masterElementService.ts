import api from "../../../../services/api";

export type CampaignCollectionOption = {
  id: number;
  name: string;
  description?: string | null;
  color?: string | null;
};

export type CreateCollectionData = {
  name: string;
  description?: string | null;
  color?: string | null;
};

type CreateLocationData = {
  collection_id?: number | null;
  image: File | null;
  name: string;
  type: string;
  description: string;
};

export type CreateLoreEventData = {
  collection_id?: number | null;
  title: string;
  description: string;
  chronology: string;
  date?: string | null;
};

export type CreateItemData = {
  collection_id?: number | null;
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
  collection_id?: number | null;
  image: File | null;
  name: string;
  threat?: string | null;
  type?: string | null;
  description: string;
  skills: string[];
  status: StatusData;
};

export type CreateNpcData = {
  collection_id?: number | null;
  image: File | null;
  name: string;
  race?: string | null;
  brand?: string | null;
  occupation?: string | null;
  personality?: string | null;
  secret?: string | null;
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

export type CreateSkillData = {
  campaign_id: number;
  collection_id?: number | null;
  marca_id?: number | null;
  name: string;
  description?: string | null;
  type: "ativa" | "passiva" | "penalidade" | "campanha";
  branch?: "ofensivo" | "suporte" | "destreza" | "passivas" | "penalidade" | "campanha";
  unlock_level?: number;
  resource_cost?: number;
  range?: string | null;
};

export type TransferElementOption = {
  id: number;
  name: string;
  type: string;
  elementType: "location" | "npc" | "monster" | "item" | "event";
};


export async function getCampaignCollections(
  campaignId: string | number,
): Promise<CampaignCollectionOption[]> {
  if (!campaignId) return [];

  const response = await api.get(`/campaigns/${campaignId}/collections`);

  return response.data;
}

export async function createCampaignCollection(
  campaignId: number,
  data: CreateCollectionData,
) {
  const response = await api.post(`/campaigns/${campaignId}/collections`, data);

  return response.data;
}

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

  if (data.collection_id) {
    formData.append("collection_id", String(data.collection_id));
  }

  formData.append("name", data.name);
  formData.append("description", data.description);

  formData.append("type", data.type ?? "");
  formData.append("threat", data.threat ?? "");

  data.skills.forEach((skill) => {
    formData.append("skills[]", skill);
  });

  Object.entries(data.status).forEach(([key, value]) => {
    formData.append(`stats[${key}]`, String(value));
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

  if (data.collection_id) {
    formData.append("collection_id", String(data.collection_id));
  }

  formData.append("name", data.name);
  formData.append("description", data.description);

  formData.append("race", data.race ?? "");
  formData.append("occupation", data.occupation ?? "");
  formData.append("personality", data.personality ?? "");
  formData.append("secret", data.secret ?? "");

  if (data.brand) {
    formData.append("brand", data.brand);
  }

  data.skills.forEach((skill) => {
    formData.append("skills[]", skill);
  });

  Object.entries(data.status).forEach(([key, value]) => {
    formData.append(`stats[${key}]`, String(value));
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

  if (data.collection_id) {
    formData.append("collection_id", String(data.collection_id));
  }

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


export async function createSkill(data: CreateSkillData) {
  const response = await api.post("/skills", data);

  return response.data;
}

export async function getCampaignElementsForTransfer(
  campaignId: string | number,
): Promise<TransferElementOption[]> {
  const response = await api.get(`/campaigns/${campaignId}/master-view`);
  const data = response.data;

  const normalize = (
    items: any[] = [],
    type: string,
    elementType: TransferElementOption["elementType"],
    nameKey = "name",
  ): TransferElementOption[] =>
    items.map((item) => ({
      id: Number(item.id),
      name: item[nameKey] ?? item.name ?? item.title ?? "Elemento sem nome",
      type,
      elementType,
    }));

  return [
    ...normalize(data.locations ?? [], "Localização", "location"),
    ...normalize(data.npcs ?? [], "NPC", "npc"),
    ...normalize(data.bestiary ?? [], "Monstro", "monster"),
    ...normalize(data.items ?? [], "Item", "item"),
    ...normalize(data.lore_events ?? data.loreEvents ?? [], "Evento", "event", "title"),
  ];
}

export async function updateCampaignElementVisibility(
  elementType: string,
  elementId: string | number,
  visibleToPlayers: boolean,
) {
  const response = await api.patch(
    `/campaign-elements/${elementType}/${elementId}/visibility`,
    {
      visible_to_players: visibleToPlayers,
    },
  );

  return response.data;
}


export async function updateCampaignElementCollection(
  elementType: string,
  elementId: string | number,
  collectionId: string | number | null,
) {
  const response = await api.patch(
    `/campaign-elements/${elementType}/${elementId}/collection`,
    {
      collection_id: collectionId ? Number(collectionId) : null,
    },
  );

  return response.data;
}
