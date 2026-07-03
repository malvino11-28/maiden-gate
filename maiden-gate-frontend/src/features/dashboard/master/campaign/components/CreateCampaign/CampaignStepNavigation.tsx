import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import Button from "../../../../../../shared/components/Button/Button";

type Props = {
  onNext?: () => void;
  onPrevious?: () => void;
  nextLabel?: string;
  finish?: boolean;
};

export default function CampaignStepNavigation({ onNext, onPrevious, nextLabel = "Próximo", finish = false }: Props) {
  return (
    <div className="mt-10 flex items-center justify-between border-t border-amber-900/20 pt-6">
      <Button variant="ghost" onClick={onPrevious} disabled={!onPrevious}>
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>

      <Button onClick={onNext}>
        {finish ? <CheckCircle2 className="h-4 w-4" /> : null}
        {nextLabel}
        {!finish ? <ArrowRight className="h-4 w-4" /> : null}
      </Button>
    </div>
  );
}
