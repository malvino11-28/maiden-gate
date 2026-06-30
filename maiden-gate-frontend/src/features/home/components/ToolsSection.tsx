import Container from "../../../shared/components/Layout/Container";
import Section from "../../../shared/components/Layout/Section";
import SectionTitle from "../../../shared/components/Typography/SectionTitle";
import SectionSubtitle from "../../../shared/components/Typography/SectionSubTitle";

import ToolCard from "./ToolCard";

const tools = [
  {
    title: "Campanhas",
    description:
      "Organize sessões, acompanhe jogadores e mantenha toda a história da campanha registrada.",
    image: "/images/tools/campaign.jpg",
  },
  {
    title: "Personagens",
    description:
      "Crie personagens completos com atributos, inventário, habilidades e evolução.",
    image: "/images/tools/character.jpg",
  },
  {
    title: "Elementos",
    description:
      "Cadastre NPCs, monstros, itens, eventos e localidades para enriquecer sua aventura.",
    image: "/images/tools/world.jpg",
  },
];

export default function ToolsSection() {
  return (
    <Section className="bg-[#050816]">
      <Container>
        <SectionTitle>Ferramentas Especiais</SectionTitle>

        <SectionSubtitle>
          Tudo o que mestres e jogadores precisam para administrar suas
          campanhas em um único lugar.
        </SectionSubtitle>

        <div
          className="
            mt-16

            grid

            gap-8

            lg:grid-cols-3
          "
        >
          {tools.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
