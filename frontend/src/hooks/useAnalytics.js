import { useState, useEffect, useCallback } from "react";
import { api } from "../api/api.js";
import { useToast } from "../components/ToastProvider.jsx";

/**
 * Loads GET /analytics on mount and exposes loading/error state plus
 * a manual reload function for the Retry button.
 */
export function useAnalytics() {
  const toast = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const d = await api.analytics();
      setData(d);
    } catch (e) {
      setError(e);
      toast.push("Couldn't load analytics", "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
