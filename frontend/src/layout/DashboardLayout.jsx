import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";
import { useHealth } from "../hooks/useHealth.js";

export function DashboardLayout({ page, setPage, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const health = useHealth();

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Navbar health={health} onToggleSidebar={() => setCollapsed((c) => !c)} />
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
