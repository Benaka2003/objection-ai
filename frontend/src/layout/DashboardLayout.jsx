import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";
import { useHealth } from "../hooks/useHealth.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../components/ToastProvider.jsx";

export function DashboardLayout({ page, setPage, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const health = useHealth();
  const { user, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      toast.push("Signed out successfully.", "success");
      navigate("/login", { replace: true });
    } catch (err) {
      toast.push("Failed to sign out. Please try again.", "error");
    }
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Navbar
        health={health}
        onToggleSidebar={() => setCollapsed((c) => !c)}
        user={user}
        onLogout={handleLogout}
      />
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar page={page} setPage={setPage} collapsed={collapsed} />
        <main style={{ flex: 1, overflowY: "auto", padding: "4px 28px 0" }}>
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
