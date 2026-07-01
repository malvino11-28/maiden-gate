import { tools } from "../data/tools";

import ToolInfoCard from "../components/ToolInfoCard";

import CTASection from "../../home/components/CTASection";

export default function ToolsPage() {
  return (
    <main className="bg-[#090D1F]">
      <section className="mx-auto max-w-7xl px-6 py-32">
        <h1 className="mb-4 text-6xl font-bold text-white">Ferramentas</h1>

        <p className="mb-16 text-xl text-stone-400">
          Recursos desenvolvidos para facilitar campanhas, acelerar sessões e
          oferecer uma experiência completa dentro do universo Voice Of Flower.
        </p>

        <div className="grid gap-8 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolInfoCard key={tool.id} {...tool} />
          ))}
        </div>
      </section>

      <CTASection
        title="Precisa de mais ferramentas?"
        description="Estamos sempre expandindo o Voice Of Flower. Envie suas ideias e ajude a construir novas funcionalidades para a comunidade."
        buttonText="Enviar sugestão"
        buttonLink="/contact"
      />
    </main>
  );
}
