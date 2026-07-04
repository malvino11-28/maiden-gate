import { CheckCircle2, PenLine } from "lucide-react";
import { useState } from "react";

type Props = {
  initialNotes: string;
};

export default function NotesSection({ initialNotes }: Props) {
  const [notes, setNotes] = useState(initialNotes);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);

    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-100/50">
          <PenLine className="h-3.5 w-3.5 text-amber-400" />
          Notas Secretas do Mestre
        </p>

        {saved && (
          <span className="flex items-center gap-1 text-xs text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Salvo
          </span>
        )}
      </div>

      <textarea
        rows={10}
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Anote planos de sessão, reviravoltas, segredos, lembretes..."
        className="
          w-full
          resize-none
          rounded-xl
          border
          border-amber-900/30
          bg-slate-900/60
          px-4
          py-3
          text-sm
          leading-relaxed
          text-amber-100/80
          placeholder:text-amber-100/20
          outline-none
          transition
          focus:border-amber-500/50
          focus:ring-1
          focus:ring-amber-500/20
        "
      />

      <button
        onClick={handleSave}
        className="
          rounded-xl
          bg-gradient-to-r
          from-amber-500
          to-rose-600
          px-5
          py-2.5
          text-sm
          font-semibold
          text-white
          transition
          hover:from-amber-600
          hover:to-rose-700
        "
      >
        Salvar Notas
      </button>
    </div>
  );
}
