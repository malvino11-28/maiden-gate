import NavigationItem from "./NavigationItem";

const navigationItems = [
  { label: "Play VOF", href: "/" },
  { label: "Rules", href: "/rules" },
  { label: "Tools", href: "/tools" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  return (
    <nav className="hidden items-center gap-8 md:flex">
      {navigationItems.map((item) => (
        <NavigationItem key={item.href} label={item.label} href={item.href} />
      ))}
    </nav>
  );
}
