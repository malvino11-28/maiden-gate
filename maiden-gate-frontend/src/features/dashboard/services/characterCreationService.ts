/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../../../services/api";

import type {
  AttributeKey,
  CharacterMark,
  CharacterMarkOption,
} from "../player/types/player";

import type {
  CharacterSkill as SkillTreeSkill,
  SkillBranchKey,
  SkillTree,
  SkillType,
} from "../player/data/skillTreeMock";

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
      gradiente: "from-orange-500/30 to-red-700/30",
      borda: "border-orange-500/50",
      texto: "text-orange-300",
      ativo: "border-orange-400 bg-orange-500/20 shadow-orange-500/20",
      descricao: "Guerreiro da voz declarada",
    },
    Oculto: {
      emoji: "🌒",
      gradiente: "from-violet-700/30 to-slate-800/30",
      borda: "border-violet-500/50",
      texto: "text-violet-300",
      ativo: "border-violet-400 bg-violet-500/20 shadow-violet-500/20",
      descricao: "Mestre dos segredos sombrios",
    },
    Entoadora: {
      emoji: "🎶",
      gradiente: "from-teal-500/30 to-emerald-700/30",
      borda: "border-teal-500/50",
      texto: "text-teal-300",
      ativo: "border-teal-400 bg-teal-500/20 shadow-teal-500/20",
      descricao: "Tecelã de melodias arcanas",
    },
    Respiração: {
      emoji: "🌬️",
      gradiente: "from-sky-400/30 to-cyan-600/30",
      borda: "border-sky-500/50",
      texto: "text-sky-300",
      ativo: "border-sky-400 bg-sky-500/20 shadow-sky-500/20",
      descricao: "Portador do fluxo vital",
    },
    Maso: {
      emoji: "🩸",
      gradiente: "from-rose-700/30 to-red-900/30",
      borda: "border-rose-500/50",
      texto: "text-rose-300",
      ativo: "border-rose-400 bg-rose-500/20 shadow-rose-500/20",
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
