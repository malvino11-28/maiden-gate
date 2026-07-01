import type { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({ className = "", ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={`
        w-full
        rounded-2xl
        border
        border-orange-500/20
        bg-[#11162B]
        px-4
        py-3

        text-stone-200
        placeholder:text-stone-500

        outline-none

        transition

        focus:border-orange-400
        focus:ring-2
        focus:ring-orange-500/20

        resize-none

        ${className}
      `}
    />
  );
}
