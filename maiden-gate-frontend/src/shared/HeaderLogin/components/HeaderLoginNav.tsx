import { NavLink } from "react-router-dom";

type HeaderLoginNavProps = {
  role: "master" | "player";
};

export default function HeaderLoginNav({ role }: HeaderLoginNavProps) {
  const dashboardPath =
    role === "master" ? "/dashboard/master" : "/dashboard/player";

  const dashboardLabel =
    role === "master" ? "Painel do Mestre" : "Painel do Jogador";

  const links = [
    {
      label: dashboardLabel,
      path: dashboardPath,
    },
    {
      label: "Regras",
      path: "/rules",
    },
    {
      label: "Ferramentas",
      path: "/tools",
    },
  ];

  return (
    <nav className="hidden items-center gap-2 lg:flex">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `
              rounded-xl
              px-4
              py-2
              text-sm
              font-medium
              transition

              ${
                isActive
                  ? "bg-amber-500/15 text-amber-300"
                  : "text-stone-400 hover:bg-white/5 hover:text-white"
              }
            `
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
