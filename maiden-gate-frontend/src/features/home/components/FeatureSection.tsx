import { Sword, BookOpen, Users } from "lucide-react";

import Container from "../../../shared/components/Layout/Container";
import Section from "../../../shared/components/Layout/Section";
import SectionTitle from "../../../shared/components/Typography/SectionTitle";
import SectionSubtitle from "../../../shared/components/Typography/SectionSubTitle";

import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: <Sword size={48} />,
    title: "Combate Estratégico",
    description:
      "Enfrente criaturas, utilize habilidades e desenvolva estratégias em batalhas dinâmicas.",
  },
  {
    icon: <BookOpen size={48} />,
    title: "Lore Original",
    description:
      "Explore o universo de Voice of Flower, descubra as Marcas e participe de histórias únicas.",
  },
  {
    icon: <Users size={48} />,
    title: "Campanhas Online",
    description:
      "Gerencie campanhas, personagens, inventários e acompanhe toda a evolução da aventura.",
  },
];

export default function FeaturesSection() {
  return (
    <Section className="bg-[#050816]">
      <Container>
        <SectionTitle>Um Mundo de Possibilidades</SectionTitle>

        <SectionSubtitle>
          Voice of Flower oferece ferramentas completas para mestres e
          jogadores, reunindo criação de personagens, gerenciamento de campanhas
          e uma rica experiência narrativa em um único lugar.
        </SectionSubtitle>

        <div
          className="
            mt-16

            grid

            gap-8

            md:grid-cols-2

            xl:grid-cols-3
          "
        >
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
