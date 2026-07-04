import type { ReactNode } from "react";

type ModalFooterProps = {
  children: ReactNode;
};

export default function ModalFooter({ children }: ModalFooterProps) {
  return (
    <footer className="flex shrink-0 justify-end gap-3 border-t border-amber-900/25 px-6 py-3">
      {children}
    </footer>
  );
}
