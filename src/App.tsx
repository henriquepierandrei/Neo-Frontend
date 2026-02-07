// App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./hooks/ThemeProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { ProfileProvider } from "./contexts/UserContext"; // 👈 IMPORTAR

import DashboardLayout from "./pages/dashboardpages/DashboardLayout";
import Login from "./pages/authpages/Login";
import Register from "./pages/authpages/Register";
import EmailValidation from "./pages/authpages/EmailValidation";
import PrincingSection from "./pages/homepages/PrincingSection";
import RankingPage from "./pages/homepages/RankingPage";
import Home from "./pages/homepages/Home";

import DashboardSettings from "./pages/dashboardpages/DashboardSettings";
import LogsPremium from "./pages/dashboardpages/LogsPremium";
import DashboardLinks from "./pages/dashboardpages/DashboardLinks";
import DashboardSocial from "./pages/dashboardpages/DashboardSocial";
import DashboardCustomization from "./pages/dashboardpages/DashboardCustomization";
import DashboardInventory from "./pages/dashboardpages/DashboardInventory";
import DashboardTags from "./pages/dashboardpages/DashboardTags";
import DashboardAssets from "./pages/dashboardpages/DashboardAssets";
import DashboardStart from "./pages/dashboardpages/DashboardStart";
import DashboardStore from "./pages/dashboardpages/DashboardStore";

import TitleManager from "./types/TitleManager";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          {/* 👇 ProfileProvider DENTRO do AuthProvider (pois usa useAuth) */}
          <ProfileProvider>
            <TitleManager />

            <div className="min-h-screen transition-colors duration-300">
              <main>
                <Routes>
                  {/* Rotas públicas */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/validate-email" element={<EmailValidation />} />
                  <Route path="/plans" element={<PrincingSection />} />
                  <Route path="/ranking" element={<RankingPage />} />

                  {/* Dashboard protegido */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <DashboardStart />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/dashboard/start"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <DashboardStart />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/dashboard/settings"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <DashboardSettings />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/dashboard/tags"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <DashboardTags />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/dashboard/logs"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <LogsPremium />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/dashboard/links"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <DashboardLinks />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/dashboard/socialmedia"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <DashboardSocial />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/dashboard/store"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <DashboardStore />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/dashboard/assets"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <DashboardAssets />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/dashboard/inventory"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <DashboardInventory />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/dashboard/customization"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <DashboardCustomization />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
              </main>
            </div>
          </ProfileProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;