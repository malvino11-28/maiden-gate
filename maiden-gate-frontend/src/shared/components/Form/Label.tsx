import type { LabelHTMLAttributes, ReactNode } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
};

export default function Label({ children, className = "", ...props }: LabelProps) {
  return (
    <label {...props} className={`mb-1.5 block text-sm font-medium text-amber-100/80 ${className}`}>
      {children}
    </label>
  );
}
