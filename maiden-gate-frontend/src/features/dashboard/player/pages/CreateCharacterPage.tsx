import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { CheckCircle2, Globe, Scroll, Sparkles, Swords } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CharacterPageShell from "../components/character/CharacterPageShell";
import CharacterSectionCard from "../components/character/CharacterSectionCard";
import CharacterImageUpload from "../components/character/CharacterImageUpload";
import CharacterBrandSelector from "../components/character/CharacterBrandSelector";
import CharacterAttributesPanel from "../components/character/CharacterAttributesPanel";

import { baseAttributeValue, campaignsForCharacter, extraPoints } from "../data/characterFormMock";
import type { AttributeKey, CharacterMark } from "../types/player";

type CharacterForm = {
  nome: string;
  sobrenome: string;
  campanha: string;
  origem: string;
  historia: string;
  marca: CharacterMark | "";
};

const initialAttributes: Record<AttributeKey, number> = {
  POD: baseAttributeValue,
  DES: baseAttributeValue,
  RES: baseAttributeValue,
  INT: baseAttributeValue,
  DET: baseAttributeValue,
  PRE: baseAttributeValue,
};

export default function CreateCharacterPage() {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<CharacterForm>({
    nome: "",
    sobrenome: "",
    campanha: "",
    origem: "",
    historia: "",
    marca: "",
  });
  const [attributes, setAttributes] = useState<Record<AttributeKey, number>>(initialAttributes);

  const spentPoints = Object.values(attributes).reduce((sum, value) => sum + value, 0) - Object.keys(initialAttributes).length * baseAttributeValue;
  const remainingPoints = extraPoints - spentPoints;

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaved(true);
    setTimeout(() => navigate("/dashboard/player"), 1200);
  }

  return (
    <CharacterPageShell
      title="Forje sua Identidade"
      subtitle="Cada traço desta ficha é uma promessa ao mundo que você vai habitar."
      badge="Criação de Personagem"
      submitLabel="Criar Personagem"
      savedLabel="Personagem criado!"
      saved={saved}
      formId="form-personagem"
    >
      <form id="form-personagem" onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        <CharacterSectionCard title="Identidade" icon={Scroll}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
            <CharacterImageUpload image={image} onChange={setImage} />

            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">Nome</label>
                  <input name="nome" value={form.nome} onChange={handleChange} placeholder="Ex: Lirien" className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all placeholder:text-amber-100/20 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20" />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">Sobrenome</label>
                  <input name="sobrenome" value={form.sobrenome} onChange={handleChange} placeholder="Ex: Respiração" className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all placeholder:text-amber-100/20 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20" />
                </div>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-amber-600/70">
                  <Globe className="h-3.5 w-3.5" /> Campanha
                </label>
                <select name="campanha" value={form.campanha} onChange={handleChange} className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20">
                  <option value="">Selecione uma campanha</option>
                  {campaignsForCharacter.map((campaign) => (
                    <option key={campaign.id} value={campaign.nome}>{campaign.nome}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">Origem</label>
                <input name="origem" value={form.origem} onChange={handleChange} placeholder="De onde seu personagem veio?" className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all placeholder:text-amber-100/20 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20" />
              </div>
            </div>
          </div>
        </CharacterSectionCard>

        <CharacterSectionCard title="Marca" icon={Sparkles}>
          <CharacterBrandSelector value={form.marca} onChange={(marca) => setForm((previous) => ({ ...previous, marca }))} />
        </CharacterSectionCard>

        <CharacterSectionCard title="História" icon={Scroll}>
          <label className="mb-3 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">O que moldou seu personagem?</label>
          <textarea name="historia" value={form.historia} onChange={handleChange} rows={5} placeholder="Escreva sobre a origem, motivações, perdas e sonhos que guiam este ser pelo mundo de VOF…" className="w-full resize-none rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm leading-relaxed text-amber-100 outline-none transition-all placeholder:text-amber-100/20 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20" />
        </CharacterSectionCard>

        <CharacterSectionCard
          title="Atributos"
          icon={Swords}
          right={
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-amber-100/40">Pontos disponíveis</span>
              <div className={`rounded-full border px-3 py-1 text-sm font-bold transition-all ${remainingPoints === 0 ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300" : remainingPoints <= 5 ? "border-amber-500/40 bg-amber-500/15 text-amber-300" : "border-amber-900/40 bg-slate-800 text-amber-200"}`}>
                {remainingPoints}<span className="text-[10px] font-normal opacity-60"> / {extraPoints}</span>
              </div>
            </div>
          }
        >
          <CharacterAttributesPanel attributes={attributes} onChange={setAttributes} />
        </CharacterSectionCard>

        <div className="flex flex-col items-center justify-between gap-4 pb-8 pt-2 sm:flex-row">
          <button type="button" onClick={() => navigate("/dashboard/player")} className="text-sm text-amber-100/35 transition-colors hover:text-amber-100/60">
            Cancelar e voltar
          </button>

          <button type="submit" disabled={saved} className={`flex items-center gap-2.5 rounded-xl px-8 py-3 text-base font-semibold shadow-lg transition-all ${saved ? "scale-95 bg-emerald-600/80 text-emerald-100 shadow-emerald-900/30" : "bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-amber-900/30 hover:scale-[1.02] hover:from-amber-400 hover:to-rose-500 hover:shadow-amber-800/40 active:scale-95"}`}>
            {saved ? <><CheckCircle2 className="h-5 w-5" /> Personagem criado com sucesso!</> : <><Sparkles className="h-5 w-5" /> Criar Personagem</>}
          </button>
        </div>
      </form>
    </CharacterPageShell>
  );
}
