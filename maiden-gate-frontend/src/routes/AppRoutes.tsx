import { Routes, Route } from "react-router-dom";

import MainLayout from "../shared/layouts/MainLayout";
import DashboardLayout from "../shared/layouts/DashboardLayout";

import HomePage from "../features/home/pages/HomePage";
import RulesPage from "../features/rules/pages/RulesPage";
import ToolsPage from "../features/tools/pages/ToolsPage";
import ContactPage from "../features/contact/pages/ContactPage";

import PrivacyPage from "../features/legal/pages/PrivacyPage";
import TermsPage from "../features/legal/pages/TermsPage";
import CookiesPage from "../features/legal/pages/CookiesPage";

import MasterDashboard from "../features/dashboard/master/pages/MasterDashboard";
import PlayerDashboard from "../features/dashboard/player/pages/PlayerDashboard";
import PlayerCampaignPage from "../features/dashboard/player/pages/PlayerCampaignPage";
import CreateCharacterPage from "../features/dashboard/player/pages/CreateCharacterPage";
import EditCharacterPage from "../features/dashboard/player/pages/EditCharacterPage";
import CreateCampaignPage from "../features/dashboard/master/campaign/CreateCampaignPage";
import MasterCampaignPage from "../features/dashboard/master/pages/MasterCampaignPage";

import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

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

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route element={<RoleProtectedRoute allowedRole="master" />}>
            <Route path="/dashboard/master" element={<MasterDashboard />} />
          </Route>

          <Route element={<RoleProtectedRoute allowedRole="player" />}>
            <Route path="/dashboard/player" element={<PlayerDashboard />} />
            <Route
              path="/dashboard/player/campaign/:id"
              element={<PlayerCampaignPage />}
            />
            <Route
              path="/dashboard/player/character/new"
              element={<CreateCharacterPage />}
            />
            <Route
              path="/dashboard/player/character/:id/edit"
              element={<EditCharacterPage />}
            />
          </Route>
        </Route>

        <Route element={<RoleProtectedRoute allowedRole="master" />}>
          <Route
            path="/dashboard/master/create-campaign"
            element={<CreateCampaignPage />}
          />
          <Route
            path="/dashboard/master/campaign/:id"
            element={<MasterCampaignPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
