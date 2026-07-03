import { useState } from "react";
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
    descricao:
      "A Marca do Manifesto canaliza autoridade e vontade manifesta. Seus portadores transformam intenção em presença, controle e força no campo de batalha.",
    cor: "from-amber-500 to-orange-600",
    corBorda: "border-amber-500/40",
    emoji: "⚔️",
  },
  {
    nome: "Oculto",
    descricao:
      "A Marca do Oculto domina sombras, segredos e o que existe nas frestas da realidade. Seus portadores vencem antes mesmo de serem percebidos.",
    cor: "from-violet-600 to-purple-800",
    corBorda: "border-violet-500/40",
    emoji: "🌒",
  },
  {
    nome: "Entoadora",
    descricao:
      "A Marca da Entoadora tece poder por meio da voz e do canto. Melodias podem curar feridas, distorcer mentes ou despertar forças antigas.",
    cor: "from-rose-400 to-pink-600",
    corBorda: "border-rose-500/40",
    emoji: "🎶",
  },
  {
    nome: "Respiração",
    descricao:
      "A Marca da Respiração conecta o corpo ao fluxo vital do mundo. Cada fôlego pode ser defesa, movimento, cura ou explosão de energia.",
    cor: "from-teal-400 to-cyan-600",
    corBorda: "border-teal-500/40",
    emoji: "🌬️",
  },
  {
    nome: "Maso",
    descricao:
      "A Marca do Maso abraça a dor como catalisador. Seus portadores encontram poder no limite e se tornam mais perigosos quanto mais resistem.",
    cor: "from-red-600 to-rose-800",
    corBorda: "border-red-500/40",
    emoji: "🩸",
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
    description: "Crie heróis únicos com atributos, Marca, história e progressão.",
    image:
      "https://images.unsplash.com/photo-1700234272632-9f7a43b84e1c?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Scroll,
    title: "Grimório Digital",
    description: "Organize habilidades, regras e lore em um acervo fácil de consultar.",
    image:
      "https://images.unsplash.com/photo-1512331455279-c8ae8178f586?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Wand2,
    title: "Rolagem de Dados",
    description: "Ferramentas digitais para testes, combate e improviso de mesa.",
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
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=85"
            alt="Paisagem medieval fantástica"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/10" />
        </div>

        <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-center">
            <h1 className="mb-6 bg-gradient-to-r from-amber-200 via-amber-400 to-rose-400 bg-clip-text text-5xl font-bold leading-tight text-transparent md:text-7xl">
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
          <h2 className="mb-4 text-center text-4xl font-semibold text-amber-100">
            As Marcas
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-amber-100/60">
            Cada personagem carrega uma Marca, um poder singular que define sua
            relação com o mundo e seu papel dentro da aventura.
          </p>

          <div className={`relative mx-auto max-w-2xl rounded-2xl border ${marca.corBorda} bg-slate-900/70 p-10 text-center shadow-2xl md:p-14`}>
            <div className={`mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${marca.cor} text-4xl shadow-lg`}>
              {marca.emoji}
            </div>
            <h3 className={`mb-4 bg-gradient-to-r ${marca.cor} bg-clip-text text-4xl font-bold text-transparent`}>
              {marca.nome}
            </h3>
            <p className="mx-auto max-w-xl text-lg leading-8 text-amber-100/75">
              {marca.descricao}
            </p>

            <button
              onClick={prevMarca}
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-amber-900/40 bg-slate-800/80 text-amber-300 transition-all hover:border-amber-500/60 hover:bg-amber-500/20"
              aria-label="Marca anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextMarca}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-amber-900/40 bg-slate-800/80 text-amber-300 transition-all hover:border-amber-500/60 hover:bg-amber-500/20"
              aria-label="Próxima marca"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {marcas.map((item, index) => (
              <button
                key={item.nome}
                onClick={() => setCurrentMarca(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentMarca ? "w-8 bg-amber-400" : "w-2 bg-amber-900/50 hover:bg-amber-700/60"
                }`}
                aria-label={`Selecionar ${item.nome}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
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
                <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
