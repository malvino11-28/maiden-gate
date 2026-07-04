import { ShieldAlert } from "lucide-react";

import ErrorPageLayout from "../components/ErrorPageLayout";

export default function ForbiddenPage() {
  return (
    <ErrorPageLayout
      code="403"
      title="Acesso negado"
      description="Você está logado, mas não possui permissão para acessar esta área. Algumas páginas são exclusivas para Mestres ou Jogadores."
      icon={ShieldAlert}
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
