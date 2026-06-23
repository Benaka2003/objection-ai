import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CATEGORY_COLORS, STYLE_THEME } from "../utils/constants.js";
import { timeAgo } from "../utils/formatters.js";

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
          style={{
            borderRadius: 24,
            padding: 28,
            maxWidth: 700,
            width: "100%",
            maxHeight: "82vh",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 16,
            }}
          >
            <div>
              <span
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--accent-purple)",
                  textTransform: "uppercase",
                }}
              >
                {item.category || "objection"}
              </span>

              <p
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  marginTop: 6,
                  lineHeight: 1.4,
                }}
              >
                {item.input || item.objection || "—"}
              </p>
            </div>

            <button
              onClick={onClose}
              style={{
                width: 32,
                height: 32,
                display: "grid",
                placeItems: "center",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--text-secondary)",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          {item.emotionalRoot && (
            <div style={{ marginBottom: 18 }}>
              <span
                className="mono"
                style={{
                  fontSize: 10.5,
                  color: "var(--text-faint)",
                  textTransform: "uppercase",
                }}
              >
                Emotional Root
              </span>

              <p
                style={{
                  fontSize: 13.5,
                  color: "var(--text-secondary)",
                  marginTop: 4,
                }}
              >
                {item.emotionalRoot}
              </p>
            </div>
          )}

          {Array.isArray(item.responses) && item.responses.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {item.responses.map((r, i) => {
                const theme =
                  STYLE_THEME[r.style] || STYLE_THEME.logical;

                return (
                  <div
                    key={i}
                    style={{
                      padding: 16,
                      borderRadius: 14,
                      background: theme.bg,
                      border: `1px solid ${theme.color}33`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: theme.color,
                      }}
                    >
                      {theme.label}
                    </span>

                    <p
                      style={{
                        fontSize: 13.5,
                        color: "var(--text)",
                        marginTop: 8,
                        lineHeight: 1.6,
                      }}
                    >
                      {r.response}
                    </p>
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
      <div
        className="glass"
        style={{
          borderRadius: 22,
          padding: 40,
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: 14,
          }}
        >
          No objections analysed yet. Run your first analysis from the Dashboard.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {items.map((item, i) => {
          const accent =
            CATEGORY_COLORS[item.category] ||
            "var(--accent-purple)";

          return (
            <motion.button
              key={item.id || item.objectionId || i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.04,
                duration: 0.3,
              }}
              onClick={() => setSelected(item)}
              className="glass"
              style={{
                textAlign: "left",
                cursor: "pointer",
                borderRadius: 16,
                padding: "16px 18px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: accent,
                  flexShrink: 0,
                }}
              />

              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text)",
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.input ||
                    item.objection ||
                    "Untitled objection"}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 5,
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: "var(--text-faint)",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.category || "uncategorized"}
                  </span>

                  <span
                    style={{
                      color: "var(--text-faint)",
                      fontSize: 10,
                    }}
                  >
                    •
                  </span>

                  <span
                    style={{
                      color: "var(--text-faint)",
                      fontSize: 10,
                    }}
                  >
                    {timeAgo(item.createdAt || item.timestamp)}
                  </span>
                </div>
              </div>

              <span
                style={{
                  color: "var(--text-secondary)",
                  fontSize: 11,
                  maxWidth: 240,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {item.responses?.[0]?.response
                  ? `${item.responses[0].response.substring(
                      0,
                      80
                    )}${
                      item.responses[0].response.length > 80
                        ? "..."
                        : ""
                    }`
                  : "No response"}
              </span>
            </motion.button>
          );
        })}
      </div>

      <HistoryDetail
        item={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}