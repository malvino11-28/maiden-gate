import Logo from "../Header/components/Logo";

import Container from "../Layout/Container";

import FooterColumn from "./components/FooterColumn";
import FooterLink from "./components/FooterLink";

export default function Footer() {
  return (
    <footer
      className="
        border-t
        border-orange-500/10

        bg-[#070B1F]
      "
    >
      <Container>
        <div
          className="
            grid
            gap-14

            py-20

            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {/* Logo */}

          <div className="space-y-6">
            <Logo />

            <p
              className="
                max-w-sm
                leading-8
                text-stone-400
              "
            >
              Voice Of Flower é um RPG medieval de fantasia focado em campanhas
              narrativas, exploração e um sistema único de Marcas.
            </p>
          </div>

          {/* Navegação */}

          <FooterColumn title="Suporte">
            <FooterLink to="/">Play VOF</FooterLink>

            <FooterLink to="/rules">Regras</FooterLink>

            <FooterLink to="/tools">Ferramentas</FooterLink>

            <FooterLink to="/contact">Contato</FooterLink>
          </FooterColumn>

          {/* Legal */}

          <FooterColumn title="Políticas">
            <FooterLink to="/privacy">Política de Privacidade</FooterLink>

            <FooterLink to="/terms">Termos de Uso</FooterLink>

            <FooterLink to="/cookies">Cookies</FooterLink>
          </FooterColumn>
        </div>

        <div
          className="
            border-t
            border-orange-500/10

            py-8

            text-center

            text-sm
            text-stone-500
          "
        >
          © 2026 Voice Of Flower: Awakening Of The Maiden. Todos os direitos
          reservados.
        </div>
      </Container>
    </footer>
  );
}
