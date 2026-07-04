import { Link } from "react-router-dom";

import Button from "../../../shared/components/Button/Button";
import { tools } from "../data/tools";
import ToolInfoCard from "../components/ToolInfoCard";

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-5xl font-semibold text-amber-100">
        Ferramentas
      </h1>

      <p className="mb-12 max-w-3xl text-lg leading-8 text-amber-100/70">
        Recursos desenvolvidos para facilitar campanhas, acelerar sessões e
        oferecer uma experiência completa dentro do universo Voice Of Flower.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolInfoCard key={tool.id} {...tool} />
        ))}
      </div>

      <section className="mt-20 rounded-2xl border border-amber-700/30 bg-gradient-to-r from-amber-900/30 to-rose-900/30 p-10 text-center">
        <h2 className="mb-3 text-2xl font-semibold text-amber-100">
          Precisa de mais ferramentas?
        </h2>
        <p className="mx-auto mb-7 max-w-xl text-amber-100/60">
          Estamos sempre expandindo o Voice Of Flower. Envie suas ideias e ajude
          a construir novas funcionalidades para a comunidade.
        </p>
        <Link to="/contact">
          <Button size="lg">Enviar sugestão</Button>
        </Link>
      </section>
    </main>
  );
}
