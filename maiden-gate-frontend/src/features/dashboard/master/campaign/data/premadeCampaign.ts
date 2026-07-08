export type PremadeLocation = {
  name: string;
  image: string | null;
  type: string;
  region: string;
  description: string;
};

export type PremadeNpc = {
  name: string;
  image: string;
  brand: string | null;
  race: string;
  occupation: string;
  personality: string;
  secret: string;
  description: string;
  skills: string;
};

export type PremadeMonster = {
  name: string;
  image: string;
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
  image: string;
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
import flower from "../../../../../assets/images/logo.png";
export const premadeCampaigns: PremadeCampaign[] = [
  {
    id: "awakening",
    image: flower,
    name: "O Despertar da Donzela",
    genre: "Mistério & Suspense",
    tone: "Sombrio",
    recommendedLevel: "Avançado",
    players: "3–8",
    description:
      "A tensão política está a tona, o Sindicato das Sombras e a Ordem da Luz estão prestes a iniciar uma nova guerra mundial. Como protesto, Eleanor, filha da rainha do Manifesto decide revelar seu segredo para o mundo... Muitos olharam para ela como a 'mêssias', outros como um sinal do apocalipse",

    locations: [
      {
        name: "Cidade Catedral",
        image: flower,
        type: "Cidade",
        region: "Nascente da Flor",
        description:
          "Cidade ainda em construção em volta da Flor, com o castelo da família real. Residem nela apenas cidadões de alta classe.",
      },
      {
        name: "Caminho da Cidade Catedral",
        image: "",
        type: "Estrada",
        region: "Sul da Ilha da Flor",
        description:
          "Estrada estreita, cheias de montanhas em volta. Apenas pescadores e cidadões nobres passam por aqui.",
      },
      {
        name: "Songbird",
        image: "",
        type: "Cidade",
        region: "Sul da Ilha da Flor",
        description:
          "Cidade, escolas e um castelo das Entoadoras. Próximo as montanhas.",
      },
      {
        name: "Cratera",
        image: "",
        type: "Raid",
        region: "Norte da Ilha da Flor",
        description:
          "Uma grande cortina de Miasma cobre a cratera. Estranhamente, há um caminho de Miasma que leva há outra raid.",
      },
    ],

    npcs: [
      {
        name: "Eleanor, a Donzela",
        image: flower,
        brand: "Manifesto",
        race: "Humana",
        occupation: "Futura Rainha",
        personality:
          "Determinada e inconsequente. Só quer acabar com a guerra entre os dois reinos.",
        secret:
          "Possuí duas marcas, a da sua família (Manifesto) e de seus maiores inimigos (Oculto). A do Manifesto está em seu pescoço, a do Oculto está em seu ombro esquerdo.",
        description:
          "Eleanor é uma figura central da tensão política entre Manifesto e Oculto.",
        skills: "Autoridade Real. Dupla Marca. Resistência ao Miasma",
      },
      {
        name: "Vasil, o Astuto",
        image: "",
        brand: "Maso",
        race: "Maso (Pássaro)",
        occupation: "Guia da Cidade",
        personality:
          "Carismático e eloquente. Faz de tudo pelo Manifesto, mesmo que eles repudiem sua espécie.",
        secret: "É o melhor espião do Sindicato das Sombras.",
        description: "",
        skills: "",
      },
    ],

    monsters: [
      {
        name: "Bandido",
        image: flower,
        type: "Humano",
        threat: "1",
        skills: "Bomba de Fumaça. Corte Rápido.",
        description: "Bandido comum, querendo apenas roubar e ir embora.",
      },
      {
        name: "Consciência Coletiva",
        image: "",
        type: "Aberração",
        threat: "5",
        skills:
          "Incorporal. Copiar. Drenar Esperança: reduz d6 de um atributo por turno.",
        description: "Um vírus consciente. Se espalha por contato de sangue.",
      },
    ],

    items: [
      {
        name: "Fragmento de Pétala",
        type: "Artefato",
        description:
          "Um fragmento da pétala da Flor. Parece emitir um brilho fraco. Concede sorte ao portador (+5 de modificador), mas com um uso ela se desfaz.",
      },
      {
        name: "Fragmento da Raiz da Flor",
        type: "Consumível",
        description:
          "Algumas partes da raiz da Flor flutuaram até a superfície do oceano. Concede 10 de cura por nível do usuário.",
      },
    ],

    events: [
      {
        title: "O Desaparecimento de Elio",
        chronology: "3 meses antes",
        date: "Antes da Campanha",
        description:
          "O rei do Manifesto, Elio, desapareceu. Há suspeitas de que Velen esteja envolvido, atualmente está foragido.",
      },
      {
        title: "A Revelação",
        chronology: "Inicio da Campanha",
        date: "Inicio da Campanha",
        description:
          "No Festival da Flor, com todos os tipos de pessoas presentes, Eleanor sobe até o palco da cantora e revela seu ombro para o mundo...",
      },
    ],
  },
];
