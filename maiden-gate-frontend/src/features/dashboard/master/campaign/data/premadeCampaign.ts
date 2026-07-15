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
        name: "Domínio do Manifesto",
        description:
          "Regiões da grande ilha controladas pela família real, pela Cidade Catedral e pelas forças militares do Manifesto.",
        color: getCollectionColor(0),
      },
      {
        id: "regiao-cratera",
        name: "Região da Cratera",
        description:
          "Locais marcados pelo Miasma persistente, por RAIDs e pelo acampamento dos guerreiros que tentam conter a contaminação.",
        color: getCollectionColor(4),
      },
      {
        id: "sindicato-sombras",
        name: "Território do Sindicato das Sombras",
        description:
          "Grande ilha ocidental dominada pelo Sindicato, com cidades, montanhas, acampamentos e portais ocultos.",
        color: getCollectionColor(1),
      },
      {
        id: "eventos-principais",
        name: "Eventos Principais",
        description:
          "Linha do tempo inicial da campanha O Despertar da Donzela.",
        color: getCollectionColor(3),
      },
    ],

    locations: [
      {
        collectionId: "dominio-manifesto",
        name: "Cidade Catedral",
        image: flower,
        type: "Capital / Cidade Sagrada",
        region: "Extremo sul do Domínio do Manifesto",
        description:
          "Cidade monumental construída ao redor da Flor, erguida sobre uma região que emergiu próxima ao oceano. Seus templos, pontes, muralhas e castelo representam o poder religioso e político do Manifesto. Apenas nobres, autoridades, membros do clero e cidadãos de alta classe vivem próximos ao centro.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Ponte da Catedral",
        image: "",
        type: "Ponte Monumental",
        region: "Ligação entre a costa e a Cidade Catedral",
        description:
          "Uma ponte longa e fortemente vigiada que conecta a terra firme à Cidade Catedral. Peregrinos, nobres, soldados e trabalhadores cruzam diariamente sua extensão, mas qualquer movimentação suspeita é rapidamente investigada pela guarda do Manifesto.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Caminho da Cidade Catedral",
        image: "",
        type: "Estrada Montanhosa",
        region: "Montanhas do Sul",
        description:
          "Estrada estreita entre montanhas, usada por nobres, pescadores, mensageiros e pequenas caravanas que seguem em direção à Cidade Catedral. O terreno dificulta emboscadas em larga escala, mas favorece ataques rápidos e desaparecimentos misteriosos.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Vila de Maré Baixa",
        image: "",
        type: "Vila Costeira",
        region: "Leste das Montanhas do Sul",
        description:
          "Pequena vila costeira próxima às montanhas. Seus moradores vivem da pesca, do transporte de mantimentos e de serviços menores ligados à Cidade Catedral. Muitos sabem mais do que aparentam sobre os destroços que atingiram as raízes da Flor.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Planícies de Aurel",
        image: "",
        type: "Planície",
        region: "Região Central Sul",
        description:
          "Uma vasta área aberta logo após as montanhas. Suas estradas conectam a Cidade Catedral, Songbird e as regiões militares do Manifesto. Durante o dia, parecem tranquilas; à noite, rumores sobre vultos roxos e viajantes desaparecidos começam a circular.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Songbird",
        image: "",
        type: "Cidade das Entoadoras",
        region: "Costa Oeste das Planícies de Aurel",
        description:
          "Grande cidade controlada pelas Entoadoras e financiada pelo Manifesto. Possui três escolas de canto, teatros sagrados, residências nobres e um castelo próprio. Suas apresentações são vistas como símbolo de cultura e fé, mas também funcionam como instrumento político.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Três Escolas de Songbird",
        image: "",
        type: "Instituição",
        region: "Songbird",
        description:
          "Conjunto de três escolas onde jovens Entoadoras treinam canto, presença, controle emocional e manifestação de poder. Cada escola possui filosofia própria e rivalidades internas, embora todas dependam do financiamento do Manifesto.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Castelo das Entoadoras",
        image: "",
        type: "Castelo / Sede Cultural",
        region: "Songbird",
        description:
          "Sede política e artística das Entoadoras. Concertos, reuniões diplomáticas e acordos com nobres do Manifesto acontecem em seus salões. Algumas salas são acessíveis apenas a cantoras de alto prestígio.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Forte Lúmen",
        image: "",
        type: "Base Militar",
        region: "Costa Leste das Planícies de Aurel",
        description:
          "Base militar do Manifesto voltada para a grande ilha dominada pelo Sindicato das Sombras. Suas torres observam o oceano constantemente, esperando qualquer movimentação inimiga ou surgimento de atividade ligada aos portais ocultos.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Reino do Manifesto",
        image: "",
        type: "Região Real",
        region: "Centro do Domínio do Manifesto",
        description:
          "Região de grande importância política, composta por duas cidades próximas, uma base militar e o antigo castelo do Manifesto. Embora a Cidade Catedral tenha se tornado o símbolo máximo da fé, este reino ainda concentra tradição, exército e linhagens nobres antigas.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Castelo de Auréon",
        image: "",
        type: "Castelo Real",
        region: "Reino do Manifesto",
        description:
          "Grande castelo do Manifesto no centro da região real. Abriga conselheiros, arquivos militares e membros de linhagens nobres secundárias. Alguns corredores guardam documentos sobre o sangue dos dragões e antigas campanhas contra o Sindicato.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Lumenhall",
        image: "",
        type: "Cidade",
        region: "Reino do Manifesto",
        description:
          "Cidade organizada e fortemente religiosa, conhecida por seus templos de luz, praças limpas e presença constante de guardas. Seus habitantes tendem a apoiar o Manifesto, mas muitos temem a aproximação de uma guerra aberta.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Vitrália",
        image: "",
        type: "Cidade",
        region: "Reino do Manifesto",
        description:
          "Cidade famosa por vitrais, oficinas de lentes, estudos ópticos e artesãos ligados à luz. Alguns pesquisadores locais estudam variações incomuns da Marca do Manifesto, embora evitem chamar atenção da nobreza.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Harbor City",
        image: "",
        type: "Cidade Costeira",
        region: "Extremo leste do Reino do Manifesto",
        description:
          "Cidade portuária controlada pelo Manifesto. Serve como ponto de comércio, transporte militar e vigilância naval. Mercadores, espiões e soldados dividem as ruas estreitas próximas ao porto.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Forte das Vigílias",
        image: "",
        type: "Base Militar",
        region: "Montanhas do Norte do Manifesto",
        description:
          "Pequena base militar escondida entre montanhas, voltada para a ilha intermediária entre o Manifesto e o Sindicato das Sombras. Seu objetivo oficial é defesa costeira, mas parte da guarnição monitora movimentações estranhas no Miasma.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Ilha de Vigília",
        image: "",
        type: "Ilha Estratégica",
        region: "Entre o Manifesto e o Sindicato das Sombras",
        description:
          "Ilha disputada de forma indireta pelas duas facções. Nenhum lado controla completamente o território, mas ambos mantêm olheiros, rotas secretas e pequenas operações militares na região.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Cratera do Último Miasma",
        image: "",
        type: "RAID / Zona Contaminada",
        region: "Planície Norte do Manifesto",
        description:
          "Grande cratera cercada por uma cortina de Miasma roxo. A região surgiu após distorções ligadas ao último ciclo de Miasma, mas seu comportamento atual é anormal. Estruturas e criaturas podem surgir dentro dela como cópias contaminadas de realidades distintas.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Trilha Roxa",
        image: "",
        type: "Caminho de Miasma",
        region: "Norte da Cratera",
        description:
          "Fluxo de Miasma que se arrasta para o norte da cratera, formando uma trilha instável. Viajantes relatam sons abafados, sombras sem dono e silhuetas que desaparecem ao serem observadas diretamente.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Névoa Branda",
        image: "",
        type: "Zona de Miasma Leve",
        region: "Norte da Cratera",
        description:
          "Concentração mais fraca de Miasma, ainda perigosa o suficiente para causar confusão, sonhos estranhos e alterações no ambiente. Muitos acreditam que ela é apenas resíduo da cratera, mas sua expansão preocupa estudiosos.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Acampamento dos Errantes",
        image: "",
        type: "Acampamento Militar Improvisado",
        region: "Arredores da Cratera",
        description:
          "Acampamento onde guerreiros, mercenários, usuários da Marca do Maso, caçadores e curiosos se reúnem para discutir como eliminar ou conter o Miasma da cratera. A tensão é alta, pois cada grupo possui interesses diferentes.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Rochaviva",
        image: "",
        type: "Cidade Maso",
        region: "Leste da Cratera",
        description:
          "Cidade próxima ao oceano onde a maioria dos habitantes possui a Marca do Maso. É barulhenta, diversa e pouco respeitada por nobres do Manifesto, mas possui guerreiros, artesãos e exploradores extremamente capazes.",
      },
      {
        collectionId: "regiao-cratera",
        name: "Porto de Cinza Clara",
        image: "",
        type: "Cidade Costeira",
        region: "Norte de Rochaviva",
        description:
          "Cidade costeira menor, usada como rota de suprimentos para viajantes que seguem ao norte. Parte da população teme que a Névoa Branda avance até a costa.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Vila Ventomar",
        image: "",
        type: "Cidade Costeira da Respiração",
        region: "Extremo norte da Grande Ilha",
        description:
          "Pequena cidade costeira associada à Marca da Respiração. Seus habitantes valorizam disciplina, pesca, treinamento corporal e observação da natureza. Alguns mestres de armas vivem ali em isolamento.",
      },
      {
        collectionId: "dominio-manifesto",
        name: "Vila Atrás das Montanhas",
        image: "",
        type: "Vila Isolada",
        region: "Montanhas do Extremo Norte",
        description:
          "Vila protegida por montanhas e rotas difíceis. Poucos estrangeiros chegam até ela. Seus moradores evitam falar sobre o que existe além dos picos e sobre antigas travessias usadas por guerreiros da Respiração.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Ilha das Sombras",
        image: "",
        type: "Território do Sindicato",
        region: "Grande Ilha Ocidental",
        description:
          "Grande ilha dominada pelo Sindicato das Sombras. Suas cidades, montanhas e rotas secretas formam um território equivalente ao domínio do Manifesto, mas organizado de forma menos centralizada e mais clandestina.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Cordilheira Silente",
        image: "",
        type: "Montanhas",
        region: "Borda Oeste da Ilha das Sombras",
        description:
          "Cadeia de montanhas que se estende do sul ao norte da ilha. Em locais ocultos entre as rochas existem portais secretos do Sindicato, protegidos por sigilo absoluto.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Portal Sul do Vazio",
        image: "",
        type: "Portal Oculto",
        region: "Cordilheira Silente",
        description:
          "Um dos três portais secretos do Sindicato das Sombras. Oficialmente, ele não existe. Sua energia permite deslocamento rápido entre regiões, mas seu custo real é conhecido por pouquíssimos líderes.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Portal Central do Vazio",
        image: "",
        type: "Portal Oculto",
        region: "Cordilheira Silente",
        description:
          "Portal escondido em uma caverna profunda da região central da ilha. Guardas do Sindicato protegem a entrada sem explicar o que há dentro. Pessoas esquecidas costumam desaparecer nas proximidades.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Portal Norte do Vazio",
        image: "",
        type: "Portal Oculto",
        region: "Cordilheira Silente",
        description:
          "Portal mais distante e menos utilizado da rede do Sindicato. Sua instabilidade é maior, e rumores falam de vozes vindas da escuridão quando a estrutura é ativada.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Lago do Véu Roxo",
        image: "",
        type: "Lago Contaminado",
        region: "Sul da Ilha das Sombras",
        description:
          "Grande lago coberto por uma camada de Miasma. A água parece parada demais, e reflexos mostram formas que não estão na superfície. O Sindicato evita que viajantes comuns se aproximem.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Porto Nox",
        image: "",
        type: "Cidade Costeira",
        region: "Leste da Ilha das Sombras",
        description:
          "Cidade costeira controlada pelo Sindicato. Serve como ponto de entrada, contrabando e movimentação militar. Sua população é diversa, incluindo muitos indivíduos rejeitados por territórios do Manifesto.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Acampamento da Costa Leste",
        image: "",
        type: "Acampamento Militar",
        region: "Costa voltada para o Manifesto",
        description:
          "Acampamento do exército do Sindicato voltado para a grande ilha do Manifesto. Suas patrulhas vigiam o oceano e interceptam embarcações suspeitas.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Acampamento da Ilha Intermediária",
        image: "",
        type: "Acampamento Militar",
        region: "Costa voltada para a Ilha de Vigília",
        description:
          "Base avançada do Sindicato voltada para a ilha entre as duas nações. É usada para espionagem, movimentação de agentes e observação das tropas do Manifesto.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Noctária",
        image: "",
        type: "Grande Cidade do Sindicato",
        region: "Centro da Ilha das Sombras",
        description:
          "Maior cidade do Sindicato das Sombras. Diferente dos castelos do Manifesto, Noctária é formada por salões, túneis, bairros sobrepostos, mercados subterrâneos e sedes de líderes. Para muitos rejeitados, ela é refúgio. Para outros, uma prisão sem grades.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Vila Névoa Baixa",
        image: "",
        type: "Vila Costeira",
        region: "Norte da Ilha das Sombras",
        description:
          "Vila costeira pequena, marcada por pescadores silenciosos e rotas de contrabando. Alguns moradores sabem quando os portais são ativados, mas fingem ignorância para sobreviver.",
      },
      {
        collectionId: "sindicato-sombras",
        name: "Umbraford",
        image: "",
        type: "Pequena Cidade",
        region: "Norte da Ilha das Sombras",
        description:
          "Cidade menor do Sindicato, usada como ponto de passagem entre Noctária e as regiões mais ao norte. Seus líderes locais são discretos, mas possuem forte ligação com operações secretas da facção.",
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
