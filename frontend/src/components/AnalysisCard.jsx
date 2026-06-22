import { motion } from "framer-motion";
import { formatConfidence } from "../utils/formatters.js";
import { IconTarget, IconHeart, IconShield } from "./Icons.jsx";

export function AnalysisCard({ result }) {
  const confidencePct = formatConfidence(result.confidence);

  const cards = [
    {
      label: "Category",
      value: result.category || "—",
      icon: IconTarget,
      color: "var(--accent-purple)",
      capitalize: true,
    },
    {
      label: "Emotional Root",
      value: result.emotionalRoot || "—",
      icon: IconHeart,
      color: "var(--accent-blue)",
    },
    {
      label: "Confidence",
      value: confidencePct !== null ? `${confidencePct}%` : "—",
      icon: IconShield,
      color: "var(--success)",
      large: true,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 14,
        marginTop: 18,
      }}
    >
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="glass"
            style={{ borderRadius: 18, padding: 20 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Icon width={15} height={15} color={c.color} />
              <span
                className="mono"
                style={{ fontSize: 10.5, letterSpacing: 0.6, color: "var(--text-faint)", textTransform: "uppercase" }}
              >
                {c.label}
              </span>
            </div>
            <div
              className="display"
              style={{
                fontSize: c.large ? 26 : 16,
                fontWeight: 600,
                color: "var(--text)",
                lineHeight: 1.3,
                textTransform: c.capitalize ? "capitalize" : "none",
              }}
            >
              {c.value}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
