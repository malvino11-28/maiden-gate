const campaigns = [
  "A Flor do Abismo",
  "Crônicas de Vareth",
  "O Despertar da Donzela",
];

type CampaignSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CampaignSelect({
  value,
  onChange,
}: CampaignSelectProps) {
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
      <option value="">— Selecione uma campanha —</option>

      {campaigns.map((campaign) => (
        <option key={campaign} value={campaign}>
          {campaign}
        </option>
      ))}
    </select>
  );
}
