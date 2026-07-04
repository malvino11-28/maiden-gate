import type { ReactNode, ElementType } from "react";

type Props = {
  title: string;
  icon: ElementType;
  children: ReactNode;
  right?: ReactNode;
};

export default function CharacterSectionCard({ title, icon: Icon, children, right }: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border border-amber-900/30 bg-slate-900/40 shadow-xl shadow-black/30 backdrop-blur-sm">
      <div className="flex items-center gap-3 border-b border-amber-900/25 bg-gradient-to-r from-amber-900/20 to-transparent px-6 py-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-amber-500/25 bg-amber-500/15">
          <Icon className="h-3.5 w-3.5 text-amber-400" />
        </div>
        <h2 className="text-sm font-semibold tracking-wide text-amber-200">{title}</h2>
        {right && <div className="ml-auto">{right}</div>}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}
