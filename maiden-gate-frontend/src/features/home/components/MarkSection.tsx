import { useState } from "react";

import Container from "../../../shared/components/Layout/Container";
import Section from "../../../shared/components/Layout/Section";
import SectionTitle from "../../../shared/components/Typography/SectionTitle";
import SectionSubtitle from "../../../shared/components/Typography/SectionSubTitle";

import Badge from "./Badge";

const marks = [
  {
    id: 0,
    name: "Manifesto",
    color: "text-yellow-400",
    title: "Manifesto",
    description:
      "A ordem acima de tudo. Seus seguidores acreditam que somente através do controle absoluto é possível alcançar a paz.",
  },
  {
    id: 1,
    name: "Ocultos",
    color: "text-violet-400",
    title: "Ocultos",
    description:
      "Defendem a liberdade individual e acreditam que cada pessoa deve construir seu próprio destino.",
  },
  {
    id: 2,
    name: "Entoadora",
    color: "text-cyan-400",
    title: "Entoadora",
    description:
      "Marcas surgidas após a chegada dos seres cristalinos, concedendo habilidades únicas aos seus portadores.",
  },
  {
    id: 3,
    name: "Respiração",
    color: "text-emerald-400",
    title: "Respiração",
    description:
      "Uma técnica que fortalece corpo e mente, permitindo feitos extraordinários em combate.",
  },
  {
    id: 4,
    name: "Maso",
    color: "text-emerald-400",
    title: "Maso",
    description:
      "Uma técnica que fortalece corpo e mente, permitindo feitos extraordinários em combate.",
  },
];

export function MarksSection() {
  const [selected, setSelected] = useState(0);

  const current = marks[selected];

  return (
    <Section>
      <Container>
        <SectionTitle>As Marcas</SectionTitle>

        <SectionSubtitle>
          Cada personagem nasce com uma Marca que influencia sua história e seu
          modo de enfrentar o mundo.
        </SectionSubtitle>

        <div
          className="
          mt-12

          flex
          flex-wrap
          justify-center

          gap-4
        "
        >
          {marks.map((mark) => (
            <Badge
              key={mark.id}
              active={selected === mark.id}
              onClick={() => setSelected(mark.id)}
            >
              {mark.name}
            </Badge>
          ))}
        </div>

        <div
          className="
          mx-auto
          mt-12

          max-w-4xl

          rounded-3xl

          border
          border-white/10

          bg-[#0d1329]

          p-10

          text-center
        "
        >
          <h3
            className={`
            text-3xl
            font-bold

            ${current.color}
          `}
          >
            {current.title}
          </h3>

          <p
            className="
            mt-6

            leading-8

            text-stone-300
          "
          >
            {current.description}
          </p>
        </div>
      </Container>
    </Section>
  );
}
