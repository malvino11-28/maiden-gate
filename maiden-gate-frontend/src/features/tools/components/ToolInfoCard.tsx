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
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-[#11162B]
        p-8
        transition-all
        duration-300
      "
    >
      <div
        className={`
          mb-6
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          ${color}
        `}
      >
        <Icon className="h-8 w-8 text-white" />
      </div>

      <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>

      <p className="mb-6 text-stone-300">{shortDescription}</p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-orange-500
          py-3
          font-semibold
          text-orange-400
          transition
          hover:bg-orange-500/10
        "
      >
        Ver informações
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </button>

      {expanded && (
        <div
          className="
            mt-6
            border-t
            border-white/10
            pt-6
          "
        >
          <p className="mb-5 text-stone-300">{description}</p>

          <h4 className="mb-3 font-semibold text-white">Funcionalidades</h4>

          <ul className="mb-6 space-y-2">
            {features.map((feature) => (
              <li key={feature} className="text-sm text-stone-400">
                • {feature}
              </li>
            ))}
          </ul>

          <span
            className="
              rounded-full
              bg-orange-500/20
              px-4
              py-2
              text-sm
              text-orange-300
            "
          >
            {status}
          </span>
        </div>
      )}
    </div>
  );
}
