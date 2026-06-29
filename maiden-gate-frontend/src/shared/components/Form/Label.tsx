import type { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({
  children,
  className = "",
  ...props
}: LabelProps) {
  return (
    <label
      {...props}
      className={`
                block
                text-sm
                font-medium
                text-stone-200
                mb-2
                ${className}
            `}
    >
      {children}
    </label>
  );
}
