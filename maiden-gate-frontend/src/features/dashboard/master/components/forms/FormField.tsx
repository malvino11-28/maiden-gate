import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  required?: boolean;
  children: ReactNode;
};

export default function FormField({ label, required = false, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-amber-100/80">
        {label}
        {required && <span className="ml-1 text-rose-400">*</span>}
      </label>
      {children}
    </div>
  );
}
