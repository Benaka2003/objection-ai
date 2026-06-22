import { API_BASE } from "../utils/constants.js";

export function Settings() {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "8px 4px 60px" }}>
      <div style={{ marginBottom: 22, marginTop: 12 }}>
        <span className="mono" style={{ fontSize: 11.5, color: "var(--accent-blue)", letterSpacing: 1, textTransform: "uppercase" }}>
          Settings
        </span>
        <h1 className="display" style={{ fontSize: 28, fontWeight: 700, margin: "8px 0 4px", letterSpacing: -0.6 }}>
          Workspace
        </h1>
      </div>

      <div className="glass" style={{ borderRadius: 22, padding: 22, display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <span className="mono" style={{ fontSize: 10.5, color: "var(--text-faint)", textTransform: "uppercase" }}>
            API base URL
          </span>
          <div
            className="mono"
            style={{
              fontSize: 13.5,
              color: "var(--text)",
              marginTop: 6,
              padding: "10px 12px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border)",
              borderRadius: 9,
            }}
          >
            {API_BASE}
          </div>
          <p style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 6, lineHeight: 1.5 }}>
            ObjectionAI calls this address directly from your browser. Make sure the backend is running locally and
            reachable from this device.
          </p>
        </div>
      </div>
    </div>
  );
}
