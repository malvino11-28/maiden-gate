import FooterLoginLinks from "./components/FooterLoginLinks";

export default function FooterLogin() {
  return (
    <footer
      className="
        border-t
        border-white/10
        bg-[#050816]
        px-6
        py-8
      "
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div>
          <p className="text-sm font-semibold text-stone-300">Maiden Gate</p>

          <p className="mt-1 text-xs text-stone-600">VOF</p>
        </div>

        <FooterLoginLinks />

        <p className="text-xs text-stone-600">© 2026 Maiden Gate.</p>
      </div>
    </footer>
  );
}
