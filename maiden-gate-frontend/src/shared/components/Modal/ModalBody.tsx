import type { ReactNode } from "react";

type ModalBodyProps = {
  children: ReactNode;
};

export default function ModalBody({ children }: ModalBodyProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-6

        px-8
        py-8
      "
    >
      {children}
    </div>
  );
}
