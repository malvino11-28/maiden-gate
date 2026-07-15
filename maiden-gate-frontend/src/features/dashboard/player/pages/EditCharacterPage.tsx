import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  AlertCircle,
  CheckCircle2,
  GitBranch,
  Heart,
  Loader2,
  LockKeyhole,
  Scroll,
  Shield,
  Sparkles,
  Swords,
  Trash2,
  TreePine,
  Zap,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import CharacterPageShell from "../components/character/CharacterPageShell";
import CharacterSectionCard from "../components/character/CharacterSectionCard";
import CharacterImageUpload from "../components/character/CharacterImageUpload";
import CharacterAttributesPanel from "../components/character/CharacterAttributesPanel";
import SkillTreeModal from "../components/character/SkillTreeModal";
import CharacterBattleResources from "../components/character/CharacterBattleResources";

import {
  extraPoints,
  getMinimumAttributesByMark,
} from "../data/characterFormMock";

import {
  deleteCharacter,
  getCharacterById,
  getSkillsByMark,
  updateCharacter,
  type EditableCharacterData,
} from "../../services/characterCreationService";

import type { AttributeKey, CharacterSkill } from "../types/player";
import type { SkillTree } from "../data/skillTreeMock";

type CharacterForm = {
  nome: string;
  sobrenome: string;
  origem: string;
  historia: string;
};

const emptyAttributes: Record<AttributeKey, number> = {
  POD: 0,
  DES: 0,
  RES: 0,
  INT: 0,
  DET: 0,
  PRE: 0,
};

function getSkillType(type?: string | null): CharacterSkill["tipo"] {
  if (type === "passiva") return "Passiva";
  if (type === "reacao" || type === "reação") return "Reação";
  return "Ativa";
}

function flattenSkillTree(tree: SkillTree): CharacterSkill[] {
  return Object.values(tree)
    .flat()
    .map((skill) => ({
      id: String(skill.id),
      nome: skill.nome,
      descricao: skill.descricao,
      tipo: getSkillType(skill.tipo),
    }));
}

function getTotalAttributePointLimit(level: number) {
  const safeLevel = Math.max(level, 1);
  const levelsAfterFirst = safeLevel - 1;
  const doublePointLevels = Math.min(levelsAfterFirst, 24);
  const singlePointLevels = Math.max(levelsAfterFirst - 24, 0);

  return extraPoints + doublePointLevels * 2 + singlePointLevels;
}

function getSpentAttributePoints(
  currentAttributes: Record<AttributeKey, number>,
  baseAttributes: Record<AttributeKey, number>,
) {
  return Object.entries(currentAttributes).reduce((sum, [key, value]) => {
    const attributeKey = key as AttributeKey;
    return sum + Math.max(value - baseAttributes[attributeKey], 0);
  }, 0);
}

export default function EditCharacterPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [character, setCharacter] = useState<EditableCharacterData | null>(
    null,
  );
  const [form, setForm] = useState<CharacterForm>({
    nome: "",
    sobrenome: "",
    origem: "",
    historia: "",
  });
  const [attributes, setAttributes] =
    useState<Record<AttributeKey, number>>(emptyAttributes);
  const [hp, setHp] = useState(0);
  const [iconImage, setIconImage] = useState<File | null>(null);
  const [fullImage, setFullImage] = useState<File | null>(null);
  const [existingIconImage, setExistingIconImage] = useState<string | null>(
    null,
  );
  const [existingFullImage, setExistingFullImage] = useState<string | null>(
    null,
  );
  const [availableSkills, setAvailableSkills] = useState<CharacterSkill[]>([]);
  const [equippedSkillIds, setEquippedSkillIds] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [showSkillTree, setShowSkillTree] = useState(false);

  useEffect(() => {
    if (!id) return;

    let active = true;

    async function loadCharacter() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getCharacterById(id);
        let skills = data.habilidades;

        if (data.marcaId) {
          try {
            const tree = await getSkillsByMark(data.marcaId, data.campaignId);
            skills = flattenSkillTree(tree);
          } catch {
            skills = data.habilidades;
          }
        }

        if (!active) return;

        setCharacter(data);
        setForm({
          nome: data.nome,
          sobrenome: data.sobrenome,
          origem: data.origem,
          historia: data.historia,
        });
        setAttributes(data.attributes);
        setHp(data.hp);
        setExistingIconImage(data.iconImage);
        setExistingFullImage(data.fullImage);
        setEquippedSkillIds(data.equippedSkillIds);
        setAvailableSkills(skills);
      } catch {
        if (active) {
          setError("Não foi possível carregar este personagem.");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadCharacter();

    return () => {
      active = false;
    };
  }, [id]);

  const baseAttributesByMark = getMinimumAttributesByMark(
    character?.marca ?? "",
  );
  const minimumAttributes = character?.attributes ?? baseAttributesByMark;
  const attributePointLimit = character
    ? Math.max(
        getTotalAttributePointLimit(character.nivel) -
          getSpentAttributePoints(character.attributes, baseAttributesByMark),
        0,
      )
    : extraPoints;

  const equippedSkills = useMemo(() => {
    const source =
      availableSkills.length > 0
        ? availableSkills
        : (character?.habilidades ?? []);

    return source.filter(
      (skill) => skill.id && equippedSkillIds.includes(String(skill.id)),
    );
  }, [availableSkills, character, equippedSkillIds]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!id || !character) return;

    try {
      setIsSaving(true);
      setError(null);

      const updated = await updateCharacter(id, {
        nome: form.nome.trim(),
        sobrenome: form.sobrenome.trim(),
        origem: form.origem.trim(),
        historia: form.historia.trim(),
        iconImage,
        fullImage,
        hpCurrent: hp,
        attributes,
        equippedSkillIds,
      });

      setCharacter(updated);
      setAttributes(updated.attributes);
      setExistingIconImage(updated.iconImage);
      setExistingFullImage(updated.fullImage);
      setIconImage(null);
      setFullImage(null);
      setHp(updated.hp);
      setEquippedSkillIds(updated.equippedSkillIds);
      setSaved(true);
      setTimeout(() => setSaved(false), 1200);
    } catch {
      setError("Não foi possível salvar as alterações do personagem.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteCharacter() {
    if (!id || !character || isDeleting) return;

    const confirmed = window.confirm(
      `Tem certeza que deseja excluir ${character.nome}? Esta ação não pode ser desfeita.`,
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);
      setError(null);

      await deleteCharacter(id);

      navigate("/dashboard/player", { replace: true });
    } catch {
      setError("Não foi possível excluir este personagem.");
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return (
      <CharacterPageShell
        title="Editar Personagem"
        subtitle="Carregando ficha do personagem."
        badge="Ficha"
        submitLabel="Salvar Alterações"
        savedLabel="Alterações salvas!"
        saved={false}
        formId="form-editar-personagem"
      >
        <div className="flex min-h-[420px] items-center justify-center px-6 py-8">
          <div className="flex items-center gap-3 rounded-2xl border border-amber-900/25 bg-slate-900/60 px-5 py-4 text-amber-100/60">
            <Loader2 className="h-5 w-5 animate-spin text-amber-400" />
            Carregando personagem...
          </div>
        </div>
      </CharacterPageShell>
    );
  }

  if (!character) {
    return (
      <CharacterPageShell
        title="Editar Personagem"
        subtitle="Não foi possível abrir esta ficha."
        badge="Erro"
        submitLabel="Salvar Alterações"
        savedLabel="Alterações salvas!"
        saved={false}
        formId="form-editar-personagem"
      >
        <div className="mx-auto max-w-xl px-6 py-8">
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-center text-rose-200">
            <AlertCircle className="mx-auto mb-3 h-8 w-8" />
            {error ?? "Personagem não encontrado."}
          </div>
        </div>
      </CharacterPageShell>
    );
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
      <form
        id="form-editar-personagem"
        onSubmit={handleSubmit}
        className="mx-auto max-w-5xl space-y-6 px-6 py-8"
      >
        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <CharacterSectionCard title="Identidade" icon={Scroll}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[390px_1fr]">
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-7 mx-2 lg:mx-6 lg:mt-12.5">
                <CharacterImageUpload
                  image={iconImage ?? existingIconImage}
                  onChange={setIconImage}
                  label="Imagem do Ícone"
                  helper="Imagem pequena do card"
                  aspectClassName="aspect-square"
                />
              </div>
              <CharacterImageUpload
                image={fullImage ?? existingFullImage}
                onChange={setFullImage}
                label="Imagem"
                helper="Corpo inteiro / retrato"
              />
            </div>

            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">
                    Nome
                  </label>
                  <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">
                    Sobrenome
                  </label>
                  <input
                    name="sobrenome"
                    value={form.sobrenome}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">
                  Origem
                </label>
                <input
                  name="origem"
                  value={form.origem}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-rose-900/25 bg-slate-950/50 p-4">
                  <p className="mb-1 flex items-center gap-1.5 text-xs text-amber-100/45">
                    <Heart className="h-3.5 w-3.5 text-rose-400" /> HP Atual
                  </p>
                  <input
                    type="number"
                    value={hp}
                    onChange={(event) =>
                      setHp(Number.parseInt(event.target.value, 10) || 0)
                    }
                    className="w-full bg-transparent text-xl font-semibold text-amber-100 outline-none"
                  />
                  <p className="text-xs text-amber-100/30">
                    máx. {character.hpMax}
                  </p>
                </div>

                <CharacterBattleResources
                  paMax={character.paMax}
                  prMax={character.prMax}
                />

                <div className="rounded-xl border border-amber-900/25 bg-slate-950/50 p-4">
                  <p className="mb-1 flex items-center gap-1.5 text-xs text-amber-100/45">
                    <Shield className="h-3.5 w-3.5 text-amber-400" /> Campanha
                  </p>
                  <p className="text-sm font-semibold text-amber-100">
                    {character.campanha}
                  </p>
                  <p className="mt-1 text-xs text-amber-100/30">
                    Nível {character.nivel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CharacterSectionCard>

        <CharacterSectionCard title="Marca" icon={Sparkles}>
          <div className="rounded-2xl border border-amber-900/30 bg-slate-950/50 p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-amber-100">
                  Marca {character.marca}
                </p>

                <p className="mt-1 text-xs text-amber-100/40">
                  A Marca foi definida na criação do personagem.
                </p>
              </div>

              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-[11px] font-medium text-amber-300/80">
                <LockKeyhole className="h-3.5 w-3.5" />
                Bloqueada
              </span>
            </div>

            <div className="rounded-xl border border-amber-900/25 bg-slate-900/60 px-4 py-3 text-sm text-amber-100/65">
              Esta escolha não pode ser alterada depois da criação do
              personagem.
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-amber-900/30 bg-slate-900/40 p-6 shadow-xl shadow-black/30">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/25 bg-amber-500/15">
                <GitBranch className="h-4 w-4 text-amber-400" />
              </div>

              <div>
                <h2 className="text-sm font-semibold tracking-wide text-amber-200">
                  Árvore de Habilidades
                </h2>

                <p className="mt-1 text-xs text-amber-100/40">
                  Gerencie até 6 habilidades equipadas para o personagem.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSkillTree(true)}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-sm font-semibold text-amber-300 transition-all hover:border-amber-400/50 hover:bg-amber-500/20 hover:text-amber-200"
            >
              <GitBranch className="h-4 w-4" />
              Ver Árvore de Habilidades
              <span className="ml-auto text-[10px] opacity-60">
                Gerenciar skills →
              </span>
            </button>
          </div>
        </CharacterSectionCard>

        <CharacterSectionCard title="História" icon={Scroll}>
          <textarea
            name="historia"
            value={form.historia}
            onChange={handleChange}
            rows={5}
            className="w-full resize-none rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm leading-relaxed text-amber-100 outline-none transition-all placeholder:text-amber-100/20 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"
          />
        </CharacterSectionCard>

        <CharacterSectionCard title="Atributos" icon={Swords}>
          <CharacterAttributesPanel
            attributes={attributes}
            onChange={setAttributes}
            minimumAttributes={minimumAttributes}
            pointLimit={attributePointLimit}
            circleLimit={50}
          />
        </CharacterSectionCard>

        <CharacterSectionCard
          title="Habilidades"
          icon={Zap}
          right={
            <button
              type="button"
              onClick={() => setShowSkillTree(true)}
              className="flex items-center gap-2 rounded-lg border border-amber-500/35 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-500/20"
            >
              <TreePine className="h-3.5 w-3.5" /> Abrir Árvore
            </button>
          }
        >
          <div className="mb-4 flex items-center justify-between text-xs text-amber-100/40">
            <span>Habilidades equipadas</span>
            <span>{equippedSkillIds.length} / 6</span>
          </div>

          {equippedSkills.length === 0 ? (
            <p className="rounded-xl border border-amber-900/20 bg-slate-950/40 px-4 py-5 text-sm text-amber-100/35">
              Nenhuma habilidade equipada. Abra a árvore para escolher até 6.
            </p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {equippedSkills.map((skill) => (
                <div
                  key={skill.id ?? skill.nome}
                  className="rounded-xl border border-amber-500/45 bg-amber-500/10 p-4 text-left"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-400" />
                    <p className="font-semibold text-amber-100">{skill.nome}</p>
                    <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-400" />
                  </div>
                  <p className="text-xs leading-relaxed text-amber-100/50">
                    {skill.descricao}
                  </p>
                  <p className="mt-2 text-xs text-amber-100/35">
                    Tipo: {skill.tipo}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CharacterSectionCard>

        <div className="flex flex-col gap-4 pb-8 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/dashboard/player")}
              className="text-sm text-amber-100/35 transition-colors hover:text-amber-100/60"
            >
              Cancelar e voltar
            </button>

            <button
              type="button"
              onClick={handleDeleteCharacter}
              disabled={isSaving || isDeleting}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-5 py-2.5 text-sm font-semibold text-rose-200 transition hover:border-rose-400/60 hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Excluir personagem
                </>
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={saved || isSaving || isDeleting}
            className={`flex items-center justify-center gap-2.5 rounded-xl px-8 py-3 text-base font-semibold shadow-lg transition-all ${
              saved
                ? "scale-95 bg-emerald-600/80 text-emerald-100 shadow-emerald-900/30"
                : "bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-amber-900/30 hover:scale-[1.02] hover:from-amber-400 hover:to-rose-500 hover:shadow-amber-800/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            }`}
          >
            {saved ? (
              <>
                <CheckCircle2 className="h-5 w-5" /> Alterações salvas!
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                {isSaving ? "Salvando..." : "Salvar Alterações"}
              </>
            )}
          </button>
        </div>
      </form>

      {showSkillTree && (
        <SkillTreeModal
          mark={character.marca}
          markId={character.marcaId}
          campaignId={character.campaignId}
          level={character.nivel}
          characterName={character.nome}
          campaign={character.campanha}
          equippedSkillIds={equippedSkillIds}
          onSaveEquippedSkills={setEquippedSkillIds}
          onClose={() => setShowSkillTree(false)}
        />
      )}
    </CharacterPageShell>
  );
}
