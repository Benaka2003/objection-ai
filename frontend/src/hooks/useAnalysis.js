import { useState, useRef, useEffect } from "react";
import { api } from "../api/api.js";
import { useToast } from "../components/ToastProvider.jsx";

/**
 * Drives the "analyse objection" flow used on the Dashboard:
 * staged thinking animation, the real POST /analyse call, and
 * error/result state. Staging is purely cosmetic — it advances on a
 * timer while the real request is in flight, and jumps to "done"
 * the moment the response actually arrives.
 */
export function useAnalysis() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [lastInput, setLastInput] = useState("");
  const stageTimer = useRef(null);

  useEffect(() => () => clearInterval(stageTimer.current), []);

  const runAnalysis = async (input) => {
    if (!input.trim() || loading) return;
    setLastInput(input);
    setLoading(true);
    setError(null);
    setResult(null);
    setStage(0);

    stageTimer.current = setInterval(() => {
      setStage((s) => (s < 2 ? s + 1 : s));
    }, 650);

    try {
      const data = await api.analyse(input.trim());
      clearInterval(stageTimer.current);
      setStage(3);
      await new Promise((r) => setTimeout(r, 280));
      setResult(data);
      toast.push("Analysis complete", "success");
    } catch (e) {
      clearInterval(stageTimer.current);
      setError(e);
      toast.push(e.kind === "network" ? "Can't reach the backend" : "Analysis failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const retry = () => runAnalysis(lastInput);

  return { loading, stage, result, error, runAnalysis, retry };
}
