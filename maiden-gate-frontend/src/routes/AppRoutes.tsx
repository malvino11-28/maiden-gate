import { Routes, Route } from "react-router-dom";

import MainLayout from "../shared/layouts/MainLayout";

import HomePage from "../features/home/pages/HomePage";
import RulesPage from "../features/rules/pages/RulesPage";
import ToolsPage from "../features/tools/pages/ToolsPage";
import ContactPage from "../features/contact/pages/ContactPage";

import PrivacyPage from "../features/legal/pages/PrivacyPage";
import TermsPage from "../features/legal/pages/TermsPage";
import CookiesPage from "../features/legal/pages/CookiesPage";

import MasterDashboard from "../features/dashboard/master/pages/MasterDashboard";
import PlayerDashboard from "../features/dashboard/player/pages/PlayerDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
      </Route>

      <Route path="/dashboard/master" element={<MasterDashboard />} />
      <Route path="/dashboard/player" element={<PlayerDashboard />} />
    </Routes>
  );
}
