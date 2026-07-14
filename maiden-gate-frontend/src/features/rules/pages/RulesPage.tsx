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
        Regras do Jogo
      </h1>
      <p className="mb-16 text-lg leading-8 text-amber-100/70">
        Aprenda tudo sobre o sistema de Voice Of Flower. Aqui você encontra um
        resumo das principais regras para mestres e jogadores; o livro completo
        reúne todos os detalhes para campanha.
      </p>

      <RulesGroup
        title="Para Mestres"
        icon={<Crown className="h-6 w-6" />}
        tone="amber"
        rules={masterRules}
      />

      <div className="mb-14 border-t border-amber-900/25" />

      <RulesGroup
        title="Para Jogadores"
        icon={<Shield className="h-6 w-6" />}
        tone="rose"
        rules={playerRules}
      />

      <DownloadBook />
    </main>
  );
}
