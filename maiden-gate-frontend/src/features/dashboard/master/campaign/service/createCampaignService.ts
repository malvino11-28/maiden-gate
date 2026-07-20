import api from "../../../../../services/api";
import type { CampaignData } from "../types/campaign";

type CreateCampaignData = {
  master_id: number;
  name: string;
  description: string | null;
  image: string | File | null;
  recommended_level: string;
  players: string | null;
  status: "ativa" | "pausada" | "encerrada";
  notes?: string | null;
  collections: CampaignData["collections"];
  locations: CampaignData["locations"];
  npcs: CampaignData["npcs"];
  monsters: CampaignData["monsters"];
  items: CampaignData["items"];
  events: CampaignData["events"];
  skills: CampaignData["skills"];
};

function appendFile(
  formData: FormData,
  key: string,
  image: string | File | null | undefined,
) {
  if (image instanceof File) {
    formData.append(key, image);
  }
}

function serializeImage(image: string | File | null | undefined) {
  return typeof image === "string" && image ? image : null;
}

export async function createCampaign(data: CreateCampaignData) {
  const formData = new FormData();

  // todo o conteúdo textual é enviado em um único campo JSON
  // evita campanhas grandes sejam truncadas pelo limite max_input_vars do PHP
  const payload = {
    master_id: data.master_id,
    name: data.name,
    description: data.description,
    image: serializeImage(data.image),
    recommended_level: data.recommended_level,
    players: data.players,
    status: data.status,
    notes: data.notes ?? null,

    collections: data.collections.map((collection, index) => ({
      client_id: collection.clientId,
      name: collection.name,
      description: collection.description || null,
      color: collection.color || null,
      sort_order: index,
    })),

    locations: data.locations.map((location) => ({
      collection_client_id: location.collectionId || null,
      image: serializeImage(location.image),
      name: location.name,
      type: location.type || null,
      region: location.region || null,
      description: location.description || null,
    })),

    npcs: data.npcs.map((npc) => ({
      collection_client_id: npc.collectionId || null,
      image: serializeImage(npc.image),
      name: npc.name,
      marca_id: npc.marca_id || null,
      race: npc.race || null,
      occupation: npc.occupation || null,
      personality: npc.personality || null,
      secret: npc.secret || null,
      description: npc.description || null,
      skills: npc.skills,
      stats: npc.stats,
    })),

    monsters: data.monsters.map((monster) => ({
      collection_client_id: monster.collectionId || null,
      image: serializeImage(monster.image),
      name: monster.name,
      type: monster.type || null,
      threat: monster.threat || null,
      description: monster.description || null,
      skills: monster.skills,
      stats: monster.stats,
    })),

    items: data.items.map((item) => ({
      collection_client_id: item.collectionId || null,
      name: item.name,
      type: item.type || null,
      description: item.description || null,
    })),

    events: data.events.map((event) => ({
      collection_client_id: event.collectionId || null,
      title: event.title,
      chronology: event.chronology || null,
      date: event.date || null,
      description: event.description || null,
    })),

    skills: data.skills.map((skill) => ({
      collection_client_id: skill.collectionId || null,
      marca_id: skill.marca_id || null,
      name: skill.name,
      description: skill.description || null,
      type: skill.type || "campanha",
      branch: skill.branch || "campanha",
      unlock_level: Number(skill.unlock_level || 1),
      resource_cost: Number(skill.resource_cost || 0),
      range: skill.range || null,
    })),
  };

  formData.append("payload", JSON.stringify(payload));

  appendFile(formData, "image", data.image);

  data.locations.forEach((location, index) => {
    appendFile(formData, `locations[${index}][image]`, location.image);
  });

  data.npcs.forEach((npc, index) => {
    appendFile(formData, `npcs[${index}][image]`, npc.image);
  });

  data.monsters.forEach((monster, index) => {
    appendFile(formData, `monsters[${index}][image]`, monster.image);
  });

  const response = await api.post("/campaigns", formData);

  return response.data;
}
