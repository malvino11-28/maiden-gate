import HeaderLogin from "../../../shared/HeaderLogin/HeaderLogin";
import Footer from "../../../shared/components/Footer/Footer";
import RoleRulesPage from "../components/RoleRulesPage";

export default function PlayerRulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <HeaderLogin />

      <RoleRulesPage role="player" />

      <Footer />
    </div>
  );
}
