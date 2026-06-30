import { Link } from "react-router-dom";

type FooterLinkProps = {
  to: string;
  children: React.ReactNode;
};

export default function FooterLink({ to, children }: FooterLinkProps) {
  return (
    <Link
      to={to}
      className="
        text-stone-400
        transition-colors
        duration-300

        hover:text-orange-400
      "
    >
      {children}
    </Link>
  );
}
