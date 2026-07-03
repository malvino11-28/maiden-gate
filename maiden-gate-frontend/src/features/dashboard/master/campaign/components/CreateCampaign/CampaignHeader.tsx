import { ArrowLeft, BookOpen, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../../../../../../shared/components/Button/Button";

export default function CampaignHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-amber-900/30 bg-black/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <Link
        to="/dashboard/master"
        className="flex items-center gap-2 text-sm text-amber-100/60 transition-colors hover:text-amber-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao Painel
      </Link>

      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-rose-600">
          <BookOpen className="h-5 w-5 text-white" />
        </div>
        <span className="hidden font-semibold text-amber-100 sm:inline">
          Nova Campanha
        </span>
      </div>

      <Button variant="ghost" size="sm" className="border border-amber-900/30">
        <Wand2 className="h-4 w-4" />
        <span className="hidden sm:inline">Usar Campanha Pré-Pronta</span>
        <span className="sm:hidden">Pré-Pronta</span>
      </Button>
    </header>
  );
}
