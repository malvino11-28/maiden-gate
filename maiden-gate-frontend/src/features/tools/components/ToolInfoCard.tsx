import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type ToolInfoCardProps = {
  title: string;
  icon: React.ElementType;
  color: string;
  shortDescription: string;
  description: string;
  features: string[];
  status: string;
};

export default function ToolInfoCard({
  title,
  icon: Icon,
  color,
  shortDescription,
  description,
  features,
  status,
}: ToolInfoCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-xl border border-amber-900/30 bg-slate-900/50 p-6 transition-colors hover:border-amber-700/50">
      <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br ${color}`}>
        <Icon className="h-7 w-7 text-white" />
      </div>

      <h3 className="mb-3 text-xl font-semibold text-amber-100">{title}</h3>
      <p className="mb-6 min-h-14 text-sm leading-6 text-amber-100/60">
        {shortDescription}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-amber-500/45 py-2.5 text-sm font-semibold text-amber-300 transition-colors hover:bg-amber-500/10"
      >
        Ver informações
        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {expanded && (
        <div className="mt-6 border-t border-amber-900/25 pt-6">
          <p className="mb-5 text-sm leading-6 text-amber-100/60">{description}</p>

          <h4 className="mb-3 text-sm font-semibold text-amber-100">
            Funcionalidades
          </h4>

          <ul className="mb-6 space-y-2">
            {features.map((feature) => (
              <li key={feature} className="text-sm text-amber-100/50">
                • {feature}
              </li>
            ))}
          </ul>

          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
            {status}
          </span>
        </div>
      )}
    </article>
  );
}
