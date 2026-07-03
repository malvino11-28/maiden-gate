import { characterMarks } from "../../data/characterFormMock";
import type { CharacterMark } from "../../types/player";

type Props = {
  value: CharacterMark | "";
  onChange: (mark: CharacterMark) => void;
};

export default function CharacterBrandSelector({ value, onChange }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {characterMarks.map((mark) => {
        const active = value === mark.value;

        return (
          <button
            key={mark.value}
            type="button"
            onClick={() => onChange(mark.value)}
            className={`rounded-xl border p-4 text-left shadow-lg transition-all ${
              active ? `${mark.ativo} shadow-lg` : `bg-slate-950/50 ${mark.borda} hover:bg-slate-900/70`
            }`}
          >
            <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${mark.gradiente} text-2xl`}>
              {mark.emoji}
            </div>
            <p className={`text-sm font-semibold ${mark.texto}`}>{mark.value}</p>
            <p className="mt-1 text-xs leading-relaxed text-amber-100/35">{mark.descricao}</p>
          </button>
        );
      })}
    </div>
  );
}
