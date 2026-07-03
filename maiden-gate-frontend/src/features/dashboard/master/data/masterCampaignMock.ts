import type { MasterCampaign } from "../types/masterCampaign";

export const masterCampaignData: Record<string, MasterCampaign> = {
  "1": {
    id: "1",
    nome: "A Flor do Abismo",
    status: "ativa",
    sessoes: 12,
    ultimaSessao: "22 Jun 2026",
    localizacaoAtual: {
      nome: "Torre de Valdris",
      tipo: "Ruína",
      descricao:
        "Uma torre de pedra antiga no coração da Floresta Sombria. Seus corredores guardam segredos da Era das Cinzas. O grupo está no terceiro andar — ecos de magia ainda pulsam nas paredes.",
    },
    membros: [
      {
        nome: "Kael Sondra",
        personagem: "Lirien Respiração",
        marca: "Respiração",
        emoji: "🌬️",
        nivel: 7,
        hp: 58,
        hpMax: 72,
        atributos: [
          { nome: "POD", valor: 12, mod: 1 },
          { nome: "DES", valor: 16, mod: 3 },
          { nome: "RES", valor: 14, mod: 2 },
          { nome: "INT", valor: 18, mod: 4 },
          { nome: "DET", valor: 13, mod: 1 },
          { nome: "PRE", valor: 10, mod: 0 },
        ],
        habilidades: [
          { nome: "Corrente Cortante", tipo: "Ativa" },
          { nome: "Passo do Vendaval", tipo: "Ativa" },
          { nome: "Ritmo da Respiração", tipo: "Passiva" },
        ],
      },
      {
        nome: "Mira Fael",
        personagem: "Brann Maso",
        marca: "Maso",
        emoji: "🩸",
        nivel: 6,
        hp: 62,
        hpMax: 68,
        atributos: [
          { nome: "POD", valor: 18, mod: 4 },
          { nome: "DES", valor: 12, mod: 1 },
          { nome: "RES", valor: 16, mod: 3 },
          { nome: "INT", valor: 10, mod: 0 },
          { nome: "DET", valor: 11, mod: 0 },
          { nome: "PRE", valor: 8, mod: -1 },
        ],
        habilidades: [
          { nome: "Golpe de Sangue", tipo: "Ativa" },
          { nome: "Fúria Cicatriz", tipo: "Ativa" },
          { nome: "Resiliência Maso", tipo: "Passiva" },
        ],
      },
      {
        nome: "Toren Val",
        personagem: "Seryn Oculto",
        marca: "Oculto",
        emoji: "🌒",
        nivel: 7,
        hp: 50,
        hpMax: 60,
        atributos: [
          { nome: "POD", valor: 10, mod: 0 },
          { nome: "DES", valor: 18, mod: 4 },
          { nome: "RES", valor: 12, mod: 1 },
          { nome: "INT", valor: 15, mod: 2 },
          { nome: "DET", valor: 16, mod: 3 },
          { nome: "PRE", valor: 13, mod: 1 },
        ],
        habilidades: [
          { nome: "Passo das Sombras", tipo: "Ativa" },
          { nome: "Visão Oculta", tipo: "Passiva" },
          { nome: "Lâmina Noturna", tipo: "Ativa" },
        ],
      },
    ],
    elementos: {
      localizacoes: [
        {
          nome: "Torre de Valdris",
          tipo: "Ruína",
          regiao: "Floresta Sombria",
          descricao:
            "Torre ancestral repleta de magia residual da Era das Cinzas. Três andares exploráveis e um porão selado.",
        },
        {
          nome: "Vila de Arenhal",
          tipo: "Cidade",
          regiao: "Planícies do Norte",
          descricao:
            "Pequena vila que serve de base. Taberna, forja e um templo abandonado.",
        },
        {
          nome: "Caverna das Lágrimas",
          tipo: "Masmorra",
          regiao: "Montanhas Cinzentas",
          descricao:
            "Local selado por uma ordem antiga. Rumores de tesouro e perigo extremo.",
        },
      ],
      npcs: [
        {
          nome: "Eryn, o Taberneiro",
          raca: "Humano",
          ocupacao: "Comerciante",
          personalidade:
            "Alegre e curioso. Coleciona histórias de aventureiros.",
          segredo: "Antigo espião da guarda real, aposentado há 20 anos.",
        },
        {
          nome: "Mira das Chamas",
          raca: "Humana",
          ocupacao: "Ferreira",
          personalidade: "Séria e direta. Confia em quem trabalha duro.",
          segredo: "Fabricou a arma usada no assassinato de um nobre local.",
        },
      ],
      monstros: [
        {
          nome: "Golem de Cristal",
          tipo: "Constructo",
          ameaca: "5 (alto)",
          habilidades: "Imune a perfurante. Reflexo de cristal.",
          descricao:
            "Guardião construído por Valdris para proteger o quarto andar.",
        },
        {
          nome: "Sombra Anciã",
          tipo: "Morto-vivo",
          ameaca: "4 (médio)",
          habilidades: "Incorporal. Drenar vida.",
          descricao:
            "Resíduo consciente de um mago que morreu dentro da torre.",
        },
      ],
      itens: [
        {
          nome: "Fragmento do Núcleo",
          tipo: "Artefato",
          descricao:
            "Fragmento pulsante do Abismo. Seu propósito ainda é desconhecido.",
        },
        {
          nome: "Tônica de Clareza",
          tipo: "Consumível",
          descricao: "Remove confusão e efeitos mentais leves.",
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
          titulo: "Chegada em Arenhal",
          cronologia: "Sessão 1",
          data: "14 Jun 2026",
          descricao:
            "Os aventureiros se encontram e aceitam investigar a torre.",
        },
      ],
    },
    notas:
      "Sessão 13 planejada: o grupo deve chegar ao 4º andar e enfrentar o Golem. Lord Serath mandou espiões para Arenhal. Revelar na sessão 14.",
  },

  "2": {
    id: "2",
    nome: "Crônicas de Vareth",
    status: "pausada",
    sessoes: 7,
    ultimaSessao: "10 Mai 2026",
    localizacaoAtual: {
      nome: "Porto de Vareth",
      tipo: "Cidade Portuária",
      descricao:
        "Porto movimentado às margens do Mar Cinzento. A campanha está pausada aqui.",
    },
    membros: [],
    elementos: {
      localizacoes: [],
      npcs: [],
      monstros: [],
      itens: [],
      eventos: [],
    },
    notas:
      "Campanha pausada. Retomar quando o grupo confirmar disponibilidade.",
  },

  "3": {
    id: "3",
    nome: "O Despertar da Donzela",
    status: "encerrada",
    sessoes: 20,
    ultimaSessao: "03 Jan 2026",
    localizacaoAtual: {
      nome: "Templo da Donzela",
      tipo: "Templo",
      descricao: "Local do confronto final da campanha. Encerrada com sucesso.",
    },
    membros: [],
    elementos: {
      localizacoes: [],
      npcs: [],
      monstros: [],
      itens: [],
      eventos: [],
    },
    notas: "Campanha concluída. Todos os arcos narrativos foram resolvidos.",
  },
};
