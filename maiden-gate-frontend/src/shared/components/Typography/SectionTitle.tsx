import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function SectionTitle({ children }: Props) {
  return (
    <h2
      className="
        text-center
        text-4xl
        font-bold
        text-stone-100

        md:text-5xl
      "
    >
      {children}
    </h2>
  );
}
