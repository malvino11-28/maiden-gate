type Element = {
  id: number;
  name: string;
  type: string;
};

type ElementSelectProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  elements: Element[];
};

export default function ElementSelect({
  value,
  onChange,
  disabled = false,
  elements,
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
        {disabled
          ? "— Selecione a origem primeiro —"
          : "— Selecione um elemento —"}
      </option>

      {elements.map((element) => (
        <option key={element.id} value={element.id.toString()}>
          {element.name} • {element.type}
        </option>
      ))}
    </select>
  );
}
