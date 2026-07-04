import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "gradient" | "outline" | "ghost" | "danger";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function Button({
  children,
  variant = "gradient",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    gradient:
      "bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-lg shadow-amber-950/25 hover:from-amber-600 hover:to-rose-700",
    outline:
      "border border-amber-500/45 bg-transparent text-amber-300 hover:bg-amber-500/10 hover:text-amber-200",
    ghost:
      "bg-transparent text-amber-100/65 hover:bg-amber-900/25 hover:text-amber-100",
    danger:
      "border border-rose-500/35 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 hover:text-rose-200",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
