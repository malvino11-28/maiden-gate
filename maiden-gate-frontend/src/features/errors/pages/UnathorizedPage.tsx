import { LockKeyhole } from "lucide-react";

import ErrorPageLayout from "../components/ErrorPageLayout";

export default function UnauthorizedPage() {
  return (
    <ErrorPageLayout
      code="401"
      title="Acesso não autenticado"
      description="Você precisa estar logado para acessar esta página. Entre na sua conta para continuar sua jornada no Maiden-Gate."
      icon={LockKeyhole}
      primaryAction={{
        label: "Fazer login",
        to: "/",
      }}
      secondaryAction={{
        label: "Voltar ao início",
        to: "/",
      }}
    />
  );
}
