import { StatusIndicator } from "../components/StatusIndicator.jsx";
import { IconBolt, IconBell, IconUser } from "../components/Icons.jsx";

function IconLogout(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function Navbar({ health, onToggleSidebar, user, onLogout }) {
  const initials = user?.email ? user.email[0].toUpperCase() : "?";

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

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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

          {/* User avatar with email tooltip */}
          <div
            title={user?.email || ""}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent-violet), var(--accent-blue))",
              border: "1px solid rgba(255,255,255,0.22)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              cursor: "default",
            }}
          >
            {initials}
          </div>

          {/* Logout button */}
          <button
            onClick={onLogout}
            title="Sign out"
            style={{
              height: 36,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "0 12px",
              background: "rgba(248,113,113,0.07)",
              border: "1px solid rgba(248,113,113,0.2)",
              borderRadius: 12,
              color: "var(--danger)",
              cursor: "pointer",
              fontSize: 12.5,
              fontWeight: 600,
              transition: "background 0.18s, border-color 0.18s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(248,113,113,0.15)";
              e.currentTarget.style.borderColor = "rgba(248,113,113,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(248,113,113,0.07)";
              e.currentTarget.style.borderColor = "rgba(248,113,113,0.2)";
            }}
          >
            <IconLogout />
            <span style={{ display: "var(--logout-label-display, inline)" }}>Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
