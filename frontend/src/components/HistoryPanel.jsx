import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timeAgo } from "../utils/formatters.js";
import { STYLE_THEME, CATEGORY_COLORS } from "../utils/constants.js";
import { STYLE_ICONS } from "./Icons.jsx";

function HistoryDetail({ item, onClose }) {
  if (!item) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(2,4,12,0.7)",
          backdropFilter: "blur(4px)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          onClick={(e) => e.stopPropagation()}
          className="glass"
          style={{ borderRadius: 24, padding: 28, maxWidth: 640, width: "100%", maxHeight: "82vh", overflowY: "auto" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <span className="mono" style={{ fontSize: 11, color: "var(--accent-purple)", textTransform: "uppercase" }}>
                {item.category || "objection"}
              </span>
              <p style={{ fontSize: 16, fontWeight: 600, marginTop: 6, lineHeight: 1.4 }}>{item.input || item.objection || "—"}</p>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 30,
                height: 30,
                display: "grid",
                placeItems: "center",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--text-secondary)",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>

          {item.emotionalRoot && (
            <div style={{ marginBottom: 16 }}>
              <span className="mono" style={{ fontSize: 10.5, color: "var(--text-faint)", textTransform: "uppercase" }}>
                Emotional root
              </span>
              <p style={{ fontSize: 13.5, color: "var(--text-secondary)", marginTop: 4 }}>{item.emotionalRoot}</p>
            </div>
          )}

          {Array.isArray(item.responses) && item.responses.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {item.responses.map((r, i) => {
                const theme = STYLE_THEME[r.style] || STYLE_THEME.logical;
                return (
                  <div
                    key={i}
                    style={{
                      padding: 14,
                      borderRadius: 12,
                      background: theme.bg,
                      border: `1px solid ${theme.color}33`,
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 700, color: theme.color }}>{theme.label}</span>
                    <p style={{ fontSize: 13, color: "var(--text)", marginTop: 6, lineHeight: 1.55 }}>{r.response}</p>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function HistoryPanel({ items }) {
  const [selected, setSelected] = useState(null);

  if (!items || items.length === 0) {
    return (
      <div className="glass" style={{ borderRadius: 22, padding: 40, textAlign: "center" }}>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
          No objections analysed yet. Run your first analysis from the Dashboard.
        </p>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item, i) => {
          const accent = CATEGORY_COLORS[item.category] || "var(--accent-purple)";
          return (
            <motion.button
              key={item.id || item.objectionId || i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              onClick={() => setSelected(item)}
              className="glass"
              style={{
                textAlign: "left",
                cursor: "pointer",
                borderRadius: 16,
                padding: "15px 17px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: accent, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: "var(--text)",
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.input || item.objection || "Untitled objection"}
                </p>
                <span className="mono" style={{ fontSize: 11, color: "var(--text-faint)", textTransform: "capitalize" }}>
                  {item.category || "uncategorized"}
                </span>
              </div>
              <span className="mono" style={{ fontSize: 11.5, color: "var(--text-faint)", flexShrink: 0 }}>
                {timeAgo(item.timestamp || item.createdAt)}
              </span>
            </motion.button>
          );
        })}
      </div>

      <HistoryDetail item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
