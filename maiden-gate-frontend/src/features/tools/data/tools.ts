import { Sword, Dice6, ScrollText, Trees, BookOpen, Users } from "lucide-react";

export const tools = [
  {
    id: 1,
    title: "Criador de Personagens",
    icon: Users,
    color: "from-orange-500 to-pink-600",

    shortDescription:
      "Monte seu personagem utilizando o sistema oficial do Voice Of Flower.",

    description:
      "Crie personagens completos com atributos, Marca, inventário, habilidades, histórico e evolução. Todo o processo segue automaticamente as regras oficiais do RPG.",

    features: [
      "Criação guiada",
      "Distribuição de atributos",
      "Escolha da Marca",
      "Inventário",
      "Ficha automática",
    ],

    status: "Em Desenvolvimento",
  },

  {
    id: 2,
    title: "Rolador de Dados",
    icon: Dice6,
    color: "from-blue-500 to-cyan-500",

    shortDescription: "Role qualquer combinação de dados rapidamente.",

    description:
      "Execute testes utilizando qualquer quantidade de dados e modificadores, mantendo um histórico das últimas rolagens.",

    features: ["d4 até d100", "Modificadores", "Rolagem múltipla", "Histórico"],

    status: "Em Desenvolvimento",
  },

  {
    id: 3,
    title: "Árvore de Habilidades",
    icon: Trees,
    color: "from-violet-500 to-fuchsia-600",

    shortDescription: "Visualize toda a progressão do personagem.",

    description:
      "Explore todas as habilidades disponíveis para sua Marca, acompanhando desbloqueios e pré-requisitos.",

    features: ["Progressão visual", "Pré-requisitos", "Filtros", "Busca"],

    status: "Em Desenvolvimento",
  },

  {
    id: 4,
    title: "Bestiário",
    icon: ScrollText,
    color: "from-red-500 to-orange-500",

    shortDescription: "Conheça criaturas, monstros e chefes do universo.",

    description:
      "Consulte estatísticas, habilidades, fraquezas e descrições completas de todas as criaturas do Voice Of Flower.",

    features: ["Filtros", "Categorias", "Fraquezas", "Lore"],

    status: "Em Desenvolvimento",
  },

  {
    id: 5,
    title: "Calculadora de Combate",
    icon: Sword,
    color: "from-yellow-500 to-red-500",

    shortDescription: "Resolva cálculos de combate instantaneamente.",

    description:
      "Calcule dano, Classe de Armadura, modificadores e demais efeitos automaticamente.",

    features: ["Dano", "CA", "Bônus", "Modificadores"],

    status: "Em Desenvolvimento",
  },

  {
    id: 6,
    title: "Gerenciador de Campanhas",
    icon: BookOpen,
    color: "from-emerald-500 to-green-500",

    shortDescription: "Organize todas as campanhas em um único lugar.",

    description:
      "Gerencie sessões, personagens, NPCs, localidades, eventos e todo o progresso da campanha.",

    features: ["Sessões", "NPCs", "Mapas", "Eventos"],

    status: "Em Desenvolvimento",
  },
];
