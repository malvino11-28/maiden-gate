import { Download, Clock } from "lucide-react";

import Section from "../../../shared/components/Layout/Section";
import Container from "../../../shared/components/Layout/Container";

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
            Livro de Voice of Flower
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
            O guia completo reunirá todas as regras, exemplos de campanha,
            criação de personagens, sistema de combate, bestiário e muito mais.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="rounded-2xl border border-amber-500/20 bg-slate-950/40 px-5 py-4">
              <div className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-amber-200">
                <Clock className="h-4 w-4" />
                Livro indisponível no momento
              </div>

              <button
                type="button"
                disabled
                className="
                mx-auto
                  justify-center
                  flex
                  cursor-not-allowed
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-orange-500/20
                  bg-orange-500/5
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-stone-500
                  opacity-70
                "
              >
                <Download size={20} />

                <span>Baixar PDF</span>
              </button>

              <p className="mt-3 max-w-sm text-xs leading-5 text-stone-500">
                O Livro VOF ainda está em desenvolvimento e será disponibilizado
                futuramente.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
