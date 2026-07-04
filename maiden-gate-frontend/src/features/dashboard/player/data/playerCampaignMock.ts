import type { PlayerCampaignData } from "../types/player";

const baseCampaign: PlayerCampaignData = {
  id: "1",
  nome: "A Flor do Abismo",
  mestre: "Aldric Voss",
  localizacaoAtual: {
    nome: "Torre de Valdris",
    tipo: "Ruína",
    descricao:
      "Uma torre de pedra antiga no coração da Floresta Sombria. Seus corredores guardam segredos da Era das Cinzas. O grupo está explorando o terceiro andar, onde ecos de magia antiga ainda podem ser sentidos.",
  },
  membros: [
    {
      nome: "Kael Sondra",
      personagem: "Lirien Respiração",
      marca: "Respiração",
      emoji: "🌬️",
      nivel: 7,
      voce: true,
    },
    {
      nome: "Mira Fael",
      personagem: "Brann Maso",
      marca: "Maso",
      emoji: "🩸",
      nivel: 6,
    },
    {
      nome: "Toren Val",
      personagem: "Seryn Oculto",
      marca: "Oculto",
      emoji: "🌒",
      nivel: 7,
    },
    {
      nome: "Cael Drak",
      personagem: "Vesper Entoadora",
      marca: "Entoadora",
      emoji: "🎶",
      nivel: 5,
    },
  ],

  personagem: {
    id: 1,
    nome: "Lirien",
    sobrenome: "Respiração",
    marca: "Respiração",
    marcaEmoji: "🌬️",
    marcaCor: "from-sky-400 to-cyan-600",
    nivel: 7,
    hp: 58,
    hpMax: 72,
    paMax: 10,
    prMax: 3,
    xp: 6800,
    xpProximo: 9000,
    campanha: "A Flor do Abismo",
    origem: "Vila de Arenhal",
    historia:
      "Lirien aprendeu a controlar a própria respiração antes de entender o peso das marcas. Hoje segue a Flor do Abismo buscando respostas sobre os ecos antigos da torre.",
    atributos: [
      { nome: "POD", valor: 12, mod: 1 },
      { nome: "DES", valor: 16, mod: 3 },
      { nome: "RES", valor: 14, mod: 2 },
      { nome: "INT", valor: 18, mod: 4 },
      { nome: "DET", valor: 13, mod: 1 },
      { nome: "PRE", valor: 10, mod: 0 },
    ],
    habilidades: [
      {
        nome: "Corrente Cortante",
        descricao:
          "Condensa o fluxo da respiração em um corte veloz de vento concentrado.",
        tipo: "Ativa",
      },
      {
        nome: "Passo do Vendaval",
        descricao:
          "Move-se alguns metros sem provocar abertura contra inimigos próximos.",
        tipo: "Ativa",
      },
      {
        nome: "Ritmo da Respiração",
        descricao:
          "Passiva: recebe bônus em testes de resistência enquanto estiver consciente.",
        tipo: "Passiva",
      },
      {
        nome: "Pulso Reverso",
        descricao:
          "Reação: reduz parte do dano recebido convertendo-o em deslocamento.",
        tipo: "Reação",
      },
    ],
  },
  sessoes: [
    {
      id: "sessao-13",
      title: "Exploração do quarto andar",
      date: "2026-07-10",
      time: "20:00",
      description:
        "O grupo deve continuar a exploração da Torre de Valdris e enfrentar os perigos guardados no quarto andar.",
      status: "em_espera",
    },
    {
      id: "sessao-12",
      title: "O terceiro andar da torre",
      date: "2026-06-22",
      time: "20:00",
      description:
        "O grupo descobriu rastros de magia residual e encontrou pistas sobre o Golem de Cristal.",
      status: "concluido",
    },
  ],
  inventario: [
    {
      nome: "Foco de Respiração",
      tipo: "Catalisador",
      quantidade: 1,
      descricao: "+2 ao ataque com técnicas de Respiração.",
    },
    {
      nome: "Poção de Cura Maior",
      tipo: "Consumível",
      quantidade: 2,
      descricao: "Restaura 4d4+4 pontos de vida.",
    },
    {
      nome: "Manto Leve",
      tipo: "Armadura",
      quantidade: 1,
      descricao: "Proteção leve. Facilita movimentos rápidos.",
    },
    {
      nome: "Adaga de Obsidiana",
      tipo: "Arma",
      quantidade: 1,
      descricao: "1d4+2 perfurante. Causa sangramento em resultado crítico.",
    },
    {
      nome: "Mapa Parcial da Torre",
      tipo: "Misc",
      quantidade: 1,
      descricao:
        "Esboço incompleto dos andares superiores da Torre de Valdris.",
    },
    {
      nome: "Moedas de Ouro",
      tipo: "Moeda",
      quantidade: 240,
      descricao: "Moeda padrão do reino.",
    },
  ],
  elementos: {
    localizacoes: [
      {
        nome: "Torre de Valdris",
        tipo: "Ruína",
        regiao: "Floresta Sombria",
        descricao:
          "Torre ancestral repleta de magia residual da Era das Cinzas.",
      },
      {
        nome: "Vila de Arenhal",
        tipo: "Cidade",
        regiao: "Planícies do Norte",
        descricao:
          "Pequena vila que serve de base do grupo. Possui um taberneiro simpático e uma forja.",
      },
      {
        nome: "Caverna das Lágrimas",
        tipo: "Masmorra",
        regiao: "Montanhas Cinzentas",
        descricao:
          "Local selado por uma ordem antiga. Rumores de tesouro e perigo.",
      },
    ],
    npcs: [
      {
        nome: "Eryn, o Taberneiro",
        raca: "Humano",
        ocupacao: "Comerciante",
        personalidade: "Alegre e curioso. Coleciona histórias de aventureiros.",
      },
      {
        nome: "Mira das Chamas",
        raca: "Humana",
        ocupacao: "Ferreira",
        personalidade: "Séria e direta. Confia em quem trabalha duro.",
      },
      {
        nome: "Lord Serath",
        raca: "Humano",
        ocupacao: "Nobre Corrupto",
        personalidade:
          "Educado em público, cruel em privado. Antagonista da campanha.",
      },
    ],
    monstros: [
      {
        nome: "Golem de Cristal",
        tipo: "Constructo",
        ameaca: "5 (alto)",
        habilidades:
          "Imune a perfurante. Reflexo de cristal: devolve 1d6 dano ao atacante.",
      },
      {
        nome: "Sombra Anciã",
        tipo: "Morto-vivo",
        ameaca: "4 (médio)",
        habilidades: "Incorporal. Drenar vida: restaura HP ao acertar.",
      },
    ],
    itens: [
      {
        nome: "Fragmento do Núcleo",
        tipo: "Artefato",
        descricao:
          "Fragmento pulsante encontrado no segundo andar. Propósito desconhecido.",
      },
      {
        nome: "Tônica de Clareza",
        tipo: "Consumível",
        descricao: "Elimina efeitos de confusão e charme. Fabricada por Mira.",
      },
    ],
    eventos: [
      {
        titulo: "O Selamento da Torre",
        cronologia: "300 anos atrás",
        data: "Era das Cinzas, Ano 7",
        descricao:
          "Valdris selou a torre após um experimento falho com cristais do Abismo.",
      },
      {
        titulo: "Chegada do Grupo em Arenhal",
        cronologia: "Sessão 1",
        data: "14 Jun 2026",
        descricao:
          "Os aventureiros se encontram na vila de Arenhal e aceitam investigar a torre.",
      },
    ],
  },
};

export const playerCampaignData: Record<string, PlayerCampaignData> = {
  "1": baseCampaign,
  "2": {
    ...baseCampaign,
    id: "2",
    nome: "Véu de Cinzas",
    mestre: "Sareth Mora",
    localizacaoAtual: {
      nome: "Portão Cinzento",
      tipo: "Fortaleza",
      descricao:
        "Uma fortaleza abandonada coberta por fuligem. O grupo investiga marcas antigas deixadas por Ocultos.",
    },
    personagem: {
      ...baseCampaign.personagem,
      id: 2,
      nome: "Brann",
      sobrenome: "Maso",
      marca: "Maso",
      marcaEmoji: "🩸",
      marcaCor: "from-red-600 to-rose-800",
      nivel: 4,
      hp: 40,
      hpMax: 40,
      campanha: "Véu de Cinzas",
    },
  },
};
