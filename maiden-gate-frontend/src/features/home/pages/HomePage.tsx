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
    subtitulo: "A classe da autoridade e do domínio",
    descricao:
      "A Marca do Manifesto transforma vontade em ordem. Seus portadores impõem presença, controlam o ritmo do campo de batalha e sustentam aliados através de comando, disciplina e força declarada.",
    funcao: "Controle • Liderança • Defesa",
    cor: "from-amber-500 to-orange-700",
    corBorda: "border-amber-500/40",

    image: "/images/marks/manifesto.png",
  },
  {
    nome: "Oculto",
    subtitulo: "A classe das sombras e dos segredos",
    descricao:
      "A Marca do Oculto pertence aos que vencem antes de serem vistos. Seus portadores caminham entre frestas da realidade, manipulam silêncio, medo e informação para atacar onde o inimigo é mais frágil.",
    funcao: "Furtividade • Ilusão • Precisão",
    cor: "from-violet-600 to-purple-900",
    corBorda: "border-violet-500/40",

    image: "/images/marks/oculto.png",
  },
  {
    nome: "Entoadora",
    subtitulo: "A classe da voz, do canto e da ressonância",
    descricao:
      "A Marca da Entoadora canaliza poder por meio da voz. Cânticos podem curar, proteger, confundir, enfraquecer inimigos ou despertar forças antigas adormecidas nas profundezas da Flor.",
    funcao: "Suporte • Cura • Encantamento",
    cor: "from-rose-400 to-pink-700",
    corBorda: "border-rose-500/40",

    image: "/images/marks/entoadora.png",
  },
  {
    nome: "Respiração",
    subtitulo: "A classe do fluxo vital e do movimento",
    descricao:
      "A Marca da Respiração conecta corpo, mente e mundo. Cada fôlego pode se tornar esquiva, impulso, corte, defesa ou cura, fazendo seus portadores dançarem entre velocidade e equilíbrio.",
    funcao: "Mobilidade • Técnica • Equilíbrio",
    cor: "from-teal-400 to-cyan-700",
    corBorda: "border-teal-500/40",

    image: "/images/marks/respiracao.png",
  },
  {
    nome: "Maso",
    subtitulo: "A classe da dor, do sangue e da resistência",
    descricao:
      "A Marca do Maso abraça sofrimento como combustível. Seus portadores convertem feridas em força, resistem além do limite e se tornam mais perigosos quanto mais próximos estão da ruína.",
    funcao: "Resistência • Sacrifício • Dano",
    cor: "from-red-600 to-rose-900",
    corBorda: "border-red-500/40",

    image: "/images/marks/maso.png",
  },
];

const features = [
  {
    icon: Swords,
    title: "Aventuras Épicas",
    description:
      "Explore mundos fantásticos, enfrente facções rivais e transforme decisões em consequências reais para a campanha.",
  },
  {
    icon: BookOpen,
    title: "Sistema de Regras",
    description:
      "Uma base organizada para mestres e jogadores criarem fichas, consultar regras e manter o ritmo da sessão.",
  },
  {
    icon: Sparkles,
    title: "Magia & Mistério",
    description:
      "Marcas, Miasma, ecos do passado e segredos ancestrais constroem um mundo perigoso e memorável.",
  },
];

const tools = [
  {
    icon: Users,
    title: "Criador de Personagens",
    description:
      "Crie heróis únicos com atributos, Marca, história e progressão.",
    image:
      "https://images.unsplash.com/photo-1700234272632-9f7a43b84e1c?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Scroll,
    title: "Campanha Digital",
    description:
      "Organize as informações essenciais da campanha, em um acervo fácil de consultar.",
    image:
      "https://images.unsplash.com/photo-1653201927638-f752117e29d0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    icon: Wand2,
    title: "Rolagem de Dados",
    description:
      "Ferramentas digitais para testes, combate e improviso de mesa.",
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
              Embarque em uma jornada épica através de um continente medieval
              marcado por magia, política, Marcas ancestrais e mistérios que
              atravessam séculos.
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
          Do seu jeito
        </p>
        <h2 className="mb-4 text-center text-4xl font-semibold text-amber-100">
          Um Mundo de Possibilidades
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-amber-100/60">
          Voice Of Flower oferece ferramentas para criar histórias memoráveis,
          personagens marcantes e campanhas de longa duração.
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
              Cada personagem carrega uma Marca, um poder singular que define
              sua forma de lutar, sua relação com o mundo e seu papel dentro da
              aventura.
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
          Utilidades
        </p>
        <h2 className="mb-4 text-center text-4xl font-semibold text-amber-100">
          Ferramentas Digitais
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-amber-100/60">
          Recursos integrados para facilitar a mesa e manter a campanha viva.
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
            Pronto para despertar sua Marca?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-amber-100/65">
            Crie sua conta, entre em uma campanha e comece a registrar sua lenda
            no continente de Voice Of Flower.
          </p>
          <Link to="/tools">
            <Button size="lg">Explorar Ferramentas</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
