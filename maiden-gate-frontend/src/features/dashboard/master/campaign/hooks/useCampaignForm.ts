import { useState } from "react";

import type { CampaignData } from "../types/campaign";

const initialCampaign: CampaignData = {
  image: "",
  name: "",
  description: "",
  recommendedLevel: "Iniciante",
  players: "",
  locations: [],
  npcs: [],
  monsters: [],
  items: [],
  events: [],
};

export default function useCampaignForm() {
  const [campaign, setCampaign] = useState<CampaignData>(initialCampaign);

  function updateField<K extends keyof CampaignData>(
    field: K,
    value: CampaignData[K],
  ) {
    setCampaign((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function resetCampaign() {
    setCampaign(initialCampaign);
  }

  return {
    campaign,
    updateField,
    resetCampaign,
    setCampaign,
  };
}
