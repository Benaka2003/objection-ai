import { IconCheck } from "./Icons.jsx";

export function SkeletonBlock({ height = 16, width = "100%", radius = 6, style = {} }) {
  return <div className="shimmer" style={{ height, width, borderRadius: radius, ...style }} />;
}

const THINKING_STAGES = ["Reading objection", "Detecting category", "Finding emotional root", "Generating responses"];

export function AnalysisThinking({ stage }) {
  return (
    <div className="glass" style={{ borderRadius: 22, padding: 26, marginTop: 18 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {THINKING_STAGES.map((s, i) => {
          const isDone = i < stage;
          const isActive = i === stage;
          return (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "grid",
                  placeItems: "center",
                  border: `1.5px solid ${isDone ? "var(--success)" : isActive ? "var(--accent-purple)" : "var(--border)"}`,
                  background: isDone ? "rgba(16,185,129,0.15)" : "transparent",
                }}
              >
                {isDone ? (
                  <IconCheck color="var(--success)" width={10} height={10} />
                ) : isActive ? (
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "var(--accent-purple)",
                      animation: "spin 1s linear infinite, pulse-dot 1s infinite",
                    }}
                  />
                ) : (
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--text-faint)" }} />
                )}
              </div>
              <span
                style={{
                  fontSize: 13.5,
                  color: isDone ? "var(--text-secondary)" : isActive ? "var(--text)" : "var(--text-faint)",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {s}
                {isActive ? "…" : ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
