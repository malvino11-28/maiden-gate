import NavigationItem from "./NavigationItem";

const navigationItems = [
  {
    label: "Play VOF",
    href: "/vof",
  },
  {
    label: "Rules",
    href: "/rules",
  },
  {
    label: "Tools",
    href: "/tools",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navigation() {
  return (
    <nav
      className="
                hidden
                items-center
                gap-10

                lg:flex
            "
    >
      {navigationItems.map(
        (
          item, // mapeando todos os itens do array e atribuindo ao componente NavigationItem
        ) => (
          <NavigationItem key={item.href} label={item.label} href={item.href} />
        ),
      )}
    </nav>
  );
}
