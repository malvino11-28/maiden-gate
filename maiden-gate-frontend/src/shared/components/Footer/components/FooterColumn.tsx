import type { ReactNode } from "react";

type FooterColumnProps = {
  title: string;
  children: ReactNode;
};

export default function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-amber-300/80">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
