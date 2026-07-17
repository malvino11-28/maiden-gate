import type { RuleTopic } from "./RoleRulesTypes";

export const effectRules: RuleTopic[] = [
  {
    title: "O que são efeitos",
    content:
      "Efeitos são condições temporárias ou especiais aplicadas por habilidades, itens, inimigos, Marcas ou eventos narrativos. Eles podem fortalecer personagens, enfraquecer alvos, controlar ações, alterar turnos ou criar interações específicas durante o combate. Detalhes não especificados nesta lista devem ser explicados diretamente na habilidade que causa o efeito.",
  },

  {
    title: "Buffs",
    content: [
      "Aumento -> aumenta +2 em um ou mais atributos.",
      "Vantagem -> rola duas vezes e usa o melhor resultado dos dados.",
      "Regeneração -> recupera vida por turno.",
      "Recuperação -> recupera vida instantaneamente.",
      "Imortalidade -> ignora completamente um ataque.",
      "Provocação -> redireciona todos os ataques para você e reduz em 2 o dano recebido por acúmulo do efeito.",
      "Purificação -> remove debuffs atuais e torna o alvo imune a debuffs por um turno.",
    ].join("\n"),
  },
  {
    title: "Debuffs",
    content: [
      "Infecção -> impede o alvo de receber cura.",
      "Roubo -> drena 2 de vida do alvo.",
      "Redução -> reduz em 3 um ou mais atributos.",
      "Queimadura -> causa dano contínuo de fogo ou gelo por turnos.",
      "Envenenamento -> causa dano contínuo por turnos.",
      "Desvantagem -> rola duas vezes e usa o pior resultado dos dados.",
      "Intimidação -> concede Vantagem a você e Desvantagem ao adversário.",
    ].join("\n"),
  },
  {
    title: "Controle",
    content: [
      "Perdição -> força o alvo a atacar alvos aleatórios, incluindo aliados, determinados pelos dados (varia baseado na quantidade de indivíduos presentes em batalha).",
      "Paralisia -> impede o alvo de realizar uma ação.",
      "Presságio -> após dois turnos, o alvo perde uma ação.",
    ].join("\n"),
  },
  {
    title: "Efeitos especiais",
    content: [
      "Efêmero -> cria um clone temporário com metade dos atributos e que recebe Provocação.",
      "Ruína -> causa Purificação ao alvo e causa 50% de dano adicional caso ele tenha algum debuff.",
      "Castigar -> remove todos os buffs do alvo e causa Infecção.",
      "Decadência -> causa dano contínuo até o fim da batalha. É um efeito exclusivo do Miasma.",
    ].join("\n"),
  },
  {
    title: "Manifesto — Decreto e Autoridade",
    content: [
      "Decreto -> permite realizar uma ação ao fim do turno do alvo afetado.",
      "Autoridade -> por dois turnos, concede Vantagem. Toda ação que falhar contra você aumenta a duração da Autoridade em um turno.",
    ].join("\n"),
  },
  {
    title: "Entoadora — Ressonância e Acorde",
    content: [
      "Ressonância -> compartilha o efeito entre aliados. Ressonância aumenta 5 de dano por acúmulo. Com três acúmulos, Ressonância cura 10% do dano causado. Caso o alvo que esteja compartilhando o efeito receba dano, ele perde Ressonância.",
      "Acorde -> torna o alvo afetado adjacente ao Anjo. Acorde faz o alvo e o Anjo compartilharem a maior defesa e o maior modificador. Enquanto estiver sob Acorde, o alvo se torna imune a Presságio, Desvantagem e Aumento.",
    ].join("\n"),
  },
  {
    title: "Oculto — Sombra",
    content: [
      "Sombra -> envia o alvo para a dimensão do vazio. Enquanto estiver sob Sombra, o alvo não pode ser alvejado por ataques. Enquanto estiver sob Sombra, o alvo também não pode atacar.",
    ].join("\n"),
  },
  {
    title: "Respiração — Sobrecarga",
    content: [
      "Marca Sobrecarregada/Sobrecarga -> a cada turno, perde metade da vida. No turno de ativação, recebe um turno extra. Enquanto estiver sob Sobrecarga, torna-se imune a efeitos de controle, o primeiro ataque que atingir é idefensável. Após a perda do efeito, recebe paralisia por um turno.",
    ].join("\n"),
  },
  {
    title: "Maso — Dor e Fortuito",
    content: [
      "Dor -> a cada dano, perda de vida ou falha em defesa, recebe +1 POD e +1 RES.",
      "Fortuito -> após dois turnos, causa um efeito aleatório entre quatro possibilidades usando um d4.",
    ].join("\n"),
  },
];
