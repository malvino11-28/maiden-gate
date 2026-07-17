import { Sword, Dice6, ScrollText, Trees, BookOpen, Users } from "lucide-react";

export const tools = [
  {
    id: 1,
    title: "Criador de Personagens",
    icon: Users,
    color: "from-orange-500 to-pink-600",

    shortDescription:
      "Crie personagens com Marca, atributos, imagens, história e habilidades.",

    description:
      "Monte personagens completos para campanhas de Voice of Flower, escolhendo uma Marca, distribuindo atributos, adicionando origem e habilidades equipadas. A ficha é salva e vinculada ao jogador dentro do Maiden-Gate.",

    features: [
      "Criação guiada",
      "Distribuição de atributos",
      "Escolha da Marca",
      "Upload de imagens",
      "Habilidades equipadas",
    ],

    status: "Disponível",
  },

  {
    id: 2,
    title: "Rolador de Dados",
    icon: Dice6,
    color: "from-blue-500 to-cyan-500",

    shortDescription:
      "Realize rolagens compartilhadas entre Mestre e Jogadores.",

    description:
      "Role dados dentro da campanha e acompanhe um histórico compartilhado entre todos os participantes. O Mestre também pode limpar o histórico quando necessário.",

    features: [
      "Rolagens por campanha",
      "Histórico compartilhado",
      "Atualização automática",
      "Controle do Mestre",
      "Adição Modificadores",
    ],

    status: "Disponível",
  },

  {
    id: 3,
    title: "Árvore de Habilidades",
    icon: Trees,
    color: "from-violet-500 to-fuchsia-600",

    shortDescription:
      "Visualize e equipe habilidades relacionadas à Marca do personagem.",

    description:
      "Acompanhe habilidades desbloqueadas e associadas à Marca escolhida e selecione quais estarão equipadas na ficha. O sistema já permite trabalhar com habilidades por Marca, mas futuras versões podem expandir a árvore visual, pré-requisitos e progressão avançada.",

    features: [
      "Habilidades por Marca",
      "Seleção de habilidades",
      "Limite de equipadas",
      "Habilidades por campanha",
    ],

    status: "Parcialmente disponível",
  },

  {
    id: 4,
    title: "Bestiário e Ameaças",
    icon: ScrollText,
    color: "from-red-500 to-orange-500",

    shortDescription:
      "Organize monstros, criaturas, NPCs hostis e ameaças de campanha.",

    description:
      "Cadastre e visualize ameaças usadas pelo Mestre, incluindo monstros, status, habilidades, imagens e descrições. Esse recurso ajuda a estruturar encontros, RAIDs e perigos marcados pelo Miasma.",

    features: [
      "Cadastro de monstros",
      "Status e habilidades",
      "Imagens",
      "Ameaças por campanha",
    ],

    status: "Parcialmente disponível",
  },

  {
    id: 5,
    title: "Calculadora de Combate",
    icon: Sword,
    color: "from-yellow-500 to-red-500",

    shortDescription:
      "Automatize cálculos de dano, recursos e efeitos de combate.",

    description:
      "Ferramenta planejada para auxiliar Mestres e Jogadores durante combates, calculando dano, recursos, modificadores, efeitos especiais e interações entre habilidades. Ainda não está disponível.",

    features: [
      "Cálculo de dano",
      "Recursos de combate",
      "Modificadores",
      "Efeitos especiais",
    ],

    status: "Em Desenvolvimento",
  },

  {
    id: 6,
    title: "Gerenciador de Campanhas",
    icon: BookOpen,
    color: "from-emerald-500 to-green-500",

    shortDescription:
      "Centralize campanhas, sessões, membros e elementos narrativos.",

    description:
      "Crie e gerencie campanhas com localizações, NPCs, monstros, itens, eventos, sessões, membros, anotações e localização atual. O recurso permite que o Mestre organize a mesa e compartilhe informações importantes com os jogadores.",

    features: [
      "Campanhas",
      "Sessões",
      "NPCs e monstros",
      "Itens e inventário",
      "Membros",
    ],

    status: "Disponível",
  },
];
