import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-rose-600 px-5 py-3 font-semibold text-white shadow-lg shadow-amber-950/25 transition-all hover:from-amber-600 hover:to-rose-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
