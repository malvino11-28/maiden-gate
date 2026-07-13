import { Plus, X } from "lucide-react";
import { useState } from "react";

type SkillSelectorProps = {
  selected: string[];
  onChange: (skills: string[]) => void;
};

export default function SkillSelector({
  selected,
  onChange,
}: SkillSelectorProps) {
  const [skillText, setSkillText] = useState("");

  function addSkill() {
    const trimmedSkill = skillText.trim();

    if (!trimmedSkill) return;

    onChange([...selected, trimmedSkill]);
    setSkillText("");
  }

  function removeSkill(skillIndex: number) {
    onChange(selected.filter((_, index) => index !== skillIndex));
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={skillText}
          onChange={(event) => setSkillText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addSkill();
            }
          }}
          placeholder="Ex: Bola de Fogo -> Causa dano de fogo com chance de queimadura"
          className="
            w-full
            rounded-xl
            border
            border-orange-500/20
            bg-[#11162B]
            px-4
            py-3
            text-sm
            text-stone-200
            placeholder:text-stone-500
            focus:border-orange-400
            focus:outline-none
          "
        />

        <button
          type="button"
          onClick={addSkill}
          className="
            flex
            items-center
            gap-1.5
            rounded-xl
            border
            border-amber-500/30
            bg-amber-500/10
            px-4
            py-3
            text-sm
            font-semibold
            text-amber-300
            transition
            hover:bg-amber-500/20
          "
        >
          <Plus className="h-4 w-4" />
          Adicionar
        </button>
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 rounded-xl border border-amber-900/20 bg-slate-950/40 p-3">
          {selected.map((skill, index) => (
            <div
              key={`${skill}-${index}`}
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-amber-500/30
                bg-amber-500/10
                px-3
                py-1.5
                text-xs
                text-amber-100
              "
            >
              <span>{skill}</span>

              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="text-amber-100/45 transition hover:text-rose-300"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
