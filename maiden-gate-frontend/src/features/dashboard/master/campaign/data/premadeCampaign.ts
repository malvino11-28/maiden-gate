export type PremadeLocation = {
  name: string;
  type: string;
  region: string;
  description: string;
};

export type PremadeNpc = {
  name: string;
  race: string;
  occupation: string;
  personality: string;
  secret: string;
};

export type PremadeMonster = {
  name: string;
  type: string;
  threat: string;
  skills: string;
  description: string;
};

export type PremadeItem = {
  name: string;
  type: string;
  description: string;
};

export type PremadeEvent = {
  title: string;
  chronology: string;
  date: string;
  description: string;
};

export type PremadeCampaign = {
  id: string;
  name: string;
  genre: string;
  tone: string;
  recommendedLevel: "Iniciante" | "Intermediário" | "Avançado";
  players: string;
  description: string;
  locations: PremadeLocation[];
  npcs: PremadeNpc[];
  monsters: PremadeMonster[];
  items: PremadeItem[];
  events: PremadeEvent[];
};

export const premadeCampaigns: PremadeCampaign[] = [
  {
    id: "flor-negra",
    name: "A Flor Negra",
    genre: "Mistério & Horror",
    tone: "Sombrio",
    recommendedLevel: "Intermediário",
    players: "3–5",
    description:
      "Um culto secreto dedica-se a despertar uma entidade adormecida no coração do reino. Rumores de desaparecimentos, rituais noturnos e flores negras brotando em lugares impossíveis chegam aos ouvidos dos aventureiros. O tempo é curto — a próxima lua cheia é a data marcada para o ritual final.",

    locations: [
      {
        name: "Aldeia de Mirren",
        type: "Cidade",
        region: "Vale Central",
        description:
          "Aldeia assombrada onde os primeiros desaparecimentos ocorreram. Seus habitantes vivem em medo silencioso.",
      },
      {
        name: "Catedral das Sombras",
        type: "Masmorra",
        region: "Floresta de Cinzas",
        description:
          "Ruína de uma antiga catedral convertida em templo do culto. Cheia de armadilhas e guardiões.",
      },
      {
        name: "Caverna do Primeiro Grito",
        type: "Masmorra",
        region: "Montanhas do Esquecimento",
        description:
          "Local onde a entidade foi originalmente selada. O ritual final deve acontecer aqui.",
      },
    ],

    npcs: [
      {
        name: "Lira, a Sobrevivente",
        race: "Humana",
        occupation: "Testemunha",
        personality:
          "Traumatizada mas determinada. A única que escapou de um ritual e pode guiar o grupo.",
        secret: "Foi marcada pelo culto e começa a ouvir a voz da entidade.",
      },
      {
        name: "Arquimaestro Venn",
        race: "Humano",
        occupation: "Líder do Culto",
        personality:
          "Carismático e eloquente. Acredita genuinamente que está salvando o mundo.",
        secret: "Sua filha foi a primeira vítima. Ele não consegue parar.",
      },
    ],

    monsters: [
      {
        name: "Devoto Corrompido",
        type: "Humanoide",
        threat: "2",
        skills: "Resistência a Magia Sagrada. Grito do Vazio.",
        description:
          "Membros do culto transformados pelo contato com a entidade.",
      },
      {
        name: "Sombra-Flor",
        type: "Aberração",
        threat: "5",
        skills:
          "Incorporal. Drenar Esperança: reduz d6 de um atributo por turno.",
        description:
          "Manifestação parcial da entidade adormecida. Forma de flor negra gigante com tentáculos de sombra.",
      },
    ],

    items: [
      {
        name: "Pétalas da Entidade",
        type: "Artefato",
        description:
          "Flor negra preservada que pulsa com vida própria. Causa pesadelos ao portador mas concede visões do passado.",
      },
      {
        name: "Diário de Venn",
        type: "Misc",
        description:
          "Registra toda a história do culto. Chave para entender o ritual e como revertê-lo.",
      },
    ],

    events: [
      {
        title: "Os Primeiros Desaparecimentos",
        chronology: "3 meses antes",
        date: "Início da Campanha",
        description:
          "Seis aldeões desapareceram. As autoridades ignoram. As famílias estão desesperadas.",
      },
      {
        title: "A Lua de Sangue",
        chronology: "Clímax",
        date: "Fim da Campanha",
        description:
          "A entidade desperta parcialmente se o ritual não for impedido. O mundo começa a sangrar.",
      },
    ],
  },
];
