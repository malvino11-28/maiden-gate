import { SearchX } from "lucide-react";

import ErrorPageLayout from "../components/ErrorPageLayout";

export default function NotFoundPage() {
  return (
    <ErrorPageLayout
      code="404"
      title="Página não encontrada"
      description="A rota que você tentou acessar não existe, foi movida ou ainda não foi criada dentro do Maiden-Gate."
      icon={SearchX}
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
