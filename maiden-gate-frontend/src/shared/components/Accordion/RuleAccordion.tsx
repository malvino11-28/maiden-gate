import { useState } from "react";
import { ChevronDown } from "lucide-react";

type RuleAccordionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function RuleAccordion({
  title,
  children,
  defaultOpen = false,
}: RuleAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className="
        border-b
        border-white/10
      "
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex
          w-full
          items-center
          justify-between

          py-6

          text-left
          font-semibold
          text-stone-100

          transition-colors
          hover:text-orange-400
        "
      >
        {title}

        <ChevronDown
          className={`
            h-5
            w-5
            transition-transform
            duration-300
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      <div
        className={`
          overflow-hidden
          transition-all
          duration-300

          ${isOpen ? "max-h-96 pb-6" : "max-h-0"}
        `}
      >
        <div
          className="
            text-stone-400
            leading-8
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}
