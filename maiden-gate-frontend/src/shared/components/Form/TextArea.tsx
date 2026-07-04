import type { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({ className = "", ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={`w-full resize-none rounded-lg border border-amber-900/40 bg-slate-900/80 px-4 py-3 text-amber-100 placeholder:text-amber-100/25 outline-none transition-colors focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 ${className}`}
    />
  );
}
