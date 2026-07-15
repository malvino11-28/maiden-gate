type Element = {
  id: number;
  name: string;
  type: string;
  elementType?: string;
};

type ElementSelectProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  elements: Element[];
  isLoading?: boolean;
};

export default function ElementSelect({
  value,
  onChange,
  disabled = false,
  elements,
  isLoading = false,
}: ElementSelectProps) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full
        rounded-xl
        border
        border-orange-500/20
        bg-[#11162B]
        px-4
        py-3
        text-stone-200
        transition

        focus:border-orange-400
        focus:outline-none

        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      <option value="">
        {isLoading
          ? "— Carregando elementos... —"
          : disabled
            ? "— Selecione a origem primeiro —"
            : "— Selecione um elemento —"}
      </option>

      {elements.map((element) => (
        <option
          key={`${element.elementType ?? element.type}-${element.id}`}
          value={`${element.elementType ?? element.type}:${element.id}`}
        >
          {element.name} • {element.type}
        </option>
      ))}
    </select>
  );
}
