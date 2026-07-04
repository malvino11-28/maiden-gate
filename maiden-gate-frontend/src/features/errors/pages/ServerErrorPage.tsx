import { ServerCrash } from "lucide-react";

import ErrorPageLayout from "../components/ErrorPageLayout";

export default function ServerErrorPage() {
  return (
    <ErrorPageLayout
      code="500"
      title="Erro interno"
      description="Algo deu errado ao carregar ou processar esta página. Tente novamente em alguns instantes."
      icon={ServerCrash}
      primaryAction={{
        label: "Voltar ao início",
        to: "/",
      }}
      secondaryAction={{
        label: "Ir ao painel",
        to: "/dashboard/player",
      }}
    />
  );
}
