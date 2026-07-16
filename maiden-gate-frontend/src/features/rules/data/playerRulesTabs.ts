import {
  BookOpen,
  Shield,
  Sparkles,
  Swords,
  Dice6,
  Flower2,
  BarChart3,
} from "lucide-react";

import type { RuleTab } from "./RoleRulesTypes";

export const playerTabs: RuleTab[] = [
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
    key: "atributos",
    label: "Atributos",
    icon: BarChart3,
    title: "Atributos do Personagem",
    description:
      "Os atributos mostram como seu personagem age, resiste, luta, pensa e influencia o mundo ao redor.",
    topics: [
      {
        title: "O que os atributos representam",
        content:
          "Os atributos não são apenas números. Eles indicam os pontos fortes e fracos do personagem, influenciam testes, combate, habilidades, resistência, interpretação e a forma como ele resolve problemas durante a campanha.",
      },
      {
        title: "POD — Poder",
        content:
          "POD aumenta principalmente o impacto ofensivo do personagem. Ele influencia dano, força da Marca, ataques diretos e habilidades que dependem de energia, força bruta ou manifestação intensa de poder.",
      },
      {
        title: "DES — Destreza",
        content:
          "DES melhora ações rápidas e precisas. Ela influencia esquiva, iniciativa, mobilidade, furtividade, precisão, manobras ágeis e reações físicas durante combate ou exploração.",
      },
      {
        title: "RES — Resiliência",
        content:
          "RES aumenta a capacidade de sobreviver. Ela influencia vida máxima, resistência física, defesa, tolerância a ferimentos, venenos, fadiga e situações em que o corpo precisa suportar pressão.",
      },
      {
        title: "INT — Intelecto",
        content:
          "INT melhora raciocínio, análise e controle técnico. Ela influencia investigação, estratégia, conhecimento, percepção de padrões, entendimento de fenômenos e uso complexo de habilidades.",
      },
      {
        title: "DET — Determinação",
        content:
          "DET representa força de vontade. Ela influencia resistência mental, coragem, foco, estabilidade contra medo, dor, pressão emocional e efeitos ligados ao Miasma.",
      },
      {
        title: "PRE — Presença",
        content:
          "PRE melhora influência e expressão. Ela influencia persuasão, intimidação, liderança, canto, suporte, presença social e habilidades que dependem da força da personalidade ou da alma.",
      },
      {
        title: "Escolhendo onde investir",
        content:
          "Ao distribuir pontos, pense no estilo do personagem. Um combatente agressivo pode investir em POD, um defensor em RES, um personagem veloz em DES, um estrategista em INT, alguém resistente mentalmente em DET e um líder ou suporte em PRE.",
      },
      {
        title: "Atributos e criatividade",
        content:
          "Os atributos indicam tendências, mas não prendem o personagem a uma única função. Um jogador pode propor usos criativos para seus atributos e habilidades, desde que a descrição faça sentido dentro da cena e o Mestre aprove o teste.",
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
