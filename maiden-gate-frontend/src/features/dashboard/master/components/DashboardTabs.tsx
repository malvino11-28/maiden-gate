type DashboardTabsProps = {
  activeTab: "campaigns" | "profile" | "request";
  onChange: (tab: "campaigns" | "profile" | "request") => void;
};

export default function DashboardTabs({
  activeTab,
  onChange,
}: DashboardTabsProps) {
  return (
    <div className="mb-6 flex w-fit gap-1 rounded-xl border border-amber-900/25 bg-slate-900/60 p-1">
      <button
        onClick={() => onChange("campaigns")}
        className={`rounded-lg px-5 py-2 text-sm font-medium transition-all ${
          activeTab === "campaigns"
            ? "border border-amber-500/30 bg-gradient-to-r from-amber-500/30 to-rose-600/30 text-amber-200"
            : "text-amber-100/50 hover:text-amber-100/80"
        }`}
      >
        Campanhas
      </button>

      <button
        onClick={() => onChange("request")}
        className={`rounded-lg px-5 py-2 text-sm font-medium transition-all ${
          activeTab === "request"
            ? "border border-amber-500/30 bg-gradient-to-r from-amber-500/30 to-rose-600/30 text-amber-200"
            : "text-amber-100/50 hover:text-amber-100/80"
        }`}
      >
        Solicitações
      </button>

      <button
        onClick={() => onChange("profile")}
        className={`rounded-lg px-5 py-2 text-sm font-medium transition-all ${
          activeTab === "profile"
            ? "border border-amber-500/30 bg-gradient-to-r from-amber-500/30 to-rose-600/30 text-amber-200"
            : "text-amber-100/50 hover:text-amber-100/80"
        }`}
      >
        Perfil
      </button>
    </div>
  );
}
