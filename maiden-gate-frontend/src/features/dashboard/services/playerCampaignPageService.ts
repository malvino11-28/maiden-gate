/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../../../services/api";

import type {
  AttributeKey,
  CharacterMark,
  CharacterSkill,
  PlayerCampaignData,
  PlayerCampaignElementItem,
  PlayerCampaignSessionStatus,
} from "../player/types/player";
import { getMarkVisualMeta } from "./characterCreationService";

const validMarks: CharacterMark[] = [
  "Manifesto",
  "Oculto",
  "Respiração",
  "Entoadora",
  "Maso",
];

function normalizeMarkName(mark?: any): CharacterMark {
  const name = mark?.name ?? mark?.nome ?? mark ?? "Manifesto";

  if (validMarks.includes(name as CharacterMark)) {
    return name as CharacterMark;
  }

  return "Manifesto";
}

function getImage(image?: string | null) {
  return image ?? null;
}

function getString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function getNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getAttributeMod(value: number) {
  return Math.floor((value - 10) / 2);
}

function getSkillType(type?: string | null): CharacterSkill["tipo"] {
  if (type === "passiva") return "Passiva";
  if (type === "reacao" || type === "reação") return "Reação";
  return "Ativa";
}

function getSkillsText(skills: unknown) {
  if (!skills) return "";

  if (typeof skills === "string") return skills;

  if (Array.isArray(skills)) {
    return skills.filter(Boolean).join(" | ");
  }

  if (typeof skills === "object") {
    return Object.values(skills as Record<string, unknown>)
      .filter(Boolean)
      .join(" | ");
  }

  return "";
}

function getInventoryItem(entry: any) {
  const item = entry.item ?? entry;

  return {
    id: Number(entry.id),
    inventoryId: Number(entry.id),
    itemId: Number(entry.item_id ?? item.id),
    nome: item.name ?? item.nome ?? "Item sem nome",
    tipo: item.type ?? item.tipo ?? "Misc",
    quantidade: getNumber(entry.quantity ?? entry.quantidade, 1),
    descricao: item.description ?? item.descricao ?? "",
  };
}

function mapCampaignItem(item: any): PlayerCampaignElementItem {
  return {
    id: Number(item.id),
    nome: item.name ?? item.nome ?? "Item sem nome",
    tipo: item.type ?? item.tipo ?? "Misc",
    descricao: item.description ?? item.descricao ?? "",
  };
}

function findPlayerCharacter(characters: any[], userId: number) {
  return (
    characters.find(
      (character) => Number(character.user_id) === Number(userId),
    ) ??
    characters[0] ??
    null
  );
}

function mapCharacter(character: any, campaignName: string) {
  const mark = normalizeMarkName(character?.marca);
  const markMeta = getMarkVisualMeta(mark);

  const attributes: Array<{ key: AttributeKey; nome: string; valor: number }> =
    [
      { key: "POD", nome: "POD", valor: getNumber(character?.pod, 0) },
      { key: "DES", nome: "DES", valor: getNumber(character?.des, 0) },
      { key: "RES", nome: "RES", valor: getNumber(character?.res, 0) },
      { key: "INT", nome: "INT", valor: getNumber(character?.int, 0) },
      { key: "DET", nome: "DET", valor: getNumber(character?.det, 0) },
      { key: "PRE", nome: "PRE", valor: getNumber(character?.pre, 0) },
    ];

  const skills = (character?.skills ?? [])
    .filter((skill: any) => skill?.pivot?.equipped ?? true)
    .map((skill: any) => ({
      id: String(skill.id),
      nome: skill.name ?? skill.nome ?? "Habilidade sem nome",
      descricao: skill.description ?? skill.descricao ?? "Sem descrição.",
      tipo: getSkillType(skill.type ?? skill.tipo),
    }));

  return {
    id: Number(character?.id ?? 0),
    nome: character?.name ?? "Personagem",
    sobrenome: character?.surname ?? "",
    marca: mark,
    marcaId: character?.marca_id ? Number(character.marca_id) : undefined,
    campaignId: character?.campaign_id ? Number(character.campaign_id) : null,
    nivel: getNumber(character?.level, 1),
    hp: getNumber(character?.hp_current, 0),
    hpMax: getNumber(character?.hp_max, 1),
    campanha: campaignName,
    marcaCor: markMeta.gradiente.replaceAll("/30", ""),
    marcaEmoji: markMeta.emoji,
    iconImage: getImage(character?.icon_image ?? character?.iconImage),
    fullImage: getImage(
      character?.full_image ?? character?.fullImage ?? character?.image,
    ),
    paMax: getNumber(character?.pa_max, 0),
    prMax: getNumber(character?.pr_max, 0),
    xp: getNumber(character?.exp, 0),
    xpProximo: 1000,
    atributos: attributes.map((attribute) => ({
      nome: attribute.nome,
      valor: attribute.valor,
      mod: getAttributeMod(attribute.valor),
    })),
    habilidades: skills,
    origem: character?.origin ?? "",
    historia: character?.lore ?? "",
  };
}

export function normalizePlayerCampaignView(
  data: any,
  userId: number,
): PlayerCampaignData {
  const campaignName = data.name ?? data.nome ?? "Campanha sem nome";
  const playerCharacter = findPlayerCharacter(data.characters ?? [], userId);

  const currentLocation = data.current_location ?? data.currentLocation ?? null;
  const locations = data.locations ?? [];
  const npcs = data.npcs ?? [];
  const monsters = data.bestiary ?? data.monsters ?? [];
  const items = data.items ?? [];
  const loreEvents = data.lore_events ?? data.loreEvents ?? [];
  const sessions = data.sessions ?? [];

  const mappedCharacter = mapCharacter(playerCharacter, campaignName);

  return {
    id: String(data.id),
    nome: campaignName,
    mestre: data.master?.name ?? "Mestre não informado",
    localizacaoAtual: currentLocation
      ? {
          id: Number(currentLocation.id),
          imagem: getImage(currentLocation.image ?? currentLocation.imagem),
          nome:
            currentLocation.name ?? currentLocation.nome ?? "Sem localização",
          descricao:
            currentLocation.description ?? currentLocation.descricao ?? "",
          tipo: currentLocation.type ?? currentLocation.tipo ?? "",
          regiao: currentLocation.region ?? currentLocation.regiao ?? "",
        }
      : {
          id: 0,
          imagem: null,
          nome: "Nenhuma localização definida",
          descricao: "O mestre ainda não definiu uma localização atual.",
          tipo: "—",
          regiao: "",
        },
    membros: (data.characters ?? []).map((character: any) => {
      const mark = normalizeMarkName(character.marca);
      const user = character.user ?? {};

      return {
        id: Number(character.id),
        nome: user.name ?? "Jogador",
        personagem:
          [character.name, character.surname].filter(Boolean).join(" ") ||
          "Personagem sem nome",
        marca: mark,
        emoji: getMarkVisualMeta(mark).emoji,
        iconImage: getImage(character.icon_image ?? character.iconImage),
        nivel: getNumber(character.level, 1),
        voce: Number(character.user_id) === Number(userId),
      };
    }),
    personagem: mappedCharacter,
    inventario: (playerCharacter?.inventory ?? []).map(getInventoryItem),
    itensDaCampanha: items.map(mapCampaignItem),
    elementos: {
      localizacoes: locations.map((location: any) => ({
        id: Number(location.id),
        imagem: getImage(location.image ?? location.imagem),
        nome: location.name ?? location.nome ?? "Sem nome",
        tipo: location.type ?? location.tipo ?? "",
        regiao: location.region ?? location.regiao ?? "",
        descricao: location.description ?? location.descricao ?? "",
      })),
      npcs: npcs.map((npc: any) => ({
        id: Number(npc.id),
        imagem: getImage(npc.image ?? npc.imagem),
        nome: npc.name ?? npc.nome ?? "Sem nome",
        marca: normalizeMarkName(npc.marca),
        raca: npc.race ?? npc.raca ?? "Não informada",
        ocupacao: npc.occupation ?? npc.ocupacao ?? "",
        personalidade: npc.personality ?? npc.personalidade ?? "",
        descricao: npc.description ?? npc.descricao ?? "",
        habilidades: getSkillsText(npc.skills ?? npc.habilidades),
        status: npc.stats ?? npc.status ?? null,
        stats: npc.stats ?? npc.status ?? null,
      })),
      monstros: monsters.map((monster: any) => ({
        id: Number(monster.id),
        imagem: getImage(monster.image ?? monster.imagem),
        nome: monster.name ?? monster.nome ?? "Sem nome",
        tipo: monster.type ?? monster.tipo ?? "",
        ameaca: monster.threat ?? monster.ameaca ?? "",
        habilidades: getSkillsText(monster.skills ?? monster.habilidades),
        descricao: monster.description ?? monster.descricao ?? "",
        status: monster.stats ?? monster.status ?? null,
        stats: monster.stats ?? monster.status ?? null,
      })),
      itens: items.map(mapCampaignItem),
      eventos: loreEvents.map((event: any) => ({
        id: Number(event.id),
        titulo: event.title ?? event.titulo ?? "Sem título",
        cronologia: event.chronology ?? event.cronologia ?? "",
        data: event.event_date ?? event.date ?? event.data ?? "",
        descricao: event.description ?? event.descricao ?? "",
      })),
    },
    sessoes: sessions.map((session: any) => ({
      id: String(session.id),
      title: session.title ?? "Sessão sem título",
      date: session.date ?? "",
      time: getString(session.time, "").slice(0, 5),
      description: session.description ?? "",
      status: (session.status ?? "em_espera") as PlayerCampaignSessionStatus,
    })),
  };
}

export async function getPlayerCampaignView(
  campaignId: string | number,
  userId: number,
) {
  const response = await api.get(`/campaigns/${campaignId}/player-view`, {
    params: { user_id: userId },
  });

  return normalizePlayerCampaignView(response.data, userId);
}

export async function addInventoryItem(
  characterId: number,
  itemId: number,
  quantity: number,
) {
  const response = await api.post(`/characters/${characterId}/inventory`, {
    item_id: itemId,
    quantity,
  });

  return response.data;
}

export async function updateInventoryQuantity(
  inventoryId: number,
  quantity: number,
) {
  const response = await api.put(`/inventory/${inventoryId}`, { quantity });
  return response.data;
}

export async function deleteInventoryItem(inventoryId: number) {
  const response = await api.delete(`/inventory/${inventoryId}`);
  return response.data;
}
