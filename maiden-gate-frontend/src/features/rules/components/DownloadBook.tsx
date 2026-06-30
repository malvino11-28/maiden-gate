import { Download } from "lucide-react";

import Section from "../../../shared/components/Layout/Section";
import Container from "../../../shared/components/Layout/Container";
import Button from "../../../shared/components/Button/Button";

export default function DownloadBook() {
  return (
    <Section>
      <Container>
        <div
          className="
            rounded-3xl
            border
            border-orange-500/20

            bg-gradient-to-r
            from-orange-500/10
            to-pink-500/10

            p-12

            text-center
          "
        >
          <h2
            className="
              text-4xl
              font-bold
              text-stone-100
            "
          >
            Livro Completo de Regras
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-3xl

              leading-8
              text-stone-400
            "
          >
            O guia completo reúne todas as regras, exemplos de campanha, criação
            de personagens, sistema de combate, bestiário e muito mais.
          </p>

          <div className="mt-10 flex justify-center">
            <Button>
              <Download size={20} />

              <span>Baixar PDF</span>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
