import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  AlertCircle,
  CheckCircle2,
  GitBranch,
  Globe,
  LockKeyhole,
  Scroll,
  Sparkles,
  Swords,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../auth/hooks/useAuth";

import CharacterPageShell from "../components/character/CharacterPageShell";
import CharacterSectionCard from "../components/character/CharacterSectionCard";
import CharacterImageUpload from "../components/character/CharacterImageUpload";
import CharacterBrandSelector from "../components/character/CharacterBrandSelector";
import CharacterAttributesPanel from "../components/character/CharacterAttributesPanel";
import SkillTreeModal from "../components/character/SkillTreeModal";

import {
  baseAttributeValue,
  extraPoints,
  getMinimumAttributesByMark,
} from "../data/characterFormMock";

import {
  createCharacter,
  getCharacterCampaignOptions,
  getCharacterMarkOptions,
  type CharacterCampaignOption,
} from "../../services/characterCreationService";

import type {
  AttributeKey,
  CharacterMark,
  CharacterMarkOption,
} from "../types/player";

type CharacterForm = {
  nome: string;
  sobrenome: string;
  campaignId: string;
  origem: string;
  historia: string;
  marcaId: string;
};

const initialAttributes: Record<AttributeKey, number> = {
  POD: baseAttributeValue,
  DES: baseAttributeValue,
  RES: baseAttributeValue,
  INT: baseAttributeValue,
  DET: baseAttributeValue,
  PRE: baseAttributeValue,
};

const maxAttributeBonusOnCreation = 5;

export default function CreateCharacterPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [showSkillTree, setShowSkillTree] = useState(false);
  const [iconImage, setIconImage] = useState<File | null>(null);
  const [fullImage, setFullImage] = useState<File | null>(null);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [campaignOptions, setCampaignOptions] = useState<
    CharacterCampaignOption[]
  >([]);
  const [markOptions, setMarkOptions] = useState<CharacterMarkOption[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);

  const [equippedSkillIds, setEquippedSkillIds] = useState<string[]>([]);

  const [form, setForm] = useState<CharacterForm>({
    nome: "",
    sobrenome: "",
    campaignId: "",
    origem: "",
    historia: "",
    marcaId: "",
  });

  const selectedMark = useMemo(
    () => markOptions.find((mark) => String(mark.id) === form.marcaId) ?? null,
    [markOptions, form.marcaId],
  );

  const selectedMarkName = selectedMark?.value ?? "";
  const minimumAttributes = getMinimumAttributesByMark(selectedMarkName);

  const [attributes, setAttributes] =
    useState<Record<AttributeKey, number>>(initialAttributes);

  const spentPoints = Object.entries(attributes).reduce((sum, [key, value]) => {
    const attributeKey = key as AttributeKey;
    return sum + (value - minimumAttributes[attributeKey]);
  }, 0);

  const remainingPoints = extraPoints - spentPoints;

  useEffect(() => {
    if (!user) return;

    const userId = user.id;
    let active = true;

    async function loadOptions() {
      try {
        setIsLoadingOptions(true);
        setError(null);

        const [campaigns, marks] = await Promise.all([
          getCharacterCampaignOptions(userId),
          getCharacterMarkOptions(),
        ]);

        if (!active) return;

        setCampaignOptions(campaigns);
        setMarkOptions(marks);
      } catch {
        if (active) {
          setError("Não foi possível carregar campanhas e marcas.");
        }
      } finally {
        if (active) {
          setIsLoadingOptions(false);
        }
      }
    }

    loadOptions();

    return () => {
      active = false;
    };
  }, [user]);

  function handleMarkChange(mark: CharacterMarkOption) {
    if (!mark.id) return;

    const minimum = getMinimumAttributesByMark(mark.value);

    setForm((previous) => ({
      ...previous,
      marcaId: String(mark.id),
    }));

    setEquippedSkillIds([]);
    setAttributes(minimum);
  }

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  function handleAttributesChange(
    nextAttributes: Record<AttributeKey, number>,
  ) {
    setAttributes((previous) => {
      const limitedAttributes = Object.entries(nextAttributes).reduce(
        (acc, [key, value]) => {
          const attributeKey = key as AttributeKey;
          const minimumValue = minimumAttributes[attributeKey];

          acc[attributeKey] = Math.min(
            Math.max(value, minimumValue),
            minimumValue + maxAttributeBonusOnCreation,
          );

          return acc;
        },
        {} as Record<AttributeKey, number>,
      );

      const totalSpent = Object.entries(limitedAttributes).reduce(
        (sum, [key, value]) => {
          const attributeKey = key as AttributeKey;
          return sum + (value - minimumAttributes[attributeKey]);
        },
        0,
      );

      if (totalSpent > extraPoints) {
        return previous;
      }

      return limitedAttributes;
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!user) {
      setError("Você precisa estar logado para criar um personagem.");
      return;
    }

    if (!form.nome.trim()) {
      setError("Informe o nome do personagem.");
      return;
    }

    if (!form.campaignId) {
      setError("Selecione uma campanha para o personagem.");
      return;
    }

    if (!form.marcaId || !selectedMark) {
      setError("Selecione uma Marca para o personagem.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      await createCharacter({
        userId: user.id,
        campaignId: Number(form.campaignId),
        marcaId: Number(form.marcaId),
        nome: form.nome.trim(),
        sobrenome: form.sobrenome.trim(),
        origem: form.origem.trim(),
        historia: form.historia.trim(),
        iconImage,
        fullImage,
        attributes,
        equippedSkillIds,
      });

      setSaved(true);
      setTimeout(() => navigate("/dashboard/player"), 1200);
    } catch {
      setError("Não foi possível criar o personagem.");
    } finally {
      setIsSaving(false);
    }
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
      <form
        id="form-personagem"
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
                  image={iconImage}
                  onChange={setIconImage}
                  label="Imagem do Ícone"
                  helper="Imagem do rosto"
                  aspectClassName="aspect-square"
                />
              </div>
              <CharacterImageUpload
                image={fullImage}
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
                    placeholder="Ex: Lirien"
                    className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all placeholder:text-amber-100/20 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"
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
                    placeholder="Ex: Respiração"
                    className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all placeholder:text-amber-100/20 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-amber-600/70">
                  <Globe className="h-3.5 w-3.5" />
                  Campanha
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-0.5 text-[10px] normal-case tracking-normal text-amber-300/80">
                    <LockKeyhole className="h-3 w-3" />
                    Permanente após criação
                  </span>
                </label>
                <select
                  name="campaignId"
                  value={form.campaignId}
                  onChange={handleChange}
                  disabled={isLoadingOptions}
                  className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 disabled:cursor-not-allowed disabled:text-amber-100/25"
                >
                  <option value="">
                    {isLoadingOptions
                      ? "Carregando campanhas..."
                      : "Selecione uma campanha"}
                  </option>
                  {campaignOptions.map((campaign) => (
                    <option key={campaign.id} value={campaign.id}>
                      {campaign.nome}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs leading-relaxed text-amber-100/35">
                  Apenas campanhas em que sua entrada foi aceita aparecem aqui.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">
                  Origem
                </label>
                <input
                  name="origem"
                  value={form.origem}
                  onChange={handleChange}
                  placeholder="De onde seu personagem veio?"
                  className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all placeholder:text-amber-100/20 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"
                />
              </div>
            </div>
          </div>
        </CharacterSectionCard>

        <CharacterSectionCard
          title="Marca"
          icon={Sparkles}
          right={
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-[11px] font-medium text-amber-300/80">
              <LockKeyhole className="h-3.5 w-3.5" />
              Permanente após criação
            </span>
          }
        >
          <CharacterBrandSelector
            value={form.marcaId}
            marks={markOptions}
            onChange={handleMarkChange}
          />

          <div className="mt-5 rounded-2xl border border-amber-900/30 bg-slate-900/40 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/25 bg-amber-500/15">
                <GitBranch className="h-4 w-4 text-amber-400" />
              </div>

              <div>
                <h2 className="text-sm font-semibold tracking-wide text-amber-200">
                  Árvore de Habilidades
                </h2>

                <p className="mt-1 text-xs text-amber-100/40">
                  Veja as habilidades do banco de dados associadas à Marca
                  selecionada. Você pode equipar até 6.
                </p>
              </div>
            </div>

            <div className="mb-3 text-xs text-amber-100/40">
              Skills equipadas: {equippedSkillIds.length} / 6
            </div>

            <button
              type="button"
              disabled={!form.marcaId}
              onClick={() => setShowSkillTree(true)}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-sm font-semibold text-amber-300 transition-all hover:border-amber-400/50 hover:bg-amber-500/20 hover:text-amber-200 disabled:cursor-not-allowed disabled:border-amber-900/25 disabled:bg-slate-950/40 disabled:text-amber-100/25"
            >
              <GitBranch className="h-4 w-4" />

              {selectedMarkName
                ? `Ver Árvore de ${selectedMarkName}`
                : "Selecione uma Marca para visualizar a árvore"}
            </button>
          </div>
        </CharacterSectionCard>

        <CharacterSectionCard title="História" icon={Scroll}>
          <label className="mb-3 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">
            O que moldou seu personagem?
          </label>
          <textarea
            name="historia"
            value={form.historia}
            onChange={handleChange}
            rows={5}
            placeholder="Escreva sobre a origem, motivações, perdas e sonhos que guiam este ser pelo mundo de VOF…"
            className="w-full resize-none rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm leading-relaxed text-amber-100 outline-none transition-all placeholder:text-amber-100/20 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"
          />
        </CharacterSectionCard>

        <CharacterSectionCard
          title="Atributos"
          icon={Swords}
          right={
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-amber-100/40">
                Pontos disponíveis
              </span>
              <div
                className={`rounded-full border px-3 py-1 text-sm font-bold transition-all ${
                  remainingPoints === 0
                    ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                    : remainingPoints <= 5
                      ? "border-amber-500/40 bg-amber-500/15 text-amber-300"
                      : "border-amber-900/40 bg-slate-800 text-amber-200"
                }`}
              >
                {remainingPoints}
                <span className="text-[10px] font-normal opacity-60">
                  {" "}
                  / {extraPoints}
                </span>
              </div>
            </div>
          }
        >
          <CharacterAttributesPanel
            attributes={attributes}
            onChange={handleAttributesChange}
            minimumAttributes={minimumAttributes}
            pointLimit={extraPoints}
            circleLimit={50}
          />
        </CharacterSectionCard>

        <div className="flex flex-col items-center justify-between gap-4 pb-8 pt-2 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate("/dashboard/player")}
            className="text-sm text-amber-100/35 transition-colors hover:text-amber-100/60"
          >
            Cancelar e voltar
          </button>

          <button
            type="submit"
            disabled={saved || isSaving}
            className={`flex items-center gap-2.5 rounded-xl px-8 py-3 text-base font-semibold shadow-lg transition-all ${
              saved
                ? "scale-95 bg-emerald-600/80 text-emerald-100 shadow-emerald-900/30"
                : "bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-amber-900/30 hover:scale-[1.02] hover:from-amber-400 hover:to-rose-500 hover:shadow-amber-800/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            }`}
          >
            {saved ? (
              <>
                <CheckCircle2 className="h-5 w-5" /> Personagem criado com
                sucesso!
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                {isSaving ? "Criando..." : "Criar Personagem"}
              </>
            )}
          </button>
        </div>
      </form>

      {showSkillTree && selectedMark && (
        <SkillTreeModal
          mark={selectedMark.value as CharacterMark}
          markId={selectedMark.id}
          campaignId={form.campaignId ? Number(form.campaignId) : null}
          level={1}
          characterName={
            form.nome
              ? `${form.nome} ${form.sobrenome}`.trim()
              : "Novo Personagem"
          }
          campaign={
            campaignOptions.find(
              (campaign) => String(campaign.id) === form.campaignId,
            )?.nome
          }
          equippedSkillIds={equippedSkillIds}
          onSaveEquippedSkills={setEquippedSkillIds}
          onClose={() => setShowSkillTree(false)}
        />
      )}
    </CharacterPageShell>
  );
}
