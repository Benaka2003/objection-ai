import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { ToastProvider } from "./components/ToastProvider.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { DashboardLayout } from "./layout/DashboardLayout.jsx";
import { Analytics } from "./pages/Analytics.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { History } from "./pages/History.jsx";
import { Login } from "./pages/Login.jsx";
import { Notifications } from "./pages/Notifications.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Settings } from "./pages/Settings.jsx";
import { Signup } from "./pages/Signup.jsx";

const PAGE_KEYS = [
  "dashboard",
  "analytics",
  "history",
  "notifications",
  "profile",
  "settings",
];

function pageFromPath(pathname) {
  const seg = pathname.replace(/^\//, "") || "dashboard";
  return PAGE_KEYS.includes(seg) ? seg : "dashboard";
}

function AppShell() {
  const [page, setPage] = useState(() => pageFromPath(window.location.pathname));

  const PAGE_MAP = {
    dashboard:     Dashboard,
    analytics:     Analytics,
    history:       History,
    notifications: Notifications,
    profile:       Profile,
    settings:      Settings,
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
            <Route path="/login"         element={<Login />} />
            <Route path="/signup"        element={<Signup />} />
            <Route path="/"              element={<AppShell />} />
            <Route path="/analytics"     element={<AppShell />} />
            <Route path="/history"       element={<AppShell />} />
            <Route path="/notifications" element={<AppShell />} />
            <Route path="/profile"       element={<AppShell />} />
            <Route path="/settings"      element={<AppShell />} />
            <Route path="*"              element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}