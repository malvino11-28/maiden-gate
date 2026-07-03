import { ArrowRight } from "lucide-react";

import Button from "../../../../../../shared/components/Button/Button";

type Props = {
  onNext: () => void;
};

export default function CampaignStepNavigation({ onNext }: Props) {
  return (
    <div className="mt-14 flex justify-end">
      <Button className="w-auto px-8 py-3" onClick={onNext}>
        Próximo: Localizações
        <ArrowRight size={18} />
      </Button>
    </div>
  );
}
