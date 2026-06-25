import { motion } from "framer-motion";
import { useState } from "react";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "analysis",
    title: "Analysis complete",
    body: "Your objection \"Price is too high\" has been analysed.",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "tip",
    title: "Pro tip",
    body: "Try the Assertive response style for budget objections — it closes 23% faster.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "system",
    title: "Backend connected",
    body: "ObjectionAI successfully connected to your backend at localhost:3001.",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "analysis",
    title: "Analysis complete",
    body: "Your objection \"We already have a solution\" has been analysed.",
    time: "Yesterday",
    read: true,
  },
];

const TYPE_STYLE = {
  analysis: { color: "var(--accent-purple)", bg: "rgba(139,92,246,0.12)", label: "Analysis" },
  tip:      { color: "var(--success)",       bg: "rgba(16,185,129,0.12)",  label: "Tip" },
  system:   { color: "var(--accent-blue)",   bg: "rgba(59,130,246,0.12)", label: "System" },
};

export function Notifications() {
  const [items, setItems] = useState(MOCK_NOTIFICATIONS);

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function dismiss(id) {
    setItems((prev) => prev.filter((n) => n.id !== id));
  }

  const unread = items.filter((n) => !n.read).length;

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "8px 4px 60px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24, marginTop: 12 }}>
        <div>
          <span className="mono" style={{ fontSize: 11.5, color: "var(--accent-purple)", letterSpacing: 1, textTransform: "uppercase" }}>
            Inbox
          </span>
          <h1 className="display" style={{ fontSize: 28, fontWeight: 700, margin: "8px 0 4px", letterSpacing: -0.6 }}>
            Notifications
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, margin: 0 }}>
            {unread > 0 ? `${unread} unread` : "All caught up"}
          </p>
        </div>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            style={{
              fontSize: 12.5, fontWeight: 600,
              color: "var(--accent-purple)",
              background: "rgba(139,92,246,0.10)",
              border: "1px solid rgba(139,92,246,0.25)",
              borderRadius: 10, padding: "7px 14px",
              cursor: "pointer",
            }}
          >
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      {items.length === 0 ? (
        <div className="glass" style={{ borderRadius: 20, padding: 48, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🎉</div>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>No notifications. You're all caught up!</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((n, i) => {
            const style = TYPE_STYLE[n.type] || TYPE_STYLE.system;
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="glass"
                style={{
                  borderRadius: 16,
                  padding: "16px 18px",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  opacity: n.read ? 0.65 : 1,
                  borderColor: !n.read ? "rgba(255,255,255,0.16)" : undefined,
                }}
              >
                {/* Dot / read indicator */}
                <div style={{ paddingTop: 4, flexShrink: 0 }}>
                  <span style={{
                    display: "block",
                    width: 8, height: 8, borderRadius: "50%",
                    background: n.read ? "rgba(255,255,255,0.15)" : style.color,
                    boxShadow: n.read ? "none" : `0 0 8px ${style.color}`,
                  }} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600,
                      color: style.color,
                      background: style.bg,
                      borderRadius: 6, padding: "2px 8px",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: 0.3,
                    }}>
                      {style.label}
                    </span>
                    <span className="mono" style={{ fontSize: 11, color: "var(--text-faint)" }}>{n.time}</span>
                  </div>
                  <p style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text)", margin: "0 0 4px" }}>{n.title}</p>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>{n.body}</p>
                </div>

                {/* Dismiss */}
                <button
                  onClick={() => dismiss(n.id)}
                  style={{
                    flexShrink: 0, width: 26, height: 26,
                    display: "grid", placeItems: "center",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    color: "var(--text-faint)",
                    cursor: "pointer", fontSize: 14,
                  }}
                >
                  ✕
                </button>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}