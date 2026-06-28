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
        isActive
          ? "text-amber-400 relative font-medium transition-colors duration-200"
          : "text-stone-300 hover:text-white relative font-medium transition-colors duration-200"
      }
    >
      {label}
    </NavLink>
  );
}
