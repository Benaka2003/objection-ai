import { StatusIndicator } from "../components/StatusIndicator.jsx";
import { IconBolt, IconBell, IconUser } from "../components/Icons.jsx";

export function Navbar({ health, onToggleSidebar }) {
  return (
    <header
      style={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px 4px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="glass"
        style={{
          flex: 1,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          borderRadius: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={onToggleSidebar}
            style={{
              width: 36,
              height: 36,
              display: "grid",
              placeItems: "center",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 12,
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 11,
                background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))",
                display: "grid",
                placeItems: "center",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 0 22px rgba(139,92,246,0.5)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <IconBolt color="#fff" width={15} height={15} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span className="display" style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.2 }}>
                ObjectionAI
              </span>
              <span className="mono" style={{ fontSize: 10.5, color: "var(--text-faint)", letterSpacing: 0.3 }}>
                WORKSPACE · DEFAULT
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <StatusIndicator status={health.status} onClick={health.recheck} />
          <button
            style={{
              width: 36,
              height: 36,
              display: "grid",
              placeItems: "center",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 12,
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            <IconBell />
          </button>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1e293b, #334155)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
              display: "grid",
              placeItems: "center",
              color: "var(--text-secondary)",
            }}
          >
            <IconUser width={16} height={16} />
          </div>
        </div>
      </div>
    </header>
  );
}
