type DashboardTabsProps = {
  activeTab: "campaigns" | "profile";
  onChange: (tab: "campaigns" | "profile") => void;
};

export default function DashboardTabs({
  activeTab,
  onChange,
}: DashboardTabsProps) {
  return (
    <div
      className="
        inline-flex
        rounded-2xl
        border
        border-white/10
        bg-[#11162B]
        p-1
      "
    >
      <button
        onClick={() => onChange("campaigns")}
        className={`
          rounded-xl
          px-6
          py-3
          transition

          ${
            activeTab === "campaigns"
              ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
              : "text-stone-400 hover:text-white"
          }
        `}
      >
        Campanhas
      </button>

      <button
        onClick={() => onChange("profile")}
        className={`
          rounded-xl
          px-6
          py-3
          transition

          ${
            activeTab === "profile"
              ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
              : "text-stone-400 hover:text-white"
          }
        `}
      >
        Perfil
      </button>
    </div>
  );
}
