import { ArrowLeft, Sparkles, ScrollText } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../../../../../../shared/components/Button/Button";

export default function CampaignHeader() {
  return (
    <header
      className="
        flex
        items-center
        justify-between
        border-b
        border-white/10
        px-10
        py-5
      "
    >
      <Link
        to="/dashboard/master"
        className="
          flex
          items-center
          gap-2
          text-stone-300
          transition
          hover:text-white
        "
      >
        <ArrowLeft size={18} />
        Voltar ao Painel
      </Link>

      <div className="flex items-center gap-3">
        <div
          className="
            rounded-lg
            bg-gradient-to-br
            from-orange-500
            to-pink-600
            p-2
          "
        >
          <ScrollText size={18} className="text-white" />
        </div>

        <span className="font-semibold text-white">Nova Campanha</span>
      </div>

      <Button variant="ghost" className="w-auto px-5">
        <Sparkles size={18} />
        Usar Campanha Pré-Pronta
      </Button>
    </header>
  );
}
