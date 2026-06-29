import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>; // fazendo o componente aceitar tudo que um input pode ter

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`
                w-full
                rounded-2xl
                border
                borde-orange-500/20
                bg-slate-900/80
                px-5
                py-4
                text-stone-100
                placeholder:text-stone-500
                outline-none
                transition-all
                duration-200
                focus:border-amber-400
                focus:ring-2
                focus:ring-amber-500/20

                ${className}
                `}
    />
  );
}
