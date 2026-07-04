import { NavLink } from "react-router-dom";

type NavigationItemProps = {
  label: string;
  href: string;
};

export default function NavigationItem({ label, href }: NavigationItemProps) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `relative text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-amber-400 after:transition-all ${
          isActive
            ? "text-amber-300 after:w-full"
            : "text-amber-100/70 after:w-0 hover:text-amber-100 hover:after:w-full"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
