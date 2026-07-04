import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type FooterLinkProps = {
  to: string;
  children: ReactNode;
};

export default function FooterLink({ to, children }: FooterLinkProps) {
  return (
    <Link
      to={to}
      className="block text-sm text-amber-100/50 transition-colors hover:text-amber-300"
    >
      {children}
    </Link>
  );
}
