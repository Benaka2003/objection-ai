import { useState } from "react";
import { ToastProvider } from "./components/ToastProvider.jsx";
import { DashboardLayout } from "./layout/DashboardLayout.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Analytics } from "./pages/Analytics.jsx";
import { History } from "./pages/History.jsx";
import { Settings } from "./pages/Settings.jsx";

const PAGES = {
  dashboard: Dashboard,
  analytics: Analytics,
  history: History,
  settings: Settings,
};

export default function App() {
  const [page, setPage] = useState("dashboard");
  const Page = PAGES[page] || Dashboard;

  return (
    <ToastProvider>
      <DashboardLayout page={page} setPage={setPage}>
        <Page />
      </DashboardLayout>
    </ToastProvider>
  );
}
