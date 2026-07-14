import { useState } from "react";
import herobg from "../../../assets/images/hero-bg.svg";
import { Link } from "react-router-dom";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Scroll,
  Sparkles,
  Swords,
  Users,
  Wand2,
} from "lucide-react";

import Button from "../../../shared/components/Button/Button";

const marcas = [
  {
    nome: "Manifesto",
    subtitulo: "A Marca da luz, da nobreza e da influência divina",
    descricao:
      "A Marca do Manifesto manifesta poderes ligados à luz. Seu prestígio nasce da proximidade com a Flor e do domínio político da família real, que transforma fé, sangue nobre e autoridade em poder.",
    funcao: "Luz • Autoridade • Nobreza",
    cor: "from-amber-500 to-orange-700",
    corBorda: "border-amber-500/40",
    image: "/images/marks/manifesto.png",
  },
  {
    nome: "Oculto",
    subtitulo: "A Marca da escuridão, dos segredos e do vazio",
    descricao:
      "A Marca do Oculto domina sombras, matéria escura e constructos nascidos da umbracinese. Seus usuários tem acesso a uma dimensão vazia ligada à própria sombra, ocultando objetos ou até corpos.",
    funcao: "Escuridão • Segredo • Vazio",
    cor: "from-violet-600 to-purple-900",
    corBorda: "border-violet-500/40",
    image: "/images/marks/oculto.png",
  },
  {
    nome: "Entoadora",
    subtitulo: "A Marca da voz, do canto e da alma",
    descricao:
      "A Marca da Entoadora canaliza poder através do canto. Suas vozes podem fortalecer aliados, enfraquecer inimigos, e, em casos raros, manifestar Anjos: criaturas ligadas à alma de quem canta.",
    funcao: "Canto • Suporte • Manipulação",
    cor: "from-rose-400 to-pink-700",
    corBorda: "border-rose-500/40",
    image: "/images/marks/entoadora.png",
  },
  {
    nome: "Respiração",
    subtitulo: "A Marca do corpo, da natureza e dos elementos",
    descricao:
      "A Marca da Respiração controle corporal minucioso e sintonia com a natureza. Seus portadores canalizam elementos ou forças derivadas em estilos de combate precisos, muitas vezes associados a armas.",
    funcao: "Elemento • Técnica • Disciplina",
    cor: "from-teal-400 to-cyan-700",
    corBorda: "border-teal-500/40",
    image: "/images/marks/respiracao.png",
  },
  {
    nome: "Maso",
    subtitulo: "A Marca da magia bruta, da mutação e do instinto",
    descricao:
      "A Marca do Maso é a mais imprevisível. Cada usuário nasce com um poder próprio, podendo ser simples ou até impossível de classificar. Monstros, seres antropomórficos e muitos povos possuem a Marca.",
    funcao: "Magia • Mutação • Poder Inato",
    cor: "from-red-600 to-rose-900",
    corBorda: "border-red-500/40",
    image: "/images/marks/maso.png",
  },
];

const features = [
  {
    icon: Swords,
    title: "Conflitos Entre Facções",
    description:
      "Entre o domínio religioso do Manifesto e os territórios do Sindicato das Sombras, cada escolha pode alterar o equilíbrio do continente.",
  },
  {
    icon: BookOpen,
    title: "Campanhas no Universo VOF",
    description:
      "Crie histórias próprias ou explore a campanha principal de Awakening of the Maiden, com RAIDs, personagens e eventos conectados à lore.",
  },
  {
    icon: Sparkles,
    title: "Miasma, Flor e Mistério",
    description:
      "A Flor sustenta fé e poder, mas o Miasma ainda contamina regiões esquecidas, distorce realidades e transforma o que toca em ameaça.",
  },
];

const tools = [
  {
    icon: Users,
    title: "Criação de Personagens",
    description:
      "Monte personagens com Marca, atributos, história, imagens, habilidades e vínculos com campanhas.",
    image:
      "https://images.unsplash.com/photo-1700234272632-9f7a43b84e1c?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Scroll,
    title: "Gestão de Campanhas",
    description:
      "Organize localizações, NPCs, monstros, itens, eventos, sessões e anotações em um acervo digital para a mesa.",
    image:
      "https://images.unsplash.com/photo-1653201927638-f752117e29d0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    icon: Wand2,
    title: "Rolagens Compartilhadas",
    description:
      "Role dados em tempo real com histórico compartilhado entre Mestre e Jogadores dentro da campanha.",
    image:
      "https://images.unsplash.com/photo-1659480142923-0cd01191e0e9?auto=format&fit=crop&w=900&q=80",
  },
];

export default function HomePage() {
  const [currentMarca, setCurrentMarca] = useState(0);
  const marca = marcas[currentMarca];

  function prevMarca() {
    setCurrentMarca((index) => (index - 1 + marcas.length) % marcas.length);
  }

  function nextMarca() {
    setCurrentMarca((index) => (index + 1) % marcas.length);
  }

  return (
    <main>
      <section className="relative mt-16 h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={herobg}
            alt="Paisagem medieval fantástica"
            className="h-full w-full object-cover transform scale-101"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-slate-950/65 to-slate-950/10" />
        </div>

        <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-center">
            <h1 className="mb-6 bg-gradient-to-r from-amber-200 via-amber-400 to-rose-400 bg-clip-text font-bold leading-tight whitespace-nowrap text-transparent md:text-7xl text-5xl">
              Voice Of Flower
            </h1>
            <p className="mb-4 text-xl text-amber-100/90 md:text-2xl">
              Awakening Of The Maiden
            </p>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-amber-100/70">
              Explore um continente marcado pela Flor, pelo Miasma e por Marcas
              capazes de moldar corpos, reinos e destinos em meio a uma guerra
              prestes a despertar.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tools">
                <Button size="lg">Começar Aventura</Button>
              </Link>
              <Link to="/rules">
                <Button size="lg" variant="outline">
                  Explorar Regras
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/60 text-center">
          Awakening of the Maiden
        </p>
        <h2 className="mb-4 text-center text-4xl font-semibold text-amber-100">
          Um Mundo Entre Fé, Guerra e Mentiras
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-amber-100/60">
          Voice of Flower apresenta um cenário onde Marcas definem poderes,
          facções disputam territórios e a influência da Flor molda a fé, a
          política e o medo das pessoas.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-xl border border-amber-900/30 bg-slate-900/50 p-6 transition-colors hover:border-amber-700/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-rose-600/20">
                <Icon className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-amber-100">
                {title}
              </h3>
              <p className="text-sm leading-6 text-amber-100/60">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-900/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/60">
              Classes
            </p>

            <h2 className="mb-4 text-4xl font-semibold text-amber-100">
              As Marcas
            </h2>

            <p className="text-base leading-7 text-amber-100/60">
              Cada personagem carrega uma Marca, uma manifestação de poder que
              influencia sua origem, sua posição no mundo e a forma como
              enfrenta os perigos presentes.
            </p>
          </div>

          <div
            className={`
        relative
        mx-auto
        max-w-4xl
        overflow-hidden
        rounded-2xl
        border
        ${marca.corBorda}
        bg-slate-900/70
        shadow-xl
      `}
          >
            <div className="relative grid gap-8 p-6 md:grid-cols-[260px_1fr] md:p-8">
              <div className="flex items-center justify-center">
                <div
                  className={`
              relative
              flex
              h-52
              w-52
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              ${marca.corBorda}
              bg-slate-950
            `}
                >
                  <img
                    src={marca.image}
                    alt={`Marca ${marca.nome}`}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                </div>
              </div>

              <div className="flex flex-col justify-center text-center md:text-left">
                <span
                  className={`
              mb-4
              inline-flex
              w-fit
              self-center
              rounded-full
              border
              ${marca.corBorda}
              bg-slate-950/50
              px-3
              py-1.5
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-amber-100/60
              md:self-start
            `}
                >
                  {marca.funcao}
                </span>

                <h3
                  className={`
              bg-gradient-to-r
              ${marca.cor}
              bg-clip-text
              text-4xl
              font-bold
              text-transparent
              md:text-5xl
            `}
                >
                  {marca.nome}
                </h3>

                <p className="mt-2 text-base font-medium text-amber-100/65">
                  {marca.subtitulo}
                </p>

                <p className="mt-5 max-w-xl text-base leading-7 text-amber-100/65">
                  {marca.descricao}
                </p>
              </div>
            </div>

            <button
              onClick={prevMarca}
              className="
          absolute
          left-3
          top-1/2
          flex
          h-9
          w-9
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-amber-900/40
          bg-slate-950/80
          text-amber-300
          backdrop-blur
          transition-all
          hover:border-amber-500/60
          hover:bg-amber-500/15
        "
              aria-label="Marca anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={nextMarca}
              className="
          absolute
          right-3
          top-1/2
          flex
          h-9
          w-9
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-amber-900/40
          bg-slate-950/80
          text-amber-300
          backdrop-blur
          transition-all
          hover:border-amber-500/60
          hover:bg-amber-500/15
        "
              aria-label="Próxima marca"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {marcas.map((item, index) => (
              <button
                key={item.nome}
                onClick={() => setCurrentMarca(index)}
                className={`
            rounded-full
            border
            px-3
            py-1.5
            text-xs
            font-medium
            transition-all

            ${
              index === currentMarca
                ? `${item.corBorda} bg-amber-500/15 text-amber-200`
                : "border-amber-900/30 bg-slate-900/60 text-amber-100/45 hover:border-amber-700/50 hover:text-amber-100/80"
            }
          `}
              >
                {item.nome}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/60 text-center">
          Maiden-Gate
        </p>
        <h2 className="mb-4 text-center text-4xl font-semibold text-amber-100">
          Uma Mesa Digital Para Voice of Flower
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-amber-100/60">
          Gerencie campanhas, personagens, sessões e rolagens em um espaço
          criado para apoiar Mestres e Jogadores durante a jornada.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {tools.map(({ icon: Icon, title, description, image }) => (
            <article
              key={title}
              className="group overflow-hidden rounded-xl border border-amber-900/30 bg-slate-900/50 transition-colors hover:border-amber-700/50"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 backdrop-blur-sm">
                  <Icon className="h-5 w-5 text-amber-300" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-amber-100">
                  {title}
                </h3>
                <p className="text-sm leading-6 text-amber-100/60">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-amber-700/30 bg-gradient-to-r from-amber-900/30 to-rose-900/30 p-10 text-center">
          <h2 className="mb-4 text-3xl font-semibold text-amber-100">
            Pronto para atravessar o Maiden-Gate?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-amber-100/65">
            Crie sua conta, prepare sua ficha e entre em campanhas marcadas por
            facções, Marcas, RAIDs e segredos deixados pelo Miasma.
          </p>
          <Link to="/tools">
            <Button size="lg">Conhecer Ferramentas</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
