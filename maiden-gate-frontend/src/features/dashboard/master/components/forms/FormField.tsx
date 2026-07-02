import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  required?: boolean;
  children: ReactNode;
};

export default function FormField({
  label,
  required = false,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block font-medium text-stone-200">
        {label}

        {required && <span className="ml-1 text-red-400">*</span>}
      </label>

      {children}
    </div>
  );
}
