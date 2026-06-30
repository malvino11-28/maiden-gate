import { Crown, Shield } from "lucide-react";

import Section from "../../../shared/components/Layout/Section";
import Container from "../../../shared/components/Layout/Container";

import RuleSection from "../components/RulesSection";
import RuleAccordion from "../../../shared/components/Accordion/RuleAccordion";
import DownloadBook from "../components/DownloadBook";

import { masterRules } from "../data/masterRules";
import { playerRules } from "../data/playerRules";

export default function RulesPage() {
  return (
    <>
      <Section>
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1
              className="
                text-5xl
                font-bold
                text-stone-100
              "
            >
              Regras do Jogo
            </h1>

            <p
              className="
                mt-6
                text-lg
                leading-8
                text-stone-400
              "
            >
              Aprenda rapidamente como funciona Voice Of Flower. Aqui você
              encontra um resumo das principais regras para mestres e jogadores.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-24">
          <RuleSection title="Para Mestres" icon={<Crown size={34} />}>
            {masterRules.map((rule, index) => (
              <RuleAccordion
                key={rule.title}
                title={rule.title}
                defaultOpen={index === 0}
              >
                {rule.content}
              </RuleAccordion>
            ))}
          </RuleSection>

          <RuleSection title="Para Jogadores" icon={<Shield size={34} />}>
            {playerRules.map((rule, index) => (
              <RuleAccordion
                key={rule.title}
                title={rule.title}
                defaultOpen={index === 0}
              >
                {rule.content}
              </RuleAccordion>
            ))}
          </RuleSection>
        </Container>
      </Section>

      <DownloadBook />
    </>
  );
}
