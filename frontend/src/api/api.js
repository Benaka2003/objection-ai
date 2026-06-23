import { API_BASE } from "../utils/constants.js";

async function apiRequest(path, options = {}) {
  const url = `${API_BASE}${path}`;
  let res;
  try {
    res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch (networkErr) {
    const err = new Error(
      `Can't reach ${url}. Check that the ObjectionAI backend is running .`
    );
    err.kind = "network";
    throw err;
  }

  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail = body?.message || body?.error || "";
    } catch (_) {
      /* response wasn't JSON — fall through with empty detail */
    }
    const err = new Error(detail || `Request failed with status ${res.status}`);
    err.kind = "http";
    err.status = res.status;
    throw err;
  }

  return res.json();
}

export const api = {
  health: () => apiRequest("/health"),
  analyse: (input) => apiRequest("/analyse", { method: "POST", body: JSON.stringify({ input }) }),
  analytics: () => apiRequest("/analytics"),
  history: () => apiRequest("/history"),
};
