import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function SectionSubtitle({ children }: Props) {
  return (
    <p
      className="
        mx-auto
        mt-5
        max-w-3xl

        text-center
        text-lg
        leading-8
        text-stone-400
      "
    >
      {children}
    </p>
  );
}
