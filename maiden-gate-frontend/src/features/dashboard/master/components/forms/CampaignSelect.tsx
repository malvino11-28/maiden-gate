import { useEffect, useState } from "react";
import { useAuth } from "../../../../auth/hooks/useAuth";
import { getMasterCampaigns } from "../../services/dashboardService";
import type { MasterCampaignApi } from "../../services/dashboardService";

type CampaignSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CampaignSelect({
  value,
  onChange,
}: CampaignSelectProps) {
  const { user } = useAuth();

  const [campaigns, setCampaigns] = useState<MasterCampaignApi[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    async function loadCampaigns() {
      try {
        setIsLoading(true);

        const data = await getMasterCampaigns(user.id);

        setCampaigns(data);
      } finally {
        setIsLoading(false);
      }
    }

    loadCampaigns();
  }, [user]);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full
        rounded-xl
        border
        border-orange-500/20
        bg-[#11162B]
        px-4
        py-3
        text-stone-200

        focus:border-orange-400
        focus:outline-none
      "
    >
      <option value="">
        {isLoading ? "Carregando campanhas..." : "Selecione uma campanha"}
      </option>

      {campaigns.map((campaign) => (
        <option key={campaign.id} value={campaign.id}>
          {campaign.name}
        </option>
      ))}
    </select>
  );
}
