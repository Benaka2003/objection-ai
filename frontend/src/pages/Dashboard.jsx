import { HeroInput } from "../components/HeroInput.jsx";
import { AnalysisCard } from "../components/AnalysisCard.jsx";
import { ResponseGrid } from "../components/ResponseGrid.jsx";
import { AnalysisThinking } from "../components/LoadingSkeleton.jsx";
import { ErrorBanner } from "../components/ErrorBanner.jsx";
import { useAnalysis } from "../hooks/useAnalysis.js";

export function Dashboard() {
  const { loading, stage, result, error, runAnalysis, retry } = useAnalysis();

  return (
    <div style={{ maxWidth: 920, margin: "0 auto", padding: "8px 4px 60px" }}>
      <div style={{ marginBottom: 28, marginTop: 12 }}>
        <span className="mono" style={{ fontSize: 11.5, color: "var(--accent-purple)", letterSpacing: 1, textTransform: "uppercase" }}>
          Objection intelligence
        </span>
        <h1
          className="display"
          style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700,
            letterSpacing: -1,
            margin: "8px 0 10px",
            lineHeight: 1.08,
          }}
        >
          Turn objections into{" "}
          <span
            style={{
              background: "linear-gradient(90deg, var(--accent-purple), var(--accent-blue))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            opportunities.
          </span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15, maxWidth: 480, lineHeight: 1.6 }}>
          AI-powered objection intelligence for modern sales teams.
        </p>
      </div>

      <HeroInput onAnalyse={runAnalysis} loading={loading} />

      {loading && <AnalysisThinking stage={stage} />}

      {error && !loading && (
        <div style={{ marginTop: 18 }}>
          <ErrorBanner
            title={error.kind === "network" ? "Backend unreachable" : "Analysis failed"}
            message={error.message}
            onRetry={retry}
          />
        </div>
      )}

      {result && !loading && (
        <>
          <AnalysisCard result={result} />
          <ResponseGrid responses={result.responses} />
        </>
      )}
    </div>
  );
}
