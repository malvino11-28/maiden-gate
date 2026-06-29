import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-orange-500
                to-amber-500
                px-6
                py-3
                font-semibold
                text-white
                shadow-lg
                shadow-orange-500/20
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:brightness-110

                
                active:scale-95

                focus:outline-none
                focus:ring-2
                focus:ring-orange-400
                focus:ring-offset-2
                focus:ring-offset-[#05071A]

                disabled:cursor-not-allowed
                
                disabled:opacity-50



                ${className}
            `}
    >
      {children}
    </button>
  );
}
