const STATUS_CONFIG = {
  checking: { label: "Checking", color: "var(--text-secondary)" },
  online: { label: "AI Online", color: "var(--success)" },
  offline: { label: "AI Offline", color: "var(--danger)" },
};

export function StatusIndicator({ status, onClick }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.checking;

  return (
    <button
      onClick={onClick}
      title="Backend health · GET /health"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 13px 7px 11px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
        cursor: "pointer",
        color: "var(--text-secondary)",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: cfg.color,
          animation: status === "checking" ? "pulse-dot 1.2s infinite" : status === "online" ? "pulse-dot 2.4s infinite" : "none",
          boxShadow: status === "online" ? `0 0 8px ${cfg.color}` : "none",
        }}
      />
      <span className="mono" style={{ fontSize: 12, letterSpacing: 0.2 }}>
        {cfg.label}
      </span>
    </button>
  );
}
