import NavigationItem from "./NavigationItem";

type NavigationLink = {
  label: string;
  path: string;
};

type NavigationProps = {
  links: NavigationLink[];
};

export default function Navigation({ links }: NavigationProps) {
  return (
    <nav className="hidden items-center gap-6 lg:flex">
      {links.map((link) => (
        <NavigationItem key={link.path} label={link.label} href={link.path} />
      ))}
    </nav>
  );
}
