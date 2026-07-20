/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../../../services/api";

import type {
  AttributeKey,
  CharacterMark,
  CharacterMarkOption,
  CharacterSkill as PlayerCharacterSkill,
} from "../player/types/player";

import type {
  CharacterSkill as SkillTreeSkill,
  SkillBranchKey,
  SkillTree,
  SkillType,
} from "../player/data/skillTreeMock";

import manifest from "../../../assets/images/marks/min/manifest_arv.png";
import occult from "../../../assets/images/marks/min/occult_arv.png";
import intoner from "../../../assets/images/marks/min/intoner_arv.png";
import breath from "../../../assets/images/marks/min/breath_arv.png";
import maso from "../../../assets/images/marks/min/maso_arv.png";

export type CharacterCampaignOption = {
  id: number;
  nome: string;
};

export type CreateCharacterPayload = {
  userId: number;
  campaignId: number | null;
  marcaId: number;
  nome: string;
  sobrenome: string;
  origem: string;
  historia: string;
  iconImage: File | null;
  fullImage: File | null;
  attributes: Record<AttributeKey, number>;
  equippedSkillIds: string[];
};

const validMarks: CharacterMark[] = [
  "Manifesto",
  "Oculto",
  "Respiração",
  "Entoadora",
  "Maso",
];

function normalizeMarkName(name?: string | null): CharacterMark {
  if (name && validMarks.includes(name as CharacterMark)) {
    return name as CharacterMark;
  }

  return "Manifesto";
}

export function getMarkVisualMeta(markName?: string | null) {
  const mark = normalizeMarkName(markName);

  const meta: Record<CharacterMark, Omit<CharacterMarkOption, "value">> = {
    Manifesto: {
      emoji: "⚔️",
      image: manifest,
      gradiente: "from-amber-500/25 to-orange-700/25",
      borda: "border-amber-500/50",
      texto: "text-amber-300",
      ativo:
        "border-amber-400 bg-slate-950/70 shadow-amber-500/20 ring-1 ring-amber-400/30",
      descricao: "Guerreiro da voz declarada",
    },

    Oculto: {
      emoji: "🌒",
      image: occult,
      gradiente: "from-violet-600/20 to-purple-950/30",
      borda: "border-violet-500/50",
      texto: "text-violet-300",
      ativo:
        "border-violet-300 bg-slate-950/80 shadow-violet-500/25 ring-1 ring-violet-300/35",
      descricao: "Mestre dos segredos sombrios",
    },

    Entoadora: {
      emoji: "🎶",
      image: intoner,
      gradiente: "from-rose-400/25 to-pink-700/25",
      borda: "border-rose-500/50",
      texto: "text-rose-300",
      ativo:
        "border-rose-300 bg-slate-950/70 shadow-rose-500/25 ring-1 ring-rose-300/35",
      descricao: "Tecelã de melodias arcanas",
    },

    Respiração: {
      emoji: "🌬️",
      image: breath,
      gradiente: "from-cyan-400/20 to-teal-700/25",
      borda: "border-cyan-500/50",
      texto: "text-cyan-300",
      ativo:
        "border-cyan-300 bg-slate-950/70 shadow-cyan-500/25 ring-1 ring-cyan-300/35",
      descricao: "Portador do fluxo vital",
    },

    Maso: {
      emoji: "🩸",
      image: maso,
      gradiente: "from-red-600/20 to-rose-950/30",
      borda: "border-red-500/50",
      texto: "text-red-300",
      ativo:
        "border-red-300 bg-slate-950/80 shadow-red-500/25 ring-1 ring-red-300/35",
      descricao: "Forjado pelo sacrifício",
    },
  };

  return meta[mark];
}

export async function getCharacterCampaignOptions(
  userId: number,
): Promise<CharacterCampaignOption[]> {
  const response = await api.get(`/users/${userId}/player-campaigns`);

  return response.data.map((campaign: any) => ({
    id: campaign.id,
    nome: campaign.name ?? campaign.nome ?? "Campanha sem nome",
  }));
}

export async function getCharacterMarkOptions(): Promise<
  CharacterMarkOption[]
> {
  const response = await api.get("/marcas");

  return response.data.map((mark: any) => {
    const value = normalizeMarkName(mark.name ?? mark.nome);
    const visual = getMarkVisualMeta(value);

    return {
      id: mark.id,
      value,
      ...visual,
      descricao: mark.description ?? mark.descricao ?? visual.descricao,
      image: mark.image ?? null,
    };
  });
}

function normalizeSkillType(type?: string | null): SkillType {
  if (type === "passiva" || type === "penalidade" || type === "campanha") {
    return type;
  }

  return "ativa";
}

function normalizeSkillBranch(skill: any): SkillBranchKey {
  const type = normalizeSkillType(skill.type);

  if (type === "passiva") return "passivas";
  if (type === "penalidade") return "penalidade";
  if (type === "campanha") return "campanha";

  const branch = skill.branch;

  if (
    branch === "ofensivo" ||
    branch === "suporte" ||
    branch === "destreza" ||
    branch === "passivas" ||
    branch === "penalidade" ||
    branch === "campanha"
  ) {
    return branch;
  }

  return "ofensivo";
}

function emptySkillTree(): SkillTree {
  return {
    ofensivo: [],
    suporte: [],
    destreza: [],
    passivas: [],
    penalidade: [],
    campanha: [],
  };
}

export async function getSkillsByMark(
  marcaId: number,
  campaignId?: number | null,
): Promise<SkillTree> {
  const response = await api.get("/skills", {
    params: {
      marca_id: marcaId,
      campaign_id: campaignId || undefined,
    },
  });

  const tree = emptySkillTree();

  response.data.forEach((skill: any) => {
    const type = normalizeSkillType(skill.type);
    const branch = normalizeSkillBranch(skill);

    const normalizedSkill: SkillTreeSkill = {
      id: String(skill.id),
      nome: skill.name ?? "Skill sem nome",
      descricao: skill.description ?? "Sem descrição.",
      nivel: skill.unlock_level ?? 1,
      desbloqueada: true,
      tipo: type,
      emoji:
        type === "passiva"
          ? "✦"
          : type === "penalidade"
            ? "⚠️"
            : type === "campanha"
              ? "✧"
              : "✨",
    };

    tree[branch].push(normalizedSkill);
  });

  return tree;
}

export async function deleteCharacter(characterId: string | number) {
  const response = await api.delete(`/characters/${characterId}`);

  return response.data;
}

export async function createCharacter(payload: CreateCharacterPayload) {
  const formData = new FormData();

  formData.append("user_id", String(payload.userId));
  if (payload.campaignId) {
    formData.append("campaign_id", String(payload.campaignId));
  }
  formData.append("marca_id", String(payload.marcaId));
  formData.append("name", payload.nome);
  formData.append("surname", payload.sobrenome);
  formData.append("origin", payload.origem);
  formData.append("lore", payload.historia);

  if (payload.iconImage) {
    formData.append("icon_image", payload.iconImage);
  }

  if (payload.fullImage) {
    formData.append("full_image", payload.fullImage);
  }

  formData.append("pod", String(payload.attributes.POD));
  formData.append("des", String(payload.attributes.DES));
  formData.append("res", String(payload.attributes.RES));
  formData.append("int", String(payload.attributes.INT));
  formData.append("det", String(payload.attributes.DET));
  formData.append("pre", String(payload.attributes.PRE));

  payload.equippedSkillIds.slice(0, 6).forEach((skillId, index) => {
    formData.append(`skills[${index}]`, skillId);
  });

  const response = await api.post("/characters", formData);

  return response.data;
}

export type EditableCharacterData = {
  id: number;
  nome: string;
  sobrenome: string;
  origem: string;
  historia: string;
  marca: CharacterMark;
  marcaId: number;
  campaignId: number | null;
  campanha: string;
  nivel: number;
  xp: number;
  hp: number;
  hpMax: number;
  paMax: number;
  prMax: number;
  iconImage: string | null;
  fullImage: string | null;
  attributes: Record<AttributeKey, number>;
  habilidades: PlayerCharacterSkill[];
  equippedSkillIds: string[];
};

export type UpdateCharacterPayload = {
  nome: string;
  sobrenome: string;
  origem: string;
  historia: string;
  iconImage: File | null;
  fullImage: File | null;
  hpCurrent: number;
  attributes: Record<AttributeKey, number>;
  equippedSkillIds: string[];
};

function normalizePlayerSkillType(
  type?: string | null,
): PlayerCharacterSkill["tipo"] {
  if (type === "passiva") return "Passiva";
  if (type === "reacao" || type === "reação") return "Reação";
  return "Ativa";
}

export function mapEditableCharacter(character: any): EditableCharacterData {
  const mark = normalizeMarkName(
    character?.marca?.name ?? character?.marca?.nome,
  );

  const attributes: Record<AttributeKey, number> = {
    POD: Number(character?.pod ?? 0),
    DES: Number(character?.des ?? 0),
    RES: Number(character?.res ?? 0),
    INT: Number(character?.int ?? 0),
    DET: Number(character?.det ?? 0),
    PRE: Number(character?.pre ?? 0),
  };

  const habilidades: PlayerCharacterSkill[] = (character?.skills ?? [])
    .filter((skill: any) => skill?.pivot?.equipped ?? true)
    .map((skill: any) => ({
      id: String(skill.id),
      nome: skill.name ?? skill.nome ?? "Habilidade sem nome",
      descricao: skill.description ?? skill.descricao ?? "Sem descrição.",
      tipo: normalizePlayerSkillType(skill.type ?? skill.tipo),
    }));

  return {
    id: Number(character?.id ?? 0),
    nome: character?.name ?? "",
    sobrenome: character?.surname ?? "",
    origem: character?.origin ?? "",
    historia: character?.lore ?? "",
    marca: mark,
    marcaId: Number(character?.marca_id ?? character?.marca?.id ?? 0),
    campaignId: character?.campaign_id ? Number(character.campaign_id) : null,
    campanha:
      character?.campaign?.name ?? character?.campaign?.nome ?? "Sem campanha",
    nivel: Number(character?.level ?? 1),
    xp: Number(character?.exp ?? 0),
    hp: Number(character?.hp_current ?? 0),
    hpMax: 5 + Math.max(Number(character?.hp_max ?? 1), 1),
    paMax: Number(character?.pa_max ?? 0),
    prMax: Number(character?.pr_max ?? 0),
    iconImage: character?.icon_image ?? character?.iconImage ?? null,
    fullImage:
      character?.full_image ?? character?.fullImage ?? character?.image ?? null,
    attributes,
    habilidades,
    equippedSkillIds: habilidades
      .map((skill) => skill.id)
      .filter(Boolean) as string[],
  };
}

export async function getCharacterById(characterId?: string | number) {
  const response = await api.get(`/characters/${characterId}`);
  return mapEditableCharacter(response.data);
}

export async function updateCharacter(
  characterId: string | number,
  payload: UpdateCharacterPayload,
) {
  const formData = new FormData();

  formData.append("name", payload.nome);
  formData.append("surname", payload.sobrenome);
  formData.append("origin", payload.origem);
  formData.append("lore", payload.historia);
  formData.append("hp_current", String(payload.hpCurrent));

  if (payload.iconImage) {
    formData.append("icon_image", payload.iconImage);
  }

  if (payload.fullImage) {
    formData.append("full_image", payload.fullImage);
  }

  formData.append("pod", String(payload.attributes.POD));
  formData.append("des", String(payload.attributes.DES));
  formData.append("res", String(payload.attributes.RES));
  formData.append("int", String(payload.attributes.INT));
  formData.append("det", String(payload.attributes.DET));
  formData.append("pre", String(payload.attributes.PRE));

  payload.equippedSkillIds.slice(0, 6).forEach((skillId, index) => {
    formData.append(`skills[${index}]`, skillId);
  });

  const response = await api.post(`/characters/${characterId}`, formData, {
    headers: {
      "X-HTTP-Method-Override": "PUT",
    },
  });

  return mapEditableCharacter(response.data.character ?? response.data);
}

export async function updateCharacterProgress(
  characterId: string | number,
  payload: { hpCurrent: number; exp: number },
) {
  const response = await api.put(`/characters/${characterId}`, {
    hp_current: payload.hpCurrent,
    exp: payload.exp,
  });

  return mapEditableCharacter(response.data.character ?? response.data);
}

export async function updateCharacterModifiers(
  characterId: string | number,
  modifiers: Record<AttributeKey, number>,
) {
  const response = await api.put(`/characters/${characterId}`, {
    attribute_modifiers: modifiers,
  });

  return response.data.character ?? response.data;
}
