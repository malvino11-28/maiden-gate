import { campaignSections } from "../../data/masterCampaignSections";
import type { SectionKey } from "../../types/masterCampaign";

type Props = {
  activeSection: SectionKey;
  onChange: (section: SectionKey) => void;
};

export default function CampaignSectionTabs({
  activeSection,
  onChange,
}: Props) {
  return (
    <div
      className="
        mb-6
        flex
        flex-wrap
        gap-1
        rounded-xl
        border
        border-amber-900/25
        bg-slate-900/60
        p-1
      "
    >
      {campaignSections.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`
            flex
            items-center
            gap-1.5
            rounded-lg
            px-3
            py-2
            text-sm
            font-medium
            transition-all

            ${
              activeSection === key
                ? "border border-amber-500/30 bg-gradient-to-r from-amber-500/30 to-rose-600/30 text-amber-200"
                : "text-amber-100/50 hover:text-amber-100/80"
            }
          `}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}
