import type { ReactNode } from "react";

type ModalBodyProps = {
  children: ReactNode;
};

export default function ModalBody({ children }: ModalBodyProps) {
  return (
    <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-6">
      {children}
    </div>
  );
}
