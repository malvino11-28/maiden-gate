import { Link } from "react-router-dom";

import Container from "../../../shared/components/Layout/Container";
import Section from "../../../shared/components/Layout/Section";
import Button from "../../../shared/components/Button/Button";

export default function CTASection() {
  return (
    <Section>
      <Container>
        <div
          className="
            relative
            overflow-hidden

            rounded-[2rem]

            border
            border-orange-500/20

            bg-gradient-to-r
            from-orange-500
            via-orange-500
            to-pink-600

            px-8
            py-20

            text-center
          "
        >
          {/* Brilho de fundo */}

          <div
            className="
              absolute

              -left-20
              -top-20

              h-72
              w-72

              rounded-full

              bg-white/20

              blur-3xl
            "
          />

          <div
            className="
              absolute

              -bottom-20
              -right-20

              h-80
              w-80

              rounded-full

              bg-yellow-300/20

              blur-3xl
            "
          />

          {/* Conteúdo */}

          <div className="relative z-10">
            <h2
              className="
                text-4xl
                font-bold

                text-white

                md:text-5xl
              "
            >
              Sua próxima aventura começa agora.
            </h2>

            <p
              className="
                mx-auto
                mt-6

                max-w-3xl

                text-lg
                leading-8

                text-orange-100
              "
            >
              Crie sua conta gratuitamente, monte personagens, participe de
              campanhas e explore o universo de Voice of Flower ao lado dos seus
              amigos.
            </p>

            <div
              className="
                mt-10

                flex
                flex-col
                justify-center

                gap-4

                sm:flex-row
              "
            >
              <Button
                className="
                  bg-white

                  text-orange-500

                  hover:bg-orange-50
                "
              >
                Criar Conta
              </Button>

              <Link to="/rules">
                <Button
                  variant="ghost"
                  className="
                    border
                    border-white/30

                    text-white

                    hover:bg-white/10
                  "
                >
                  Ler as Regras
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
