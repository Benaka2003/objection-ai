import { useCallback, useEffect, useState } from "react";
import { api } from "../api/api.js";
import { ErrorBanner } from "../components/ErrorBanner.jsx";
import { HistoryPanel } from "../components/HistoryPanel.jsx";
import { SkeletonBlock } from "../components/LoadingSkeleton.jsx";
import { useToast } from "../components/ToastProvider.jsx";

export function History() {
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const d = await api.history();

      const list = Array.isArray(d)
        ? d
        : d.items || d.history || [];

      list.sort((a, b) => {
        const ta =
          a.createdAt?._seconds ||
          new Date(a.createdAt || a.timestamp || 0).getTime();

        const tb =
          b.createdAt?._seconds ||
          new Date(b.createdAt || b.timestamp || 0).getTime();

        return tb - ta;
      });

      setItems(list);
    } catch (e) {
      setError(e);
      toast.push("Couldn't load history", "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "8px 4px 60px",
      }}
    >
      <div
        style={{
          marginBottom: 22,
          marginTop: 12,
        }}
      >
        <span
          className="mono"
          style={{
            fontSize: 11.5,
            color: "var(--accent-blue)",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          History
        </span>

        <h1
          className="display"
          style={{
            fontSize: 28,
            fontWeight: 700,
            margin: "8px 0 4px",
            letterSpacing: -0.6,
          }}
        >
          Recent objections
        </h1>

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: 14,
          }}
        >
          Click any entry to see the full analysis.
        </p>
      </div>

      {loading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <SkeletonBlock
              key={i}
              height={64}
              radius={16}
            />
          ))}
        </div>
      )}

      {error && !loading && (
        <ErrorBanner
          title="Couldn't load history"
          message={error.message}
          onRetry={load}
        />
      )}

      {items && !loading && (
        <HistoryPanel items={items} />
      )}
    </div>
  );
}