import { useState } from "react";
import { motion } from "framer-motion";
import { STYLE_THEME } from "../utils/constants.js";
import { STYLE_ICONS, IconCopy, IconCheck, IconExpand } from "./Icons.jsx";

export function ResponseCard({ item, index }) {
  const theme = STYLE_THEME[item.style] || STYLE_THEME.logical;
  const Icon = STYLE_ICONS[item.style] || STYLE_ICONS.logical;
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.response);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      /* clipboard access denied — silently no-op, copy button just won't confirm */
    }
  };

  const isLong = item.response && item.response.length > 220;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: 0.15 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="glass"
      style={{
        borderRadius: 18,
        padding: 22,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = theme.color + "66";
        e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.04), 0 0 0 1px ${theme.color}33, 0 20px 48px -14px ${theme.glow}, 0 24px 48px -16px rgba(0,0,0,0.55)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: theme.glow,
          filter: "blur(50px)",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 9,
              display: "grid",
              placeItems: "center",
              background: theme.bg,
              border: `1px solid ${theme.color}33`,
              color: theme.color,
            }}
          >
            <Icon width={15} height={15} />
          </div>
          <span className="display" style={{ fontWeight: 600, fontSize: 14.5, color: theme.color }}>
            {theme.label}
          </span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={() => setExpanded((e) => !e)}
            title="Expand"
            style={{
              width: 28,
              height: 28,
              display: "grid",
              placeItems: "center",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            <IconExpand />
          </button>
          <button
            onClick={handleCopy}
            title="Copy response"
            style={{
              width: 28,
              height: 28,
              display: "grid",
              placeItems: "center",
              background: copied ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${copied ? "rgba(16,185,129,0.4)" : "var(--border)"}`,
              borderRadius: 8,
              color: copied ? "var(--success)" : "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            {copied ? <IconCheck /> : <IconCopy />}
          </button>
        </div>
      </div>

      <p
        style={{
          fontSize: 13.5,
          lineHeight: 1.65,
          color: "var(--text)",
          margin: 0,
          display: "-webkit-box",
          WebkitLineClamp: expanded ? "unset" : 6,
          WebkitBoxOrient: "vertical",
          overflow: expanded ? "visible" : "hidden",
        }}
      >
        {item.response}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded((e) => !e)}
          style={{
            alignSelf: "flex-start",
            background: "none",
            border: "none",
            color: theme.color,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            padding: 0,
          }}
        >
          {expanded ? "Show less" : "Read full response"}
        </button>
      )}
    </motion.div>
  );
}
