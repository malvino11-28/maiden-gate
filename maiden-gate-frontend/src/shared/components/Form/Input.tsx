import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-amber-900/40 bg-slate-900/80 px-4 py-3 text-amber-100 placeholder:text-amber-100/25 outline-none transition-colors focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 ${className}`}
    />
  );
}
