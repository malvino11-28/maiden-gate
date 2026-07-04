import { ImagePlus } from "lucide-react";
import { useRef } from "react";
import type { ChangeEvent } from "react";

type Props = {
  image: string | null;
  onChange: (image: string) => void;
};

export default function CharacterImageUpload({ image, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="self-start text-[10px] uppercase tracking-[0.2em] text-amber-600/60">
        Retrato
      </span>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="relative aspect-[3/4] w-full rounded-xl border-2 border-dashed border-amber-800/50 bg-slate-900/60 transition-all hover:border-amber-600/70 hover:bg-slate-900/80"
      >
        {image ? (
          <img src={image} alt="Retrato do personagem" className="h-full w-full rounded-xl object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
            <ImagePlus className="h-9 w-9 text-amber-600/50" />
            <div>
              <p className="text-sm text-amber-100/55">Adicionar imagem</p>
              <p className="mt-1 text-xs text-amber-100/25">PNG ou JPG</p>
            </div>
          </div>
        )}
      </button>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
    </div>
  );
}
