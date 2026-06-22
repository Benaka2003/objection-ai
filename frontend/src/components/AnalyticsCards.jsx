import { motion } from "framer-motion";

function StatCard({ label, value, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="glass"
      style={{ borderRadius: 18, padding: "18px 20px", position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: color,
          opacity: 0.12,
          filter: "blur(30px)",
        }}
      />
      <span className="mono" style={{ fontSize: 10.5, color: "var(--text-faint)", letterSpacing: 0.6, textTransform: "uppercase" }}>
        {label}
      </span>
      <div className="display" style={{ fontSize: 30, fontWeight: 700, marginTop: 6, color: "var(--text)" }}>
        {value}
      </div>
    </motion.div>
  );
}

export function AnalyticsCards({ data }) {
  if (!data) return null;

  const cards = [
    { label: "Total Analyses", value: data.totalAnalyses ?? 0, color: "#8B5CF6" },
    { label: "Price", value: data.price ?? 0, color: "#8B5CF6" },
    { label: "Trust", value: data.trust ?? 0, color: "#3B82F6" },
    { label: "Timing", value: data.timing ?? 0, color: "#10B981" },
    { label: "Authority", value: data.authority ?? 0, color: "#FB923C" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 14 }}>
      {cards.map((c, i) => (
        <StatCard key={c.label} {...c} index={i} />
      ))}
    </div>
  );
}
