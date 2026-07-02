const mockSkills = [
  "Ataque Pesado",
  "Bola de Fogo",
  "Cura",
  "Escudo Arcano",
  "Teleporte",
  "Golpe Sombrio",
];

type SkillSelectorProps = {
  selected: string[];
  onChange: (skills: string[]) => void;
};

export default function SkillSelector({
  selected,
  onChange,
}: SkillSelectorProps) {
  function toggleSkill(skill: string) {
    if (selected.includes(skill)) {
      onChange(selected.filter((s) => s !== skill));
      return;
    }

    onChange([...selected, skill]);
  }

  return (
    <div
      className="
        grid
        gap-3
        sm:grid-cols-2
      "
    >
      {mockSkills.map((skill) => (
        <label
          key={skill}
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-white/10
            bg-[#11162B]
            p-3
            cursor-pointer
          "
        >
          <input
            type="checkbox"
            checked={selected.includes(skill)}
            onChange={() => toggleSkill(skill)}
          />

          {skill}
        </label>
      ))}
    </div>
  );
}
