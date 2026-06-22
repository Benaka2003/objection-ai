import { motion } from "framer-motion";
import { NAV_ITEMS } from "../utils/constants.js";
import { IconGrid, IconBar, IconClock, IconSettings, IconShield } from "../components/Icons.jsx";

const ICONS = {
  dashboard: IconGrid,
  analytics: IconBar,
  history: IconClock,
  settings: IconSettings,
};

export function Sidebar({ page, setPage, collapsed }) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 84 : 240 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="glass"
      style={{
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        padding: "18px 12px",
        margin: "4px 0 16px 16px",
        borderRadius: 20,
        gap: 4,
        overflow: "hidden",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const Icon = ICONS[item.key];
        const active = page === item.key;
        return (
          <button
            key={item.key}
            onClick={() => setPage(item.key)}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: collapsed ? "11px 0" : "11px 14px",
              justifyContent: collapsed ? "center" : "flex-start",
              borderRadius: 13,
              border: active ? "1px solid rgba(255,255,255,0.14)" : "1px solid transparent",
              cursor: "pointer",
              background: active
                ? "linear-gradient(135deg, rgba(124,58,237,0.28), rgba(59,130,246,0.14))"
                : "transparent",
              boxShadow: active ? "inset 0 1px 0 rgba(255,255,255,0.14), 0 8px 20px -10px rgba(124,58,237,0.5)" : "none",
              color: active ? "var(--text)" : "var(--text-secondary)",
              transition: "background 0.18s, color 0.18s, border-color 0.18s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.background = "transparent";
            }}
          >
            <Icon />
            {!collapsed && <span style={{ fontSize: 13.5, fontWeight: 500 }}>{item.label}</span>}
          </button>
        );
      })}

      <div style={{ flex: 1 }} />

      <div
        style={{
          padding: collapsed ? 10 : 14,
          borderRadius: 15,
          border: "1px solid rgba(255,255,255,0.10)",
          background: "linear-gradient(135deg, rgba(124,58,237,0.14), rgba(59,130,246,0.06))",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
          display: collapsed ? "grid" : "flex",
          placeItems: collapsed ? "center" : undefined,
          flexDirection: collapsed ? undefined : "column",
          gap: 6,
        }}
      >
        {!collapsed ? (
          <>
            <span className="mono" style={{ fontSize: 10.5, color: "var(--accent-purple)", letterSpacing: 0.4 }}>
              BACKEND
            </span>
            <span style={{ fontSize: 11.5, color: "var(--text-faint)" }}>localhost:3001</span>
          </>
        ) : (
          <IconShield width={16} height={16} color="var(--accent-purple)" />
        )}
      </div>
    </motion.aside>
  );
}
