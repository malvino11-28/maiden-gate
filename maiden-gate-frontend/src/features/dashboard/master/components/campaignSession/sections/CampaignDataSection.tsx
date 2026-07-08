import { useState } from "react";
import { CheckCircle2, Edit3, ImageIcon, Trash2, Users, X } from "lucide-react";

import type { MasterCampaign } from "../../../types/masterCampaign";

import ImageInput from "../../forms/ImageField";

type Props = {
  campaign: MasterCampaign;
  onEdit: (data: CampaignDataForm) => Promise<void>;
  onDelete: () => Promise<void>;
};

type CampaignDataForm = {
  nome: string;
  imagem: string;
  imageFile: File | null;
  descricao: string;
  nivelRecomendado: string;
  jogadores: string;
};

export default function CampaignDataSection({
  campaign,
  onEdit,
  onDelete,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const [data, setData] = useState<CampaignDataForm>({
    nome: campaign.nome,
    imagem: campaign.imagem ?? "",
    imageFile: null,
    descricao: campaign.descricao ?? "",
    nivelRecomendado: campaign.nivelRecomendado ?? "",
    jogadores: campaign.jogadores ?? "",
  });

  function getImageSrc(image?: string | null) {
    if (!image) return "";

    if (image.startsWith("http") || image.startsWith("/")) {
      return image;
    }

    return `http://127.0.0.1:8000/storage/${image}`;
  }

  const [form, setForm] = useState<CampaignDataForm>(data);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleStartEdit() {
    setForm(data);
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setForm(data);
    setIsEditing(false);
  }

  async function handleSaveEdit() {
    try {
      setIsSaving(true);
      setError(null);

      await onEdit(form);

      setData(form);
      setIsEditing(false);
    } catch {
      setError("Não foi possível salvar as alterações.");
    } finally {
      setIsSaving(false);
      setData({
        ...form,
        imageFile: null,
      });
    }
  }

  async function handleDelete() {
    try {
      setIsDeleting(true);
      setError(null);

      await onDelete();
    } catch {
      setError("Não foi possível excluir a campanha.");
    } finally {
      setIsDeleting(false);
    }
  }

  function updateFormField<K extends keyof CampaignDataForm>(
    field: K,
    value: CampaignDataForm[K],
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  const visibleData = isEditing ? form : data;
  const visibleImage = getImageSrc(visibleData.imagem);

  return (
    <section className="overflow-hidden rounded-2xl border border-amber-900/25 bg-slate-900/60">
      <div className="relative h-64 border-b border-amber-900/25 bg-slate-950">
        {isEditing ? (
          <div className="flex h-full items-center justify-center p-5">
            <div className="w-full max-w-xl">
              <ImageInput
                value={visibleImage}
                onChange={(file) =>
                  setForm((previous) => ({
                    ...previous,
                    imageFile: file,
                  }))
                }
              />
            </div>
          </div>
        ) : visibleImage ? (
          <img
            src={visibleImage}
            alt={visibleData.nome}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-amber-100/25">
            <ImageIcon className="h-10 w-10" />
            <span className="text-sm">Nenhuma imagem definida</span>
          </div>
        )}

        {!isEditing && (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
        )}

        <div className="absolute bottom-5 left-5 right-5">
          <span className="mb-3 inline-flex rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
            {isEditing ? "Editando Campanha" : "Dados da Campanha"}
          </span>

          <h2 className="text-3xl font-bold text-amber-100">
            {visibleData.nome || "Campanha sem nome"}
          </h2>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {isEditing ? (
          <>
            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">
                Nome da campanha
              </label>

              <input
                value={form.nome}
                onChange={(event) =>
                  updateFormField("nome", event.target.value)
                }
                placeholder="Nome da campanha"
                className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all placeholder:text-amber-100/20 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">
                Imagem da campanha
              </label>

              <input
                value={form.imagem}
                onChange={(event) =>
                  updateFormField("imagem", event.target.value)
                }
                placeholder="/images/campaigns/minha-campanha.jpg"
                className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all placeholder:text-amber-100/20 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"
              />

              <p className="mt-2 text-xs text-amber-100/30">
                Por enquanto, use uma URL ou caminho da imagem dentro da pasta
                public.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">
                Descrição
              </label>

              <textarea
                rows={5}
                value={form.descricao}
                onChange={(event) =>
                  updateFormField("descricao", event.target.value)
                }
                placeholder="Descreva a proposta, clima e objetivo principal da campanha."
                className="w-full resize-none rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm leading-relaxed text-amber-100 outline-none transition-all placeholder:text-amber-100/20 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">
                  Nível recomendado
                </label>

                <select
                  value={form.nivelRecomendado}
                  onChange={(event) =>
                    updateFormField("nivelRecomendado", event.target.value)
                  }
                  className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"
                >
                  <option value="">Selecione um nível</option>
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-amber-600/70">
                  Número de jogadores
                </label>

                <input
                  value={form.jogadores}
                  onChange={(event) =>
                    updateFormField("jogadores", event.target.value)
                  }
                  placeholder="Ex: 3–5"
                  className="w-full rounded-lg border border-amber-900/40 bg-slate-950/60 px-4 py-3 text-sm text-amber-100 outline-none transition-all placeholder:text-amber-100/20 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-amber-600/70">
                Descrição
              </p>

              <p className="text-sm leading-relaxed text-amber-100/60">
                {data.descricao || "Nenhuma descrição cadastrada."}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-amber-900/25 bg-slate-950/50 p-4">
                <p className="mb-1 text-xs text-amber-100/40">
                  Nível recomendado
                </p>

                <p className="text-lg font-semibold text-amber-100">
                  {data.nivelRecomendado || "Não informado"}
                </p>
              </div>

              <div className="rounded-xl border border-amber-900/25 bg-slate-950/50 p-4">
                <p className="mb-1 flex items-center gap-1.5 text-xs text-amber-100/40">
                  <Users className="h-3.5 w-3.5 text-amber-400" />
                  Número de jogadores
                </p>

                <p className="text-lg font-semibold text-amber-100">
                  {data.jogadores || "Não informado"}
                </p>
              </div>
            </div>
          </>
        )}

        {error && <p className="text-sm text-rose-400">{error}</p>}

        <div className="flex flex-col gap-3 border-t border-amber-900/20 pt-6 sm:flex-row sm:justify-end">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={isSaving}
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-300 transition-all hover:border-emerald-400/50 hover:bg-emerald-500/20 hover:text-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <CheckCircle2 className="h-4 w-4" />
                {isSaving ? "Salvando..." : "Salvar"}
              </button>

              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex items-center justify-center gap-2 rounded-xl border border-amber-900/30 bg-slate-950/50 px-5 py-3 text-sm font-semibold text-amber-100/50 transition-all hover:border-amber-700/50 hover:text-amber-100"
              >
                <X className="h-4 w-4" />
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleStartEdit}
                className="flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-sm font-semibold text-amber-300 transition-all hover:border-amber-400/50 hover:bg-amber-500/20 hover:text-amber-200"
              >
                <Edit3 className="h-4 w-4" />
                Editar
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-300 transition-all hover:border-rose-400/50 hover:bg-rose-500/20 hover:text-rose-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? "Excluindo..." : "Excluir Campanha"}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
