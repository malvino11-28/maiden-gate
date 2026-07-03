import { useState } from "react";

import CampaignHeader from "./components/CreateCampaign/CampaignHeader";
import CampaignSidebar from "./components/CreateCampaign/CampaignSidebar";

import CoverSection from "./components/sections/CoverSection";

export type CampaignStep =
  | "cover"
  | "locations"
  | "npcs"
  | "monsters"
  | "items"
  | "events";

export default function CreateCampaignPage() {
  const [currentStep, setCurrentStep] = useState<CampaignStep>("cover");

  return (
    <div className="min-h-screen bg-[#090E21]">
      <CampaignHeader />

      <div className="flex">
        <CampaignSidebar currentStep={currentStep} onChange={setCurrentStep} />

        <main className="flex-1 px-12 py-12">
          {currentStep === "cover" && (
            <div>
              <h1 className="text-5xl font-bold text-white">
                Capa da Campanha
              </h1>

              <p className="mt-3 text-stone-400">
                Defina a identidade visual e essencial da sua aventura.
              </p>

              <CoverSection onNext={() => setCurrentStep("locations")} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
