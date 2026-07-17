import flower from "../../../../../assets/images/logo.png";

import { COLLECTION_COLOR_OPTIONS } from "../../data/collectionColors";

function getCollectionColor(index: number) {
  return (
    COLLECTION_COLOR_OPTIONS[index]?.value ?? COLLECTION_COLOR_OPTIONS[0].value
  );
}

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
  }>;
  monsters: Array<{
    collectionId?: string;
    name: string;
    image: string;
    type: string;
    threat: string;
    skills: string;
    description: string;
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

export const premadeCampaigns: PremadeCampaign[] = [
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
    ],

    npcs: [
      {
        collectionId: "dominio-manifesto",
        name: "Eleanor, a Donzela",
        image: flower,
        brand: "Manifesto",
        race: "Humana",
        occupation: "Herdeira da Linhagem Principal",
        personality:
          "Determinada, idealista e inconsequente. Acredita que uma verdade revelada pode impedir uma guerra, mesmo que isso destrua sua própria imagem.",
        secret:
          "Possui duas Marcas: Manifesto e Oculto. A Marca do Manifesto está em seu pescoço, enquanto a Marca do Oculto fica em seu ombro esquerdo.",
        description:
          "Figura central da campanha. Filha da rainha da linhagem principal do Manifesto, Eleanor carrega um segredo capaz de abalar a fé, a nobreza e a relação entre facções.",
        skills:
          "Autoridade Real. Luz Nobre. Dupla Marca. Resistência ao Miasma. Presença da Donzela.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Rainha Aurelia",
        image: "",
        brand: "Manifesto",
        race: "Humana",
        occupation: "Rainha do Manifesto",
        personality:
          "Controlada, imponente e profundamente consciente do peso da própria linhagem.",
        secret:
          "Sabe mais sobre o sangue dos dragões e sobre a origem da linhagem real do que admite publicamente.",
        description:
          "Rainha da linhagem principal do Manifesto e mãe de Eleanor. Sua autoridade se apoia na fé da população, no prestígio da Flor e no controle político da Cidade Catedral.",
        skills: "Comando Real. Luz Sagrada. Vontade Inabalável. Sangue Nobre.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Vasil, o Astuto",
        image: "",
        brand: "Maso",
        race: "Maso (Pássaro)",
        occupation: "Guia da Cidade Catedral",
        personality:
          "Carismático, eloquente e sempre atento. Age como alguém disposto a servir ao Manifesto, mesmo sendo desprezado por muitos nobres.",
        secret:
          "É um dos melhores espiões do Sindicato das Sombras dentro do território do Manifesto.",
        description:
          "Guia urbano que conhece rotas, rumores e pessoas importantes. Sua lealdade aparente ao Manifesto esconde uma rede de contatos ligada ao Sindicato.",
        skills:
          "Olhar de Pássaro. Fuga Rápida. Fala Persuasiva. Rede de Informantes.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Maestra Celianne",
        image: "",
        brand: "Entoadora",
        race: "Humana",
        occupation: "Diretora das Escolas de Songbird",
        personality:
          "Elegante, exigente e maternal apenas quando ninguém está olhando.",
        secret:
          "Recebe ordens diretas do Manifesto para monitorar jovens Entoadoras com potencial de manifestar Anjos.",
        description:
          "Responsável por parte da formação das Entoadoras de Songbird. Entre apresentações e aulas, ela mantém a cidade alinhada aos interesses do Manifesto.",
        skills:
          "Canto de Comando. Harmonia Curativa. Voz Paralisante. Autoridade de Palco.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Comandante Darius Vell",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Comandante Militar",
        personality:
          "Rígido, disciplinado e leal à imagem pública do Manifesto.",
        secret:
          "Recebeu ordens para ocultar relatórios sobre movimentações estranhas próximas à Cratera do Último Miasma.",
        description:
          "Comandante responsável por tropas próximas às regiões militares do Manifesto. Acredita que ordem vale mais que transparência.",
        skills:
          "Lâmina Solar. Formação Defensiva. Intimidação Militar. Disciplina de Ferro.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Irmandade dos Errantes - Garruk",
        image: "",
        brand: "Maso",
        race: "Maso",
        occupation: "Líder de Campo",
        personality:
          "Bruto, protetor e desconfiado de qualquer autoridade nobre.",
        secret:
          "Pretende invadir a Cratera mesmo sem autorização, pois acredita que alguém próximo ainda está vivo dentro do Miasma.",
        description:
          "Um dos líderes do Acampamento dos Errantes. É respeitado por guerreiros da Marca do Maso e por sobreviventes de regiões contaminadas.",
        skills:
          "Força Anômala. Rugido de Guerra. Resistência Bruta. Proteção Instintiva.",
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
          "Investiga se o Miasma da Cratera possui relação com antigas ruínas que sua ordem deveria proteger.",
        description:
          "Guerreira associada à Respiração, vinda de uma comunidade isolada. Usa técnica elemental e acredita que o corpo deve entender a natureza antes de comandá-la.",
        skills:
          "Respiração do Vento. Corte Silencioso. Passo Leve. Marca do Caçador.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Lorde Veyr Noctis",
        image: "",
        brand: "Oculto",
        race: "Humano",
        occupation: "Líder do Sindicato das Sombras",
        personality: "Paciente, diplomático e difícil de interpretar.",
        secret:
          "Conhece a rede de portais do Sindicato e sabe que sacrifícios humanos são usados para mantê-la ativa.",
        description:
          "Uma das figuras mais influentes de Noctária. Publicamente defende os rejeitados, mas permite atrocidades em nome da sobrevivência estratégica do Sindicato.",
        skills:
          "Porta do Vazio. Constructo Sombrio. Véu de Silêncio. Ordem Oculta.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Mira de Umbraford",
        image: "",
        brand: "Maso",
        race: "Humana",
        occupation: "Mensageira do Sindicato",
        personality: "Pragmática, rápida e cansada de promessas políticas.",
        secret:
          "Descobriu indícios de que cidadãos desaparecidos estão ligados à manutenção dos portais ocultos.",
        description:
          "Mensageira que circula por regiões do Sindicato. Pode se tornar aliada dos jogadores caso perceba que eles investigam os desaparecimentos.",
        skills: "Corrida de Sombra. Instinto de Sobrevivência. Rotas Secretas.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Padre Solenne",
        image: "",
        brand: "Manifesto",
        race: "Humano",
        occupation: "Orador da Flor",
        personality: "Sereno, carismático e perigoso quando contrariado.",
        secret:
          "Manipula interpretações religiosas para proteger a imagem do Manifesto e desacreditar testemunhas inconvenientes.",
        description:
          "Figura religiosa da Cidade Catedral. Usa sermões e símbolos da Flor para fortalecer a fé popular na família real.",
        skills: "Sermão Radiante. Persuasão Sagrada. Julgamento Público.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Nerys do Véu Roxo",
        image: "",
        brand: "Oculto",
        race: "Humana",
        occupation: "Guardião do Portal",
        personality:
          "Fria, silenciosa e totalmente obediente às ordens do Sindicato.",
        secret:
          "É responsável por selecionar vítimas usadas para alimentar um dos portais do vazio.",
        description:
          "Agente de alto sigilo do Sindicato. Quase ninguém sabe seu nome verdadeiro ou seu papel na manutenção dos portais.",
        skills: "Toque do Vazio. Passagem Sombria. Silêncio Absoluto.",
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
    ],

    items: [
      {
        collectionId: "dominio-manifesto",
        name: "Fragmento de Pétala",
        type: "Artefato",
        description:
          "Fragmento de uma pétala ligada à Flor. Emite brilho fraco e parece reagir à presença de Miasma. Pode conceder sorte ou resistência temporária, mas se desfaz após uso intenso.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Fragmento da Raiz da Flor",
        type: "Consumível",
        description:
          "Parte danificada de uma raiz da Flor que chegou à superfície após as obras da Cidade Catedral. Pode curar ferimentos, mas seu uso frequente causa sonhos estranhos.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Relatório de Construção Selado",
        type: "Documento",
        description:
          "Documento antigo sobre obras realizadas próximas às raízes da Flor. Trechos foram censurados, mas há menções a destroços, cortes e liberação anormal de Miasma.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Selo do Manifesto",
        type: "Insígnia",
        description:
          "Selo oficial usado por membros autorizados do Manifesto. Permite acesso limitado a áreas militares, religiosas ou administrativas, dependendo de quem o apresenta.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Chave de Noctária",
        type: "Artefato",
        description:
          "Pequena chave escura usada em portas e passagens internas da grande cidade do Sindicato. Parece absorver luz ao redor.",
      },
      {
        name: "Cantil Antimiasma",
        type: "Equipamento",
        description:
          "Cantil com mistura herbal usada por exploradores para suportar regiões contaminadas. Não anula o Miasma, mas pode reduzir sintomas leves por pouco tempo.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Cristal Roxo Instável",
        type: "Material",
        description:
          "Cristal encontrado próximo a regiões de RAID. Vibra quando exposto a habilidades de Marca e pode ser usado em experimentos perigosos.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Partitura Angelical Rasgada",
        type: "Documento / Relíquia",
        description:
          "Fragmento de uma partitura usada por Entoadoras de alto nível. Algumas notas parecem impossíveis de cantar sem causar dor física.",
      },
    ],

    events: [
      {
        collectionId: "eventos-principais",
        title: "A Última Liberação do Miasma",
        chronology: "70 anos antes",
        date: "Antes da Campanha",
        description:
          "A Flor liberou Miasma em um ciclo anterior. Diferente do esperado, parte dele permaneceu em algumas regiões do mundo, comportamento que seria explicado apenas por segredos ligados às raízes danificadas.",
      },
      {
        collectionId: "eventos-principais",
        title: "Início da Construção da Cidade Catedral",
        chronology: "Décadas antes",
        date: "Antes da Campanha",
        description:
          "O Manifesto iniciou a construção da Cidade Catedral ao redor da Flor, transformando a região em símbolo máximo de fé, poder e autoridade real.",
      },
      {
        collectionId: "eventos-principais",
        title: "O Corte das Raízes",
        chronology: "Segredo histórico",
        date: "Antes da Campanha",
        description:
          "Durante as obras, partes das raízes da Flor sob o oceano foram cortadas ou atingidas por destroços. Pouquíssimos sabem que isso pode ter alterado o comportamento do Miasma.",
      },
      {
        collectionId: "eventos-principais",
        title: "O Desaparecimento de Elio",
        chronology: "3 meses antes",
        date: "Antes da Campanha",
        description:
          "Elio, figura importante ligada ao Manifesto, desapareceu sem explicação clara. Há suspeitas envolvendo Velen, atualmente foragido, mas versões contraditórias circulam entre nobres e agentes do Sindicato.",
      },
      {
        collectionId: "eventos-principais",
        title: "A Intensificação da Cratera",
        chronology: "1 mês antes",
        date: "Antes da Campanha",
        description:
          "O Miasma ao redor da Cratera do Último Miasma se tornou mais denso. Cópias roxas e criaturas silenciosas passaram a surgir com mais frequência.",
      },
      {
        collectionId: "eventos-principais",
        title: "Reunião dos Errantes",
        chronology: "2 semanas antes",
        date: "Antes da Campanha",
        description:
          "Guerreiros, mercenários, usuários da Marca do Maso e exploradores começaram a se reunir no Acampamento dos Errantes para planejar uma ação contra a Cratera.",
      },
      {
        collectionId: "eventos-principais",
        title: "Movimentação nas Fronteiras",
        chronology: "Dias antes",
        date: "Antes da Campanha",
        description:
          "Bases militares do Manifesto e do Sindicato aumentaram patrulhas costeiras. A Ilha de Vigília se tornou ponto de tensão entre as duas facções.",
      },
      {
        collectionId: "eventos-principais",
        title: "O Festival da Flor",
        chronology: "Início da Campanha",
        date: "Sessão 1",
        description:
          "A Cidade Catedral se prepara para receber nobres, artistas, peregrinos, Entoadoras e representantes de várias regiões durante o Festival da Flor.",
      },
      {
        collectionId: "eventos-principais",
        title: "A Revelação da Donzela",
        chronology: "Incidente Central",
        date: "Sessão 1",
        description:
          "Durante o festival, Eleanor sobe ao palco e revela ao mundo parte de seu segredo. O gesto divide a multidão entre fé, medo, esperança e pânico político.",
      },
      {
        collectionId: "eventos-principais",
        title: "Primeira Noite de Caos",
        chronology: "Após a Revelação",
        date: "Sessão 1 ou 2",
        description:
          "Após a revelação, agentes, nobres, religiosos e espiões entram em movimento. Rumores se espalham pela Cidade Catedral, enquanto alguns tentam proteger Eleanor e outros querem silenciá-la.",
      },
    ],
  },
];
