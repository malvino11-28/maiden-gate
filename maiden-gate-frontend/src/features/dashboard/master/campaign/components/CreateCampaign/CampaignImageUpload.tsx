import { ImagePlus } from "lucide-react";

type Props = {
  image?: string;
};

export default function CampaignImageUpload({ image }: Props) {
  return (
    <button
      className="
        flex
        h-72
        w-full
        flex-col
        items-center
        justify-center
        rounded-2xl
        border-2
        border-dashed
        border-white/10
        bg-[#11162B]
        transition
        hover:border-orange-500/40
      "
    >
      {image ? (
        <img
          src={image}
          alt="Campaign"
          className="h-full w-full rounded-2xl object-cover"
        />
      ) : (
        <>
          <ImagePlus size={42} className="mb-4 text-orange-400" />

          <h3 className="font-semibold text-white">
            Clique para adicionar uma imagem
          </h3>

          <p className="mt-2 text-sm text-stone-500">
            PNG ou JPG • Recomendado 1280 × 720
          </p>
        </>
      )}
    </button>
  );
}
