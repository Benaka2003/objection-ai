import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { AnalyticsCards } from "../components/AnalyticsCards.jsx";
import { SkeletonBlock } from "../components/LoadingSkeleton.jsx";
import { ErrorBanner } from "../components/ErrorBanner.jsx";
import { useAnalytics } from "../hooks/useAnalytics.js";
import { CATEGORY_COLORS } from "../utils/constants.js";

export function Analytics() {
  const { data, loading, error, reload } = useAnalytics();

  const breakdown = data
    ? [
        { name: "Price", value: data.price ?? 0, key: "price" },
        { name: "Trust", value: data.trust ?? 0, key: "trust" },
        { name: "Timing", value: data.timing ?? 0, key: "timing" },
        { name: "Authority", value: data.authority ?? 0, key: "authority" },
      ]
    : [];

  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "8px 4px 60px" }}>
      <div style={{ marginBottom: 24, marginTop: 12 }}>
        <span className="mono" style={{ fontSize: 11.5, color: "var(--accent-blue)", letterSpacing: 1, textTransform: "uppercase" }}>
          Analytics
        </span>
        <h1 className="display" style={{ fontSize: 28, fontWeight: 700, margin: "8px 0 4px", letterSpacing: -0.6 }}>
          Objection breakdown
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Live data from your ObjectionAI backend.</p>
      </div>

      {loading && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <SkeletonBlock key={i} height={92} radius={18} />
          ))}
        </div>
      )}

      {error && !loading && <ErrorBanner title="Couldn't load analytics" message={error.message} onRetry={reload} />}

      {data && !loading && (
        <>
          <AnalyticsCards data={data} />

          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginTop: 18 }}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="glass"
              style={{ borderRadius: 22, padding: 22, minHeight: 320 }}
            >
              <span className="mono" style={{ fontSize: 11, color: "var(--text-faint)", letterSpacing: 0.5, textTransform: "uppercase" }}>
                By category
              </span>
              <div style={{ height: 270, marginTop: 8 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={breakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="name" stroke="var(--text-faint)" fontSize={12} tickLine={false} axisLine={{ stroke: "rgba(255,255,255,0.08)" }} />
                    <YAxis stroke="var(--text-faint)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ background: "#0F172A", border: "1px solid var(--border-strong)", borderRadius: 10, fontSize: 12.5 }}
                      cursor={{ fill: "rgba(255,255,255,0.03)" }}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {breakdown.map((b) => (
                        <Cell key={b.key} fill={CATEGORY_COLORS[b.key]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.4 }}
              className="glass"
              style={{ borderRadius: 22, padding: 22, minHeight: 320, display: "flex", flexDirection: "column" }}
            >
              <span className="mono" style={{ fontSize: 11, color: "var(--text-faint)", letterSpacing: 0.5, textTransform: "uppercase" }}>
                Share of total
              </span>
              <div style={{ flex: 1, display: "grid", placeItems: "center" }}>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={breakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                      {breakdown.map((b) => (
                        <Cell key={b.key} fill={CATEGORY_COLORS[b.key]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid var(--border-strong)", borderRadius: 10, fontSize: 12.5 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                {breakdown.map((b) => (
                  <div key={b.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: CATEGORY_COLORS[b.key] }} />
                    <span style={{ fontSize: 11.5, color: "var(--text-secondary)" }}>{b.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}
