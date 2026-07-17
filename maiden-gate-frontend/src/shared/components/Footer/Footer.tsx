import Logo from "../Header/components/Logo";
import FooterColumn from "./components/FooterColumn";
import FooterLink from "./components/FooterLink";

export default function Footer() {
  return (
    <footer className="border-t border-amber-900/30 bg-black/45">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-sm text-sm leading-6 text-amber-100/55">
              Maiden-Gate conecta Mestres e Jogadores ao universo de Voice of
              Flower, uma fantasia sombria marcada pela Flor, pelo Miasma e por
              Marcas de poder.
            </p>
          </div>

          <FooterColumn title="Suporte">
            <FooterLink to="/">Play VOF</FooterLink>
            <FooterLink to="/rules">Regras</FooterLink>
            <FooterLink to="/tools">Ferramentas</FooterLink>
            <FooterLink to="/contact">Contato</FooterLink>
          </FooterColumn>

          <FooterColumn title="Políticas">
            <FooterLink to="/privacy">Política de Privacidade</FooterLink>
            <FooterLink to="/terms">Termos de Uso</FooterLink>
            <FooterLink to="/cookies">Cookies</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-10 border-t border-amber-900/25 pt-6 text-center text-sm text-amber-100/35">
          © 2026 Voice Of Flower: Awakening Of The Maiden. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}
