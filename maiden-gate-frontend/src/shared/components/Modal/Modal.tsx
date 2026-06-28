// renderizar o overlay, centralizar, receber conteúdo e abrir/fechar
import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/70
                backdrop-blur-sm
                px-4
            "
      onClick={onClose}
    >
      <div
        className="
                    w-full
                    max-w-lg
                    overflow-hidden
                    rounded-3xl
                    border
                    border-orange-500/20
                    bg-[#05071A]
                    shadow-2xl

                    animate-in
                    fade-in
                    zoom-in-95
                    duration-200
                "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
