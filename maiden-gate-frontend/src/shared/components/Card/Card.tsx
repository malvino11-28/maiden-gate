import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-white/10

        bg-[#0f1833]

        transition-all
        duration-300

        hover:-translate-y-2
        hover:border-orange-400/40

        ${className}
      `}
    >
      {children}
    </div>
  );
}
