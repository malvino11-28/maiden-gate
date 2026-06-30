import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "gradient" | "outline" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export default function Button({
  children,
  variant = "gradient",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    gradient: `
      bg-gradient-to-r
      from-orange-500
      via-orange-500
      to-pink-600

      text-white

      hover:brightness-110
      hover:scale-[1.02]
    `,

    outline: `
      border
      border-orange-400

      bg-white

      text-orange-500

      hover:bg-orange-50
    `,

    ghost: `
      bg-transparent

      text-stone-300

      hover:bg-white/5
      hover:text-white
    `,
  };

  return (
    <button
      {...props}
      className={`
        inline-flex
        items-center
        justify-center

        rounded-xl

        px-7
        py-3

        font-semibold

        transition-all
        duration-300

        active:scale-95

        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
