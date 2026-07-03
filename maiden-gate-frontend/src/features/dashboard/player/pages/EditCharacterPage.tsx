import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { CheckCircle2, Heart, Scroll, Shield, Sparkles, Swords, TreePine, Zap } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import CharacterPageShell from "../components/character/CharacterPageShell";
import CharacterSectionCard from "../components/character/CharacterSectionCard";
import CharacterImageUpload from "../components/character/CharacterImageUpload";
import CharacterBrandSelector from "../components/character/CharacterBrandSelector";
import CharacterAttributesPanel from "../components/character/CharacterAttributesPanel";
import CharacterSkillTreeModal from "../components/character/CharacterSkillTreeModal";

import { baseAttributeValue } from "../data/characterFormMock";
import { playerCampaignData } from "../data/playerCampaignMock";
import type { AttributeKey, CharacterMark, CharacterSkill } from "../types/player";

type CharacterForm = {
  nome: string;
  sobrenome: string;
  origem: string;
  historia: string;
  marca: CharacterMark | "";
};

function attributesToRecord(attributes: { nome: string; valor: number }[]): Record<AttributeKey, number> {
  const base: Record<AttributeKey, number> = {
    POD: baseAttributeValue,
    DES: baseAttributeValue,
    RES: baseAttributeValue,
    INT: baseAttributeValue,
    DET: baseAttributeValue,
    PRE: baseAttributeValue,
  };

  attributes.forEach((attribute) => {
    const key = attribute.nome as AttributeKey;
    if (key in base) {
      base[key] = attribute.valor;
    }
  });

  return base;
}

export default function EditCharacterPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const campaign = id === "2" ? playerCampaignData["2"] : playerCampaignData["1"];
  const character = campaign.personagem;

  const [image, setImage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [showSkillTree, setShowSkillTree] = useState(false);
  const [form, setForm] = useState<CharacterForm>({
    nome: character.nome,
    sobrenome: character.sobrenome,
    origem: character.origem ?? "",
    historia: character.historia ?? "",
    marca: character.marca,
  });
  const [attributes, setAttributes] = useState<Record<AttributeKey, number>>(
    attributesToRecord(character.atributos),
  );
  const [hp, setHp] = useState(character.hp);
  const [mp, setMp] = useState(character.mp);
  const [equippedSkills, setEquippedSkills] = useState<CharacterSkill[]>(character.habilidades);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  }

  function toggleSkill(skill: CharacterSkill) {
    const alreadyEquipped = equippedSkills.some((item) => item.nome === skill.nome);

    if (alreadyEquipped) {
      setEquippedSkills((previous) => previous.filter((item) => item.nome !== skill.nome));
      return;
    }

    if (equippedSkills.length >= 4) {
      return;
    }

    setEquippedSkills((previous) => [...previous, skill]);
  }

  return (
    <CharacterPageShell
      title="Editar Personagem"
      subtitle="Atualize sua ficha, revise atributos e prepare suas habilidades para a próxima sessão."
      badge={`Ficha #${id ?? character.id}`}
      submitLabel="Salvar Alterações"
      savedLabel="Alterações salvas!"
      saved={saved}
      formId="form-editar-personagem"
    >
      <form id="form-editar-personagem" onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        <CharacterSectionCard title="Identidade" icon={Scroll}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
            <CharacterImageUpload image={image} onChange={setImage} />

            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">Nome</label>
                  <input name="nome" value={form.nome} onChange={handleChange} className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20" />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">Sobrenome</label>
                  <input name="sobrenome" value={form.sobrenome} onChange={handleChange} className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">Origem</label>
                <input name="origem" value={form.origem} onChange={handleChange} className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20" />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-rose-900/25 bg-slate-950/50 p-4">
                  <p className="mb-1 flex items-center gap-1.5 text-xs text-amber-100/45"><Heart className="h-3.5 w-3.5 text-rose-400" /> HP Atual</p>
                  <input type="number" value={hp} onChange={(event) => setHp(Number.parseInt(event.target.value, 10) || 0)} className="w-full bg-transparent text-xl font-semibold text-amber-100 outline-none" />
                  <p className="text-xs text-amber-100/30">máx. {character.hpMax}</p>
                </div>

                <div className="rounded-xl border border-sky-900/25 bg-slate-950/50 p-4">
                  <p className="mb-1 flex items-center gap-1.5 text-xs text-amber-100/45"><Sparkles className="h-3.5 w-3.5 text-sky-400" /> Energia</p>
                  <input type="number" value={mp} onChange={(event) => setMp(Number.parseInt(event.target.value, 10) || 0)} className="w-full bg-transparent text-xl font-semibold text-amber-100 outline-none" />
                  <p className="text-xs text-amber-100/30">máx. {character.mpMax}</p>
                </div>

                <div className="rounded-xl border border-amber-900/25 bg-slate-950/50 p-4">
                  <p className="mb-1 flex items-center gap-1.5 text-xs text-amber-100/45"><Shield className="h-3.5 w-3.5 text-amber-400" /> Campanha</p>
                  <p className="text-sm font-semibold text-amber-100">{character.campanha}</p>
                  <p className="mt-1 text-xs text-amber-100/30">Nível {character.nivel}</p>
                </div>
              </div>
            </div>
          </div>
        </CharacterSectionCard>

        <CharacterSectionCard title="Marca" icon={Sparkles}>
          <CharacterBrandSelector value={form.marca} onChange={(marca) => setForm((previous) => ({ ...previous, marca }))} />
        </CharacterSectionCard>

        <CharacterSectionCard title="História" icon={Scroll}>
          <textarea name="historia" value={form.historia} onChange={handleChange} rows={5} className="w-full resize-none rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm leading-relaxed text-amber-100 outline-none transition-all placeholder:text-amber-100/20 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20" />
        </CharacterSectionCard>

        <CharacterSectionCard title="Atributos" icon={Swords}>
          <CharacterAttributesPanel attributes={attributes} onChange={setAttributes} />
        </CharacterSectionCard>

        <CharacterSectionCard
          title="Habilidades"
          icon={Zap}
          right={
            <button type="button" onClick={() => setShowSkillTree(true)} className="flex items-center gap-2 rounded-lg border border-amber-500/35 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-500/20">
              <TreePine className="h-3.5 w-3.5" /> Abrir Árvore
            </button>
          }
        >
          <div className="mb-4 flex items-center justify-between text-xs text-amber-100/40">
            <span>Habilidades equipadas</span>
            <span>{equippedSkills.length} / 4</span>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {character.habilidades.map((skill) => {
              const equipped = equippedSkills.some((item) => item.nome === skill.nome);

              return (
                <button key={skill.nome} type="button" onClick={() => toggleSkill(skill)} className={`rounded-xl border p-4 text-left transition-all ${equipped ? "border-amber-500/45 bg-amber-500/10" : "border-amber-900/25 bg-slate-950/50 hover:border-amber-700/40"}`}>
                  <div className="mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-400" />
                    <p className="font-semibold text-amber-100">{skill.nome}</p>
                    {equipped && <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-400" />}
                  </div>
                  <p className="text-xs leading-relaxed text-amber-100/50">{skill.descricao}</p>
                  <p className="mt-2 text-xs text-amber-100/35">Tipo: {skill.tipo}</p>
                </button>
              );
            })}
          </div>
        </CharacterSectionCard>

        <div className="flex flex-col items-center justify-between gap-4 pb-8 pt-2 sm:flex-row">
          <button type="button" onClick={() => navigate("/dashboard/player")} className="text-sm text-amber-100/35 transition-colors hover:text-amber-100/60">
            Cancelar e voltar
          </button>

          <button type="submit" disabled={saved} className={`flex items-center gap-2.5 rounded-xl px-8 py-3 text-base font-semibold shadow-lg transition-all ${saved ? "scale-95 bg-emerald-600/80 text-emerald-100 shadow-emerald-900/30" : "bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-amber-900/30 hover:scale-[1.02] hover:from-amber-400 hover:to-rose-500 hover:shadow-amber-800/40 active:scale-95"}`}>
            {saved ? <><CheckCircle2 className="h-5 w-5" /> Alterações salvas!</> : <><Sparkles className="h-5 w-5" /> Salvar Alterações</>}
          </button>
        </div>
      </form>

      {showSkillTree && <CharacterSkillTreeModal skills={character.habilidades} onClose={() => setShowSkillTree(false)} />}
    </CharacterPageShell>
  );
}
