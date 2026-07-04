import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement>;

export default function PasswordInput({ className = "", ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={showPassword ? "text" : "password"}
        className={`w-full rounded-lg border border-amber-900/40 bg-slate-900/80 px-4 py-3 pr-11 text-amber-100 placeholder:text-amber-100/25 outline-none transition-colors focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 ${className}`}
      />
      <button
        type="button"
        onClick={() => setShowPassword((value) => !value)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-100/40 transition-colors hover:text-amber-100/70"
        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}
