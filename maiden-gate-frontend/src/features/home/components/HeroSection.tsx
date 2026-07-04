import { Link } from "react-router-dom";

import vofamBG from "../../../assets/images/hero-bg.png";
import Container from "../../../shared/components/Layout/Container";
import Section from "../../../shared/components/Layout/Section";
import Button from "../../../shared/components/Button/Button";

export default function HeroSection() {
  return (
    <section
      className="
        relative

        flex
        min-h-screen
        items-center
        justify-center

        overflow-hidden
      "
    >
      {/* Background */}

      <img
        src={vofamBG}
        alt="Voice Of Flower"
        className="
          absolute
          inset-0

          h-full
          w-full

          object-cover
        "
      />

      {/* Overlay */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-b
          from-black/30
          via-[#08111f]/60 
          to-[#050816]
        "
      />

      <Container className="relative z-10">
        <Section className="py-0">
          <div
            className="
              mx-auto
              max-w-4xl

              text-center
            "
          >
            <h1
              className="
                text-5xl
                font-extrabold

                leading-tight

                text-white

                md:text-7xl
              "
            >
              Voice Of Flower
            </h1>

            <p
              className="
                mt-5

                text-2xl

                text-orange-300
              "
            >
              Awakening Of The Maiden
            </p>

            <p
              className="
                mx-auto
                mt-8

                max-w-2xl

                text-lg
                leading-8

                text-stone-300
              "
            >
              Descubra um universo de fantasia medieval onde cada personagem
              carrega uma Marca única. Construa campanhas, registre aventuras e
              viva histórias inesquecíveis com seus amigos.
            </p>

            <div
              className="
                mt-12

                flex
                flex-col
                justify-center
                gap-5

                sm:flex-row
              "
            >
              <Link to="/dashboard/player">
                <Button>Começar Jornada</Button>
              </Link>

              <Link to="/rules">
                <Button variant="outline">Explorar Regras</Button>
              </Link>
            </div>
          </div>
        </Section>
      </Container>
    </section>
  );
}
