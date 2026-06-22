import { useState, useEffect, useCallback } from "react";
import { api } from "../api/api.js";

const POLL_INTERVAL_MS = 15000;

/**
 * Tracks live backend health via GET /health, polling on an interval.
 * Returns the current status ("checking" | "online" | "offline"),
 * the last check time, and a manual recheck function.
 */
export function useHealth() {
  const [status, setStatus] = useState("checking");
  const [lastChecked, setLastChecked] = useState(null);

  const check = useCallback(async () => {
    try {
      await api.health();
      setStatus("online");
    } catch (e) {
      setStatus("offline");
    }
    setLastChecked(new Date());
  }, []);

  useEffect(() => {
    check();
    const interval = setInterval(check, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [check]);

  return { status, lastChecked, recheck: check };
}
