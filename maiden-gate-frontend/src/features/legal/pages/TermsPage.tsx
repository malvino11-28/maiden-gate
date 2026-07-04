import LegalPage from "../components/LegalPage";
import { terms } from "../data/terms";

export default function TermsPage() {
  return <LegalPage {...terms} />;
}
