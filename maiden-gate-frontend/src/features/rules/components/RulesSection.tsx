import type { ReactNode } from "react";

type RuleSectionProps = {
  title: string;
  icon: ReactNode;
  children: React.ReactNode;
};

export default function RuleSection({
  title,
  icon,
  children,
}: RuleSectionProps) {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="text-orange-400">{icon}</div>

        <h2
          className="
            text-3xl
            font-bold
            text-stone-100
          "
        >
          {title}
        </h2>
      </div>

      <div
        className="
          rounded-3xl
          border
          border-white/10

          bg-[#0E1430]

          p-8
        "
      >
        {children}
      </div>
    </section>
  );
}
