import {
  BookOpen,
  Crown,
  ScrollText,
  Sparkles,
  Swords,
  BarChart3,
} from "lucide-react";

import type { RuleTab } from "./RoleRulesTypes";

export const masterTabs: RuleTab[] = [
  {
    key: "visao-geral",
    label: "Visão Geral",
    icon: Crown,
    title: "Papel do Mestre",
    description:
      "O Mestre conduz a narrativa, interpreta o mundo, controla NPCs, define desafios e transforma as escolhas dos jogadores em consequências dentro de Voice of Flower.",
    topics: [
      {
        title: "Função principal",
        content:
          "O Mestre não joga contra os jogadores. Sua função é apresentar situações, conflitos, mistérios e riscos que permitam ao grupo construir uma história memorável. Em VOF, isso significa equilibrar narrativa, Marcas, facções, Miasma e consequências políticas.",
      },
      {
        title: "Tom da campanha",
        content:
          "Antes da primeira sessão, defina o tom da aventura. Uma campanha pode focar em investigação, horror, guerra, política, exploração, sobrevivência, RAIDs ou drama entre facções. O tom escolhido deve orientar NPCs, ameaças, ritmo de sessões e recompensas.",
      },
      {
        title: "Campanha canônica ou livre",
        content:
          "O Despertar da Donzela (disponível nas campanhas pré-prontas) é a campanha principal de Awakening of the Maiden, mas o Mestre pode criar histórias próprias usando ou não os elementos centrais de Voice of Flower. O importante é manter coerência com as Marcas, o Miasma, a Flor e a estrutura política do mundo quando esses elementos forem utilizados.",
      },
      {
        title: "Controle de informação",
        content:
          "Nem toda informação precisa ser revelada imediatamente. Use rumores, documentos, símbolos, sonhos, testemunhas e pistas incompletas para manter o mistério. Segredos envolvendo a Flor, o Manifesto, o Sindicato das Sombras ou regiões contaminadas devem ser revelados aos poucos. O mundo de VOF é enigmático por natureza.",
      },
      {
        title: "Consequências narrativas",
        content:
          "Toda escolha importante deve deixar alguma marca no mundo. Ajudar uma facção pode enfraquecer outra, poupar um inimigo pode criar um aliado futuro, ignorar uma região tomada pelo Miasma pode permitir que ela se espalhe. Consequências tornam a campanha viva.",
      },
      {
        title: "Consequências fixas",
        content:
          "Alguns eventos podem ser inevitáveis, pois o mundo continua com os jogadores agindo ou não. Então conforme as sessões avançam, não se esqueça dos assuntos inacabados ou ignorados, eles podem trazer consequências grandes ou pequenas para a campanha.",
      },
      {
        title: "Uso do Maiden-Gate",
        content:
          "Use o Maiden-Gate como apoio de mesa para organizar campanhas, personagens, NPCs, monstros, itens, localizações, sessões, anotações e rolagens. A ferramenta não substitui a narração do Mestre, mas reduz a administração manual e ajuda a manter a campanha consistente.",
      },
    ],
  },
  {
    key: "campanha",
    label: "Campanha",
    icon: ScrollText,
    title: "Preparação de Campanha",
    description:
      "Organize localizações, eventos, NPCs, facções, ameaças e sessões para manter a mesa coerente e conectada ao universo de Awakening of the Maiden.",
    topics: [
      {
        title: "Estrutura básica",
        content:
          "Uma campanha precisa de um conflito central, um ponto de partida, regiões importantes, NPCs relevantes e ameaças em movimento. O Mestre não precisa prever todas as escolhas dos jogadores, mas deve saber o que está acontecendo no mundo enquanto eles agem.",
      },
      {
        title: "Localizações",
        content:
          "Cada localização deve ter uma função narrativa. Ela pode guardar um segredo, oferecer abrigo, apresentar um conflito, esconder uma ameaça ou revelar algo sobre a Flor, o Miasma ou as facções. Evite criar locais apenas decorativos quando eles não tiverem impacto na jornada.",
      },
      {
        title: "Cidade Catedral",
        content:
          "A Cidade Catedral é um dos centros mais importantes de Awakening of the Maiden. Construída ao redor da Flor, ela representa fé, poder político, influência do Manifesto e desigualdade social. Para o Mestre, é um cenário ideal para intrigas, conspirações, encontros nobres e revelações religiosas.",
      },
      {
        title: "Facções",
        content:
          "Facções devem ter objetivos claros. O Manifesto busca autoridade, influência religiosa e controle político. O Sindicato das Sombras é mais acolhedor e abriga muitos indivíduos rejeitados, especialmente usuários da Marca do Maso. As Entoadoras estão ligadas ao Manifesto, enquanto grupos da Respiração podem aparecer como comunidades, vilas ou tradições guerreiras.",
      },
      {
        title: "NPCs importantes",
        content:
          "NPCs importantes devem ter objetivo, personalidade, segredo e relação com a trama ou com os personagens. Um bom NPC não existe apenas para entregar missão: ele deseja algo, teme algo e pode reagir às ações do grupo.",
      },
      {
        title: "NPCs e inimigos comuns",
        content:
          "Nem todo NPC ou monstro precisa ter uma ficha completa. Para personagens secundários, defina apenas nome, função, comportamento e uma informação útil. Isso mantém a sessão rápida sem perder imersão.",
      },
      {
        title: "Eventos",
        content:
          "Eventos ajudam a organizar a linha do tempo da campanha. Eles podem representar ataques, festivais, reuniões políticas, avanço do Miasma, surgimento de RAIDs, desaparecimentos, julgamentos ou mudanças de poder. Eventos tornam o mundo ativo mesmo quando os jogadores estão em outro lugar.",
      },
      {
        title: "Sessões",
        content:
          "Antes de cada sessão, prepare um objetivo principal, duas ou três cenas importantes, possíveis encontros e consequências prováveis. Não escreva tudo como roteiro fixo: prepare situações e deixe os jogadores escolherem como lidar com elas.",
      },
      {
        title: "Recompensas",
        content:
          "Recompensas podem ser itens, informações, aliados, acesso a regiões, avanço de reputação, habilidades liberadas pelo Mestre ou mudanças políticas favoráveis. Em Voice of Flower, conhecimento e influência podem ser tão importantes quanto poder de combate.",
      },
      {
        title: "Progressão",
        content:
          "A progressão padrão pode ir até o nível 30. Caso a campanha alcance eventos especiais, treinamento avançado ou poderes liberados pelo Mestre, o limite pode ser expandido até o nível 40. No MVP do Maiden-Gate, isso pode ser tratado manualmente pelo Mestre.",
      },
    ],
  },
  {
    key: "segredos",
    label: "Segredos",
    icon: BookOpen,
    title: "Histórias, Segredos e Lore do Mundo",
    description:
      "Esta seção reúne informações importantes para o Mestre compreender os bastidores de Voice of Flower, especialmente a Flor, o Manifesto, o Miasma e as facções de Awakening of the Maiden.",
    topics: [
      {
        title: "A Flor como centro do mundo",
        content:
          "A Flor não é apenas um símbolo religioso. Ela é uma presença divina, política e sobrenatural que surgiu no século VIII, além de influenciar a organização do mundo, o surgimento das Marcas e a forma como diferentes povos interpretam poder, fé e destino. Para muitas pessoas, a Flor representa proteção e milagre; para outras, ela também carrega medo, controle e mistério. A Flor também concede vida, os seres antropomórficos nasceram dela, e alguns humanos também.",
      },
      {
        title: "O uso político da Flor",
        content:
          "O Manifesto se aproveita da imagem divina da Flor para fortalecer sua popularidade e justificar sua autoridade. Sua relação com a fé, a nobreza e a Cidade Catedral faz com que boa parte da população enxergue a família real como escolhida ou abençoada. Isso torna o Manifesto uma força política e religiosa ao mesmo tempo.",
      },
      {
        title: "A Cidade Catedral",
        content:
          "A Cidade Catedral foi construída ao redor da Flor e representa o maior símbolo do poder do Manifesto em Awakening of the Maiden. Suas muralhas, templos, castelo e bairros nobres reforçam a ideia de uma sociedade guiada pela luz, pela fé e pela linhagem real. Porém, por trás dessa grandeza, existem desigualdades, segredos e decisões que afetaram o equilíbrio natural do mundo.",
      },
      {
        title: "O segredo das raízes",
        content:
          "Durante a construção da Cidade Catedral, partes das raízes da Flor, localizadas sob o oceano, foram cortadas ou danificadas por destroços. Esse acontecimento alterou o comportamento do Miasma liberado pela Flor cerca de 70 anos antes, fazendo com que ele permanecesse em certas regiões do mundo de forma anormal. Pouquíssimas pessoas sabem disso, principalmente membros do alto escalão do Manifesto e antigos trabalhadores envolvidos na construção.",
      },
      {
        title: "O Miasma persistente",
        content:
          "O Miasma normalmente surge em ciclos ligados à Flor, mas em Awakening of the Maiden ele apresenta um comportamento estranho. Algumas áreas continuam contaminadas, outras podem gerar RAIDs, e certos limites naturais do mapa podem ser formados por cortinas densas dessa névoa roxa. Para o Mestre, esse segredo pode ser usado como mistério central ou como revelação gradual da campanha.",
      },
      {
        title: "O Manifesto",
        content:
          "O Manifesto é ao mesmo tempo uma Marca, uma facção e uma estrutura de poder. Sua base está ligada à luz, à família real, à nobreza e à influência religiosa sobre a população. Existem diversos reinos controlados por ramificações da família real, mas a linhagem principal reside na Cidade Catedral. Eleanor pertence a essa linhagem mais pura.",
      },
      {
        title: "O sangue dos dragões",
        content:
          "A família real e algumas linhagens nobres possuem sangue especial ligado aos dragões escondidos no mundo. Esse segredo explica certas manifestações incomuns da Marca do Manifesto, como luzes diferentes do habitual, pupilas verticais ou até transformações parciais e completas em dragão. A existência desse sangue é ocultada da população, mas rumores e teorias podem circular entre pessoas atentas.",
      },
      {
        title: "O Sindicato das Sombras",
        content:
          "O Sindicato das Sombras é a principal força oposta ao Manifesto em Awakening of the Maiden. Publicamente, ele é visto por muitos como uma facção mais acolhedora, recebendo indivíduos rejeitados por outras regiões, especialmente usuários da Marca do Maso. Seu território é equivalente ao do Manifesto, mas sua organização não gira em torno de castelos; ela se espalha por cidades, esconderijos, rotas e saguões de liderança. Ainda assim, essa imagem de refúgio esconde práticas sombrias mantidas longe até mesmo da maioria de seus próprios habitantes.",
      },
      {
        title: "Os portais ocultos",
        content:
          "Em algumas regiões controladas pelo Sindicato das Sombras existem portais secretos capazes de conectar territórios distantes. Eles foram criados por um antigo líder do Oculto e representam uma das maiores vantagens estratégicas da facção, compensando sua inferioridade bélica em relação ao Manifesto. Pouquíssimas pessoas sabem da existência desses portais, e menos ainda compreendem como eles continuam funcionando.",
      },
      {
        title: "O preço da mobilidade",
        content:
          "O segredo mais confidencial do Sindicato das Sombras é que seus portais precisam ser alimentados por sacrifícios humanos. Cidadãos esquecidos, desaparecidos e principalmente indivíduos marginalizados da Marca do Maso são usados como fonte de energia para manter a rede ativa. Esse crime contradiz a imagem acolhedora da facção e revela que, mesmo entre aqueles que se opõem ao domínio do Manifesto, existem estruturas de exploração, medo e silêncio.",
      },
      {
        title: "As Entoadoras",
        content:
          "As Entoadoras são politicamente ligadas ao Manifesto. Suas construções, apresentações e instituições recebem apoio direto dessa facção, o que faz com que sua imagem pública esteja associada à beleza, cultura, fé e prestígio. Ainda assim, cada Entoadora pode ter seus próprios desejos, conflitos e dúvidas sobre o papel que ocupa dentro dessa estrutura.",
      },
      {
        title: "A Respiração e os Samurais",
        content:
          "A Marca da Respiração possui forte ligação com disciplina, controle corporal, natureza e estilos de combate. Parte da Ásia não afetada pelo Miasma deu origem a grupos de Samurais, uma pequena facção associada à Marca. Eles possuem vilas e pequenas cidades, inclusive em regiões da Europa, e podem aparecer como guerreiros, mestres, exilados ou guardiões de tradições antigas.",
      },
      {
        title: "A Marca do Maso no mundo",
        content:
          "O Maso não possui uma facção dominante própria, mas é a Marca mais presente em grande parte do mundo, especialmente na América Latina e na África. Ela também está ligada a monstros e seres antropomórficos nascidos da Flor. Por ser imprevisível e muito variada, a Marca do Maso pode gerar tanto indivíduos comuns com poderes simples quanto criaturas extremamente perigosas.",
      },
      {
        title: "Eleanor e o Despertar da Donzela",
        content:
          "Eleanor é uma das figuras centrais da campanha principal. Como filha da rainha da linhagem mais pura do Manifesto, ela carrega enorme peso político. Sua existência, suas escolhas e seus possíveis segredos podem abalar a relação entre Manifesto, Sindicato das Sombras, Entoadoras e outras forças do mundo. Para alguns, ela pode representar esperança; para outros, o início de uma crise.",
      },
      {
        title: "Usando segredos sem revelar cedo demais",
        content:
          "O Mestre não precisa revelar toda a lore aos jogadores logo no início. Segredos como as raízes danificadas da Flor, o sangue dos dragões, a origem do Miasma persistente e os interesses reais das facções funcionam melhor quando aparecem em pistas, rumores, documentos, símbolos, sonhos ou contradições entre versões oficiais e relatos populares.",
      },
    ],
  },
  {
    key: "atributos",
    label: "Atributos",
    icon: BarChart3,
    title: "Atributos, Dano e Resistência",
    description:
      "Use os atributos como base para interpretar dano causado, dano recebido, testes, resistências e impacto das habilidades durante a campanha.",
    topics: [
      {
        title: "Função dos atributos",
        content:
          "Os atributos representam a base física, mental, social e sobrenatural de um personagem. Eles ajudam o Mestre a definir testes, interpretar consequências, estimar dano, resistência, mobilidade, influência e controle de habilidades.",
      },
      {
        title: "POD — Poder",
        content:
          "POD representa a força ofensiva e a intensidade da Marca. Ele deve influenciar dano causado, impacto de habilidades, pressão ofensiva e efeitos que dependem de força bruta ou energia sobrenatural. Personagens com POD alto tendem a causar mais dano ou impor efeitos mais fortes.",
      },
      {
        title: "DES — Destreza",
        content:
          "DES representa agilidade, precisão, esquiva, mobilidade e tempo de reação. Use DES para ataques precisos, fuga, acrobacias, movimentação em combate, iniciativa, esquiva e ações que exigem rapidez.",
      },
      {
        title: "RES — Resiliência",
        content:
          "RES representa resistência física, defesa e capacidade de suportar dano. Ela deve influenciar vida máxima, redução de impacto, resistência a ferimentos, venenos, exaustão e efeitos físicos. Personagens com RES alta são mais difíceis de derrubar.",
      },
      {
        title: "INT — Intelecto",
        content:
          "INT representa raciocínio, análise, conhecimento e controle técnico. Use INT para investigação, estratégia, leitura de padrões, compreensão de fenômenos, uso complexo de habilidades e interpretação de pistas.",
      },
      {
        title: "DET — Determinação",
        content:
          "DET representa força de vontade, estabilidade emocional e resistência mental. Use DET para resistir a medo, dor, manipulação, pressão psicológica, efeitos do Miasma e situações em que o personagem precisa continuar agindo apesar do risco.",
      },
      {
        title: "PRE — Presença",
        content:
          "PRE representa influência, carisma, liderança, intimidação e expressão da alma. Use PRE para negociações, discursos, comandos, canto, suporte, imposição social e efeitos que dependem da força da presença do personagem.",
      },
      {
        title: "Dano causado",
        content:
          "Ao calcular ou interpretar dano causado por jogadores, observe principalmente POD, o tipo da habilidade e a Marca usada. Habilidades ofensivas geralmente escalam melhor com POD, mas algumas podem depender de DES, INT, DET ou PRE quando a descrição fizer sentido.",
      },
      {
        title: "Dano recebido",
        content:
          "Ao calcular ou interpretar dano recebido, observe RES, defesa narrativa, proteção de aliados, cobertura, armadura, habilidades defensivas e circunstâncias da cena. RES não precisa anular dano sozinha, mas deve representar a capacidade de resistir ao impacto.",
      },
      {
        title: "Atributo certo para cada cena",
        content:
          "Nem toda ação precisa usar sempre o mesmo atributo. Um ataque com espada pode usar POD se for força bruta, DES se for precisão, ou DET se for uma técnica feita sob pressão extrema. Escolha o atributo que melhor representa a descrição da ação.",
      },
    ],
  },
  {
    key: "combate",
    label: "Combate",
    icon: Swords,
    title: "Condução de Combate",
    description:
      "Use combates como cenas de tensão, decisão e consequência, não apenas como uma troca de dano entre personagens e inimigos.",
    topics: [
      {
        title: "Quando iniciar um combate",
        content:
          "Nem todo conflito precisa virar combate. Uma cena de ameaça pode ser resolvida por negociação, fuga, intimidação, estratégia ou uso criativo das Marcas. Inicie combate quando houver risco real, oposição ativa e consequências claras.",
      },
      {
        title: "Iniciativa e ritmo",
        content:
          "Mantenha turnos objetivos. Peça decisões claras, descreva ações importantes e evite transformar o combate em uma sequência fria de números. Cada rodada deve alterar a situação da cena de alguma forma.",
      },
      {
        title: "Classe de Dificuldade",
        content:
          "A Classe de Dificuldade, ou CD, define o valor necessário para um teste ser bem-sucedido. Como base provisória, use CD 8 para ações simples, CD 12 para ações comuns, CD 16 para ações difíceis, CD 20 para ações extremas e CD 24 ou mais para feitos quase impossíveis.",
      },
      {
        title: "Vantagem narrativa",
        content:
          "Quando um jogador usa o ambiente, interpreta bem, explora uma fraqueza ou cria uma solução inteligente, o Mestre pode reduzir a CD, conceder bônus ou permitir um efeito adicional. Boas ideias devem ser recompensadas.",
      },
      {
        title: "Falha não precisa travar a história",
        content:
          "Uma falha não precisa significar apenas 'nada acontece'. Ela pode gerar custo, atraso, dano, exposição, perda de recurso ou uma complicação. Isso mantém a história andando mesmo quando os dados não favorecem o grupo.",
      },
      {
        title: "Monstros e ameaças",
        content:
          "Monstros devem ter comportamento próprio. Uma criatura faminta, treinada, corrompida pelo Miasma ou inteligente não age da mesma forma. Dê padrões de ataque, instintos, medo, objetivos e reações diferentes para cada ameaça importante.",
      },
      {
        title: "Usuários de Marcas",
        content:
          "Inimigos com Marcas devem lutar de acordo com seu ramo de poder. Um Manifesto pode manipular luz, um Oculto pode usar sombras e vazio, uma Entoadora pode afetar sensações pelo canto, um usuário da Respiração pode usar técnica elemental e um Maso pode apresentar poderes imprevisíveis.",
      },
      {
        title: "Terreno e ambiente",
        content:
          "Use o cenário como parte do combate. Pontes, corredores, ruínas, cortinas de Miasma, áreas iluminadas, sombras profundas, multidões e estruturas instáveis podem mudar completamente a estratégia dos jogadores.",
      },
      {
        title: "Consequências",
        content:
          "Vitória não precisa significar segurança total. Ferimentos, perda de recursos, destruição de objetos, mudança no ambiente, fuga de inimigos ou chegada de reforços podem tornar o combate mais marcante.",
      },
      {
        title: "Combates importantes",
        content:
          "Chefes e batalhas centrais devem ter fases, objetivos alternativos ou mudanças de cenário. Um chefe não precisa ser vencido apenas zerando seus pontos de vida: os jogadores podem precisar quebrar uma fonte de energia, proteger alguém, fugir, resistir por tempo suficiente ou descobrir uma fraqueza. As vezes, tentar conversar também pode funcionar.",
      },
      {
        title: "Criando habilidades de campanha",
        content:
          "Além das habilidades base de cada Marca, o Mestre pode criar habilidades específicas para uma campanha. Essas habilidades devem respeitar o tom do personagem, a Marca envolvida e o equilíbrio da mesa. Antes de criar uma habilidade, defina seu tipo, custo, momento de uso, efeito principal, limitação e possível consequência narrativa.",
      },
      {
        title: "Tipos de habilidade",
        content:
          "As habilidades podem ser divididas em ofensivas, suporte/defensivas, destreza/utilidade, passivas e penalidades. Habilidades ofensivas causam dano, aplicam pressão ou criam vantagem agressiva. Habilidades de suporte ou defesa protegem, curam, fortalecem aliados ou reduzem riscos. Habilidades de destreza e utilidade ajudam em movimentação, exploração, furtividade, fuga, investigação ou controle de ambiente.",
      },
      {
        title: "Passivas e penalidades",
        content:
          "Habilidades passivas funcionam sem ativação direta ou alteram regras específicas do personagem, como ganho de PA, resistência, limite de recurso, percepção ou interação com uma Marca. Penalidades representam custos permanentes, fraquezas ou consequências ligadas ao poder. Uma boa penalidade não deve inutilizar o personagem, mas deve tornar o uso daquele poder mais interessante e arriscado.",
      },
      {
        title: "Custo em PA e PR",
        content:
          "Ao criar uma habilidade, o Mestre deve definir se ela consome PA, PR, ambos ou nenhum recurso. Habilidades usadas no turno geralmente consomem PA. Habilidades de reação geralmente consomem PR. Habilidades muito flexíveis, que podem ser usadas em várias ocasiões ou interferir fortemente na cena, podem exigir custo maior ou consumir PA e PR ao mesmo tempo.",
      },
      {
        title: "Equilíbrio de habilidades",
        content:
          "Uma habilidade não precisa ser equilibrada apenas pelo dano. Alcance, área, duração, custo, condição de uso, risco, frequência e impacto narrativo também fazem parte do equilíbrio. Se uma habilidade resolve muitos problemas ao mesmo tempo, ela deve ter custo maior, limitação clara ou uma consequência relevante.",
      },
    ],
  },
  {
    key: "miasma",
    label: "Miasma",
    icon: Sparkles,
    title: "Miasma, RAIDs e Pressão Narrativa",
    description:
      "O Miasma é o nome do pólen roxo liberado pela Flor em cerca de 100 em 100 anos, uma névoa densa envolta de mistério e transformação. Em Awakening of the Maiden, seu comportamento anormal está ligado às raízes danificadas da Flor e ao surgimento de regiões instáveis.",
    topics: [
      {
        title: "Origem recente do Miasma",
        content:
          "O Miasma presente em Awakening of the Maiden é resultado da última liberação da Flor, ocorrida cerca de 70 anos antes. Diferente de ciclos anteriores, parte dele permaneceu no mundo de forma anormal após danos causados às raízes da Flor durante a construção da Cidade Catedral. Apenas o Manifesto e poucos antigos trabalhadores sabem disso.",
      },
      {
        title: "Função na campanha",
        content:
          "O Miasma pode servir como ameaça, mistério, limite de mapa, origem de monstros, fonte de RAIDs ou sinal de que uma região está fora da ordem natural. Ele deve ser tratado como algo perigoso, mas nem sempre totalmente compreendido.",
      },
      {
        title: "Presença gradual",
        content:
          "Nem todo contato com o Miasma precisa causar dano imediato. Ele pode começar com sinais sutis: sonhos estranhos, perda de memória, vozes distantes, alteração de cor, sensação de frio, plantas mortas, animais inquietos ou sombras se movendo de forma anormal. Além do Miasma já presente no mundo, alguns podem surgir de repente.",
      },
      {
        title: "Contaminação",
        content:
          "Regiões contaminadas podem distorcer criaturas, estruturas e sentidos. O Mestre pode aplicar penalidades, testes adicionais, encontros inesperados ou alterações narrativas conforme os personagens permanecem expostos.",
      },
      {
        title: "RAIDs",
        content:
          "RAIDs são manifestações instáveis do Miasma. Elas podem invocar espaços, monstros, estruturas ou cópias de realidades distintas contaminadas. O que surge de uma RAID costuma apresentar aspecto roxo, comportamento agressivo e incapacidade de falar ou se expressar normalmente.",
      },
      {
        title: "Chefes de RAID",
        content:
          "Um chefe de RAID deve parecer deslocado do mundo comum. Ele pode ser uma cópia distorcida de uma lenda, guerreiro, criatura ou entidade de outra realidade. O Mestre pode usar referências indiretas, mas deve adaptá-las ao tom de Voice of Flower e à corrupção do Miasma.",
      },
      {
        title: "RAIDs como evento",
        content:
          "Uma RAID não precisa ser apenas uma dungeon. Ela pode surgir no meio de uma cidade, substituir uma floresta, abrir uma passagem impossível ou transformar um lugar conhecido em um espaço hostil. Use RAIDs para quebrar a normalidade da campanha. Em certas ocasiões, facções ou até grupos de aventureiros podem participar de uma RAID.",
      },
      {
        title: "Pressão narrativa",
        content:
          "O Miasma funciona melhor quando cria pressão. Uma cidade pode estar prestes a ser isolada, uma rota pode se fechar, um NPC pode desaparecer, uma criatura pode surgir ou uma facção pode tentar usar o fenômeno para vantagem própria.",
      },
      {
        title: "Mistério",
        content:
          "Evite explicar tudo cedo demais. O desconhecido é parte essencial do clima de Voice of Flower. Deixe os jogadores criarem teorias, investigarem sinais e descobrirem aos poucos como a Flor, o Miasma e as facções estão conectados.",
      },
    ],
  },
];
