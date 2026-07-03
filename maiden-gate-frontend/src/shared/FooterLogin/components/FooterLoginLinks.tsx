import { Link } from "react-router-dom";

export default function FooterLoginLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
      <Link
        to="/rules"
        className="text-stone-500 transition hover:text-amber-300"
      >
        Regras
      </Link>

      <span className="text-stone-700">•</span>

      <Link
        to="/tools"
        className="text-stone-500 transition hover:text-amber-300"
      >
        Ferramentas
      </Link>

      <span className="text-stone-700">•</span>

      <Link
        to="/contact"
        className="text-stone-500 transition hover:text-amber-300"
      >
        Suporte
      </Link>
    </div>
  );
}
