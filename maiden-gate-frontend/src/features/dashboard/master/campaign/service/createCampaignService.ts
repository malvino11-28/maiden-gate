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
  locations: CampaignData["locations"];
  npcs: CampaignData["npcs"];
  monsters: CampaignData["monsters"];
  items: CampaignData["items"];
  events: CampaignData["events"];
};

function appendImage(
  formData: FormData,
  key: string,
  image: string | File | null | undefined,
) {
  if (image instanceof File) {
    formData.append(key, image);
    return;
  }

  if (image) {
    formData.append(key, image);
  }
}

export async function createCampaign(data: CreateCampaignData) {
  const formData = new FormData();

  formData.append("master_id", String(data.master_id));
  formData.append("name", data.name);
  formData.append("description", data.description ?? "");
  formData.append("recommended_level", data.recommended_level);
  formData.append("players", data.players ?? "");
  formData.append("status", data.status);
  formData.append("notes", data.notes ?? "");

  appendImage(formData, "image", data.image);

  data.locations.forEach((location, index) => {
    appendImage(formData, `locations[${index}][image]`, location.image);

    formData.append(`locations[${index}][name]`, location.name);
    formData.append(`locations[${index}][type]`, location.type ?? "");
    formData.append(`locations[${index}][region]`, location.region ?? "");
    formData.append(
      `locations[${index}][description]`,
      location.description ?? "",
    );
  });

  data.npcs.forEach((npc, index) => {
    appendImage(formData, `npcs[${index}][image]`, npc.image);

    formData.append(`npcs[${index}][name]`, npc.name);
    formData.append(`npcs[${index}][marca_id]`, npc.marca_id ?? "");
    formData.append(`npcs[${index}][race]`, npc.race ?? "");
    formData.append(`npcs[${index}][occupation]`, npc.occupation ?? "");
    formData.append(`npcs[${index}][personality]`, npc.personality ?? "");
    formData.append(`npcs[${index}][secret]`, npc.secret ?? "");
    formData.append(`npcs[${index}][description]`, npc.description ?? "");

    npc.skills.forEach((skill, skillIndex) => {
      formData.append(`npcs[${index}][skills][${skillIndex}]`, skill);
    });

    Object.entries(npc.stats).forEach(([key, value]) => {
      formData.append(`npcs[${index}][stats][${key}]`, String(value));
    });
  });

  data.monsters.forEach((monster, index) => {
    if (monster.image instanceof File) {
      formData.append(`monsters[${index}][image]`, monster.image);
    }

    formData.append(`monsters[${index}][name]`, monster.name);
    formData.append(`monsters[${index}][type]`, monster.type ?? "");
    formData.append(`monsters[${index}][threat]`, monster.threat ?? "");
    formData.append(
      `monsters[${index}][description]`,
      monster.description ?? "",
    );

    monster.skills.forEach((skill, skillIndex) => {
      formData.append(`monsters[${index}][skills][${skillIndex}]`, skill);
    });

    Object.entries(monster.stats).forEach(([key, value]) => {
      formData.append(`monsters[${index}][stats][${key}]`, String(value));
    });
  });

  data.items.forEach((item, index) => {
    formData.append(`items[${index}][name]`, item.name);
    formData.append(`items[${index}][type]`, item.type ?? "");
    formData.append(`items[${index}][description]`, item.description ?? "");
  });

  data.events.forEach((event, index) => {
    formData.append(`events[${index}][title]`, event.title);
    formData.append(`events[${index}][chronology]`, event.chronology ?? "");
    formData.append(`events[${index}][date]`, event.date ?? "");
    formData.append(`events[${index}][description]`, event.description ?? "");
  });

  const response = await api.post("/campaigns", formData);

  return response.data;
}
