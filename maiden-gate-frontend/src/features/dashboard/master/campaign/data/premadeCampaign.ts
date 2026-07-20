import flower from "../../../../../assets/images/logo.png";

import { COLLECTION_COLOR_OPTIONS } from "../../data/collectionColors";

function getCollectionColor(index: number) {
  return (
    COLLECTION_COLOR_OPTIONS[index]?.value ?? COLLECTION_COLOR_OPTIONS[0].value
  );
}

export type PremadeStats = {
  level: number;
  hp: number;
  mana: number;
  atk: number;
  def: number;
  speed: number;
};

export type PremadeCampaign = {
  id: string;
  image: string;
  name: string;
  genre: string;
  tone: string;
  recommendedLevel: "Iniciante" | "Intermediário" | "Avançado";
  players: string;
  description: string;
  collections?: Array<{
    id: string;
    name: string;
    description?: string;
    color?: string;
  }>;
  locations: Array<{
    collectionId?: string;
    name: string;
    image: string;
    type: string;
    region: string;
    description: string;
  }>;
  npcs: Array<{
    collectionId?: string;
    name: string;
    image: string;
    brand: string;
    race: string;
    occupation: string;
    personality: string;
    secret: string;
    description: string;
    skills: string;
    stats: PremadeStats;
  }>;
  monsters: Array<{
    collectionId?: string;
    name: string;
    image: string;
    type: string;
    threat: string;
    skills: string;
    description: string;
    stats: PremadeStats;
  }>;
  items: Array<{
    collectionId?: string;
    name: string;
    type: string;
    description: string;
  }>;
  events: Array<{
    collectionId?: string;
    title: string;
    chronology: string;
    date: string;
    description: string;
  }>;
};

type PremadeCampaignSource = Omit<PremadeCampaign, "npcs" | "monsters"> & {
  npcs: Array<
    Omit<PremadeCampaign["npcs"][number], "stats"> & {
      stats?: PremadeStats;
    }
  >;
  monsters: Array<
    Omit<PremadeCampaign["monsters"][number], "stats"> & {
      stats?: PremadeStats;
    }
  >;
};

const DEFAULT_PREMADE_STATS: PremadeStats = {
  level: 1,
  hp: 100,
  mana: 50,
  atk: 10,
  def: 10,
  speed: 10,
};

const premadeCampaignSources: PremadeCampaignSource[] = [
  {
    id: "awakening",
    image: flower,
    name: "O Despertar da Donzela",
    genre: "Fantasia Sombria & Intriga Política",
    tone: "Sombrio, misterioso e político",
    recommendedLevel: "Avançado",
    players: "3–8",
    description:
      "Às vésperas do Festival da Flor, o domínio do Manifesto e os territórios do Sindicato das Sombras vivem uma tensão prestes a explodir. Enquanto o Miasma permanece de forma anormal em certas regiões, Eleanor, filha da rainha da linhagem principal do Manifesto, decide revelar ao mundo um segredo capaz de abalar a fé, a política e o equilíbrio entre as Marcas. Para alguns, ela será vista como uma messias. Para outros, como o primeiro sinal do colapso.",

    collections: [
      {
        id: "dominio-manifesto",
        name: "Domínio do Manifesto — Área 1",
        description:
          "Primeira grande área territorial do Manifesto. Abrange a Cidade Catedral, o Reino de Songbird, Auréon, as comunidades associadas às Marcas Maso e Respiração, além de bases militares e regiões afetadas pelo Miasma.",
        color: getCollectionColor(0),
      },
      {
        id: "regiao-cratera",
        name: "Região da Cratera",
        description:
          "Setor contaminado da Área 1 do Manifesto, marcado por uma cratera cercada por Miasma impenetrável, por um rastro de contaminação e pelo grande acampamento de guerreiros que procuram uma forma de atravessá-lo.",
        color: getCollectionColor(4),
      },
      {
        id: "sindicato-sombras",
        name: "Território do Sindicato — Área 1",
        description:
          "Primeira grande área territorial do Sindicato das Sombras. É formada por cidades diversas, montanhas, portais secretos, bases militares e locais perigosamente afetados pelo Miasma.",
        color: getCollectionColor(1),
      },
      {
        id: "fronteira-area-1",
        name: "Fronteira das Áreas 1",
        description:
          "Locais situados entre os territórios do Manifesto e do Sindicato das Sombras, sem domínio oficial reconhecido e constantemente utilizados em operações secretas por ambos os lados.",
        color: getCollectionColor(2),
      },
      {
        id: "eventos-principais",
        name: "Eventos Principais",
        description:
          "Linha do tempo principal da campanha O Despertar da Donzela.",
        color: getCollectionColor(3),
      },
      {
        id: "dominio-manifesto-area-2",
        name: "Domínio do Manifesto — Área 2",
        description:
          "Região econômica e industrial do Manifesto, marcada por comércio, turismo, propriedades agrícolas, instalações militares e fortes desigualdades entre a nobreza e os trabalhadores.",
        color: getCollectionColor(0),
      },
      {
        id: "sindicato-sombras-area-2",
        name: "Território do Sindicato — Área 2",
        description:
          "Região populosa e fortemente militarizada do Sindicato, formada por grandes cidades, comunidades precárias, portais ocultos e territórios recentemente destruídos pelo Miasma.",
        color: getCollectionColor(1),
      },
      {
        id: "fronteira-area-2",
        name: "Fronteira das Áreas 2",
        description:
          "Ilhas e regiões marítimas situadas entre as Áreas 2 do Manifesto e do Sindicato. Inclui territórios diplomáticos neutros e pontos com grande risco de surgimento de Miasma.",
        color: getCollectionColor(2),
      },
      {
        id: "dominio-manifesto-area-3",
        name: "Domínio do Manifesto — Área 3",
        description:
          "Região estratégica do Manifesto voltada ao abastecimento, à medicina, à pesquisa e à contenção do Miasma. Possui cidades agrícolas, hospitais, laboratórios, templos, fortalezas e instalações militares próximas a The Union.",
        color: getCollectionColor(0),
      },
      {
        id: "sindicato-sombras-area-3",
        name: "Território do Sindicato — Área 3",
        description:
          "Região montanhosa do Sindicato marcada por cidades costeiras, portais secretos, instituições dedicadas aos afetados pelo Miasma e estruturas defensivas próximas a The Union.",
        color: getCollectionColor(1),
      },
      {
        id: "the-union-area-3",
        name: "The Union — Área 3",
        description:
          "Zona de cooperação emergencial onde guerreiros, soldados, pesquisadores e usuários de todas as Marcas combatem a alta incidência de Miasma. Apesar da união oficial, cada facção mantém seus próprios interesses e operações secretas.",
        color: getCollectionColor(4),
      },
      {
        id: "fronteira-area-3",
        name: "Territórios Neutros — Área 3",
        description:
          "Locais próximos à Área 3 que não pertencem oficialmente ao Manifesto, ao Sindicato ou a The Union. São utilizados para recuperação, quarentena e atividades reconhecidas por diferentes facções.",
        color: getCollectionColor(2),
      },
      {
        id: "personagens-genericos",
        name: "Personagens Genéricos",
        description:
          "Modelos reutilizáveis de moradores, soldados, comerciantes, nobres e outros personagens comuns que podem aparecer em diferentes locais da campanha.",
        color: getCollectionColor(5),
      },
      {
        id: "criaturas-genericas",
        name: "Criaturas Genéricas",
        description:
          "Criaturas reutilizáveis que podem aparecer em diferentes regiões da campanha. O habitat indicado em cada descrição ajuda o mestre a escolher quais monstros combinam com o clima e o ambiente da cena.",
        color: getCollectionColor(5),
      },
      {
        id: "itens-gerais",
        name: "Itens Gerais e Equipamentos",
        description:
          "Itens comuns, consumíveis, ferramentas, armas, armaduras e materiais que podem ser encontrados ou adquiridos em diferentes regiões.",
        color: getCollectionColor(5),
      },
      {
        id: "recompensas-especiais",
        name: "Recompensas Especiais",
        description:
          "Materiais raros e artefatos obtidos ao derrotar minibosses, completar RAIDs ou descobrir encontros secretos.",
        color: getCollectionColor(6),
      },
    ],

    locations: [
      // =========================================================
      // ÁREA 1 DO MANIFESTO — CIDADE CATEDRAL
      // =========================================================

      {
        collectionId: "dominio-manifesto",
        name: "Cidade Catedral",
        image: flower,
        type: "Capital / Cidade Sagrada",
        region: "Extremo sul da Área 1 do Manifesto",
        description:
          "Capital religiosa construída ao redor da Flor. A cidade ainda está incompleta e possui um grande terreno vazio ao redor da entidade. Próximo à entrada encontra-se o castelo da família real, enquanto uma praça com um palco foi preparada para cerimônias, pronunciamentos e para o Festival da Flor.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "A Flor",
        image: flower,
        type: "Entidade Sagrada / Marco Central",
        region: "Centro da Cidade Catedral",
        description:
          "A entidade que deu origem às Marcas, aos elfos e aos antropomórficos. Permanece no centro de um grande espaço ainda pouco ocupado da Cidade Catedral. Sua presença sustenta a fé do Manifesto e transforma a cidade no principal destino de peregrinos do continente.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Castelo da Coroa Áurea",
        image: "",
        type: "Castelo Real",
        region: "Entrada da Cidade Catedral",
        description:
          "Grande castelo do Manifesto construído próximo à entrada da Cidade Catedral. Abriga nobres, autoridades e principalmente os membros considerados mais puros da linhagem real. A rainha Aurelia e Eleanor permanecem no castelo durante os preparativos para o Festival da Flor.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Praça da Flor",
        image: "",
        type: "Praça Cerimonial",
        region: "Diante do Castelo da Coroa Áurea",
        description:
          "Ampla praça construída diante do castelo real. É utilizada para celebrações, recepções diplomáticas, sermões e eventos públicos. Durante o Festival da Flor, recebe convidados de diferentes regiões, facções, Marcas e raças.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Palco do Festival",
        image: "",
        type: "Palco Cerimonial",
        region: "Praça da Flor",
        description:
          "Palco elevado preparado para apresentações de Entoadoras, discursos religiosos e pronunciamentos da família real. É neste local que Eleanor pretende realizar sua revelação diante dos convidados do Festival da Flor.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Ponte da Catedral",
        image: "",
        type: "Ponte Monumental",
        region: "Ligação entre a Cidade Catedral e o continente",
        description:
          "Longa ponte que representa a única grande ligação terrestre entre a Cidade Catedral e o restante da Área 1. Guardas controlam a entrada de peregrinos, nobres, trabalhadores e convidados, tornando a estrutura um dos principais pontos de vigilância do Manifesto.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Passagem das Agulhas",
        image: "",
        type: "Estrada Montanhosa",
        region: "Montanhas ao norte da Cidade Catedral",
        description:
          "Estrada estreita que atravessa as montanhas e conecta a Ponte da Catedral ao Reino de Songbird. Seus caminhos sinuosos dificultam grandes movimentações militares, mas favorecem ataques rápidos, contrabando e desaparecimentos.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Vila de Maré Baixa",
        image: "",
        type: "Vila Costeira",
        region: "Leste da Passagem das Agulhas",
        description:
          "Pequena comunidade costeira acessada por um desvio da estrada principal. Seus moradores vivem da pesca, do transporte de mantimentos e dos trabalhos relacionados à construção da Cidade Catedral. Alguns conhecem histórias sobre danos causados às raízes da Flor.",
      },

      // =========================================================
      // ÁREA 1 DO MANIFESTO — REINO DE SONGBIRD
      // =========================================================

      {
        collectionId: "dominio-manifesto",
        name: "Reino de Songbird",
        image: "",
        type: "Território das Entoadoras",
        region: "Sul das Planícies de Aurel",
        description:
          "Território administrado pelas Entoadoras com apoio político e financeiro do Manifesto. Reúne cidades, escolas de canto, teatros, residências de prestígio e o castelo que funciona como sede política e artística da região.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Cidade de Songbird",
        image: "",
        type: "Cidade das Entoadoras",
        region: "Reino de Songbird",
        description:
          "Principal centro populacional das Entoadoras na Área 1. Apresentações musicais, cerimônias religiosas e festivais atraem viajantes de várias regiões. Por trás da imagem cultural, a cidade também funciona como instrumento de influência política do Manifesto.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Três Escolas de Songbird",
        image: "",
        type: "Instituições de Formação",
        region: "Cidade de Songbird",
        description:
          "Conjunto das três maiores escolas de formação de Entoadoras. As estudantes aprendem canto, presença, controle emocional, manifestação de habilidades e conduta pública. Cada escola possui sua própria filosofia e mantém rivalidades com as demais.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Castelo das Entoadoras",
        image: "",
        type: "Castelo / Sede Cultural",
        region: "Reino de Songbird",
        description:
          "Sede política e artística das Entoadoras. Concertos, reuniões diplomáticas e acordos com o Manifesto acontecem em seus salões. Determinados aposentos são acessíveis apenas às Entoadoras de maior prestígio e às autoridades da região.",
      },

      // =========================================================
      // ÁREA 1 DO MANIFESTO — PLANÍCIES E AURÉON
      // =========================================================

      {
        collectionId: "dominio-manifesto",
        name: "Planícies de Aurel",
        image: "",
        type: "Planície",
        region: "Centro-sul da Área 1 do Manifesto",
        description:
          "Vasta planície que conecta Songbird, Auréon, as vilas costeiras e as bases militares da região. Suas estradas são utilizadas por comerciantes, soldados, mensageiros e peregrinos. Durante a noite, viajantes relatam vultos e desaparecimentos inexplicáveis.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Auréon",
        image: "",
        type: "Cidade-Reino Amuralhada",
        region: "Centro das Planícies de Aurel",
        description:
          "Grande cidade-reino do Manifesto cercada por uma muralha. Seu núcleo político ocupa o centro, enquanto duas extensões urbanas formam os distritos de Lumenhall e Vitrália. Antes da construção da Cidade Catedral, Auréon era o principal símbolo do poder da família real.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Castelo de Auréon",
        image: "",
        type: "Castelo Real",
        region: "Núcleo central de Auréon",
        description:
          "Antiga sede central do Manifesto e atual centro administrativo de Auréon. Abriga conselheiros, arquivos militares e integrantes de linhagens nobres secundárias. Alguns documentos guardados no castelo mencionam o sangue dos dragões e antigas campanhas contra o Sindicato.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Lumenhall",
        image: "",
        type: "Distrito Religioso e Militar",
        region: "Extensão de Auréon",
        description:
          "Distrito organizado e fortemente religioso, marcado por templos, praças limpas, quartéis e presença constante de guardas. Seus habitantes costumam apoiar a autoridade do Manifesto, embora muitos temam o início de uma guerra aberta.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Vitrália",
        image: "",
        type: "Distrito de Artesãos e Pesquisadores",
        region: "Extensão de Auréon",
        description:
          "Distrito conhecido por seus vitrais, oficinas de lentes, estudos ópticos e artesãos especializados em manifestações de luz. Alguns pesquisadores investigam variações incomuns da Marca do Manifesto sem autorização da nobreza.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Porto Alvor",
        image: "",
        type: "Vila Costeira",
        region: "Leste das Planícies de Aurel",
        description:
          "Vila costeira responsável pelo fornecimento de pescado, sal e mercadorias para Auréon. Embarcações comerciais e militares utilizam seu pequeno porto, fazendo com que mercadores, soldados e possíveis espiões dividam as mesmas ruas.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Forte Lúmen",
        image: "",
        type: "Base Militar",
        region: "Oeste das Planícies de Aurel",
        description:
          "Grande base militar do Manifesto voltada diretamente para a Área 1 do Sindicato. Suas torres observam o oceano, registram movimentações inimigas e protegem a região contra possíveis desembarques ou operações clandestinas.",
      },

      // =========================================================
      // FRONTEIRA ENTRE AS ÁREAS 1
      // =========================================================

      {
        collectionId: "dominio-manifesto",
        name: "Forte das Vigílias",
        image: "",
        type: "Base Militar",
        region: "Montanhas ao norte das Planícies de Aurel",
        description:
          "Base militar escondida entre as montanhas e voltada para a Ilha de Vigília. Sua guarnição monitora embarcações, movimentações do Sindicato e possíveis operações realizadas no território neutro.",
      },
      {
        collectionId: "fronteira-area-1",
        name: "Ilha de Vigília",
        image: "",
        type: "Ilha Neutra / Território Disputado",
        region: "Entre as Áreas 1 do Manifesto e do Sindicato",
        description:
          "Pequena ilha que não pertence oficialmente a nenhuma facção. Manifesto e Sindicato mantêm olheiros, esconderijos e operações secretas no território, embora nenhum dos lados reconheça publicamente essas atividades.",
      },

      // =========================================================
      // ÁREA 1 DO MANIFESTO — REGIÃO DA CRATERA
      // =========================================================

      {
        collectionId: "regiao-cratera",
        name: "Cratera do Último Miasma",
        image: "",
        type: "RAID / Zona Contaminada",
        region: "Norte da Área 1 do Manifesto",
        description:
          "Grande cratera completamente cercada por uma cortina de Miasma extremamente densa. Nenhuma tentativa conhecida conseguiu atravessar a barreira. Estruturas, sons e criaturas aparecem ocasionalmente além da névoa, mas sua verdadeira origem permanece desconhecida.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Trilha Roxa",
        image: "",
        type: "Rastro de Miasma",
        region: "Norte da Cratera do Último Miasma",
        description:
          "Rastro de Miasma que escapa da cratera e avança em direção ao norte. A trilha muda lentamente de forma e provoca distorções sonoras, sombras sem origem e alterações no comportamento de animais e viajantes.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Névoa Branda",
        image: "",
        type: "Zona de Miasma Reduzido",
        region: "Extremidade norte da Trilha Roxa",
        description:
          "Região onde a concentração do Miasma se torna menor e pode ser atravessada por pessoas preparadas. Ainda causa confusão, sonhos anormais, perda de direção e alterações temporárias no ambiente.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Rochaviva",
        image: "",
        type: "Cidade de Usuários da Marca Maso",
        region: "Leste da Cratera do Último Miasma",
        description:
          "Cidade desorganizada e barulhenta onde a maior parte dos habitantes possui a Marca Maso. Suas ruas reúnem oficinas, arenas, mercenários, artesãos e estilos de combate únicos. Muitos dos guerreiros interessados na cratera partem de Rochaviva.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Porto de Cinza Clara",
        image: "",
        type: "Cidade Costeira",
        region: "Norte de Rochaviva",
        description:
          "Cidade costeira ligada a Rochaviva e habitada principalmente por usuários da Marca Maso. Fornece pescado, transporte e suprimentos para os guerreiros da região. Parte da população teme que a Névoa Branda alcance a costa.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Acampamento dos Errantes",
        image: "",
        type: "Grande Acampamento de Aventureiros",
        region: "Arredores da Cratera do Último Miasma",
        description:
          "Extenso acampamento formado por aventureiros, guerreiros, mercenários, pesquisadores e usuários de diferentes Marcas que procuram uma forma de atravessar o Miasma. Muitos vieram de Rochaviva, enquanto autoridades do Manifesto permanecem no local para observar e controlar as tentativas.",
      },

      // =========================================================
      // ÁREA 1 DO MANIFESTO — EXTREMO NORTE
      // =========================================================

      {
        collectionId: "dominio-manifesto",
        name: "Seiran",
        image: "",
        type: "Cidade de Samurais",
        region: "Extremo norte da Área 1 do Manifesto",
        description:
          "Pequena cidade de samurais associada à Marca da Respiração. Seus habitantes valorizam disciplina, treinamento corporal, domínio da espada e observação da natureza. A comunidade mantém costumes próprios e pouco contato com a nobreza do Manifesto.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Vila Ventomar",
        image: "",
        type: "Vila Costeira de Abastecimento",
        region: "Costa próxima a Seiran",
        description:
          "Pequena vila costeira responsável por fornecer alimentos para Seiran. Seus habitantes vivem principalmente da pesca, da coleta de frutos marinhos e da produção de sal, mantendo uma relação de dependência e proteção com os samurais.",
      },

      // =========================================================
      // ÁREA 1 DO SINDICATO — REGIÃO SUL
      // =========================================================

      {
        collectionId: "sindicato-sombras",
        name: "Cordilheira Silente",
        image: "",
        type: "Cadeia de Montanhas",
        region: "Borda montanhosa da Área 1 do Sindicato",
        description:
          "Extensa cadeia de montanhas que acompanha grande parte da borda da Área 1. Cavernas, passagens secretas e estruturas ocultas permitem que o Sindicato proteja seus portais e movimente agentes sem utilizar as estradas comuns.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Portal Sul do Vazio",
        image: "",
        type: "Portal Oculto",
        region: "Montanhas do sul da Área 1 do Sindicato",
        description:
          "Primeiro dos três portais secretos da região. Está escondido entre as montanhas próximas ao início da ilha e permite deslocamentos rápidos pela rede do Sindicato. Sua existência é conhecida apenas por agentes autorizados.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Lago do Véu Roxo",
        image: "",
        type: "Lago Contaminado",
        region: "Sul da Área 1 do Sindicato",
        description:
          "Grande lago cuja superfície está completamente coberta por Miasma. A água abaixo da névoa permanece invisível, enquanto reflexos mostram formas que não existem nas margens. Poucas pessoas se arriscam a navegar pelo local.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Forte da Costa Leste",
        image: "",
        type: "Base Militar",
        region: "Leste do Lago do Véu Roxo",
        description:
          "Pequena base militar do Sindicato voltada para a Área 1 do Manifesto. Suas patrulhas observam embarcações inimigas, protegem a costa e controlam parte das rotas de suprimentos da região.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Vila Névoa Baixa",
        image: "",
        type: "Vila Costeira",
        region: "Próxima ao Forte da Costa Leste",
        description:
          "Vila de pescadores e marinheiros que fornece alimentos e embarcações para o forte e para outras comunidades do Sindicato. Alguns moradores colaboram com contrabandistas e fingem não perceber atividades militares clandestinas.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Acampamento do Véu",
        image: "",
        type: "Acampamento de Aventureiros",
        region: "Margens do Lago do Véu Roxo",
        description:
          "Acampamento formado por guerreiros, exploradores e estudiosos interessados no Miasma do lago. Diferente dos Errantes, seus integrantes operam com pouca supervisão e frequentemente escondem seus verdadeiros objetivos.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Floresta da Névoa Imóvel",
        image: "",
        type: "Floresta Misteriosa",
        region: "Montanhas a oeste do Lago do Véu Roxo",
        description:
          "Floresta coberta por uma névoa densa que nunca se dissipa, mesmo diante de ventos fortes ou mudanças de temperatura. Caminhos parecem alterar de posição, sons surgem de direções impossíveis e viajantes podem perder a noção do tempo.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Portal Oeste do Vazio",
        image: "",
        type: "Portal Oculto",
        region: "Extremo oeste da Cordilheira Silente",
        description:
          "Portal escondido em uma caverna profunda entre as montanhas. Guardas do Sindicato protegem a entrada e eliminam testemunhas. Pessoas esquecidas ou desaparecidas são vistas com frequência nas rotas próximas.",
      },

      // =========================================================
      // ÁREA 1 DO SINDICATO — NOCTÁRIA E REGIÃO NORTE
      // =========================================================

      {
        collectionId: "sindicato-sombras",
        name: "Noctária",
        image: "",
        type: "Grande Cidade do Sindicato",
        region: "Planícies centrais da Área 1 do Sindicato",
        description:
          "Principal centro político e populacional do Sindicato das Sombras na Área 1. A cidade é formada por bairros sobrepostos, mercados, túneis, salões e comunidades de diferentes origens. Para muitos rejeitados, Noctária representa refúgio; para outros, uma prisão sem grades.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Saguão do Véu",
        image: "",
        type: "Sede Política do Sindicato",
        region: "Centro de Noctária",
        description:
          "Grande saguão onde líderes, conselheiros e representantes do Sindicato discutem decisões políticas, operações militares e assuntos relacionados aos portais. Funciona como equivalente ao castelo de uma monarquia, embora o Sindicato rejeite essa comparação.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Portal Norte do Vazio",
        image: "",
        type: "Portal Oculto",
        region: "Montanhas a noroeste de Noctária",
        description:
          "Portal mais distante e instável da rede da Área 1. Durante sua ativação, vozes podem ser ouvidas além da estrutura, mesmo quando nenhum viajante está realizando a travessia.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Porto Nox",
        image: "",
        type: "Cidade Costeira de Abastecimento",
        region: "Leste de Noctária",
        description:
          "Cidade costeira responsável por grande parte dos alimentos que chegam a Noctária. Além da pesca e do comércio, o porto é utilizado para contrabando, transporte de agentes e entrada de pessoas rejeitadas pelos territórios do Manifesto.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Umbraford",
        image: "",
        type: "Cidade",
        region: "Norte de Porto Nox",
        description:
          "Cidade localizada ao norte do principal porto da região. Funciona como ponto de passagem entre Noctária, o litoral e as montanhas do norte. Seus líderes locais mantêm relações discretas com as operações secretas do Sindicato.",
      },
      // =========================================================
      // ÁREA 2 DO MANIFESTO — PLANÍCIE DE VIDRO
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-2",
        name: "Planície de Vidro",
        image: "",
        type: "Planície Cristalizada / Local Turístico",
        region: "Nordeste da Área 2 do Manifesto",
        description:
          "Região dividida em três grandes campos cristalizados. A explosão de um monstro de cristal provocou uma reação que transformou plantações, vegetação, construções e guerreiros em cristal. Apesar da tragédia, o local tornou-se uma atração frequentada principalmente por turistas ricos.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Prismária",
        image: "",
        type: "Cidade Costeira Aristocrática",
        region: "Costa próxima à Planície de Vidro",
        description:
          "Cidade nobre que funciona como principal acesso à Planície de Vidro. Suas construções utilizam vitrais, espelhos, cristais e monumentos que exaltam os poderes do Manifesto. Hotéis, salões e guias particulares atendem os visitantes mais ricos.",
      },

      // =========================================================
      // ÁREA 2 DO MANIFESTO — VALE ESCAMADO
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-2",
        name: "Vale Escamado",
        image: "",
        type: "Vale Rochoso",
        region: "Setor oriental da Área 2 do Manifesto",
        description:
          "Região formada por grandes paredões rochosos que lembram escamas sobrepostas. Suas poucas entradas naturais são controladas por bases militares que impedem viajantes de se aproximarem do antigo santuário localizado no centro do vale.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Bastião da Escama Norte",
        image: "",
        type: "Base Militar",
        region: "Entrada norte do Vale Escamado",
        description:
          "Base militar responsável por vigiar a entrada superior do Vale Escamado. Sua guarnição registra viajantes, intercepta expedições não autorizadas e mantém patrulhas permanentes ao redor do santuário abandonado.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Bastião da Escama Sul",
        image: "",
        type: "Base Militar",
        region: "Entrada sul do Vale Escamado",
        description:
          "Base militar que protege a entrada inferior do vale. Oficialmente combate monstros e saqueadores, mas sua principal função é impedir que pessoas não autorizadas alcancem as ruínas existentes no interior da região.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Santuário da Primeira Luz",
        image: "",
        type: "Santuário Abandonado",
        region: "Centro do Vale Escamado",
        description:
          "Antigo templo do Manifesto pertencente a uma doutrina anterior à religião atual. Símbolos foram raspados, estátuas foram destruídas e registros foram removidos. Uma passagem escondida conduz até as estruturas subterrâneas do santuário.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Cripta Escamada",
        image: "",
        type: "Masmorra / Caverna",
        region: "Subsolo do Santuário da Primeira Luz",
        description:
          "Rede subterrânea de cavernas, corredores religiosos e câmaras escavadas na rocha. As duas bases militares do vale parecem existir principalmente para impedir que o conteúdo da cripta seja descoberto.",
      },

      // =========================================================
      // ÁREA 2 DO MANIFESTO — REGIÃO INDUSTRIAL
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-2",
        name: "Altos de Ferrúria",
        image: "",
        type: "Região Industrial Elevada",
        region: "Norte da Área 2 do Manifesto",
        description:
          "Região elevada marcada por fumaça, estradas de carga e grandes instalações industriais. A maior parte de sua produção abastece o comércio de Nova Auréola e as forças militares do Manifesto.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Complexo Industrial de Ferrúria",
        image: "",
        type: "Complexo de Fábricas",
        region: "Altos de Ferrúria",
        description:
          "Conjunto de fábricas responsáveis pela produção de armas, ferramentas, peças de embarcações e equipamentos militares. Muitos trabalhadores são prisioneiros transportados diariamente da Penitenciária do Grilhão.",
      },

      // =========================================================
      // ÁREA 2 DO MANIFESTO — NOVA AURÉOLA
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-2",
        name: "Nova Auréola",
        image: "",
        type: "Grande Distrito Comercial",
        region: "Centro da Área 2 do Manifesto",
        description:
          "Um dos maiores centros econômicos do Manifesto. Mercados, bancos, leilões, casas de espetáculo, hospedarias e comerciantes de artefatos atraem visitantes de diversas regiões. Apesar de ser chamada de distrito, possui dimensões comparáveis às de uma grande cidade.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Palácio da Coroa Mercante",
        image: "",
        type: "Castelo Administrativo",
        region: "Centro de Nova Auréola",
        description:
          "Castelo ocupado pela ramificação da família real responsável pelos negócios da região. Ali são administrados impostos, concessões comerciais, licenças de transporte e acordos com as famílias proprietárias das grandes plantações.",
      },

      // =========================================================
      // ÁREA 2 DO MANIFESTO — PROPRIEDADES AGRÍCOLAS
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-2",
        name: "Herdade Solaris",
        image: "",
        type: "Propriedade Agrícola",
        region: "Sul de Nova Auréola",
        description:
          "Grande propriedade especializada na produção de cereais. Uma mansão luxuosa abriga a família Solaris, responsável pela administração das plantações e dos trabalhadores.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Mansão Solaris",
        image: "",
        type: "Mansão Aristocrática",
        region: "Herdade Solaris",
        description:
          "Residência da família Solaris. A mansão possui depósitos privados, alojamentos para guardas e salões utilizados para negociar contratos agrícolas com representantes de Nova Auréola.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Herdade Velária",
        image: "",
        type: "Propriedade Agrícola",
        region: "Sul de Nova Auréola",
        description:
          "Propriedade dedicada ao cultivo de frutas, plantas medicinais e ingredientes utilizados na fabricação de óleos e perfumes. É administrada pela influente família Velária.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Mansão Velária",
        image: "",
        type: "Mansão Aristocrática",
        region: "Herdade Velária",
        description:
          "Residência da família Velária, cercada por jardins particulares e laboratórios de preparação de essências. Poucos trabalhadores possuem autorização para entrar nas áreas internas.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Herdade Calêndria",
        image: "",
        type: "Propriedade Agrícola",
        region: "Sul de Nova Auréola",
        description:
          "Grande propriedade produtora de uvas, ervas e ingredientes destinados às casas nobres e aos estabelecimentos comerciais de Nova Auréola.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Mansão Calêndria",
        image: "",
        type: "Mansão Aristocrática",
        region: "Herdade Calêndria",
        description:
          "Residência da família Calêndria. Seus porões armazenam vinhos, ervas raras e parte da produção que não aparece nos registros comerciais oficiais.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Baixio de Auréola",
        image: "",
        type: "Cidade de Trabalhadores",
        region: "Entre as três grandes propriedades agrícolas",
        description:
          "Cidade precária habitada principalmente por trabalhadores das plantações, carregadores, criados e transportadores. Pessoas de diferentes Marcas vivem no local, embora recebam poucos dos investimentos destinados à rica Nova Auréola.",
      },

      // =========================================================
      // ÁREA 2 DO MANIFESTO — ZONA PORTUÁRIA MILITAR
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-2",
        name: "Porto Régio",
        image: "",
        type: "Cidade Portuária Comercial",
        region: "Sudoeste da Área 2 do Manifesto",
        description:
          "Cidade costeira que concentra comerciantes, companhias marítimas, armazéns e escritórios responsáveis pela documentação das embarcações. É conectada diretamente à Baía de Candeia.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Baía de Candeia",
        image: "",
        type: "Cidade Portuária Industrial",
        region: "Sudoeste da Área 2 do Manifesto",
        description:
          "Cidade costeira ligada a Porto Régio. Possui estaleiros, alojamentos de marinheiros, oficinas de reparo e instalações utilizadas na manutenção de embarcações comerciais e militares.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Arsenal de Solferro",
        image: "",
        type: "Grande Base Naval",
        region: "Entre Porto Régio e Baía de Candeia",
        description:
          "Maior porto militar do Manifesto. A base controla as rotas marítimas, inspeciona cargas, regulamenta embarcações comerciais e abriga grande parte da frota naval da facção.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Porto Sereno",
        image: "",
        type: "Cidade Costeira",
        region: "Extremo sul da Área 2 do Manifesto",
        description:
          "Cidade portuária menor e menos militarizada. Atende pescadores, embarcações particulares e viajantes que seguem em direção às ilhas e aos territórios neutros.",
      },

      // =========================================================
      // ÁREA 2 DO MANIFESTO — MIASMA E FRONTEIRA
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-2",
        name: "Nuvens Gêmeas",
        image: "",
        type: "Zona de Miasma",
        region: "Leste da Área 2 do Manifesto",
        description:
          "Duas grandes concentrações de Miasma que flutuam sobre a região. Embora não estejam fisicamente conectadas, parecem reagir uma à outra: quando uma cresce, a outra frequentemente perde densidade.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Acampamento Entre Véus",
        image: "",
        type: "Acampamento de Guerreiros",
        region: "Entre as Nuvens Gêmeas",
        description:
          "Acampamento ocupado por soldados, aventureiros, estudiosos, curandeiros e mercenários. Seus integrantes monitoram as duas nuvens e tentam impedir que o Miasma avance para áreas habitadas.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "As Três Sentinelas",
        image: "",
        type: "Complexo de Torres de Vigia",
        region: "Extremo leste da Área 2 do Manifesto",
        description:
          "Conjunto de três grandes torres posicionadas próximo à fronteira com o Sindicato. Elas monitoram tropas, mensageiros, embarcações e alterações no Miasma, transmitindo sinais entre si e para as bases militares próximas.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Sentinela da Aurora",
        image: "",
        type: "Torre de Vigia",
        region: "Complexo das Três Sentinelas",
        description:
          "Torre responsável por observar o setor norte da fronteira e transmitir os primeiros alertas ao restante do complexo.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Sentinela Central",
        image: "",
        type: "Torre de Comando",
        region: "Complexo das Três Sentinelas",
        description:
          "Torre principal do complexo. Recebe informações das outras sentinelas e coordena a comunicação com as forças militares da Área 2.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Sentinela do Ocaso",
        image: "",
        type: "Torre de Vigia",
        region: "Complexo das Três Sentinelas",
        description:
          "Torre responsável por observar o setor sul da fronteira e as rotas marítimas próximas.",
      },

      // =========================================================
      // ÁREA 2 DO MANIFESTO — PRISÃO E TEMPLO
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-2",
        name: "Penitenciária do Grilhão",
        image: "",
        type: "Grande Prisão",
        region: "Noroeste da Área 2 do Manifesto",
        description:
          "Gigantesca penitenciária que abriga criminosos comuns, contrabandistas, opositores políticos e acusados de colaborar com o Sindicato. Muitos presos são transportados diariamente para trabalhar nas fábricas dos Altos de Ferrúria.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Templo da Expiação",
        image: "",
        type: "Templo Religioso",
        region: "Ao lado da Penitenciária do Grilhão",
        description:
          "Templo destinado oficialmente à purificação dos pecados dos prisioneiros. Suas cerimônias pregam que o trabalho e o sofrimento podem redimir os condenados, ajudando a justificar o uso dos presos nas fábricas.",
      },

      // =========================================================
      // ÁREA 2 DO SINDICATO — FRONTEIRA E CENTRO MILITAR
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-2",
        name: "Fortaleza de Vantor",
        image: "",
        type: "Grande Centro Militar",
        region: "Fronteira com a Área 2 do Manifesto",
        description:
          "Um dos maiores centros militares do Sindicato. Possui quartéis, depósitos, áreas de treinamento, defesas costeiras e unidades preparadas para responder às forças posicionadas nas Três Sentinelas.",
      },

      // =========================================================
      // ÁREA 2 DO SINDICATO — VÉSPERA
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-2",
        name: "Véspera",
        image: "",
        type: "Metrópole do Sindicato",
        region: "Região elevada do norte da Área 2 do Sindicato",
        description:
          "Maior cidade do Sindicato, construída sobre terrenos elevados e rochosos. É dividida em três distritos conectados por pontes, túneis, escadarias e elevadores mecânicos. Sua organização física também representa as divisões sociais da população.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Distrito da Ferrugem",
        image: "",
        type: "Distrito Industrial Inferior",
        region: "Nível inferior de Véspera",
        description:
          "Distrito marcado por oficinas, depósitos, trabalhadores e habitações apertadas. Grande parte dos equipamentos utilizados pelo Sindicato é produzida ou reparada nesta região.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Distrito do Baixo Véu",
        image: "",
        type: "Distrito Residencial Inferior",
        region: "Nível inferior de Véspera",
        description:
          "Distrito densamente povoado por refugiados, trabalhadores e comerciantes informais. Possui ruas estreitas, construções improvisadas e pouca presença direta das autoridades.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Distrito da Coroa Negra",
        image: "",
        type: "Distrito Superior",
        region: "Nível superior de Véspera",
        description:
          "Distrito ocupado por comandantes, autoridades, famílias influentes e comerciantes poderosos. Suas construções são mais seguras e recebem melhores recursos que os níveis inferiores.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Posto da Margem Morta",
        image: "",
        type: "Base Militar",
        region: "Noroeste de Véspera",
        description:
          "Pequena base militar construída próxima à Grande Barreira do Miasma. Seus soldados monitoram alterações na barreira e impedem que criaturas ou viajantes contaminados avancem em direção à cidade.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Portal da Margem",
        image: "",
        type: "Portal Oculto",
        region: "Atrás do Posto da Margem Morta",
        description:
          "Portal escondido nas formações rochosas atrás da base militar. Poucos soldados conhecem sua existência, e ele pode ser utilizado para retirar autoridades ou transportar agentes em situações de emergência.",
      },

      // =========================================================
      // ÁREA 2 DO SINDICATO — RUÍNAS E RISCO DE MIASMA
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-2",
        name: "Planície das Cinzas Recentes",
        image: "",
        type: "Planície de Ruínas",
        region: "Centro da Área 2 do Sindicato",
        description:
          "Região devastada por uma manifestação recente de Miasma. Ruínas de casas, estradas e construções permanecem espalhadas pelo terreno enquanto equipes procuram sobreviventes, materiais e corpos.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Fenda Latente",
        image: "",
        type: "Zona de Risco de Miasma",
        region: "Planície das Cinzas Recentes",
        description:
          "Ponto onde instrumentos, animais e habilidades apresentam comportamentos anormais. Pequenas manchas de Miasma surgem e desaparecem, indicando uma alta probabilidade de uma nova manifestação atingir a planície.",
      },

      // =========================================================
      // ÁREA 2 DO SINDICATO — VERTÍGIA
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-2",
        name: "Vertígia",
        image: "",
        type: "Cidade Vertical",
        region: "Próxima à Grande Barreira do Miasma",
        description:
          "Gigantesca cidade construída verticalmente junto à barreira. Casas, passarelas, escadas e plataformas foram empilhadas sem planejamento para abrigar uma população cada vez maior. Os níveis mais próximos do Miasma são também os mais pobres e perigosos.",
      },

      // =========================================================
      // ÁREA 2 DO SINDICATO — TEMPLO E CEMITÉRIO
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-2",
        name: "Templo do Último Véu",
        image: "",
        type: "Templo Religioso",
        region: "Sul da Planície das Cinzas Recentes",
        description:
          "Templo que afirma preparar os mortos e desaparecidos para atravessarem o último véu. Em seu interior existe um portal controlado por membros religiosos do Sindicato.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Portal dos Mortos",
        image: "",
        type: "Portal Oculto",
        region: "Interior do Templo do Último Véu",
        description:
          "Portal ligado à rede secreta do Sindicato, mas que apresenta reações incomuns devido à proximidade dos cadáveres e das ruínas contaminadas. Sua verdadeira função é conhecida apenas pelos responsáveis pelo templo.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Campo dos Sem-Nome",
        image: "",
        type: "Cemitério Coletivo",
        region: "Diante do Templo do Último Véu",
        description:
          "Grande cemitério onde são levados os corpos encontrados nas ruínas. Como a quantidade de mortos supera a capacidade de sepultamento, cadáveres aguardam identificação, cremação ou cerimônia em grandes pilhas.",
      },

      // =========================================================
      // ÁREA 2 DO SINDICATO — FAZENDAS E PORTOS
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-2",
        name: "Herdade Dargan",
        image: "",
        type: "Fazenda de Animais",
        region: "Sudoeste da Área 2 do Sindicato",
        description:
          "Grande fazenda pertencente à família Dargan. Fornece carne, couro e animais de carga para Véspera e para as forças militares do Sindicato.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Herdade Volnir",
        image: "",
        type: "Fazenda de Animais",
        region: "Sudoeste da Área 2 do Sindicato",
        description:
          "Propriedade controlada pela família Volnir e localizada diante da Herdade Dargan. As duas famílias mantêm uma rivalidade comercial enquanto cooperam para controlar terras, trabalhadores e rotas de transporte.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Porto Sal Negro",
        image: "",
        type: "Cidade Costeira Comercial",
        region: "Próxima às herdades do sudoeste",
        description:
          "Cidade responsável pelo transporte de carne, couro, animais e outros produtos das grandes fazendas. O cheiro de sal, fumaça e couro domina a região portuária.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Porto de Ébano",
        image: "",
        type: "Cidade Costeira Aristocrática",
        region: "Extremo sul da Área 2 do Sindicato",
        description:
          "Cidade frequentada principalmente por líderes, conselheiros, comandantes e figuras influentes do Sindicato. Possui residências privadas, salões reservados, embarcações luxuosas e forte segurança.",
      },

      // =========================================================
      // ÁREA 2 DO SINDICATO — ILHAS
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-2",
        name: "Ilha da Chave Sombria",
        image: "",
        type: "Ilha Estratégica",
        region: "Próxima a Porto de Ébano",
        description:
          "Pequena ilha protegida por uma guarnição reduzida, porém extremamente leal. É utilizada como rota secreta para viagens e evacuações de figuras importantes do Sindicato.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Portal Insular",
        image: "",
        type: "Portal Oculto",
        region: "Ilha da Chave Sombria",
        description:
          "Portal utilizado para viagens discretas de autoridades e agentes. Sua existência não aparece nos registros comuns da rede de portais do Sindicato.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Ilha Púrpura Morta",
        image: "",
        type: "Ilha Contaminada",
        region: "Próxima a Porto de Ébano",
        description:
          "Ilha completamente coberta pelo Miasma. Nenhuma construção habitável permanece visível, embora luzes e movimentos sejam ocasionalmente observados em sua costa durante a noite.",
      },

      // =========================================================
      // TERRITÓRIOS NEUTROS ENTRE AS ÁREAS 2
      // =========================================================

      {
        collectionId: "fronteira-area-2",
        name: "Ilha da Concórdia",
        image: "",
        type: "Ilha Neutra / Território Diplomático",
        region: "Mar entre as Áreas 2 do Manifesto e do Sindicato",
        description:
          "Pequena ilha que não pertence oficialmente a nenhuma das facções. Manifesto e Sindicato utilizam o território para realizar encontros diplomáticos e discutir assuntos que exigem cooperação.",
      },
      {
        collectionId: "fronteira-area-2",
        name: "Porto da Trégua",
        image: "",
        type: "Cidade Costeira Neutra",
        region: "Ilha da Concórdia",
        description:
          "Cidade preparada para receber representantes das duas facções. Possui salões diplomáticos, hospedarias, guardas neutros e regras rígidas contra o uso de habilidades durante negociações.",
      },
      {
        collectionId: "fronteira-area-2",
        name: "Fossa do Presságio",
        image: "",
        type: "Zona Marítima de Risco",
        region: "Mar entre as Áreas 2",
        description:
          "Região marítima com alta probabilidade de surgimento de Miasma. Uma manifestação no local poderia bloquear rotas comerciais, atingir a Ilha da Concórdia e ser confundida com um ataque de uma das facções.",
      },
      // =========================================================
      // ÁREA 3 DO MANIFESTO — FRONTEIRA COM THE UNION
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-3",
        name: "Forte do Limiar Dourado",
        image: "",
        type: "Forte Fronteiriço",
        region: "Fronteira entre o Manifesto e The Union",
        description:
          "Principal estrutura defensiva do Manifesto próxima a The Union. Controla a passagem de soldados, aventureiros, pesquisadores e suprimentos destinados à zona unificada, além de servir como ponto de retirada durante avanços do Miasma.",
      },
      {
        collectionId: "dominio-manifesto-area-3",
        name: "Três Sentinelas de Marfim",
        image: "",
        type: "Complexo de Torres Defensivas",
        region: "Sul do Forte do Limiar Dourado",
        description:
          "Conjunto de três torres construídas para impedir que monstros vindos de The Union avancem para as cidades do Manifesto. As estruturas utilizam sinalizadores, armas de longo alcance e guerreiros especializados em contenção.",
      },
      {
        collectionId: "dominio-manifesto-area-3",
        name: "Sentinela da Coroa",
        image: "",
        type: "Torre Defensiva",
        region: "Três Sentinelas de Marfim",
        description:
          "Torre responsável pela coordenação das tropas e pela transmissão de ordens entre o forte e as demais sentinelas.",
      },
      {
        collectionId: "dominio-manifesto-area-3",
        name: "Sentinela da Flor",
        image: "",
        type: "Torre Defensiva",
        region: "Três Sentinelas de Marfim",
        description:
          "Torre central do complexo, ocupada por guerreiros, religiosos e especialistas treinados para reconhecer criaturas alteradas pelo Miasma.",
      },
      {
        collectionId: "dominio-manifesto-area-3",
        name: "Sentinela do Horizonte",
        image: "",
        type: "Torre de Observação",
        region: "Três Sentinelas de Marfim",
        description:
          "Torre responsável por observar movimentos distantes dentro de The Union e alertar sobre possíveis ondas de monstros.",
      },

      // =========================================================
      // ÁREA 3 DO MANIFESTO — LABORATÓRIO E BASE MILITAR
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-3",
        name: "Instituto de Maré-Luz",
        image: "",
        type: "Laboratório do Manifesto",
        region: "Costa oeste da Área 3 do Manifesto",
        description:
          "Centro científico dedicado ao estudo do Miasma, de cristais contaminados, de monstros capturados e dos efeitos da exposição prolongada sobre usuários de Marcas. Parte de seus experimentos não é reconhecida oficialmente pelo Manifesto.",
      },
      {
        collectionId: "dominio-manifesto-area-3",
        name: "Base de Salferro",
        image: "",
        type: "Base Militar",
        region: "Sul do Instituto de Maré-Luz",
        description:
          "Instalação militar responsável por proteger o laboratório, transportar espécimes e escoltar pesquisadores. Alguns soldados acreditam que sua verdadeira função é impedir que experimentos ou pacientes escapem do instituto.",
      },

      // =========================================================
      // ÁREA 3 DO MANIFESTO — VALEDOURO E ALVORENA
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-3",
        name: "Castelo de Valedouro",
        image: "",
        type: "Castelo Regional",
        region: "Centro da Área 3 do Manifesto",
        description:
          "Castelo pertencente à família nobre responsável pela administração regional. Coordena recursos militares, hospitais, plantações e operações relacionadas a The Union. Sua arquitetura é mais fortificada e funcional que a de outros castelos do Manifesto.",
      },
      {
        collectionId: "dominio-manifesto-area-3",
        name: "Alvorena",
        image: "",
        type: "Cidade Médica",
        region: "Próxima ao Castelo de Valedouro",
        description:
          "Cidade conhecida por receber soldados feridos, contaminados e sobreviventes retirados de The Union. Civis, militares e pacientes afetados pelo Miasma convivem em um ambiente marcado por medo, esperança e preconceito.",
      },
      {
        collectionId: "dominio-manifesto-area-3",
        name: "Hospital da Grande Aurora",
        image: "",
        type: "Grande Hospital",
        region: "Centro de Alvorena",
        description:
          "Maior hospital da Área 3. Possui setores de atendimento militar, tratamento de exposição ao Miasma, isolamento, recuperação de usuários de Marca e estudo de doenças desconhecidas. Alguns pacientes são transferidos secretamente para o Instituto de Maré-Luz.",
      },

      // =========================================================
      // ÁREA 3 DO MANIFESTO — PRODUÇÃO AGRÍCOLA
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-3",
        name: "Campoluz",
        image: "",
        type: "Cidade Agrícola",
        region: "Leste de Alvorena",
        description:
          "Cidade atravessada por grandes plantações e dedicada ao armazenamento, processamento e distribuição de alimentos. Sua produção abastece Alvorena, Valedouro, as bases militares e parte dos acampamentos de The Union.",
      },
      {
        collectionId: "dominio-manifesto-area-3",
        name: "Campos de Campoluz",
        image: "",
        type: "Região Agrícola",
        region: "Arredores de Campoluz",
        description:
          "Extensas plantações administradas por proprietários locais e supervisionadas pelo Manifesto. Por sustentarem grande parte das operações militares da região, os campos são considerados um alvo estratégico.",
      },

      // =========================================================
      // ÁREA 3 DO MANIFESTO — BELÁRIA E TEMPLO
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-3",
        name: "Belária",
        image: "",
        type: "Cidade de Conselhos Militares",
        region: "Norte da região central do Manifesto",
        description:
          "Pequena cidade preparada para receber comandantes, nobres, estrategistas e representantes de diferentes regiões. Reuniões sobre guerras, fronteiras e operações em The Union acontecem em seus edifícios protegidos.",
      },
      {
        collectionId: "dominio-manifesto-area-3",
        name: "Casa dos Estandartes",
        image: "",
        type: "Sede Estratégica",
        region: "Belária",
        description:
          "Edifício onde acontecem os principais conselhos de guerra da região. Mapas, relatórios militares e informações sobre o Miasma são analisados em seus salões. Representantes de outras facções podem ser recebidos sob vigilância.",
      },
      {
        collectionId: "dominio-manifesto-area-3",
        name: "Templo das Sete Pétalas",
        image: "",
        type: "Grande Templo Sagrado",
        region: "Próximo a Belária",
        description:
          "Templo dedicado diretamente à Flor. Seus sacerdotes interpretam o avanço do Miasma como consequência das guerras, dos pecados ou do afastamento da humanidade da entidade. Muitos comandantes procuram bênçãos no templo antes de entrar em The Union.",
      },

      // =========================================================
      // ÁREA 3 DO MANIFESTO — LAGOS CLAROS
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-3",
        name: "Lagos Claros",
        image: "",
        type: "Região Lacustre",
        region: "Norte de Belária",
        description:
          "Nome coletivo dado aos dois lagos naturais da região. Ambos permanecem livres de contaminação conhecida e são utilizados para pesca, cerimônias religiosas e descanso.",
      },
      {
        collectionId: "dominio-manifesto-area-3",
        name: "Lago Alva",
        image: "",
        type: "Lago Natural",
        region: "Lagos Claros",
        description:
          "Lago de águas transparentes utilizado por pescadores e peregrinos. Cerimônias religiosas relacionadas à pureza e à Flor são realizadas em suas margens.",
      },
      {
        collectionId: "dominio-manifesto-area-3",
        name: "Lago Sereno",
        image: "",
        type: "Lago Natural",
        region: "Lagos Claros",
        description:
          "Lago menor e mais profundo, conhecido por permanecer praticamente imóvel mesmo durante tempestades. Sua profundidade real ainda não foi determinada.",
      },

      // =========================================================
      // ÁREA 3 DO MANIFESTO — PORTO BOREAL
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-3",
        name: "Porto Boreal",
        image: "",
        type: "Cidade Costeira Militarizada",
        region: "Extremo norte da Área 3 do Manifesto",
        description:
          "Cidade responsável por receber alimentos, reforços, armas e embarcações militares. A população civil convive diretamente com duas grandes instalações de defesa integradas ao território urbano.",
      },
      {
        collectionId: "dominio-manifesto-area-3",
        name: "Forte da Costa Fria",
        image: "",
        type: "Base Militar Terrestre",
        region: "Porto Boreal",
        description:
          "Base responsável pela defesa terrestre de Porto Boreal. Suas tropas protegem as estradas, os armazéns e as entradas da cidade contra monstros, invasores e indivíduos contaminados.",
      },
      {
        collectionId: "dominio-manifesto-area-3",
        name: "Arsenal Boreal",
        image: "",
        type: "Base Naval",
        region: "Porto Boreal",
        description:
          "Instalação responsável por patrulhas costeiras, transporte de tropas, manutenção de embarcações e proteção das rotas marítimas do norte.",
      },

      // =========================================================
      // ÁREA 3 DO SINDICATO — ENCLAVE EM THE UNION
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-3",
        name: "Enclave de Maré Sombria",
        image: "",
        type: "Território Separado do Sindicato",
        region: "Trecho territorial cercado por The Union",
        description:
          "Pequeno território do Sindicato separado da área principal pela zona unificada. Sua sobrevivência depende de rotas marítimas, suprimentos externos e acordos frágeis com os guerreiros de The Union.",
      },
      {
        collectionId: "sindicato-sombras-area-3",
        name: "Porto Cendal",
        image: "",
        type: "Cidade Costeira",
        region: "Enclave de Maré Sombria",
        description:
          "Pequena cidade que fornece alimentos, embarcações e suprimentos para o enclave. Sua população vive constantemente ameaçada pelas manifestações e criaturas de The Union.",
      },
      {
        collectionId: "sindicato-sombras-area-3",
        name: "Posto do Véu Fronteiriço",
        image: "",
        type: "Pequena Base Militar",
        region: "Fronteira do Enclave de Maré Sombria",
        description:
          "Base responsável por impedir que criaturas entrem em Porto Cendal e por controlar a passagem de soldados e aventureiros entre o enclave e The Union.",
      },

      // =========================================================
      // ÁREA 3 DO SINDICATO — FRONTEIRA PRINCIPAL
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-3",
        name: "Três Vigias do Vazio",
        image: "",
        type: "Complexo de Torres Defensivas",
        region: "Fronteira principal entre o Sindicato e The Union",
        description:
          "Três torres construídas para conter monstros vindos da zona unificada. Utilizam armadilhas, constructos sombrios e mecanismos ocultos, em vez das armas tradicionais empregadas pelo Manifesto.",
      },
      {
        collectionId: "sindicato-sombras-area-3",
        name: "Casa da Escada Oca",
        image: "",
        type: "Entrada Subterrânea Secreta",
        region: "Sul das Três Vigias do Vazio",
        description:
          "Pequena construção aparentemente abandonada que esconde a entrada para uma rede subterrânea utilizada pelo Sindicato.",
      },
      {
        collectionId: "sindicato-sombras-area-3",
        name: "Galerias do Subvéu",
        image: "",
        type: "Rede de Passagens Subterrâneas",
        region: "Entre o território do Sindicato e The Union",
        description:
          "Rede de túneis que atravessa a fronteira e possui duas saídas dentro de The Union. É utilizada para espionagem, transporte de agentes, retirada de feridos e movimentações não reconhecidas oficialmente.",
      },

      // =========================================================
      // ÁREA 3 DO SINDICATO — COSTA E PORTAL INSULAR
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-3",
        name: "Porto Umbral",
        image: "",
        type: "Cidade Costeira",
        region: "Costa da Área 3 do Sindicato",
        description:
          "Cidade de pescadores, marinheiros, contrabandistas e viajantes. Serve como principal ligação marítima entre as comunidades da região e a pequena ilha próxima.",
      },
      {
        collectionId: "sindicato-sombras-area-3",
        name: "Ilha do Limiar",
        image: "",
        type: "Ilha Estratégica",
        region: "Próxima a Porto Umbral",
        description:
          "Pequena ilha mantida sob vigilância do Sindicato. Seu acesso é restrito por abrigar uma estrutura importante da rede de portais.",
      },
      {
        collectionId: "sindicato-sombras-area-3",
        name: "Portal da Maré Escura",
        image: "",
        type: "Portal Oculto",
        region: "Ilha do Limiar",
        description:
          "Portal utilizado para transportar agentes, mensageiros e suprimentos sem atravessar as estradas próximas a The Union. Sua energia parece reagir à movimentação do Miasma no continente.",
      },

      // =========================================================
      // ÁREA 3 DO SINDICATO — CIDADES MONTANHOSAS
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-3",
        name: "Brumacorte",
        image: "",
        type: "Cidade Montanhosa",
        region: "Início das montanhas da Área 3 do Sindicato",
        description:
          "Pequena cidade habitada por mineiros, soldados e sobreviventes retirados das regiões contaminadas. É conhecida principalmente pela instituição que abriga pessoas mentalmente afetadas pelo Miasma.",
      },
      {
        collectionId: "sindicato-sombras-area-3",
        name: "Sanatório do Véu Partido",
        image: "",
        type: "Instituição de Isolamento e Tratamento",
        region: "Brumacorte",
        description:
          "Instituição destinada a pessoas que perderam a sanidade após longos períodos de exposição ao Miasma. Alguns pacientes apresentam memórias desconhecidas, vozes sobrepostas, visões e reações incomuns aos portais.",
      },
      {
        collectionId: "sindicato-sombras-area-3",
        name: "Umbrel",
        image: "",
        type: "Cidade do Sindicato",
        region: "Leste de Brumacorte",
        description:
          "Cidade de passagem entre a costa, as montanhas e os territórios mais afastados. Mercadores, soldados e agentes utilizam Umbrel como ponto de descanso e reabastecimento.",
      },

      // =========================================================
      // ÁREA 3 DO SINDICATO — EXTREMO LESTE
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-3",
        name: "Berço Latente",
        image: "",
        type: "Zona de Risco de Miasma",
        region: "Extremo leste da Área 3 do Sindicato",
        description:
          "Região montanhosa onde instrumentos, criaturas e usuários sensíveis detectam sinais de uma possível manifestação de Miasma. Pequenos tremores e manchas roxas surgem periodicamente entre as pedras.",
      },
      {
        collectionId: "sindicato-sombras-area-3",
        name: "Portal do Pico Oco",
        image: "",
        type: "Portal Oculto",
        region: "Montanhas do extremo leste",
        description:
          "Portal escondido em uma caverna profunda. Sua proximidade com o Berço Latente torna qualquer ativação especialmente perigosa.",
      },

      // =========================================================
      // THE UNION — SETOR OESTE
      // =========================================================

      {
        collectionId: "the-union-area-3",
        name: "Boca Ocidental do Subvéu",
        image: "",
        type: "Saída Subterrânea Secreta",
        region: "Extremo oeste de The Union",
        description:
          "Primeira saída das Galerias do Subvéu. É utilizada por agentes do Sindicato para entrar na zona unificada sem atravessar os postos oficiais.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Acampamento das Cinco Marcas",
        image: "",
        type: "Acampamento Misto",
        region: "Oeste de The Union",
        description:
          "Acampamento habitado por usuários das cinco Marcas. Cada grupo mantém seus próprios líderes, alojamentos e interesses, mas todos cooperam para combater criaturas e manifestações de Miasma.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Acampamento da Lança Partida",
        image: "",
        type: "Acampamento de Aventureiros",
        region: "Próximo ao Acampamento das Cinco Marcas",
        description:
          "Acampamento formado principalmente por mercenários, caçadores de monstros e sobreviventes sem ligação oficial com governos. Seu nome vem de uma lança quebrada fincada no centro após uma grande batalha.",
      },

      // =========================================================
      // THE UNION — NÚCLEO DE MIASMA
      // =========================================================

      {
        collectionId: "the-union-area-3",
        name: "Núcleo Violeta",
        image: "",
        type: "Zona de Miasma Intenso",
        region: "Interior de The Union",
        description:
          "Ponto onde o Miasma apresenta a maior concentração conhecida da região. Criaturas surgem com frequência, habilidades tornam-se instáveis e o próprio ambiente pode mudar de forma repentina.",
      },

      // =========================================================
      // THE UNION — FORTALEZA E ACAMPAMENTOS
      // =========================================================

      {
        collectionId: "the-union-area-3",
        name: "Fortaleza de Solbruma",
        image: "",
        type: "Fortaleza do Manifesto em Território Unificado",
        region: "Setor oriental de The Union",
        description:
          "Fortaleza construída pelo Manifesto para apoiar o Forte do Limiar Dourado. Apesar de pertencer à facção, precisa receber representantes de diferentes territórios, provocando conflitos sobre comando, recursos e acesso.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Campo da Vigília Comum",
        image: "",
        type: "Acampamento Militar Misto",
        region: "Norte da Fortaleza de Solbruma",
        description:
          "Acampamento ocupado por soldados enviados oficialmente pelas diferentes facções. Possui regras rígidas destinadas a impedir confrontos entre os próprios defensores.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Campo dos Estandartes",
        image: "",
        type: "Acampamento de Reforços",
        region: "Próximo ao Campo da Vigília Comum",
        description:
          "Acampamento onde cada facção mantém seu próprio estandarte e setor. Os grupos compartilham muralhas, enfermaria, depósitos e pontos de observação.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Boca Oriental do Subvéu",
        image: "",
        type: "Saída Subterrânea Secreta",
        region: "Próxima à Fortaleza de Solbruma",
        description:
          "Segunda saída das Galerias do Subvéu. Sua posição permite que agentes do Sindicato observem movimentações próximas à fortaleza sem atravessar os postos oficiais.",
      },

      // =========================================================
      // THE UNION — CIDADE ABANDONADA
      // =========================================================

      {
        collectionId: "the-union-area-3",
        name: "Claralume, a Cidade Vazia",
        image: "",
        type: "Cidade Abandonada do Manifesto",
        region: "Extremo norte de The Union",
        description:
          "Antiga cidade do Manifesto completamente vazia. As construções permanecem de pé e objetos foram deixados dentro das casas, mas não existem sinais claros de batalha. A população desapareceu ou abandonou o local repentinamente.",
      },

      // =========================================================
      // TERRITÓRIO NEUTRO — ILHA DA LÁGRIMA CLARA
      // =========================================================

      {
        collectionId: "fronteira-area-3",
        name: "Ilha da Lágrima Clara",
        image: "",
        type: "Ilha Neutra de Recuperação",
        region: "Costa norte de The Union",
        description:
          "Ilha em formato de gota reconhecida por diferentes facções como uma área sem combate. Guerreiros expostos ao Miasma são enviados para o local antes de retornarem aos seus territórios.",
      },
      {
        collectionId: "fronteira-area-3",
        name: "Casa do Repouso",
        image: "",
        type: "Hospital Neutro",
        region: "Ilha da Lágrima Clara",
        description:
          "Instituição onde curandeiros e estudiosos de diferentes Marcas tratam guerreiros, civis e contaminados retirados de The Union. Alguns pacientes permanecem em quarentena por longos períodos.",
      },
      {
        collectionId: "fronteira-area-3",
        name: "Farol da Última Vigília",
        image: "",
        type: "Farol",
        region: "Ilha da Lágrima Clara",
        description:
          "Grande farol utilizado para orientar embarcações durante tempestades e manifestações de Miasma. Sua luz pode ser vista a partir dos acampamentos do norte de The Union.",
      },
      {
        collectionId: "fronteira-area-3",
        name: "Jardim dos Ausentes",
        image: "",
        type: "Memorial",
        region: "Ilha da Lágrima Clara",
        description:
          "Jardim dedicado às pessoas desaparecidas em The Union cujos corpos nunca foram encontrados. Cada monumento representa um desaparecido registrado pelas facções.",
      },
    ],

    npcs: [
      // =========================================================
      // ÁREA 1 DO MANIFESTO — FAMÍLIA REAL E PERSONAGENS CENTRAIS
      // =========================================================

      {
        collectionId: "dominio-manifesto",
        name: "Eleonora, a Donzela",
        image: flower,
        brand: "Manifesto e Oculto",
        race: "Humana",
        occupation: "Herdeira da Linhagem Principal",
        personality:
          "Determinada, idealista e inconsequente. Acredita que revelar a verdade pode impedir uma guerra, mesmo que isso destrua sua imagem e coloque sua família em perigo.",
        secret:
          "Possui duas Marcas. A Marca do Manifesto está em seu pescoço, enquanto a Marca do Oculto permanece escondida em seu ombro esquerdo.",
        description:
          "Filha de Henrietta e Elio e figura central da campanha. Sua localização inicial é a Cidade Catedral, durante o Festival da Flor. Após sua revelação, seu destino dependerá das decisões dos jogadores e das facções.",
        skills:
          "Autoridade Real. Luz Nobre. Dupla Marca. Resistência ao Miasma. Presença da Donzela.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Henrietta, a Rainha",
        image: "",
        brand: "Manifesto",
        race: "Humana",
        occupation: "Rainha do Manifesto",
        personality:
          "Controlada, imponente e profundamente consciente do peso de sua linhagem. Demonstra pouco afeto em público, mesmo pelas pessoas que deseja proteger.",
        secret:
          "Conhece informações sobre a origem da linhagem real, o sangue dos dragões e o desaparecimento de Elio que jamais revelou à própria filha.",
        description:
          "Rainha da linhagem principal e mãe de Eleonora. Governa a partir do Castelo da Coroa Áurea e tenta preservar a estabilidade do Manifesto enquanto a família real começa a se fragmentar.",
        skills:
          "Comando Real. Luz Sagrada. Vontade Inabalável. Sangue Nobre. Decreto da Coroa.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Elio, o Rei Ausente",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Rei Desaparecido do Manifesto",
        personality:
          "Gentil, curioso e menos preocupado com tradições do que os demais integrantes da linhagem principal.",
        secret:
          "Seu desaparecimento está relacionado a uma investigação que realizava sobre as raízes da Flor, o Miasma persistente e atividades escondidas dentro do Manifesto.",
        description:
          "Pai de Eleonora e marido de Henrietta. Desapareceu antes do início da campanha, deixando poucas pistas e versões contraditórias sobre seu destino. Pode aparecer em diferentes momentos conforme o desenvolvimento da história.",
        skills:
          "Luz do Soberano. Proteção Real. Investigação Arcana. Resistência Dracônica.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Uriel, o Luminar",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Mago da Família Real",
        personality:
          "Inteligente, vaidoso e teatral. Gosta de demonstrar conhecimento, mas evita situações em que possa perder o controle.",
        secret:
          "Descobriu registros sobre manifestações incomuns da Marca do Manifesto e suspeita que Eleonora não seja o primeiro membro da família a possuir uma segunda Marca.",
        description:
          "Primo de Eleonora e irmão de Rose. Atua como estudioso e representante mágico da família real, circulando entre a Cidade Catedral, Songbird e Auréon.",
        skills:
          "Círculo Luminoso. Barreira Prismática. Selo Real. Leitura de Marcas.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Alba, a Sábia",
        image: "",
        brand: "Manifesto",
        race: "Humana",
        occupation: "Conselheira Real e Pesquisadora",
        personality:
          "Serena, observadora e cuidadosa com as palavras. Prefere compreender seus adversários antes de condená-los.",
        secret:
          "Mantém uma relação amorosa secreta com Nyx, uma das principais autoridades do Sindicato.",
        description:
          "Irmã de Henrietta e tia de Eleonora. Atua como conselheira da família real e pode tentar proteger a Donzela quando o restante da corte exigir medidas mais violentas.",
        skills:
          "Memória Radiante. Análise de Marca. Luz Reveladora. Conselho Sereno.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Rose, a Arauta",
        image: "",
        brand: "Entoadora",
        race: "Humana",
        occupation: "Arauta da Família Real",
        personality:
          "Expressiva, carismática e extremamente cuidadosa com sua reputação pública.",
        secret:
          "Conhece antecipadamente parte do pronunciamento de Eleonora, mas acredita que a Donzela revelará apenas informações aprovadas pela família.",
        description:
          "Irmã de Uriel e responsável por anúncios, cerimônias e apresentações ligadas à família real. Costuma circular entre Songbird e a Cidade Catedral.",
        skills:
          "Voz da Coroa. Canto de Atenção. Eco Majestoso. Presença de Palco.",
      },

      // =========================================================
      // ÁREA 1 DO MANIFESTO — CIDADE CATEDRAL
      // =========================================================

      {
        collectionId: "dominio-manifesto",
        name: "Vasil, o Astuto",
        image: "",
        brand: "Maso",
        race: "Antropomórfico — Ave",
        occupation: "Guia da Cidade Catedral",
        personality:
          "Carismático, eloquente e sempre atento. Finge admirar profundamente a monarquia, mesmo sendo desprezado por parte da nobreza.",
        secret:
          "É um dos melhores espiões do Sindicato dentro do território do Manifesto e mantém uma rede de informantes entre trabalhadores, peregrinos e comerciantes.",
        description:
          "Guia urbano que conhece caminhos, rumores e pessoas importantes da Cidade Catedral. Pode acompanhar os jogadores durante o Festival ou reaparecer em outras regiões conforme sua missão de espionagem.",
        skills:
          "Olhar de Pássaro. Fuga Rápida. Fala Persuasiva. Rede de Informantes.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Padre Solenne",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Orador da Flor",
        personality:
          "Sereno, carismático e aparentemente compreensivo. Torna-se perigoso quando a autoridade religiosa é questionada.",
        secret:
          "Manipula interpretações religiosas para proteger a imagem do Manifesto e desacreditar testemunhas consideradas inconvenientes.",
        description:
          "Uma das principais figuras religiosas da Cidade Catedral. Seus sermões ajudam a consolidar a fé popular na família real e terão grande influência após a revelação de Eleonora.",
        skills:
          "Sermão Radiante. Persuasão Sagrada. Julgamento Público. Voz da Doutrina.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Cael Varros",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Capitão da Ponte da Catedral",
        personality:
          "Disciplinado, desconfiado e comprometido com os protocolos de segurança.",
        secret:
          "Recebeu uma lista secreta de convidados que devem ser observados ou detidos caso tentem deixar a Cidade Catedral após o Festival.",
        description:
          "Comanda os guardas responsáveis pela Ponte da Catedral. Durante o Festival, precisa lidar com documentos falsificados, visitantes da Marca Oculto e ordens contraditórias vindas da família real.",
        skills:
          "Comando de Guarda. Bloqueio Radiante. Inspeção Rigorosa. Formação de Ponte.",
      },

      // =========================================================
      // ÁREA 1 DO MANIFESTO — MARÉ BAIXA
      // =========================================================

      {
        collectionId: "dominio-manifesto",
        name: "Dylan",
        image: "",
        brand: "Maso",
        race: "Antropomórfico — Peixe",
        occupation: "Pedreiro e Trabalhador Costeiro",
        personality:
          "Trabalhador, direto e desconfiado de autoridades. Demonstra lealdade intensa às pessoas que conquistam sua confiança.",
        secret:
          "Participou das obras iniciais da Cidade Catedral e viu trabalhadores atingirem partes das raízes da Flor. Um de seus antigos colegas desapareceu após tentar revelar o ocorrido.",
        description:
          "Morador de Maré Baixa com corpo humanoide, escamas, guelras e características de peixe. Conhece detalhes sobre as construções próximas à Flor e possui um irmão gêmeo chamado Dylon no território do Sindicato.",
        skills:
          "Força de Maré. Respiração Aquática. Trabalho em Pedra. Memória das Obras.",
      },

      // =========================================================
      // ÁREA 1 DO MANIFESTO — SONGBIRD
      // =========================================================

      {
        collectionId: "dominio-manifesto",
        name: "Celianne, a Maestra",
        image: "",
        brand: "Entoadora",
        race: "Humana",
        occupation: "Diretora Principal das Escolas de Songbird",
        personality:
          "Elegante, exigente e maternal apenas quando ninguém está olhando.",
        secret:
          "Recebe ordens do Manifesto para monitorar jovens Entoadoras com potencial de manifestar Anjos ou habilidades consideradas perigosas.",
        description:
          "Principal autoridade das escolas de Songbird. Entre apresentações, aulas e reuniões políticas, mantém as instituições alinhadas aos interesses do Manifesto.",
        skills:
          "Canto de Comando. Harmonia Curativa. Voz Paralisante. Autoridade de Palco.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Octa, o Compositor",
        image: "",
        brand: "Entoadora",
        race: "Humano",
        occupation: "Compositor de Songbird",
        personality:
          "Excêntrico, perfeccionista e sempre distraído por melodias que apenas ele parece ouvir.",
        secret:
          "Compôs parte de uma melodia após ouvi-la em sonhos provocados pelo Miasma. As notas se parecem com uma partitura proibida guardada no Castelo das Entoadoras.",
        description:
          "Compositor respeitado de Songbird e colaborador frequente das escolas. Pode auxiliar ou colocar os jogadores em perigo ao tentar completar sua nova obra.",
        skills:
          "Melodia Persistente. Inspiração Súbita. Eco Emocional. Memória Musical.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Rogue",
        image: "",
        brand: "Entoadora",
        race: "Humana",
        occupation: "Estudante de Songbird",
        personality:
          "Curiosa, talentosa, impulsiva e resistente a qualquer forma de autoridade.",
        secret:
          "Encontrou uma partitura rasgada em uma sala proibida e consegue cantar algumas de suas notas sem sofrer os efeitos esperados.",
        description:
          "Estudante de uma das Três Escolas de Songbird. Pode envolver os jogadores em rivalidades escolares, apresentações sabotadas ou no desaparecimento de outra aluna.",
        skills:
          "Nota Aguda. Canto de Distração. Improviso. Sensibilidade Angelical.",
      },

      // =========================================================
      // ÁREA 1 DO MANIFESTO — FORÇAS MILITARES
      // =========================================================

      {
        collectionId: "dominio-manifesto",
        name: "Darius Vell",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Comandante Militar",
        personality:
          "Rígido, disciplinado e leal à imagem pública do Manifesto.",
        secret:
          "Recebeu ordens para ocultar relatórios sobre movimentações estranhas próximas à Cratera do Último Miasma.",
        description:
          "Comandante responsável por tropas e bases militares da Área 1. Costuma circular entre Forte Lúmen, Forte das Vigílias, Auréon e o Acampamento dos Errantes.",
        skills:
          "Lâmina Solar. Formação Defensiva. Intimidação Militar. Disciplina de Ferro.",
      },

      // =========================================================
      // ÁREA 1 DO MANIFESTO — REGIÃO DA CRATERA
      // =========================================================

      {
        collectionId: "regiao-cratera",
        name: "Garruk",
        image: "",
        brand: "Maso",
        race: "Humano",
        occupation: "Líder de Campo dos Errantes",
        personality:
          "Bruto, protetor e desconfiado de qualquer autoridade nobre.",
        secret:
          "Pretende atravessar o Miasma mesmo sem autorização, pois acredita que uma pessoa próxima ainda está viva dentro da cratera.",
        description:
          "Um dos líderes mais respeitados do Acampamento dos Errantes. Representa aventureiros, sobreviventes e guerreiros que rejeitam o controle do Manifesto.",
        skills:
          "Força Anômala. Rugido de Guerra. Resistência Bruta. Proteção Instintiva.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Bendit",
        image: "",
        brand: "Respiração",
        race: "Humano",
        occupation: "Observador Oficial do Manifesto",
        personality:
          "Paciente, formal e dedicado à prevenção de riscos. É frequentemente confundido com alguém covarde por evitar expedições impulsivas.",
        secret:
          "Descobriu que alguns relatórios enviados ao Manifesto estão sendo alterados antes de chegarem aos comandantes.",
        description:
          "Autoridade enviada pelo Manifesto para registrar expedições, observar os guerreiros e impedir tentativas descontroladas de atravessar o Miasma da cratera.",
        skills:
          "Respiração da Terra. Passo Firme. Controle de Multidão. Leitura de Terreno.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Ash",
        image: "",
        brand: "Sem Marca",
        race: "Humano",
        occupation: "Artesão e Reparador de Armas",
        personality:
          "Sarcástico, habilidoso e pouco impressionado por guerreiros ou títulos nobres.",
        secret:
          "Utilizou um cristal retirado da Cratera em uma encomenda. A arma desapareceu junto com o cliente que a recebeu.",
        description:
          "Artesão de Rochaviva especializado na criação e no reparo de equipamentos para aventureiros. Sua habilidade prova que pessoas sem Marca ainda podem exercer funções decisivas.",
        skills:
          "Forja Precisa. Reparação de Campo. Análise de Material. Improvisação Mecânica.",
      },

      // =========================================================
      // ÁREA 1 DO MANIFESTO — EXTREMO NORTE
      // =========================================================

      {
        collectionId: "dominio-manifesto",
        name: "Elric, o Espadachim",
        image: "",
        brand: "Respiração",
        race: "Elfo",
        occupation: "Mestre Espadachim de Seiran",
        personality:
          "Reservado, paciente e extremamente exigente com quem deseja aprender suas técnicas.",
        secret:
          "Reconhece padrões no Miasma da cratera semelhantes aos encontrados em ruínas protegidas por sua antiga ordem.",
        description:
          "Raro elfo que vive entre os samurais de Seiran. Sua idade e experiência fazem com que conheça acontecimentos que foram esquecidos por comunidades humanas.",
        skills:
          "Respiração do Céu. Corte Sereno. Longevidade Élfica. Percepção Natural.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Kaori Minazuki",
        image: "",
        brand: "Respiração",
        race: "Humana",
        occupation: "Samurai Errante",
        personality: "Calma, observadora e extremamente disciplinada.",
        secret:
          "Investiga se o Miasma da cratera possui relação com antigas ruínas que sua comunidade deveria proteger.",
        description:
          "Guerreira originária de Seiran. Pode acompanhar os jogadores em expedições, viajar para outras áreas e atuar como ligação entre os samurais e as demais facções.",
        skills:
          "Respiração do Vento. Corte Silencioso. Passo Leve. Instinto do Caçador.",
      },

      // =========================================================
      // ÁREA 1 DO SINDICATO — LIDERANÇA E NOCTÁRIA
      // =========================================================

      {
        collectionId: "sindicato-sombras",
        name: "Veyr Noctis, o Regente",
        image: "",
        brand: "Oculto",
        race: "Humano",
        occupation: "Principal Regente do Sindicato",
        personality:
          "Paciente, diplomático e difícil de interpretar. Raramente demonstra surpresa ou raiva.",
        secret:
          "Conhece o verdadeiro custo da rede de portais e permite que pessoas sejam sacrificadas para preservar sua utilidade estratégica.",
        description:
          "Uma das figuras mais influentes do Sindicato e principal autoridade de Noctária. Defende publicamente os rejeitados, mas aceita atrocidades em nome da sobrevivência da facção.",
        skills:
          "Porta do Vazio. Constructo Sombrio. Véu de Silêncio. Ordem Oculta.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Mira, a Mensageira",
        image: "",
        brand: "Maso",
        race: "Humana",
        occupation: "Mensageira do Sindicato",
        personality: "Pragmática, rápida e cansada de promessas políticas.",
        secret:
          "Descobriu indícios de que cidadãos desaparecidos estão ligados à manutenção dos portais.",
        description:
          "Mensageira que percorre Noctária, Umbraford e outras regiões. Pode se tornar aliada dos jogadores caso perceba que eles investigam os desaparecimentos.",
        skills:
          "Corrida Instintiva. Sobrevivência. Rotas Secretas. Memória de Caminhos.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Nerys, o Guardião do Véu",
        image: "",
        brand: "Maso",
        race: "Humano",
        occupation: "Guardião da Rede de Portais",
        personality:
          "Frio, silencioso e obediente às decisões dos superiores do Sindicato.",
        secret:
          "Participa da seleção e do transporte das pessoas utilizadas para alimentar determinados portais.",
        description:
          "Autoridade encarregada de proteger informações e operações relacionadas à rede do Vazio. Pode ser encontrado em diferentes portais da Área 1.",
        skills:
          "Força do Guardião. Passagem Rápida. Interceptação. Resistência ao Vazio.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "O Mercador",
        image: "",
        brand: "Maso",
        race: "Humano",
        occupation: "Comerciante Itinerante",
        personality:
          "Educado, misterioso e excessivamente calmo, mesmo em situações perigosas.",
        secret:
          "Ninguém conhece sua origem, seu nome ou como consegue aparecer em locais separados por enormes distâncias. Talvez existam vários Mercadores, talvez ele utilize portais ou talvez sua Marca possua uma habilidade desconhecida.",
        description:
          "Comerciante cuja base declarada fica em Noctária, embora possa aparecer em qualquer ponto do mapa. Sempre possui um item útil, mas costuma exigir segredos, promessas ou favores como pagamento.",
        skills:
          "Estoque Improvável. Barganha Incomum. Aparição Oportuna. Leitura de Desejos.",
      },

      // =========================================================
      // ÁREA 1 DO SINDICATO — LAGO DO VÉU ROXO
      // =========================================================

      {
        collectionId: "sindicato-sombras",
        name: "Dylon",
        image: "",
        brand: "Respiração",
        race: "Antropomórfico — Peixe",
        occupation: "Explorador do Lago do Véu Roxo",
        personality:
          "Ousado, inquieto e fascinado por locais que outras pessoas consideram perigosos demais.",
        secret:
          "Viu uma estrutura sob a camada de Miasma do lago e ouviu sua própria voz chamando debaixo da água.",
        description:
          "Irmão gêmeo de Dylan, de Maré Baixa. Utiliza técnicas de Respiração para explorar as margens e suportar os efeitos do lago contaminado.",
        skills:
          "Respiração da Maré. Mergulho Profundo. Sentido Aquático. Resistência ao Frio.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Brutus",
        image: "",
        brand: "Oculto",
        race: "Humano",
        occupation: "Responsável pelo Acampamento do Véu",
        personality:
          "Agressivo na aparência, prático e surpreendentemente protetor com exploradores inexperientes.",
        secret:
          "Mantém uma criatura retirada do lago presa em uma instalação improvisada, esperando descobrir se ela ainda possui consciência.",
        description:
          "Organiza expedições, distribui recursos e controla conflitos dentro do Acampamento do Véu. Sua autoridade surgiu por necessidade, não por nomeação oficial.",
        skills:
          "Correntes Sombrias. Ordem de Retirada. Véu Protetor. Intimidação.",
      },

      // =========================================================
      // ÁREA 1 DO SINDICATO — COSTA E PORTAIS
      // =========================================================

      {
        collectionId: "sindicato-sombras",
        name: "Taira",
        image: "",
        brand: "Maso",
        race: "Humana",
        occupation: "Pescadora Aposentada",
        personality:
          "Paciente, teimosa e irônica. Trata visitantes mais jovens como crianças despreparadas.",
        secret:
          "Consegue identificar ativações dos portais observando mudanças no mar, nas aves e na direção dos ventos.",
        description:
          "Moradora idosa de Vila Névoa Baixa. Conhece histórias da costa, rotas de contrabando e acontecimentos que as autoridades preferem ignorar.",
        skills:
          "Instinto Marítimo. Resistência Física. Conhecimento Costeiro. Olhar Experiente.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Astrid",
        image: "",
        brand: "Oculto",
        race: "Humana",
        occupation: "Agente da Rede do Vazio",
        personality:
          "Metódica, discreta e desconfiada até mesmo de seus próprios superiores.",
        secret:
          "Começou a investigar por conta própria o desaparecimento de pessoas utilizadas na estabilização dos portais.",
        description:
          "Agente operacional que conhece os três portais da Área 1. Transporta mensagens, materiais e pessoas pela Cordilheira Silente.",
        skills:
          "Passagem Sombria. Selo de Portal. Ocultação. Rastreamento de Energia.",
      },

      // =========================================================
      // PERSONAGENS GENÉRICOS — MANIFESTO
      // =========================================================

      {
        collectionId: "personagens-genericos",
        name: "Guarda da Cidade Catedral",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Guarda Urbano",
        personality:
          "Disciplinado e atento. Sua postura depende das ordens recebidas e da reputação dos jogadores.",
        secret:
          "Pode conhecer rumores sobre convidados observados, acessos bloqueados ou ordens incomuns emitidas durante o Festival.",
        description:
          "Modelo reutilizável para guardas da Ponte da Catedral, da Praça da Flor e das entradas do castelo.",
        skills: "Inspeção. Lança Radiante. Formação de Guarda. Alerta.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Soldado do Manifesto",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Soldado",
        personality:
          "Obediente, treinado e acostumado a seguir a hierarquia militar.",
        secret:
          "Pode discordar de uma ordem recente ou ter presenciado algo que foi removido dos relatórios oficiais.",
        description:
          "Modelo reutilizável para soldados de bases, fortes, patrulhas e acampamentos do Manifesto.",
        skills: "Formação Militar. Lança de Luz. Defesa Coordenada. Marcha.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Cavaleiro do Manifesto",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Cavaleiro",
        personality: "Orgulhoso, formal e protetor da tradição real.",
        secret: "Pode ter recebido uma missão privada de um membro da nobreza.",
        description:
          "Modelo reutilizável para guerreiros de elite que escoltam nobres, protegem castelos e lideram pequenos grupos militares.",
        skills:
          "Espada Radiante. Investida. Proteção Nobre. Comando de Esquadrão.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Sacerdote da Flor",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Sacerdote",
        personality:
          "Devoto, solene e dedicado aos ensinamentos oficiais da Flor.",
        secret:
          "Pode conhecer uma interpretação religiosa proibida ou discordar silenciosamente do Padre Solenne.",
        description:
          "Modelo reutilizável para sacerdotes, pregadores e responsáveis por cerimônias religiosas.",
        skills:
          "Bênção Radiante. Sermão. Conhecimento Religioso. Primeiros Socorros.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Homem Nobre do Manifesto",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Nobre",
        personality:
          "Educado em público, preocupado com reputação e acostumado a privilégios.",
        secret:
          "Pode possuir dívidas, alianças políticas escondidas ou relações com o Sindicato.",
        description:
          "Modelo reutilizável para homens pertencentes às famílias nobres do Manifesto.",
        skills:
          "Etiqueta. Influência Política. Persuasão. Conhecimento da Corte.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Mulher Nobre do Manifesto",
        image: "",
        brand: "Manifesto",
        race: "Humana",
        occupation: "Nobre",
        personality: "Elegante, observadora e cuidadosa com as palavras.",
        secret:
          "Pode esconder uma rivalidade familiar, uma aliança proibida ou informações sobre a linhagem real.",
        description:
          "Modelo reutilizável para mulheres pertencentes às famílias nobres do Manifesto.",
        skills:
          "Etiqueta. Influência Política. Leitura Social. Conhecimento da Corte.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Trabalhador da Cidade Catedral",
        image: "",
        brand: "Variável",
        race: "Variável",
        occupation: "Trabalhador",
        personality:
          "Cansado, prático e acostumado a permanecer longe dos assuntos da nobreza.",
        secret:
          "Pode ter visto acidentes, danos às raízes ou movimentações realizadas durante a construção da cidade.",
        description:
          "Modelo reutilizável para pedreiros, carregadores, construtores e trabalhadores responsáveis pelas obras da Cidade Catedral.",
        skills:
          "Trabalho Pesado. Conhecimento das Obras. Improvisação. Resistência.",
      },

      // =========================================================
      // PERSONAGENS GENÉRICOS — SONGBIRD
      // =========================================================

      {
        collectionId: "personagens-genericos",
        name: "Estudante Entoadora",
        image: "",
        brand: "Entoadora",
        race: "Humana",
        occupation: "Estudante",
        personality:
          "Ambiciosa, curiosa e preocupada com avaliações e apresentações.",
        secret:
          "Pode conhecer rumores sobre rivalidades, professoras ou salas proibidas das escolas.",
        description:
          "Modelo reutilizável para jovens estudantes das Três Escolas de Songbird.",
        skills: "Canto Básico. Controle da Voz. Harmonia. Apresentação.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Professora Entoadora",
        image: "",
        brand: "Entoadora",
        race: "Humana",
        occupation: "Professora de Songbird",
        personality:
          "Exigente, controlada e atenta ao potencial das estudantes.",
        secret:
          "Pode estar protegendo ou denunciando uma jovem Entoadora com habilidades incomuns.",
        description:
          "Modelo reutilizável para professoras, instrutoras e responsáveis pelas escolas de Songbird.",
        skills:
          "Canto de Comando. Harmonia. Avaliação Musical. Controle Emocional.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Artista de Songbird",
        image: "",
        brand: "Entoadora",
        race: "Variável",
        occupation: "Artista",
        personality: "Expressivo, competitivo e preocupado com reconhecimento.",
        secret:
          "Pode estar envolvido em sabotagens, contratos secretos ou apresentações politicamente manipuladas.",
        description:
          "Modelo reutilizável para cantores, músicos, atores e artistas de Songbird.",
        skills:
          "Performance. Persuasão Artística. Improviso. Presença de Palco.",
      },

      // =========================================================
      // PERSONAGENS GENÉRICOS — CIDADES COSTEIRAS
      // =========================================================

      {
        collectionId: "personagens-genericos",
        name: "Morador de Cidade Costeira",
        image: "",
        brand: "Variável",
        race: "Variável",
        occupation: "Morador Local",
        personality:
          "Desconfiado com estrangeiros, mas conhecedor das rotas e costumes locais.",
        secret:
          "Pode conhecer um rumor, uma embarcação suspeita ou uma rota clandestina.",
        description:
          "Modelo reutilizável para homens que vivem em vilas e cidades costeiras.",
        skills:
          "Conhecimento Local. Pesca Básica. Navegação Costeira. Percepção do Clima.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Moradora de Cidade Costeira",
        image: "",
        brand: "Variável",
        race: "Variável",
        occupation: "Moradora Local",
        personality:
          "Prática, observadora e acostumada às dificuldades da vida costeira.",
        secret:
          "Pode ter visto uma embarcação desaparecida, agentes clandestinos ou sinais de Miasma no oceano.",
        description:
          "Modelo reutilizável para mulheres que vivem em vilas e cidades costeiras.",
        skills:
          "Conhecimento Local. Comércio Costeiro. Navegação Básica. Percepção do Clima.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Criança de Cidade Costeira",
        image: "",
        brand: "Sem Marca",
        race: "Variável",
        occupation: "Criança",
        personality:
          "Curiosa, inquieta e pouco preocupada com os perigos que os adultos evitam.",
        secret:
          "Pode ter encontrado um objeto estranho na praia ou visto algo que ninguém acredita.",
        description:
          "Modelo reutilizável para crianças das comunidades costeiras.",
        skills:
          "Furtividade Infantil. Conhecimento de Atalhos. Curiosidade. Observação.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Pescador",
        image: "",
        brand: "Variável",
        race: "Variável",
        occupation: "Pescador",
        personality: "Paciente, supersticioso e atento às mudanças do mar.",
        secret:
          "Pode conhecer locais onde criaturas, destroços ou sinais de Miasma foram encontrados.",
        description:
          "Modelo reutilizável para pescadores de Maré Baixa, Ventomar, Névoa Baixa e outros portos.",
        skills: "Pesca. Navegação. Leitura do Mar. Sobrevivência Costeira.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Marinheira",
        image: "",
        brand: "Variável",
        race: "Variável",
        occupation: "Marinheira",
        personality:
          "Confiante, prática e acostumada a lidar com viajantes perigosos.",
        secret:
          "Pode realizar contrabando ou transportar pessoas sem registrar seus nomes.",
        description:
          "Modelo reutilizável para marinheiras, tripulantes e responsáveis por embarcações.",
        skills:
          "Navegação. Manutenção Naval. Combate a Bordo. Leitura de Rotas.",
      },

      // =========================================================
      // PERSONAGENS GENÉRICOS — REGIÃO DA CRATERA
      // =========================================================

      {
        collectionId: "personagens-genericos",
        name: "Aventureiro dos Errantes",
        image: "",
        brand: "Variável",
        race: "Variável",
        occupation: "Aventureiro",
        personality:
          "Corajoso, imprudente e motivado por glória, dinheiro ou respostas.",
        secret:
          "Pode estar planejando entrar em uma área proibida sem autorização.",
        description:
          "Modelo reutilizável para aventureiros reunidos no Acampamento dos Errantes.",
        skills:
          "Sobrevivência. Combate Improvisado. Exploração. Resistência ao Medo.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Mercenária dos Errantes",
        image: "",
        brand: "Variável",
        race: "Variável",
        occupation: "Mercenária",
        personality:
          "Pragmática, desconfiada e interessada em contratos claros.",
        secret:
          "Pode ter sido contratada para recuperar uma pessoa ou objeto dentro da região contaminada.",
        description:
          "Modelo reutilizável para mercenárias e caçadoras que atuam perto da cratera.",
        skills: "Combate Armado. Rastreamento. Negociação. Retirada Rápida.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Guerreiro de Rochaviva",
        image: "",
        brand: "Maso",
        race: "Variável",
        occupation: "Guerreiro",
        personality:
          "Orgulhoso, competitivo e desconfiado de ordens vindas do Manifesto.",
        secret:
          "Pode possuir um estilo de luta proibido ou ter participado de uma expedição não registrada.",
        description:
          "Modelo reutilizável para os numerosos guerreiros da Marca Maso encontrados em Rochaviva.",
        skills:
          "Estilo Próprio. Resistência Bruta. Ataque Instintivo. Intimidação.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Artesã de Rochaviva",
        image: "",
        brand: "Variável",
        race: "Variável",
        occupation: "Artesã",
        personality: "Criativa, direta e acostumada a clientes difíceis.",
        secret:
          "Pode trabalhar com materiais retirados ilegalmente da Cratera.",
        description:
          "Modelo reutilizável para ferreiras, costureiras, inventoras e reparadoras de Rochaviva.",
        skills: "Artesanato. Reparação. Avaliação de Materiais. Improvisação.",
      },

      // =========================================================
      // PERSONAGENS GENÉRICOS — SINDICATO
      // =========================================================

      {
        collectionId: "personagens-genericos",
        name: "Soldado do Sindicato",
        image: "",
        brand: "Variável",
        race: "Variável",
        occupation: "Soldado",
        personality:
          "Prático, desconfiado e acostumado a operar com poucos recursos.",
        secret:
          "Pode conhecer uma operação secreta, uma movimentação de agentes ou um desaparecimento recente.",
        description:
          "Modelo reutilizável para soldados das bases, acampamentos e patrulhas do Sindicato.",
        skills:
          "Combate Coordenado. Emboscada. Sobrevivência. Defesa Improvisada.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Agente do Sindicato",
        image: "",
        brand: "Oculto",
        race: "Variável",
        occupation: "Agente",
        personality:
          "Discreto, observador e treinado para esconder suas intenções.",
        secret:
          "Pode possuir uma identidade falsa ou trabalhar para mais de uma autoridade.",
        description:
          "Modelo reutilizável para espiões, investigadores e operadores clandestinos do Sindicato.",
        skills: "Disfarce. Ocultação. Coleta de Informações. Fuga.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Guarda de Portal",
        image: "",
        brand: "Oculto",
        race: "Variável",
        occupation: "Guardião de Portal",
        personality:
          "Silencioso, vigilante e pouco disposto a responder perguntas.",
        secret:
          "Pode conhecer parte do verdadeiro custo necessário para ativar o portal protegido.",
        description:
          "Modelo reutilizável para guardas posicionados nos portais da Cordilheira Silente.",
        skills:
          "Defesa Umbral. Alerta de Energia. Bloqueio de Passagem. Silêncio.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Comerciante de Noctária",
        image: "",
        brand: "Variável",
        race: "Variável",
        occupation: "Comerciante",
        personality:
          "Persuasivo, cuidadoso e disposto a negociar quase qualquer mercadoria.",
        secret:
          "Pode vender produtos roubados, informações ou objetos vindos dos portais.",
        description:
          "Modelo reutilizável para comerciantes dos mercados e túneis de Noctária.",
        skills: "Barganha. Avaliação de Item. Contatos Locais. Persuasão.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Morador de Noctária",
        image: "",
        brand: "Variável",
        race: "Variável",
        occupation: "Morador Local",
        personality:
          "Adaptável, desconfiado de autoridades e acostumado à diversidade da cidade.",
        secret:
          "Pode conhecer passagens subterrâneas, mercados clandestinos ou pessoas desaparecidas.",
        description:
          "Modelo reutilizável para homens que vivem nos bairros de Noctária.",
        skills:
          "Conhecimento Urbano. Rotas Subterrâneas. Sobrevivência. Contatos.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Moradora de Noctária",
        image: "",
        brand: "Variável",
        race: "Variável",
        occupation: "Moradora Local",
        personality:
          "Atenta, resistente e pouco impressionada por ameaças políticas.",
        secret:
          "Pode esconder um refugiado, um agente ou informações sobre os desaparecimentos.",
        description:
          "Modelo reutilizável para mulheres que vivem nos bairros de Noctária.",
        skills:
          "Conhecimento Urbano. Rotas Subterrâneas. Persuasão Local. Sobrevivência.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Contrabandista",
        image: "",
        brand: "Variável",
        race: "Variável",
        occupation: "Contrabandista",
        personality: "Cauteloso, oportunista e sempre preparado para fugir.",
        secret:
          "Pode trabalhar para o Manifesto, o Sindicato ou ambos, dependendo do pagamento.",
        description:
          "Modelo reutilizável para pessoas que transportam mercadorias e viajantes pelas rotas clandestinas.",
        skills: "Rotas Secretas. Ocultação de Carga. Barganha. Fuga.",
      },
      {
        collectionId: "personagens-genericos",
        name: "Explorador do Véu",
        image: "",
        brand: "Variável",
        race: "Variável",
        occupation: "Explorador",
        personality: "Curioso, cauteloso e habituado a ambientes contaminados.",
        secret:
          "Pode ter trazido do Lago do Véu Roxo um objeto ou criatura que deveria ter permanecido no local.",
        description:
          "Modelo reutilizável para exploradores, estudiosos e aventureiros do Acampamento do Véu.",
        skills:
          "Exploração. Resistência ao Miasma. Coleta de Amostras. Orientação.",
      },

      // =========================================================
      // ÁREA 2 DO MANIFESTO — PLANÍCIE DE VIDRO E PRISMÁRIA
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-2",
        name: "Vondrich",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Guia da Planície de Vidro",
        personality:
          "Educado, teatral e acostumado a transformar qualquer tragédia em uma história fascinante para os turistas.",
        secret:
          "Percebeu que uma das figuras cristalizadas muda lentamente de posição. Ele evita comentar o ocorrido por medo de perder sua licença e afastar os visitantes ricos.",
        description:
          "Guia oficial responsável por conduzir nobres e turistas pelos três campos da Planície de Vidro. Conhece rotas seguras, histórias da batalha e pontos que foram fechados pelas autoridades. Sua base fica em Prismária, mas passa a maior parte do tempo na planície.",
        skills:
          "Luz de Orientação. Conhecimento da Planície. Discurso Turístico. Detecção de Cristais.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Vanadis",
        image: "",
        brand: "Maso",
        race: "Humana",
        occupation: "Caçadora Real e Supervisora da Planície de Vidro",
        personality:
          "Direta, silenciosa e indiferente às formalidades da corte. Prefere agir a participar de reuniões.",
        secret:
          "Sobreviveu à explosão que criou a Planície de Vidro e acredita que o monstro destruído era apenas uma extensão de uma criatura maior que ainda permanece sob o solo.",
        description:
          "Integrante distante da família real e portadora da Marca Maso. Supervisiona expedições, caça criaturas cristalinas e acompanha situações que os guias turísticos não conseguem controlar. Costuma circular entre Prismária, a Planície de Vidro e o Vale Escamado.",
        skills:
          "Impacto Instintivo. Ruptura de Cristal. Resistência Mineral. Caçada Silenciosa.",
      },

      // =========================================================
      // ÁREA 2 DO MANIFESTO — NOVA AURÉOLA
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-2",
        name: "Dimos, o Onzenário",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Financiador e Credor de Nova Auréola",
        personality:
          "Cortês, paciente e incapaz de esquecer uma dívida. Trata contratos como se fossem compromissos sagrados.",
        secret:
          "Controla dívidas de comerciantes, famílias agrícolas e trabalhadores do Baixio. Também possui participação secreta em contratos que utilizam prisioneiros nas fábricas de Ferrúria.",
        description:
          "Um dos financiadores mais influentes de Nova Auréola. Dimos empresta dinheiro para comerciantes e nobres, acumulando favores e propriedades quando os contratos não são cumpridos.",
        skills:
          "Contrato Radiante. Cobrança Implacável. Influência Comercial. Memória de Dívidas.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Akeha, a Duelista",
        image: "",
        brand: "Manifesto",
        race: "Humana",
        occupation: "Duelista da Família Real",
        personality:
          "Competitiva, orgulhosa e extremamente respeitosa com adversários que demonstram coragem.",
        secret:
          "Foi contratada para intimidar uma testemunha que conhece a ligação entre a Penitenciária do Grilhão e as fábricas. Ainda não decidiu se cumprirá a ordem.",
        description:
          "Integrante distante da família real conhecida pelos duelos públicos realizados em Nova Auréola. Atua como representante da honra da corte, guarda particular e solucionadora de disputas entre famílias nobres.",
        skills:
          "Lâmina Radiante. Desafio Formal. Passo do Duelo. Contra-Ataque Luminoso.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Alistair Valerius d'Avalon de la Couronne",
        image: "",
        brand: "Entoadora",
        race: "Humano",
        occupation: "Herdeiro da Herdade Velária",
        personality:
          "Elegante, eloquente e exageradamente refinado. Demonstra curiosidade genuína pela vida fora da nobreza, embora compreenda pouco suas dificuldades.",
        secret:
          "Descobriu que parte dos trabalhadores de sua família está presa a contratos fraudulentos. Pretende mudar a situação, mas teme perder sua herança e ser substituído.",
        description:
          "Jovem herdeiro da família responsável pela Herdade Velária. Frequenta Nova Auréola, apresenta-se em salões aristocráticos e utiliza sua voz para representar os interesses comerciais da família.",
        skills:
          "Canto de Encanto. Voz Diplomática. Etiqueta Nobre. Harmonia Calmante.",
      },

      // =========================================================
      // ÁREA 2 DO MANIFESTO — HERDADES E BAIXIO DE AURÉOLA
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-2",
        name: "Cent",
        image: "",
        brand: "Respiração",
        race: "Elfo",
        occupation: "Trabalhador Agrícola do Baixio de Auréola",
        personality:
          "Reservado, paciente e acostumado a esconder sua inteligência para não atrair a atenção dos proprietários.",
        secret:
          "Descobriu que o solo sob uma das plantações está sendo contaminado por resíduos transportados das fábricas de Ferrúria. Guarda amostras e registros do ocorrido.",
        description:
          "Raro elfo que vive no Baixio de Auréola e trabalha nas plantações próximas. Sua longevidade permite que se lembre de como a região era antes da expansão das grandes propriedades.",
        skills:
          "Respiração da Terra. Leitura do Solo. Resistência ao Trabalho. Memória Élfica.",
      },

      // =========================================================
      // ÁREA 2 DO MANIFESTO — PRISÃO E FERRÚRIA
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-2",
        name: "Dito",
        image: "",
        brand: "Maso",
        race: "Humano",
        occupation: "Prisioneiro e Trabalhador Forçado",
        personality:
          "Provocador, resistente e incapaz de permanecer calado diante de abusos.",
        secret:
          "Foi preso depois de tentar divulgar provas sobre mortes ocorridas nas fábricas. Os registros oficiais afirmam que ele cometeu sabotagem industrial.",
        description:
          "Prisioneiro da Penitenciária do Grilhão transportado diariamente para o Complexo Industrial de Ferrúria. Conhece rotas internas, horários de escolta e setores onde trabalhadores desapareceram.",
        skills:
          "Força de Sobrevivente. Improvisação com Ferramentas. Resistência à Dor. Fuga Instintiva.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Messmer",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Sacerdote do Templo da Expiação",
        personality:
          "Severo, paciente e profundamente apegado à ideia de que o sofrimento pode produzir redenção.",
        secret:
          "Os rituais de purificação realizados no templo enfraquecem a vontade e fragmentam as lembranças dos prisioneiros. Messmer sabe disso e acredita que o procedimento evita rebeliões.",
        description:
          "Sacerdote idoso responsável pelas cerimônias do Templo da Expiação. Acompanha condenados antes de serem enviados às fábricas e mantém registros religiosos que não coincidem com os documentos da prisão.",
        skills:
          "Luz Penitente. Sermão de Obediência. Julgamento da Culpa. Supressão da Vontade.",
      },

      // =========================================================
      // ÁREA 2 DO MANIFESTO — ARSENAL DE SOLFERRO
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-2",
        name: "John",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Inspetor Naval do Arsenal de Solferro",
        personality:
          "Metódico, desconfiado e obcecado por documentos corretamente preenchidos.",
        secret:
          "Mantém cópias de registros que comprovam o transporte clandestino de prisioneiros, cristais e materiais contaminados em embarcações militares.",
        description:
          "Inspetor responsável por conferir cargas, autorizações e tripulações no maior porto militar do Manifesto. Pode bloquear a saída dos jogadores ou ajudá-los caso descubra uma irregularidade maior.",
        skills:
          "Inspeção Radiante. Autoridade Portuária. Leitura de Manifestos. Bloqueio Naval.",
      },

      // =========================================================
      // ÁREA 2 DO SINDICATO — VÉSPERA
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-2",
        name: "Nyx, a Efêmera",
        image: "",
        brand: "Oculto",
        race: "Humana",
        occupation: "Conselheira Superior do Sindicato",
        personality:
          "Serena, melancólica e difícil de acompanhar. Parece sempre preparada para desaparecer antes do fim de uma conversa.",
        secret:
          "Mantém uma relação amorosa secreta com Alba, conselheira da família real do Manifesto. As duas trocam informações e procuram evitar uma guerra aberta.",
        description:
          "Uma das autoridades mais importantes do Sindicato. Sua base política fica no distrito superior de Véspera, embora viaje frequentemente para negociações, portais e encontros diplomáticos.",
        skills:
          "Passo Efêmero. Sombra Transitória. Dissolução Breve. Voz do Conselho.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Stephanos",
        image: "",
        brand: "Entoadora",
        race: "Humano",
        occupation: "Administrador dos Três Distritos de Véspera",
        personality:
          "Carismático, calculista e habilidoso em fazer grupos rivais acreditarem que foram ouvidos.",
        secret:
          "Utiliza discretamente suas habilidades para reduzir revoltas e controlar multidões. A população acredita que seus discursos são apenas excepcionalmente persuasivos.",
        description:
          "Principal autoridade administrativa de Véspera. Precisa equilibrar os interesses da Coroa Negra, a insatisfação dos distritos inferiores e as ameaças provenientes da Barreira do Miasma.",
        skills:
          "Voz de Assembleia. Harmonia Coletiva. Canto de Contenção. Autoridade dos Distritos.",
      },

      // =========================================================
      // ÁREA 2 DO SINDICATO — VERTÍGIA
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-2",
        name: "Greith",
        image: "",
        brand: "Oculto",
        race: "Humano",
        occupation: "Líder Comunitário de Vertígia",
        personality:
          "Prático, protetor e hostil a qualquer autoridade que visite a cidade apenas durante crises.",
        secret:
          "Mantém uma rota de fuga ilegal que atravessa estruturas próximas à Barreira do Miasma. A passagem poderia salvar milhares de pessoas, mas também permitir a entrada de criaturas.",
        description:
          "Representante informal dos habitantes de Vertígia. Organiza alimentos, reparos e evacuações nos níveis mais precários da cidade vertical.",
        skills:
          "Véu de Passagem. Organização Comunitária. Rotas Verticais. Sombra Protetora.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Umbra, o Abissal",
        image: "",
        brand: "Oculto",
        race: "Humano",
        occupation: "Protetor Clandestino de Vertígia",
        personality:
          "Amargo, inteligente e extremamente desconfiado de qualquer integrante do Manifesto.",
        secret:
          "Umbra não é seu verdadeiro nome. Ele fazia parte da nobreza do Manifesto e possui documentos que comprovam atrocidades cometidas por autoridades, religiosos e pesquisadores da facção.",
        description:
          "Ex-integrante da nobreza do Manifesto que abandonou sua posição após descobrir crimes escondidos pela corte. Atualmente protege comunidades de Vertígia e atua contra agentes que tentam silenciá-lo.",
        skills:
          "Fenda Abissal. Manto Sem Luz. Constructo Profundo. Conhecimento da Nobreza.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Lars",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Engenheiro Estrutural de Vertígia",
        personality:
          "Cansado, silencioso e dedicado a impedir que a cidade desabe, mesmo sendo tratado como suspeito.",
        secret:
          "Ainda envia relatórios codificados para uma pessoa dentro do Manifesto. Não está claro se atua como espião ou se tenta alertar alguém sobre o risco de destruição de Vertígia.",
        description:
          "Engenheiro originário do Manifesto que trabalha na manutenção das plataformas, pontes e estruturas de Vertígia. Sua Marca desperta desconfiança, mas também é essencial para reforçar a cidade.",
        skills:
          "Estrutura Radiante. Reforço de Plataforma. Análise de Construção. Sinal Luminoso.",
      },

      // =========================================================
      // ÁREA 2 DO SINDICATO — PLANÍCIE DAS CINZAS RECENTES
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-2",
        name: "Vicent",
        image: "",
        brand: "Maso",
        race: "Humano",
        occupation: "Explorador das Cinzas Recentes",
        personality:
          "Ousado, supersticioso e incapaz de abandonar uma investigação incompleta.",
        secret:
          "Encontrou uma sobrevivente nas ruínas dias depois de a região ter sido considerada completamente destruída. Ele a mantém escondida porque ela repete frases sobre um novo Miasma.",
        description:
          "Explorador que procura corpos, materiais e sobreviventes na Planície das Cinzas Recentes. Conhece os locais mais instáveis e os primeiros sinais da Fenda Latente.",
        skills:
          "Instinto de Ruínas. Resistência Maso. Busca por Sobreviventes. Percepção de Perigo.",
      },

      // =========================================================
      // ÁREA 2 DO SINDICATO — TEMPLO E CAMPO DOS SEM-NOME
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-2",
        name: "A'le",
        image: "",
        brand: "Maso",
        race: "Elfo",
        occupation: "Coveiro do Campo dos Sem-Nome",
        personality:
          "Calmo, cuidadoso e respeitoso com os mortos, mesmo quando ninguém mais demonstra preocupação.",
        secret:
          "Reconheceu o mesmo cadáver entre os corpos em duas ocasiões diferentes. Alguns mortos desaparecem depois de serem levados para perto do Portal dos Mortos.",
        description:
          "Elfo responsável por registrar, preparar e sepultar os corpos encontrados nas ruínas. Sua longevidade e memória tornam difícil esconder irregularidades dele.",
        skills:
          "Força Funerária. Memória Élfica. Identificação de Corpos. Resistência a Doenças.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Abel",
        image: "",
        brand: "Manifesto",
        race: "Antropomórfico — Cervo",
        occupation: "Sacerdote do Templo do Último Véu",
        personality:
          "Gentil, solene e disposto a ouvir pessoas que as demais autoridades consideram perdidas.",
        secret:
          "O Portal dos Mortos reage à sua Marca do Manifesto. Abel acredita que pode purificar o portal, mas cada ritual parece torná-lo mais ativo.",
        description:
          "Sacerdote antropomórfico com corpo humanoide, galhadas e características de cervo. Embora possua a Marca do Manifesto, vive no Sindicato e conduz cerimônias para mortos e desaparecidos.",
        skills:
          "Luz do Réquiem. Bênção dos Mortos. Presença Sagrada. Ativação Involuntária.",
      },

      // =========================================================
      // ÁREA 2 DO SINDICATO — HERDADES DO SUDOESTE
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-2",
        name: "L'via",
        image: "",
        brand: "Oculto",
        race: "Elfa",
        occupation: "Administradora da Herdade Volnir",
        personality:
          "Elegante, racional e aparentemente indiferente à rivalidade entre as famílias proprietárias.",
        secret:
          "Utiliza o comportamento dos animais para prever manifestações de Miasma. Escondeu sinais de perigo para evitar que a família Dargan utilizasse a informação contra os Volnir.",
        description:
          "Integrante da rica família Volnir e responsável por parte das operações da fazenda. Sua origem élfica e sua Marca Oculto fazem dela uma presença incomum entre os proprietários da região.",
        skills:
          "Véu sobre o Rebanho. Comunicação Animal. Administração Rural. Presságio Instintivo.",
      },
      // =========================================================
      // ÁREA 3 DO MANIFESTO — COMANDO REGIONAL
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-3",
        name: "Aldwin, o General",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "General da Família Real",
        personality:
          "Estratégico, autoritário e extremamente consciente das consequências políticas de cada decisão militar.",
        secret:
          "Suspeita que determinadas manifestações de Miasma estejam sendo provocadas ou intensificadas por experimentos realizados dentro do próprio Manifesto.",
        description:
          "Primo de Elio e principal autoridade militar da Área 3. Costuma permanecer em Belária durante os conselhos de guerra, mas acompanha pessoalmente operações no Forte do Limiar Dourado e em The Union.",
        skills:
          "Comando de Guerra. Formação Radiante. Lâmina do General. Estratégia de Cerco. Autoridade Real.",
      },
      {
        collectionId: "dominio-manifesto-area-3",
        name: "Ares",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Comandante do Forte do Limiar Dourado",
        personality:
          "Corajoso, severo e disposto a sacrificar recursos para impedir que monstros atravessem a fronteira.",
        secret:
          "Ocultou o número verdadeiro de soldados perdidos em uma recente manifestação para evitar que o Manifesto ordenasse o abandono do forte.",
        description:
          "Comandante responsável pelo Forte do Limiar Dourado e pelas Três Sentinelas de Marfim. Subordinado diretamente a Aldwin, coordena a entrada de tropas e suprimentos em The Union.",
        skills:
          "Muralha Radiante. Investida Fronteiriça. Comando de Sentinelas. Golpe Solar.",
      },

      // =========================================================
      // ÁREA 3 DO MANIFESTO — HOSPITAL DA GRANDE AURORA
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-3",
        name: "Iaso",
        image: "",
        brand: "Entoadora",
        race: "Humana",
        occupation: "Diretora do Hospital da Grande Aurora",
        personality:
          "Compreensiva, firme e capaz de manter a calma mesmo quando o hospital está cercado pelo caos.",
        secret:
          "Descobriu que pacientes considerados incuráveis estão sendo transferidos secretamente para o Instituto de Maré-Luz sem autorização das famílias.",
        description:
          "Diretora do maior hospital da Área 3. Utiliza suas entoações para aliviar dores, estabilizar feridos e coordenar equipes médicas. Pode viajar até The Union durante grandes operações de resgate.",
        skills:
          "Canto Restaurador. Harmonia Vital. Voz Tranquilizadora. Comando Médico.",
      },
      {
        collectionId: "dominio-manifesto-area-3",
        name: "Lautaro",
        image: "",
        brand: "Sem Marca",
        race: "Humano",
        occupation: "Paciente em Isolamento",
        personality:
          "Assustado, desconfiado e incapaz de distinguir completamente suas lembranças dos sonhos provocados pelo Miasma.",
        secret:
          "Durante a contaminação, viu Claralume ainda habitada e afirma ter conversado com pessoas que desapareceram anos atrás.",
        description:
          "Sobrevivente resgatado próximo ao Núcleo Violeta e atualmente isolado no Hospital da Grande Aurora. Seu corpo não apresenta uma Marca, mas reage intensamente à aproximação de cristais contaminados.",
        skills:
          "Resistência Incomum. Memórias Fragmentadas. Sensibilidade ao Miasma. Sobrevivência.",
      },

      // =========================================================
      // ÁREA 3 DO MANIFESTO — INSTITUTO DE MARÉ-LUZ
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-3",
        name: "Emiliano",
        image: "",
        brand: "Maso",
        race: "Humano",
        occupation: "Pesquisador do Instituto de Maré-Luz",
        personality:
          "Curioso, impulsivo e fascinado por descobertas que deveriam assustá-lo.",
        secret:
          "Utilizou a própria Marca para entrar em contato com uma amostra retirada do Núcleo Violeta. Desde então, consegue sentir quando novas criaturas estão prestes a surgir.",
        description:
          "Pesquisador especializado nos efeitos físicos do Miasma e em materiais retirados de The Union. Trabalha no Instituto de Maré-Luz e participa de expedições de coleta protegidas pela Base de Salferro.",
        skills:
          "Adaptação Instintiva. Análise de Amostras. Resistência Química. Percepção de Manifestação.",
      },

      // =========================================================
      // ÁREA 3 DO MANIFESTO — CAMPOLUZ
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-3",
        name: "Arthur",
        image: "",
        brand: "Oculto",
        race: "Humano",
        occupation: "Representante Agrícola de Campoluz",
        personality:
          "Prático, diplomático e acostumado a defender os trabalhadores diante de autoridades militares.",
        secret:
          "Utiliza passagens ocultas sob as plantações para transportar alimentos diretamente até comunidades de The Union sem passar pelo controle do Manifesto.",
        description:
          "Representante dos agricultores e responsáveis pelos armazéns de Campoluz. Apesar de possuir a Marca Oculto, conquistou confiança por manter a produção funcionando durante crises e ataques.",
        skills:
          "Armazém Sombrio. Rotas Ocultas. Administração Agrícola. Negociação de Suprimentos.",
      },

      // =========================================================
      // ÁREA 3 DO MANIFESTO — TEMPLO DAS SETE PÉTALAS
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-3",
        name: "Verdelet",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Sacerdote das Sete Pétalas",
        personality:
          "Devoto, paciente e menos intolerante que a maioria dos religiosos ligados à família real.",
        secret:
          "Acredita que a Flor não deseja a destruição dos Ocultos e preserva textos religiosos que contradizem parte da doutrina oficial do Manifesto.",
        description:
          "Principal sacerdote do Templo das Sete Pétalas. Oferece bênçãos aos guerreiros antes de entrarem em The Union e participa como conselheiro espiritual nas reuniões de Belária.",
        skills:
          "Bênção das Sete Pétalas. Luz Protetora. Leitura Sagrada. Purificação Branda.",
      },

      // =========================================================
      // ÁREA 3 DO SINDICATO — FIGURA CENTRAL
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-3",
        name: "Sullivan, a Noite",
        image: "",
        brand: "Oculto",
        race: "Humano",
        occupation: "Guardião de um Segredo do Sindicato",
        personality:
          "Educado, distante e estranhamente sereno diante de situações que assustam até autoridades experientes.",
        secret:
          "Possui mais de trezentos anos, apesar de conservar uma aparência jovem. Seu verdadeiro posto é proteger algo escondido além das montanhas da Área 3, cuja natureza nem mesmo a maioria das autoridades conhece.",
        description:
          "Autoridade de baixo escalão aparente que circula por Brumacorte, Umbrel e pelo Portal do Pico Oco. Sua postura discreta esconde uma existência muito mais antiga que o Sindicato atual.",
        skills:
          "Noite Perene. Corpo Atemporal. Véu Profundo. Memória de Séculos. Selo do Guardião.",
      },

      // =========================================================
      // ÁREA 3 DO SINDICATO — SANATÓRIO DO VÉU PARTIDO
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-3",
        name: "Arioch",
        image: "",
        brand: "Oculto",
        race: "Humano",
        occupation: "Diretor do Sanatório do Véu Partido",
        personality:
          "Controlado, clínico e aparentemente incapaz de se abalar com o sofrimento dos pacientes.",
        secret:
          "Mantém registros separados sobre pacientes que demonstram previsões, memórias alheias ou ligações com portais. Alguns nunca recebem alta, mesmo quando parecem recuperados.",
        description:
          "Responsável pelo tratamento e isolamento dos afetados mentalmente pelo Miasma. Defende que observar a loucura é uma das formas mais eficientes de compreender a contaminação.",
        skills:
          "Véu Calmante. Supressão Mental. Diagnóstico Sombrio. Isolamento de Memórias.",
      },
      {
        collectionId: "sindicato-sombras-area-3",
        name: "Ramia",
        image: "",
        brand: "Maso",
        race: "Humana",
        occupation: "Paciente do Sanatório",
        personality:
          "Inquieta, imprevisível e capaz de alternar entre confusão completa e momentos de clareza assustadora.",
        secret:
          "Várias de suas previsões já aconteceram. Ela afirma que não vê o futuro, mas se lembra dele como se já tivesse vivido todos os acontecimentos.",
        description:
          "Paciente que passou semanas perdida em uma região contaminada antes de ser levada ao Sanatório do Véu Partido. Fala sobre Claralume, Eleonora e uma futura ruptura do Núcleo Violeta.",
        skills:
          "Instinto Temporal. Resistência Maso. Memórias do Amanhã. Pressentimento.",
      },

      // =========================================================
      // ÁREA 3 DO SINDICATO — GALERIAS DO SUBVÉU
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-3",
        name: "Undine",
        image: "",
        brand: "Respiração",
        race: "Antropomórfico — Salamandra",
        occupation: "Guardiã das Galerias do Subvéu",
        personality:
          "Silenciosa, disciplinada e extremamente protetora com o irmão.",
        secret:
          "Descobriu uma terceira passagem nas galerias que não aparece em nenhum mapa do Sindicato. A passagem parece conduzir diretamente para baixo do Núcleo Violeta.",
        description:
          "Antropomórfica de aparência anfíbia responsável por vigiar a Casa da Escada Oca e as duas saídas conhecidas das Galerias do Subvéu. Utiliza técnicas de Respiração adaptadas a ambientes úmidos e subterrâneos.",
        skills:
          "Respiração da Corrente. Escalada Úmida. Orientação Subterrânea. Corte Fluido.",
      },

      // =========================================================
      // ÁREA 3 DO SINDICATO — BERÇO LATENTE
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-3",
        name: "Salamander",
        image: "",
        brand: "Respiração",
        race: "Antropomórfico — Salamandra",
        occupation: "Vigia do Berço Latente",
        personality:
          "Impulsivo, vigilante e mais disposto a enfrentar perigos do que a informar seus superiores.",
        secret:
          "Sua temperatura corporal aumenta quando o Miasma está prestes a surgir. Ele esconde que as reações estão se tornando cada vez mais intensas.",
        description:
          "Irmão de Undine e principal observador do Berço Latente. Vive em um pequeno posto entre as montanhas e envia alertas para Umbrel quando detecta alterações na região.",
        skills:
          "Respiração do Calor. Pele Resistente. Detecção de Miasma. Investida Ígnea.",
      },
      {
        collectionId: "sindicato-sombras-area-3",
        name: "Gismor",
        image: "",
        brand: "Oculto",
        race: "Humano",
        occupation: "Responsável pelo Portal do Pico Oco",
        personality:
          "Metódico, supersticioso e desconfortável sempre que precisa ativar o portal.",
        secret:
          "O Portal do Pico Oco começou a abrir brevemente para um destino que não pertence à rede conhecida do Sindicato.",
        description:
          "Agente encarregado da manutenção, ativação e segurança do portal localizado nas montanhas do extremo leste. Mantém registros detalhados de cada comportamento anormal da estrutura.",
        skills:
          "Selo do Pico. Ativação de Portal. Véu Montanhoso. Interrupção de Travessia.",
      },

      // =========================================================
      // THE UNION — COMANDO DA OPERAÇÃO CONJUNTA
      // =========================================================

      {
        collectionId: "the-union-area-3",
        name: "Oror",
        image: "",
        brand: "Maso",
        race: "Humano",
        occupation: "Comandante de Operação Conjunta",
        personality:
          "Direto, resistente e pouco interessado nas disputas políticas das facções.",
        secret:
          "Pretende abandonar ordens oficiais e evacuar toda a linha de defesa caso o Núcleo Violeta ultrapasse determinado nível, mesmo que isso entregue territórios aos monstros.",
        description:
          "Comandante escolhido para liderar uma das maiores operações conjuntas de The Union. Sua autoridade é reconhecida temporariamente por Manifesto, Sindicato e samurais.",
        skills:
          "Comando Instintivo. Rompimento de Linha. Rugido de União. Resistência de Cerco.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Vladimir",
        image: "",
        brand: "Oculto",
        race: "Humano",
        occupation: "Representante do Sindicato em The Union",
        personality:
          "Diplomático, desconfiado e cuidadoso para não revelar mais informações do que o necessário.",
        secret:
          "Conhece a existência das Galerias do Subvéu e utiliza os túneis para enviar relatórios que não passam pelo comando conjunto.",
        description:
          "Representante oficial do Sindicato nas operações de The Union. Participa da divisão de recursos, do planejamento das patrulhas e das negociações com o Manifesto.",
        skills:
          "Véu Diplomático. Comunicação Oculta. Constructo de Defesa. Negociação Estratégica.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Alexandre",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Representante do Manifesto em The Union",
        personality:
          "Formal, orgulhoso e determinado a preservar a autoridade do Manifesto mesmo dentro da região unificada.",
        secret:
          "Recebeu ordens para garantir que qualquer descoberta sobre o Núcleo Violeta seja entregue primeiro ao Instituto de Maré-Luz.",
        description:
          "Representante político e militar do Manifesto dentro de The Union. Mantém sua base na Fortaleza de Solbruma e frequentemente entra em conflito com Vladimir.",
        skills:
          "Autoridade Radiante. Ordem de Formação. Barreira Diplomática. Luz de Comando.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Annan",
        image: "",
        brand: "Respiração",
        race: "Humano",
        occupation: "Representante dos Samurais em The Union",
        personality:
          "Sereno, imparcial e intolerante com decisões que coloquem soldados em risco por motivos políticos.",
        secret:
          "Foi enviado para investigar se as manifestações possuem relação com ruínas conhecidas apenas pelos mestres de Seiran.",
        description:
          "Samurai responsável por representar as comunidades da Respiração nas operações conjuntas. Atua como mediador entre Vladimir, Alexandre e os guerreiros independentes.",
        skills:
          "Respiração do Equilíbrio. Corte Mediador. Postura Imóvel. Leitura de Combate.",
      },

      // =========================================================
      // THE UNION — CURA E PESQUISA
      // =========================================================

      {
        collectionId: "the-union-area-3",
        name: "Kelpie",
        image: "",
        brand: "Maso",
        race: "Elfa",
        occupation: "Curandeira Neutra",
        personality:
          "Gentil, sarcástica e indiferente à origem política de seus pacientes.",
        secret:
          "Consegue retirar pequenas quantidades de Miasma do corpo de uma pessoa e transferi-las temporariamente para si mesma.",
        description:
          "Curandeira élfica que atua entre os acampamentos de The Union e a Casa do Repouso. Recusa-se a trabalhar exclusivamente para qualquer facção.",
        skills:
          "Transferência de Contaminação. Cura Instintiva. Resistência Élfica. Medicina de Campo.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Chloe",
        image: "",
        brand: "Entoadora",
        race: "Humana",
        occupation: "Pesquisadora do Núcleo Violeta",
        personality:
          "Curiosa, meticulosa e fascinada pelos padrões sonoros produzidos pelo Miasma.",
        secret:
          "Descobriu que o Núcleo emite uma sequência semelhante a uma canção. Algumas notas correspondem à partitura proibida encontrada em Songbird.",
        description:
          "Pesquisadora responsável por registrar alterações no Núcleo Violeta. Trabalha com equipes de diferentes facções e utiliza sua voz para medir reações do Miasma.",
        skills:
          "Ressonância Violeta. Análise Sonora. Canto de Medição. Barreira Harmônica.",
      },

      // =========================================================
      // THE UNION — CAÇADORES E GUERREIROS
      // =========================================================

      {
        collectionId: "the-union-area-3",
        name: "Gruen",
        image: "",
        brand: "Entoadora",
        race: "Humano",
        occupation: "Caçador de Monstros",
        personality:
          "Confiante, provocador e estranhamente alegre durante combates perigosos.",
        secret:
          "Consegue ouvir criaturas de Miasma antes que elas se manifestem, mas as vozes começaram a chamá-lo pelo nome.",
        description:
          "Caçador que utiliza entoações ofensivas para localizar, enfraquecer e atrair monstros. Circula entre os acampamentos e aceita contratos de qualquer facção.",
        skills:
          "Grito de Caça. Frequência Rompedora. Rastreamento Sonoro. Canto de Provocação.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Lycaon, a Besta",
        image: "",
        brand: "Maso",
        race: "Antropomórfico — Lobo",
        occupation: "Guerreiro e Caçador de Criaturas",
        personality:
          "Agressivo, leal e mais confortável entre guerreiros do que entre autoridades.",
        secret:
          "Procura membros de seu antigo grupo que desapareceram durante uma manifestação. Ele acredita que alguns foram transformados em criaturas do Miasma.",
        description:
          "Antropomórfico de corpo humanoide e características lupinas. É um dos combatentes mais conhecidos dos acampamentos de The Union e costuma liderar caçadas próximas ao Núcleo Violeta.",
        skills:
          "Faro de Miasma. Fúria Bestial. Caçada em Grupo. Resistência Selvagem.",
      },

      // =========================================================
      // THE UNION — CLARALUME
      // =========================================================

      {
        collectionId: "the-union-area-3",
        name: "Caim",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Membro Perdido da Linhagem Real",
        personality:
          "Confuso, melancólico e incapaz de confiar totalmente nas próprias lembranças.",
        secret:
          "Sabe que os habitantes de Claralume não foram mortos nem evacuados. Todos responderam a um chamado e caminharam voluntariamente em direção ao Miasma.",
        description:
          "Integrante desaparecido de uma ramificação da família real, encontrado sozinho nos arredores de Claralume. É o único sobrevivente conhecido capaz de relatar os últimos momentos da cidade.",
        skills:
          "Luz Desgastada. Memória Real. Resistência à Contaminação. Chamado de Claralume.",
      },

      // =========================================================
      // THE UNION — OPERAÇÕES CLANDESTINAS
      // =========================================================

      {
        collectionId: "the-union-area-3",
        name: "Angelus",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Agente Infiltrado nas Galerias",
        personality:
          "Paciente, convincente e disposto a utilizar qualquer identidade necessária.",
        secret:
          "Utiliza as Galerias do Subvéu para espionar tanto o Sindicato quanto a Fortaleza de Solbruma. Seus relatórios são enviados a uma autoridade não identificada da família real.",
        description:
          "Agente do Manifesto infiltrado entre transportadores e exploradores das galerias. Pode aparecer como aliado, informante ou antagonista dependendo do que os jogadores descobrirem.",
        skills: "Disfarce Radiante. Selo Falso. Espionagem. Fuga Subterrânea.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Inuart",
        image: "",
        brand: "Oculto",
        race: "Humano",
        occupation: "Comerciante dos Acampamentos",
        personality:
          "Sociável, oportunista e capaz de negociar mesmo durante ataques.",
        secret:
          "Transporta mercadorias pelas Galerias do Subvéu e esconde pessoas procuradas entre seus carregamentos.",
        description:
          "Comerciante responsável por abastecer os acampamentos de The Union com alimentos, equipamentos, remédios e objetos difíceis de encontrar.",
        skills:
          "Armazém Sombrio. Rede Comercial. Contrabando. Barganha de Campo.",
      },

      // =========================================================
      // TERRITÓRIO NEUTRO — ILHA DA LÁGRIMA CLARA
      // =========================================================

      {
        collectionId: "fronteira-area-3",
        name: "Capitão Martex",
        image: "",
        brand: "Respiração",
        race: "Humano",
        occupation: "Capitão de Suprimentos e Resgate",
        personality:
          "Bem-humorado, experiente e incapaz de abandonar alguém no mar.",
        secret:
          "Mantém uma rota não registrada até uma pequena enseada próxima a Claralume, utilizada para retirar sobreviventes e transportar mensagens sem conhecimento das facções.",
        description:
          "Capitão responsável por transportar alimentos, medicamentos, feridos e curandeiros entre a Ilha da Lágrima Clara, Porto Boreal e os acampamentos de The Union.",
        skills:
          "Respiração da Maré. Navegação de Risco. Resgate Marítimo. Comando de Tripulação.",
      },
    ],

    monsters: [
      {
        collectionId: "dominio-manifesto",
        name: "Bandido das Montanhas",
        image: flower,
        type: "Humano",
        threat: "1",
        skills: "Bomba de Fumaça. Corte Rápido. Fuga pelas Rochas.",
        description:
          "Criminoso comum das rotas montanhosas. Ataca viajantes isolados, mas costuma fugir quando encontra resistência real.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Errante do Miasma",
        image: "",
        type: "Humanoide Corrompido",
        threat: "3",
        skills:
          "Marcha Silenciosa. Pele Roxa. Grito Sem Voz. Contaminação Leve.",
        description:
          "Pessoa ou criatura exposta ao Miasma por tempo demais. Move-se de forma irregular, não fala e parece reagir a sons distantes que ninguém mais escuta.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Cópia Roxa",
        image: "",
        type: "Manifestação de RAID",
        threat: "4",
        skills:
          "Imitação Imperfeita. Corpo Instável. Ataque Repetido. Dissolução.",
        description:
          "Cópia contaminada de uma criatura ou guerreiro de outra realidade. Possui aspecto roxo, comportamento agressivo e incapacidade de comunicação.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Guardião da Cratera",
        image: "",
        type: "Aberração de Miasma",
        threat: "6",
        skills:
          "Barreira Roxa. Esmagamento. Pulsação de Miasma. Regeneração Instável.",
        description:
          "Criatura massiva formada dentro da Cratera do Último Miasma. Parece proteger o centro da região contaminada, mas ninguém sabe se age por instinto ou por comando.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Consciência Coletiva",
        image: "",
        type: "Aberração",
        threat: "5",
        skills: "Incorporal. Copiar. Drenar Esperança. Vozes Sobrepostas.",
        description:
          "Entidade consciente que se espalha por contato de sangue e memórias fragmentadas. Suas vítimas relatam ouvir pensamentos que não pertencem a elas.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Sombra do Portal",
        image: "",
        type: "Constructo Sombrio",
        threat: "4",
        skills: "Travessia Curta. Corte Escuro. Corpo Sem Luz. Defesa Umbral.",
        description:
          "Forma defensiva criada pela energia dos portais ocultos do Sindicato. Não possui vontade própria, apenas protege entradas e elimina testemunhas.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Arauto do Lago Roxo",
        image: "",
        type: "Criatura de Miasma",
        threat: "5",
        skills:
          "Reflexo Falso. Afogamento Mental. Névoa sobre a Água. Chamado do Fundo.",
        description:
          "Criatura que surge no Lago do Véu Roxo. Seu corpo parece feito de água escura e luz roxa, e seus reflexos mostram versões distorcidas de quem o encara.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Draco-Luz Instável",
        image: "",
        type: "Manifestação Nobre",
        threat: "7",
        skills: "Clarão Cego. Garra Radiante. Escamas de Luz. Fúria de Sangue.",
        description:
          "Manifestação rara e perigosa ligada ao sangue nobre do Manifesto. Pode surgir como experimento, segredo exposto ou consequência de uma transformação fora de controle.",
      },
      // =========================================================
      // ÁREA 1 DO MANIFESTO — CRIATURAS ÚNICAS E MINIBOSSES
      // =========================================================

      {
        collectionId: "dominio-manifesto",
        name: "Anjo Remanescente",
        image: "",
        type: "Miniboss — Manifestação de Entoadora",
        threat: "7",
        skills:
          "Canto sem Voz. Asas de Ressonância. Lâminas Harmônicas. Eco da Invocadora. Colapso Angelical.",
        description:
          "Fragmento de um Anjo que permaneceu no mundo após perder sua ligação com uma Entoadora. Incapaz de compreender a ausência de sua invocadora, reage violentamente a músicas, vozes e instrumentos. Costuma aparecer nas proximidades de Songbird.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Dragão Derradeiro",
        image: "",
        type: "Miniboss — Dragão Ancestral",
        threat: "8",
        skills:
          "Sopro Ancestral. Escamas do Fim. Voo Tempestuoso. Rugido Dracônico. Fúria Derradeira.",
        description:
          "Possivelmente o último dragão verdadeiro que não surgiu da transformação de um integrante da linhagem real. Vive escondido nas montanhas da Área 1 e carrega ferimentos antigos que jamais cicatrizaram.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Leonard",
        image: "",
        type: "Miniboss — Dragão da Linhagem Real",
        threat: "8",
        skills:
          "Sopro Solar Instável. Escamas Reais. Garra do Cárcere. Fúria do Isolamento. Forma Irreversível.",
        description:
          "Membro da família real aprisionado e apagado dos registros depois de perder a capacidade de retornar à forma humana. Leonard passou muitos anos isolado, tornando-se agressivo, confuso e incapaz de reconhecer a própria família.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Guardião da Cratera",
        image: "",
        type: "Miniboss — Aberração de Miasma",
        threat: "7",
        skills:
          "Barreira Roxa. Esmagamento. Pulsação de Miasma. Regeneração Instável. Chamado da Cratera.",
        description:
          "Criatura massiva formada dentro da Cratera do Último Miasma. Parece proteger o centro da região contaminada, embora ninguém saiba se age por instinto, por comando ou para impedir que algo consiga sair.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Draco-Luz Instável",
        image: "",
        type: "Miniboss — Manifestação Nobre",
        threat: "7",
        skills:
          "Clarão Cego. Garra Radiante. Escamas de Luz. Fúria de Sangue. Explosão Nobre.",
        description:
          "Manifestação dracônica incompleta ligada ao sangue da família real. Pode surgir após uma transformação fracassada, um experimento ou a perda de controle de alguém pertencente à linhagem do Manifesto.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Bandido das Montanhas",
        image: "",
        type: "Humano Hostil",
        threat: "1",
        skills: "Bomba de Fumaça. Corte Rápido. Emboscada. Fuga pelas Rochas.",
        description:
          "Criminoso comum das rotas montanhosas da Área 1. Ataca viajantes isolados, caravanas pequenas e peregrinos, mas costuma fugir ao encontrar resistência organizada.",
      },

      // =========================================================
      // ÁREA 1 DO SINDICATO — CRIATURAS ÚNICAS E MINIBOSSES
      // =========================================================

      {
        collectionId: "sindicato-sombras",
        name: "Vespa Cintilante Nebulosa",
        image: "",
        type: "Miniboss — Inseto de Miasma",
        threat: "7",
        skills:
          "Névoa Cintilante. Ferrão Alucinógeno. Enxame de Reflexos. Voo Invisível. Casulo Nebuloso.",
        description:
          "Vespa colossal responsável pela névoa permanente da Floresta da Névoa Imóvel. Suas asas liberam partículas brilhantes que distorcem caminhos, sons e lembranças, fazendo viajantes retornarem repetidamente ao mesmo ponto.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Arauto do Lago Roxo",
        image: "",
        type: "Miniboss — Criatura de Miasma",
        threat: "6",
        skills:
          "Reflexo Falso. Afogamento Mental. Névoa sobre a Água. Chamado do Fundo. Corpo Líquido.",
        description:
          "Criatura que emerge do Lago do Véu Roxo. Seu corpo parece composto por água escura e luz violeta, enquanto seus reflexos mostram versões deformadas das pessoas que o observam.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Sombra do Portal",
        image: "",
        type: "Constructo Sombrio",
        threat: "4",
        skills:
          "Travessia Curta. Corte Escuro. Corpo sem Luz. Defesa Umbral. Alerta do Vazio.",
        description:
          "Forma defensiva criada pela energia dos portais do Sindicato. Não possui vontade própria e existe apenas para proteger passagens, impedir invasões e eliminar testemunhas não autorizadas.",
      },

      // =========================================================
      // ÁREA 2 DO MANIFESTO — CRIATURAS ÚNICAS E MINIBOSSES
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-2",
        name: "Soldados de Cristal",
        image: "",
        type: "Miniboss — Unidade Cristalizada",
        threat: "6",
        skills:
          "Marcha Cristalina. Formação Imóvel. Lança Prismática. Reflexo Cortante. Estilhaçamento Final.",
        description:
          "Guerreiros cristalizados durante a explosão que criou a Planície de Vidro. Alguns despertam em grupos e repetem os últimos movimentos da batalha, atacando qualquer pessoa que considerem parte do monstro original.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Lindwurm",
        image: "",
        type: "Miniboss — Dragão Serpentino",
        threat: "8",
        skills:
          "Corpo Serpentino. Mordida Rochosa. Cauda Escamada. Sopro Subterrâneo. Desabamento da Cripta.",
        description:
          "Criatura dracônica alongada que vive nas profundezas da Cripta Escamada. Seu corpo atravessa paredes e túneis, permitindo que ataque de diferentes direções e altere a estrutura da masmorra durante o combate.",
      },

      // =========================================================
      // ÁREA 3 DO MANIFESTO — CRIATURAS ÚNICAS E MINIBOSSES
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-3",
        name: "Alma Penada",
        image: "",
        type: "Miniboss — Espírito Contaminado",
        threat: "6",
        skills:
          "Lamento Hospitalar. Toque Gelado. Possessão Breve. Memória da Dor. Travessia de Paredes.",
        description:
          "Espírito encontrado nas proximidades do Hospital da Grande Aurora. A entidade reúne fragmentos de diferentes pacientes mortos e repete pedidos de ajuda, diagnósticos e nomes que não constam nos registros oficiais.",
      },

      // =========================================================
      // ÁREA 3 DO SINDICATO — CRIATURAS ÚNICAS E MINIBOSSES
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-3",
        name: "Harpia Ourofílica",
        image: "",
        type: "Miniboss — Harpia Montanhosa",
        threat: "7",
        skills:
          "Fascínio pelo Ouro. Roubo Aéreo. Garras Douradas. Grito da Montanha. Ninho Reluzente.",
        description:
          "Harpia das montanhas subárticas que acumula ouro, joias, armas ornamentadas e objetos brilhantes. Ataca viajantes ricos e pode abandonar um combate para perseguir um item que considere mais valioso.",
      },

      // =========================================================
      // RAIDS — ÁREA 1 DO MANIFESTO
      // =========================================================

      {
        collectionId: "regiao-cratera",
        name: "Consciência Coletiva",
        image: "",
        type: "RAID — Entidade Psíquica",
        threat: "9",
        skills:
          "Corpo Incorporal. Roubo de Memória. Cópia de Habilidades. Drenar Esperança. Vozes Sobrepostas. Mente Compartilhada.",
        description:
          "Entidade consciente que se espalha pelo contato com sangue, pensamentos e lembranças. Durante a batalha, assume formas baseadas nas memórias dos jogadores e utiliza vozes de pessoas conhecidas para enfraquecer sua vontade.",
      },
      {
        collectionId: "regiao-cratera",
        name: "O Bruxo",
        image: "",
        type: "RAID — Caçador Mutado",
        threat: "9",
        skills:
          "Espada de Monstros. Poção Mutagênica. Selo de Repulsão. Sentidos Ampliados. Besta de Prata. Mutação da Caçada.",
        description:
          "Caçador de monstros que modificou o próprio corpo utilizando extratos de criaturas e fragmentos de Miasma. Já não distingue monstros, contaminados e pessoas marcadas como ameaças, perseguindo qualquer alvo que considere antinatural.",
      },

      // =========================================================
      // RAIDS — ÁREA 1 DO SINDICATO
      // =========================================================

      {
        collectionId: "sindicato-sombras",
        name: "Flagelo Ancestral",
        image: "",
        type: "RAID — Besta Ancestral",
        threat: "9",
        skills:
          "Galhadas do Véu. Casco de Raízes. Névoa Primordial. Investida Ancestral. Chamado das Feras. Regeneração da Floresta.",
        description:
          "Criatura colossal coberta por cascas, raízes, musgo e estruturas semelhantes a galhadas. Dormiu sob a floresta por gerações e despertou após as alterações no Miasma da Área 1.",
      },

      // =========================================================
      // RAIDS — ÁREA 2 DO MANIFESTO
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-2",
        name: "O Ilustre",
        image: "",
        type: "RAID — Entidade Cristalina",
        threat: "9",
        skills:
          "Postura Ilustre. Reflexo Majestoso. Lâmina de Cristal. Salão Prismático. Decreto da Perfeição.",
        description:
          "Entidade alta, refinada e revestida por cristais semelhantes a roupas nobres. Trata seus adversários como convidados indignos e transforma o campo de batalha em um salão de espelhos cortantes.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "O Miúdo",
        image: "",
        type: "RAID — Entidade Cristalina",
        threat: "9",
        skills:
          "Passo Minúsculo. Risada Estilhaçada. Roubo de Reflexo. Fragmentação. Crescimento Repentino.",
        description:
          "Pequena criatura cristalina que acompanha O Ilustre. Sua aparência frágil esconde extrema velocidade e a capacidade de se dividir em inúmeros fragmentos independentes.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "O Ilustre e o Miúdo",
        image: "",
        type: "RAID — Encontro Duplo",
        threat: "10",
        skills:
          "Etiqueta da Ruína. Reflexos Compartilhados. Dança dos Estilhaços. Troca de Corpo. Palácio de Cristal. União Ilustre.",
        description:
          "Forma completa do encontro entre O Ilustre e O Miúdo. Os dois compartilham vida, ataques e reflexos, alternando entre uma criatura colossal e duas entidades independentes durante a batalha.",
      },

      // =========================================================
      // RAIDS — ÁREA 2 DO SINDICATO
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-2",
        name: "A Flor Negra",
        image: "",
        type: "RAID — Entidade Vegetal de Miasma",
        threat: "10",
        skills:
          "Pétalas Negras. Perfume de Decomposição. Raízes Profundas. Germinação Corrompida. Jardim do Miasma. Invocar Daninhas.",
        description:
          "Flor gigantesca nascida da combinação entre raízes da Flor original e uma concentração extrema de Miasma. Sua presença contamina o solo, altera animais e produz criaturas vegetais subordinadas.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Daninha Corrompida",
        image: "",
        type: "Chefe Invocado — Vegetação de Miasma",
        threat: "7",
        skills:
          "Enraizamento. Chicote Espinhoso. Esporos Roxos. Broto Parasita. Alimentar a Flor Negra.",
        description:
          "Criatura vegetal invocada pela Flor Negra. Absorve energia, corpos e habilidades dos combatentes, transferindo-os para sua invocadora enquanto permanecer viva.",
      },

      // =========================================================
      // RAIDS — ÁREA 3 / THE UNION
      // =========================================================

      {
        collectionId: "the-union-area-3",
        name: "O Sublime",
        image: "",
        type: "RAID — Humanoide de Miasma",
        threat: "10",
        skills:
          "Forma Perfeita. Braços Sublimes. Elevação Violeta. Julgamento da Imperfeição. Corpo Renovado. Ascensão Final.",
        description:
          "Humanoide colossal de aparência quase divina que acredita representar a evolução definitiva das criaturas expostas ao Miasma. Considera todas as outras formas de vida incompletas e tenta incorporá-las ao próprio corpo.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Dragão Branco de Olho Escarlate",
        image: "",
        type: "RAID — Dragão Subártico",
        threat: "10",
        skills:
          "Sopro da Nevasca. Olho Escarlate. Escamas de Gelo. Tempestade Branca. Voo Boreal. Ruptura Glacial.",
        description:
          "Dragão branco que habita os setores congelados de The Union. Seu único olho vermelho consegue acompanhar movimentos através da neve, do Miasma e de estruturas sólidas.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Cabeça do Carrasco Déspota",
        image: "",
        type: "RAID Fragmentado — Cabeça",
        threat: "8",
        skills:
          "Sentença Déspota. Olhar do Carrasco. Grito de Execução. Comando dos Fragmentos. Mordida Colossal.",
        description:
          "Cabeça separada de uma criatura colossal existente no Núcleo Violeta. Mesmo sem corpo, continua emitindo ordens e tentando reunir as demais partes do Carrasco Déspota.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Torso do Carrasco Déspota",
        image: "",
        type: "RAID Fragmentado — Torso",
        threat: "8",
        skills:
          "Muralha de Carne. Coração Tirânico. Pulso de Miasma. Regeneração Central. Absorção de Impacto.",
        description:
          "Torso gigantesco que rasteja pelo Núcleo Violeta utilizando costelas e músculos expostos. É a parte mais resistente do Carrasco e contém o núcleo responsável por sua regeneração.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Braços do Carrasco Déspota",
        image: "",
        type: "RAID Fragmentado — Braços",
        threat: "8",
        skills:
          "Machado Invisível. Agarrão Duplo. Execução Horizontal. Arremesso Colossal. Punhos do Déspota.",
        description:
          "Par de braços separados que se movimenta de maneira independente. Ataca acampamentos, muralhas e grupos de guerreiros como se ainda obedecesse às ordens de uma cabeça ausente.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Pernas do Carrasco Déspota",
        image: "",
        type: "RAID Fragmentado — Pernas",
        threat: "8",
        skills:
          "Marcha Tirânica. Pisão Sísmico. Investida sem Corpo. Salto de Execução. Onda de Impacto.",
        description:
          "Pernas colossais que atravessam The Union em busca das demais partes. Seu deslocamento provoca tremores e destrói estruturas mesmo quando não está atacando diretamente.",
      },
      {
        collectionId: "the-union-area-3",
        name: "O Carrasco Déspota",
        image: "",
        type: "RAID — Aberração Completa",
        threat: "10",
        skills:
          "Sentença Absoluta. Machado do Déspota. Marcha da Execução. Coração Tirânico. Regeneração dos Fragmentos. Última Sentença.",
        description:
          "Forma completa criada quando cabeça, torso, braços e pernas conseguem se reunir. O Carrasco Déspota considera todos os seres vivos culpados e tenta executar qualquer criatura encontrada dentro do Núcleo Violeta.",
      },

      // =========================================================
      // RAID SECRETA
      // =========================================================

      {
        collectionId: "fronteira-area-2",
        name: "O Deus do Sangue",
        image: "",
        type: "RAID Secreta — Entidade Abissal",
        threat: "10",
        skills:
          "Oceano de Sangue. Pressão Abissal. Olho sob as Águas. Pulso Orgânico. Embarcação Engolida. Coração do Abismo.",
        description:
          "Entidade escondida nas profundezas da Fossa do Presságio. Sua presença transforma a água em um líquido semelhante a sangue e faz embarcações ouvirem batimentos vindos debaixo do oceano. Pouquíssimas pessoas sabem que ela existe.",
      },

      // =========================================================
      // ANJOS ESPECIAIS E SECRETOS
      // =========================================================

      {
        collectionId: "dominio-manifesto",
        name: "Ifrit",
        image: "",
        type: "Especial — Anjo de Entoadora",
        threat: "8",
        skills:
          "Canto das Chamas. Asas Incandescentes. Espada de Fogo. Coro Ardente. Apoteose Ígnea.",
        description:
          "Anjo ligado a uma Entoadora ainda não identificada. Sua manifestação assume uma forma envolvida em fogo e reage violentamente a emoções intensas de raiva, coragem e desejo de proteção.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Gabriella",
        image: "",
        type: "Especial — Anjo de Entoadora",
        threat: "8",
        skills:
          "Coro Restaurador. Asas Protetoras. Luz Harmônica. Julgamento Compassivo. Ressurreição Incompleta.",
        description:
          "Anjo associado à cura, à proteção e à preservação da vida. Sua presença pode restaurar aliados, mas também impedir que pessoas morram mesmo quando seus corpos já não suportam continuar.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Phanuel",
        image: "",
        type: "Especial — Anjo de Entoadora",
        threat: "8",
        skills:
          "Olhar da Verdade. Canto do Julgamento. Memória Revelada. Correntes Harmônicas. Sentença Celestial.",
        description:
          "Anjo capaz de revelar segredos, lembranças e intenções escondidas. A exposição prolongada à sua voz pode obrigar uma pessoa a reviver tudo aquilo que tentou esquecer.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Egregori",
        image: "",
        type: "Especial — Anjo de Entoadora",
        threat: "8",
        skills:
          "Olhos Vigilantes. Coro dos Observadores. Asas Múltiplas. Queda Celestial. Conhecimento Proibido.",
        description:
          "Anjo de aparência inquietante, coberto por olhos e asas sobrepostas. Observa acontecimentos que deveriam permanecer escondidos e pode revelar conhecimentos que ameaçam tanto o Manifesto quanto o Sindicato.",
      },

      // =========================================================
      // TRANSFORMAÇÕES ESPECIAIS
      // =========================================================

      {
        collectionId: "dominio-manifesto",
        name: "Eleonora, a Dragoa Donzela de Duas Cabeças",
        image: "",
        type: "Especial — Transformação Dracônica",
        threat: "10",
        skills:
          "Cabeça Radiante. Cabeça do Vazio. Sopro Duplo. Escamas da Donzela. Conflito das Marcas. Asas do Despertar.",
        description:
          "Forma dracônica de Eleonora. Uma das cabeças manifesta o poder do Manifesto, enquanto a outra expressa a Marca Oculto. A transformação pode representar perda de controle, sacrifício ou domínio completo de sua natureza dupla.",
      },
      {
        collectionId: "dominio-manifesto-area-3",
        name: "Aldwin, o General dos Dragões",
        image: "",
        type: "Especial — Transformação Dracônica",
        threat: "10",
        skills:
          "Sopro do General. Comando Dracônico. Escamas de Guerra. Formação dos Dragões. Investida Real. Decreto de Extermínio.",
        description:
          "Forma dracônica de Aldwin. Mesmo transformado, preserva seu conhecimento militar e coordena ecos ou manifestações dracônicas como se comandasse um exército.",
      },

      // =========================================================
      // SLIMES
      // =========================================================

      {
        collectionId: "criaturas-genericas",
        name: "Slime",
        image: "",
        type: "Criatura Comum",
        threat: "1",
        skills:
          "Corpo Gelatinoso. Salto Pegajoso. Absorção Leve. Divisão Incompleta.",
        description:
          "Criatura gelatinosa encontrada em cavernas, florestas úmidas, esgotos e ruínas. É comum nas três áreas, especialmente em locais com bastante água.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Slime de Miasma",
        image: "",
        type: "Criatura de Miasma",
        threat: "2",
        skills:
          "Corpo Contaminado. Cuspe Roxo. Contaminação Leve. Divisão Miasmática.",
        description:
          "Slime alterado pelo contato com Miasma. Pode surgir em qualquer região contaminada, incluindo a Cratera, as Cinzas Recentes e The Union.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Slime Explosivo",
        image: "",
        type: "Criatura Instável",
        threat: "2",
        skills:
          "Salto Instável. Núcleo Inchado. Explosão Final. Resíduo Pegajoso.",
        description:
          "Slime que acumula gases, calor ou energia mágica dentro do corpo. Explode ao sofrer muito dano ou ao se aproximar de fontes intensas de energia.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Slime Contaminado",
        image: "",
        type: "Criatura Especial de Miasma",
        threat: "3",
        skills:
          "Absorção Contaminada. Imitação Orgânica. Mancha Persistente. Contaminação Moderada.",
        description:
          "Slime que absorveu partes de animais, pessoas ou monstros contaminados. Sua forma muda constantemente e pode reproduzir características das criaturas consumidas.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Slime de Lixo",
        image: "",
        type: "Criatura Urbana",
        threat: "2",
        skills:
          "Absorver Detrito. Arremesso de Sucata. Odor Pútrido. Camuflagem em Resíduos.",
        description:
          "Slime encontrado em cidades superlotadas, portos, fábricas e depósitos. Incorpora lixo, metal, vidro e restos orgânicos ao próprio corpo.",
      },

      // =========================================================
      // GOBLINS
      // =========================================================

      {
        collectionId: "criaturas-genericas",
        name: "Goblin",
        image: "",
        type: "Humanoide Comum",
        threat: "1",
        skills: "Emboscada. Faca Improvisada. Roubo Rápido. Fuga em Grupo.",
        description:
          "Pequeno humanoide encontrado em ruínas, florestas, cavernas e estradas abandonadas. Prefere atacar em grupos e fugir quando perde vantagem.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Goblin das Chamas",
        image: "",
        type: "Humanoide Ígneo",
        threat: "2",
        skills:
          "Tocha Arremessada. Frasco Incendiário. Resistência ao Calor. Fuga Flamejante.",
        description:
          "Goblin adaptado a regiões quentes, fábricas, forjas e cavernas vulcânicas. É especialmente comum na Área 2 e nas proximidades de instalações industriais.",
      },

      // =========================================================
      // OGROS, TROLLS E YETIS
      // =========================================================

      {
        collectionId: "criaturas-genericas",
        name: "Ogro",
        image: "",
        type: "Gigante Comum",
        threat: "3",
        skills: "Clava Pesada. Agarrão. Arremesso de Pedra. Resistência Bruta.",
        description:
          "Humanoide de grande porte encontrado em florestas, colinas e ruínas. Pode ser solitário ou servir como força bruta para grupos menores.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Ogro Lanceiro",
        image: "",
        type: "Gigante Guerreiro",
        threat: "4",
        skills:
          "Lança Colossal. Varredura. Investida. Arremesso de Lança. Formação Bruta.",
        description:
          "Ogro treinado para combater com lanças de grande alcance. Costuma proteger passagens, fortalezas abandonadas ou grupos organizados de monstros.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Ogro Ancião",
        image: "",
        type: "Gigante Ancião",
        threat: "5",
        skills:
          "Clava Ancestral. Rugido de Comando. Pele Endurecida. Sabedoria Selvagem. Fúria Final.",
        description:
          "Ogro que sobreviveu por décadas e aprendeu a comandar outras criaturas. É mais inteligente, resistente e estratégico que os demais membros da espécie.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Troll",
        image: "",
        type: "Gigante Regenerativo",
        threat: "4",
        skills:
          "Regeneração. Golpe de Braço. Mordida. Arremesso. Fúria Regenerativa.",
        description:
          "Criatura grande e regenerativa encontrada em florestas úmidas, pontes, cavernas e regiões montanhosas das Áreas 1 e 2.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Yeti",
        image: "",
        type: "Besta Subártica",
        threat: "5",
        skills:
          "Camuflagem na Neve. Abraço Esmagador. Rugido da Geada. Arremesso de Gelo. Resistência ao Frio.",
        description:
          "Criatura de pelagem espessa encontrada exclusivamente nas montanhas nevadas e regiões subárticas da Área 3.",
      },

      // =========================================================
      // ORCS
      // =========================================================

      {
        collectionId: "criaturas-genericas",
        name: "Orc",
        image: "",
        type: "Humanoide Guerreiro",
        threat: "2",
        skills:
          "Machado Pesado. Investida. Resistência Física. Grito de Guerra.",
        description:
          "Humanoide robusto encontrado em acampamentos, ruínas e regiões afastadas. Alguns vivem como saqueadores, enquanto outros formam comunidades próprias.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Orc Criança",
        image: "",
        type: "Humanoide Jovem",
        threat: "1",
        skills:
          "Fuga Rápida. Grito de Alerta. Arremesso de Pedra. Mordida Desesperada.",
        description:
          "Orc ainda jovem que normalmente foge, se esconde ou chama adultos ao perceber perigo. Funciona melhor em cenas de resgate, investigação ou conflito social do que como inimigo de combate comum.",
      },

      // =========================================================
      // RAÍZES DA FLOR
      // =========================================================

      {
        collectionId: "criaturas-genericas",
        name: "Raiz Jovem",
        image: "",
        type: "Criatura Vegetal",
        threat: "2",
        skills: "Chicote de Raiz. Enterrar. Broto Rápido. Absorção do Solo.",
        description:
          "Pequena manifestação móvel das raízes da Flor. Costuma surgir em regiões onde partes subterrâneas foram cortadas, queimadas ou expostas.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Raiz",
        image: "",
        type: "Criatura Vegetal",
        threat: "4",
        skills:
          "Enraizamento. Braços Lenhosos. Absorção Vital. Prisão Vegetal. Regeneração do Solo.",
        description:
          "Grande criatura formada por raízes da Flor. Seu comportamento pode ser defensivo, agressivo ou orientado por alguma vontade desconhecida.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Raiz Nevada",
        image: "",
        type: "Criatura Vegetal Subártica",
        threat: "4",
        skills:
          "Casca Congelada. Chicote de Gelo. Enterrar na Neve. Esporos Gelados. Regeneração Invernal.",
        description:
          "Raiz adaptada às regiões frias da Área 3. Permanece imóvel sob a neve até detectar calor, movimento ou energia de uma Marca.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Raiz Miasmática",
        image: "",
        type: "Criatura Vegetal de Miasma",
        threat: "5",
        skills:
          "Espinhos Roxos. Dreno de Marca. Névoa Miasmática. Contaminação do Solo. Regeneração Corrompida.",
        description:
          "Raiz da Flor profundamente contaminada pelo Miasma. Pode aparecer em regiões de alta incidência e transformar a vegetação próxima em novas criaturas.",
      },

      // =========================================================
      // ESQUELETOS
      // =========================================================

      {
        collectionId: "criaturas-genericas",
        name: "Esqueleto",
        image: "",
        type: "Morto-Vivo Comum",
        threat: "1",
        skills: "Golpe Ósseo. Corpo sem Dor. Reerguer. Mordida.",
        description:
          "Restos animados por Miasma, magia ou energia residual. É comum em cemitérios, ruínas, criptas e antigos campos de batalha.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Esqueleto Soldado",
        image: "",
        type: "Morto-Vivo Militar",
        threat: "2",
        skills:
          "Espada Enferrujada. Formação Morta. Escudo Ósseo. Marcha Ininterrupta.",
        description:
          "Restos de um antigo soldado que preserva fragmentos de treinamento e continua obedecendo ordens esquecidas.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Esqueleto Cavaleiro",
        image: "",
        type: "Morto-Vivo de Elite",
        threat: "4",
        skills:
          "Lâmina Morta. Armadura Antiga. Investida Fantasma. Postura de Guarda. Duelo Eterno.",
        description:
          "Cavaleiro reanimado que mantém armadura, armas e parte de seu código de combate. Pode proteger tumbas, castelos ou membros mortos da nobreza.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Esqueleto Mago",
        image: "",
        type: "Morto-Vivo Arcano",
        threat: "4",
        skills:
          "Projétil Arcano. Maldição Óssea. Levantar Mortos. Barreira Espectral. Explosão de Mana.",
        description:
          "Restos de um usuário de magia que manteve parte de suas habilidades após a morte. Costuma controlar esqueletos menores.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Esqueleto de Alma",
        image: "",
        type: "Morto-Vivo Espiritual",
        threat: "5",
        skills:
          "Corpo Incorpóreo. Roubo de Alma. Grito Espiritual. Possessão Óssea. Retorno Fantasma.",
        description:
          "Esqueleto cuja alma permanece presa aos ossos. Alterna entre forma física e espiritual, tornando-se difícil de atingir.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Esqueleto de Ouro",
        image: "",
        type: "Morto-Vivo Raro",
        threat: "5",
        skills:
          "Ossos Dourados. Reflexo Radiante. Toque da Ganância. Chuva de Moedas. Corpo Valioso.",
        description:
          "Esqueleto coberto por ouro, joias ou metal fundido. É encontrado em tumbas nobres, cofres e locais marcados por ganância extrema.",
      },

      // =========================================================
      // LAGARTOS
      // =========================================================

      {
        collectionId: "criaturas-genericas",
        name: "Lagarto Escudeiro",
        image: "",
        type: "Humanoide Reptiliano",
        threat: "2",
        skills:
          "Escudo de Escamas. Bloqueio Baixo. Mordida. Proteção de Grupo.",
        description:
          "Humanoide reptiliano que protege aliados com grandes escudos. É mais comum nas regiões quentes da Área 2.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Lagarto Guerreiro",
        image: "",
        type: "Humanoide Reptiliano",
        threat: "3",
        skills:
          "Lâmina Curva. Cauda Giratória. Escamas Resistentes. Investida Reptiliana.",
        description:
          "Guerreiro reptiliano ágil e resistente. Pode viver em ruínas quentes, vales rochosos, cavernas e regiões agrícolas afastadas.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Lagarto Capitão",
        image: "",
        type: "Humanoide Reptiliano de Elite",
        threat: "5",
        skills:
          "Comando Escamado. Lança Serrilhada. Rugido Reptiliano. Formação de Escudos. Golpe do Capitão.",
        description:
          "Líder militar dos grupos reptilianos. Coordena escudeiros e guerreiros, utilizando estratégias simples, mas eficientes.",
      },

      // =========================================================
      // DRACÔNICOS
      // =========================================================

      {
        collectionId: "criaturas-genericas",
        name: "Wyvern",
        image: "",
        type: "Besta Dracônica",
        threat: "5",
        skills:
          "Voo Rasante. Ferrão da Cauda. Mordida. Garras Aéreas. Rajada de Vento.",
        description:
          "Predador alado encontrado em montanhas, penhascos e ilhas. É mais comum nas Áreas 1 e 2, mas pode migrar para regiões menos frias da Área 3.",
      },

      // =========================================================
      // ABERRAÇÕES
      // =========================================================

      {
        collectionId: "criaturas-genericas",
        name: "Aberração Maligna",
        image: "",
        type: "Aberração",
        threat: "3",
        skills:
          "Garras Deformadas. Corpo Irregular. Mordida Maligna. Movimento Imprevisível.",
        description:
          "Criatura deformada por magia, experimentos ou exposição incompleta ao Miasma. Pode assumir diversas aparências.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Aberração Feroz",
        image: "",
        type: "Aberração",
        threat: "4",
        skills:
          "Investida Feroz. Múltiplas Garras. Fúria Crescente. Regeneração Selvagem.",
        description:
          "Aberração extremamente agressiva que ataca qualquer criatura próxima. Costuma surgir em regiões onde monstros diferentes foram fundidos ou contaminados juntos.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Aberração Miasmática",
        image: "",
        type: "Aberração de Miasma",
        threat: "5",
        skills:
          "Pulso Roxo. Contaminação. Corpo Mutável. Névoa Interna. Regeneração Miasmática.",
        description:
          "Aberração completamente alterada pelo Miasma. É comum em zonas contaminadas, ruínas recentes e The Union.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Aberração Turbulenta",
        image: "",
        type: "Aberração Instável",
        threat: "6",
        skills:
          "Explosão Turbulenta. Mudança de Forma. Campo Instável. Ataque Aleatório. Colapso Energético.",
        description:
          "Criatura incapaz de manter uma forma física estável. Seus membros, tamanho e habilidades mudam durante a batalha.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Aberração Fundida",
        image: "",
        type: "Aberração de Elite",
        threat: "7",
        skills:
          "Corpos Fundidos. Múltiplos Ataques. Vozes Presas. Regeneração por Absorção. Separação Violenta.",
        description:
          "Massa composta por diferentes criaturas ou pessoas fundidas pelo Miasma. Cada parte do corpo pode agir de forma independente.",
      },

      // =========================================================
      // CENTOPEIAS
      // =========================================================

      {
        collectionId: "criaturas-genericas",
        name: "Centopeia",
        image: "",
        type: "Inseto Gigante",
        threat: "2",
        skills: "Mordida Venenosa. Escalada. Enrolar. Movimento Subterrâneo.",
        description:
          "Artrópode de grande porte encontrado em cavernas, florestas úmidas, esgotos e ruínas.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Centopeia da Água",
        image: "",
        type: "Inseto Aquático",
        threat: "3",
        skills:
          "Nado Serpentino. Mordida Aquática. Enrolar Submerso. Veneno Diluidor.",
        description:
          "Centopeia adaptada a rios, lagos, pântanos e regiões costeiras. Pode aparecer no Lago do Véu Roxo, nos Lagos Claros e em cidades portuárias.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Centopeia do Abismo",
        image: "",
        type: "Inseto Abissal",
        threat: "5",
        skills:
          "Travessia das Fendas. Veneno do Vazio. Carapaça Negra. Enrolar Abissal. Escuridão Total.",
        description:
          "Centopeia encontrada em cavernas profundas, portais instáveis e passagens próximas ao Vazio. Sua carapaça absorve grande parte da luz.",
      },

      // =========================================================
      // HARPIAS
      // =========================================================

      {
        collectionId: "criaturas-genericas",
        name: "Harpia",
        image: "",
        type: "Besta Alada",
        threat: "3",
        skills: "Garras Aéreas. Grito Estridente. Voo Rasante. Roubo de Presa.",
        description:
          "Criatura alada que habita penhascos, montanhas e ruínas elevadas. Pode aparecer nas três áreas, embora evite as regiões mais frias.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Harpia Fantasma",
        image: "",
        type: "Besta Alada Espiritual",
        threat: "5",
        skills:
          "Voo Incorpóreo. Grito dos Mortos. Garras Espectrais. Desaparecimento. Possessão Aérea.",
        description:
          "Harpia morta cuja forma permanece presa ao mundo. É encontrada em montanhas, cemitérios e locais onde bandos inteiros morreram.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Harpia Sereia",
        image: "",
        type: "Besta Alada Costeira",
        threat: "4",
        skills:
          "Canto de Atração. Mergulho Aéreo. Garras Marinhas. Encanto Costeiro. Afogamento.",
        description:
          "Variante costeira que utiliza uma voz hipnótica para atrair marinheiros e viajantes até penhascos, recifes ou águas profundas.",
      },

      // =========================================================
      // CRIATURAS GENÉRICAS DE MIASMA JÁ EXISTENTES
      // =========================================================

      {
        collectionId: "criaturas-genericas",
        name: "Errante do Miasma",
        image: "",
        type: "Humanoide Corrompido",
        threat: "3",
        skills:
          "Marcha Silenciosa. Pele Roxa. Grito sem Voz. Contaminação Leve. Perseguição Incessante.",
        description:
          "Pessoa ou criatura exposta ao Miasma por tempo demais. Move-se de forma irregular, não fala e parece reagir a sons distantes que ninguém mais consegue ouvir.",
      },
      {
        collectionId: "criaturas-genericas",
        name: "Cópia Roxa",
        image: "",
        type: "Manifestação de Miasma",
        threat: "4",
        skills:
          "Imitação Imperfeita. Corpo Instável. Ataque Repetido. Cópia de Movimento. Dissolução.",
        description:
          "Cópia contaminada de uma criatura, guerreiro ou pessoa. Possui aparência violeta, comportamento agressivo e reproduz de maneira imperfeita as habilidades do original.",
      },
    ],

    items: [
      // =========================================================
      // ECONOMIA
      // =========================================================

      {
        collectionId: "itens-gerais",
        name: "Moeda",
        type: "Moeda",
        description:
          "Unidade monetária utilizada nas regiões conhecidas. Manifesto e Sindicato produzem versões com símbolos diferentes, mas ambas possuem o mesmo valor comercial. É armazenada em quantidade e não concede efeitos de combate.",
      },

      // =========================================================
      // CONSUMÍVEIS E ITENS DE SOBREVIVÊNCIA
      // =========================================================

      {
        collectionId: "itens-gerais",
        name: "Ração de Viagem",
        type: "Consumível",
        description:
          "Pode ser utilizada apenas fora de combate. Após dez minutos de descanso, causa Recuperação de 1d4 de vida. Um personagem só pode receber esse benefício uma vez por descanso.",
      },
      {
        collectionId: "itens-gerais",
        name: "Cantil Antimiasma",
        type: "Consumível / Equipamento de Exploração",
        description:
          "Possui três doses. Consumir uma dose exige uma ação e concede Aumento de +2 RES durante três turnos contra criaturas, ambientes e efeitos relacionados ao Miasma. Não remove debuffs já aplicados.",
      },
      {
        collectionId: "itens-gerais",
        name: "Atadura de Campo",
        type: "Consumível Médico",
        description:
          "Exige uma ação e causa Recuperação de 1d4 + 1 de vida em um alvo próximo. Cada personagem só pode receber o efeito de uma Atadura de Campo uma vez por combate.",
      },
      {
        collectionId: "itens-gerais",
        name: "Tônico Restaurador",
        type: "Consumível Médico",
        description:
          "Exige uma ação para ser ingerido e causa Recuperação imediata de 1d6 + 2 de vida. Não produz efeito enquanto o usuário estiver sob Infecção.",
      },
      {
        collectionId: "itens-gerais",
        name: "Essência de Concentração",
        type: "Consumível",
        description:
          "Exige uma ação e concede Aumento de +2 INT e +2 DET durante dois turnos. Consumir outra essência apenas renova a duração.",
      },
      {
        collectionId: "itens-gerais",
        name: "Antídoto de Esporos",
        type: "Consumível Médico",
        description:
          "Exige uma ação e causa Purificação no alvo: remove todos os debuffs atuais e concede imunidade a novos debuffs durante um turno.",
      },
      {
        collectionId: "itens-gerais",
        name: "Incenso de Purificação",
        type: "Consumível",
        description:
          "Exige uma ação para ser aceso. Um alvo próximo recebe Purificação, removendo todos os seus debuffs e tornando-se imune a novos debuffs durante um turno.",
      },
      {
        collectionId: "itens-gerais",
        name: "Óleo Incendiário",
        type: "Consumível de Combate",
        description:
          "Exige uma ação para ser aplicado a uma arma. O próximo ataque bem-sucedido realizado nos três turnos seguintes causa Queimadura, provocando 2 de dano de fogo por turno durante três turnos.",
      },
      {
        collectionId: "itens-gerais",
        name: "Ampola de Geada",
        type: "Consumível de Combate",
        description:
          "Exige uma ação para ser aplicada a uma arma. O próximo ataque bem-sucedido realizado nos três turnos seguintes causa Queimadura de gelo, provocando 1 de dano por turno durante três turnos e Redução de -3 DES durante um turno.",
      },
      {
        collectionId: "itens-gerais",
        name: "Veneno de Centopeia",
        type: "Consumível de Combate",
        description:
          "Exige uma ação para ser aplicado a uma arma. O próximo ataque bem-sucedido realizado nos três turnos seguintes causa Envenenamento, provocando 2 de dano por turno durante dois turnos.",
      },
      {
        collectionId: "itens-gerais",
        name: "Esporos Infecciosos",
        type: "Consumível Proibido",
        description:
          "Exige uma ação para ser arremessado ou aplicado a uma arma. Ao atingir o alvo, causa Infecção durante dois turnos, impedindo qualquer Recuperação ou Regeneração.",
      },
      {
        collectionId: "itens-gerais",
        name: "Bomba de Névoa Umbral",
        type: "Consumível de Combate",
        description:
          "Exige uma ação e cria uma nuvem escura até o começo do próximo turno do usuário. Todos os indivíduos dentro dela, exceto o usuário, recebem Desvantagem em suas próximas rolagens.",
      },
      {
        collectionId: "itens-gerais",
        name: "Totem de Desafio",
        type: "Consumível de Combate",
        description:
          "Exige uma ação para ser ativado. O usuário recebe dois acúmulos de Provocação durante dois turnos. Os ataques inimigos são redirecionados para ele e o dano recebido é reduzido em 4 enquanto os dois acúmulos permanecerem ativos.",
      },
      {
        collectionId: "itens-gerais",
        name: "Marca do Presságio",
        type: "Consumível Oculto",
        description:
          "Exige uma ação e uma rolagem bem-sucedida contra o alvo. Aplica Presságio: após dois turnos completos, o alvo perde sua próxima ação.",
      },
      {
        collectionId: "itens-gerais",
        name: "Ampola de Decadência",
        type: "Consumível Proibido de Miasma",
        description:
          "Exige uma ação para ser aplicada a uma arma. O próximo ataque bem-sucedido realizado nos três turnos seguintes causa Decadência, provocando 1 de dano por turno até o fim da batalha. O efeito pode ser removido por Purificação.",
      },

      // =========================================================
      // FERRAMENTAS E EQUIPAMENTOS DE EXPLORAÇÃO
      // =========================================================

      {
        collectionId: "itens-gerais",
        name: "Máscara Filtrante",
        type: "Equipamento de Exploração",
        description:
          "Enquanto estiver equipada, concede +2 RES em testes contra gases, fumaça, esporos, venenos inaláveis e Miasma ambiental. Por dificultar a fala e esconder o rosto, também causa -1 PRE.",
      },
      {
        collectionId: "itens-gerais",
        name: "Sinalizador de Emergência",
        type: "Ferramenta",
        description:
          "Exige uma ação para ser ativado e produz uma luz visível a grande distância durante três turnos. Pode revelar a localização do grupo, solicitar resgate ou afastar criaturas sensíveis à luz, conforme decisão do mestre.",
      },
      {
        collectionId: "itens-gerais",
        name: "Lanterna de Cristal",
        type: "Ferramenta",
        description:
          "Enquanto estiver acesa, o portador e aliados próximos não recebem Desvantagem causada exclusivamente por escuridão comum. Não dissipa escuridão mágica ou produzida pelo Miasma.",
      },
      {
        collectionId: "itens-gerais",
        name: "Kit de Escalada",
        type: "Ferramenta de Exploração",
        description:
          "Quando houver tempo para preparar o equipamento, concede Vantagem em testes de DES relacionados a escalada, descida controlada e travessia de superfícies verticais.",
      },
      {
        collectionId: "itens-gerais",
        name: "Kit de Ferramentas",
        type: "Ferramenta",
        description:
          "Concede Vantagem em testes de INT para reparar armas, armaduras, mecanismos, estruturas e equipamentos. Não pode reconstruir objetos completamente destruídos.",
      },
      {
        collectionId: "itens-gerais",
        name: "Corda Reforçada",
        type: "Ferramenta de Exploração",
        description:
          "Quando devidamente presa, concede Vantagem em testes de DES relacionados a escalada, resgate ou contenção. Pode ser destruída por ataques cortantes, fogo ou criaturas de grande porte.",
      },
      {
        collectionId: "itens-gerais",
        name: "Mapa de Rotas",
        type: "Ferramenta de Navegação",
        description:
          "Concede Vantagem em testes de INT ou DET para navegação dentro da região representada. Mapas desatualizados podem perder o benefício ou conduzir o grupo a rotas perigosas.",
      },

      // =========================================================
      // EQUIPAMENTOS DO MANIFESTO
      // =========================================================

      {
        collectionId: "itens-gerais",
        name: "Espada de Vigília",
        type: "Arma — Manifesto",
        description:
          "Enquanto equipada, concede +2 POD. Um usuário da Marca Manifesto também recebe Vantagem na primeira rolagem feita para canalizar uma habilidade através da espada em cada combate.",
      },
      {
        collectionId: "itens-gerais",
        name: "Escudo Aureolar",
        type: "Escudo — Manifesto",
        description:
          "Enquanto equipado, concede +2 RES e causa -1 DES. Uma vez por combate, o portador pode receber um acúmulo de Provocação durante dois turnos sem gastar uma ação.",
      },
      {
        collectionId: "itens-gerais",
        name: "Armadura de Sentinela",
        type: "Armadura — Manifesto",
        description:
          "Enquanto equipada, concede +3 RES e causa -2 DES. Esses modificadores permanecem ativos enquanto a armadura estiver sendo utilizada.",
      },
      {
        collectionId: "itens-gerais",
        name: "Medalhão da Flor",
        type: "Acessório Religioso",
        description:
          "Enquanto equipado, concede +1 PRE. Uma vez por descanso, o portador pode usar uma ação para causar Purificação em si mesmo ou em um aliado próximo.",
      },

      // =========================================================
      // EQUIPAMENTOS DO OCULTO
      // =========================================================

      {
        collectionId: "itens-gerais",
        name: "Adaga Umbral",
        type: "Arma — Oculto",
        description:
          "Enquanto equipada, concede +2 DES e causa -1 RES. Uma vez por combate, um ataque realizado enquanto o usuário estiver oculto também causa Infecção durante um turno.",
      },
      {
        collectionId: "itens-gerais",
        name: "Manto do Véu",
        type: "Vestimenta — Oculto",
        description:
          "Concede +2 DES em testes de furtividade, fuga e ocultação. Quando utilizado em encontros sociais formais, causa -1 PRE por despertar desconfiança.",
      },
      {
        collectionId: "itens-gerais",
        name: "Lanterna Umbral",
        type: "Ferramenta — Oculto",
        description:
          "Impede Desvantagem causada por escuridão comum e concede +2 INT em testes para investigar portais, ruínas, túneis e estruturas do Sindicato.",
      },
      {
        collectionId: "itens-gerais",
        name: "Selo de Travessia",
        type: "Ferramenta de Portal",
        description:
          "Identifica o portador como alguém autorizado a atravessar determinados portais do Sindicato. Não concede bônus de combate, mas pode evitar testes, confrontos ou recusas de guardas ligados à rede de portais.",
      },

      // =========================================================
      // EQUIPAMENTOS DA RESPIRAÇÃO
      // =========================================================

      {
        collectionId: "itens-gerais",
        name: "Katana de Seiran",
        type: "Arma — Respiração",
        description:
          "Enquanto equipada, concede +2 DES e +1 POD, mas causa -1 RES. Os bônus representam precisão e velocidade, enquanto a penalidade reflete a proteção limitada do estilo.",
      },
      {
        collectionId: "itens-gerais",
        name: "Faixa de Respiração",
        type: "Acessório — Respiração",
        description:
          "Enquanto equipada, concede +1 DET. Uma vez por combate, o usuário pode receber Aumento de +2 DES durante dois turnos sem gastar uma ação.",
      },
      {
        collectionId: "itens-gerais",
        name: "Botas do Passo Leve",
        type: "Equipamento — Respiração",
        description:
          "Enquanto equipadas, concedem +2 DES e causam -1 RES. Também impedem Desvantagem causada por terrenos escorregadios ou irregulares comuns.",
      },
      {
        collectionId: "itens-gerais",
        name: "Arco de Ventomar",
        type: "Arma — Respiração",
        description:
          "Enquanto equipado, concede +2 DES em ataques e testes relacionados a disparos. O bônus não é aplicado em combates corpo a corpo.",
      },

      // =========================================================
      // EQUIPAMENTOS DE ENTOADORAS
      // =========================================================

      {
        collectionId: "itens-gerais",
        name: "Diapasão de Songbird",
        type: "Instrumento — Entoadora",
        description:
          "Enquanto equipado, concede +2 PRE em habilidades de Entoadora. Uma vez por combate, pode conceder Vantagem à próxima rolagem de uma entoação.",
      },
      {
        collectionId: "itens-gerais",
        name: "Partitura de Combate",
        type: "Equipamento — Entoadora",
        description:
          "Uma vez por combate, a Entoadora escolhe uma composição e recebe Aumento de +2 PRE ou +2 INT durante dois turnos. A escolha deve ser feita ao ativar a partitura.",
      },
      {
        collectionId: "itens-gerais",
        name: "Luvas de Ressonância",
        type: "Equipamento — Entoadora",
        description:
          "Enquanto equipadas, concedem +1 PRE e +1 DES. Os bônus não são duplicados caso as duas luvas sejam registradas separadamente.",
      },
      {
        collectionId: "itens-gerais",
        name: "Protetor de Garganta",
        type: "Acessório — Entoadora",
        description:
          "Enquanto equipado, concede +2 RES em testes contra efeitos que prejudiquem a voz, a respiração ou a concentração musical. Uma vez por combate, concede Vantagem à primeira entoação realizada após o usuário sofrer dano.",
      },

      // =========================================================
      // EQUIPAMENTOS MASO E EQUIPAMENTOS COMUNS
      // =========================================================

      {
        collectionId: "itens-gerais",
        name: "Manoplas de Impacto",
        type: "Arma — Maso",
        description:
          "Enquanto equipadas, concedem +2 POD e causam -1 DES. O bônus também se aplica a testes realizados para quebrar objetos, portas ou estruturas.",
      },
      {
        collectionId: "itens-gerais",
        name: "Arnês de Contenção",
        type: "Equipamento — Maso",
        description:
          "Enquanto equipado, concede +3 RES e causa -2 DES. Uma vez por combate, o usuário pode receber um acúmulo de Provocação durante dois turnos.",
      },
      {
        collectionId: "itens-gerais",
        name: "Lâmina Adaptativa",
        type: "Arma — Maso",
        description:
          "No início de cada turno, o usuário escolhe uma configuração: força, concedendo +2 POD, ou precisão, concedendo +2 DES. Apenas uma configuração pode permanecer ativa por vez.",
      },
      {
        collectionId: "itens-gerais",
        name: "Ferramenta Multiuso de Rochaviva",
        type: "Ferramenta",
        description:
          "Concede Vantagem em testes de INT para reparos improvisados, abertura de mecanismos simples e desmontagem de equipamentos.",
      },
      {
        collectionId: "itens-gerais",
        name: "Besta de Campanha",
        type: "Arma",
        description:
          "Concede +2 DES em ataques à distância. Após realizar um disparo, o usuário precisa gastar sua próxima ação para recarregar antes de atacar novamente com a arma.",
      },
      {
        collectionId: "itens-gerais",
        name: "Armadura de Couro Reforçado",
        type: "Armadura",
        description:
          "Enquanto equipada, concede +2 RES e causa -1 DES. Pode ser reparada com um Kit de Ferramentas após ser danificada.",
      },

      // =========================================================
      // MATERIAIS DE CRIATURAS
      // =========================================================

      {
        collectionId: "itens-gerais",
        name: "Gel de Slime",
        type: "Material de Criatura",
        description:
          "Substância retirada de Slimes e utilizada na fabricação de adesivos, medicamentos simples, óleos e compostos alquímicos. Não concede efeitos quando utilizada diretamente.",
      },
      {
        collectionId: "itens-gerais",
        name: "Núcleo de Slime",
        type: "Material de Criatura",
        description:
          "Pequeno núcleo encontrado em Slimes mais desenvolvidos. Pode armazenar líquidos, energia ou resíduos das substâncias absorvidas. Precisa ser transformado por um artesão para produzir efeitos.",
      },
      {
        collectionId: "itens-gerais",
        name: "Presa de Ogro",
        type: "Material de Criatura",
        description:
          "Presa resistente utilizada na fabricação de cabos, adornos, ferramentas e armas rústicas. Não possui efeito direto antes de ser trabalhada.",
      },
      {
        collectionId: "itens-gerais",
        name: "Couro de Troll",
        type: "Material de Criatura",
        description:
          "Couro espesso que preserva parte da capacidade regenerativa do Troll por pouco tempo após ser retirado. Pode ser utilizado na fabricação de armaduras ou consumíveis de Regeneração.",
      },
      {
        collectionId: "itens-gerais",
        name: "Pelo de Yeti",
        type: "Material de Criatura",
        description:
          "Pelagem extremamente resistente ao frio. Pode ser utilizada na produção de vestimentas que protegem contra neve e Queimadura de gelo.",
      },
      {
        collectionId: "itens-gerais",
        name: "Madeira de Raiz",
        type: "Material da Flor",
        description:
          "Fragmento endurecido retirado de uma criatura Raiz. Continua reagindo à água, à luz e à proximidade da Flor. Não concede bônus direto enquanto não for transformado.",
      },
      {
        collectionId: "itens-gerais",
        name: "Osso Animado",
        type: "Material de Morto-Vivo",
        description:
          "Osso que preserva pequenas quantidades da energia responsável por movimentar esqueletos. É utilizado em pesquisas e artefatos proibidos, mas pode atrair mortos-vivos quando armazenado incorretamente.",
      },
      {
        collectionId: "itens-gerais",
        name: "Escama Reptiliana",
        type: "Material de Criatura",
        description:
          "Escama resistente retirada de guerreiros reptilianos. Pode ser utilizada para reforçar armaduras leves após ser trabalhada por um artesão.",
      },
      {
        collectionId: "itens-gerais",
        name: "Membrana de Wyvern",
        type: "Material Dracônico",
        description:
          "Parte flexível das asas de uma Wyvern. É utilizada na produção de planadores, capas e equipamentos resistentes ao vento.",
      },
      {
        collectionId: "itens-gerais",
        name: "Carapaça de Centopeia",
        type: "Material de Criatura",
        description:
          "Placa retirada de uma Centopeia gigante. Pode ser transformada em proteção leve ou utilizada em compostos contra venenos.",
      },
      {
        collectionId: "itens-gerais",
        name: "Pena de Harpia",
        type: "Material de Criatura",
        description:
          "Pena grande e resistente utilizada em flechas, adornos, instrumentos e equipamentos de navegação. Não possui efeito de combate sem preparação.",
      },
      {
        collectionId: "itens-gerais",
        name: "Resíduo de Aberração",
        type: "Material de Miasma",
        description:
          "Massa instável deixada por uma Aberração. É valiosa para pesquisadores, mas pode alterar outros materiais quando armazenada incorretamente. Manipulá-la sem proteção pode provocar contaminação definida pelo mestre.",
      },

      // =========================================================
      // ITENS NARRATIVOS — ÁREA 1 DO MANIFESTO
      // =========================================================

      {
        collectionId: "dominio-manifesto",
        name: "Convite do Festival da Flor",
        type: "Item de Missão",
        description:
          "Convite oficial que permite o acesso do portador à Cidade Catedral durante o Festival da Flor. Pode conter o nome do personagem e a justificativa de sua presença. Não concede bônus de combate.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Fragmento de Pétala",
        type: "Artefato da Flor",
        description:
          "Fragmento ligado à Flor que emite um brilho fraco e reage à presença de Miasma. Não concede bônus fixo, mas pode funcionar como detector narrativo quando o grupo se aproxima de grandes concentrações de Miasma.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Fragmento da Raiz da Flor",
        type: "Artefato Narrativo",
        description:
          "Parte cortada de uma das raízes da Flor. Ainda parece viva e reage a Eleonora, ao Miasma e a determinados membros da família real. Não concede efeito de combate direto.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Relatório de Construção Selado",
        type: "Documento de Missão",
        description:
          "Documento confidencial sobre as obras da Cidade Catedral. Registra danos causados às raízes e ordens para silenciar os trabalhadores envolvidos. Serve como prova contra autoridades do Manifesto.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Lista de Observação da Ponte",
        type: "Documento Secreto",
        description:
          "Lista entregue a Cael Varros com nomes de convidados que devem ser vigiados, detidos ou impedidos de deixar a Cidade Catedral após o Festival.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Selo do Manifesto",
        type: "Item de Autoridade",
        description:
          "Selo utilizado para validar ordens, documentos e permissões oficiais. Pode permitir acesso a áreas restritas ou conceder Vantagem em testes sociais quando sua legitimidade não for questionada.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Diário de Elio",
        type: "Item de Missão Principal",
        description:
          "Diário incompleto do rei desaparecido. Contém observações sobre as raízes, a linhagem real, os portais e o aumento gradual do Miasma.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Medalhão de Leonard",
        type: "Prova de Linhagem",
        description:
          "Medalhão real pertencente a Leonard antes de sua transformação. Sua existência comprova que ele fazia parte da família real e foi removido dos registros oficiais.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Partitura Angelical Rasgada",
        type: "Item de Missão",
        description:
          "Parte de uma composição proibida ligada à manifestação de Anjos. Não pode ser utilizada como Partitura de Combate, mas Rogue consegue cantar algumas de suas notas sem sofrer os efeitos esperados.",
      },

      // =========================================================
      // ITENS NARRATIVOS — ÁREA 1 DO SINDICATO
      // =========================================================

      {
        collectionId: "sindicato-sombras",
        name: "Chave de Noctária",
        type: "Chave de Missão",
        description:
          "Chave metálica que abre uma entrada subterrânea de Noctária. O símbolo gravado nela não corresponde a nenhuma autoridade conhecida.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Mapa dos Portais da Área 1",
        type: "Mapa Secreto",
        description:
          "Mapa incompleto que registra os três portais da Cordilheira Silente e rotas utilizadas para transportar pessoas e materiais. Concede Vantagem em testes de INT ou DET para localizar esses portais e atravessar suas rotas.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Amostra do Lago do Véu Roxo",
        type: "Material de Missão",
        description:
          "Frasco contendo água e Miasma retirados do Lago do Véu Roxo. O líquido forma reflexos que não correspondem às pessoas próximas. Não concede bônus e deve permanecer selado.",
      },

      // =========================================================
      // ITENS NARRATIVOS — ÁREA 2 DO MANIFESTO
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-2",
        name: "Cristal Roxo Instável",
        type: "Material de Missão",
        description:
          "Cristal contaminado que alterna entre brilho violeta e transparência. Pode ter relação com a Planície de Vidro ou com materiais retirados da Cratera. Não concede bônus direto e pode reagir perigosamente a habilidades.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Chave da Cripta Escamada",
        type: "Chave de Masmorra",
        description:
          "Chave pesada marcada com símbolos antigos do Manifesto. Abre uma das passagens seladas sob o Santuário da Primeira Luz.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Registro de Transporte de Ferrúria",
        type: "Documento de Missão",
        description:
          "Registro que lista prisioneiros enviados às fábricas. Muitos nomes aparecem sem confirmação de retorno à Penitenciária do Grilhão.",
      },
      {
        collectionId: "dominio-manifesto-area-2",
        name: "Manifesto de Carga de Solferro",
        type: "Documento de Missão",
        description:
          "Documento naval que comprova o transporte clandestino de cristais, prisioneiros e materiais contaminados em embarcações militares.",
      },

      // =========================================================
      // ITENS NARRATIVOS — ÁREA 2 DO SINDICATO
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-2",
        name: "Lista dos Sem-Nome",
        type: "Documento Funerário",
        description:
          "Registro mantido por A'le com descrições dos corpos encontrados nas Cinzas Recentes. Alguns cadáveres aparecem registrados mais de uma vez.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Relatório da Fenda Latente",
        type: "Documento de Missão",
        description:
          "Conjunto de observações sobre alterações no solo, animais e instrumentos próximos ao ponto onde uma nova manifestação de Miasma pode surgir.",
      },
      {
        collectionId: "sindicato-sombras-area-2",
        name: "Semente da Flor Negra",
        type: "Artefato de Miasma",
        description:
          "Semente aparentemente morta que reage à presença de sangue, raízes da Flor e grandes concentrações de Miasma. Não concede efeito direto, mas pode germinar caso certas condições sejam cumpridas.",
      },

      // =========================================================
      // ITENS NARRATIVOS — ÁREA 3 DO MANIFESTO
      // =========================================================

      {
        collectionId: "dominio-manifesto-area-3",
        name: "Registro de Transferência Hospitalar",
        type: "Documento de Missão",
        description:
          "Documento que comprova a transferência secreta de pacientes do Hospital da Grande Aurora para o Instituto de Maré-Luz sem autorização das famílias.",
      },

      // =========================================================
      // ITENS NARRATIVOS — ÁREA 3 DO SINDICATO
      // =========================================================

      {
        collectionId: "sindicato-sombras-area-3",
        name: "Mapa das Galerias do Subvéu",
        type: "Mapa Secreto",
        description:
          "Mapa das duas passagens conhecidas das Galerias do Subvéu. Undine acrescentou uma terceira rota que leva na direção do Núcleo Violeta. Concede Vantagem em testes de INT ou DET para navegar pelas galerias.",
      },
      {
        collectionId: "sindicato-sombras-area-3",
        name: "Caderno de Ramia",
        type: "Item de Missão",
        description:
          "Caderno preenchido com desenhos, frases e datas escritas por Ramia. Alguns acontecimentos descritos ainda não ocorreram.",
      },
      {
        collectionId: "sindicato-sombras-area-3",
        name: "Registro do Portal do Pico Oco",
        type: "Documento Secreto",
        description:
          "Anotações de Gismor sobre ativações do portal. As últimas páginas descrevem um destino que não pertence à rede conhecida do Sindicato.",
      },

      // =========================================================
      // ITENS NARRATIVOS — THE UNION
      // =========================================================

      {
        collectionId: "the-union-area-3",
        name: "Amostra do Núcleo Violeta",
        type: "Material de Missão",
        description:
          "Fragmento coletado no Núcleo Violeta. Emite vibrações semelhantes a uma composição musical e reage à voz de Chloe. Não concede bônus e pode atrair criaturas do Miasma.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Brasão de Caim",
        type: "Prova de Linhagem",
        description:
          "Brasão pertencente a uma ramificação perdida da família real. Confirma que Caim possui ligação legítima com a linhagem do Manifesto.",
      },
      {
        collectionId: "the-union-area-3",
        name: "Relatório de Claralume",
        type: "Documento de Missão Principal",
        description:
          "Relatório encontrado na cidade vazia. Descreve um chamado ouvido simultaneamente por toda a população pouco antes do desaparecimento.",
      },

      // =========================================================
      // RECOMPENSAS DE MINIBOSSES
      // =========================================================

      {
        collectionId: "recompensas-especiais",
        name: "Pluma Remanescente",
        type: "Recompensa de Miniboss",
        description:
          "Enquanto equipada, concede +2 PRE a Entoadoras. Uma vez por combate, concede Vantagem a uma entoação e impede que ela seja interrompida por dano comum.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Escama Derradeira",
        type: "Recompensa de Miniboss",
        description:
          "Quando transformada em armadura, concede +3 RES e causa -1 DES. Uma vez por descanso, o portador recebe Imortalidade contra um único ataque, ignorando completamente seu dano e seus efeitos.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Coração Solar de Leonard",
        type: "Artefato Dracônico",
        description:
          "Enquanto equipado, concede +2 POD e +2 RES. Uma vez por descanso, o portador pode receber Imortalidade contra um ataque. Após ignorá-lo, recebe Redução de -3 DET durante dois turnos.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Ferrão Nebuloso",
        type: "Recompensa de Miniboss",
        description:
          "Pode ser utilizado como arma leve, concedendo +2 DES. Uma vez por combate, um ataque bem-sucedido causa Envenenamento de 2 de dano por turno durante três turnos e Desvantagem na próxima rolagem do alvo.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Fragmento de Soldado de Cristal",
        type: "Recompensa de Miniboss",
        description:
          "Enquanto equipado como proteção, concede +2 RES e causa -1 DES. Uma vez por combate, concede Imortalidade contra um ataque físico. O fragmento perde esse efeito até o próximo descanso.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Vértebra de Lindwurm",
        type: "Recompensa de Miniboss",
        description:
          "Quando transformada em arma articulada, concede +2 DES e +1 POD. Uma vez por combate, um ataque bem-sucedido pode causar Presságio.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Sineta da Alma Penada",
        type: "Recompensa de Miniboss",
        description:
          "Uma vez por combate, exige uma ação para ser tocada. Um alvo escolhido recebe Presságio e perde uma ação após dois turnos. Mortos-vivos também recebem Desvantagem durante esses dois turnos.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Pena Ourofílica",
        type: "Recompensa de Miniboss",
        description:
          "Enquanto equipada, concede +2 DET em testes para encontrar metais, tesouros e objetos escondidos. Também concede Vantagem ao procurar especificamente ouro ou joias.",
      },

      // =========================================================
      // RECOMPENSAS DE RAIDS
      // =========================================================

      {
        collectionId: "recompensas-especiais",
        name: "Núcleo Coletivo",
        type: "Recompensa de RAID",
        description:
          "Uma vez por descanso, exige uma ação para criar um clone por três turnos. O clone recebe Efêmero: possui metade dos atributos atuais do usuário, arredondados para cima, e um acúmulo de Provocação.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Medalhão Mutagênico do Bruxo",
        type: "Recompensa de RAID",
        description:
          "Enquanto equipado, concede +2 DET e Vantagem em testes contra monstros. Uma vez por combate, um ataque bem-sucedido pode causar Castigar, removendo todos os buffs do alvo e aplicando Infecção durante dois turnos.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Galhada do Flagelo Ancestral",
        type: "Recompensa de RAID",
        description:
          "Uma vez por descanso, exige uma ação e concede Regeneração de 2 de vida por turno durante três turnos. A Regeneração é interrompida caso o usuário receba Infecção.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Insígnia do Ilustre",
        type: "Recompensa de RAID",
        description:
          "Enquanto equipada, concede +2 PRE. Uma vez por combate, um ataque bem-sucedido pode causar Ruína: purifica o alvo e causa 50% de dano adicional caso ele possuísse ao menos um debuff antes da Purificação.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Fragmento do Miúdo",
        type: "Recompensa de RAID",
        description:
          "Enquanto equipado, concede +2 DES. Uma vez por combate, o usuário recebe Vantagem em todas as rolagens de DES durante dois turnos.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Espelho Geminado",
        type: "Recompensa de RAID Dupla",
        description:
          "Uma vez por descanso, exige uma ação e concede Efêmero durante três turnos, criando um clone com metade dos atributos do usuário e um acúmulo de Provocação.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Pétala da Flor Negra",
        type: "Recompensa de RAID",
        description:
          "Uma vez por combate, um ataque bem-sucedido pode causar Decadência de 2 de dano por turno até o fim da batalha. Após aplicar o efeito, o portador recebe Infecção durante dois turnos.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Pétala Sublime",
        type: "Recompensa de RAID",
        description:
          "Uma vez por combate e sem gastar uma ação, o portador escolhe POD, DES, RES, INT, DET ou PRE e recebe Aumento de +2 no atributo escolhido durante três turnos.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Olho Escarlate",
        type: "Recompensa de RAID",
        description:
          "Enquanto equipado, concede +2 DET e impede Desvantagem causada por neve, neblina ou escuridão comum. Uma vez por combate, pode aplicar Presságio a um alvo visível.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Fragmento do Carrasco Déspota",
        type: "Recompensa de RAID",
        description:
          "O modificador depende da parte obtida: Cabeça concede +2 INT e +2 DET; Torso concede +3 RES e -1 DES; Braços concedem +3 POD e -1 DES; Pernas concedem +2 DES e +1 RES. Apenas um Fragmento do Carrasco pode ser equipado por vez.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Machado do Carrasco Déspota",
        type: "Arma de RAID",
        description:
          "Enquanto equipado, concede +3 POD e causa -2 DES. Uma vez por combate, um ataque bem-sucedido pode causar Castigar, removendo todos os buffs do alvo e aplicando Infecção durante dois turnos.",
      },
      {
        collectionId: "recompensas-especiais",
        name: "Coração do Deus do Sangue",
        type: "Recompensa de RAID Secreta",
        description:
          "Enquanto equipado, concede +2 POD e +2 RES, mas causa -2 DET. Uma vez por descanso, o usuário pode ativá-lo durante três turnos. Cada ataque bem-sucedido causa Roubo, drenando 2 de vida do alvo. Ao final, o usuário recebe Decadência de 1 de dano por turno até o fim da batalha.",
      },
    ],

    events: [
      // =========================================================
      // EVENTOS HISTÓRICOS CONHECIDOS
      // =========================================================

      {
        collectionId: "eventos-principais",
        title: "O Último Grande Miasma",
        chronology: "História Antiga",
        date: "Há aproximadamente 70 anos",
        description:
          "A última grande liberação de Miasma provocada pela Flor atingiu diferentes regiões do continente. Embora a manifestação principal tenha terminado, grandes concentrações permaneceram espalhadas pelo mundo e continuam afetando determinadas áreas.",
      },
      {
        collectionId: "eventos-principais",
        title: "A Criação da Planície de Vidro",
        chronology: "História Passada",
        date: "Data exata desconhecida",
        description:
          "Uma batalha contra uma poderosa criatura cristalina terminou em uma explosão que transformou o solo, as plantações e os guerreiros presentes em cristal. A região passou a ser conhecida como Planície de Vidro.",
      },
      {
        collectionId: "eventos-principais",
        title: "A Destruição das Cinzas Recentes",
        chronology: "Antes da Campanha",
        date: "Pouco antes da campanha",
        description:
          "Uma manifestação repentina de Miasma destruiu comunidades inteiras no território do Sindicato. A região devastada passou a ser chamada de Planície das Cinzas Recentes, onde buscas por corpos e sobreviventes ainda continuam.",
      },
      {
        collectionId: "eventos-principais",
        title: "O Desaparecimento de Claralume",
        chronology: "História Passada",
        date: "Data exata desconhecida",
        description:
          "A população de Claralume desapareceu sem deixar explicações claras. A cidade permanece vazia dentro de The Union, e diferentes facções apresentam versões contraditórias sobre o que aconteceu.",
      },
      {
        collectionId: "eventos-principais",
        title: "A Formação de The Union",
        chronology: "História Passada",
        date: "Após o aumento do Miasma na Área 3",
        description:
          "A crescente incidência de Miasma obrigou Manifesto, Sindicato, samurais e guerreiros independentes a cooperarem na Área 3. A aliança emergencial recebeu o nome de The Union, embora as facções continuem mantendo interesses próprios.",
      },
      {
        collectionId: "eventos-principais",
        title: "O Desaparecimento do Rei Elio",
        chronology: "Antes da Campanha",
        date: "Três meses antes da campanha",
        description:
          "O rei Elio desapareceu em circunstâncias desconhecidas. A família real não divulgou sua última localização nem informações detalhadas sobre a investigação, provocando rumores dentro e fora do Manifesto.",
      },

      // =========================================================
      // ACONTECIMENTOS IMEDIATAMENTE ANTERIORES À CAMPANHA
      // =========================================================

      {
        collectionId: "eventos-principais",
        title: "A Intensificação da Cratera",
        chronology: "Antes da Campanha",
        date: "Um mês antes da campanha",
        description:
          "O Miasma ao redor da Cratera do Último Miasma tornou-se mais denso e começou a avançar sobre caminhos anteriormente considerados seguros. Relatos de criaturas e sons vindos do interior também aumentaram.",
      },
      {
        collectionId: "eventos-principais",
        title: "A Reunião dos Errantes",
        chronology: "Antes da Campanha",
        date: "Duas semanas antes da campanha",
        description:
          "Guerreiros, pesquisadores, mercenários e sobreviventes começaram a se reunir no Acampamento dos Errantes. Alguns procuram uma forma de atravessar o Miasma, enquanto outros buscam pessoas, riquezas ou respostas dentro da cratera.",
      },
      {
        collectionId: "eventos-principais",
        title: "As Movimentações nas Fronteiras",
        chronology: "Antes da Campanha",
        date: "Poucos dias antes da campanha",
        description:
          "Manifesto e Sindicato aumentaram patrulhas, transferiram soldados e reforçaram posições próximas às fronteiras. Nenhuma das facções declarou uma preparação para guerra, mas a tensão entre seus representantes tornou-se evidente.",
      },

      // =========================================================
      // ABERTURA DA CAMPANHA
      // =========================================================

      {
        collectionId: "eventos-principais",
        title: "O Festival da Flor",
        chronology: "Campanha Atual",
        date: "Sessão 1",
        description:
          "Convidados de diferentes regiões chegam à Cidade Catedral para participar do Festival da Flor. Os personagens entram na celebração por razões próprias e testemunham a tensão crescente entre seguidores do Manifesto, usuários da Marca Oculto e representantes de outras comunidades.",
      },
      {
        collectionId: "eventos-principais",
        title: "O Pronunciamento da Donzela",
        chronology: "Campanha Atual",
        date: "Sessão 1",
        description:
          "Eleonora sobe ao Palco do Festival para realizar um pronunciamento diante da família real, das autoridades religiosas, dos convidados e da população reunida na Praça da Flor.",
      },
      {
        collectionId: "eventos-principais",
        title: "A Revelação da Dupla Marca",
        chronology: "Campanha Atual",
        date: "Sessão 1",
        description:
          "Durante seu pronunciamento, Eleonora revela publicamente que possui as Marcas do Manifesto e do Oculto. A existência da dupla Marca desafia as crenças religiosas, os interesses da família real e a separação política entre as facções.",
      },
      {
        collectionId: "eventos-principais",
        title: "O Primeiro Caos",
        chronology: "Campanha Atual",
        date: "Sessão 1",
        description:
          "A revelação de Eleonora provoca uma reação imediata na Praça da Flor. Este registro deve ser atualizado pelo mestre após a sessão para representar as ações dos personagens, a resposta das autoridades e o destino inicial da Donzela.",
      },
    ],
  },
];

export const premadeCampaigns: PremadeCampaign[] = premadeCampaignSources.map(
  (campaign) => ({
    ...campaign,
    npcs: campaign.npcs.map((npc) => ({
      ...npc,
      stats: { ...(npc.stats ?? DEFAULT_PREMADE_STATS) },
    })),
    monsters: campaign.monsters.map((monster) => ({
      ...monster,
      stats: { ...(monster.stats ?? DEFAULT_PREMADE_STATS) },
    })),
  }),
);
