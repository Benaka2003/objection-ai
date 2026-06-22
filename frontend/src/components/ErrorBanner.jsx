import { motion } from "framer-motion";
import { IconAlert } from "./Icons.jsx";

export function ErrorBanner({ title, message, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        padding: "14px 16px",
        borderRadius: 12,
        background: "rgba(248,113,113,0.08)",
        border: "1px solid rgba(248,113,113,0.25)",
      }}
    >
      <IconAlert color="var(--danger)" style={{ flexShrink: 0, marginTop: 1 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text)" }}>{title}</div>
        <div style={{ fontSize: 12.5, color: "var(--text-secondary)", marginTop: 2, lineHeight: 1.5 }}>{message}</div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--danger)",
            background: "rgba(248,113,113,0.12)",
            border: "1px solid rgba(248,113,113,0.3)",
            borderRadius: 8,
            padding: "6px 12px",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          Retry
        </button>
      )}
    </motion.div>
  );
}
