import { Crown, Shield } from "lucide-react";

import RuleAccordion from "../../../shared/components/Accordion/RuleAccordion";
import { masterRules } from "../data/masterRules";
import { playerRules } from "../data/playerRules";
import DownloadBook from "../components/DownloadBook";

function RulesGroup({
  title,
  icon,
  tone,
  rules,
}: {
  title: string;
  icon: React.ReactNode;
  tone: "amber" | "rose";
  rules: { title: string; content: string }[];
}) {
  return (
    <section className="mb-14">
      <div className="mb-8 flex items-center gap-3">
        <div className={tone === "amber" ? "text-amber-400" : "text-rose-400"}>
          {icon}
        </div>
        <h2 className="text-3xl font-semibold text-amber-100">{title}</h2>
      </div>

      <div
        className={`rounded-xl border bg-slate-900/50 p-6 ${tone === "amber" ? "border-amber-900/30" : "border-rose-900/30"}`}
      >
        {rules.map((rule, index) => (
          <RuleAccordion
            key={rule.title}
            title={rule.title}
            defaultOpen={index === 0}
          >
            {rule.content}
          </RuleAccordion>
        ))}
      </div>
    </section>
  );
}

export default function RulesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-5xl font-semibold text-amber-100">
        Regras de Voice of Flower
      </h1>

      <p className="mb-16 text-lg leading-8 text-amber-100/70">
        Conheça os fundamentos de Voice of Flower: Awakening of the Maiden. Aqui
        você encontra uma visão inicial sobre campanhas, Marcas, testes,
        combates, RAIDs e o papel de Mestres e Jogadores dentro de um mundo
        moldado pela Flor, pelo Miasma e pelas facções que disputam seu futuro.
      </p>

      <RulesGroup
        title="Guia do Mestre"
        icon={<Crown className="h-6 w-6" />}
        tone="amber"
        rules={masterRules}
      />

      <div className="mb-14 border-t border-amber-900/25" />

      <RulesGroup
        title="Guia do Jogador"
        icon={<Shield className="h-6 w-6" />}
        tone="rose"
        rules={playerRules}
      />

      <DownloadBook />
    </main>
  );
}
