const fields = [
  ["level", "Nível"],
  ["hp", "HP"],
  ["mana", "Energia"],
  ["atk", "ATQ"],
  ["def", "DEF"],
  ["speed", "Velocidade"],
] as const;

type Status = {
  level: number;
  hp: number;
  mana: number;
  atk: number;
  def: number;
  speed: number;
};

type StatusEditorProps = {
  value: Status;
  onChange: (status: Status) => void;
};

export default function StatusEditor({ value, onChange }: StatusEditorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map(([key, label]) => (
        <div key={key}>
          <label className="mb-2 block text-sm text-stone-300">{label}</label>

          <input
            type="number"
            value={value[key]}
            onChange={(e) =>
              onChange({
                ...value,
                [key]: Number(e.target.value),
              })
            }
            className="
          w-full
          rounded-xl
          border
          border-orange-500/20
          bg-[#11162B]
          px-3
          py-2
          text-white
        "
          />
        </div>
      ))}
    </div>
  );
}
