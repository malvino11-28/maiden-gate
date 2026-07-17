import { NavLink } from "react-router-dom";

type HeaderLoginNavProps = {
  role: "master" | "player";
};

export default function HeaderLoginNav({ role }: HeaderLoginNavProps) {
  const dashboardPath =
    role === "master" ? "/dashboard/master" : "/dashboard/player";

  const rulesPath =
    role === "master" ? "/dashboard/master/rules" : "/dashboard/player/rules";

  const dashboardLabel =
    role === "master" ? "Painel do Mestre" : "Painel do Jogador";

  const links = [
    {
      label: dashboardLabel,
      path: dashboardPath,
      end: true,
    },
    {
      label: "Regras",
      path: rulesPath,
      end: true,
    },
  ];

  return (
    <nav className="hidden items-center gap-2 lg:flex">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          end={link.end}
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
