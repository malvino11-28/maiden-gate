/* eslint-disable react-hooks/set-state-in-effect */
import { ImagePlus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";

type Props = {
  image?: string | File | null;
  label?: string;
  helper?: string;
  aspectClassName?: string;
  onChange: (image: File | null) => void;
};

export default function CharacterImageUpload({
  image,
  label = "Retrato",
  helper = "PNG ou JPG",
  aspectClassName = "aspect-[3/4]",
  onChange,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    if (typeof image === "string") {
      setPreview(image);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    if (!file || !file.type.startsWith("image/")) {
      onChange(null);
      return;
    }

    onChange(file);
  }

  function clearImage() {
    onChange(null);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="self-start text-[10px] uppercase tracking-[0.2em] text-amber-600/60">
        {label}
      </span>

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className={`relative w-full overflow-hidden rounded-xl border-2 border-dashed border-amber-800/50 bg-slate-900/60 transition-all hover:border-amber-600/70 hover:bg-slate-900/80 ${aspectClassName}`}
      >
        {preview ? (
          <img
            src={preview}
            alt={label}
            className="h-full w-full rounded-xl object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
            <ImagePlus className="h-9 w-9 text-amber-600/50" />
            <div>
              <p className="text-sm text-amber-100/55">Adicionar imagem</p>
              <p className="mt-1 text-xs text-amber-100/25">{helper}</p>
            </div>
          </div>
        )}
      </button>

      {preview && (
        <button
          type="button"
          onClick={clearImage}
          className="flex items-center gap-1 text-xs text-amber-100/35 transition hover:text-rose-300"
        >
          <X className="h-3.5 w-3.5" />
          Remover imagem
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="hidden"
      />
    </div>
  );
}
