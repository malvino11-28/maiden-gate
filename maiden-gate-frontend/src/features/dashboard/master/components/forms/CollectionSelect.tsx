import { useEffect, useState } from "react";

import {
  getCampaignCollections,
  type CampaignCollectionOption,
} from "../../services/masterElementService";

type CollectionSelectProps = {
  campaignId: string | number;
  value: string;
  onChange: (value: string) => void;
};

export default function CollectionSelect({
  campaignId,
  value,
  onChange,
}: CollectionSelectProps) {
  const [collections, setCollections] = useState<CampaignCollectionOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!campaignId) {
      setCollections([]);
      onChange("");
      return;
    }

    let active = true;

    async function loadCollections() {
      try {
        setIsLoading(true);
        const data = await getCampaignCollections(campaignId);

        if (active) {
          setCollections(data);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadCollections();

    return () => {
      active = false;
    };
  }, [campaignId, onChange]);

  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={!campaignId || isLoading}
      className="w-full rounded-xl border border-orange-500/20 bg-[#11162B] px-4 py-3 text-stone-200 focus:border-orange-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
    >
      <option value="">
        {isLoading ? "Carregando conjuntos..." : "Sem conjunto"}
      </option>

      {collections.map((collection) => (
        <option key={collection.id} value={collection.id}>
          {collection.name}
        </option>
      ))}
    </select>
  );
}
