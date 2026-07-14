import { useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  Crown,
  Download,
  ScrollText,
  Shield,
  Sparkles,
  Swords,
  Dice6,
  Flower2,
} from "lucide-react";

type RuleTab = {
  key: string;
  label: string;
  icon: React.ElementType;
  title: string;
  description: string;
  topics: {
    title: string;
    content: string;
  }[];
};

type Props = {
  role: "master" | "player";
};

const masterTabs: RuleTab[] = [
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
const playerTabs: RuleTab[] = [
  {
    key: "visao-geral",
    label: "Visão Geral",
    icon: Shield,
    title: "Papel do Jogador",
    description:
      "O jogador interpreta seu personagem, toma decisões, participa da história e colabora com o grupo para construir uma campanha memorável.",
    topics: [
      {
        title: "Função principal",
        content:
          "O jogador é responsável por dar vida ao próprio personagem. Isso envolve interpretar suas escolhas, seus medos, seus objetivos, seus vínculos e a forma como ele reage aos perigos do mundo. Você não precisa atuar perfeitamente; basta pensar no que seu personagem faria diante das situações apresentadas pelo Mestre.",
      },
      {
        title: "Colaboração na mesa",
        content:
          "Voice of Flower funciona melhor quando os personagens podem ter conflitos, mas os jogadores continuam colaborando entre si. Discordâncias dentro da história são válidas, desde que todos na mesa estejam contribuindo para uma experiência divertida e respeitosa.",
      },
      {
        title: "Escolhas com consequência",
        content:
          "Suas decisões movem a campanha. Investigar, negociar, fugir, lutar, esconder informações ou fazer alianças são caminhos válidos. O importante é entender que escolhas relevantes podem gerar consequências para o personagem, para o grupo e para o mundo ao redor.",
      },
      {
        title: "Conhecimento do jogador e do personagem",
        content:
          "Nem tudo que o jogador sabe deve ser tratado como algo que o personagem sabe. Informações sobre facções, Miasma, Marcas, NPCs ou segredos da campanha devem ser usadas apenas quando fizer sentido dentro da história do personagem.",
      },
      {
        title: "Tom de Voice of Flower",
        content:
          "Awakening of the Maiden mistura fantasia sombria, política, mistério, Marcas, fé, Miasma e conflitos entre facções. Espere situações em que força bruta nem sempre será a melhor resposta, e onde uma decisão social ou moral pode ser tão importante quanto vencer um combate.",
      },
    ],
  },
  {
    key: "personagem",
    label: "Personagem",
    icon: BookOpen,
    title: "Criação e Evolução",
    description:
      "Seu personagem é definido por origem, história, atributos, Marca, habilidades e pelas escolhas feitas durante a campanha.",
    topics: [
      {
        title: "Conceito do personagem",
        content:
          "Antes de pensar apenas em números, defina quem é seu personagem. Pense em sua origem, aparência, personalidade, desejo principal, medo, relação com a própria Marca e motivo para entrar na campanha. Um conceito claro ajuda o Mestre a conectar sua ficha à história.",
      },
      {
        title: "Origem e história",
        content:
          "A história do personagem não precisa ser longa, mas deve oferecer pontos de conexão com o mundo. Você pode definir de onde ele veio, qual facção influenciou sua vida, como descobriu sua Marca, o que perdeu, o que procura e por que aceitaria se envolver em eventos perigosos. Dica: na dúvida, seu personagem nasceu da Flor.",
      },
      {
        title: "Atributos principais",
        content:
          "Os personagens utilizam seis atributos: POD, DES, RES, INT, DET e PRE. Eles representam poder, destreza, resiliência, inteligência, determinação e presença. Esses atributos influenciam testes, combate, resistência, interação social e uso de habilidades.",
      },
      {
        title: "Distribuição inicial",
        content:
          "No início, o personagem recebe 12 pontos para distribuir entre os atributos. No nível 1, nenhum atributo deve ultrapassar 5 pontos, a menos que o Mestre permita uma exceção por regra especial, origem ou evento da campanha.",
      },
      {
        title: "Habilidades equipadas",
        content:
          "Cada personagem pode possuir várias habilidades associadas à sua Marca, mas apenas uma quantidade limitada delas fica equipada para uso durante a sessão. No Maiden-Gate, o jogador pode equipar até 6 habilidades, representando as técnicas, poderes ou vantagens que estão disponíveis naquele momento. A única exceção são as penalidades, se o jogador atender o requisito, ele deve levar em consideração seu efeito.",
      },
      {
        title: "Evolução",
        content:
          "Conforme a campanha avança, o personagem pode subir de nível, melhorar atributos, receber novas habilidades, obter itens, criar vínculos e ganhar influência no mundo. A progressão comum pode ir até o nível 30, mas o Mestre pode liberar avanços especiais até o nível 40 em campanhas com eventos avançados.",
      },
      {
        title: "Personagem e campanha",
        content:
          "Um personagem funciona melhor quando possui algum vínculo com a campanha. Esse vínculo pode ser uma dívida, uma promessa, uma facção, um NPC, uma região, uma investigação, uma rivalidade ou simplesmente um cidadão normal deste mundo.",
      },
    ],
  },
  {
    key: "marcas",
    label: "Marcas",
    icon: Flower2,
    title: "Marcas e Poderes",
    description:
      "As Marcas são manifestações de poder que influenciam habilidades, identidade, posição social e a forma como cada personagem interage com o mundo.",
    topics: [
      {
        title: "O que é uma Marca",
        content:
          "A Marca não é apenas uma classe. Ela representa um ramo de poder, uma manifestação no corpo e uma identidade reconhecida pelo mundo. A Marca influencia o estilo de combate, a forma como outras pessoas enxergam o personagem e as possibilidades narrativas da campanha.",
      },
      {
        title: "Manifesto",
        content:
          "A Marca do Manifesto está ligada à luz. Socialmente, ela possui forte relação com a nobreza, a fé e a autoridade da família real. Personagens dessa Marca podem ser vistos com prestígio, suspeita ou responsabilidade.",
      },
      {
        title: "Oculto",
        content:
          "A Marca do Oculto está ligada à escuridão, sombras e ao vazio. É uma Marca associada a segredos, estratégia, mobilidade e mistério.",
      },
      {
        title: "Respiração",
        content:
          "A Marca da Respiração envolve poderes elementais ou derivados, mas exige disciplina, controle corporal e conexão com a natureza. Seus usuários costumam se destacar por técnicas precisas, estilos de combate e domínio físico. Essa Marca é especial, pois o jogador em conjunto com o mestre, define seu elemento.",
      },
      {
        title: "Entoadora",
        content:
          "A Marca da Entoadora canaliza poder através do canto. Suas habilidades são em sua maioria de suporte. Algumas Entoadoras raras podem manifestar criaturas ligadas à própria alma, chamadas de Anjos.",
      },
      {
        title: "Maso",
        content:
          "A Marca do Maso é a mais imprevisível. Cada usuário nasce com uma capacidade própria, que pode ser simples, monstruosa, física, sensorial ou impossível de classificar. É uma Marca muito presente no mundo e também associada a monstros e seres antropomórficos.",
      },
      {
        title: "Relação com o mundo",
        content:
          "Cada Marca possui peso social e político. Em algumas regiões, uma Marca pode abrir portas; em outras, pode gerar medo, preconceito ou perseguição. Pense em como seu personagem enxerga a própria Marca e como ele reage ao tratamento que recebe por causa dela.",
      },
      {
        title: "Criatividade no uso do poder",
        content:
          "O uso de uma Marca não precisa se limitar a ataques. Um poder pode ajudar em investigação, fuga, negociação, exploração, proteção, criação de vantagem ou resolução de problemas. Jogadores são encorajados a propor usos criativos, cabendo ao Mestre definir testes, custos e consequências.",
      },
    ],
  },
  {
    key: "testes",
    label: "Testes",
    icon: Dice6,
    title: "Testes e Rolagens",
    description:
      "Testes são usados quando existe risco, incerteza ou consequência relevante para a história.",
    topics: [
      {
        title: "Quando rolar",
        content:
          "Nem toda ação precisa de rolagem. Se uma ação for simples, segura ou sem consequência importante, o Mestre pode permitir que ela aconteça automaticamente. Role dados quando o resultado for incerto, perigoso ou interessante para a narrativa.",
      },
      {
        title: "Como funciona um teste",
        content:
          "Quando o Mestre pede um teste, ele define qual atributo será usado e qual é a dificuldade da ação. O jogador rola o dado indicado, soma os modificadores aplicáveis e compara o resultado com a Classe de Dificuldade definida pelo Mestre.",
      },
      {
        title: "Classe de Dificuldade",
        content:
          "A Classe de Dificuldade, ou CD, representa o valor necessário para obter sucesso. Ações simples possuem CDs menores, enquanto ações perigosas, complexas, feitas sob pressão ou afetadas pelo Miasma exigem resultados maiores.",
      },
      {
        title: "Ajudando outro personagem",
        content:
          "Quando fizer sentido na cena, um personagem pode ajudar outro. Essa ajuda pode reduzir a dificuldade, conceder bônus, permitir nova abordagem ou melhorar a consequência de um sucesso. A ajuda precisa ser descrita de forma coerente, não apenas declarada.",
      },
      {
        title: "Falhas",
        content:
          "Falhar não significa que a história para. Uma falha pode gerar custo, dano, perda de tempo, exposição, gasto de recurso, avanço de uma ameaça ou uma nova complicação. Muitas vezes, a falha muda o caminho da cena em vez de encerrar a possibilidade de ação.",
      },
      {
        title: "Sucesso com custo",
        content:
          "Em algumas situações, o Mestre pode permitir que um personagem consiga o que queria, mas pagando um preço. Isso pode significar sofrer dano, perder um item, chamar atenção, ficar em posição ruim ou criar uma consequência futura.",
      },
      {
        title: "Críticos",
        content:
          "Resultados extremos devem ser narrativamente marcantes. Um resultado muito alto pode gerar vantagem adicional, informação extra ou uma oportunidade inesperada. Um resultado muito baixo pode trazer uma complicação séria, desde que faça sentido com a cena.",
      },
      {
        title: "Interpretação antes do dado",
        content:
          "Sempre que possível, descreva como seu personagem tenta realizar a ação. A descrição pode influenciar o atributo usado, a dificuldade, os riscos e os efeitos do resultado. Em Voice of Flower, criatividade e contexto são tão importantes quanto números.",
      },
    ],
  },
  {
    key: "combate",
    label: "Combate",
    icon: Swords,
    title: "Combate para Jogadores",
    description:
      "Durante o combate, pense em posicionamento, recursos, habilidades, ambiente e objetivos além de apenas causar dano.",
    topics: [
      {
        title: "Seu turno",
        content:
          "Em seu turno, descreva o que deseja fazer. Você pode atacar, usar uma habilidade, proteger alguém, se mover, interagir com o ambiente, tentar negociar, fugir ou preparar uma ação. O Mestre indicará se é necessário teste, gasto de recurso ou rolagem de dano.",
      },
      {
        title: "Ações criativas",
        content:
          "Combate não é apenas atacar até o inimigo cair. Usar sombras, luz, terreno, objetos, distrações, canto, elementos, cobertura ou fraquezas do inimigo pode mudar completamente uma cena. Descreva suas ideias e o Mestre definirá como elas funcionam mecanicamente.",
      },
      {
        title: "Habilidades",
        content:
          "Habilidades equipadas representam técnicas, poderes ou vantagens disponíveis ao personagem. Cada habilidade possui um tipo de uso, custo e momento de ativação. Algumas são usadas no próprio turno com PA, outras funcionam como reação com PR, e algumas possuem condições especiais definidas em sua descrição.",
      },
      {
        title: "PA e PR",
        content:
          "Durante o combate, o personagem utiliza dois recursos principais: PA e PR. O PA representa a energia acumulada para usar habilidades gerais, enquanto o PR representa a capacidade de reagir fora do fluxo normal do próprio turno. Os valores exibidos na ficha indicam o limite máximo que o personagem consegue acumular, não a quantidade inicial em combate.",
      },
      {
        title: "Início do combate",
        content:
          "Sempre que um personagem entra em combate, ele começa com 0 PA e 1 PR. Esses recursos valem apenas durante a batalha e são usados exclusivamente para ativar habilidades. Ao final do combate, o Mestre pode zerar esses valores ou tratar qualquer sobra conforme a necessidade narrativa da cena.",
      },
      {
        title: "Ganho de PA",
        content:
          "No começo de cada turno do jogador, ele recebe 1 PA. Além disso, sempre que realizar uma ação que não consuma PA, ele recebe 1 PA no fim do próprio turno. A cada início de rodada, todos os personagens envolvidos na batalha também recebem 1 PA. Uma rodada termina quando todos os participantes do combate já agiram e a ordem volta para o primeiro a agir.",
      },
      {
        title: "Ganho de PR",
        content:
          "O personagem recebe 1 PR a cada 5 ações realizadas durante o combate. Essas ações incluem qualquer coisa relevante dentro da batalha, como atacar, proteger um aliado, usar uma habilidade, esquivar, defender, interferir em um turno, se movimentar de forma estratégica ou executar qualquer ação que tenha impacto na cena.",
      },
      {
        title: "Uso do PA",
        content:
          "O PA é usado para ativar habilidades gerais, normalmente durante o turno do próprio personagem. Algumas habilidades podem especificar momentos diferentes de uso, permitindo que sejam ativadas em situações especiais. Sempre leia a descrição da habilidade para entender seu custo, efeito e momento correto de ativação.",
      },
      {
        title: "Uso do PR",
        content:
          "O PR é usado para habilidades de reação. Dependendo da habilidade, o personagem pode reagir a ataques contra si mesmo, proteger aliados, responder a efeitos inimigos ou até interferir no turno de outro personagem. Reações são importantes porque permitem agir fora do próprio turno, mas dependem do custo e das condições descritas na habilidade.",
      },
      {
        title: "Habilidades especiais",
        content:
          "Algumas habilidades raras podem consumir PA e PR ao mesmo tempo, ou permitir uso em qualquer momento específico indicado pela própria descrição. Também existem habilidades e passivas capazes de gerar PA ou PR adicional, alterar limites, reduzir custos ou criar novas formas de reação durante o combate.",
      },
      {
        title: "Posicionamento",
        content:
          "Onde seu personagem está importa. Distância, cobertura, altura, iluminação, sombras, áreas contaminadas pelo Miasma e proximidade de aliados ou inimigos podem afetar suas opções. Preste atenção ao cenário antes de agir.",
      },
      {
        title: "Proteção e suporte",
        content:
          "Nem todo personagem precisa causar o maior dano. Proteger aliados, curar, enfraquecer inimigos, criar vantagem, bloquear caminhos ou impedir uma ameaça de agir pode ser decisivo para a vitória do grupo.",
      },
      {
        title: "Sobrevivência",
        content:
          "Fugir, recuar, negociar ou se render podem ser escolhas válidas. Algumas ameaças são fortes demais para serem vencidas no primeiro encontro. Sobreviver para voltar mais preparado também faz parte da jornada.",
      },
      {
        title: "Consequências do combate",
        content:
          "Mesmo uma vitória pode deixar marcas. Ferimentos, perda de itens, destruição de locais, morte de NPCs, mudança na reputação ou avanço do Miasma podem surgir como consequência. O combate deve impactar a história, não existir isolado dela.",
      },
    ],
  },

  {
    key: "miasma",
    label: "Miasma",
    icon: Sparkles,
    title: "Miasma, RAIDs e Exploração",
    description:
      "O Miasma é uma ameaça instável que distorce regiões, criaturas e a própria lógica do mundo.",
    topics: [
      {
        title: "Contato com o Miasma",
        content:
          "O Miasma é perigoso, mas seus efeitos nem sempre são imediatos. Ele pode causar sintomas físicos, sensações estranhas, sonhos, perda de orientação, alterações no ambiente ou mudanças sutis antes de se tornar uma ameaça direta.",
      },
      {
        title: "Regiões contaminadas",
        content:
          "Ao explorar regiões afetadas pelo Miasma, preste atenção aos sinais descritos pelo Mestre. Cores alteradas, silêncio anormal, criaturas agressivas, estruturas deslocadas e caminhos impossíveis podem indicar que a área não segue as regras naturais do mundo.",
      },
      {
        title: "RAIDs",
        content:
          "RAIDs são manifestações instáveis ligadas ao Miasma. Elas podem invocar lugares, monstros, estruturas ou cópias contaminadas de realidades distintas. O que surge de uma RAID costuma carregar aparência roxa, comportamento hostil e dificuldade de comunicação.",
      },
      {
        title: "Exploração",
        content:
          "Explorar não significa apenas andar pelo mapa. Investigue rastros, converse com sobreviventes, observe símbolos, procure rotas alternativas, use suas habilidades fora de combate e compartilhe informações com o grupo.",
      },
      {
        title: "Preparação",
        content:
          "Antes de entrar em áreas perigosas, revise seus recursos, habilidades equipadas, inventário e objetivos. Em Voice of Flower, preparação pode ser a diferença entre sobreviver, fugir ou desaparecer dentro de uma região tomada pelo Miasma.",
      },
      {
        title: "Mistério",
        content:
          "Nem tudo será explicado imediatamente. O desconhecido faz parte da experiência. Faça perguntas, registre pistas e permita que seu personagem descubra o mundo aos poucos, sem precisar entender todos os segredos desde o início.",
      },
    ],
  },
];

export default function RoleRulesPage({ role }: Props) {
  const tabs = role === "master" ? masterTabs : playerTabs;
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const activeRule = tabs.find((tab) => tab.key === activeTab) ?? tabs[0];
  const ActiveIcon = activeRule.icon;

  const isMaster = role === "master";

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="mb-8 overflow-hidden rounded-3xl border border-amber-900/25 bg-slate-900/60">
        <div className="relative p-6 sm:p-8">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-rose-600/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-500/25 bg-amber-500/10">
                  {isMaster ? (
                    <Crown className="h-5 w-5 text-amber-300" />
                  ) : (
                    <Shield className="h-5 w-5 text-rose-300" />
                  )}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-amber-100/35">
                    Guia essencial
                  </p>
                  <h1 className="text-3xl font-semibold text-amber-100 sm:text-4xl">
                    Regras para {isMaster ? "Mestres" : "Jogadores"}
                  </h1>
                </div>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-amber-100/60 sm:text-base">
                {isMaster
                  ? "Um resumo prático para conduzir campanhas, controlar elementos da mesa, criar tensão narrativa e organizar sessões em Voice of Flower."
                  : "Um guia rápido para entender criação de personagem, testes, combate, habilidades e participação nas campanhas de Voice of Flower."}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-900/25 bg-slate-950/50 p-4">
              <button
                type="button"
                disabled
                className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-3 text-sm font-medium text-amber-100/35"
              >
                <Download className="h-4 w-4" />
                Download indisponível
              </button>

              <p className="mt-2 text-center text-xs text-amber-100/30">
                O livro completo ainda está em desenvolvimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-amber-900/25 bg-slate-900/50 p-3 lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 px-2 text-xs uppercase tracking-[0.2em] text-amber-100/35">
            Abas
          </p>

          <div className="space-y-2">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                  activeTab === key
                    ? "border-amber-500/40 bg-gradient-to-r from-amber-500/20 to-rose-600/20 text-amber-200"
                    : "border-amber-900/20 bg-slate-950/40 text-amber-100/50 hover:border-amber-700/40 hover:text-amber-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </aside>

        <section className="rounded-2xl border border-amber-900/25 bg-slate-900/50 p-5 sm:p-6">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-amber-500/25 bg-amber-500/10">
              <ActiveIcon className="h-5 w-5 text-amber-300" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-amber-100">
                {activeRule.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-amber-100/55">
                {activeRule.description}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {activeRule.topics.map((topic, index) => (
              <article
                key={topic.title}
                className="rounded-2xl border border-amber-900/20 bg-slate-950/40 p-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-xs font-semibold text-amber-300">
                    {index + 1}
                  </span>

                  <h3 className="font-semibold text-amber-100">
                    {topic.title}
                  </h3>
                </div>

                <p className="text-sm leading-7 text-amber-100/55">
                  {topic.content}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-300/80" />
              <div>
                <p className="text-sm font-semibold text-amber-100">
                  Conteúdo resumido
                </p>
                <p className="mt-1 text-sm leading-6 text-amber-100/50">
                  Esta página contém apenas as regras essenciais para uso no
                  sistema. O livro completo de Voice of Flower será adicionado
                  futuramente.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
