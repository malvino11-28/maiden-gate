import { ImagePlus } from "lucide-react";

type Props = {
  image?: string;
  onChange?: (image: string) => void;
};

export default function CampaignImageUpload({ image, onChange }: Props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => onChange?.(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <label className="group flex h-56 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-amber-900/35 bg-slate-900/50 transition-colors hover:border-amber-500/50">
      <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={handleChange} />

      {image ? (
        <img src={image} alt="Capa da campanha" className="h-full w-full object-cover" />
      ) : (
        <>
          <ImagePlus className="mb-4 h-10 w-10 text-amber-400/70 transition-transform group-hover:scale-105" />
          <h3 className="font-semibold text-amber-100">
            Clique para adicionar uma imagem
          </h3>
          <p className="mt-2 text-sm text-amber-100/35">
            PNG ou JPG • Recomendado 1280 × 720
          </p>
        </>
      )}
    </label>
  );
}
