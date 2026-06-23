import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastProvider } from "./components/ToastProvider.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { DashboardLayout } from "./layout/DashboardLayout.jsx";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Analytics } from "./pages/Analytics.jsx";
import { History } from "./pages/History.jsx";
import { Settings } from "./pages/Settings.jsx";

const PAGE_KEYS = ["dashboard", "analytics", "history", "settings"];

function pageFromPath(pathname) {
  const seg = pathname.replace(/^\//, "") || "dashboard";
  return PAGE_KEYS.includes(seg) ? seg : "dashboard";
}

// Thin wrapper that keeps sidebar/page state in sync with the URL
// while still using the state-based DashboardLayout the rest of the
// app was built around (no per-route component swapping needed).
function AppShell() {
  const [page, setPage] = useState(() => pageFromPath(window.location.pathname));

  const PAGE_MAP = {
    dashboard: Dashboard,
    analytics: Analytics,
    history: History,
    settings: Settings,
  };
  const Page = PAGE_MAP[page] || Dashboard;

  return (
    <ProtectedRoute>
      <DashboardLayout page={page} setPage={setPage}>
        <Page />
      </DashboardLayout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<AppShell />} />
            <Route path="/analytics" element={<AppShell />} />
            <Route path="/history" element={<AppShell />} />
            <Route path="/settings" element={<AppShell />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
