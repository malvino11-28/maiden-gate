import { useState, useRef } from "react";
import type { ChangeEvent, DragEvent } from "react";

type ImageInputProps = {
  value?: string | null;
  onChange: (file: File | null) => void;
};

export default function ImageInput({ value, onChange }: ImageInputProps) {
  // O preview começa com o valor que veio do banco (se houver)
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // Atualiza para o preview local da nova imagem
      };
      reader.readAsDataURL(file);
      onChange(file); // Passa o File para o formulário enviar pro backend
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
      className="border-2 border-dashed border-amber-100/30 hover:border-amber-100/60 transition rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-amber-100/5 min-h-[150px]"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/*"
        className="hidden"
      />

      {preview ? (
        <div className="relative w-full max-h-48 flex justify-center">
          <img
            src={preview}
            alt="Preview"
            className="max-h-44 object-contain rounded-md"
          />
        </div>
      ) : (
        <div className="text-center text-sm text-amber-100/60">
          <p className="font-semibold">Clique para enviar</p>
          <p className="text-xs mt-1">ou arraste e solte a imagem aqui</p>
        </div>
      )}
    </div>
  );
}
