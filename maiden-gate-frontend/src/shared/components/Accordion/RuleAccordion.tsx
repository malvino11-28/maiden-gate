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
    <div className="border-b border-amber-900/25 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-amber-100/90 transition-colors hover:text-amber-400"
      >
        {title}
        <ChevronDown className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-5" : "max-h-0"}`}>
        <div className="leading-8 text-amber-100/60">{children}</div>
      </div>
    </div>
  );
}
