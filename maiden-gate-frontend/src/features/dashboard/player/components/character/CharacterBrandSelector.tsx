import { characterMarks } from "../../data/characterFormMock";
import type { CharacterMarkOption } from "../../types/player";

type Props = {
  value: string;
  marks?: CharacterMarkOption[];
  onChange: (mark: CharacterMarkOption) => void;
};

export default function CharacterBrandSelector({
  value,
  marks = characterMarks,
  onChange,
}: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {marks.map((mark) => {
        const optionValue = mark.id ? String(mark.id) : mark.value;
        const active = value === optionValue;

        return (
          <button
            key={optionValue}
            type="button"
            onClick={() => onChange(mark)}
            className={`rounded-xl border p-4 text-left shadow-lg transition-all ${
              active
                ? `${mark.ativo} shadow-lg`
                : `bg-slate-950/50 ${mark.borda} hover:bg-slate-900/70`
            }`}
          >
            <div
              className={`mb-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${mark.gradiente} text-2xl`}
            >
              {mark.image ? (
                <img
                  src={mark.image}
                  alt={mark.value}
                  className="h-full w-full object-cover"
                />
              ) : (
                mark.emoji
              )}
            </div>

            <p className={`text-sm font-semibold ${mark.texto}`}>
              {mark.value}
            </p>

            <p className="mt-1 text-xs leading-relaxed text-amber-100/35">
              {mark.descricao}
            </p>
          </button>
        );
      })}
    </div>
  );
}
