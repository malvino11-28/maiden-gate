export type EffectCategory =
  | "Buffs"
  | "Debuffs"
  | "Controle"
  | "Especiais"
  | "Marcas";

export type EffectInfo = {
  name: string;
  category: EffectCategory;
  source?: string;
  description: string;
};

export const effectCatalog: EffectInfo[] = [
  {
    name: "Aumento",
    category: "Buffs",
    description: "Aumenta +2 em um ou mais atributos.",
  },
  {
    name: "Vantagem",
    category: "Buffs",
    description: "Rola duas vezes e usa o melhor resultado dos dados.",
  },
  {
    name: "Regeneração",
    category: "Buffs",
    description: "Recupera vida por turno.",
  },
  {
    name: "Recuperação",
    category: "Buffs",
    description: "Recupera vida instantaneamente.",
  },
  {
    name: "Imortalidade",
    category: "Buffs",
    description: "Ignora completamente um ataque.",
  },
  {
    name: "Provocação",
    category: "Buffs",
    description:
      "Redireciona todos os ataques para você e reduz em 2 o dano recebido por acúmulo do efeito.",
  },
  {
    name: "Purificação",
    category: "Buffs",
    description:
      "Remove debuffs atuais e torna o alvo imune a debuffs por um turno.",
  },

  {
    name: "Infecção",
    category: "Debuffs",
    description: "Impede o alvo de receber cura.",
  },
  {
    name: "Roubo",
    category: "Debuffs",
    description: "Drena 2 de vida do alvo.",
  },
  {
    name: "Redução",
    category: "Debuffs",
    description: "Reduz em 3 um ou mais atributos.",
  },
  {
    name: "Queimadura",
    category: "Debuffs",
    description: "Causa dano contínuo de fogo ou gelo por turnos.",
  },
  {
    name: "Envenenamento",
    category: "Debuffs",
    description: "Causa dano contínuo por turnos.",
  },
  {
    name: "Desvantagem",
    category: "Debuffs",
    description: "Rola duas vezes e usa o pior resultado dos dados.",
  },
  {
    name: "Intimidação",
    category: "Debuffs",
    description: "Concede Vantagem a você e Desvantagem ao adversário.",
  },

  {
    name: "Perdição",
    category: "Controle",
    description:
      "Força o alvo a atacar alvos aleatórios, incluindo aliados, determinados pelos dados.",
  },
  {
    name: "Paralisia",
    category: "Controle",
    description: "Impede o alvo de realizar uma ação.",
  },
  {
    name: "Presságio",
    category: "Controle",
    description: "Após dois turnos, o alvo perde uma ação.",
  },

  {
    name: "Efêmero",
    category: "Especiais",
    description:
      "Cria um clone temporário com metade dos atributos e que recebe Provocação.",
  },
  {
    name: "Ruína",
    category: "Especiais",
    description:
      "Causa Purificação ao alvo e causa 50% de dano adicional caso ele tenha algum debuff.",
  },
  {
    name: "Castigar",
    category: "Especiais",
    description: "Remove todos os buffs do alvo e causa Infecção.",
  },
  {
    name: "Decadência",
    category: "Especiais",
    source: "Miasma",
    description:
      "Causa dano contínuo até o fim da batalha. É um efeito exclusivo do Miasma.",
  },

  {
    name: "Decreto",
    category: "Marcas",
    source: "Manifesto",
    description: "Permite realizar uma ação ao fim do turno do alvo afetado.",
  },
  {
    name: "Autoridade",
    category: "Marcas",
    source: "Manifesto",
    description:
      "Por dois turnos, concede Vantagem. Toda ação que falhar contra você aumenta a duração da Autoridade em um turno.",
  },
  {
    name: "Ressonância",
    category: "Marcas",
    source: "Entoadora",
    description:
      "Compartilha o efeito entre aliados. Aumenta 5 de dano por acúmulo. Com três acúmulos, cura 10% do dano causado. Caso o alvo compartilhando o efeito receba dano, ele perde Ressonância.",
  },
  {
    name: "Acorde",
    category: "Marcas",
    source: "Entoadora",
    description:
      "Torna o alvo afetado adjacente ao Anjo. Ambos compartilham a maior defesa e o maior modificador. O alvo se torna imune a Presságio, Desvantagem e Aumento.",
  },
  {
    name: "Sombra",
    category: "Marcas",
    source: "Oculto",
    description:
      "Envia o alvo para a dimensão do vazio. Enquanto estiver sob esse efeito, o alvo não pode ser alvejado por ataques e também não pode atacar.",
  },
  {
    name: "Dor",
    category: "Marcas",
    source: "Maso",
    description:
      "A cada dano, perda de vida ou falha em defesa, recebe +1 POD e +1 RES.",
  },
  {
    name: "Fortuito",
    category: "Marcas",
    source: "Maso",
    description:
      "Após dois turnos, causa um efeito aleatório entre quatro possibilidades usando um d4.",
  },
];

export const effectCategories: EffectCategory[] = [
  "Buffs",
  "Debuffs",
  "Controle",
  "Especiais",
  "Marcas",
];
