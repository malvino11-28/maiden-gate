import { CalendarDays, Gem, MapPin, Skull, Users } from "lucide-react";

export const elementForms = {
  localizacao: {
    label: "Nova Localização",
    icon: MapPin,
    color: "from-emerald-500/20 to-teal-600/20",
    iconColor: "text-emerald-400",
    fields: [
      {
        name: "nome",
        label: "Nome",
        placeholder: "Ex: Torre de Valdris",
        type: "text",
      },
      {
        name: "tipo",
        label: "Tipo",
        placeholder: "Ex: Cidade, Ruína, Masmorra...",
        type: "text",
      },
      {
        name: "regiao",
        label: "Região",
        placeholder: "Onde fica no mapa?",
        type: "text",
      },
      {
        name: "descricao",
        label: "Descrição",
        placeholder: "História, detalhes e atmosfera do local...",
        type: "textarea",
      },
    ],
  },

  npc: {
    label: "Novo NPC",
    icon: Users,
    color: "from-violet-500/20 to-purple-600/20",
    iconColor: "text-violet-400",
    fields: [
      {
        name: "nome",
        label: "Nome",
        placeholder: "Nome do personagem",
        type: "text",
      },
      {
        name: "raca",
        label: "Raça / Espécie",
        placeholder: "Ex: Humano, Oculto, Manifesto...",
        type: "text",
      },
      {
        name: "ocupacao",
        label: "Ocupação",
        placeholder: "Ex: Mercador, Guarda, Sacerdote...",
        type: "text",
      },
      {
        name: "personalidade",
        label: "Personalidade",
        placeholder: "Traços, motivações e comportamento...",
        type: "textarea",
      },
      {
        name: "segredo",
        label: "Segredo",
        placeholder: "O que esse NPC esconde?",
        type: "textarea",
      },
    ],
  },

  monstro: {
    label: "Novo Monstro",
    icon: Skull,
    color: "from-rose-500/20 to-red-700/20",
    iconColor: "text-rose-400",
    fields: [
      {
        name: "nome",
        label: "Nome",
        placeholder: "Nome da criatura",
        type: "text",
      },
      {
        name: "tipo",
        label: "Tipo",
        placeholder: "Ex: Besta, Morto-vivo, Constructo...",
        type: "text",
      },
      {
        name: "ameaca",
        label: "Nível de Ameaça",
        placeholder: "Ex: 3, 5, Alto, Médio...",
        type: "text",
      },
      {
        name: "habilidades",
        label: "Habilidades Especiais",
        placeholder: "Ex: Veneno, regeneração, invisibilidade...",
        type: "text",
      },
      {
        name: "descricao",
        label: "Descrição",
        placeholder: "Aparência, origem e comportamento...",
        type: "textarea",
      },
    ],
  },

  item: {
    label: "Novo Item",
    icon: Gem,
    color: "from-sky-500/20 to-cyan-600/20",
    iconColor: "text-sky-400",
    fields: [
      {
        name: "nome",
        label: "Nome",
        placeholder: "Nome do item",
        type: "text",
      },
      {
        name: "tipo",
        label: "Tipo",
        placeholder: "Ex: Arma, Poção, Artefato...",
        type: "text",
      },
      {
        name: "descricao",
        label: "Descrição",
        placeholder: "Efeito, história ou importância do item...",
        type: "textarea",
      },
    ],
  },

  evento: {
    label: "Novo Evento",
    icon: CalendarDays,
    color: "from-orange-500/20 to-amber-600/20",
    iconColor: "text-orange-400",
    fields: [
      {
        name: "titulo",
        label: "Título",
        placeholder: "Nome do evento",
        type: "text",
      },
      {
        name: "cronologia",
        label: "Cronologia",
        placeholder: "Ex: 300 anos atrás, Sessão 1...",
        type: "text",
      },
      {
        name: "data",
        label: "Data do Evento",
        placeholder: "Ex: Ano 3 da Era das Cinzas",
        type: "text",
      },
      {
        name: "descricao",
        label: "Descrição",
        placeholder: "O que aconteceu nesse evento?",
        type: "textarea",
      },
    ],
  },
} as const;

export type ElementFormKey = keyof typeof elementForms;
