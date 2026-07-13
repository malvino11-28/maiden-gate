import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";

type ImageInputProps = {
  value?: string | File | null;
  onChange: (file: File | null) => void;
};

export default function ImageInput({ value, onChange }: ImageInputProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    if (typeof value === "string") {
      setPreview(value);
      return;
    }

    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [value]);

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onChange(file);
    } else {
      setPreview(null);
      onChange(null);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    handleFileChange(file);
  };

  const triggerSelect = () => fileInputRef.current?.click();

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={triggerSelect}
      className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-amber-100/30 bg-amber-100/5 p-4 transition hover:border-amber-100/60"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/*"
        className="hidden"
      />

      {preview ? (
        <div className="relative flex max-h-48 w-full justify-center">
          <img
            src={preview}
            alt="Preview"
            className="max-h-44 rounded-md object-contain"
          />
        </div>
      ) : (
        <div className="text-center text-sm text-amber-100/60">
          <p className="font-semibold">Clique para enviar</p>
          <p className="mt-1 text-xs">ou arraste e solte a imagem aqui</p>
        </div>
      )}
    </div>
  );
}
