import { X, Zap } from "lucide-react";

import type { CharacterSkill } from "../../types/player";

type Props = {
  skills: CharacterSkill[];
  onClose: () => void;
};

export default function CharacterSkillTreeModal({ skills, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={(event) => event.currentTarget === event.target && onClose()}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-amber-900/40 bg-slate-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-amber-900/30 bg-gradient-to-r from-amber-900/40 to-rose-900/40 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-amber-100">Árvore de Habilidades</h2>
            <p className="mt-1 text-xs text-amber-100/40">Visualização mockada para o MVP.</p>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-amber-100/50 transition hover:bg-amber-900/30 hover:text-amber-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-2">
          {skills.map((skill, index) => (
            <article key={skill.nome} className="relative rounded-xl border border-amber-900/25 bg-slate-900/60 p-4">
              <span className="absolute right-3 top-3 rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-300">
                Nível {index + 1}
              </span>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Zap className="h-5 w-5 text-amber-400" />
              </div>
              <h3 className="font-semibold text-amber-100">{skill.nome}</h3>
              <p className="mt-2 text-sm leading-relaxed text-amber-100/55">{skill.descricao}</p>
              <p className="mt-3 text-xs text-amber-100/35">Tipo: {skill.tipo}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
