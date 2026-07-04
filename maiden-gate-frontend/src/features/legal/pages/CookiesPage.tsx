import LegalPage from "../components/LegalPage";
import { cookies } from "../data/cookies";
export default function CookiesPage() {
  return <LegalPage {...cookies} />;
}
