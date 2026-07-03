import type { ReactNode } from "react";

type ModalBodyProps = {
  children: ReactNode;
};

export default function ModalBody({ children }: ModalBodyProps) {
  return <div className="space-y-5 px-6 py-6">{children}</div>;
}
