import type { ReactNode } from "react";

type ModalFooterProps = {
  children: ReactNode;
};

export default function ModalFooter({ children }: ModalFooterProps) {
  return (
    <footer
      className="
        flex
        justify-end
        gap-4

        border-t
        border-white/10

        px-8
        py-6
      "
    >
      {children}
    </footer>
  );
}
