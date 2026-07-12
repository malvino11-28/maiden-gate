import api from "../../../services/api";

import type { PlayerCharacterSummary } from "../player/types/player";

function getMarcaColor(marca?: string | null) {
  const colors: Record<string, string> = {
    Manifesto: "from-amber-500 to-yellow-700",
    Oculto: "from-violet-700 to-slate-950",
    Respiração: "from-cyan-500 to-blue-700",
    Entoadora: "from-rose-400 to-pink-700",
    Maso: "from-red-600 to-orange-800",
  };

  return colors[marca ?? ""] ?? "from-slate-700 to-slate-700";
}

export async function getPlayerCharacters(
  userId: number,
): Promise<PlayerCharacterSummary[]> {
  const response = await api.get(`/users/${userId}/characters`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return response.data.map((character: any) => ({
    id: character.id,
    nome: character.name,
    sobrenome: "",
    marca: character.marca?.name ?? "Manifesto",
    nivel: character.level ?? 1,
    hp: character.hp_current ?? 0,
    hpMax: character.hp_max ?? 1,
    campanha: character.campaign?.name ?? "Sem campanha",
    marcaCor: getMarcaColor(character.marca?.name),
    iconImage: character.icon_image ?? null,
    fullImage: character.full_image ?? null,
  }));
}
